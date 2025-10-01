'use client'

import type * as React from 'react'
import { forwardRef, memo, useCallback, useId } from 'react'
import { cn } from '@/lib/utils'

interface NumberInputProps extends Omit<React.ComponentProps<'input'>, 'type'> {
  prefix?: string
  className?: string
  error?: boolean
  variant?: 'sm' | 'md' | 'lg' | 'xl'
  'aria-label'?: string
  'aria-describedby'?: string
  textAlign?: 'left' | 'center' | 'right'
}

const NumberInput = memo(
  forwardRef<HTMLInputElement, NumberInputProps>(
    (
      {
        prefix = '$',
        className,
        error = false,
        variant = 'md',
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedby,
        onKeyDown,
        onChange,
        onPaste,
        value,
        textAlign = 'center',
        ...props
      },
      ref,
    ) => {
      const generatedId = useId()
      const inputId = props.id || `number-input-${generatedId}`
      const errorId = error ? `${inputId}-error` : undefined

      // Handle the display value with prefix
      const displayValue = value ? `${prefix}${value}` : prefix
      const hasValue = value && value !== '0'

      // Size variants
      const sizeVariants = {
        sm: 'text-2xl',
        md: 'text-4xl',
        lg: 'text-5xl',
        xl: 'text-6xl',
      }

      const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'e' || e.key === 'E') {
            e.preventDefault()
          }
          onKeyDown?.(e)
        },
        [onKeyDown],
      )

      const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          let value = e.target.value

          // Remove prefix if it exists at the start
          if (value.startsWith(prefix)) {
            value = value.substring(prefix.length)
          }

          // Only allow numbers and decimal point
          value = value.replace(/[^0-9.]/g, '')

          // Prevent multiple decimal points
          const parts = value.split('.')
          if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('')
          }

          // Create a new event with the cleaned value
          const newEvent = {
            ...e,
            target: {
              ...e.target,
              value: value,
            },
          }

          onChange?.(newEvent as React.ChangeEvent<HTMLInputElement>)
        },
        [onChange, prefix],
      )

      const handlePaste = useCallback(
        (e: React.ClipboardEvent<HTMLInputElement>) => {
          const pastedText = e.clipboardData.getData('text')
          if (pastedText.includes('e') || pastedText.includes('E')) {
            e.preventDefault()
            const cleanText = pastedText.replace(/[eE]/g, '')
            e.currentTarget.value = cleanText
          }
          onPaste?.(e)
        },
        [onPaste],
      )

      return (
        <div
          className={cn(
            'w-full font-medium flex items-center text-foreground/60',
            textAlign === 'left' && 'text-left justify-start',
            textAlign === 'right' && 'text-right justify-end',
            textAlign === 'center' && 'text-center justify-center',
            sizeVariants[variant],
            error && 'text-destructive/60',
          )}
        >
          <input
            ref={ref}
            id={inputId}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="0"
            aria-label={ariaLabel || (props.placeholder ? `Number input: ${props.placeholder}` : 'Number input')}
            aria-describedby={ariaDescribedby || (error ? errorId : undefined)}
            aria-invalid={error}
            value={displayValue}
            className={cn(
              'outline-none focus:outline-none focus:ring-0 focus:border-transparent bg-transparent',
              'appearance-none cursor-text min-w-40',
              !hasValue && 'text-muted-foreground',
              hasValue && 'text-foreground',
              error && 'text-destructive',
              className,
              textAlign === 'left' && 'text-left',
              textAlign === 'right' && 'text-right',
              textAlign === 'center' && 'text-center',
            )}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onPaste={handlePaste}
            {...props}
          />
        </div>
      )
    },
  ),
)

NumberInput.displayName = 'NumberInput'

export { NumberInput }
