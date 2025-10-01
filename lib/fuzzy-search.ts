import Fuse from 'fuse.js'
import type { Token } from '@/types/token'

/**
 * Performs fuzzy search on tokens using Fuse.js
 * @param tokens - Array of tokens to search through
 * @param query - Search query string
 * @param network - Optional network filter
 * @param limit - Maximum number of results to return (default: 10)
 * @returns Array of matching tokens
 */
export function fuzzySearchTokens<T extends Token>(
  tokens: T[],
  query: string,
  network?: string | null,
  limit = 10,
): T[] {
  if (!query) {
    const filteredTokens = network ? tokens.filter((token) => token.network === network) : tokens
    return filteredTokens.slice(0, limit)
  }

  // First, check for exact matches
  const exactMatches = tokens.filter((token) => {
    const tokenName = token.name?.toLowerCase() || ''
    const tokenSymbol = token.symbol?.toLowerCase() || ''
    const matchesQuery = tokenName === query || tokenSymbol === query

    if (network) {
      return matchesQuery && token.network === network
    }
    return matchesQuery
  })

  // If we have exact matches, return them (limited)
  if (exactMatches.length > 0) {
    return exactMatches.slice(0, limit)
  }

  // Only use fuzzy search if no exact matches found
  const fuseOptions = {
    keys: ['name', 'symbol'],
    threshold: 0.3, // Lower threshold = more strict matching
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    shouldSort: true,
    findAllMatches: false,
    location: 0,
    distance: 100,
    useExtendedSearch: false,
    ignoreLocation: false,
    ignoreFieldNorm: false,
  }

  const fuse = new Fuse(tokens, fuseOptions)
  const searchResults = fuse.search(query)

  // Extract tokens from search results and apply filters
  const fuzzyTokens = searchResults
    .filter((result) => result.score && result.score < 0.4) // Only include good matches
    .map((result) => result.item)
    .filter((token) => (network ? token.network === network : true))
    .slice(0, limit)

  return fuzzyTokens
}
