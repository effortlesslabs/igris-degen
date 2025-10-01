'use client'

import { useMemo } from 'react'
import type { SwapRoute } from '@/types/route'
import DestAddressDialog from './dest-address-sheet'
// import { PreferenceTabs } from './preference-tabs'
import RouteDialog from './route-dialog'
import Timer from './timer'

interface RouteDetailsProps {
  swapRoute: SwapRoute | null
  isLoading?: boolean
}

export default function RouteDetails({ swapRoute, isLoading = false }: RouteDetailsProps) {
  const routeData = useMemo(() => {
    if (!swapRoute) {
      return {
        hasRoute: false,
        exchangeRate: '0',
        currencyIn: { symbol: '', amount: '0' },
        currencyOut: { symbol: '', amount: '0' },
        steps: [],
      }
    }

    return {
      hasRoute: Boolean(swapRoute.steps?.length > 0),
      exchangeRate: swapRoute.exchangeRate,
      currencyIn: {
        symbol: swapRoute.metadata.tokenIn.symbol,
        amount: swapRoute.tokenIn.rawAmountFormatted,
      },
      currencyOut: {
        symbol: swapRoute.metadata.tokenOut.symbol,
        amount: swapRoute.tokenOut.rawAmountFormatted,
      },
      steps: swapRoute.steps,
    }
  }, [swapRoute])

  return (
    <div className="flex flex-col gap-2">
      <div className="border-dashed border-2 flex flex-col rounded-xl gap-2 px-5 py-4">
        <div className="flex w-full justify-between items-center gap-2 px-2">
          <div className="flex items-center gap-5">
            <p className="font-medium text-muted-foreground text-sm">
              {isLoading ? 'Fetching route...' : routeData?.hasRoute ? 'Route' : 'Route (No quote)'}
            </p>
            {/* <PreferenceTabs /> */}
          </div>
          <Timer />
        </div>
        <RouteDialog swapRoute={swapRoute} isLoading={isLoading} />
        <DestAddressDialog />
      </div>
    </div>
  )
}
