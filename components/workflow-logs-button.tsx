"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Terminal } from "lucide-react"
import { WorkflowLogsModal } from "@/components/workflow-logs-modal"
import type { WorkflowRunWithDetails } from "@/lib/types"

interface WorkflowLogsButtonProps {
  workflowRun: WorkflowRunWithDetails
}

export const WorkflowLogsButton = ({ workflowRun }: WorkflowLogsButtonProps) => {
  const [showLogs, setShowLogs] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 text-zinc-300"
        onClick={() => setShowLogs(true)}
      >
        <Terminal className="h-4 w-4 mr-2" />
        View Logs
      </Button>
      <WorkflowLogsModal open={showLogs} onOpenChange={setShowLogs} workflowRun={workflowRun} />
    </>
  )
}
