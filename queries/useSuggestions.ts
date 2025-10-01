import { useMutation } from '@tanstack/react-query'
import type { Network } from '@/services/common'
import { fetchSmartSwapRoute } from '@/services/route'
import type { PortfolioToken, Token } from '@/types/token'

export interface UseSuggestionsParams {
  fromAddress: string | null
  toAddress: string | null
  sourceToken: PortfolioToken | null
  destinationToken: Token | null
  sourceAmount: string
  enabled?: boolean
  currentPriceImpactInPercentage: string
}

export function useSuggestions() {
  return useMutation({
    mutationFn: async (params: UseSuggestionsParams) => {
      const { fromAddress, toAddress, sourceToken, destinationToken, sourceAmount, enabled = true } = params
      const amount = sourceAmount
      if (!sourceToken || !destinationToken || !amount || amount === '0' || !fromAddress || !toAddress) {
        return null
      }

      return fetchSmartSwapRoute({
        senderAddress: fromAddress,
        recipientAddress: toAddress,
        tokenInAddress: sourceToken.address,
        tokenOutAddress: destinationToken.address,
        tokenInNetwork: sourceToken.network as Network,
        tokenOutNetwork: destinationToken.network as Network,
        tokenAmount: amount,
        slippage: '50',
        tradeType: 'SOURCE_BASED',
        excludeBridges: 'gasyard',
        currentPriceImpactInPercentage: params.currentPriceImpactInPercentage,
      })
    },
    retry: 2,
  })
}
