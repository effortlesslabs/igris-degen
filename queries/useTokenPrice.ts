'use client'

import { useQuery } from '@tanstack/react-query'
import { getTokenPrices } from '@/services/token'

interface UseTokenPriceParams {
  slugs: string[]
  enabled?: boolean
}

export function useTokenPrice({ slugs, enabled = true }: UseTokenPriceParams) {
  return useQuery({
    queryKey: ['token-price', slugs],
    queryFn: () => getTokenPrices(slugs),
    enabled: enabled && slugs.length > 0,
    staleTime: 0,
    gcTime: 0,
    retry: 2,
    refetchInterval: 6 * 1000, // Poll every 6 seconds
  })
}

// Convenience hook for single token price
export function useSingleTokenPrice(slug: string | null, enabled = true) {
  return useQuery({
    queryKey: ['token-price', slug],
    queryFn: () => getTokenPrices([slug!]),
    enabled: enabled && !!slug,
    staleTime: 0,
    gcTime: 0,
    retry: 2,
    refetchInterval: 6 * 1000, // Poll every 6 seconds
    select: (data) => data?.[0] || null, // Return first (and only) token price
  })
}
