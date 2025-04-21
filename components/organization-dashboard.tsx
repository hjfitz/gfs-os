import { OrganizationStats } from "@/components/organization-stats";
import { RepositoryCard } from "@/components/repository-card";
import { githubService } from "@/lib/github";
import { DailyDigest } from "./daily-digest";

export const OrganizationDashboard = async () => {
	const repos = await githubService.getRepos();
	const workflowRuns = await githubService.getWorkflowRuns();
	return (
		<div>
			<DailyDigest repos={repos} workflowRuns={workflowRuns} />
			{/* 
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
        <OrganizationStats
          totalRepos={repos.length}
          totalPRs={repos.reduce((acc, repo) => acc + repo.pullRequests.openCount, 0)}
          failingPipelines={repos.filter((repo) => !repo.workflow.status).length}
        />
      </div> */}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{repos.map((repo) => (
					<RepositoryCard key={repo.id} repo={repo} />
				))}
			</div>

			{repos.length === 0 && (
				<div className="text-center py-12">
					<p className="text-zinc-500 font-mono">No repositories found</p>
				</div>
			)}
		</div>
	);
};
