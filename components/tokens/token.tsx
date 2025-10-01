import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getDominantColor } from '@/lib/color-utils'
import { getLogoByNetwork } from '@/lib/constant'
// import { cn } from '@/lib/utils'
import type { Network } from '@/services/common'
import { HumanizeNumber } from '../ui/humanize-number'

// import { HIcon } from '../ui/icon'

interface TokenProps {
  name: string
  symbol: string
  address: string
  decimals: number
  image: string
  balance: string
  price: number
  priceChange: number
  network: Network
  isPrimaryNetworkImage?: boolean
}

export function Token(props: TokenProps) {
  const [backgroundColor, setBackgroundColor] = useState('transparent')
  const formattedBalance = props.balance
  const balanceInUSD = parseFloat(formattedBalance) * props.price

  const networkImage = getLogoByNetwork(props.network as Network)

  useEffect(() => {
    getDominantColor(props.image).then(setBackgroundColor)
  }, [props.image])

  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <div
          className="rounded-full flex items-center justify-center p-1 backdrop-blur-sm transition-colors duration-300 ease-in-out"
          style={{ backgroundColor }}
        >
          <Image
            src={props.isPrimaryNetworkImage ? networkImage : props.image}
            alt={props.name}
            width={24}
            height={24}
            className="w-8 h-8 rounded-full"
          />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-lg font-medium">{props.name}</p>
          <p className="text-sm font-medium text-muted-foreground">
            <HumanizeNumber prefix="$" number={props.price} decimalPlaces={2} />
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-base font-medium text-right">
          <HumanizeNumber number={balanceInUSD} />
        </p>
        <div className="text-sm font-medium text-muted-foreground flex items-right gap-1">
          <HumanizeNumber prefix="" number={formattedBalance} /> {props.symbol}
        </div>
      </div>
    </div>
  )
}
