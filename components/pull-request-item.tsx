import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { config } from "@/lib/config";
import type { PullRequest } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpDown, Calendar, GitPullRequest, User } from "lucide-react";

type PullRequestItemProps = {
	pr: PullRequest;
	repoName: string;
};

export const PullRequestItem = ({ pr, repoName }: PullRequestItemProps) => (
	<a
		href={`https://github.com/${config.github.org}/${repoName}/pull/${pr.number}`}
		target="_blank"
		rel="noopener noreferrer"
		className="block cursor-pointer"
	>
		<div className="p-4 border-b border-zinc-800 last:border-b-0 hover:bg-zinc-800/30 transition-colors">
			<div className="flex items-start gap-3">
				<GitPullRequest
					className={`h-5 w-5 mt-1 ${pr.isDraft ? "text-zinc-500" : "text-blue-400"}`}
				/>
				<div className="flex-1">
					<h3 className="text-zinc-200 font-medium mb-1">
						<span className="group-hover:text-blue-400 transition-colors">
							{pr.title}
						</span>
					</h3>
					<div className="flex flex-wrap gap-3 text-xs text-zinc-400 mt-2">
						<div className="flex items-center">
							<User className="h-3 w-3 mr-1" />
							<div className="flex items-center">
								<Avatar className="h-4 w-4 mr-1">
									<AvatarImage
										src={pr.author.avatarUrl || "/placeholder.svg"}
										alt={pr.author.login}
									/>
									<AvatarFallback className="text-[8px]">
										{pr.author.login.substring(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<span>{pr.author.login}</span>
							</div>
						</div>
						<div className="flex items-center">
							<Calendar className="h-3 w-3 mr-1" />
							<span>
								Opened {formatDistanceToNow(new Date(pr.createdAt))} ago
							</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-end gap-2">
					<Badge
						variant="outline"
						className={`font-mono text-xs ${
							pr.isDraft
								? "bg-zinc-800/50 text-zinc-400"
								: pr.isReady
									? "bg-emerald-900/20 text-emerald-400 border-emerald-900/30"
									: "bg-yellow-900/20 text-yellow-400 border-yellow-900/30"
						}`}
					>
						{pr.isDraft ? "Draft" : pr.isReady ? "Ready" : "Review Needed"}
					</Badge>
				</div>
			</div>
		</div>
	</a>
);
