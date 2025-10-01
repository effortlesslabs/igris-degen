'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { useSettingStore } from '@/stores/setting-store'

const preferenceItems = [
  {
    value: 'cheapest',
    label: 'Cheapest',
    color:
      'bg-green-500/5 text-green-400 hover:bg-green-500/15 hover:text-green-500 data-[state=on]:bg-green-500/20 data-[state=on]:text-green-600',
  },
  {
    value: 'fastest',
    label: 'Fastest',
    color:
      'bg-blue-500/5 text-blue-400 hover:bg-blue-500/15 hover:text-blue-500 data-[state=on]:bg-blue-500/20 data-[state=on]:text-blue-600',
  },
] as const

export function PreferenceTabs() {
  const { preference, setPreference } = useSettingStore()

  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={preference || ''}
      onValueChange={(value) => {
        if (value) {
          setPreference(value as 'cheapest' | 'fastest')
        } else {
          setPreference('cheapest')
        }
      }}
      className="flex gap-2"
      aria-label="Swap Preference"
    >
      {preferenceItems.map((item) => (
        <ToggleGroupPrimitive.Item
          key={item.value}
          value={item.value}
          className={`inline-flex cursor-pointer min-w-16 text-xs items-center justify-center gap-1 rounded-sm font-semibold h-6 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors ${item.color}`}
        >
          {item.label}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}
