'use client'

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { useEffect, useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            retry: 1,
          },
        },
      }),
  )

  useEffect(() => {
    const localStoragePersister = createAsyncStoragePersister({
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    })

    persistQueryClient({
      queryClient,
      persister: localStoragePersister,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      dehydrateOptions: {
        shouldDehydrateQuery: (query) => {
          // Don't persist quote queries to ensure fresh data
          return !query.queryKey.includes('quote')
        },
      },
    })
  }, [queryClient])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
