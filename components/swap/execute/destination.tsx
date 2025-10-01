'use client'

import Image from 'next/image'
import { memo, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { HumanizeNumber } from '@/components/ui/humanize-number'
import { Separator } from '@/components/ui/separator'
import { getNetworkAsset } from '@/lib/constant'
import { cn } from '@/lib/utils'
import type { Network } from '@/services/common'
import type { SwapRoute } from '@/types/route'
import type { Token } from '@/types/token'

interface DestinationProps {
  destinationToken: Token
  swapRoute: SwapRoute
}

export default function Destination({ destinationToken, swapRoute }: DestinationProps) {
  const networkAsset = getNetworkAsset(destinationToken.network as Network)

  // Memoize quote data for performance
  const destinationData = useMemo(() => {
    const { tokenOut } = swapRoute
    return {
      amountUsd: Number(tokenOut.amountInUsd) || 0,
      amountFormatted: Number(tokenOut.rawAmountFormatted) || 0,
    }
  }, [swapRoute])

  return (
    <div className="flex justify-between items-start gap-2">
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-medium">
          <HumanizeNumber number={destinationData.amountUsd} prefix="$" />
        </p>
        <p className="text-sm ml-0.5 font-medium text-muted-foreground">
          <HumanizeNumber number={destinationData.amountFormatted} prefix="" decimalPlaces={6} />{' '}
          {destinationToken.symbol}
        </p>
      </div>
      <div className="relative">
        <div className="rounded-full flex items-center justify-center p-1 backdrop-blur-sm transition-colors duration-300 ease-in-out">
          <Image
            src={destinationToken.logoURI}
            alt={destinationToken.symbol}
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
