'use client'

import { Button } from '@/components/ui/button'
import { HIcon } from '@/components/ui/icon'
import { useSwapContext, useSwapForm, useSwapPortfolio, useSwapRoute } from '@/providers/swap/provider'
import RouteDetails from '../route-details'
import Destination from './destination'
import Source from './source'

export default function Sell() {
  const { swapRoute, isSwapRouteLoading } = useSwapRoute()
  const { portfolio, loading } = useSwapPortfolio()
  const { isInsufficientBalance } = useSwapContext()
  const { sourceAmount, sourceToken, setValue, destinationToken } = useSwapForm()

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto relative">
      <Source
        portfolioTokens={portfolio.tokens}
        isLoadingPortfolio={loading}
        sourceToken={sourceToken}
        setSourceAmount={(amount) => setValue('sourceAmount', amount)}
        setSourceToken={(token) => setValue('sourceToken', token)}
        isInsufficientBalance={isInsufficientBalance}
      />

      {sourceToken && sourceAmount !== '0' && !isInsufficientBalance && (
        <div className="animate-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards">
          <Destination
            swapRoute={swapRoute}
            loading={isSwapRouteLoading}
            sourceToken={sourceToken}
            destinationToken={destinationToken}
            setDestinationToken={(token) => setValue('destinationToken', token)}
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
