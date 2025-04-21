import { LoadingDashboard } from "@/components/loading-dashboard";
import { RepositoryDashboard } from "@/components/repository-dashboard";
import { githubService } from "@/lib/github";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type RepositoryPageProps = {
	params: Promise<{ repoName: string }>;
};

const RepositoryPage = async ({ params }: RepositoryPageProps) => (
	<main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950">
		<div className="container mx-auto px-4 py-8">
			<Link
				href="/"
				className="inline-flex items-center text-zinc-400 hover:text-blue-400 transition-colors mb-6 font-mono text-sm"
			>
				<ChevronLeft className="h-4 w-4 mr-1" />
				Back to Dashboard
			</Link>

			<Suspense fallback={<LoadingDashboard />}>
				<RepositoryDashboard params={await params} />
			</Suspense>
		</div>
	</main>
);

export default RepositoryPage;

// Generate metadata for the page
export async function generateMetadata({
	params,
}: { params: { repoName: string } }) {
	const { repoName } = params;

	try {
		// todo: cache
		const repoDetails = await githubService.getRepoData(repoName);

		if (!repoDetails) {
			return {
				title: "Repository Not Found",
			};
		}

		return {
			title: `${repoDetails.name} - GitHub Dashboard`,
			description:
				repoDetails.description ||
				`View details for ${repoDetails.name} repository`,
		};
	} catch (error) {
		return {
			title: "Repository - GitHub Dashboard",
		};
	}
}
