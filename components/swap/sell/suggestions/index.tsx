import { useSwapContext } from '@/providers/swap/provider'
import { SuggestionItem } from './item'
import { SuggestionSkeleton } from './skeleton'

export function Suggestions() {
  const { swapRoute: selectedSwapRoute, suggestions, handleSelectSuggestion, suggestionsLoading } = useSwapContext()

  if (suggestionsLoading) {
    return (
      <div className="flex gap-2">
        {Array.from({ length: 4 }, (_, index) => (
          <SuggestionSkeleton key={`skeleton-${Date.now()}-${index}`} index={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {suggestions.map((suggestion, index) => (
        <SuggestionItem
          selected={
            selectedSwapRoute?.swapRoute?.metadata.tokenOut.address === suggestion.metadata.tokenOut.address &&
            selectedSwapRoute?.swapRoute?.metadata.tokenOut.network === suggestion.metadata.tokenOut.network
          }
          key={suggestion.intentId}
          suggestion={suggestion}
          index={index}
          onSelect={() => handleSelectSuggestion(suggestion)}
        />
      ))}
    </div>
  )
}
