'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useSwapContext, useSwapExecute } from '@/providers/swap/provider'
import type { Token } from '@/types/token'
import { computeBuyButtonState, computeSellButtonState } from './button-state'
import Destination from './destination'
import Details from './details'
import Source from './source'
import { TransactionStatus } from './status'
import { Success } from './success'

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

export const Execute = () => {
  const { isSuccess, intentData, executionSteps, startExecution, reset } = useSwapExecute()
  const { swapForm, swapRoute, handleCompleteSwap } = useSwapContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const buttonState = computeSellButtonState()

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    if (open) {
      startExecution()
    } else {
      swapRoute.refetchSwapRoute()
      reset()
    }
  }

  if (buttonState) {
    return (
      <Button className={buttonState.buttonStyle} variant="secondary" size="xl" disabled>
        {buttonState.buttonText}
      </Button>
    )
  }

  if (!swapRoute.swapRoute) {
    return (
      <Button className={BUTTON_STYLES.base} variant="secondary" size="xl" disabled>
        {BUTTON_TEXTS.noQuote}
      </Button>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn(BUTTON_STYLES.base, 'font-semibold')} size="xl" disabled={swapRoute.isSwapRouteLoading}>
          Start Execution
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[430px] pb-5" onInteractOutside={(e) => e.preventDefault()}>
        <DialogTitle className="text-muted-foreground">
          {isSuccess ? <span>Transaction Details</span> : <span>your are selling</span>}
        </DialogTitle>
        {!isSuccess && (
          <DialogDescription className="text-xs font-thin">
            <span className="text-[#e0cd38]">Review details before confirming. This action cannot be undone.</span>
          </DialogDescription>
        )}
        {!isSuccess && (
          <>
            <div className="flex flex-col gap-2 py-3">
              <div className={cn('flex flex-col gap-2')}>
                {swapForm.destinationToken && (
                  <Destination destinationToken={swapForm.destinationToken} swapRoute={swapRoute.swapRoute} />
                )}
                <p className="text-muted-foreground font-semibold">for</p>
                {swapForm.sourceToken && <Source sourceToken={swapForm.sourceToken} swapRoute={swapRoute.swapRoute} />}
              </div>
            </div>

            {swapRoute.swapRoute && <Details swapRoute={swapRoute.swapRoute} />}
            <TransactionStatus steps={executionSteps} />
          </>
        )}
        {isSuccess && (
          <Success
            tokenIn={swapForm.sourceToken as Token}
            tokenOut={swapForm.destinationToken as Token}
            amountIn={swapRoute.swapRoute.tokenIn.rawAmountFormatted}
            amountOut={swapRoute.swapRoute.tokenOut.rawAmountFormatted}
            transactions={intentData?.transactions || []}
            handleCompleteSwap={() => {
              handleCompleteSwap()
              setIsDialogOpen(false)
              reset()
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
