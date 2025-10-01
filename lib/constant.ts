import { Network } from '@/services/common'

export const nativeTokenAddress = '0x0000000000000000000000000000000000000000'
export const defaultLogo = 'https://assets-cdn.trustwallet.com/blockchains/icon/info/logo.png'

export const ethereum = {
  address: nativeTokenAddress,
  decimals: 18,
  name: 'Ethereum',
  slug: 'ethereum',
  symbol: 'ETH',
  logoURI: '/networks/eth.svg',
  network: Network.ethereum,
}

export const arbitrum = {
  ...ethereum,
  name: 'Arbitrum',
  slug: 'arbitrum',
  logoURI: '/networks/arbitrum.svg',
  network: Network.arbitrum,
}

export const base = {
  ...ethereum,
  name: 'Base',
  slug: 'base',
  logoURI: '/networks/base.svg',
  network: Network.base,
}

export const bnb = {
  address: nativeTokenAddress,
  decimals: 18,
  name: 'BNB',
  slug: 'bnb',
  symbol: 'BNB',
  logoURI: '/networks/bsc.svg',
  network: Network.bsc,
}

export const polygon = {
  address: nativeTokenAddress,
  decimals: 18,
  name: 'Polygon',
  slug: 'polygon',
  symbol: 'MATIC',
  logoURI: '/networks/polygon.svg',
  network: Network.polygon,
}

export const optimism = {
  ...ethereum,
  name: 'Optimism',
  slug: 'optimism',
  logoURI: '/networks/optimism.svg',
  network: Network.optimism,
}

export const solana = {
  address: nativeTokenAddress,
  decimals: 9,
  name: 'Solana',
  slug: 'solana',
  symbol: 'SOL',
  logoURI: '/networks/solana.svg',
  network: Network.solana,
}

export function getLogoByNetwork(network: Network) {
  switch (network) {
    case Network.ethereum:
      return ethereum.logoURI
    case Network.arbitrum:
      return arbitrum.logoURI
    case Network.base:
      return base.logoURI
    case Network.bsc:
      return bnb.logoURI
    case Network.polygon:
      return polygon.logoURI
    case Network.optimism:
      return optimism.logoURI
    default:
      return ethereum.logoURI
  }
}

export function getNetworkAsset(network: Network) {
  switch (network) {
    case Network.ethereum:
      return { name: 'Ethereum', logoURI: ethereum.logoURI }
    case Network.arbitrum:
      return { name: 'Arbitrum', logoURI: arbitrum.logoURI }
    case Network.bsc:
      return { name: 'Bsc', logoURI: bnb.logoURI }
    case Network.base:
      return { name: 'Base', logoURI: base.logoURI }
    case Network.polygon:
      return { name: 'Polygon', logoURI: polygon.logoURI }
    case Network.optimism:
      return { name: 'Optimism', logoURI: optimism.logoURI }
    case Network.solana:
      return { name: 'Solana', logoURI: solana.logoURI }
    default:
      return { name: 'Unknown', logoURI: defaultLogo }
  }
}

export function getWalletDetails(walletName?: string) {
  switch (walletName) {
    case 'metamask':
      return { name: 'MetaMask', logoURI: 'https://alpha.igris.bot/metamask.svg' }
    case 'walletconnect':
      return { name: 'WalletConnect', logoURI: 'https://alpha.igris.bot/walletconnect.svg' }
    case 'trustwallet':
      return { name: 'Trust Wallet', logoURI: 'https://alpha.igris.bot/metamask.svg' }
    case 'coinbase':
      return { name: 'Coinbase', logoURI: 'https://alpha.igris.bot/metamask.svg' }
    default:
      return { name: 'Unknown', logoURI: defaultLogo }
  }
}

export function getExplorerUrl(network: Network, address: string) {
  switch (network) {
    case Network.ethereum:
      return `https://etherscan.io/address/${address}`
    case Network.arbitrum:
      return `https://arbiscan.io/address/${address}`
    case Network.base:
      return `https://basescan.org/address/${address}`
    case Network.bsc:
      return `https://bscscan.com/address/${address}`
    case Network.polygon:
      return `https://polygonscan.com/address/${address}`
    case Network.optimism:
      return `https://optimistic.etherscan.io/address/${address}`
    case Network.solana:
      return `https://solscan.io/address/${address}`
    default:
      return `https://etherscan.io/address/${address}`
  }
}

export function getExplorerTxUrl(network: Network, hash: string) {
  switch (network) {
    case Network.ethereum:
      return `https://etherscan.io/tx/${hash}`
    case Network.arbitrum:
      return `https://arbiscan.io/tx/${hash}`
    case Network.base:
      return `https://basescan.org/tx/${hash}`
    case Network.bsc:
      return `https://bscscan.com/tx/${hash}`
    case Network.polygon:
      return `https://polygonscan.com/tx/${hash}`
    case Network.optimism:
      return `https://optimistic.etherscan.io/tx/${hash}`
    case Network.solana:
      return `https://solscan.io/tx/${hash}`
    default:
      return `https://etherscan.io/tx/${hash}`
  }
}

export const nativeTokens = [ethereum, arbitrum, base, bnb, polygon, optimism]

export function getNetworkByChainId(chainId: number) {
  switch (chainId) {
    case 1:
      return Network.ethereum
    case 42161:
      return Network.arbitrum
    case 8453:
      return Network.base
    case 137:
      return Network.polygon
    case 10:
      return Network.optimism
    case 56:
      return Network.bsc
    default:
      return Network.ethereum
  }
}

export function getNetworkIcon(network: Network) {
  switch (network) {
    case Network.ethereum:
      return '/networks/eth.svg'
    case Network.arbitrum:
      return '/networks/arbitrum.svg'
    case Network.base:
      return '/networks/base.svg'
    case Network.polygon:
      return '/networks/polygon.svg'
    case Network.optimism:
      return '/networks/optimism.svg'
    case Network.bsc:
      return '/networks/bsc.svg'
    default:
      return '/networks/eth.svg'
  }
}
