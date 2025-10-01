import type { ElementType, ReactNode } from 'react'
import { TextShimmer } from './text-shimmer'

/**
 * Text component provides consistent text rendering with various styling options.
 *
 * - Supports different text sizes, weights, and colors
 * - Includes loading shimmer state
 * - Handles truncation and ellipsis
 * - Supports custom className for additional styling
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The text content to be rendered.
 * @param {string} [props.variant='body'] - The text variant (body, heading, caption, etc.).
 * @param {string} [props.size='md'] - The text size (xs, sm, md, lg, xl).
 * @param {string} [props.weight='normal'] - The font weight (light, normal, medium, semibold, bold).
 * @param {string} [props.color='inherit'] - The text color.
 * @param {boolean} [props.truncate=false] - Whether to truncate text with ellipsis.
 * @param {boolean} [props.loading=false] - Whether to show loading shimmer state.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {ElementType} [props.as] - The HTML element to render (span, p, h1, h2, etc.).
 *
 * @returns {JSX.Element} A text element with the specified styling and content.
 *
 * @example
 * ```tsx
 * <Text>Basic text content</Text>
 * <Text variant="heading" size="lg" weight="bold">Large Heading</Text>
 * <Text variant="caption" color="muted">Small caption text</Text>
 * <Text truncate>Very long text that will be truncated...</Text>
 * <Text loading>Loading text</Text>
 * <Text as="h1" variant="heading">Page Title</Text>
 * ```
 */
export function Text({
  children,
  variant = 'body',
  size = 'md',
  weight = 'normal',
  color = 'inherit',
  truncate = false,
  loading = false,
  className = '',
  as: Component = 'span',
}: {
  children: ReactNode
  variant?: 'body' | 'heading' | 'caption' | 'label' | 'code'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  color?: string
  truncate?: boolean
  loading?: boolean
  className?: string
  as?: ElementType
}) {
  // Base classes for the text component
  const baseClasses = 'font-sans'

  // Variant-specific classes
  const variantClasses = {
    body: 'leading-relaxed',
    heading: 'leading-tight tracking-tight',
    caption: 'leading-tight text-sm',
    label: 'leading-tight font-medium',
    code: 'font-mono bg-muted px-1.5 py-0.5 rounded text-sm',
  }

  // Size-specific classes
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  }

  // Weight-specific classes
  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }

  // Truncation classes
  const truncateClasses = truncate ? 'truncate' : ''

  // Combine all classes
  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    weightClasses[weight],
    truncateClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Show shimmer loading state
  if (loading) {
    return (
      <Component className={combinedClasses}>
        <TextShimmer>{String(children)}</TextShimmer>
      </Component>
    )
  }

  return (
    <Component className={combinedClasses} style={{ color: color !== 'inherit' ? color : undefined }}>
      {children}
    </Component>
  )
}
