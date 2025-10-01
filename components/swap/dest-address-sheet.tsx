'use client'

import { Icon } from '@iconify/react'
import { useCallback, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { shortenAddress } from '@/lib/utils'
import { useSwapForm } from '@/providers/swap/provider'
import { Button } from '../ui/button'
import { HIcon } from '../ui/icon'
import { Input } from '../ui/input'

export default function DestAddressDialog() {
  const { toAddress, setValue } = useSwapForm()
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [address, setAddress] = useState(toAddress)

  const handleSubmit = useCallback(() => {
    setValue('toAddress', address)
    setIsOpen(false)
  }, [address, setValue])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="border-dashed border-2 flex flex-row justify-between items-center rounded-sm gap-2 px-2 py-1">
          <div className="flex gap-5 items-center">
            <p className="text-sm  font-medium">Recipient address</p>
            <p className="text-sm text-muted-foreground font-medium">{shortenAddress(toAddress)}</p>
          </div>
          <Button variant="outline" size="sm">
            <Icon icon="material-symbols:edit" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[430px] pb-5">
        <DialogTitle>Recipient Address</DialogTitle>
        <DialogDescription>Swap and send token to another address</DialogDescription>
        <div className="flex flex-col gap-5 py-5 space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <HIcon icon="lucide:wallet" variant="secondary" />
            </div>
            <Input
              placeholder="enter recipient address"
              className="pl-12 py-6 text-lg"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex items-center px-2 space-x-2">
            <input
              type="checkbox"
              id="confirm-address"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="sr-only"
            />
            <label htmlFor="confirm-address" className="flex items-start space-x-2 cursor-pointer">
              <Icon
                icon={isConfirmed ? 'material-symbols:check-box-rounded' : 'system-uicons:checkbox-empty'}
                className="size-6"
              />
              <div className="text-sm text-muted-foreground flex flex-col font-medium">
                this address is correct and not a exchange wallet.
                <span className="text-sm  mt-1 text-yellow-200 font-semibold">
                  token send to wrong address will be lost.
                </span>
              </div>
            </label>
          </div>
          <Button size="xl" className="w-full" onClick={handleSubmit} disabled={!isConfirmed || !address}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
