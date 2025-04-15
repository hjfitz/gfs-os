import { Database, GitPullRequest, AlertTriangle, Play } from "lucide-react"
import Link from "next/link"

interface OrganizationStatsProps {
  totalRepos: number
  totalPRs: number
  failingPipelines: number
}

export function OrganizationStats({ totalRepos, totalPRs, failingPipelines }: OrganizationStatsProps) {
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-2 rounded-md border border-zinc-800">
        <Database className="h-4 w-4 text-blue-400" />
        <div>
          <div className="text-zinc-300 font-mono text-lg">{totalRepos}</div>
          <div className="text-zinc-500 text-xs">Repositories</div>
        </div>
      </div>

      <Link href="/pull-requests" className="group">
        <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-2 rounded-md border border-zinc-800 hover:border-blue-800 hover:bg-zinc-900/70 transition-all duration-200">
          <GitPullRequest className="h-4 w-4 text-blue-400" />
          <div>
            <div className="text-zinc-300 font-mono text-lg group-hover:text-blue-300 transition-colors">
              {totalPRs}
            </div>
            <div className="text-zinc-500 text-xs group-hover:text-zinc-400 transition-colors">Open PRs</div>
          </div>
        </div>
      </Link>

      <Link href="/workflows" className="group">
        <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-2 rounded-md border border-zinc-800 hover:border-blue-800 hover:bg-zinc-900/70 transition-all duration-200">
          <Play className="h-4 w-4 text-blue-400" />
          <div>
            <div className="text-zinc-300 font-mono text-lg group-hover:text-blue-300 transition-colors">CI/CD</div>
            <div className="text-zinc-500 text-xs group-hover:text-zinc-400 transition-colors">Workflows</div>
          </div>
        </div>
      </Link>

      {failingPipelines > 0 && (
        <div className="flex items-center gap-2 bg-red-950/20 px-3 py-2 rounded-md border border-red-900/30">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <div>
            <div className="text-zinc-300 font-mono text-lg">{failingPipelines}</div>
            <div className="text-zinc-500 text-xs">Failing</div>
          </div>
        </div>
      )}
    </div>
  )
}
