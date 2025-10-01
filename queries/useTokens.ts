'use client'

import { useQuery } from '@tanstack/react-query'
import { getDefaultTokens } from '@/constants/default-tokens'
import { getTokensBySymbol, getTokensBySymbolAndNetwork } from '@/services/token'
import type { Network } from '@/types/token'

interface UseTokenParams {
  query?: string | null
  network?: string | null
  enabled?: boolean
}

export function useSearchTokens({ query, network, enabled = true }: UseTokenParams) {
  return useQuery({
    queryKey: ['tokens', 'by-symbol-network', query, network],
    queryFn: () => {
      // If query is empty or null, return default tokens
      if (!query || query.trim() === '') {
        const networkEnum = network ? (network as Network) : undefined
        return getDefaultTokens(networkEnum)
      }

      // If query exists, search for tokens
      if (network) {
        return getTokensBySymbolAndNetwork(query, network)
      } else {
        return getTokensBySymbol(query)
      }
    },
    enabled: enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  })
}
