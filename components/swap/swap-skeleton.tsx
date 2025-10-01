'use client'

// Compact skeleton for loading states
export function SwapTabsSkeleton() {
  return (
    <div className="flex gap-8 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-9 w-16 bg-muted rounded-md" />
      ))}
    </div>
  )
}

// Skeleton for just the buy section
export function BuySkeleton() {
  return (
    <div className="flex flex-col gap-5 w-1/3 animate-pulse">
      {/* Destination */}
      <div className="space-y-3 p-4 bg-card border rounded-lg">
        <div className="flex justify-between items-center">
          <div className="h-4 w-16 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-muted rounded-full" />
          <div className="flex-1">
            <div className="h-6 w-24 bg-muted rounded mb-1" />
            <div className="h-4 w-16 bg-muted rounded" />
          </div>
          <div className="h-8 w-24 bg-muted rounded" />
        </div>
      </div>

      {/* Source */}
      <div className="space-y-3 p-4 bg-card border rounded-lg">
        <div className="flex justify-between items-center">
          <div className="h-4 w-16 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-muted rounded-full" />
          <div className="flex-1">
            <div className="h-6 w-24 bg-muted rounded mb-1" />
            <div className="h-4 w-16 bg-muted rounded" />
          </div>
          <div className="h-8 w-24 bg-muted rounded" />
        </div>
      </div>

      {/* Route Details */}
      <div className="space-y-3 p-4 bg-card border rounded-lg">
        <div className="h-5 w-32 bg-muted rounded" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-4 w-16 bg-muted rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-12 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton for execute button
export function ExecuteSkeleton() {
  return (
    <div className="w-1/5 animate-pulse">
      <div className="h-12 w-full bg-muted rounded-lg" />
    </div>
  )
}
