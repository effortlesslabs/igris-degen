import { useCallback, useState } from 'react'
import { useSwapForm } from '@/providers/swap/provider'

export function useSellAmount() {
  const { isAmountInDollar, setValue, sourceToken } = useSwapForm()
  const [amountValue, setAmountValue] = useState('')

  const _tokenPrice = sourceToken?.price ?? 0
  const _tokenDecimals = sourceToken?.decimals ?? 18

  const handleIsAmountInDollarChange = useCallback((amountInDollar: string) => {
    setAmountValue(amountInDollar)
  }, [])

  const handleIsAmountInNativeChange = useCallback((amountInNative: string) => {
    setAmountValue(amountInNative)
  }, [])

  const onAmountChange = useCallback(
    (amount: string) => {
      setAmountValue(amount)
      if (isAmountInDollar) {
        handleIsAmountInDollarChange(amount)
      } else {
        handleIsAmountInNativeChange(amount)
      }
    },
    [isAmountInDollar, handleIsAmountInDollarChange, handleIsAmountInNativeChange],
  )

  const secondaryValue = '20'

  const handleOnSwap = useCallback(() => {
    setValue('isAmountInDollar', false)
    setAmountValue(secondaryValue)
  }, [setValue])

  return { isAmountInDollar, amountValue, secondaryValue, onAmountChange, handleOnSwap }
}
