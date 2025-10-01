'use client'

import { useSwapContext, useSwapForm, useSwapPortfolio, useSwapRoute } from '@/providers/swap/provider'
import RouteDetails from '../route-details'
import Destination from './destination'
import Source from './source'

export default function Sell() {
  const { swapRoute, isSwapRouteLoading } = useSwapRoute()
  const { portfolio, loading } = useSwapPortfolio()
  const { isInsufficientBalance } = useSwapContext()
  const { sourceAmount, sourceToken, setValue, destinationToken } = useSwapForm()
  const { checkDestinationTokenFromSuggestionsAndMutate } = useSwapContext()

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto relative">
      <Source
        portfolioTokens={portfolio.tokens}
        isLoadingPortfolio={loading}
        sourceToken={sourceToken}
        setSourceAmount={(amount) => {
          setValue('sourceAmount', amount)
          checkDestinationTokenFromSuggestionsAndMutate()
        }}
        setSourceToken={(token) => {
          setValue('sourceToken', token)
          checkDestinationTokenFromSuggestionsAndMutate()
        }}
        isInsufficientBalance={isInsufficientBalance}
      />

      {sourceToken && sourceAmount !== '0' && !isInsufficientBalance && (
        <div className="animate-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards">
          <Destination
            swapRoute={swapRoute}
            loading={isSwapRouteLoading}
            sourceToken={sourceToken}
            destinationToken={destinationToken}
            setDestinationToken={(token) => {
              setValue('destinationToken', token)
              checkDestinationTokenFromSuggestionsAndMutate()
            }}
          />
        </div>
      )}

      {swapRoute && (
        <div className="animate-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards">
          <RouteDetails swapRoute={swapRoute} isLoading={isSwapRouteLoading} />
        </div>
      )}
    </div>
  )
}
