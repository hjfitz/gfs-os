import type { GithubOrgRepo, GithubOrgReposResponseDTO } from "./dto/org-repos";
import type { GithubPullRequestResponseDTO } from "./dto/pull-request";
import type { GithubOrgWorkflowJobsResponseDTO } from "./dto/workflow-jobs";
import type { GithubWorkflowRunsResponseDTO } from "./dto/workflow-run";

export class GithubAPI {
	constructor(
		private readonly token: string,
		private readonly org: string,
		private readonly baseUrl: string = "https://api.github.com",
	) {}

	public async get(path: string, options: RequestInit = {}): Promise<Response> {
		const url = `${this.baseUrl}${path}`;
		return await fetch(url, {
			...options,
			headers: {
				Authorization: `Bearer ${this.token}`,
				accept: "application/vnd.github.v3+json",
				...options.headers,
			},
		});
	}

	public async getJson<T>(url: string): Promise<T> {
		const response = await this.get(url);

		return await response.json();
	}

	public async getRepos(): Promise<GithubOrgReposResponseDTO> {
		return this.getJson<GithubOrgReposResponseDTO>(`/orgs/${this.org}/repos`);
	}

	public async getPullRequests(
		repoName: string,
	): Promise<GithubPullRequestResponseDTO> {
		return this.getJson<GithubPullRequestResponseDTO>(
			`/repos/${this.org}/${repoName}/pulls`,
		);
	}

	public async getWorkflows(
		repoName: string,
	): Promise<GithubWorkflowRunsResponseDTO> {
		return this.getJson<GithubWorkflowRunsResponseDTO>(
			`/repos/${this.org}/${repoName}/actions/runs`,
		);
	}

	public async getRepo(repoName: string): Promise<GithubOrgRepo> {
		return this.getJson<GithubOrgRepo>(`/repos/${this.org}/${repoName}`);
	}

	public async getWorkflowJobs(
		repoName: string,
		workflowRunId: number,
	): Promise<GithubOrgWorkflowJobsResponseDTO> {
		return this.getJson<GithubOrgWorkflowJobsResponseDTO>(
			`/repos/${this.org}/${repoName}/actions/runs/${workflowRunId}/jobs`,
		);
	}

	public async getJobLogs(repoName: string, jobId: number): Promise<string> {
		const resp = await this.get(
			`/repos/${this.org}/${repoName}/actions/jobs/${jobId}/logs`,
			{
				redirect: "follow",
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
				},
			},
		);

		return await resp.text();
	}
}
