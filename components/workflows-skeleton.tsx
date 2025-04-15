export const WorkflowsSkeleton = () => (
  <div className="space-y-8">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-zinc-900/40 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="h-1 w-full bg-zinc-800"></div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 bg-zinc-800/70 rounded-full animate-pulse"></div>
              <div>
                <div className="h-6 w-32 bg-zinc-800/70 rounded-md animate-pulse"></div>
                <div className="h-4 w-48 bg-zinc-800/50 rounded-md animate-pulse mt-1"></div>
              </div>
            </div>

            <div className="h-6 w-20 bg-zinc-800/70 rounded-md animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-5 w-full bg-zinc-800/50 rounded-md animate-pulse"></div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-16 w-28 bg-zinc-800/50 rounded-md animate-pulse"></div>
            ))}
          </div>

          <div className="h-px w-full bg-zinc-800 my-6"></div>

          <div className="h-6 w-16 bg-zinc-800/70 rounded-md animate-pulse mb-4"></div>

          <div className="space-y-4">
            {Array.from({ length: i + 1 }).map((_, j) => (
              <div key={j} className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 bg-zinc-700 rounded-full animate-pulse"></div>
                    <div className="h-5 w-40 bg-zinc-700 rounded-md animate-pulse"></div>
                  </div>
                  <div className="h-5 w-20 bg-zinc-700 rounded-md animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
)
