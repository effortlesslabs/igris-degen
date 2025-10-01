import { BigNumber } from 'bignumber.js'
import { useCallback, useMemo } from 'react'
import { parseUnits } from 'viem'
import type { PortfolioToken } from '@/types/token'

interface UseCheckSufficientBalanceProps {
  sourceToken: PortfolioToken | null
  sourceAmount: string
}

export const useCheckSufficientBalance = (props: UseCheckSufficientBalanceProps) => {
  const { sourceToken, sourceAmount } = props

  const computedInsufficientBalanceSellFlow = useCallback(() => {
    if (!sourceToken || !sourceAmount || sourceAmount === '0') return false

    const amountToCheck = BigNumber(sourceAmount)
    const balance = parseUnits(sourceToken.balance ?? '0', sourceToken.decimals ?? 18)
    return amountToCheck.gt(balance)
  }, [sourceToken, sourceAmount])

  return useMemo(() => {
    return computedInsufficientBalanceSellFlow()
  }, [computedInsufficientBalanceSellFlow])
}
