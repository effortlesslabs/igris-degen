import { useSwapContext } from '@/providers/swap/provider'

const BUTTON_STYLES = {
  base: 'w-full max-w-lg max-w-xs mx-auto',
  fullWidth: 'w-full font-bold',
} as const

const BUTTON_TEXTS = {
  connectWallet: 'Connect Wallet',
  selectToken: 'Select Token',
  enterAmount: 'Enter Amount',
  insufficientBalance: 'Insufficient Balance',
  approveQuote: 'Approve Quote',
  updatingQuote: 'Updating Quote...',
  execute: 'Execute',
  noQuote: 'No Quote',
} as const

export function computeBuyButtonState() {
  const { walletConnection, swapForm, swapRoute, isInsufficientBalance } = useSwapContext()

  if (!walletConnection.authenticated || !walletConnection.loggedInAddress) {
    return {
      buttonText: BUTTON_TEXTS.connectWallet,
      buttonStyle: BUTTON_STYLES.base,
    }
  }

  if (!swapForm.destinationToken) {
    return {
      buttonText: BUTTON_TEXTS.selectToken,
      buttonStyle: BUTTON_STYLES.base,
    }
  }

  if (swapForm.destinationAmount === '0') {
    return {
      buttonText: BUTTON_TEXTS.enterAmount,
      buttonStyle: BUTTON_STYLES.base,
    }
  }

  if (!swapForm.sourceToken) {
    return {
      buttonText: BUTTON_TEXTS.selectToken,
      buttonStyle: BUTTON_STYLES.base,
    }
  }

  if (isInsufficientBalance) {
    return {
      buttonText: BUTTON_TEXTS.insufficientBalance,
      buttonStyle: BUTTON_STYLES.base,
    }
  }

  if (swapRoute.isSwapRouteLoading) {
    return {
      buttonText: BUTTON_TEXTS.updatingQuote,
      buttonStyle: BUTTON_STYLES.base,
    }
  }

  if (!swapRoute.swapRoute) {
    return {
      buttonText: BUTTON_TEXTS.noQuote,
      buttonStyle: BUTTON_STYLES.base,
    }
  }
  return null
}

export function computeSellButtonState() {
  const { walletConnection, swapForm, isInsufficientBalance, swapRoute } = useSwapContext()

  if (!walletConnection.authenticated || !walletConnection.loggedInAddress) {
    return {
      buttonText: BUTTON_TEXTS.connectWallet,
      buttonStyle: BUTTON_STYLES.base,
    }
  }

  if (!swapForm.sourceToken) {
    return {
      buttonText: BUTTON_TEXTS.selectToken,
      buttonStyle: BUTTON_STYLES.base,
    }
  }

  if (swapForm.sourceAmount === '0') {
    return {
      buttonText: BUTTON_TEXTS.enterAmount,
      buttonStyle: BUTTON_STYLES.base,
    }
  }

  if (isInsufficientBalance) {
    return {
      buttonText: BUTTON_TEXTS.insufficientBalance,
      buttonStyle: BUTTON_STYLES.base,
    }
  }

  if (!swapForm.destinationToken) {
    return {
      buttonText: BUTTON_TEXTS.selectToken,
      buttonStyle: BUTTON_STYLES.base,
    }
  }

  if (swapRoute.isSwapRouteLoading) {
    return {
      buttonText: BUTTON_TEXTS.updatingQuote,
      buttonStyle: BUTTON_STYLES.base,
    }
  }

  if (!swapRoute.swapRoute) {
    return {
      buttonText: BUTTON_TEXTS.noQuote,
      buttonStyle: BUTTON_STYLES.base,
    }
  }

  return null
}
