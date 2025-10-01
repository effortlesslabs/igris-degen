import { useMemo } from 'react'
import { useSwapForm } from '@/providers/swap/provider'

export const useCheckSufficientBalance = () => {
  const { sourceAmount, sourceToken, destinationToken } = useSwapForm()

  const isSufficientBalance = useMemo(() => {
    return sourceAmount !== '0' && sourceToken && destinationToken
  }, [sourceAmount, sourceToken, destinationToken])

  return isSufficientBalance
}
