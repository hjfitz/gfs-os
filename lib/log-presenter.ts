// probably not a presenter tbh, but parsed was already taken

import { parseAnsi } from "./log-colorizer";
import { parseWorkflowLogs } from "./log-parser";

export function presentLogs(logs: string[]) {
	// this should become groupLogs(), and the body here should be parseLogs()
	const groupedLogs = parseWorkflowLogs(logs);
	return groupedLogs.map((logGroup) => ({
		jobName: logGroup.jobName,
		rawName: logGroup.rawName,
		children: logGroup.children.map((child) => ({
			// use the 0th element because the ansi parser expects multiple lines
			log: parseAnsi(child.log)[0],
			children: child.children.map((c) => parseAnsi(c)[0]),
		})),
	}));
}
