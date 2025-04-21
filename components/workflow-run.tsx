import { githubService } from "@/lib/github";
import { redirectToNotFound } from "@/lib/not-found-redirect";
import { WorkflowRunCard } from "./workflow-run-card";

type WorkflowRunProps = {
	repoName: string;
	runId: string;
};

export const WorkflowRun = async ({ repoName, runId }: WorkflowRunProps) => {
	const workflowRun = await githubService.getWorkflowRun(repoName, runId);

	if (!workflowRun) {
		redirectToNotFound("workflow-not-found");
		return null;
	}

	return <WorkflowRunCard workflowRun={workflowRun} />;
};
