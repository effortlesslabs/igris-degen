'use client'
import { createContext, memo, type ReactNode, useCallback, useContext, useEffect, useMemo } from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import { usePortfolio } from '@/queries/usePortfolio'
import { useSettings } from '@/queries/useSettings'
import { useSuggestions } from '@/queries/useSuggestions'
import { useSwapRoute as useSwapRouteQuery } from '@/queries/useSwapRoute'
import type { PortfolioData } from '@/services/portfolio'
import type { SwapRoute } from '@/types/route'
import type { PortfolioToken, Token } from '@/types/token'
import { useCheckSufficientBalance } from './useCheckSufficientBalance'
import { type ExecuteReturn, useStepsExecute } from './useStepsExecute'
import { type SwapFormData, useSwapForm as useSwapFormHook } from './useSwapForm'
import type { UseTimerReturn } from './useTimer'
import { useTimer } from './useTimer'
import { useWalletConnection as useWalletConnectionHook } from './useWalletConnection'

interface WalletConnection {
  ready: boolean
  address: `0x${string}` | undefined
  authenticated: boolean
  loggedInAddress: string | undefined
  connectWallet: () => void
  disconnectWallet: () => void
}

interface Portfolio {
  portfolio: PortfolioData
  loading: boolean
  refetch: () => void
  error: Error | undefined
}

interface SwapForm {
  isAmountInDollar: boolean
  sourceToken: PortfolioToken | null
  destinationToken: Token | null
  sourceAmount: string
  destinationAmount: string
  toAddress: string
  setValue: UseFormSetValue<SwapFormData>
}

interface SwapRouteData {
  swapRoute: SwapRoute | null
  isSwapRouteLoading: boolean
  refetchSwapRoute: () => void
  isSwapRouteError: Error | null
}

interface SwapContextState {
  walletConnection: WalletConnection
  portfolio: Portfolio
  swapForm: SwapForm
  swapRoute: SwapRouteData
  suggestions: SwapRoute[]
  execute: ExecuteReturn
  suggestionsLoading: boolean
  isInsufficientBalance: boolean
  type: 'buy' | 'sell' | 'intent'
  preference: 'cheapest' | 'fastest'
  slippage: number
  timer: UseTimerReturn
  handleCompleteSwap: () => void
  handleTypeChange: (type: 'buy' | 'sell' | 'intent') => void
  handleSelectSuggestion: (suggestion: SwapRoute) => void
}

interface SwapProviderProps {
  children: ReactNode
}

const SwapContext = createContext<SwapContextState | null>(null)

export const SwapProvider = memo(function SwapProvider({ children }: SwapProviderProps) {
  const settings = useSettings()
  const walletConnection = useWalletConnectionHook()

  const portfolio = usePortfolio(walletConnection.loggedInAddress)
  const swapForm = useSwapFormHook({ fromAddress: walletConnection.loggedInAddress ?? '' })
  const swapRouteQuery = useSwapRouteQuery({
    fromAddress: walletConnection.loggedInAddress ?? null,
    toAddress: swapForm.toAddress,
    sourceToken: swapForm.sourceToken,
    destinationToken: swapForm.destinationToken,
    sourceAmount: swapForm.sourceAmount,
  })

  const smartSuggestions = useSuggestions({
    fromAddress: walletConnection.loggedInAddress ?? null,
    toAddress: swapForm.toAddress,
    sourceToken: swapForm.sourceToken,
    sourceAmount: swapForm.sourceAmount,
  })

  const isInsufficientBalance = useCheckSufficientBalance({
    sourceToken: swapForm.sourceToken!,
    sourceAmount: swapForm.sourceAmount,
  })

  const handleSelectSuggestion = useCallback(
    (suggestion: SwapRoute) => {
      swapForm.setValue('destinationToken', suggestion.metadata.tokenOut as Token)
    },
    [swapForm],
  )

  const timer = useTimer({
    autoStart: false,
    initialTime: 20,
    onTimerEnd: () => {
      swapRouteQuery.refetch()
    },
  })

  const execute = useStepsExecute({
    swapRoute: swapRouteQuery.data ?? null,
    stopTimer: timer.stop,
  })

  useEffect(() => {
    // Only restart timer when we have new quote data (not the same quote)
    if (swapRouteQuery.data && !swapRouteQuery.isFetching && !timer.isRunning && !execute.isExecuting) {
      timer.restart()
    }
  }, [swapRouteQuery.data, swapRouteQuery.isFetching, timer, execute.isExecuting])

  const handleTypeChange = useCallback(
    (type: 'buy' | 'sell' | 'intent') => {
      settings.setType(type)
      swapForm.reset()
    },
    [settings, swapForm],
  )

  const handleCompleteSwap = useCallback(() => {
    timer.stop()
    swapForm.reset()
    execute.reset()
  }, [timer, swapForm, execute])

  const swapRoute = useMemo<SwapRouteData>(
    () => ({
      swapRoute: swapRouteQuery.data ?? null,
      isSwapRouteLoading: swapRouteQuery.isFetching,
      refetchSwapRoute: swapRouteQuery.refetch,
      isSwapRouteError: swapRouteQuery.error ?? null,
    }),
    [swapRouteQuery.data, swapRouteQuery.isFetching, swapRouteQuery.refetch, swapRouteQuery.error],
  )

  const portfolioValues = useMemo<Portfolio>(
    () => ({
      portfolio: portfolio.data ?? {
        totalPortfolioValue: 0,
        tokens: [],
      },
      loading: portfolio.isLoading,
      refetch: portfolio.refetch,
      error: portfolio.error ?? undefined,
    }),
    [portfolio],
  )

  const contextValue = useMemo<SwapContextState>(
    () => ({
      walletConnection,
      portfolio: portfolioValues,
      swapForm,
      swapRoute,
      suggestions: smartSuggestions.data ?? [],
      suggestionsLoading: smartSuggestions.isLoading,
      execute,
      isInsufficientBalance,
      type: settings.type,
      preference: settings.preference,
      slippage: settings.slippage,
      handleTypeChange,
      timer,
      handleCompleteSwap,
      handleSelectSuggestion,
    }),
    [
      portfolioValues,
      smartSuggestions.isLoading,
      walletConnection,
      swapForm,
      swapRoute,
      smartSuggestions.data,
      isInsufficientBalance,
      settings,
      handleTypeChange,
      timer,
      handleCompleteSwap,
      execute,
      handleSelectSuggestion,
    ],
  )

  return <SwapContext.Provider value={contextValue}>{children}</SwapContext.Provider>
})

export function useSwapContext() {
  const context = useContext(SwapContext)
  if (!context) {
    throw new Error('useSwapContext must be used within a SwapProvider')
  }
  return context
}

export function useSwapWallet() {
  const context = useSwapContext()
  return context.walletConnection
}

export function useSwapPortfolio() {
  const context = useSwapContext()
  return context.portfolio
}

export function useSwapForm() {
  const context = useSwapContext()
  return context.swapForm
}

export function useSwapRoute() {
  const context = useSwapContext()
  return context.swapRoute
}

export function useSwapTimer() {
  const context = useSwapContext()
  return context.timer
}

export function useSwapExecute() {
  const context = useSwapContext()
  return context.execute
}
