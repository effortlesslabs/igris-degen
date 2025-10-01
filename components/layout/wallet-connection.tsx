'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { HIcon } from '@/components/ui/icon'
import { cn } from '@/lib/utils'
import { useSwapContext } from '@/providers/swap/provider'
import { HumanizeNumber } from '../ui/humanize-number'

interface WalletConnectionProps {
  totalBalance?: number
  setIsPortfolioOpen: (isPortfolioOpen: boolean) => void
  isLoading: boolean
}

const iconColors = {
  portfolio: '#66FFFF',
  balance: '#FFF59C',
}

export function WalletConnection({ setIsPortfolioOpen, isLoading, totalBalance }: WalletConnectionProps) {
  const { walletConnection } = useSwapContext()
  const [isBalanceHidden, setIsBalanceHidden] = useState(false)

  if (!walletConnection.ready) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 px-4 py-2 bg-secondary/50 rounded-lg animate-pulse">
          <div className="w-4 h-4 bg-muted rounded"></div>
          <div className="w-16 h-4 bg-muted rounded"></div>
          <div className="w-4 h-4 bg-muted rounded"></div>
        </div>
        <div className="w-10 h-10 bg-secondary/50 rounded-lg animate-pulse"></div>
      </div>
    )
  }

  // Show connected wallet display if authenticated
  if (walletConnection.authenticated && walletConnection.loggedInAddress) {
    return (
      <div
        className={cn(
          'flex items-center space-x-3 border border-dashed border-primary/40 hover:border-primary/60 hover:bg-primary/40 rounded-lg transition-colors',
          isLoading && 'animate-pulse',
        )}
      >
        <Button variant="ghost" size="lg" className="px-2 font-semibold" onClick={() => setIsPortfolioOpen(true)}>
          <HIcon variant="secondary" icon="oi:dollar" color={iconColors.balance} iconClassName="size-4" />
          {isBalanceHidden ? (
            <span className="text-foreground/60">••••••</span>
          ) : (
            <HumanizeNumber number={totalBalance ?? 0} prefix="$" />
          )}
          {/** biome-ignore lint/a11y/useSemanticElements: false positive */}
          <span
            role="button"
            tabIndex={0}
            className="text-foreground/60 hover:bg-accent/50 rounded-[9px] p-1 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setIsBalanceHidden(!isBalanceHidden)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setIsBalanceHidden(!isBalanceHidden)
              }
            }}
            aria-label={isBalanceHidden ? 'Show balance' : 'Hide balance'}
          >
            <HIcon variant="ghost" icon={isBalanceHidden ? 'lucide:eye-off' : 'lucide:eye'} />
          </span>
        </Button>
      </div>
    )
  }

  // Show connect button if not authenticated
  return (
    <Button size="lg" className="font-semibold gap-1" onClick={walletConnection.connectWallet}>
      <HIcon icon="lucide:wallet" color={iconColors.balance} iconClassName="size-4" />
      Connect Wallet
    </Button>
  )
}
