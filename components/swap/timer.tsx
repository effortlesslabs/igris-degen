'use client'

import { Icon } from '@iconify/react'
import { useSwapTimer } from '@/providers/swap/provider'

interface TimerProps {
  className?: string
}

export default function Timer({ className }: TimerProps) {
  const { timeLeft } = useSwapTimer()
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 hover:opacity-70 transition-opacity cursor-pointer">
          <Icon icon="lucide:hourglass" className="size-3" />
          <span className="text-sm text-muted-foreground">Reload</span>
        </div>
        <div className="flex items-center gap-1 text-destructive font-medium">
          <span className="text-sm font-medium">{timeLeft}</span>
          <span className="text-xs">sec</span>
        </div>
      </div>
    </div>
  )
}
