export function LoadingDashboard() {
	return (
		<div>
			<div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
				<div className="flex gap-4">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="h-16 w-24 md:w-32 bg-zinc-900/50 rounded-md animate-pulse"
						/>
					))}
				</div>
				<div className="w-full md:w-64 h-10 bg-zinc-900/50 rounded-md animate-pulse" />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, i) => (
					<div
						key={i}
						className="h-64 bg-zinc-900/40 rounded-lg animate-pulse"
					/>
				))}
			</div>
		</div>
	);
}
