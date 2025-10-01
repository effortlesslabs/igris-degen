import { parseUnits } from 'viem'

/**
 * Converts a string value to native token units (wei/smallest unit)
 * @param value - The input value as string
 * @param isAmountInDollar - Whether the input is in dollars or tokens
 * @param tokenPrice - The token price in USD
 * @param decimals - Token decimals
 * @returns The converted amount as a string in native units
 */
export function convertToNative(
  value: string,
  isAmountInDollar: boolean,
  tokenPrice: number,
  decimals: number,
): string {
  if (!value || value === '0') return '0'

  const numValue = parseFloat(value)
  if (Number.isNaN(numValue)) return '0'

  if (isAmountInDollar) {
    // Convert dollar amount to token amount
    if (tokenPrice <= 0) return '0'
    const tokenAmount = numValue / tokenPrice
    return parseUnits(tokenAmount.toString(), decimals).toString()
  } else {
    // Token amount - convert to wei/smallest unit
    try {
      const nativeTokenAmount = parseUnits(numValue.toString(), decimals)
      return nativeTokenAmount.toString()
    } catch {
      return '0'
    }
  }
}

/**
 * Calculates display values for both dollar and native amounts
 * @param value - The input value as string
 * @param isAmountInDollar - Whether the input is in dollars or tokens
 * @param tokenPrice - The token price in USD
 * @returns Object with dollarAmount and nativeAmount
 */
export function calculateDisplayValues(
  value: string,
  isAmountInDollar: boolean,
  tokenPrice: number,
): { dollarAmount: number; nativeAmount: number } {
  if (!value || value === '0') {
    return { dollarAmount: 0, nativeAmount: 0 }
  }

  const numValue = parseFloat(value)
  if (Number.isNaN(numValue)) {
    return { dollarAmount: 0, nativeAmount: 0 }
  }

  if (isAmountInDollar) {
    // Input is in dollars
    return {
      dollarAmount: numValue,
      nativeAmount: tokenPrice > 0 ? numValue / tokenPrice : 0,
    }
  } else {
    // Input is in tokens
    return {
      dollarAmount: tokenPrice > 0 ? numValue * tokenPrice : 0,
      nativeAmount: numValue,
    }
  }
}

/**
 * Parses and validates token price
 * @param price - The token price as string or number
 * @returns The parsed price or 0 if invalid
 */
export function parseTokenPrice(price: string | number | undefined): number {
  if (price === undefined) return 0
  const parsedPrice = typeof price === 'string' ? parseFloat(price) : price
  return Number.isNaN(parsedPrice) || parsedPrice <= 0 ? 0 : parsedPrice
}
