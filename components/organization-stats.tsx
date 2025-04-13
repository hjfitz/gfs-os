import { Database, GitPullRequest, AlertTriangle } from "lucide-react"

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

      <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-2 rounded-md border border-zinc-800">
        <GitPullRequest className="h-4 w-4 text-blue-400" />
        <div>
          <div className="text-zinc-300 font-mono text-lg">{totalPRs}</div>
          <div className="text-zinc-500 text-xs">Open PRs</div>
        </div>
      </div>

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
