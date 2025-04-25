type JobLogGroup = {
	jobName: string; // get this by fuzzy-matching with the response from the jobs api
	rawName: string; // just in case we can't fuzzy-match
	children: LogGroup[];
};

type LogGroup = {
	log: string;
	children: string[];
};

type WorkflowLogs = JobLogGroup[];

export function parseWorkflowLogs(logs: string[]): WorkflowLogs {

	const workflowLogs: WorkflowLogs = [{ 
		jobName: "Setup", 
		rawName: "setup", 
		children: [] 
	}];

	for (let i = 0; i < logs.length; i++) {
		let rawLog = logs[i];
		// first, we handle the topmost grouping
		let [datestamp, ...rest] = rawLog.split(" ");
		let curLog = rest.join(" ");

		// todo: need to add some handling for ##[endgroup] on the Run
		if (curLog.startsWith("##[group]Run ")) {
			// add something new to workflowLogs
			const tempJobName = curLog.replace("##[group]Run ", "");
			workflowLogs.push({
				jobName: tempJobName,
				rawName: curLog,
				children: [],
			});
		} else {
			// otherwise, it's a child
			// but it could be a group that we define by expanding window - that's a // todo
			const curParent: LogGroup = {
				log: curLog.replace("##[group]", "").trim(),
				children: [],
			};

			workflowLogs[workflowLogs.length - 1].children.push(curParent); // i is a placeholder
			if (curLog.startsWith("##[group]")) {
				// we enter a nested group - the next endgroup will close this
				// if there's an endgroup for the parent run, it will be afterwards
				// start expanding our window...
				do {
					i += 1;
					rawLog = logs[i];
					[datestamp, ...rest] = rawLog.split(" ");
					curLog = rest.join(" ");
					if (!curLog.startsWith("##[endgroup]")) {
						curParent.children.push(curLog);
					}
				} while (!curLog.startsWith("##[endgroup]"));
			}
		}
	}

	return workflowLogs;
}
