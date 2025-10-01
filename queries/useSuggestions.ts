import { useQuery } from '@tanstack/react-query'
import type { Network } from '@/services/common'
import { fetchSmartSwapRoute } from '@/services/route'
import type { PortfolioToken } from '@/types/token'

interface UseQuoteParams {
  fromAddress: string | null
  toAddress: string | null
  sourceToken: PortfolioToken | null
  sourceAmount: string
  enabled?: boolean
}

export function useSuggestions(props: UseQuoteParams) {
  const { fromAddress, toAddress, sourceToken, sourceAmount, enabled = true } = props
  const amount = sourceAmount
  return useQuery({
    queryKey: ['quote', sourceToken?.address, amount, toAddress],
    queryFn: async () => {
      if (!sourceToken || !amount || amount === '0' || !fromAddress || !toAddress) {
        return null
      }
      return fetchSmartSwapRoute({
        senderAddress: fromAddress,
        recipientAddress: toAddress,
        tokenInAddress: sourceToken.address,

        tokenInNetwork: sourceToken.network as Network,
        tokenAmount: amount,
        slippage: '50',
        tradeType: 'SOURCE_BASED',
        excludeBridges: 'gasyard',
      })
    },
    enabled: enabled && !!sourceToken && !!amount && amount !== '0',
    staleTime: 0, // No caching - always fetch fresh data
    gcTime: 0, // No garbage collection time - clean up immediately
    refetchOnMount: 'always', // Always refetch when component mounts
    refetchOnWindowFocus: false, // Don't refetch on window focus to avoid interrupting user
    retry: 2,
  })
}
