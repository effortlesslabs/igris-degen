'use client'

import { Footer } from './footer'
import { Header } from './header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex h-screen flex-col relative">
      <Header />
      <main className="flex-1 pt-14 pb-20">{children}</main>
      <Footer />
    </div>
  )
}
