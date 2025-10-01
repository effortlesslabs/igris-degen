'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { Network } from '@/services/common'
import type { PortfolioToken, Token } from '@/types/token'
import Search from '../search'
import TokenSelect from './token-select'
import Tokens from './tokens'

interface TokenSelectionProps {
  portfolioTokens: PortfolioToken[]
  isLoadingPortfolio: boolean
  selectedToken: PortfolioToken | null
  onTokenSelect: (token: PortfolioToken | null) => void
  destinationToken: Token | null
}

export default function SourceTokenSelection({
  selectedToken,
  onTokenSelect,
  destinationToken,
  portfolioTokens,
  isLoadingPortfolio,
}: TokenSelectionProps) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleTokenSelect = (token: PortfolioToken) => {
    onTokenSelect(token)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TokenSelect selectedToken={selectedToken} />
      <DialogContent className="w-[430px] min-h-[75vh] max-h-[80vh]">
        <DialogTitle>Your holdings</DialogTitle>
        <div className="flex flex-col">
          <div className="sticky top-[-1px] z-10 bg-background py-2">
            <Search
              onSearchChange={setSearchValue}
              onNetworkFilterChange={setSelectedNetwork}
              selectedNetwork={selectedNetwork}
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <Tokens
              portfolioTokens={portfolioTokens}
              isLoadingPortfolio={isLoadingPortfolio}
              searchValue={searchValue}
              selectedNetwork={selectedNetwork}
              onSelectToken={handleTokenSelect}
              destinationToken={destinationToken}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
