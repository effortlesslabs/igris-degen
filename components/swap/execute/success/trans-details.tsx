import { Icon } from '@iconify/react/dist/iconify.js'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { getExplorerTxUrl } from '@/lib/constant'
import { shortenAddress } from '@/lib/utils'
import type { Network } from '@/types/token'

interface TransDetailsProps {
  tokenInNetwork: Network
  tokenOutNetwork: Network
  inTxHashes: string[][]
  outTxHashes: string[][]
}

const transDetailsAnimation = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: {
    delay: 2.5,
    duration: 0.4,
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
  },
}

export function TransDetails({ tokenInNetwork, inTxHashes, outTxHashes, tokenOutNetwork }: TransDetailsProps) {
  const flatInTxHashes = useMemo(() => inTxHashes.flat(), [inTxHashes])
  const flatOutTxHashes = useMemo(() => outTxHashes.flat(), [outTxHashes])
  return (
    <motion.div
      {...transDetailsAnimation}
      className="p-4 flex flex-col gap-2 border-dashed border-2 rounded-xl  mt-5 w-full"
    >
      {flatInTxHashes && flatInTxHashes.length > 0 && (
        <div className="flex items-start justify-between">
          <p className="text-sm text-muted-foreground">Source Txhash</p>

          <div className="flex flex-col items-center gap-1 text-sm">
            {flatInTxHashes.map((txHash, index) => (
              <motion.a
                key={txHash}
                href={getExplorerTxUrl(tokenInNetwork, txHash)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors duration-200 group flex items-center gap-1"
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 2.5 + index * 0.1, // Staggered entrance after main animation
                  duration: 0.3,
                  type: 'spring' as const,
                  stiffness: 200,
                }}
              >
                {shortenAddress(txHash)}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 2.5 + index * 0.1 + 0.1,
                    duration: 0.2,
                  }}
                >
                  <Icon icon="lucide:external-link" className="w-3 h-3 transition-opacity duration-200" />
                </motion.div>
              </motion.a>
            ))}
          </div>
        </div>
      )}
      {flatOutTxHashes && flatOutTxHashes.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Destination Txhash</p>
          <div className="flex flex-col items-center gap-1 text-sm">
            {flatOutTxHashes.map((txHash, index) => (
              <motion.a
                key={txHash}
                href={getExplorerTxUrl(tokenOutNetwork, txHash)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors duration-200 group flex items-center gap-1"
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 2.5 + index * 0.1 + 0.2, // Slightly delayed from source hashes
                  duration: 0.3,
                  type: 'spring' as const,
                  stiffness: 200,
                }}
              >
                {shortenAddress(txHash)}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 2.5 + index * 0.1 + 0.3,
                    duration: 0.2,
                  }}
                >
                  <Icon icon="lucide:external-link" className="w-3 h-3 transition-opacity duration-200" />
                </motion.div>
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
