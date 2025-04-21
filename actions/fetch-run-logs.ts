"use server";

import { githubService } from "@/lib/github";
import type { WorkflowRunLogs } from "@/lib/types";

export async function getWorkflowRunLogs(
	repoName: string,
	workflowRunId: number,
): Promise<WorkflowRunLogs[]> {
	const logs = await githubService.getWorkflowRunLogs(repoName, workflowRunId);
	return logs;
}
