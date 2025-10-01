'use client'

import { HumanizeNumber } from '@/components/ui/humanize-number'
import type { SwapRoute } from '@/types/route'

interface DetailsProps {
  swapRoute: SwapRoute
}

export default function Details({ swapRoute }: DetailsProps) {
  const gasFee = swapRoute.fees?.gas?.rawAmountFormatted || 0
  const priceImpact = swapRoute.totalPriceImpact.inPercentage || 0

  return (
    <div className="space-y-2 text-sm mt-5 font-medium">
      <div className="flex justify-between">
        <span className="text-muted-foreground capitalize">Gas Fee</span>
        <span>
          <HumanizeNumber number={gasFee || 0} prefix="" /> {swapRoute.fees?.gas?.token?.symbol}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">Price impact</span>
        <span className="text-destructive">{priceImpact}%</span>
      </div>
    </div>
  )
}
