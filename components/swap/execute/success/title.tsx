import { Icon } from '@iconify/react/dist/iconify.js'
import { motion } from 'framer-motion'

const titleAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.2 },
}

const timeAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.9 },
}

export function SuccessTitle({ executionTime }: { executionTime: number }) {
  return (
    <div>
      <motion.h2 {...titleAnimation} className="text-xl font-semibold text-foreground mb-2">
        Swap Successful!
      </motion.h2>
      <motion.div {...timeAnimation} className="mb-4">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Icon icon="lucide:clock" className="w-4 h-4" />
          <span>
            Execution time: <span className="font-semibold text-foreground">{executionTime}s</span>
          </span>
        </div>
      </motion.div>
    </div>
  )
}
