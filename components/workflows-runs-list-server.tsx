import { Card } from "@/components/ui/card"
import { Play } from "lucide-react"
import { WorkflowRunCard } from "@/components/workflow-run-card"
import { githubService } from "@/lib/github"

export const WorkflowRunsList = async () => {
  const workflowRuns = await githubService.getWorkflowRuns()

  if (workflowRuns.length === 0) {
    return (
      <Card className="bg-zinc-900/40 border-zinc-800 p-8 text-center">
        <Play className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
        <p className="text-zinc-400 font-mono text-lg mb-2">No workflow runs found</p>
        <p className="text-zinc-500">No CI/CD pipelines have been executed recently</p>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {workflowRuns.map((workflowRun) => (
        <WorkflowRunCard key={`${workflowRun.repo.name}-${workflowRun.run.id}`} workflowRun={workflowRun} />
      ))}
    </div>
  )
}
