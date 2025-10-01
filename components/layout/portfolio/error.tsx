import { HIcon } from '@/components/ui/icon'

export function PortfolioError({ error }: { error: Error }) {
  return (
    <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 mx-2 mt-2">
      <div className="flex items-start gap-3">
        <HIcon
          variant="secondary"
          icon="lucide:alert-triangle"
          className="text-destructive shrink-0"
          iconClassName="size-4"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-destructive font-medium">Unable to load portfolio data</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {error.message?.includes('Invalid URL')
              ? 'Network connection issue. Please check your connection and try again.'
              : error.message?.includes('API_KEY')
                ? 'Service configuration error. Please contact support.'
                : 'Something went wrong while fetching your portfolio. Please try again later.'}
          </p>
        </div>
      </div>
    </div>
  )
}
