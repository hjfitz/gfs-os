import { formatDistanceToNow } from "date-fns"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Clock, AlertTriangle, GitBranch, GitCommit, User } from "lucide-react"
import { WorkflowJobsList } from "@/components/workflows-jobs-list"
import type { WorkflowRunWithDetails } from "@/lib/types"

interface WorkflowRunCardProps {
  workflowRun: WorkflowRunWithDetails
}

export const WorkflowRunCard = ({ workflowRun }: WorkflowRunCardProps) => {
  const { repo, run, jobs } = workflowRun

  // Status icon based on workflow status
  const StatusIcon = () => {
    if (run.status === "completed" && run.conclusion === "success") {
      return <CheckCircle className="h-5 w-5 text-emerald-400" />
    } else if (run.status === "completed" && run.conclusion === "failure") {
      return <XCircle className="h-5 w-5 text-red-400" />
    } else if (run.status === "in_progress") {
      return <Clock className="h-5 w-5 text-blue-400 animate-pulse" />
    } else if (run.status === "queued") {
      return <Clock className="h-5 w-5 text-yellow-400" />
    } else {
      return <AlertTriangle className="h-5 w-5 text-orange-400" />
    }
  }

  // Status text based on workflow status
  const getStatusText = () => {
    if (run.status === "completed") {
      return run.conclusion === "success"
        ? "Success"
        : run.conclusion === "failure"
          ? "Failed"
          : run.conclusion === "cancelled"
            ? "Cancelled"
            : "Skipped"
    } else if (run.status === "in_progress") {
      return "Running"
    } else {
      return "Queued"
    }
  }

  // Status badge class based on workflow status
  const getStatusClass = () => {
    if (run.status === "completed" && run.conclusion === "success") {
      return "bg-emerald-900/20 text-emerald-400 border-emerald-900/30"
    } else if (run.status === "completed" && run.conclusion === "failure") {
      return "bg-red-900/20 text-red-400 border-red-900/30"
    } else if (run.status === "in_progress") {
      return "bg-blue-900/20 text-blue-400 border-blue-900/30"
    } else if (run.status === "queued") {
      return "bg-yellow-900/20 text-yellow-400 border-yellow-900/30"
    } else {
      return "bg-orange-900/20 text-orange-400 border-orange-900/30"
    }
  }

  return (
    <Card className="bg-zinc-900/40 border-zinc-800 overflow-hidden">
      <div
        className={`h-1 w-full ${run.status === "completed" && run.conclusion === "success" ? "bg-emerald-500" : run.status === "completed" && run.conclusion === "failure" ? "bg-red-500" : run.status === "in_progress" ? "bg-blue-500" : "bg-yellow-500"}`}
      ></div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <StatusIcon />
            <div>
              <h2 className="text-xl font-bold text-zinc-100 font-mono">{repo.name}</h2>
              <div className="flex items-center gap-2 text-zinc-400 text-sm mt-1">
                <span className="font-mono">{run.name}</span>
                <span className="text-zinc-600">•</span>
                <span>Run #{run.runNumber}</span>
              </div>
            </div>
          </div>

          <Badge variant="outline" className={`font-mono text-xs px-3 py-1 ${getStatusClass()}`}>
            {getStatusText()}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <GitBranch className="h-4 w-4 text-blue-400" />
            <span>{run.branch}</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <GitCommit className="h-4 w-4 text-blue-400" />
            <span className="font-mono">{run.commitSha?.substring(0, 7) || "Unknown"}</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <User className="h-4 w-4 text-blue-400" />
            <span>{run.triggeredBy || "Unknown"}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-zinc-400 mb-6">
          <div className="bg-zinc-800/50 rounded-md px-3 py-2">
            <span className="block text-zinc-500 mb-1">Started</span>
            <span className="font-mono">{formatDistanceToNow(new Date(run.createdAt))} ago</span>
          </div>

          {run.status === "completed" && (
            <div className="bg-zinc-800/50 rounded-md px-3 py-2">
              <span className="block text-zinc-500 mb-1">Completed</span>
              <span className="font-mono">{formatDistanceToNow(new Date(run.updatedAt))} ago</span>
            </div>
          )}

          <div className="bg-zinc-800/50 rounded-md px-3 py-2">
            <span className="block text-zinc-500 mb-1">Duration</span>
            <span className="font-mono">
              {run.status === "completed"
                ? `${Math.round((new Date(run.updatedAt).getTime() - new Date(run.createdAt).getTime()) / 1000 / 60)} min`
                : "In progress"}
            </span>
          </div>
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="text-lg font-medium text-zinc-200 mb-4">Jobs</h3>
          <WorkflowJobsList jobs={jobs} />
        </div>
      </div>
    </Card>
  )
}
