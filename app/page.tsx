'use client'

import { Execute } from '@/components/swap/execute'
import Sell from '@/components/swap/sell'
import { SwapErrorBoundary } from '@/components/swap/swap-error-boundary'
import { BuySkeleton, ExecuteSkeleton, SwapTabsSkeleton } from '@/components/swap/swap-skeleton'
import { Button } from '@/components/ui/button'
import { HIcon } from '@/components/ui/icon'
import { useSwapContext } from '@/providers/swap/provider'

export default function Home() {
  const { walletConnection, swapRoute, handleCompleteSwap, swapForm } = useSwapContext()

  if (!walletConnection.ready) {
    return (
      <div className="flex gap-10 flex-col justify-start items-center w-full mt-20">
        <SwapTabsSkeleton />
        <BuySkeleton />
        <ExecuteSkeleton />
      </div>
    )
  }

  const hasFormData = swapForm.sourceAmount !== '0' || swapForm.sourceToken || swapForm.destinationToken

  return (
    <div className="flex gap-5 flex-col justify-start items-center w-full mt-6 py-10">
      <SwapErrorBoundary>
        <div className="flex flex-col justify-center items-center gap-10 w-full px-6">
          <div className="flex flex-row justify-between items-center gap-5 w-full max-w-lg mx-auto relative">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <HIcon
                  icon="lucide:trending-down"
                  variant="secondary"
                  className="bg-red-50 dark:bg-red-950/20"
                  color="#ef4444"
                  iconClassName="size-5"
                />
                <h1 className="text-2xl font-bold text-foreground">Swap Smarter</h1>
              </div>
              <p className="text-sm text-muted-foreground">Low slippage, cross-chain swaps, smarter routes</p>
            </div>
            {hasFormData && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCompleteSwap}
                className="group flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <HIcon
                  icon="lucide:rotate-ccw"
                  iconClassName="size-4 group-hover:rotate-180 transition-transform duration-200"
                />
                Reset
              </Button>
            )}
          </div>
          <Sell />
          {swapRoute.isSwapRouteError && (
            <div className="flex font-semibold text-destructive/60 flex-col gap-5 max-w-lg mx-auto border border-dashed border-destructive/20 rounded-xl p-4 w-full animate-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards">
              <div className="flex flex-col gap-2">
                <p className="text-destructive/60">{swapRoute.isSwapRouteError.message}</p>
              </div>
            </div>
          )}
          <Execute />
        </div>
      </SwapErrorBoundary>
    </div>
  )
}
