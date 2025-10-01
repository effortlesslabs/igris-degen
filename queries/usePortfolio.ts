'use client'

import { useQuery } from '@tanstack/react-query'
import { getPortfolio, type PortfolioData } from '@/services/portfolio'

export function usePortfolio(address?: string, isPolling = true) {
  const isDevelopment = process.env.NODE_ENV === 'production'
  const shouldPoll = isPolling && !isDevelopment

  return useQuery({
    queryKey: ['portfolio', address],
    queryFn: () => getPortfolio(address!),
    enabled: !!address && address.trim() !== '',
    staleTime: shouldPoll ? 0 : 6 * 1000, // 6 seconds
    gcTime: shouldPoll ? 6 * 1000 : 6 * 1000, // Keep consistent gcTime
    refetchInterval: shouldPoll ? 6 * 1000 : false, // 6 seconds
    refetchIntervalInBackground: shouldPoll, // Allow background refetching
    placeholderData: {
      totalPortfolioValue: 0,
      tokens: [],
    } as PortfolioData,
  })
}
