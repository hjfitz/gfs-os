import { config } from "./config"
import type { GithubRepo, GithubPullRequest, GithubWorkflow, RepoData, GithubWorkflowRun, GithubPullRequestData, PullRequest } from "./types"

class GithubAPI {
  constructor(private readonly token: string, private readonly org: string) { }

  private async get<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        accept: "application/vnd.github.v3+json",
      },
    })

    return await response.json()
  }

  public async getRepos(): Promise<GithubRepo[]> {
    return this.get<GithubRepo[]>(`https://api.github.com/orgs/${this.org}/repos`)
  }

  public async getPullRequests(repo: GithubRepo): Promise<GithubPullRequest[]> {
    return this.get<GithubPullRequest[]>(`https://api.github.com/repos/${this.org}/${repo.name}/pulls?state=all`)
  }

  public async getWorkflows(repo: GithubRepo): Promise<GithubWorkflow> {
    return this.get<GithubWorkflow>(`https://api.github.com/repos/${this.org}/${repo.name}/actions/runs`)
  }

  public async getRepo(repoName: string): Promise<GithubRepo> {
    return this.get<GithubRepo>(`https://api.github.com/repos/${this.org}/${repoName}`)
  }

  public async getPullRequest(repoName: string): Promise<GithubPullRequestData[]> {
    return this.get<GithubPullRequestData[]>(`https://api.github.com/repos/${this.org}/${repoName}/pulls`) //?state=all`)
  }
}

class GithubService {
  constructor(private readonly github: GithubAPI) { }

  public async getRepoData(repoName: string): Promise<RepoData> {
    const repo = await this.github.getRepo(repoName)

    return this.getRepo(repo)
  }

  public async getPullRequests(): Promise<{ repo: string, openPullRequests: number, pullRequests: PullRequest[] }[]> {
    const repos = await this.github.getRepos()

    return Promise.all(repos.map(async (repo) => {
      const prs = await this.github.getPullRequest(repo.name)

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
          additions: pull.additions,
          deletions: pull.deletions,
        })),
      }
    }))

  }

  public async getRepo(repo: GithubRepo): Promise<RepoData> {
    const [
      pullRequests,
      workflows,
    ] = await Promise.all([
      this.github.getPullRequests(repo),
      this.github.getWorkflows(repo),
    ])

    const openPullRequestsCount = pullRequests.filter((pull: GithubPullRequest) => pull?.state === "open").length

    const mostRecentWorkflow = workflows.workflow_runs[0]

    // if the most recent workflow is waiting, we assume the repo is healthy - we're probably waiting for a workflow to start
    const workflowStatus = !mostRecentWorkflow?.conclusion || mostRecentWorkflow.conclusion === "success" || mostRecentWorkflow.status === "waiting"

    const runs = workflows.workflow_runs.slice(0, 5).map((run: GithubWorkflowRun) => ({
      name: run.name,
      link: run.html_url,
      status: run.status,
      branch: run.head_branch,
      conclusion: run.conclusion,
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
}

const github = new GithubAPI(config.github.token, config.github.org)
export const githubService = new GithubService(github)
