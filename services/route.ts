import type { IntentStatusResponse, RouteParams, SmartRouteParams, SwapRoute } from '../types/route'

const API_BASE_URL = process.env.NEXT_PUBLIC_ROUTE_AGGREGATE_API_URL

/**
 * Common function to parse API error responses and extract meaningful error messages
 */
function parseApiError(errorData: any): string {
  // Check for the specific error structure the API returns
  if (errorData?.success === false && errorData?.error) {
    if (errorData.error.message) {
      return errorData.error.message
    } else if (errorData.error.details?.originalError?.details?.message) {
      return errorData.error.details.originalError.details.message
    } else if (errorData.error.details?.originalError?.message) {
      return errorData.error.details.originalError.message
    } else if (errorData.error.code) {
      return `Error code: ${errorData.error.code}`
    }
  } else if (errorData?.error) {
    if (typeof errorData.error === 'string') {
      return errorData.error
    } else if (errorData.error?.details) {
      return errorData.error.details
    } else if (errorData.error?.message) {
      return errorData.error.message
    } else {
      return `API Error: ${JSON.stringify(errorData.error)}`
    }
  } else if (errorData?.details) {
    return errorData.details
  } else if (errorData?.message) {
    return errorData.message
  } else if (typeof errorData === 'string') {
    return errorData
  } else if (errorData && typeof errorData === 'object') {
    // Try to extract meaningful information from the error object
    const errorKeys = Object.keys(errorData)
    if (errorKeys.length > 0) {
      const firstKey = errorKeys[0]
      const firstValue = errorData[firstKey]
      if (typeof firstValue === 'string') {
        return `${firstKey}: ${firstValue}`
      } else {
        return `API Error: ${JSON.stringify(errorData)}`
      }
    }
  }

  return 'Unknown API error'
}

export async function fetchSwapRoute(args: RouteParams): Promise<SwapRoute | null> {
  const queryParams = new URLSearchParams(args)

  try {
    const response = await fetch(`${API_BASE_URL}/v1/get-intent-quote?${queryParams}`, {
      method: 'GET',
    })

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`

      try {
        const errorData = await response.json()
        errorMessage = parseApiError(errorData)
      } catch (_parseError) {
        // If JSON parsing fails, use the status text
        errorMessage = `HTTP ${response.status}: ${response.statusText}`
      }

      throw new Error(`Swap route fetch failed: ${errorMessage}`)
    }

    const data = await response.json()

    // Check if the response indicates an error even with HTTP 200
    if (data.success === false && data.error) {
      const errorMessage = parseApiError(data)
      throw new Error(`Swap route fetch failed: ${errorMessage}`)
    }

    return data.data
  } catch (error) {
    // If it's already an Error instance, re-throw it
    if (error instanceof Error) {
      throw error
    }
    // If it's something else, wrap it in an Error
    throw new Error(`Swap route fetch failed: ${String(error)}`)
  }
}

export async function fetchSmartSwapRoute(args: SmartRouteParams): Promise<SwapRoute[]> {
  const queryParams = new URLSearchParams(args)

  try {
    const response = await fetch(`${API_BASE_URL}/v1/get-smart-quotes?${queryParams}`, {
      method: 'GET',
    })

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`

      try {
        const errorData = await response.json()
        errorMessage = parseApiError(errorData)
      } catch (_parseError) {
        // If JSON parsing fails, use the status text
        errorMessage = `HTTP ${response.status}: ${response.statusText}`
      }

      throw new Error(`Swap route fetch failed: ${errorMessage}`)
    }

    const data = await response.json()

    // Check if the response indicates an error even with HTTP 200
    if (data.success === false && data.error) {
      const errorMessage = parseApiError(data)
      throw new Error(`Swap route fetch failed: ${errorMessage}`)
    }

    return data.data
  } catch (error) {
    // If it's already an Error instance, re-throw it
    if (error instanceof Error) {
      throw error
    }
    // If it's something else, wrap it in an Error
    throw new Error(`Swap route fetch failed: ${String(error)}`)
  }
}

export async function fetchIntentStatus(intentId: string, transactions: string[]): Promise<IntentStatusResponse> {
  try {
    const transactionsInputString = transactions.join(',')
    const response = await fetch(
      `${API_BASE_URL}/v1/get-intent-status?intentId=${intentId}&transactions=${transactionsInputString}`,
      {
        method: 'GET',
      },
    )

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`

      try {
        const errorData = await response.json()
        errorMessage = parseApiError(errorData)
      } catch (_parseError) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`
      }

      throw new Error(`Intent status fetch failed: ${errorMessage}`)
    }

    const data = await response.json()

    // Check if the response indicates an error even with HTTP 200
    if (data.success === false && data.error) {
      const errorMessage = parseApiError(data)
      throw new Error(`Intent status fetch failed: ${errorMessage}`)
    }

    return data.data as IntentStatusResponse
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error(`Intent status fetch failed: ${String(error)}`)
  }
}
