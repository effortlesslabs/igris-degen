import { useQuery } from '@tanstack/react-query'
import type { Network } from '@/services/common'
import { fetchSwapRoute } from '@/services/route'
import type { PortfolioToken, Token } from '@/types/token'

interface UseQuoteParams {
  fromAddress: string | null
  toAddress: string | null
  sourceToken: PortfolioToken | null
  destinationToken: Token | null
  destinationAmount: string
  type: 'buy' | 'sell' | 'intent'
  sourceAmount: string
  enabled?: boolean
}

export function useSwapRoute(props: UseQuoteParams) {
  const {
    fromAddress,
    toAddress,
    sourceToken,
    destinationToken,
    destinationAmount,
    type,
    sourceAmount,
    enabled = true,
  } = props
  const amount = type === 'sell' ? sourceAmount : destinationAmount
  return useQuery({
    queryKey: ['quote', sourceToken?.address, destinationToken?.address, amount, toAddress],
    queryFn: async () => {
      if (!sourceToken || !destinationToken || !amount || amount === '0' || !fromAddress || !toAddress) {
        return null
      }
      return fetchSwapRoute({
        senderAddress: fromAddress,
        recipientAddress: toAddress,
        tokenInAddress: sourceToken.address,
        tokenOutAddress: destinationToken.address,
        tokenInNetwork: sourceToken.network as Network,
        tokenOutNetwork: destinationToken.network as Network,
        tokenAmount: amount,
        slippage: '50',
        tradeType: type === 'sell' ? 'SOURCE_BASED' : 'DESTINATION_BASED',
        excludeBridges: 'gasyard',
      })
    },
    enabled: enabled && !!sourceToken && !!destinationToken && !!amount && amount !== '0',
    staleTime: 0, // No caching - always fetch fresh data
    gcTime: 0, // No garbage collection time - clean up immediately
    refetchOnMount: 'always', // Always refetch when component mounts
    refetchOnWindowFocus: false, // Don't refetch on window focus to avoid interrupting user
    retry: 2,
  })
}
