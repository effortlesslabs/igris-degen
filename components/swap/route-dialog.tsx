'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { HumanizeNumber } from '@/components/ui/humanize-number'
import { cn } from '@/lib/utils'
import type { SwapRoute } from '@/types/route'

interface RouteDialogProps {
  swapRoute: SwapRoute | null
  isLoading?: boolean
}

export default function RouteDialog({ swapRoute, isLoading = false }: RouteDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const routeInfo = useMemo(() => {
    if (!swapRoute) {
      return {
        hasData: false,
        currencyIn: { amount: '0', symbol: '', usd: '0' },
        currencyOut: { amount: '0', symbol: '', usd: '0' },
        steps: [],
        impact: null,
        slippage: null,
      }
    }

    return {
      hasData: true,
      currencyIn: {
        amount: swapRoute.tokenIn.rawAmountFormatted,
        symbol: swapRoute.metadata.tokenIn.symbol,
        usd: swapRoute.tokenIn.amountInUsd,
      },
      currencyOut: {
        amount: swapRoute.tokenOut.rawAmountFormatted,
        symbol: swapRoute.metadata.tokenOut.symbol,
        usd: swapRoute.tokenOut.amountInUsd,
      },
      steps: swapRoute.steps,
      impact: swapRoute.totalPriceImpact,
      slippage: null, // Route type doesn't have slippage info
      bridge: swapRoute.bridge,
    }
  }, [swapRoute])

  // Default display when no quote available
  if (!routeInfo.hasData) {
    return (
      <button
        type="button"
        className="flex items-center justify-between w-full py-1 px-2 cursor-pointer rounded-sm bg-muted/30 opacity-50"
        disabled
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">No route available</span>
          </div>
        </div>
      </button>
    )
  }

  const { currencyIn, currencyOut } = routeInfo

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`flex items-center justify-between w-full py-1 px-2 cursor-pointer rounded-sm bg-muted/50 hover:bg-accent/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isLoading ? 'opacity-70' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                <HumanizeNumber number={currencyIn?.amount || 0} prefix="" decimalPlaces={4} />{' '}
                {currencyIn?.symbol || ''}
              </span>
              <span className="text-sm text-muted-foreground">=</span>
              <span className="text-sm font-medium">
                <HumanizeNumber number={currencyOut?.amount || 0} prefix="" decimalPlaces={4} />{' '}
                {currencyOut?.symbol || ''}
              </span>
              <span className="text-xs text-muted-foreground">
                (<HumanizeNumber number={currencyOut?.usd || 0} prefix="$" />)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'flex items-center gap-2 px-2 py-1 rounded-full text-sm font-medium',
                isLoading && 'animate-pulse',
              )}
            >
              <Image src={routeInfo.bridge?.icon || ''} alt={routeInfo.bridge?.name || ''} width={50} height={50} />
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[430px] min-h-[40vh] max-h-[60vh] pb-5">
        <DialogTitle>Route Details</DialogTitle>
        <div className="flex flex-col">
          <div className="sticky top-[-1px] z-10 bg-background py-2">
            {/* Route Summary */}
            <div className="p-4 rounded-lg border bg-card mb-4">
              <h3 className="font-semibold text-sm mb-2">Exchange Rate</h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">
                  <HumanizeNumber number={currencyIn?.amount || 0} prefix="" decimalPlaces={4} />{' '}
                  {currencyIn?.symbol || ''}
                </span>
                <span className="text-muted-foreground">=</span>
                <span className="text-lg font-medium">
                  <HumanizeNumber number={currencyOut?.amount || 0} prefix="" decimalPlaces={4} />{' '}
                  {currencyOut?.symbol || ''}
                </span>
                <span className="text-sm text-muted-foreground">
                  (<HumanizeNumber number={currencyOut?.usd || 0} prefix="$" />)
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {/* DEX Information */}
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold text-sm mb-3">Route Information</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50">
                    <div className="w-5 h-5 rounded-full bg-blue-500"></div>
                    <span className="font-medium">Relay Protocol</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Optimized route</div>
                </div>
              </div>

              {/* Route Path */}
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold text-sm mb-3">Route Path</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">
                      {currencyIn?.symbol || 'Token'} → {currencyOut?.symbol || 'Token'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm">
                      Via {routeInfo.steps.length} step{routeInfo.steps.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fees & Impact */}
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold text-sm mb-3">Fees & Impact</h3>
                <div className="space-y-2 text-sm">
                  {routeInfo.impact?.inPercentage && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price impact</span>
                      <span
                        className={`${parseFloat(routeInfo.impact.inPercentage) > 0 ? 'text-red-600' : 'text-green-600'}`}
                      >
                        {routeInfo.impact.inPercentage}%
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max slippage</span>
                    <span>2.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
