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

export type GithubRepo = {
  id: number
  name: string
  owner: {
    login: string
  }
  description: string
  language: string
  pushed_at: string
  default_branch: string
  // there are other properties - but we don't care for them
}

export type GithubPullRequest = {
  state: string
  user: {
    login: string
  }
  title: string
  updated_at: string
  html_url: string
}

export type GithubWorkflow = {
  total_count: number
  workflow_runs: GithubWorkflowRun[]
}

export type GithubWorkflowRun = {
  state: string
  conclusion: string
  head_branch: string
  status: string
  name: string
  html_url: string
  updated_at: string
}
