import { BigNumber } from 'bignumber.js'
import { useCallback, useMemo } from 'react'
import { parseUnits } from 'viem'
import type { SwapRoute } from '@/types/route'
import type { PortfolioToken } from '@/types/token'

interface UseCheckSufficientBalanceProps {
  type: 'buy' | 'sell' | 'intent'
  sourceToken: PortfolioToken
  sourceAmount: string
  swapRoute: SwapRoute
}

export const useCheckSufficientBalance = (props: UseCheckSufficientBalanceProps) => {
  const { type, sourceToken, sourceAmount, swapRoute } = props

  const computedInsufficientBalanceSellFlow = useCallback(() => {
    if (!sourceToken || !sourceAmount || sourceAmount === '0') return false

    const amountToCheck = BigNumber(sourceAmount)
    const balance = parseUnits(sourceToken.balance ?? '0', sourceToken.decimals ?? 18)
    return amountToCheck.gt(balance)
  }, [sourceToken, sourceAmount])

  const computedInsufficientBalanceBuyFlow = useCallback(() => {
    if (!sourceToken || !swapRoute) return false

    const portfolioSourceBalance = parseUnits(sourceToken.balance ?? '0', sourceToken.decimals ?? 18)
    const currencyInValue = swapRoute.tokenIn.rawAmount || '0'

    // Return true if balance is insufficient (less than required amount)
    return BigNumber(portfolioSourceBalance.toString()).lt(BigNumber(currencyInValue))
  }, [sourceToken, swapRoute])

  const computedInsufficientBalanceIntentFlow = computedInsufficientBalanceBuyFlow

  return useMemo(() => {
    switch (type) {
      case 'buy':
        return computedInsufficientBalanceBuyFlow()
      case 'sell':
        return computedInsufficientBalanceSellFlow()
      case 'intent':
        return computedInsufficientBalanceIntentFlow()
      default:
        return false
    }
  }, [
    type,
    computedInsufficientBalanceBuyFlow,
    computedInsufficientBalanceSellFlow,
    computedInsufficientBalanceIntentFlow,
  ])
}
