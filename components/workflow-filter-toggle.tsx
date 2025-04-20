"use client"

import { useState } from "react"
import { AlertTriangle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { WorkflowRunWithDetails } from "@/lib/types"

type WorkflowFilterToggleProps = {
  workflowRuns: WorkflowRunWithDetails[]
  onFilterChange: (showFailuresOnly: boolean) => void
  initialValue?: boolean
}

export const WorkflowFilterToggle = ({ workflowRuns, onFilterChange, initialValue }: WorkflowFilterToggleProps) => {
  // Check if there are any failed workflows
  const hasFailures = workflowRuns.some((wr) => wr.run.status === "completed" && wr.run.conclusion === "failure")

  // Set default value to true if there are failures (and initialValue is not provided), false otherwise
  const [showFailuresOnly, setShowFailuresOnly] = useState(initialValue ?? hasFailures)

  const handleToggleChange = (checked: boolean) => {
    setShowFailuresOnly(checked)
    onFilterChange(checked)
  }

  return (
    <div className="flex items-center justify-between bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <AlertTriangle className={`h-5 w-5 mr-3 ${hasFailures ? "text-red-400" : "text-zinc-500"}`} />
        <div>
          <h3 className="text-zinc-200 font-medium">Workflow Failures</h3>
          <p className="text-zinc-500 text-sm">
            {hasFailures ? "There are failed workflows in your repositories" : "All workflows are currently passing"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Label htmlFor="show-failures" className="text-zinc-400 cursor-pointer">
          Show failures only
        </Label>
        <Switch
          id="show-failures"
          checked={showFailuresOnly}
          onCheckedChange={handleToggleChange}
          className="data-[state=checked]:bg-red-600"
        />
      </div>
    </div>
  )
}
