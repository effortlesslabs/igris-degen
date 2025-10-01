'use client'

import type { ReactNode } from 'react'
import { type Config, cookieToInitialState, WagmiProvider } from 'wagmi'

import { projectId, wagmiAdapter } from './config'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

function ReownProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      {children}
    </WagmiProvider>
  )
}

export default ReownProvider
