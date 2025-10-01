import { Icon } from '@iconify/react/dist/iconify.js'

type StepStatus = 'idle' | 'loading' | 'success' | 'error'

export function StatusIcon({ status }: { status: StepStatus }) {
  return (
    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-background rounded-full p-1">
      {status === 'success' && <Icon icon="lucide:check-circle" className="size-5 text-green-500" />}
      {status === 'error' && <Icon icon="lucide:alert-circle" className="size-5 text-red-500" />}
      {status === 'loading' && <Icon icon="lucide:clock" className="size-4 text-foreground" />}
    </div>
  )
}
