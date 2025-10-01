import { useSwapContext } from '@/providers/swap/provider'
import { SuggestionItem } from './item'
import { SuggestionSkeleton } from './skeleton'

export function Suggestions() {
  const {
    swapRoute: selectedSwapRoute,
    suggestions,
    handleSelectSuggestion,
    suggestionsLoading,
    suggestionsError,
  } = useSwapContext()

  if (suggestionsLoading) {
    return (
      <div className="flex gap-2">
        {Array.from({ length: 4 }, (_, index) => (
          <SuggestionSkeleton key={`skeleton-${Date.now()}-${index}`} index={index} />
        ))}
      </div>
    )
  }

  if (suggestionsError) {
    return (
      <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
        Failed to load suggestions. Please try again.
      </div>
    )
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">No suggestions available</div>
    )
  }

  return (
    <div className="flex gap-2">
      {suggestions.map((suggestion, index) => (
        <SuggestionItem
          selected={
            selectedSwapRoute?.swapRoute?.metadata.tokenOut.address === suggestion.tokenMeta.address &&
            selectedSwapRoute?.swapRoute?.metadata.tokenOut.network === suggestion.tokenMeta.network
          }
          key={`${suggestion.tokenMeta.address}-${suggestion.tokenMeta.network}-${index}`}
          suggestion={suggestion}
          index={index}
          onSelect={() => handleSelectSuggestion(suggestion)}
        />
      ))}
    </div>
  )
}
