import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getDominantColor } from '@/lib/color-utils'
import { getLogoByNetwork } from '@/lib/constant'
// import { cn } from '@/lib/utils'
import type { Network } from '@/services/common'
import { HumanizeNumber } from '../ui/humanize-number'

// import { HIcon } from '../ui/icon'

interface TokenWithNetworksProps {
  name: string
  symbol: string
  address: string
  decimals: number
  image: string
  balance: string
  price: number
  priceChange: number
  networks: Network[]
}

export function TokenWithNetworks(props: TokenWithNetworksProps) {
  const [backgroundColor, setBackgroundColor] = useState('transparent')
  const formattedBalance = props.balance
  const balanceInUSD = parseFloat(formattedBalance) * props.price

  const networkImages = props.networks.map((network) => getLogoByNetwork(network as Network))

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
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-4">
            {networkImages.map((item, index) => {
              // Calculate compact spacing based on number of networks
              const totalNetworks = props.networks.length
              const maxVisible = 3
              const overlapAmount = totalNetworks > maxVisible ? 8 : 4 // More overlap when more networks

              return (
                <div
                  key={`${props.networks[index]}-${index}`}
                  className="rounded-full bg-background flex items-center justify-center shadow-sm ring-1 ring-border"
                  style={{
                    zIndex: totalNetworks + index,
                    width: '16px',
                    height: '16px',
                    marginLeft: index > 0 ? `${-overlapAmount}px` : '0px',
                  }}
                >
                  <Image src={item} alt={item} width={12} height={12} className="w-3 h-3 rounded-full" />
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <p className="text-lg font-medium">{props.name}</p>
          <p className="text-sm font-medium text-muted-foreground">
            <HumanizeNumber prefix="$" number={props.price} />
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="text-base font-medium">
          <HumanizeNumber number={balanceInUSD} />
        </p>
        <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
          <HumanizeNumber prefix="" number={formattedBalance} /> {props.symbol}
        </div>
      </div>
    </div>
  )
}
