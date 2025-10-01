'use client'

import { Icon } from '@iconify/react'
import Image from 'next/image'
import { Text } from '@/components/ui/text'
import { getExplorerTxUrl, getNetworkIcon } from '@/lib/constant'
import { shortenAddress } from '@/lib/utils'
import type { ExecutionStep } from '@/providers/swap/useStepsExecute'
import { OverlayLoader } from './loader'
import { StatusIcon } from './status-icon'

export function StepItem({ step }: { step: ExecutionStep }) {
  const status = step.status

  const action = step.action || 'Step 1'
  const description = step.description || 'Processing...'
  const isLast = step.transactionType === 'watch_order_filled'
  const txHash = step.txHash
  const network = step.network
  const networkIcon = network ? getNetworkIcon(network) : '/networks/eth.svg'

  return (
    <div className="flex flex-col">
      <div className={`flex items-center space-x-3 py-2 gap-0 ${status === 'idle' ? 'opacity-60' : ''}`}>
        <div className="relative w-8 h-8 flex-shrink-0">
          <Image src={networkIcon} alt="Network" width={32} height={32} className="rounded-full" />
          {status === 'loading' && <OverlayLoader />}
          {status !== 'idle' && <StatusIcon status={status} />}
        </div>

        <div className="flex flex-col items-start justify-between lowercase">
          <Text weight="medium" loading={status === 'loading'}>
            {action}
          </Text>
          {txHash ? (
            <div className="flex items-center gap-1">
              <Text size="xs" weight="light" color="foreground" loading={status === 'loading'}>
                txhash:
              </Text>
              <a
                href={getExplorerTxUrl(network, txHash)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:text-primary/80 transition-colors duration-200 group flex items-center gap-1"
              >
                {shortenAddress(txHash)}
                <Icon icon="lucide:external-link" className="w-3 h-3 transition-opacity duration-200" />
              </a>
            </div>
          ) : (
            <Text size="xs" weight="light" color="foreground">
              {description}
            </Text>
          )}
        </div>
      </div>

      {!isLast && <div className="ml-4 mt-2 w-0.5 h-4 bg-foreground/10 mx-auto" />}
    </div>
  )
}
