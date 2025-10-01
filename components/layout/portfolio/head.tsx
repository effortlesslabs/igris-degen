'use client'

import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import { PortfolioIcon } from '@/assets/svgs/portfolio-icon'
import { Button } from '@/components/ui/button'
import { HumanizeNumber } from '@/components/ui/humanize-number'
import { HIcon } from '@/components/ui/icon'
import { shortenAddress } from '@/lib/utils'
import { useSwapContext, useSwapWallet } from '@/providers/swap/provider'

// Client-only component for address display
const ClientAddress = dynamic(
  () =>
    Promise.resolve(({ address }: { address: string | undefined }) => (
      <p className="text-lg font-semibold">{address ? shortenAddress(address) : 'Loading...'}</p>
    )),
  { ssr: false },
)

// Client-only component for button text
const ClientButtonText = dynamic(
  () =>
    Promise.resolve(({ address }: { address: string | undefined }) => (
      <span>{address ? shortenAddress(address) : ''}</span>
    )),
  { ssr: false },
)

interface PortfolioHeadProps {
  onClose: () => void
  balance: number
  change: number
}

export function PortfolioHead({ onClose, balance, change }: PortfolioHeadProps) {
  const { address, disconnectWallet } = useSwapWallet()
  const { handleCompleteSwap } = useSwapContext()

  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLogout = useCallback(async () => {
    setIsLoading(true)
    onClose()
    setIsLoading(false)
    disconnectWallet()
    handleCompleteSwap()
  }, [onClose, disconnectWallet, handleCompleteSwap])

  return (
    <div className="flex items-start justify-between px-6 pt-6 rounded-t-xl flex-shrink-0">
      <div className="flex flex-col items-start space-x-3 gap-2">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center">
            <PortfolioIcon size={45} className="w-14 h-14" />
          </div>
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-background rounded-full flex items-center justify-center shadow-sm ring-4 ring-background">
            <HIcon variant="secondary" icon="token-branded:metamask" className="bg-foreground" iconClassName="size-3" />
          </div>
        </div>
        <div className="flex flex-col items-start space-x-3 gap-1">
          <ClientAddress address={address} />
          <div className="group relative flex items-center gap-2">
            <button
              type="button"
              className="text-sm font-medium text-muted-foreground group-hover:text-foreground/40 transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
              onClick={handleCopy}
            >
              <ClientButtonText address={address} />
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4"
              onClick={handleCopy}
            >
              <HIcon variant="ghost" icon={copied ? 'lucide:check' : 'lucide:copy'} iconClassName="size-3" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-start space-x-2 mt-2 gap-2">
          <p className="text-foreground font-medium text-4xl">
            <HumanizeNumber number={balance} prefix="$" decimalPlaces={2} />
          </p>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <HIcon icon="lucide:trending-up" iconClassName="size-3 text-green-500" />
            <div className="font-semibold">
              <HumanizeNumber number={change} decimalPlaces={2} /> {change > 0 ? '+' : ''}%
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <HIcon icon="ant-design:setting-filled" iconClassName="size-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleLogout} disabled={isLoading}>
          <HIcon
            icon={isLoading ? 'lucide:loader-circle' : 'mingcute:power-fill'}
            iconClassName={isLoading ? 'size-5 animate-spin' : 'size-5'}
          />
        </Button>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <HIcon icon="maki:cross" iconClassName="size-4" />
        </Button>
      </div>
    </div>
  )
}
