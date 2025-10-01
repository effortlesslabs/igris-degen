'use client'

export default function TokensLoader() {
  return (
    <div className="flex flex-col py-3">
      {Array.from({ length: 6 }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton items
        <div key={`token-skeleton-${index}`} className="p-2 cursor-pointer rounded-2xl w-full animate-pulse">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              {/* Token Icon with Background */}
              <div className="relative">
                <div className="rounded-full flex items-center justify-center p-1 bg-muted animate-pulse">
                  <div className="w-8 h-8 bg-muted/50 rounded-full animate-pulse" />
                </div>

                {/* Network logo skeleton */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-4">
                  <div className="rounded-full bg-background flex items-center justify-center shadow-sm ring-2 ring-border w-4 h-4 animate-pulse">
                    <div className="w-3 h-3 bg-muted rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Token Info Skeleton */}
              <div className="flex flex-col items-start">
                <div className="h-5 bg-muted rounded w-24 animate-pulse mb-1" />
                <div className="h-4 bg-muted rounded w-32 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
