export const BASE_URL = process.env.NEXT_PUBLIC_SYENGINE0_API_URL
const API_KEY = process.env.NEXT_PUBLIC_SYENGINE0_API_KEY

export enum Network {
  ethereum = 'ethereum',
  arbitrum = 'arbitrum',
  bsc = 'bsc',
  base = 'base',
  solana = 'solana',
  polygon = 'polygon',
  optimism = 'optimism',
}

export async function makeRequest(url: string, options: RequestInit) {
  if (!API_KEY) {
    throw new Error('API_KEY environment variable is required')
  }

  const headers = {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  }
  options.headers = headers

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`

      try {
        const errorData = await response.json()

        // Check for the specific error structure the API returns
        if (errorData?.success === false && errorData?.error) {
          if (errorData.error.message) {
            errorMessage = errorData.error.message
          } else if (errorData.error.details?.originalError?.details?.message) {
            errorMessage = errorData.error.details.originalError.details.message
          } else if (errorData.error.details?.originalError?.message) {
            errorMessage = errorData.error.details.originalError.message
          } else if (errorData.error.code) {
            errorMessage = `Error code: ${errorData.error.code}`
          }
        } else if (errorData?.error) {
          if (typeof errorData.error === 'string') {
            errorMessage = errorData.error
          } else if (errorData.error?.details) {
            errorMessage = errorData.error.details
          } else if (errorData.error?.message) {
            errorMessage = errorData.error.message
          } else {
            errorMessage = `API Error: ${JSON.stringify(errorData.error)}`
          }
        } else if (errorData?.details) {
          errorMessage = errorData.details
        } else if (errorData?.message) {
          errorMessage = errorData.message
        } else if (typeof errorData === 'string') {
          errorMessage = errorData
        } else if (errorData && typeof errorData === 'object') {
          const errorKeys = Object.keys(errorData)
          if (errorKeys.length > 0) {
            const firstKey = errorKeys[0]
            const firstValue = errorData[firstKey]
            if (typeof firstValue === 'string') {
              errorMessage = `${firstKey}: ${firstValue}`
            } else {
              errorMessage = `API Error: ${JSON.stringify(errorData)}`
            }
          }
        }
      } catch (parseError) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`
      }

      throw new Error(`API request failed: ${errorMessage}`)
    }

    const data = await response.json()

    // Check if the response indicates an error even with HTTP 200
    if (data.success === false && data.error) {
      let errorMessage = 'Unknown API error'

      if (data.error.message) {
        errorMessage = data.error.message
      } else if (data.error.details?.originalError?.details?.message) {
        errorMessage = data.error.details.originalError.details.message
      } else if (data.error.details?.originalError?.message) {
        errorMessage = data.error.details.originalError.message
      } else if (data.error.code) {
        errorMessage = `Error code: ${data.error.code}`
      }

      throw new Error(`API request failed: ${errorMessage}`)
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error(`API request failed: ${String(error)}`)
  }
}
