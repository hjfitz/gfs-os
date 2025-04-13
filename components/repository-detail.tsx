import { GitBranch } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { formatDistanceToNow } from 'date-fns';
type RepositoryDetailProps = {
  name: string
  description: string
  defaultBranch: string
  updatedAt: string
  openPullRequests: number
  pipelineStatus: boolean
}

const RepositoryDetail = ({
  name,
  description,
  pipelineStatus,
  defaultBranch,
  updatedAt,
  openPullRequests,
}: RepositoryDetailProps) => (
  <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-sm overflow-hidden">
    <div className={`h-1 w-full ${pipelineStatus ? "bg-emerald-500" : "bg-red-500"}`}></div>
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 font-mono flex items-center">
            {name}
            <Badge variant="outline" className="ml-3 font-mono text-xs bg-zinc-800/50 text-zinc-400">
              <GitBranch className="h-3 w-3 mr-1" />
              {defaultBranch}
            </Badge>
          </h1>
          <p className="text-zinc-400 mt-2">{description || "No description provided"}</p>
        </div>


        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-zinc-800/50 rounded-md p-3 flex flex-col">
            <span className="text-zinc-500 text-xs mb-1">Status</span>
            <span className={`text-lg font-mono ${pipelineStatus ? "text-emerald-400" : "text-red-400"}`}>
              {pipelineStatus ? "Healthy" : "Issues"}
            </span>
          </div>
          <div className="bg-zinc-800/50 rounded-md p-3 flex flex-col">
            <span className="text-zinc-500 text-xs mb-1">Pull Requests</span>
            <span className="text-zinc-200 font-mono text-lg">{openPullRequests ?? 0}</span>
          </div>
          <div className="bg-zinc-800/50 rounded-md p-3 flex flex-col">
            <span className="text-zinc-500 text-xs mb-1">Last Updated</span>
            <span className="text-zinc-200 font-mono text-lg">
              {updatedAt ? formatDistanceToNow(new Date(updatedAt)) : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Card>
)

export default RepositoryDetail;
