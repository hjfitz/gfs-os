import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

type PullRequest = {
	title: string;
	link: string;
	updatedAt: string;
	owner: string;
};

type PullRequestListProps = {
	pullRequests: PullRequest[];
};

export const PullRequestList = ({ pullRequests }: PullRequestListProps) => {
	if (pullRequests.length === 0) {
		return (
			<div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/50">
				<p className="text-zinc-400">No open pull requests found.</p>
			</div>
		);
	}

	return (
		<div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/30">
			<ul className="divide-y divide-zinc-800">
				{pullRequests.map((pr) => (
					<li
						key={pr.link}
						className="p-4 hover:bg-zinc-800/50 transition-colors"
					>
						<Link
							href={pr.link}
							target="_blank"
							rel="noopener noreferrer"
							className="block"
						>
							<div className="flex items-start">
								<div
									className={
										"flex-shrink-0 w-3 h-3 mt-1.5 rounded-full bg-green-500"
									}
								/>
								<div className="ml-3">
									<p className="font-medium text-zinc-100">{pr.title}</p>
									<p className="text-sm text-zinc-400">
										opened {formatDistanceToNow(new Date(pr.updatedAt))} ago
									</p>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
