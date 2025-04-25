"use client";

import { useState } from "react";
import { parseWorkflowLogs } from "@/lib/log-parser";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./ui/collapsible";
import {
	AlertTriangle,
	CheckCircle,
	ChevronDown,
	ChevronRight,
	Clock,
	Info,
	XCircle,
} from "lucide-react";
import { parseAnsi } from "@/lib/log-colorizer";
import { presentLogs } from "@/lib/log-presenter";

type LogRendererProps = {
	logs: string[];
};

enum LOGCOLOR {
	ERROR = "text-red-400",
	WARNING = "text-yellow-400",
	SUCCESS = "text-emerald-400",
	INFO = "text-blue-400",
}

function getClassnameForLevel(log: string): LOGCOLOR {
	if (["ERROR", "FAIL", "##[error]"].some((keyword) => log.includes(keyword))) {
		return LOGCOLOR.ERROR;
	}
	if (
		["WARNING", "WARN", "##[warning]"].some((keyword) => log.includes(keyword))
	) {
		return LOGCOLOR.WARNING;
	}
	if (
		["SUCCESS", "PASS", "##[success]"].some((keyword) => log.includes(keyword))
	) {
		return LOGCOLOR.SUCCESS;
	}
	return LOGCOLOR.INFO;
}

export const LogRendererOld = ({ logs }: LogRendererProps) => (
	<pre className="whitespace-pre-wrap">
		{logs.map((log) => {
			return (
				<div key={log} className={getClassnameForLevel(log)}>
					{log}
				</div>
			);
		})}
	</pre>
);

type StatusIconProps = {
	status?: string;
};

const StatusIcon = ({ status }: StatusIconProps) => {
	switch (status) {
		case "success":
			return <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />;
		case "failure":
			return <XCircle className="h-4 w-4 text-red-400 mr-2" />;
		case "running":
			return <Clock className="h-4 w-4 text-blue-400 animate-pulse mr-2" />;
		case "pending":
			return <Clock className="h-4 w-4 text-yellow-400 mr-2" />;
		case "warning":
			return <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2" />;
		default:
			return <Info className="h-4 w-4 text-blue-400 mr-2" />;
	}
};

type LogChildProps = {
	className?: string;
	childLog: {
		log: Array<{
			str: string;
			classes: string;
		}>;
	};
};

const LogChild = ({ childLog, className }: LogChildProps) => {
	return (
		<p className="hover:bg-zinc-700 w-full transition whitespace-pre py-0.5">
			{childLog.log.map((l) => (
				<span
					key={l.str}
					className={[l.classes, className].join(" ")}
				>
					{l.str}
				</span>
			))}
		</p>
	);
};

export const LogRenderer = ({ logs }: LogRendererProps) => {
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
	// todo: hydrate log parents with log results
	const parsedBetterLogs = presentLogs(logs);

	const toggleSection = (idx: string) => {
		setOpenSections((curOpenSections) => ({
			...curOpenSections,
			[idx]: !curOpenSections[idx],
		}));
	};

	return (
		<div className="pt-0 border-zinc-800 font-mono text-xs">
			{parsedBetterLogs.map((jobGroup, idx) => {
				const parentKey = `${jobGroup.rawName}${idx}`;
				return (
					<Collapsible
						key={parentKey}
						open={openSections[parentKey]}
						onOpenChange={() => toggleSection(parentKey)}
					>
						<CollapsibleTrigger
							className={`hover:bg-zinc-800 w-full transition py-2 px-4 rounded-md ${openSections[parentKey] && "bg-zinc-800"}`}
						>
							<div className="flex">
								{openSections[parentKey] ? (
									<ChevronDown className="h-4 w-4 text-zinc-400 mr-2" />
								) : (
									<ChevronRight className="h-4 w-4 text-zinc-400 mr-2" />
								)}
								<StatusIcon />
								<span className="text-zinc-100">
									{jobGroup.jobName ?? jobGroup.rawName}
								</span>
							</div>
						</CollapsibleTrigger>
						<CollapsibleContent className="pl-8 py-1">
							{jobGroup.children.map((childLog, cIdx) => {
								const childKey = `${idx}${childLog}${cIdx}`;
								if (!childLog.children.length) {
									return <LogChild childLog={childLog} />;
								}
								return (
									<Collapsible
										key={childLog.log.join("")}
										open={openSections[childKey]}
										onOpenChange={() => toggleSection(childKey)}
									>
										<CollapsibleTrigger className="flex w-full text-left hover:bg-zinc-700">
											{openSections[childKey] ? (
												<ChevronDown className="h-4 w-4 text-zinc-400 mr-2" />
											) : (
												<ChevronRight className="h-4 w-4 text-zinc-400 mr-2" />
											)}
											<LogChild childLog={childLog} />
										</CollapsibleTrigger>
										<CollapsibleContent>
											{childLog.children.map((log) => (
												<p
													className="pl-6 hover:bg-zinc-800"
													key={log.join("")}
												>
													{log.map((l) => (
														<span key={l.str} className={l.classes}>
															{l.str}
														</span>
													))}
												</p>
											))}
										</CollapsibleContent>
									</Collapsible>
								);
							})}
						</CollapsibleContent>
					</Collapsible>
				);
			})}
		</div>
	);
};
