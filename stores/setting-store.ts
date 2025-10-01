import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingState {
  // Swap type
  type: 'buy' | 'sell' | 'intent'
  setType: (type: 'buy' | 'sell' | 'intent') => void

  // Route preference
  preference: 'cheapest' | 'fastest'
  setPreference: (preference: 'cheapest' | 'fastest') => void

  // Slippage settings
  slippage: number
  setSlippage: (slippage: number) => void

  // Reset function
  reset: () => void
}

const initialState = {
  type: 'sell' as const,
  preference: 'cheapest' as const,
  slippage: 50,
}

export const useSettingStore = create<SettingState>()(
  persist(
    (set) => ({
      ...initialState,

      setType: (type: 'buy' | 'sell' | 'intent') => {
        set({ type })
      },
      setPreference: (preference: 'cheapest' | 'fastest') => {
        set({ preference })
      },
      setSlippage: (slippage: number) => {
        set({ slippage })
      },

      reset: () => {
        set(initialState)
      },
    }),
    {
      name: 'setting-storage',
      version: 1,
      onRehydrateStorage: () => (state) => {
        // Ensure the state is valid after rehydration
        if (state) {
          if (!['buy', 'sell', 'intent'].includes(state.type)) {
            state.type = 'buy'
          }
          if (!['cheapest', 'fastest'].includes(state.preference)) {
            state.preference = 'cheapest'
          }
          if (typeof state.slippage !== 'number' || state.slippage <= 0) {
            state.slippage = 50
          }
        }
      },
    },
  ),
)
