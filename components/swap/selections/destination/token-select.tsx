'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { HIcon } from '@/components/ui/icon'
import { getNetworkAsset } from '@/lib/constant'
import type { Network } from '@/services/common'
import type { Token } from '@/types/token'

interface TokenSelectProps {
  selectedToken: Token | null
}

export default function TokenSelect({ selectedToken }: TokenSelectProps) {
  if (selectedToken) {
    const networkAsset = getNetworkAsset(selectedToken.network as Network)
    return (
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg" className="font-medium gap-0 px-1 text-base relative">
          <div className="relative">
            <div className="rounded-full flex items-center justify-center p-1 backdrop-blur-sm transition-colors duration-300 ease-in-out">
              <Image
                src={selectedToken.logoURI}
                alt={selectedToken.symbol}
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
          {selectedToken.symbol} <HIcon icon="iconamoon:arrow-down-2-bold" iconClassName="size-6" />
        </Button>
      </DialogTrigger>
    )
  }
  return (
    <DialogTrigger asChild>
      <Button className="font-semibold gap-0">
        Select
        <HIcon icon="iconamoon:arrow-down-2-bold" iconClassName="size-6" />
      </Button>
    </DialogTrigger>
  )
}
