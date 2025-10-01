import { Icon } from '@iconify/react/dist/iconify.js'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { HumanizeNumber } from '@/components/ui/humanize-number'
import { getNetworkAsset } from '@/lib/constant'
import { cn } from '@/lib/utils'
import type { Token } from '@/types/token'

const lightningAnimation = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: { delay: 0.6, type: 'spring' as const },
}

const lightningCircleAnimation = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
  },
  transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const },
}

const lightningLineAnimation = {
  initial: { scaleX: 0, transformOrigin: 'left' },
  animate: { scaleX: 1, transformOrigin: 'left' },
  transition: { delay: 0.8, duration: 0.6 },
}

const lightningLineAnimationRight = {
  initial: { scaleX: 0, transformOrigin: 'left' },
  animate: { scaleX: 1, transformOrigin: 'left' },
  transition: { delay: 1.4, duration: 0.6 }, // Starts after left line finishes (0.8 + 0.6 = 1.4)
}

const timerTextAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 2.0, duration: 0.3 },
}

function LightningAnimation({ totalTime }: { totalTime: number }) {
  return (
    <div className="flex-1 flex items-center justify-center relative top-2">
      <motion.div {...lightningLineAnimation} className="w-full h-0.5 bg-gradient-to-r from-primary/10 to-primary/40" />
      <motion.div {...lightningAnimation} className="relative">
        <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ delay: 2.0, duration: 0.5 }}>
          <Icon icon="lucide:zap" className="w-8 h-8 text-primary bg-background z-10" />
        </motion.div>
        <motion.div {...lightningCircleAnimation} className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full" />
      </motion.div>
      <motion.div
        {...lightningLineAnimationRight}
        className="w-full h-0.5 bg-gradient-to-r from-primary/40 to-primary/10"
      />
      <motion.div
        {...timerTextAnimation}
        className="absolute bottom-[-2rem] text-xs text-muted-foreground font-semibold"
      >
        {totalTime} sec
      </motion.div>
    </div>
  )
}

function TokenAsset({ token, amount, isIn }: { token: Token; amount: string; isIn: boolean }) {
  const networkAsset = getNetworkAsset(token.network)
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="relative">
        <div className="rounded-full flex items-center justify-center p-1 backdrop-blur-sm transition-colors duration-300 ease-in-out">
          <Image src={token.logoURI} alt={token.symbol} width={24} height={24} className="w-10 h-10 rounded-full" />
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <div className="rounded-full bg-background flex items-center justify-center shadow-sm ring-2 ring-border">
            <Image src={networkAsset.logoURI} alt={networkAsset.name} width={16} height={16} className="rounded-full" />
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.75 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
          className="absolute -inset-1 rounded-full border-2 border-primary/40"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.5 }}
          transition={{ duration: 3, delay: 1.5, ease: 'easeInOut' }}
          className="absolute -inset-1 rounded-full border-2 border-primary/40`"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-base font-thin">{token.symbol}</p>
        <p className={cn('text-base font-medium', isIn ? '' : 'text-green-500')}>
          {isIn ? '-' : '+'}
          <HumanizeNumber number={amount} prefix="" decimalPlaces={6} />
        </p>
      </div>
    </div>
  )
}

export interface SwapAssetsProps {
  tokenIn: Token
  tokenOut: Token
  amountIn: string
  amountOut: string
  totalTime: number
}

export function SwapAssets({ tokenIn, tokenOut, amountIn, amountOut, totalTime }: SwapAssetsProps) {
  return (
    <div className="flex items-start justify-between w-full gap-0">
      <TokenAsset token={tokenIn} amount={amountIn} isIn={true} />
      <LightningAnimation totalTime={totalTime} />
      <TokenAsset token={tokenOut} amount={amountOut} isIn={false} />
    </div>
  )
}
