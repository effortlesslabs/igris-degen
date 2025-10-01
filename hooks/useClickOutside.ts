import { type RefObject, useEffect } from 'react'

interface UseClickOutsideOptions {
  enabled?: boolean
  eventType?: 'mousedown' | 'click' | 'touchstart'
}

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  options: UseClickOutsideOptions = {},
) {
  const { enabled = true, eventType = 'mousedown' } = options

  useEffect(() => {
    if (!enabled) return

    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener(eventType, listener)

    return () => {
      document.removeEventListener(eventType, listener)
    }
  }, [ref, handler, enabled, eventType])
}
