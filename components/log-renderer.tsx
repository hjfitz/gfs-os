"use client";

import { useState } from "react";
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

type LogSegmentProps = {
	str: string;
	classes: string;
};

type LogLineProps = {
	lineNumber: string | number;
	segments: LogSegmentProps[];
	className?: string;
	prefix?: React.ReactNode;
};

const LogLine = ({ lineNumber, segments, className, prefix }: LogLineProps) => {
	return (
		<div className={`hover:bg-zinc-700 w-full transition whitespace-pre py-0.5 flex ${className || ""}`}>
			<span className="text-zinc-500 inline-block w-8 text-right mr-4 flex-shrink-0">{lineNumber}</span>
			<div className="flex-grow flex">
				{prefix}
				<div className="flex-grow">
					{segments.map((segment, idx) => (
						<span key={`${segment.str}-${idx}`} className={segment.classes}>
							{segment.str}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

// Helper function to create a consistent unique key from log content
function createLogKey(log: LogSegmentProps[], prefix: string = ""): string {
	const contentHash = log.map(segment => segment.str).join("").slice(0, 20);
	return `${prefix}-${contentHash}`;
}

export const LogRenderer = ({ logs }: LogRendererProps) => {
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
	// todo: hydrate log parents with log results
	const parsedBetterLogs = presentLogs(logs);

	console.log(JSON.stringify(parsedBetterLogs[0], null, 2));

	const toggleSection = (idx: string) => {
		setOpenSections((curOpenSections) => ({
			...curOpenSections,
			[idx]: !curOpenSections[idx],
		}));
	};

	return (
		<div className="pt-0 border-zinc-800 font-mono text-xs">
			{parsedBetterLogs.map((jobGroup, jobIdx) => {
				const parentKey = `job-${jobIdx}-${jobGroup.rawName}`;
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
						<CollapsibleContent className="pl-0 py-1">
							{jobGroup.children.map((childLog, cIdx, arr) => {
								const baseLineNumber = cIdx + 1;
								const lineNumberOffset = arr
									.slice(0, cIdx)
									.map((gr) => gr.children.length)
									.reduce((acc, cur) => acc + cur, 0);
								const lineNum = baseLineNumber + lineNumberOffset;
								const childKey = `child-${jobIdx}-${cIdx}`;
								
								if (!childLog.children.length) {
									return <LogLine 
										key={`line-${jobIdx}-${cIdx}`}
										lineNumber={lineNum} 
										segments={childLog.log} 
									/>;
								}
								
								return (
									<Collapsible
										key={`collapsible-${jobIdx}-${cIdx}`}
										open={openSections[childKey]}
										onOpenChange={() => toggleSection(childKey)}
									>
										<CollapsibleTrigger className="w-full text-left">
											<LogLine
												lineNumber={lineNum}
												segments={childLog.log}
												prefix={openSections[childKey] ? 
													<ChevronDown className="h-4 w-4 text-zinc-400 mr-2" /> : 
													<ChevronRight className="h-4 w-4 text-zinc-400 mr-2" />
												}
											/>
										</CollapsibleTrigger>
										<CollapsibleContent>
											{childLog.children.map((log, logIdx) => {
												const lowestLineNum = lineNum + logIdx + 1;
												return (
													<LogLine
														key={`inner-${jobIdx}-${cIdx}-${logIdx}`}
														lineNumber={lowestLineNum}
														segments={log}
														className="pl-0"
														prefix={<div className="w-6" />}
													/>
												);
											})}
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
