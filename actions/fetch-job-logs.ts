'use server'

import { githubService } from "@/lib/github"

export async function getJobLogs(repoName: string, jobId: number): Promise<string[]> {
  const logs = await githubService.getJobLogs(repoName, jobId)

  return logs.split("\n")
}
