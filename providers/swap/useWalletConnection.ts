'use client'

import { useAppKitAccount, useAppKitState, useDisconnect } from '@reown/appkit/react'
import { useCallback, useMemo } from 'react'
import { useAccount } from 'wagmi'

import { useAppKit } from '@/providers/reown/config'

export function useWalletConnection() {
  const { initialized, loading } = useAppKitState()
  const { address, isConnected } = useAccount()
  const { address: loggedInAddress } = useAppKitAccount()
  const { disconnect } = useDisconnect()
  const modal = useAppKit()

  const connectWallet = useCallback(() => {
    modal.open()
  }, [modal])

  const disconnectWallet = useCallback(async () => {
    await disconnect()
  }, [disconnect])

  const ready = useMemo(() => {
    if (loading) {
      return false
    }
    return initialized
  }, [initialized, loading])

  const values = useMemo(() => {
    return {
      ready,
      address,
      authenticated: isConnected,
      loggedInAddress,
      connectWallet,
      disconnectWallet,
    }
  }, [connectWallet, loggedInAddress, disconnectWallet, address, isConnected, ready])

  return values
}
