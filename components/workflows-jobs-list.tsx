"use client"

import { CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { WorkflowStepsList } from "@/components/workflow-steps-list"
import type { WorkflowJob } from "@/lib/types"

interface WorkflowJobsListProps {
  jobs: WorkflowJob[]
}

export const WorkflowJobsList = ({ jobs }: WorkflowJobsListProps) => {
  const [openJobs, setOpenJobs] = useState<Record<number, boolean>>({})

  const toggleJob = (jobId: number) => {
    setOpenJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }))
  }

  if (jobs.length === 0) {
    return <div className="text-zinc-500 text-center py-4">No jobs found for this workflow run</div>
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Collapsible
          key={job.id}
          open={openJobs[job.id]}
          onOpenChange={() => toggleJob(job.id)}
          className="bg-zinc-800/30 border border-zinc-800 rounded-lg overflow-hidden"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
            <div className="flex items-center gap-3">
              {job.status === "completed" && job.conclusion === "success" && (
                <CheckCircle className="h-4 w-4 text-emerald-400" />
              )}
              {job.status === "completed" && job.conclusion === "failure" && (
                <XCircle className="h-4 w-4 text-red-400" />
              )}
              {(job.status === "in_progress" || job.status === "queued") && (
                <Clock
                  className={`h-4 w-4 ${job.status === "in_progress" ? "text-blue-400 animate-pulse" : "text-yellow-400"}`}
                />
              )}
              <span className="text-zinc-200 font-medium">{job.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={`font-mono text-xs ${
                  job.status === "completed" && job.conclusion === "success"
                    ? "bg-emerald-900/20 text-emerald-400 border-emerald-900/30"
                    : job.status === "completed" && job.conclusion === "failure"
                      ? "bg-red-900/20 text-red-400 border-red-900/30"
                      : job.status === "in_progress"
                        ? "bg-blue-900/20 text-blue-400 border-blue-900/30"
                        : "bg-yellow-900/20 text-yellow-400 border-yellow-900/30"
                }`}
              >
                {job.status === "completed"
                  ? job.conclusion === "success"
                    ? "Success"
                    : "Failed"
                  : job.status === "in_progress"
                    ? "Running"
                    : "Queued"}
              </Badge>

              {openJobs[job.id] ? (
                <ChevronUp className="h-4 w-4 text-zinc-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              )}
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="p-4 pt-0 border-t border-zinc-800 mt-4">
              <WorkflowStepsList steps={job.steps} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}
