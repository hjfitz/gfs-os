export type RepoData = {
  id: number
  name: string
  owner: string
  description: string | null
  defaultBranch: string
  lastCommit: string | null
  url: string
  pullRequests: {
    openCount: number
    open: {
      title: string
      link: string
      updatedAt: string
      owner: string
    }[]
    link: string
  }
  workflow: {
    status: boolean
    link: string
    runs: {
      name: string
      branch: string
      link: string
      status: string
      conclusion: string
      updatedAt: string
    }[]
  }
}

export type GithubWorkflow = {
  total_count: number
  workflow_runs: GithubWorkflowRun[]
}

export type GithubWorkflowRun = {
  id: number
  state: string
  conclusion: string
  head_branch: string
  status: string
  name: string
  html_url: string
  updated_at: string
  jobs_url: string
  triggered_by: {
    login: string
  }
  created_at: string
  head_sha: string
  run_number: number
  conclusion_summary: string
  
}

export type PullRequest = {
  title: string
  number: number
  isDraft: boolean
  isReady: boolean
  author: {
    login: string
    avatarUrl: string
  }
  createdAt: string
}


export type GithubJobs = {
  total_count: number
  jobs: GithubJob[]
}

export type GithubJob = {
  id: number
  name: string
  status: string
  conclusion: string
  steps: GithubJobStep[]
}

export type GithubJobStep = {
  id: number
  name: string
  status: string
  conclusion: string
  number: number
  started_at: string
  completed_at: string
}

export interface WorkflowRun {
  id: number
  name: string
  runNumber: number
  status: "queued" | "in_progress" | "completed"
  conclusion: "success" | "failure" | "cancelled" | "skipped" | null
  branch: string
  commitSha?: string
  triggeredBy?: string
  createdAt: string
  updatedAt: string
}

export interface WorkflowStep {
  id: number
  name: string
  status: "queued" | "in_progress" | "completed"
  conclusion: "success" | "failure" | "cancelled" | "skipped" | null
  duration: number
}

export interface WorkflowJob {
  id: number
  name: string
  status: "queued" | "in_progress" | "completed"
  conclusion: "success" | "failure" | "cancelled" | "skipped" | null
  steps: WorkflowStep[]
}

export interface WorkflowRunWithDetails {
  repo: RepoData
  run: WorkflowRun
  jobs: WorkflowJob[]
}
