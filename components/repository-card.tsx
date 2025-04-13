import { GitBranch, GitPullRequest, Clock, CheckCircle, XCircle, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { RepoData } from "@/lib/types"

type RepositoryCardProps = {
  repo: RepoData
}

export const RepositoryCard = ({ repo }: RepositoryCardProps) => (
  <Card className="bg-zinc-900/30 border border-zinc-800 rounded-lg hover:bg-zinc-800/50 transition-colors overflow-hidden group">
    <div className={`h-1 w-full ${repo.workflow.status ? "bg-emerald-500" : "bg-red-500"}`}></div>
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <CardTitle className="text-zinc-100 font-mono text-lg truncate">{repo.name}</CardTitle>
        <Badge variant="outline" className="font-mono text-xs bg-zinc-800 text-zinc-300 hover:text-zinc-300">
          <GitBranch className="h-3 w-3 mr-1" />
          {repo.defaultBranch}
        </Badge>
      </div>
      <p className="text-zinc-400 text-xs truncate">{repo.description || "No description"}</p>
    </CardHeader>
    <CardContent className="pb-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-800/50 rounded-md p-3 flex flex-col">
          <span className="text-zinc-400 text-xs mb-1">Pull Requests</span>
          <div className="flex items-center">
            <GitPullRequest className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-zinc-200 font-mono text-lg">{repo.pullRequests.openCount}</span>
          </div>
        </div>
        <div className="bg-zinc-800/50 rounded-md p-3 flex flex-col">
          <span className="text-zinc-400 text-xs mb-1">Pipeline</span>
          <div className="flex items-center">
            {repo.workflow.status ? (
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
            ) : (
              <XCircle className="h-4 w-4 text-red-400 mr-2" />
            )}
            <span className="text-zinc-200 font-mono">{repo.workflow.status ? "Passing" : "Failing"}</span>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter className="pt-0 text-zinc-400 text-xs font-mono flex justify-between">
      <div className="flex items-center">
        <Clock className="h-3 w-3 mr-1" />
        <span>
          {repo.lastCommit ? `Updated ${formatDistanceToNow(new Date(repo.lastCommit))} ago` : "No recent commits"}
        </span>
      </div>
      <div className="flex gap-2">
        <a
          href={`https://github.com/${repo.owner}/${repo.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center opacity-0 group-hover:opacity-100"
        >
          <ExternalLink className="h-3 w-3" />
        </a>
        <Link
          href={`/repo/${repo.name}`}
          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
        >
          <span className="mr-1">Details</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>
    </CardFooter>
  </Card>
)
