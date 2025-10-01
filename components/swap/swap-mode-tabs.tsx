'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'

const navItems = [
  { value: 'buy', label: 'Buy' },
  { value: 'sell', label: 'Sell' },
  { value: 'intent', label: 'Intent' },
] as const

interface SwapModeTabsProps {
  type: 'buy' | 'sell' | 'intent'
  setType: (type: 'buy' | 'sell' | 'intent') => void
}

export function SwapModeTabs({ type, setType }: SwapModeTabsProps) {
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={type}
      onValueChange={setType}
      className="flex gap-8"
      aria-label="Swap Tabs"
    >
      {navItems.map((item) => (
        <ToggleGroupPrimitive.Item
          key={item.value}
          value={item.value}
          className="inline-flex cursor-pointer min-w-10 text-lg items-center justify-center gap-2 rounded-md font-medium text-muted-foreground hover:bg-muted hover:text-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:font-semibold h-9 px-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors"
        >
          {item.label}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}
