import type { WorkflowStep } from "@/lib/types";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface WorkflowStepsListProps {
	steps: WorkflowStep[];
}

export const WorkflowStepsList = ({ steps }: WorkflowStepsListProps) => {
	if (steps.length === 0) {
		return (
			<div className="text-zinc-500 text-center py-2">
				No steps found for this job
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{steps.map((step) => (
				<div
					key={step.id}
					className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-md border border-zinc-800/50"
				>
					<div className="flex items-center gap-3">
						{step.status === "completed" && step.conclusion === "success" && (
							<CheckCircle className="h-4 w-4 text-emerald-400" />
						)}
						{step.status === "completed" && step.conclusion === "failure" && (
							<XCircle className="h-4 w-4 text-red-400" />
						)}
						{(step.status === "in_progress" || step.status === "queued") && (
							<Clock
								className={`h-4 w-4 ${step.status === "in_progress" ? "text-blue-400 animate-pulse" : "text-yellow-400"}`}
							/>
						)}
						<span className="text-zinc-300 font-mono text-sm">{step.name}</span>
					</div>

					<div className="text-xs font-mono text-zinc-500">
						{step.status === "completed"
							? `${step.duration}s`
							: step.status === "in_progress"
								? "Running..."
								: "Queued"}
					</div>
				</div>
			))}
		</div>
	);
};
