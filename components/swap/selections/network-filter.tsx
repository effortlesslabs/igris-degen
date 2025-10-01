'use client'

import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getNetworkAsset } from '@/lib/constant'
import { Network } from '@/services/common'

interface NetworkFilterProps {
  onNetworkFilterChange: (networks: Network | null) => void
  selectedNetwork: Network | null
}

export default function NetworkFilter({ onNetworkFilterChange, selectedNetwork }: NetworkFilterProps) {
  const [isNetworkPopoverOpen, setIsNetworkPopoverOpen] = useState(false)

  const allNetworks: Network[] = [
    Network.ethereum,
    Network.arbitrum,
    Network.bsc,
    Network.base,
    Network.polygon,
    Network.optimism,
  ]

  const handleNetworkToggle = (network: Network | null) => {
    onNetworkFilterChange(network)
    setIsNetworkPopoverOpen(false)
  }

  const selectedNetworkAsset = selectedNetwork !== null ? getNetworkAsset(selectedNetwork) : null

  return (
    <Popover open={isNetworkPopoverOpen} onOpenChange={setIsNetworkPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="absolute gap-0 right-2 top-1/2 transform -translate-y-1/2 p-0 hover:bg-accent/50"
        >
          {selectedNetworkAsset === null && (
            <div className="rounded-full bg-background flex items-center justify-center shadow-sm ring-2 ring-border">
              <Image
                src="/networks/all-networks.svg"
                alt="all-networks"
                width={24}
                height={24}
                className="w-6 h-6 rounded-full"
              />
            </div>
          )}
          {selectedNetworkAsset && (
            <div className="rounded-full bg-background flex items-center justify-center shadow-sm ring-2 ring-border">
              <Image
                src={selectedNetworkAsset.logoURI}
                alt={selectedNetworkAsset.name}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full"
              />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-56" align="end" side="bottom">
        <div className="space-y-0">
          {/* All Networks Option */}
          <button
            type="button"
            onClick={() => handleNetworkToggle(null)}
            className="px-2 py-3 cursor-pointer flex justify-between items-center rounded-2xl w-full hover:bg-accent/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 bg-muted rounded-full p-0.5">
                <div className="rounded-full bg-background flex items-center justify-center shadow-sm ring-2 ring-border">
                  <Image
                    src="/networks/all-networks.svg"
                    alt="all-networks"
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full"
                  />
                </div>
              </div>
              <span className="font-medium">All Networks</span>
            </div>
            {selectedNetwork === null && <Icon icon="lets-icons:check-fill" className="size-5" />}
          </button>

          {/* Individual Networks */}
          {allNetworks.map((network) => {
            const networkAsset = getNetworkAsset(network as Network)
            const isSelected = selectedNetwork === network

            return (
              <button
                key={network}
                type="button"
                onClick={() => handleNetworkToggle(network)}
                className="px-2 py-3 cursor-pointer flex justify-between items-center rounded-2xl w-full hover:bg-accent/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-background flex items-center justify-center shadow-sm ring-2 ring-border">
                    <Image
                      src={networkAsset.logoURI}
                      alt={networkAsset.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full"
                    />
                  </div>
                  <span className="font-medium">{networkAsset.name}</span>
                </div>
                {isSelected && <Icon icon="lets-icons:check-fill" className="size-5" />}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
