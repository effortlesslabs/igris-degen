import { type AppKitNetwork, arbitrum, base, bitcoin, bsc, mainnet, optimism, polygon } from '@reown/appkit/networks'
import {
  createAppKit,
  useAppKit,
  useAppKitAccount,
  useAppKitEvents,
  useAppKitNetwork,
  useAppKitState,
  useAppKitTheme,
  useDisconnect,
  useWalletInfo,
} from '@reown/appkit/react'
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!

export const networks = [mainnet, polygon, arbitrum, optimism, bsc, base, bitcoin] as [
  AppKitNetwork,
  ...AppKitNetwork[],
]

// Setup wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
})

export const bitcoinAdapter = new BitcoinAdapter({
  projectId,
})

const modal = createAppKit({
  adapters: [wagmiAdapter, bitcoinAdapter],
  networks,
  projectId,
  themeVariables: {
    '--w3m-font-family': 'var(--font-sans)',
    '--w3m-accent': 'var(--primary)',
    '--w3m-color-mix': 'var(--background)',
    '--w3m-color-mix-strength': 40,
    '--w3m-z-index': 9999,
  },
})

export {
  modal,
  useAppKit,
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
  useAppKitNetwork,
  useDisconnect,
}
