import type { PortfolioToken } from '@/types/token'
import { BASE_URL, makeRequest } from './common'

export interface PortfolioData {
  totalPortfolioValue: number
  tokens: PortfolioToken[]
}

export async function getPortfolio(address: string): Promise<PortfolioData> {
  if (!address) {
    throw new Error('Address is required')
  }

  if (!BASE_URL) {
    throw new Error('BASE_URL is not configured')
  }

  try {
    const url = new URL(`${BASE_URL}/v1/portfolio`)
    url.searchParams.append('address', address)

    const response = await makeRequest(url.toString(), {
      method: 'GET',
    })
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch portfolio: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
