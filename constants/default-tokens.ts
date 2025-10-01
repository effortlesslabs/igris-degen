import { Network, type Token } from '../types/token'

const metaData = {
  USDC: {
    name: 'USD Coin',
    slug: 'usd-coin',
    symbol: 'USDC',
    logoURI: 'https://hyperbola-dev-assets.s3.ap-southeast-1.amazonaws.com/logo/usd-coin',
  },
  USDT: {
    name: 'Tether',
    slug: 'tether',
    symbol: 'USDT',
    logoURI: 'https://hyperbola-dev-assets.s3.ap-southeast-1.amazonaws.com/logo/tether',
  },

  ETH: {
    name: 'Ethereum',
    slug: 'ethereum',
    symbol: 'ETH',
    logoURI: 'https://hyperbola-dev-assets.s3.ap-southeast-1.amazonaws.com/logo/ethereum',
  },

  BNB: {
    name: 'BNB',
    slug: 'binancecoin',
    symbol: 'BNB',
    logoURI: 'https://assets-cdn.trustwallet.com/blockchains/bnbt/info/logo.png',
  },

  POL: {
    name: 'Polygon',
    slug: 'polygon',
    symbol: 'POL',
    logoURI: 'https://hyperbola-dev-assets.s3.ap-southeast-1.amazonaws.com/logo/polygon',
  },
}

const ethereumTokens = [
  {
    ...metaData.ETH,
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: Network.ethereum,
  },
  {
    ...metaData.USDC,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    decimals: 6,
    network: Network.ethereum,
  },
  {
    ...metaData.USDT,
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    decimals: 6,
    network: Network.ethereum,
  },
]

const baseTokens = [
  {
    ...metaData.ETH,
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: Network.base,
  },
  {
    ...metaData.USDC,
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    decimals: 6,
    network: Network.base,
  },
  {
    ...metaData.USDT,
    address: '0xfde4c96c8593536e31f229ea8f37b2ada2699bb2',
    decimals: 6,
    network: Network.base,
  },
]

const arbitrumTokens = [
  {
    ...metaData.ETH,
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: Network.arbitrum,
  },
  {
    ...metaData.USDC,
    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    decimals: 6,
    network: Network.arbitrum,
  },
  {
    ...metaData.USDT,
    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    decimals: 6,
    network: Network.arbitrum,
  },
]

const optimismTokens = [
  {
    ...metaData.ETH,
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: Network.optimism,
  },
  {
    ...metaData.USDC,
    address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
    decimals: 6,
    network: Network.optimism,
  },
  {
    ...metaData.USDT,
    address: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
    decimals: 6,
    network: Network.optimism,
  },
]

const bscTokens = [
  {
    ...metaData.BNB,
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: Network.bsc,
  },
  {
    ...metaData.USDC,
    address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    decimals: 18,
    network: Network.bsc,
  },
  {
    ...metaData.USDT,
    address: '0x55d398326f99059ff775485246999027b3197955',
    decimals: 18,
    network: Network.bsc,
  },
]

const polygonTokens = [
  {
    ...metaData.POL,
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: Network.polygon,
  },
  {
    ...metaData.USDT,
    address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    decimals: 6,
    network: Network.polygon,
  },
]

const tokens: Token[] = [
  ...ethereumTokens,
  ...baseTokens,
  ...arbitrumTokens,
  ...optimismTokens,
  ...bscTokens,
  ...polygonTokens,
]

export function getDefaultTokens(network?: Network) {
  if (!network) {
    return tokens
  }
  return tokens.filter((token) => token.network === network)
}
