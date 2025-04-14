export const PullRequestsSkeleton = () => (
    <div className="space-y-6">
        <div className="w-full max-w-md mb-8 h-10 bg-zinc-900/50 rounded-md animate-pulse"></div>

        {[1, 2, 3].map((i) => (
            <div key={i} className="bg-zinc-900/40 border border-zinc-800 rounded-lg overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-6 w-24 bg-zinc-800/70 rounded-md animate-pulse"></div>
                        <div className="h-5 w-6 bg-blue-900/30 rounded-md animate-pulse"></div>
                    </div>
                    <div className="h-4 w-4 bg-zinc-800/70 rounded-full animate-pulse"></div>
                </div>

                <div className="border-t border-zinc-800">
                    {Array.from({ length: i === 1 ? 3 : i === 2 ? 2 : 4 }).map((_, j) => (
                        <div key={j} className="p-4 border-b border-zinc-800 last:border-b-0">
                            <div className="flex items-start gap-3">
                                <div className="h-5 w-5 mt-1 bg-zinc-800/70 rounded-full animate-pulse"></div>
                                <div className="flex-1">
                                    <div className="h-5 w-3/4 bg-zinc-800/70 rounded-md animate-pulse mb-3"></div>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <div className="h-4 w-24 bg-zinc-800/50 rounded-md animate-pulse"></div>
                                        <div className="h-4 w-32 bg-zinc-800/50 rounded-md animate-pulse"></div>
                                        <div className="h-4 w-20 bg-zinc-800/50 rounded-md animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="h-5 w-16 bg-zinc-800/70 rounded-md animate-pulse"></div>
                                    <div className="flex -space-x-2">
                                        {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, k) => (
                                            <div key={k} className="h-6 w-6 rounded-full bg-zinc-800/70 animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
)
