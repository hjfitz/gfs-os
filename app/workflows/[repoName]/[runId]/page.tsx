import { WorkflowRun } from "@/components/workflow-run";
import { WorkflowsSkeleton } from "@/components/workflows-skeleton";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const WorkflowRunPage = async ({ params }: { params: Promise<{ repoName: string; runId: string }> }) => {
  const { repoName, runId } = await params
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950">
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-zinc-400 hover:text-blue-400 transition-colors mb-6 font-mono text-sm"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Dashboard
      </Link>

      <header className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100 font-mono flex items-center">
          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded mr-3 text-sm">Run ID: {runId}</span>
          Workflow Run for {repoName}
        </h1>
        <p className="text-zinc-400 mt-2">View detailed logs and status for this specific workflow run</p>
      </header>

      <Suspense fallback={<WorkflowsSkeleton count={1} />}>
        <WorkflowRun repoName={repoName} runId={runId} />
      </Suspense>
    </div>
  </main>
  )
}

export default WorkflowRunPage