export type GithubOrgWorkflowJobsResponseDTO = {
	total_count: number;
	jobs: GithubWorkflowJob[];
};

export type GithubWorkflowJob = {
	id: number;
	run_id: number;
	run_url: string;
	node_id: string;
	head_sha: string;
	url: string;
	html_url: string;
	status: string;
	conclusion: string;
	started_at: string;
	completed_at: string;
	name: string;
	steps: GithubWorkflowJobStep[];
	check_run_url: string;
	labels: string[];
	runner_id: number;
	runner_name: string;
	runner_group_id: number;
	runner_group_name: string;
	workflow_name: string;
	head_branch: string;
};

export type GithubWorkflowJobStep = {
	name: string;
	status: string;
	conclusion: string;
	number: number;
	started_at: string;
	completed_at: string;
};
