'use client'

import { HIcon } from '@/components/ui/icon'

export default function TokensEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Empty State Icon */}
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <HIcon icon="lucide:search-x" iconClassName="size-8 text-muted-foreground" />
      </div>

      {/* Empty State Text */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground">No tokens found</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Try adjusting your search or network filters to find the tokens you're looking for.
        </p>
      </div>
    </div>
  )
}
