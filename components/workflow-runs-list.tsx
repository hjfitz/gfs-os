import { formatDistanceToNow } from "date-fns"
import Link from 'next/link'

interface WorkflowRunsListProps {
  workflowRuns: {
    name: string
    link: string
    status: string
    conclusion: string
    updatedAt: string
    branch: string
  }[]
}

export default function WorkflowRunsList({ workflowRuns }: WorkflowRunsListProps) {
  if (workflowRuns.length === 0) {
    return (
      <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/30">
        <p className="text-zinc-400">No workflow runs found.</p>
      </div>
    )
  }
  
  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/30">
      <ul className="divide-y divide-zinc-800">
        {workflowRuns.map((run) => (
          <li key={run.link} className="p-4 hover:bg-zinc-800/50 transition-colors">
            <Link 
              href={run.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-3 h-3 mt-1.5 rounded-full ${
                  run.conclusion === 'success' ? 'bg-green-500' : 
                  run.conclusion === 'failure' ? 'bg-red-500' : 
                  'bg-yellow-500'
                }`}></div>
                <div className="ml-3">
                  <p className="font-medium text-zinc-100">{run.name}</p>
                  <p className="text-sm text-zinc-400">
                    {run.branch} • {formatDistanceToNow(new Date(run.updatedAt))} ago
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
