import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import type { Transaction } from '@/types/route'
import type { Token } from '@/types/token'
import { SwapAssets } from './swap-assets'
import { TransDetails } from './trans-details'

interface SuccessProps {
  tokenIn: Token
  tokenOut: Token
  amountIn: string
  amountOut: string
  transactions: Transaction[]
  handleCompleteSwap: () => void
}

// Animation variants for staggered entrance
const containerAnimation = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: {
    duration: 0.5,
    type: 'spring' as const,
    stiffness: 100,
    damping: 20,
  },
}

const buttonAnimation = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: {
    delay: 2.8, // After TransDetails animation
    duration: 0.4,
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
  },
}

export function Success(props: SuccessProps) {
  const { tokenIn, tokenOut, amountIn, amountOut, transactions, handleCompleteSwap } = useMemo(() => {
    return props
  }, [props])

  const totalTime = useMemo(() => {
    const lastTx = transactions[transactions.length - 1]
    return lastTx?.time ?? 0
  }, [transactions])

  return (
    <motion.div {...containerAnimation} className="flex flex-col items-center justify-center pt-10 w-full gap-5">
      <SwapAssets
        totalTime={totalTime}
        tokenIn={tokenIn}
        tokenOut={tokenOut}
        amountIn={amountIn}
        amountOut={amountOut}
      />

      <TransDetails
        tokenInNetwork={tokenIn.network}
        tokenOutNetwork={tokenOut.network}
        inTxHashes={transactions.map((tx) => tx.inTxHashes)}
        outTxHashes={transactions.map((tx) => tx.outTxHashes)}
      />

      <motion.div {...buttonAnimation} className="w-full">
        <Button size="xl" className="w-full font-bold cursor-pointer" onClick={handleCompleteSwap}>
          Done
        </Button>
      </motion.div>
    </motion.div>
  )
}
