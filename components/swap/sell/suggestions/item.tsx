import Image from 'next/image'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { HumanizeNumber } from '@/components/ui/humanize-number'
import { getNetworkAsset } from '@/lib/constant'
import type { SwapRoute } from '@/types/route'
import type { Network } from '@/types/token'

function SuggestionItem({
  suggestion,
  index,
  onSelect,
  selected = false,
}: {
  suggestion: SwapRoute
  index: number
  onSelect: () => void
  selected?: boolean
}) {
  const networkAsset = getNetworkAsset(suggestion.metadata.tokenOut.network as Network)

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
        <div
          role="button"
          tabIndex={selected ? -1 : 0}
          onKeyDown={(e) => {
            if (!selected && (e.key === 'Enter' || e.key === ' ')) {
              onSelect()
            }
          }}
          className={`relative animate-in slide-in-from-right fade-in transition-all duration-300 ${
            selected ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105'
          }`}
          style={{
            animationDelay: `${index * 150}ms`,
            animationFillMode: 'both',
          }}
          onClick={selected ? undefined : onSelect}
        >
          <div
            className={`rounded-full flex items-center justify-center p-1 backdrop-blur-sm transition-colors duration-300 ease-in-out ${
              selected ? 'bg-primary/60 ring-2 ring-primary' : 'bg-primary/40 hover:bg-primary/60'
            }`}
          >
            <Image
              src={suggestion.metadata.tokenOut.logoURI}
              alt={suggestion.metadata.tokenOut.symbol}
              width={24}
              height={24}
              className="w-7 h-7 rounded-full"
            />
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <div
              className={`rounded-full bg-background flex items-center justify-center shadow-sm ring-2 ${
                selected ? 'ring-primary' : 'ring-border'
              }`}
              style={{
                width: '16px',
                height: '16px',
              }}
            >
              <Image
                src={networkAsset.logoURI}
                alt={networkAsset.name}
                width={12}
                height={12}
                className="w-3 h-3 rounded-full"
              />
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side="top">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Image
              src={suggestion.metadata.tokenOut.logoURI}
              alt={suggestion.metadata.tokenOut.symbol}
              width={20}
              height={20}
              className="w-5 h-5 rounded-full"
            />
            <span className="font-medium text-sm">{suggestion.metadata.tokenOut.symbol}</span>
            <span className="text-xs text-muted-foreground">on {suggestion.metadata.tokenOut.network}</span>
            {selected && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">Selected</span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Amount:</span>
              <div className="text-right flex gap-1">
                <div className="font-medium">
                  <HumanizeNumber prefix="" number={suggestion.tokenOut.rawAmountFormatted} />{' '}
                  {suggestion.metadata.tokenOut.symbol}
                </div>
                ({' '}
                <div className="text-muted-foreground">
                  <HumanizeNumber number={suggestion.tokenOut.amountInUsd} />
                </div>
                )
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Price Impact:</span>
              <div className="text-right">
                <div
                  className={`font-medium ${
                    parseFloat(suggestion.totalPriceImpact.inPercentage) > 5
                      ? 'text-red-500'
                      : parseFloat(suggestion.totalPriceImpact.inPercentage) > 1
                        ? 'text-yellow-500'
                        : 'text-green-500'
                  }`}
                >
                  {suggestion.totalPriceImpact.inPercentage}%
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Est. Time:</span>
              <span className="text-sm font-medium">{suggestion.timeEstimation}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export { SuggestionItem }
