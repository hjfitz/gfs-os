'use client'

import { WorkflowRunWithDetails } from "@/lib/types"
import { WorkflowRunCard } from "./workflow-run-card"
import { useState } from "react"
import { WorkflowFilterToggle } from "./workflow-filter-toggle"

export const WorkflowRunsListClient = ({ workflowRuns }: { workflowRuns: WorkflowRunWithDetails[] }) => {
  const hasFailures = workflowRuns.some((wr) => wr.run.status === "completed" && wr.run.conclusion === "failure")

  const [filteredWorkflowRuns, setFilteredWorkflowRuns] = useState<typeof workflowRuns>(
    hasFailures ? workflowRuns.filter((wr) => wr.run.status === "completed" && wr.run.conclusion === "failure") : workflowRuns
  )
  const [showFailuresOnly, setShowFailuresOnly] = useState(hasFailures)

  const handleFilterChange = (showFailuresOnly: boolean) => {
    setShowFailuresOnly(showFailuresOnly)

    if (showFailuresOnly) {
      setFilteredWorkflowRuns(
        workflowRuns.filter((wr) => wr.run.status === "completed" && wr.run.conclusion === "failure"),
      )
    } else {
      setFilteredWorkflowRuns(workflowRuns)
    }
  }


  return (
    <div>
      <WorkflowFilterToggle
        workflowRuns={workflowRuns}
        onFilterChange={handleFilterChange}
        initialValue={showFailuresOnly}
      />
      {filteredWorkflowRuns.map((workflowRun) => (
        <WorkflowRunCard key={workflowRun.jobs[0].id} workflowRun={workflowRun} />
      ))}
    </div>
  )
}