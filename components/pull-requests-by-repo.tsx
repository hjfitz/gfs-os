import { GitPullRequest } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PullRequestItem } from "@/components/pull-request-item"
import { githubService } from "@/lib/github"

export const PullRequestsByRepo = async () => {
  const pullRequestsByRepo = await githubService.getPullRequests()

  if (pullRequestsByRepo.length === 0) {
    return (
      <Card className="bg-zinc-900/40 border-zinc-800 p-8 text-center">
        <GitPullRequest className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
        <p className="text-zinc-400 font-mono text-lg mb-2">No open pull requests found</p>
        <p className="text-zinc-500">All repositories are up to date</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {pullRequestsByRepo.map(({ repo, openPullRequests, pullRequests }) => (
        <div key={repo} className="bg-zinc-900/40 border border-zinc-800 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <div className="flex items-center">
              <div className="font-mono text-zinc-100 text-lg flex items-center">
                {repo}
                <Badge className="ml-3 bg-blue-500/20 text-blue-400 border-none">{pullRequests.length}</Badge>
              </div>
            </div>
            <div className="text-zinc-400 text-sm">
              <span className="font-mono">{openPullRequests}</span> total open
            </div>
          </div>

          <div>
            {pullRequests.map((pr) => (
              <PullRequestItem key={pr.number} pr={pr} repoName={repo} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}