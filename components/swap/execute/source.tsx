'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { HumanizeNumber } from '@/components/ui/humanize-number'
import { getNetworkAsset } from '@/lib/constant'
import type { Network } from '@/services/common'
import type { SwapRoute } from '@/types/route'
import type { PortfolioToken } from '@/types/token'

interface SourceProps {
  sourceToken: PortfolioToken
  swapRoute: SwapRoute
}

export default function Source({ sourceToken, swapRoute }: SourceProps) {
  const networkAsset = getNetworkAsset(sourceToken.network as Network)
  const sourceData = useMemo(() => {
    const { tokenIn } = swapRoute
    return {
      amountUsd: Number(tokenIn.amountInUsd) || 0,
      amountFormatted: Number(tokenIn.rawAmountFormatted) || 0,
    }
  }, [swapRoute])

  return (
    <div className="flex justify-between items-start gap-2">
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-medium">
          <HumanizeNumber number={sourceData.amountUsd} prefix="$" />
        </p>
        <p className="text-sm ml-0.5 font-medium text-muted-foreground">
          <HumanizeNumber number={sourceData.amountFormatted} prefix="" decimalPlaces={6} /> {sourceToken.symbol}
        </p>
      </div>
      <div className="relative">
        <div className="rounded-full flex items-center justify-center p-1 backdrop-blur-sm transition-colors duration-300 ease-in-out">
          <Image
            src={sourceToken.logoURI}
            alt={sourceToken.symbol}
            width={24}
            height={24}
            className="w-7 h-7 rounded-full"
          />
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <div
            className="rounded-full bg-background flex items-center justify-center shadow-sm ring-2 ring-border"
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
    </div>
  )
}
