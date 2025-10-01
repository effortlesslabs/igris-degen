export enum Network {
  ethereum = 'ethereum',
  arbitrum = 'arbitrum',
  bsc = 'bsc',
  base = 'base',
  solana = 'solana',
  polygon = 'polygon',
  optimism = 'optimism',
}

export interface Token {
  name: string
  slug: string
  address: string
  symbol: string
  decimals: number
  network: Network
  logoURI: string
}

export interface TokenWithPrice extends Token {
  price: string
}

/**
 * Represents a token with an associated balance.
 *
 * @extends Token
 *
 * @property {string} balance - The balance of the token.
 */
export interface TokenWithBalance extends Token {
  balance: string
}

export interface TokenWithWallet extends TokenWithBalance {
  wallet: string
}

/**
 * Represents a token with balance and price information.
 *
 * @extends TokenWithBalance
 *
 * @property {string} price - The price of the token in USD.
 */
export interface TokenWithBalanceAndPrice extends TokenWithBalance {
  price: string
}

export interface TokenWithBalanceAndPriceWithWallet extends TokenWithBalanceAndPrice {
  wallet: string
}

/**
 * Represents a token with balance, price, network, and wallet information.
 *
 * @extends TokenWithBalanceAndPrice
 *
 * @property {string} wallet - The wallet address.
 * @property {Network} network - The network.
 */
export interface TokenWithBalancePriceNetworkWallet extends TokenWithBalanceAndPrice {
  balanceInUsd: number
  wallet: string
  network: Network
}

export interface PortfolioToken extends TokenWithBalanceAndPrice {
  balanceInUsd: number
  wallet: string
  network: Network
}

export interface GetTokenPrice {
  slug: string
  price: string
}
