'use client'

import { useMemo } from 'react'
import DestinationTokenSelection from '@/components/swap/selections/destination'
import { HumanizeNumber } from '@/components/ui/humanize-number'
import { useSwapForm } from '@/providers/swap/provider'
import type { SwapRoute } from '@/types/route'
import type { PortfolioToken, Token } from '@/types/token'
import { Suggestions } from './suggestions'

interface DestinationProps {
  sourceToken: PortfolioToken | null
  swapRoute: SwapRoute | null
  loading: boolean
  destinationToken: Token | null
  setDestinationToken: (token: Token | null) => void
}

export default function Destination({
  sourceToken,
  swapRoute,
  loading,
  destinationToken,
  setDestinationToken,
}: DestinationProps) {
  const { isAmountInDollar } = useSwapForm()

  const headSourceAmount = useMemo(() => {
    if (isAmountInDollar) {
      return swapRoute?.tokenOut.amountInUsd
    }
    return swapRoute?.tokenOut.rawAmountFormatted
  }, [isAmountInDollar, swapRoute])

  const subheadSourceAmount = useMemo(() => {
    if (isAmountInDollar) {
      return swapRoute?.tokenOut.rawAmountFormatted
    }
    return swapRoute?.tokenOut.amountInUsd
  }, [isAmountInDollar, swapRoute])

  return (
    <div className="border-dashed border-2 rounded-xl flex gap-4 justify-between items-center p-5">
      <div className="flex flex-col justify-start gap-2">
        <h1 className="font-semibold text-muted-foreground">receiving</h1>
        {destinationToken && (
          <div className="flex flex-col gap-1">
            <div className="text-4xl font-medium">
              <HumanizeNumber number={headSourceAmount ?? 0} prefix={isAmountInDollar ? '$' : ''} loading={loading} />
            </div>
            <div className="text-sm ml-0.5 font-medium text-muted-foreground ">
              <HumanizeNumber
                number={subheadSourceAmount ?? 0}
                prefix={isAmountInDollar ? '' : '$'}
                decimalPlaces={5}
                loading={loading}
              />
              {isAmountInDollar && <span> {destinationToken.symbol}</span>}
              {swapRoute?.totalPriceImpact && (
                <span className="font-medium text-xs text-green-500 ml-2">
                  {swapRoute.totalPriceImpact.inPercentage}%
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-end items-end gap-4">
        <Suggestions />
        <DestinationTokenSelection
          sourceToken={sourceToken}
          selectedToken={destinationToken}
          onTokenSelect={setDestinationToken}
        />
      </div>
    </div>
  )
}
