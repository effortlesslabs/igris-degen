'use client'

import type { ExecutionStep } from '@/providers/swap/useStepsExecute'
import { StepItem } from './step-item'

export function TransactionStatus({ steps }: { steps: ExecutionStep[] }) {
  return (
    <div className="px-4 py-2 border-dashed border-2 rounded-xl  mt-5">
      {steps.map((step) => {
        return <StepItem key={Math.random()} step={step} />
      })}
    </div>
  )
}
