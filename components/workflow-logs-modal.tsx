"use client";

import {
	CheckCircle,
	ChevronDown,
	ChevronUp,
	Clock,
	Download,
	Search,
	X,
	XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getWorkflowRunLogs } from "@/actions/fetch-run-logs";
import { LogRenderer } from "@/components/log-renderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { WorkflowRunLogs, WorkflowRunWithDetails } from "@/lib/types";
type WorkflowLogsModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	workflowRun: WorkflowRunWithDetails;
};

export const WorkflowLogsModal = ({
	open,
	onOpenChange,
	workflowRun,
}: WorkflowLogsModalProps) => {
	const { repo, run } = workflowRun;
	const [searchTerm, setSearchTerm] = useState("");
	const [logSteps, setLogSteps] = useState<WorkflowRunLogs[]>([]);
	const [filteredLogSteps, setFilteredLogSteps] = useState<WorkflowRunLogs[]>(
		[],
	);
	const [loading, setLoading] = useState(true);
	const [openSteps, setOpenSteps] = useState<Record<string, boolean>>({});

	// Simulate API call to fetch logs
	useEffect(() => {
		if (open) {
			setLoading(true);
			getWorkflowRunLogs(repo.name, run.id).then((logs) => {
				setLogSteps(logs);
				setFilteredLogSteps(logs);
				// Open the first step by default
				if (logs.length > 0) {
					setOpenSteps({ [logs[0].name]: true });
				}

				setLoading(false);
			});
		}
	}, [open, repo.name, run]);

	// Filter logs based on search term
	useEffect(() => {
		if (searchTerm.trim() === "") {
			setFilteredLogSteps(logSteps);
		} else {
			const filtered = logSteps
				.map((step) => {
					const filteredLogs = step.logs.filter((log) =>
						log.toLowerCase().includes(searchTerm.toLowerCase()),
					);
					return {
						...step,
						logs: filteredLogs,
					};
				})
				.filter((step) => step.logs.length > 0);

			setFilteredLogSteps(filtered);
		}
	}, [searchTerm, logSteps]);

	// Toggle step collapse state
	const toggleStep = (stepName: string) => {
		setOpenSteps((prev) => ({
			...prev,
			[stepName]: !prev[stepName],
		}));
	};

	// Status icon based on workflow status
	const StatusIcon = () => {
		if (run.status === "completed" && run.conclusion === "success") {
			return <CheckCircle className="h-4 w-4 text-emerald-400" />;
		}
		if (run.status === "completed" && run.conclusion === "failure") {
			return <XCircle className="h-4 w-4 text-red-400" />;
		}
		if (run.status === "in_progress") {
			return <Clock className="h-4 w-4 text-blue-400 animate-pulse" />;
		}
		return <Clock className="h-4 w-4 text-yellow-400" />;
	};

	// Get status icon for a step
	const getStepStatusIcon = (status: string) => {
		if (status === "success") {
			return <CheckCircle className="h-4 w-4 text-emerald-400" />;
		}
		if (status === "failure") {
			return <XCircle className="h-4 w-4 text-red-400" />;
		}
		if (status === "running") {
			return <Clock className="h-4 w-4 text-blue-400 animate-pulse" />;
		}
		return <Clock className="h-4 w-4 text-yellow-400" />;
	};

	// Get status badge class for a step
	const getStepStatusClass = (status: string) => {
		if (status === "success") {
			return "bg-emerald-900/20 text-emerald-400 border-emerald-900/30";
		}
		if (status === "failure") {
			return "bg-red-900/20 text-red-400 border-red-900/30";
		}
		if (status === "running") {
			return "bg-blue-900/20 text-blue-400 border-blue-900/30";
		}
		return "bg-yellow-900/20 text-yellow-400 border-yellow-900/30";
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-4xl bg-zinc-950 border-zinc-800 text-zinc-100">
				<DialogHeader>
					<div className="flex items-center justify-between">
						<DialogTitle className="flex items-center gap-2 font-mono">
							<StatusIcon />
							{repo.name} / {run.name} #{run.runNumber}
						</DialogTitle>
						<Badge
							variant="outline"
							className={`font-mono text-xs ${
								run.status === "completed" && run.conclusion === "success"
									? "bg-emerald-900/20 text-emerald-400 border-emerald-900/30"
									: run.status === "completed" && run.conclusion === "failure"
										? "bg-red-900/20 text-red-400 border-red-900/30"
										: run.status === "in_progress"
											? "bg-blue-900/20 text-blue-400 border-blue-900/30"
											: "bg-yellow-900/20 text-yellow-400 border-yellow-900/30"
							}`}
						>
							{run.status === "completed"
								? run.conclusion === "success"
									? "Success"
									: "Failed"
								: run.status === "in_progress"
									? "Running"
									: "Queued"}
						</Badge>
					</div>
				</DialogHeader>

				<div className="flex items-center gap-2 mb-4">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
						<Input
							placeholder="Search logs..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-9 bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-600"
						/>
						{searchTerm && (
							<Button
								variant="ghost"
								size="icon"
								className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 text-zinc-500 hover:text-zinc-300"
								onClick={() => setSearchTerm("")}
							>
								<X className="h-3 w-3" />
							</Button>
						)}
					</div>
					<Button
						variant="outline"
						size="sm"
						className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300"
					>
						<Download className="h-4 w-4 mr-2" />
						Download
					</Button>
				</div>

				{loading ? (
					<div className="space-y-4">
						<div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-md p-4">
							<div className="flex items-center gap-3">
								<Skeleton className="h-4 w-4 rounded-full" />
								<Skeleton className="h-5 w-40" />
							</div>
							<div className="flex items-center gap-3">
								<Skeleton className="h-5 w-16" />
								<Skeleton className="h-4 w-4 rounded-full" />
							</div>
						</div>

						<div className="bg-zinc-900 border border-zinc-800 rounded-md p-4">
							<div className="space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-4 w-5/6" />
								<Skeleton className="h-4 w-full" />
							</div>
						</div>

						<div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-md p-4">
							<div className="flex items-center gap-3">
								<Skeleton className="h-4 w-4 rounded-full" />
								<Skeleton className="h-5 w-32" />
							</div>
							<div className="flex items-center gap-3">
								<Skeleton className="h-5 w-16" />
								<Skeleton className="h-4 w-4 rounded-full" />
							</div>
						</div>

						<div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-md p-4">
							<div className="flex items-center gap-3">
								<Skeleton className="h-4 w-4 rounded-full" />
								<Skeleton className="h-5 w-36" />
							</div>
							<div className="flex items-center gap-3">
								<Skeleton className="h-5 w-16" />
								<Skeleton className="h-4 w-4 rounded-full" />
							</div>
						</div>
					</div>
				) : (
					<div className="space-y-4 max-h-[60vh] overflow-auto">
						{filteredLogSteps.length > 0 ? (
							filteredLogSteps.map((step, index) => (
								<Collapsible
									key={index}
									open={openSteps[step.name]}
									onOpenChange={() => toggleStep(step.name)}
									className="bg-zinc-900 border border-zinc-800 rounded-md overflow-hidden"
								>
									<CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
										<div className="flex items-center gap-3">
											{getStepStatusIcon(step.status)}
											<span className="text-zinc-200 font-medium">
												{step.name}
											</span>
										</div>
										<div className="flex items-center gap-3">
											<Badge
												variant="outline"
												className={`font-mono text-xs ${getStepStatusClass(step.status)}`}
											>
												{step.status === "success"
													? "Success"
													: step.status === "failure"
														? "Failed"
														: step.status === "running"
															? "Running"
															: "Queued"}
											</Badge>
											{openSteps[step.name] ? (
												<ChevronUp className="h-4 w-4 text-zinc-400" />
											) : (
												<ChevronDown className="h-4 w-4 text-zinc-400" />
											)}
										</div>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<div className="p-4 pt-0 border-t border-zinc-800 mt-4 font-mono text-xs">
											<LogRenderer logs={step.logs} />
										</div>
									</CollapsibleContent>
								</Collapsible>
							))
						) : (
							<div className="bg-zinc-900 border border-zinc-800 rounded-md p-6 text-center">
								<p className="text-zinc-500">
									No logs matching your search criteria
								</p>
							</div>
						)}
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};
