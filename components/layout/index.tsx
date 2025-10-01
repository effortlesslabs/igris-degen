'use client'

import { Header } from './header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex h-screen flex-col">
      <Header />
      <main className="flex-1 pt-14">{children}</main>
    </div>
  )
}
