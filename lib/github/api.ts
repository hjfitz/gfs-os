import type { GithubOrgReposResponseDTO, GithubOrgRepo } from "./dto/org-repos"
import type { GithubPullRequestResponseDTO } from "./dto/pull-request"
import type { GithubWorkflowRunsResponseDTO } from "./dto/workflow-run"

export class GithubAPI {
    constructor(private readonly token: string, private readonly org: string) { }
  
    public async get<T>(url: string): Promise<T> {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          accept: "application/vnd.github.v3+json",
        },
      })
  
      return await response.json()
    }
  
    public async getRepos(): Promise<GithubOrgReposResponseDTO> {
      return this.get<GithubOrgReposResponseDTO>(`https://api.github.com/orgs/${this.org}/repos`)
    }
  
    public async getPullRequests(repoName: string): Promise<GithubPullRequestResponseDTO> {
      return this.get<GithubPullRequestResponseDTO>(`https://api.github.com/repos/${this.org}/${repoName}/pulls?state=all`)
    }
  
    public async getWorkflows(repoName: string): Promise<GithubWorkflowRunsResponseDTO> {
      return this.get<GithubWorkflowRunsResponseDTO>(`https://api.github.com/repos/${this.org}/${repoName}/actions/runs`)
    }
  
    public async getRepo(repoName: string): Promise<GithubOrgRepo> {
      return this.get<GithubOrgRepo>(`https://api.github.com/repos/${this.org}/${repoName}`)
    }
  
    // this is a dupe - how the fuck did this happen?
    public async getPullRequest(repoName: string): Promise<GithubPullRequestResponseDTO> {
      return this.get<GithubPullRequestResponseDTO>(`https://api.github.com/repos/${this.org}/${repoName}/pulls`)
    }
  }