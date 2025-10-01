import { useMemo } from 'react'
import { useSettingStore } from '@/stores/setting-store'

export const useCheckSufficientBalance = () => {
  const { type } = useSettingStore()

  const isSufficientBalance = useMemo(() => {
    if (type === 'buy') {
      return true
    }

    return false
  }, [type])

  return isSufficientBalance
}
