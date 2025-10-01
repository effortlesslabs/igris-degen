import { useRef } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import type { PortfolioData } from '@/services/portfolio'
import { PortfolioError } from './error'
import { PortfolioHead } from './head'
import { Tokens } from './tokens'

interface PortfolioProps {
  portfolio: PortfolioData
  error: Error | null
  isLoading: boolean
  isOpen: boolean
  onClose: () => void
}

function Container({ children, isOpen, onClose }: { children: React.ReactNode; isOpen: boolean; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useClickOutside(containerRef, () => onClose(), { enabled: isOpen })

  return (
    <div
      ref={containerRef}
      className={`fixed top-2 overflow-hidden right-2 h-[calc(100vh-1rem)] w-96 bg-background rounded-xl border border-border shadow-2xl transform transition-all duration-300 ease-in-out z-50 flex flex-col overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:transition-colors ${
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      {children}
    </div>
  )
}

export function Portfolio(props: PortfolioProps) {
  return (
    <Container isOpen={props.isOpen} onClose={props.onClose}>
      {props.error && <PortfolioError error={props.error} />}
      <PortfolioHead onClose={props.onClose} balance={props.portfolio.totalPortfolioValue} change={0} />
      <div className="flex-1">
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
          <p className="text-lg font-semibold px-6 py-4">Tokens</p>
        </div>
        <Tokens tokens={props.portfolio.tokens} />
      </div>
    </Container>
  )
}
