'use client'

import type React from 'react'
import { HIcon } from '@/components/ui/icon'

interface SwapErrorFallbackProps {
  error?: Error
  resetError: () => void
}

function SwapErrorFallback({ error, resetError }: SwapErrorFallbackProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-card border border-border rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <HIcon icon="lucide:alert-triangle" className="text-destructive" iconClassName="size-10" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Swap Error</h3>
      <p className="text-sm text-muted-foreground mb-4">
        There was an issue with the swap functionality. Please try again or refresh the page.
      </p>
      <div className="space-y-2">
        <button
          type="button"
          onClick={resetError}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition-colors"
        >
          Try Again
        </button>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md font-medium transition-colors"
        >
          Refresh Page
        </button>
      </div>
      {process.env.NODE_ENV === 'development' && error && (
        <details className="mt-4 text-left">
          <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
            Error Details (Development)
          </summary>
          <div className="mt-2 p-3 bg-muted rounded text-xs font-mono text-muted-foreground overflow-auto max-h-24">
            <div className="mb-2">
              <strong>Error:</strong> {error.message}
            </div>
          </div>
        </details>
      )}
    </div>
  )
}

interface SwapErrorBoundaryProps {
  children: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export function SwapErrorBoundary({ children, onError }: SwapErrorBoundaryProps) {
  return (
    <ErrorBoundary fallback={SwapErrorFallback} onError={onError}>
      {children}
    </ErrorBoundary>
  )
}

// Import the base ErrorBoundary
import { ErrorBoundary } from '@/components/ui/error-boundary'
