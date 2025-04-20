import { formatDistanceToNow } from "date-fns"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Clock, AlertTriangle, GitBranch, GitCommit, User, ExternalLink } from "lucide-react"
import { WorkflowJobsList } from "@/components/workflow-jobs-list"
import { WorkflowLogsButton } from "@/components/workflow-logs-button"
import Link from "next/link"
import type { WorkflowRunWithDetails } from "@/lib/types"

interface WorkflowRunCardProps {
  workflowRun: WorkflowRunWithDetails
}

export function WorkflowRunCard({ workflowRun }: WorkflowRunCardProps) {
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

  // Generate a workflow URL (GitHub format)
  const workflowUrl = `https://github.com/${repo.owner}/${repo.name}/actions/runs/${run.id}`

  return (
    <Card className="bg-zinc-900/40 border-zinc-800 overflow-hidden group">
      <div
        className={`h-1 w-full ${run.status === "completed" && run.conclusion === "success" ? "bg-emerald-500" : run.status === "completed" && run.conclusion === "failure" ? "bg-red-500" : run.status === "in_progress" ? "bg-blue-500" : "bg-yellow-500"}`}
      ></div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <StatusIcon />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-zinc-100 font-mono">{repo.name}</h2>
                <a
                  href={workflowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm mt-1">
                <Link
                  href={`/workflows/${repo.name}/${run.id}`}
                  className="font-mono hover:text-blue-400 transition-colors flex items-center"
                >
                  <span>{run.name}</span>
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
                    className="ml-1"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
                <span className="text-zinc-600">•</span>
                <span>Run #{run.runNumber}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className={`font-mono text-xs px-3 py-1 ${getStatusClass()}`}>
              {getStatusText()}
            </Badge>
            <WorkflowLogsButton workflowRun={workflowRun} />
          </div>
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
          <WorkflowJobsList jobs={jobs} repoName={repo.name} />
        </div>
      </div>
    </Card>
  )
}
