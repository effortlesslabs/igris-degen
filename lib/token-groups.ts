import { formatUnits } from 'viem'
import type { Network } from '@/services/common'
import type { PortfolioToken } from '@/types/token'
import { fuzzySearchTokens } from './fuzzy-search'

export function filterByQueryAndNetwork(query: string, network: Network, tokens: PortfolioToken[]): PortfolioToken[] {
  // Use fuzzy search with network filtering
  return fuzzySearchTokens(tokens, query, network, 50) // Increased limit for portfolio tokens
}

export function getTokensGroupedBySlug(tokens: PortfolioToken[]): {
  totalValues: number
  totalBalances: string
  slug: string
  tokens: PortfolioToken[]
}[] {
  const slugs = tokens.reduce(
    (acc, token) => {
      const slug = token.slug
      const balance = formatUnits(BigInt(token.balance), token.decimals)
      if (!acc[slug]) {
        acc[slug] = {
          totalValues: 0,
          totalBalances: '0',
          slug: token.slug,
          tokens: [],
        }
      }
      acc[slug].totalValues += token.balanceInUsd
      acc[slug].totalBalances = (parseFloat(acc[slug].totalBalances) + parseFloat(balance)).toString()
      acc[slug].slug = token.slug
      acc[slug].tokens.push({ ...token, balance })
      return acc
    },
    {} as Record<string, { totalValues: number; totalBalances: string; slug: string; tokens: PortfolioToken[] }>,
  )
  return Object.values(slugs).sort((a, b) => b.totalValues - a.totalValues)
}
