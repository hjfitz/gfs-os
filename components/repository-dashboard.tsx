import { githubService } from "@/lib/github";
import { PullRequestList } from "./pull-request-list";
import WorkflowRunsList from "./workflow-runs-list";
import RepositoryDetail from "./repository-detail";

type RepositoryDashboardProps = {
  params: { repoName: string }
}

export const RepositoryDashboard = async ({ params }: RepositoryDashboardProps) => {
  const { repoName } = params;

  const repoDetails = await githubService.getRepoData(repoName);

  return (
    <div>
      <section>

        <RepositoryDetail
          name={repoDetails.name}
          description={repoDetails.description || ''}
          defaultBranch={repoDetails.defaultBranch}
          updatedAt={repoDetails.lastCommit || ''}
          openPullRequests={repoDetails.pullRequests.openCount || 0}
          pipelineStatus={repoDetails.workflow.status}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-xl font-bold text-zinc-200 mb-4 font-mono flex items-center">
              <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded mr-2 text-xs">
                {repoDetails.pullRequests.openCount || 0}
              </span>
              Open Pull Requests
            </h2>
            <PullRequestList pullRequests={repoDetails.pullRequests.open || []} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-200 mb-4 font-mono flex items-center">
              <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded mr-2 text-xs">5</span>
              Recent Workflow Runs
            </h2>
            <WorkflowRunsList workflowRuns={repoDetails.workflow.runs || []} />
          </div>
        </div>
      </section>
    </div>
  )
}