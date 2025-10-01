'use client'

import { useState } from 'react'
import { HIcon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import type { Network } from '@/services/common'
import NetworkFilter from './network-filter'

interface SearchProps {
  onSearchChange: (value: string) => void
  onNetworkFilterChange: (networks: Network | null) => void
  selectedNetwork: Network | null
}

export default function Search({ onSearchChange, onNetworkFilterChange, selectedNetwork }: SearchProps) {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    onSearchChange(value)
  }

  return (
    <div className="relative">
      {/* Search Input with Icon and Filter */}
      <div className="relative">
        <HIcon
          icon="lucide:search"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          iconClassName="size-4"
        />
        <Input
          placeholder="Search for a token"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-12 h-11 text-base"
        />

        {/* Network Filter Component */}
        <NetworkFilter onNetworkFilterChange={onNetworkFilterChange} selectedNetwork={selectedNetwork} />
      </div>
    </div>
  )
}
