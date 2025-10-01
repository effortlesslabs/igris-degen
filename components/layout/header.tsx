'use client'

import { useState } from 'react'
import { Logo } from '@/assets/svgs/logo'
import { useSwapPortfolio } from '@/providers/swap/provider'
import { Portfolio } from './portfolio'
import { WalletConnection } from './wallet-connection'

export function Header() {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  const { portfolio, loading, error } = useSwapPortfolio()

  return (
    <header className="fixed top-0 z-50 w-full flex justify-center items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Logo />
        </div>
        <WalletConnection
          setIsPortfolioOpen={setIsPortfolioOpen}
          isLoading={loading}
          totalBalance={portfolio?.totalPortfolioValue ?? 0}
        />
      </div>

      <Portfolio
        portfolio={portfolio ?? { totalPortfolioValue: 0, tokens: [] }}
        error={error ?? null}
        isLoading={loading}
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
      />
    </header>
  )
}
