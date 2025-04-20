import type { GithubAPI } from "./api"
import type { RepoData, PullRequest, WorkflowRunWithDetails, WorkflowRunLogs } from "../types"
import type { GithubOrgRepo } from "./dto/org-repos"
import type { GithubPullRequest } from "./dto/pull-request"

export class GithubService {
  constructor(private readonly github: GithubAPI) { }

  public async getRepoData(repoName: string): Promise<RepoData> {
    const repo = await this.github.getRepo(repoName)

    return this.getRepo(repo)
  }

  public async getPullRequests(): Promise<{ repo: string, openPullRequests: number, pullRequests: PullRequest[] }[]> {
    const repos = await this.github.getRepos()

    return Promise.all(repos.map(async (repo) => {
      const prs = await this.github.getPullRequests(repo.name)

      return {
        repo: repo.name,
        openPullRequests: prs.filter((pull) => pull.state === "open").length,
        pullRequests: prs.map((pull) => ({
          title: pull.title,
          number: pull.number,
          isDraft: pull.state === "draft",
          isReady: pull.state === "open",
          author: {
            login: pull.user.login,
            avatarUrl: pull.user.avatar_url,
          },
          createdAt: pull.created_at,
        })),
      }
    }))

  }

  public async getRepo(repo: GithubOrgRepo): Promise<RepoData> {
    const [
      pullRequests,
      workflows,
    ] = await Promise.all([
      this.github.getPullRequests(repo.name),
      this.github.getWorkflows(repo.name),
    ])

    const openPullRequestsCount = pullRequests.filter((pull: GithubPullRequest) => pull?.state === "open").length

    const mostRecentWorkflow = workflows.workflow_runs[0]

    // if the most recent workflow is waiting, we assume the repo is healthy - we're probably waiting for a workflow to start
    const workflowStatus = !mostRecentWorkflow?.conclusion || mostRecentWorkflow.conclusion === "success" || mostRecentWorkflow.status === "waiting"

    const runs = workflows.workflow_runs.slice(0, 5).map((run) => ({
      name: run.name,
      link: run.html_url,
      status: run.status,
      branch: run.head_branch,
      conclusion: run.conclusion || "unknown",
      updatedAt: run.updated_at,
    }))

    const openPullRequests = pullRequests
      .filter(
        (pull) => pull?.state === "open"
      ).map((pull) => ({
        title: pull.title,
        link: pull.html_url,
        updatedAt: pull.updated_at,
        owner: pull.user.login,
      }))

    const repoData: RepoData = {
      id: repo.id,
      name: repo.name,
      owner: repo.owner.login,
      description: repo.description,
      defaultBranch: repo.default_branch,
      lastCommit: repo.pushed_at,
      url: `https://github.com/${repo.owner.login}/${repo.name}`,
      pullRequests: {
        openCount: openPullRequestsCount,
        open: openPullRequests,
        link: `https://github.com/${repo.owner.login}/${repo.name}/pulls`,
      },
      workflow: {
        status: workflowStatus,
        link: `https://github.com/${repo.owner.login}/${repo.name}/actions`,
        runs,
      },
    }

    return repoData

  }

  public async getRepos(): Promise<RepoData[]> {
    const repos = await this.github.getRepos()

    const repoInfo = await Promise.all(repos.map(this.getRepo.bind(this)))

    return repoInfo
  }

  public async getJobLogs(repoName: string, jobId: number): Promise<string> {
    const logs = await this.github.getJobLogs(repoName, jobId)
    return logs
  } 

  public async getWorkflowRunLogs(repoName: string, workflowRunId: number): Promise<WorkflowRunLogs[]> {
    const jobs = await this.github.getWorkflowJobs(repoName, workflowRunId)

    return await Promise.all(jobs.jobs.map(async (job) => {

      const rawLogs = await this.github.getJobLogs(repoName, job.id)

      return {
        name: job.name,
        status: job.status,
        logs: rawLogs.split("\n"),
      }
    }))
  }

  public async getWorkflowDetails(repo: RepoData): Promise<WorkflowRunWithDetails | null> {
    const workflowsRuns = await this.github.getWorkflows(repo.name)

    const mostRecentWorkflow = workflowsRuns.workflow_runs[0]

    // look ma, hateoas is actually useful!
    const jobsUrl = mostRecentWorkflow?.jobs_url

    if (!jobsUrl) {
      return null
    }

    const jobsData = await this.github.getWorkflowJobs(repo.name, mostRecentWorkflow.id)

    // todo: parse strings in to string literals better
    // todo: move workflow run details to a separate function
    return {
      repo,
      run: {
        id: mostRecentWorkflow.id,
        name: mostRecentWorkflow.name,
        runNumber: mostRecentWorkflow.run_number,
        status: mostRecentWorkflow.status as "queued" | "in_progress" | "completed",
        conclusion: mostRecentWorkflow.conclusion as "success" | "failure" | "cancelled" | "skipped" | null,
        branch: mostRecentWorkflow.head_branch,
        commitSha: mostRecentWorkflow.head_sha,
        triggeredBy: mostRecentWorkflow?.triggering_actor?.login,
        createdAt: mostRecentWorkflow.created_at,
        updatedAt: mostRecentWorkflow.updated_at,
      },
      jobs: jobsData.jobs.map((job) => ({
        id: job.id,
        name: job.name,
        status: job.status as "queued" | "in_progress" | "completed",
        conclusion: job.conclusion as "success" | "failure" | "cancelled" | "skipped" | null,
        steps: job.steps.map((step) => ({
          id: step.number, // todo: this is fucked somewhere
          name: step.name,
          status: step.status as "queued" | "in_progress" | "completed",
          conclusion: step.conclusion as "success" | "failure" | "cancelled" | "skipped" | null,
          number: step.number,
          startedAt: step.started_at,
          completedAt: step.completed_at,
          duration: step.completed_at ? new Date(step.completed_at).getTime() - new Date(step.started_at).getTime() : 0,
        })),
      })),
    }

    
  }

  public async getWorkflowRuns(): Promise<WorkflowRunWithDetails[]> {
    const repos = await this.getRepos()

    const workflowInfo = await Promise.all(repos.map(this.getWorkflowDetails.bind(this)))
    return workflowInfo.filter((info) => info !== null)
  }
}