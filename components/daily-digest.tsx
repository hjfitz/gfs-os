import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RepoData, WorkflowRunWithDetails } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { format } from "date-fns";
import {
	AlertTriangle,
	ArrowRight,
	GitPullRequest,
	Terminal,
	Zap,
} from "lucide-react";
import Link from "next/link";

interface DailyDigestProps {
	repos: RepoData[];
	workflowRuns: WorkflowRunWithDetails[];
}

export function DailyDigest({ repos, workflowRuns }: DailyDigestProps) {
	const today = new Date();
	const formattedDate = format(today, "EEEE, MMMM d, yyyy");

	// Calculate total PRs
	const totalPRs = repos.reduce(
		(acc, repo) => acc + repo.pullRequests.openCount,
		0,
	);

	// Find failing workflows
	const failingWorkflows = workflowRuns.filter(
		(wr) => wr.run.status === "completed" && wr.run.conclusion === "failure",
	);

	// Get the most recent failing workflow
	const mostRecentFailure =
		failingWorkflows.length > 0
			? failingWorkflows.sort(
					(a, b) =>
						new Date(b.run.updatedAt).getTime() -
						new Date(a.run.updatedAt).getTime(),
				)[0]
			: null;

	// Generate resolution suggestions based on the failure type
	const getResolutionSuggestions = (failure: WorkflowRunWithDetails) => {
		// Find the failing job
		const failingJob = failure.jobs.find(
			(job) => job.status === "completed" && job.conclusion === "failure",
		);

		if (!failingJob) return [];

		const jobName = failingJob.name.toLowerCase();
		switch (jobName) {
			case "e2e":
				return [
					"Check if the infrastructure is being deployed correctly",
					"Check if any external services are failing",
					"Check if the logs for specific test failures",
				];
			case "test":
				return [
					"Check the test logs for specific test failures",
					"Verify if recent code changes broke existing functionality",
					"Run the failing tests locally to debug the issue",
				];
			case "build":
				return [
					"Look for compilation errors in the build logs",
					"Check for missing dependencies or version conflicts",
					"Verify that all imports are correctly resolved",
				];
			case "lint":
				return [
					"Review code style and formatting issues",
					"Run linter locally to identify and fix issues",
					"Check for unused variables or imports",
				];
			case "deploy":
				return [
					"Verify terraform is valid",
					"Check if the remote state is locked",
					"Review environment variables and configuration",
				];
			default:
				return [
					"Review the job logs for specific error messages",
					"Check if the failure is related to infrastructure issues",
					"Verify if similar jobs have failed recently",
				];
		}
	};

	return (
		<Card className="bg-zinc-900/40 border-zinc-800 mb-8 overflow-hidden">
			<div className="h-1 w-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600" />
			<CardHeader className="pb-2">
				<div className="flex justify-between items-start">
					<CardTitle className="text-zinc-100 font-mono text-xl">
						Daily Digest
					</CardTitle>
					<Badge
						variant="outline"
						className="font-mono text-xs bg-zinc-800/50 text-zinc-400"
					>
						{formattedDate}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					{/* Welcome section */}
					{/* <div className="border-l-2 border-blue-500 pl-4">
            <h3 className="text-zinc-200 font-medium mb-1">Welcome to GFS OS</h3>
            <p className="text-zinc-400 text-sm">
              Here's your daily overview of GitHub activity across your organization.
            </p>
          </div> */}

					{/* Stats overview */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-zinc-800/30 rounded-md p-4">
							<div className="flex items-start">
								<GitPullRequest className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
								<div>
									<h4 className="text-zinc-300 font-medium mb-1">
										Pull Requests
									</h4>
									<p className="text-zinc-500 text-sm mb-2">
										You have{" "}
										<span className="text-zinc-300 font-mono">{totalPRs}</span>{" "}
										open pull requests across {repos.length} repositories.
									</p>
									<Link
										href="/pull-requests"
										className="text-blue-400 hover:text-blue-300 transition-colors text-xs flex items-center"
									>
										View all pull requests
										<ArrowRight className="h-3 w-3 ml-1" />
									</Link>
								</div>
							</div>
						</div>

						<div className="bg-zinc-800/30 rounded-md p-4">
							<div className="flex items-start">
								<AlertTriangle
									className={`h-5 w-5 mt-0.5 mr-3 ${failingWorkflows.length > 0 ? "text-red-400" : "text-emerald-400"}`}
								/>
								<div>
									<h4 className="text-zinc-300 font-medium mb-1">
										Workflow Status
									</h4>
									<p className="text-zinc-500 text-sm mb-2">
										{failingWorkflows.length > 0 ? (
											<span>
												There are{" "}
												<span className="text-red-400 font-mono">
													{failingWorkflows.length}
												</span>{" "}
												failing workflows that need attention.
											</span>
										) : (
											<span>
												All workflows are currently{" "}
												<span className="text-emerald-400">passing</span>. Great
												job!
											</span>
										)}
									</p>
									<Link
										href="/workflows"
										className="text-blue-400 hover:text-blue-300 transition-colors text-xs flex items-center"
									>
										View all workflows
										<ArrowRight className="h-3 w-3 ml-1" />
									</Link>
								</div>
							</div>
						</div>
					</div>

					{/* Recent failure analysis */}
					{mostRecentFailure && (
						<div className="bg-red-950/20 border border-red-900/30 rounded-md p-4">
							<div className="flex items-start">
								<Terminal className="h-5 w-5 text-red-400 mt-0.5 mr-3" />
								<div>
									<h4 className="text-zinc-200 font-medium mb-1">
										Recent Failure Analysis
									</h4>
									<p className="text-zinc-400 text-sm mb-3">
										<span className="text-red-400 font-mono">
											{mostRecentFailure.repo.name}
										</span>{" "}
										workflow
										<span className="text-zinc-300 font-mono">
											{" "}
											{mostRecentFailure.run.name}
										</span>{" "}
										failed{" "}
										{formatDistanceToNow(
											new Date(mostRecentFailure.run.updatedAt),
										)}{" "}
										ago.
									</p>

									<div className="space-y-2 mb-3">
										<h5 className="text-zinc-300 text-xs flex items-center">
											<Zap className="h-3 w-3 text-yellow-400 mr-1" />
											Suggested Actions:
										</h5>
										<ul className="space-y-1 pl-4">
											{getResolutionSuggestions(mostRecentFailure).map(
												(suggestion, index) => (
													<li
														key={index}
														className="text-zinc-400 text-xs list-disc"
													>
														{suggestion}
													</li>
												),
											)}
										</ul>
									</div>

									<Link
										href={`/workflows/${mostRecentFailure.repo.name}/${mostRecentFailure.run.id}`}
										className="text-blue-400 hover:text-blue-300 transition-colors text-xs flex items-center"
									>
										View workflow details
										<ArrowRight className="h-3 w-3 ml-1" />
									</Link>
								</div>
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
