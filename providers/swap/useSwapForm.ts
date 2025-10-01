import { useCallback } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import type { PortfolioToken, Token } from '@/types/token'

export interface SwapFormData {
  isAmountInDollar: boolean
  toAddress: string
  sourceToken: PortfolioToken | null
  destinationToken: Token | null
  sourceAmount: string
  destinationAmount: string
}

const defaultValues: SwapFormData = {
  isAmountInDollar: false,
  toAddress: '',
  sourceToken: null,
  destinationToken: null,
  sourceAmount: '0',
  destinationAmount: '0',
}

export function useSwapForm({ fromAddress }: { fromAddress: string }) {
  const form = useForm<SwapFormData>({
    defaultValues,
    mode: 'onChange',
  })

  const { control, setValue } = form
  const isAmountInDollar = useWatch({ control, name: 'isAmountInDollar' })
  const toAddress = useWatch({ control, name: 'toAddress' })
  const sourceToken = useWatch({ control, name: 'sourceToken' })
  const destinationToken = useWatch({ control, name: 'destinationToken' })
  const sourceAmount = useWatch({ control, name: 'sourceAmount' })
  const destinationAmount = useWatch({ control, name: 'destinationAmount' })

  const reset = useCallback(() => {
    form.reset(defaultValues)
  }, [form])

  return {
    isAmountInDollar,
    sourceToken,
    destinationToken,
    sourceAmount,
    destinationAmount,
    toAddress: toAddress || fromAddress,
    setValue,
    reset,
  }
}
