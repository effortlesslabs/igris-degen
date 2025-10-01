import { useCallback, useEffect, useState } from 'react'
import { useAccount, usePublicClient, useSendTransaction, useSwitchChain } from 'wagmi'
import { getNetworkByChainId } from '@/lib/constant'
import { formatWalletErrorMessage } from '@/lib/utils'
import type { IntentStatusResponse, Step, StepTransactionType, SwapRoute } from '@/types/route'
import { Network } from '@/types/token'
import { useWatchIntent } from './useWatchIntent'

export type ExecuteStatus = 'idle' | 'loading' | 'success' | 'error'

interface UseExecuteProps {
  swapRoute: SwapRoute | null
  stopTimer: () => void
}

type StepTransactionTypeExtended = StepTransactionType | 'watch_order_filled'

export interface ExecutionStep extends Omit<Step, 'transactionType'> {
  senderAddress: string
  recipientAddress: string
  network: Network
  transactionType: StepTransactionTypeExtended
  status: ExecuteStatus
  txHash?: string
  errorMessage?: string
}

export interface ExecuteReturn {
  intentData: IntentStatusResponse | null
  isExecuting: boolean
  isSuccess: boolean
  executionSteps: ExecutionStep[]
  startExecution: () => Promise<void>
  reset: () => void
}

function computeExecutionSteps(
  routeSteps: Step[],
  senderAddress: string,
  recipientAddress: string,
  tokenOutNetwork: Network,
): ExecutionStep[] {
  const steps = routeSteps.map((step) => ({
    senderAddress,
    recipientAddress,
    network: step.data?.chainId ? getNetworkByChainId(step.data.chainId) : Network.ethereum,
    status: 'idle' as ExecuteStatus,
    ...step,
  }))

  const confirmationStep: ExecutionStep = {
    senderAddress,
    recipientAddress,
    transactionType: 'watch_order_filled',
    action: 'Finalize Swap',
    description: 'Waiting for order to be filled',
    kind: 'watch_order_filled',
    requestId: 'watch_order_filled',
    status: 'idle' as ExecuteStatus,
    network: tokenOutNetwork,
  }

  return [...steps, confirmationStep]
}

export const useStepsExecute = ({ swapRoute, stopTimer }: UseExecuteProps): ExecuteReturn => {
  const [isExecuting, setIsExecuting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { sendTransactionAsync } = useSendTransaction()
  const { switchChainAsync } = useSwitchChain()
  const { chainId: currentChainId } = useAccount()
  const publicClient = usePublicClient()
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([])
  const { startWatching, intentData, reset: resetWatchIntent } = useWatchIntent()

  const waitForTransactionReceipt = useCallback(
    async (txHash: string) => {
      try {
        if (!publicClient) throw new Error('Public client not available')

        const result = await publicClient.waitForTransactionReceipt({ hash: txHash as `0x${string}`, confirmations: 0 })

        if (result.status === 'reverted') {
          throw new Error('Transaction reverted')
        }
        return result
      } catch (error) {
        throw new Error('Failed to wait for transaction receipt: ' + error)
      }
    },
    [publicClient],
  )

  const handleChainSwitch = useCallback(
    async (chainId: number) => {
      if (currentChainId === chainId) {
        return
      }
      await switchChainAsync({ chainId })
    },
    [switchChainAsync, currentChainId],
  )

  const updateExecutionStepByIndex = useCallback(
    (index: number, status: ExecuteStatus, txHash?: string, errorMessage?: string) => {
      setExecutionSteps((prev) =>
        prev.map((step, stepIndex) => (stepIndex === index ? { ...step, status, txHash, errorMessage } : step)),
      )
    },
    [],
  )

  const handleTransaction = useCallback(
    async (stepIndex: number, transactionData: any) => {
      try {
        updateExecutionStepByIndex(stepIndex, 'loading')
        await handleChainSwitch(transactionData.chainId)
        const txHash = await sendTransactionAsync({
          to: transactionData.to as `0x${string}`,
          data: transactionData.data as `0x${string}`,
          value: BigInt(transactionData.value),
          maxFeePerGas: BigInt(transactionData.maxFeePerGas),
          maxPriorityFeePerGas: BigInt(transactionData.maxPriorityFeePerGas),
        })
        // await waitForTransactionReceipt(txHash)
        updateExecutionStepByIndex(stepIndex, 'success', txHash)
        return true
      } catch (error) {
        updateExecutionStepByIndex(stepIndex, 'error', undefined, formatWalletErrorMessage(error))
        return false
      }
    },
    [handleChainSwitch, sendTransactionAsync, updateExecutionStepByIndex],
  )

  const startExecution = useCallback(async () => {
    stopTimer()
    setIsExecuting(true)
    if (!swapRoute) throw new Error('Swap route is not defined')

    const steps = computeExecutionSteps(
      swapRoute.steps,
      swapRoute.senderAddress,
      swapRoute.recipientAddress,
      swapRoute.metadata.tokenOut.network,
    )
    setExecutionSteps(steps)

    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      const step = steps[stepIndex]
      if (step.kind === 'transaction' && step.data) {
        const success = await handleTransaction(stepIndex, step.data)
        if (!success) {
          break
        }
      } else if (step.kind === 'signature') {
        throw new Error('signature not supported')
      } else if (step.kind === 'watch_order_filled') {
        setExecutionSteps((prev) => {
          const executedStepsHashWithTransType = prev.map((step) => {
            return {
              transactionType: step.transactionType,
              txHash: step.txHash,
            }
          })
          const filteredExecutedStepsHashWithTransType = executedStepsHashWithTransType.filter(
            (step) => step.txHash && step.transactionType !== 'watch_order_filled',
          )
          const transactions = filteredExecutedStepsHashWithTransType.map(
            (step) => `${step.transactionType}:${step.txHash}`,
          )
          startWatching(swapRoute.intentId, transactions)
          return prev
        })
        updateExecutionStepByIndex(stepIndex, 'loading')
      }
    }
  }, [swapRoute, handleTransaction, stopTimer, startWatching, updateExecutionStepByIndex])

  const reset = useCallback(() => {
    setExecutionSteps([])
    setIsSuccess(false)
    setIsExecuting(false)
    resetWatchIntent()
  }, [resetWatchIntent])

  useEffect(() => {
    if (intentData?.intentStatus === 'success') {
      updateExecutionStepByIndex(executionSteps.length - 1, 'success')
      setIsSuccess(true)
    }
  }, [intentData, executionSteps.length, updateExecutionStepByIndex])

  return {
    intentData,
    isExecuting,
    isSuccess,
    executionSteps,
    startExecution,
    reset,
  }
}
