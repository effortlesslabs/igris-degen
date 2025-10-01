'use client'

import { Icon } from '@iconify/react'
import BigNumber from 'bignumber.js'
import { forwardRef, useCallback, useEffect, useState } from 'react'
import { formatUnits, parseUnits } from 'viem'
import { Button } from '@/components/ui/button'
import { HumanizeNumber } from '@/components/ui/humanize-number'
import { NumberInput } from '@/components/ui/number-input'
import { useSwapForm } from '@/providers/swap/provider'
import type { PortfolioToken } from '@/types/token'
import { HowMuch } from '../selections/source/how-much'

interface BuyAmountProps {
  onAmountChange: (amount: string) => void
  token: PortfolioToken | null
  isInsufficientBalance: boolean
}

const SellAmount = forwardRef<HTMLInputElement, BuyAmountProps>(
  ({ onAmountChange, token, isInsufficientBalance }, ref) => {
    const { isAmountInDollar, setValue } = useSwapForm()
    const [amountValue, setAmountValue] = useState('0')
    const [displayValue, setDisplayValue] = useState('0')

    const tokenPrice = token?.price ?? 0
    const tokenDecimals = token?.decimals ?? 18

    useEffect(() => {
      if (!token) {
        setAmountValue('0')
      }
    }, [token])

    const handleAmountChange = useCallback(
      (value: string) => {
        setAmountValue(value)
        if (value === '') {
          setDisplayValue('0')
          return
        }

        if (isAmountInDollar) {
          const formattedAmount = new BigNumber(value).dividedBy(Number(tokenPrice)).toFixed(6)
          setDisplayValue(formattedAmount)
          const rawAmount = parseUnits(formattedAmount, tokenDecimals).toString()
          onAmountChange(rawAmount)
        } else {
          const formattedAmount = new BigNumber(value).multipliedBy(Number(tokenPrice)).toFixed(2)
          setDisplayValue(formattedAmount)
          const rawAmount = parseUnits(value, tokenDecimals).toString()
          onAmountChange(rawAmount)
        }
      },
      [isAmountInDollar, tokenPrice, onAmountChange, tokenDecimals],
    )

    const swapAmountMode = useCallback(() => {
      const currentAmountValue = amountValue
      const currentDisplayValue = displayValue
      setDisplayValue(currentAmountValue)
      setAmountValue(currentDisplayValue)
      setValue('isAmountInDollar', !isAmountInDollar)
    }, [isAmountInDollar, setValue, amountValue, displayValue])

    const handlePercentageSelect = useCallback(
      (percentage: number | 'max') => {
        const balanceInRaw = parseUnits(token?.balance ?? '0', token?.decimals ?? 18).toString()
        const rawAmount =
          percentage === 'max'
            ? balanceInRaw
            : new BigNumber(balanceInRaw).multipliedBy(percentage).dividedBy(100).decimalPlaces(0).toString()
        const formattedAmount = new BigNumber(formatUnits(BigInt(rawAmount), tokenDecimals)).toFixed(6)
        const formattedAmountInDollar = new BigNumber(formattedAmount).multipliedBy(Number(tokenPrice)).toFixed(2)
        if (isAmountInDollar) {
          setAmountValue(formattedAmountInDollar)
          setDisplayValue(formattedAmount)
        } else {
          setAmountValue(formattedAmount)
          setDisplayValue(formattedAmountInDollar)
        }
        onAmountChange(rawAmount)
      },
      [token?.balance, token?.decimals, tokenPrice, tokenDecimals, isAmountInDollar, onAmountChange],
    )

    return (
      <div className="flex flex-col justify-start items-start">
        {token && <HowMuch handlePercentageSelect={handlePercentageSelect} />}
        <NumberInput
          prefix={isAmountInDollar ? '$' : ''}
          value={amountValue}
          onChange={(e) => handleAmountChange(e.target.value)}
          textAlign="left"
          error={isInsufficientBalance && amountValue !== '0'}
          ref={ref}
          disabled={!token}
        />
        <Button variant="secondary2" size="sm" className="w-fit px-0 has-[>svg]:px-0" onClick={() => swapAmountMode()}>
          <HumanizeNumber number={displayValue} prefix={!isAmountInDollar ? '$' : ''} />
          {isAmountInDollar && <span>{token?.symbol}</span>}
          <Icon icon="iconamoon:swap" className="size-4" />
        </Button>
      </div>
    )
  },
)

export default SellAmount
