import { LoadingDashboard } from "@/components/loading-dashboard";
import { OrganizationDashboard } from "@/components/organization-dashboard";
import type { Metadata } from "next/types";
import { Suspense } from "react";

const Home = () => (
	<main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950">
		<div className="container mx-auto px-4 py-8">
			<header className="mb-8">
				<div className="flex items-center gap-2">
					<div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse"></div>
					<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
						GFS OS
					</h1>
				</div>
				<p className="text-zinc-400 mt-2 font-mono text-sm">
					// GitHub Fleet Surveillance Operating System
				</p>
			</header>

			<Suspense fallback={<LoadingDashboard />}>
				<OrganizationDashboard />
			</Suspense>
		</div>
	</main>
);

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Overview of organization repositories and resources",
};

export default Home;
