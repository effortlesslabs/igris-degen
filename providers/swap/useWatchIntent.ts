import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { fetchIntentStatus } from '../../services/route'
import type { IntentStatusResponse } from '../../types/route'

export interface UseWatchIntentReturn {
  intentData: IntentStatusResponse | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
  startWatching: (intentId: string, transactions: string[]) => void
  stopWatching: () => void
  reset: () => void
}

export const useWatchIntent = (): UseWatchIntentReturn => {
  const [intentId, setIntentId] = useState<string | null>(null)
  const [transactions, setTransactions] = useState<string[]>([])
  const queryClient = useQueryClient()
  const [tempResponseStatus, setTempResponseStatus] = useState<IntentStatusResponse | null>(null)

  const {
    data: intentData,
    isLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ['intent-status', intentId],
    queryFn: async (): Promise<IntentStatusResponse> => {
      if (!intentId) {
        return {
          intentStatus: 'pending',
          transactions: [],
        }
      }

      const data = await fetchIntentStatus(intentId, transactions)
      if (data.intentStatus === 'success' || data.intentStatus === 'failed' || data.intentStatus === 'refund') {
        setTempResponseStatus(data)
      }
      return data
    },
    enabled: Boolean(intentId),
    refetchInterval: (query) => {
      const data = query.state.data
      if (!data) return 5000

      // Stop polling when intent is finalized
      return data.intentStatus === 'success' || data.intentStatus === 'failed' || data.intentStatus === 'refund'
        ? false
        : 5000
    },
    refetchIntervalInBackground: true,
    retry: 3,
    staleTime: 0,
    gcTime: 5 * 60 * 1000, // 5 minutes
  })

  const startWatching = useCallback(
    (id: string, transactions: string[]) => {
      if (!id) return

      setIntentId(id)
      setTransactions(transactions)

      // Prefetch with proper error handling
      queryClient.prefetchQuery({
        queryKey: ['intent-status', id],
        queryFn: async (): Promise<IntentStatusResponse> => {
          const data = await fetchIntentStatus(id, transactions)
          return data
        },
        staleTime: 0,
        gcTime: 5 * 60 * 1000,
      })
    },
    [queryClient],
  )

  const stopWatching = useCallback(() => {
    setIntentId(null)
    if (intentId) {
      queryClient.removeQueries({ queryKey: ['intent-status', intentId] })
    }
  }, [queryClient, intentId])

  const refetchIntent = useCallback(async () => {
    if (intentId) {
      try {
        await refetch()
      } catch (_error) {}
    }
  }, [intentId, refetch])

  useEffect(() => {
    if (intentData) {
      if (
        intentData.intentStatus === 'success' ||
        intentData.intentStatus === 'failed' ||
        intentData.intentStatus === 'refund'
      ) {
        stopWatching()
      }
    }
  }, [intentData, stopWatching])

  const reset = useCallback(() => {
    setIntentId(null)
    setTransactions([])
    setTempResponseStatus(null)
  }, [])

  return {
    intentData: tempResponseStatus || intentData || null,
    isLoading,
    error: queryError?.message || null,
    refetch: refetchIntent,
    startWatching,
    stopWatching,
    reset,
  }
}
