import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getDominantColor } from '@/lib/color-utils'
import { getExplorerUrl, getLogoByNetwork } from '@/lib/constant'
import type { Network } from '@/services/common'

interface BuyTokenProps {
  name: string
  symbol: string
  address: string
  image: string
  network: Network
  hideNetworkImage?: boolean
}

export function BuyToken(props: BuyTokenProps) {
  const [backgroundColor, setBackgroundColor] = useState('transparent')
  const networkImages = getLogoByNetwork(props.network)

  useEffect(() => {
    getDominantColor(props.image).then(setBackgroundColor)
  }, [props.image])

  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div
            className="rounded-full flex items-center justify-center p-1 backdrop-blur-sm transition-colors duration-300 ease-in-out"
            style={{ backgroundColor }}
          >
            <Image src={props.image} alt={props.name} width={24} height={24} className="w-8 h-8 rounded-full" />
          </div>

          {/* Network logos overlapped at bottom */}
          {!props.hideNetworkImage && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-4">
              <div
                className="rounded-full bg-background flex items-center justify-center shadow-sm ring-2 ring-border"
                style={{
                  zIndex: 1,
                  width: '16px',
                  height: '16px',
                }}
              >
                <Image src={networkImages} alt={props.name} width={12} height={12} className="w-3 h-3 rounded-full" />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start">
          <p className="text-lg font-medium">{props.name}</p>
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            {props.symbol}
            <div className="text-muted-foreground/60 group relative flex items-center gap-1">
              {props.address.slice(0, 6)}...{props.address.slice(-4)}
              <a
                href={getExplorerUrl(props.network, props.address)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1 inline-block align-middle"
              >
                <Icon
                  icon="eva:external-link-fill"
                  className="size-4 text-muted-foreground/60 hover:text-muted-foreground"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
