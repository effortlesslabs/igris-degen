import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Network } from '@/types/token'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Shortens a crypto address for display
 * @param address - The full crypto address
 * @param startLength - Number of characters to show at the start (default: 6)
 * @param endLength - Number of characters to show at the end (default: 4)
 * @returns Shortened address like "0x1234...abcd"
 */
export function shortenAddress(address: string, startLength: number = 6, endLength: number = 4): string {
  if (!address || address.length < startLength + endLength + 3) {
    return address
  }

  const start = address.slice(0, startLength)
  const end = address.slice(-endLength)
  return `${start}...${end}`
}

/**
 * Formats wallet and transaction error messages to be user-friendly
 * @param error - The error object or message
 * @returns A user-friendly error message
 */
export function formatWalletErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    const message = error.message

    // Handle specific wagmi errors with user-friendly messages
    if (message.includes('User rejected')) {
      return 'Transaction was cancelled by user'
    } else if (message.includes('not been authorized by the user') || message.includes('not authorized')) {
      return 'Connect your wallet or unlock MetaMask'
    } else if (message.includes('insufficient funds')) {
      return 'Insufficient funds for transaction'
    } else if (message.includes('chain')) {
      return 'Network switching failed'
    } else if (message.includes('gas')) {
      return 'Gas estimation failed'
    } else {
      // Truncate long error messages
      return message.length > 50 ? message.substring(0, 50) + '...' : message
    }
  }

  return 'An unknown error occurred'
}
