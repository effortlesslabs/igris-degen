import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Custom hook for managing a countdown timer
 *
 * @param options Configuration options for the timer
 * @param options.initialTime Initial time in seconds (default: 20)
 * @param options.onTimerEnd Callback function called when timer reaches 0
 * @param options.autoStart Whether to start the timer automatically (default: true)
 * @param options.resetTrigger Timer will restart when this value changes
 *
 * @returns Object with timer state and control functions
 */
interface UseTimerOptions {
  initialTime?: number
  onTimerEnd?: () => void
  autoStart?: boolean
  resetTrigger?: any // Reset timer when this value changes
}

export interface UseTimerReturn {
  timeLeft: number
  isRunning: boolean
  start: () => void
  stop: () => void
  reset: () => void
  restart: () => void
}

export function useTimer({
  initialTime = 20,
  onTimerEnd,
  autoStart = true,
  resetTrigger,
}: UseTimerOptions = {}): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(autoStart)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const onTimerEndRef = useRef(onTimerEnd)

  // Update ref when callback changes
  useEffect(() => {
    onTimerEndRef.current = onTimerEnd
  }, [onTimerEnd])

  // Start timer
  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  // Stop timer
  const stop = useCallback(() => {
    setIsRunning(false)
  }, [])

  // Reset timer to initial time
  const reset = useCallback(() => {
    setTimeLeft(initialTime)
    setIsRunning(false)
  }, [initialTime])

  // Restart timer (reset and start)
  const restart = useCallback(() => {
    setTimeLeft(initialTime)
    setIsRunning(true)
  }, [initialTime])

  // Reset timer when resetTrigger changes
  useEffect(() => {
    if (resetTrigger !== undefined) {
      restart()
    }
  }, [resetTrigger, restart])

  // Timer logic
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          // Call the callback function when timer ends
          if (onTimerEndRef.current) {
            onTimerEndRef.current()
          }
          // Reset to initial time to prevent infinite loops
          return initialTime
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, initialTime])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    timeLeft,
    isRunning,
    start,
    stop,
    reset,
    restart,
  }
}
