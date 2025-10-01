'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const BUTTON_STYLES = {
  base: 'w-full max-w-lg max-w-xs mx-auto',
  fullWidth: 'w-full font-bold',
} as const

export const SuccessDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(BUTTON_STYLES.base, '')} variant="secondary" size="xl">
          hfiewfihw
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[430px] pb-5" onInteractOutside={(e) => e.preventDefault()}>
        <DialogTitle className="text-muted-foreground">your are buying</DialogTitle>
        <DialogDescription className="text-sm font-thin">USDC on base using USDC on optimism</DialogDescription>
        <div className="flex flex-col gap-2 py-3">
          <div className={cn('flex flex-col gap-2')}>
            <p className="text-muted-foreground font-semibold">with</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5"></div>
      </DialogContent>
    </Dialog>
  )
}
