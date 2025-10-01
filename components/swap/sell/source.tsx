'use client'

import SourceTokenSelection from '@/components/swap/selections/source'
import type { PortfolioToken } from '@/types/token'
import SellAmount from './sell-amount'

interface SourceProps {
  portfolioTokens: PortfolioToken[]
  isLoadingPortfolio: boolean
  sourceToken: PortfolioToken | null
  setSourceAmount: (amount: string) => void
  setSourceToken: (token: PortfolioToken | null) => void
  isInsufficientBalance: boolean
}

// Constants to prevent recreation on every render

export default function Source({
  sourceToken,
  setSourceToken,
  portfolioTokens,
  isLoadingPortfolio,
  setSourceAmount,
  isInsufficientBalance,
}: SourceProps) {
  return (
    <div className="border-dashed  border-2 w-full rounded-xl grid grid-cols-3 gap-4 justify-between items-center p-5">
      <div className="flex flex-col justify-start gap-2 col-span-2">
        <h1 className="font-semibold text-muted-foreground">sell</h1>
        <SellAmount
          onAmountChange={(amount) => setSourceAmount(amount)}
          token={sourceToken}
          isInsufficientBalance={isInsufficientBalance}
        />
      </div>

      <div className="flex justify-end items-center relative h-full">
        <SourceTokenSelection
          portfolioTokens={portfolioTokens}
          isLoadingPortfolio={isLoadingPortfolio}
          selectedToken={sourceToken}
          onTokenSelect={setSourceToken}
          destinationToken={null}
        />
      </div>
    </div>
  )
}
