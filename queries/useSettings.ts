import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'

// Types
export interface Settings {
  type: 'buy' | 'sell' | 'intent'
  preference: 'cheapest' | 'fastest'
  slippage: number
}

const QUERY_KEY = ['settings']

// Default values
const defaultSettings: Settings = {
  type: 'buy',
  preference: 'cheapest',
  slippage: 50,
}

export function useSettings() {
  const queryClient = useQueryClient()

  // Query for settings - persistQueryClient will handle persistence
  const { data: settings = defaultSettings, isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => {
      // Return default settings - persistQueryClient will handle the rest
      return defaultSettings
    },
    staleTime: Infinity, // Settings don't become stale
    gcTime: Infinity, // Never garbage collect
    initialData: defaultSettings,
  })

  // Mutation for updating settings
  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings: Partial<Settings>) => {
      const updatedSettings = { ...settings, ...newSettings }
      return updatedSettings
    },
    onSuccess: (updatedSettings) => {
      // Update the query cache - persistQueryClient will automatically persist this
      queryClient.setQueryData(QUERY_KEY, updatedSettings)
    },
  })

  // Individual setters
  const setType = React.useCallback(
    (type: 'buy' | 'sell' | 'intent') => {
      updateSettingsMutation.mutate({ type })
    },
    [updateSettingsMutation],
  )

  const setPreference = React.useCallback(
    (preference: 'cheapest' | 'fastest') => {
      updateSettingsMutation.mutate({ preference })
    },
    [updateSettingsMutation],
  )

  const setSlippage = React.useCallback(
    (slippage: number) => {
      updateSettingsMutation.mutate({ slippage })
    },
    [updateSettingsMutation],
  )

  const reset = React.useCallback(() => {
    updateSettingsMutation.mutate(defaultSettings)
  }, [updateSettingsMutation])

  return {
    // Data
    settings,
    isLoading,

    // Individual values
    type: settings.type,
    preference: settings.preference,
    slippage: settings.slippage,

    // Setters
    setType,
    setPreference,
    setSlippage,
    reset,

    // Mutation state
    isUpdating: updateSettingsMutation.isPending,
    error: updateSettingsMutation.error,
  }
}

// Specialized hooks for specific settings
export function useSwapType() {
  const { type, setType, isLoading } = useSettings()
  return { type, setType, isLoading }
}

export function useRoutePreference() {
  const { preference, setPreference, isLoading } = useSettings()
  return { preference, setPreference, isLoading }
}

export function useSlippage() {
  const { slippage, setSlippage, isLoading } = useSettings()
  return { slippage, setSlippage, isLoading }
}

// Hook for syncing settings across tabs/windows
export function useSettingsSync() {
  const queryClient = useQueryClient()

  React.useEffect(() => {
    // Since you're using persistQueryClient, this might not be necessary
    // but keeping it in case you want additional cross-tab sync logic
    const handleFocus = () => {
      // Refetch settings when tab becomes focused
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [queryClient])

  return null
}
