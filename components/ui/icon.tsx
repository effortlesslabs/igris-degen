import { Icon } from '@iconify/react'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const hIconVariants = cva('inline-flex items-center justify-center rounded-[9px] p-1', {
  variants: {
    variant: {
      default: 'hover:bg-accent hover:text-accent-foreground',
      secondary: '',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent/50 hover:text-accent-foreground',
    },
  },
  defaultVariants: {
    variant: 'secondary',
  },
})

interface HIconProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hIconVariants> {
  icon: string
  iconClassName?: string
  color?: string
  backgroundOpacity?: number
}

export function HIcon({
  icon,
  iconClassName,
  className,
  variant,
  color,
  backgroundOpacity = 0.1,
  ...props
}: HIconProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 50)
    return () => clearTimeout(timer)
  }, [])

  const style =
    variant === 'secondary' && color
      ? {
          backgroundColor: `${color}${Math.round(backgroundOpacity * 255)
            .toString(16)
            .padStart(2, '0')}`,
          color: color,
        }
      : {}

  if (isLoading) {
    return (
      <div className={cn(hIconVariants({ variant, className }))} style={style} {...props}>
        <div className={cn('size-5 bg-muted-foreground/10 rounded-sm', iconClassName)} />
      </div>
    )
  }

  return (
    <div className={cn(hIconVariants({ variant, className }))} style={style} {...props}>
      <Icon icon={icon} className={cn('size-5', iconClassName)} />
    </div>
  )
}
