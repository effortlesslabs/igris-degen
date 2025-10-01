'use client'

import { Execute } from '@/components/swap/execute'
import Sell from '@/components/swap/sell'
import { SwapErrorBoundary } from '@/components/swap/swap-error-boundary'
import { BuySkeleton, ExecuteSkeleton, SwapTabsSkeleton } from '@/components/swap/swap-skeleton'
import { useSwapContext } from '@/providers/swap/provider'

export default function Home() {
  const { walletConnection, swapRoute } = useSwapContext()

  if (!walletConnection.ready) {
    return (
      <div className="flex gap-10 flex-col justify-start items-center w-full mt-20">
        <SwapTabsSkeleton />
        <BuySkeleton />
        <ExecuteSkeleton />
      </div>
    )
  }

  return (
    <div className="flex gap-5 flex-col justify-start items-center w-full mt-6 py-10">
      <SwapErrorBoundary>
        <div className="flex flex-col justify-center items-center gap-10 w-full px-6">
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
