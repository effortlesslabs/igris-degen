import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        count: 'bg-muted text-muted-foreground font-semibold',
        network: 'bg-background text-muted-foreground font-medium shadow-sm ring-1 ring-border',
      },
      size: {
        default: 'h-6 px-2 text-xs',
        sm: 'h-5 px-1.5 text-xs',
        lg: 'h-7 px-3 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  count?: number
  max?: number
}

export function Badge({ className, variant, size, count, max = 3, children, ...props }: BadgeProps) {
  const displayText = count && count > max ? `${max}+` : children

  return (
    <div className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {displayText}
    </div>
  )
}

// Specialized count badge component
export function CountBadge({
  count,
  max = 3,
  className,
  ...props
}: {
  count: number
  max?: number
  className?: string
}) {
  return (
    <Badge variant="count" size="sm" className={cn('min-w-[1.5rem]', className)} count={count} max={max} {...props}>
      {count > max ? `${max}+` : count.toString()}
    </Badge>
  )
}

// Network count badge specifically for token networks
export function NetworkCountBadge({
  count,
  max = 3,
  className,
  ...props
}: {
  count: number
  max?: number
  className?: string
}) {
  return (
    <Badge
      variant="network"
      size="sm"
      className={cn('min-w-[1.5rem] h-4 w-4', className)}
      count={count}
      max={max}
      {...props}
    >
      {count > max ? `${max}+` : count.toString()}
    </Badge>
  )
}
