'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { Network } from '@/services/common'
import type { PortfolioToken, Token } from '@/types/token'
import Search from '../search'
import TokenSelect from './token-select'
import Tokens from './tokens'

interface TokenSelectionProps {
  selectedToken: Token | null
  onTokenSelect: (token: Token | null) => void
  sourceToken: PortfolioToken | null
}

export default function DestinationTokenSelection({ selectedToken, onTokenSelect, sourceToken }: TokenSelectionProps) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TokenSelect selectedToken={selectedToken} />
      <DialogContent className="w-[430px] min-h-[75vh] max-h-[75vh]">
        <DialogTitle>Select a token</DialogTitle>
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
              searchValue={searchValue}
              selectedNetwork={selectedNetwork}
              onSelectToken={handleTokenSelect}
              sourceToken={sourceToken}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
