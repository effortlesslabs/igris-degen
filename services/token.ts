import { fuzzySearchTokens } from '@/lib/fuzzy-search'
import type { GetTokenPrice, Token } from '@/types/token'
import { BASE_URL, makeRequest } from './common'

export async function getTokenPrices(slugs: string[]): Promise<GetTokenPrice[]> {
  if (!slugs) {
    throw new Error('Slugs are required')
  }

  if (!BASE_URL) {
    throw new Error('BASE_URL is not configured')
  }

  try {
    const url = new URL(`${BASE_URL}/v1/token/price`)
    url.searchParams.append('slugs', slugs.join(','))
    const response = await makeRequest(url.toString(), {
      method: 'GET',
    })
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch token price: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function searchTokens(query: string): Promise<Token[]> {
  if (!query) {
    throw new Error('Query is required')
  }

  if (!BASE_URL) {
    throw new Error('BASE_URL is not configured')
  }

  try {
    const url = new URL(`${BASE_URL}/v1/tokens/search`)
    url.searchParams.append('query', query)

    const response = await makeRequest(url.toString(), {
      method: 'GET',
    })
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch portfolio: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function getTokensBySymbol(query?: string | null) {
  const queryValue = query?.toLowerCase() || ''
  try {
    const tokens = await searchTokens(queryValue)
    return fuzzySearchTokens(tokens, queryValue)
  } catch (error) {
    throw new Error(`Error in tokenSearch: ${error}`)
  }
}

export async function getTokensBySymbolAndNetwork(query?: string | null, network?: string | null) {
  const queryValue = query?.toLowerCase() || ''
  try {
    const tokens = await searchTokens(queryValue)
    const results = fuzzySearchTokens(tokens, queryValue, network, 1)
    return results?.length !== 0 ? [results[0]] : []
  } catch (error) {
    throw new Error(`Error in tokenSearch: ${error}`)
  }
}
