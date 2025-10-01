'use client'

import { useCallback } from 'react'

interface ErrorReport {
  error: Error
  errorInfo?: React.ErrorInfo
  componentStack?: string | null
  timestamp: Date
  userAgent?: string | null
  url?: string | null
}

export const useErrorReporting = () => {
  const reportError = useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    const errorReport: ErrorReport = {
      error,
      errorInfo,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
      url: typeof window !== 'undefined' ? window.location.href : null,
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      // biome-ignore lint/suspicious/noConsole: Error logging is intentional
      console.group('🚨 Error Report')
      // biome-ignore lint/suspicious/noConsole: Error logging is intentional
      console.error('Error:', error)
      // biome-ignore lint/suspicious/noConsole: Error logging is intentional
      console.error('Error Info:', errorInfo)
      // biome-ignore lint/suspicious/noConsole: Error logging is intentional
      console.error('Component Stack:', errorInfo?.componentStack)
      // biome-ignore lint/suspicious/noConsole: Error logging is intentional
      console.error('Timestamp:', errorReport.timestamp)
      // biome-ignore lint/suspicious/noConsole: Error logging is intentional
      console.error('URL:', errorReport.url)
      // biome-ignore lint/suspicious/noConsole: Error logging is intentional
      console.groupEnd()
    }

    // In production, you could send this to an error reporting service
    // like Sentry, LogRocket, or your own API
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to external service
      // sendToErrorService(errorReport)

      // For now, just log to console with production flag
      // biome-ignore lint/suspicious/noConsole: Error logging is intentional
      console.error('Production Error:', errorReport)
    }

    // You could also store errors in localStorage for debugging
    try {
      const existingErrors = JSON.parse(localStorage.getItem('app-errors') || '[]')
      const newErrors = [...existingErrors, errorReport].slice(-10) // Keep last 10 errors
      localStorage.setItem('app-errors', JSON.stringify(newErrors))
    } catch (_e) {
      // Silently fail if localStorage is not available
    }
  }, [])

  const getStoredErrors = useCallback(() => {
    try {
      const stored = localStorage.getItem('app-errors')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }, [])

  const clearStoredErrors = useCallback(() => {
    try {
      localStorage.removeItem('app-errors')
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [])

  return {
    reportError,
    getStoredErrors,
    clearStoredErrors,
  }
}
