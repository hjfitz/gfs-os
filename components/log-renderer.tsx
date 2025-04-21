type LogRendererProps = {
	logs: string[];
};

const logColors = {
	ERROR: "text-red-400",
	WARNING: "text-yellow-400",
	SUCCESS: "text-emerald-400",
	INFO: "text-blue-400",
};

export const LogRenderer = ({ logs }: LogRendererProps) => {
	return (
		<pre className="whitespace-pre-wrap">
			{logs.map((log, logIndex) => {
				let className = "text-zinc-400";
				if (
					["ERROR", "FAIL", "##[error]"].some((keyword) =>
						log.includes(keyword),
					)
				) {
					className = logColors.ERROR;
				} else if (
					["WARNING", "WARN", "##[warning]"].some((keyword) =>
						log.includes(keyword),
					)
				) {
					className = logColors.WARNING;
				} else if (
					["SUCCESS", "PASS", "##[success]"].some((keyword) =>
						log.includes(keyword),
					)
				) {
					className = logColors.SUCCESS;
				} else {
					className = logColors.INFO;
				}

				return (
					<div key={logIndex} className={className}>
						{log}
					</div>
				);
			})}
		</pre>
	);
};
