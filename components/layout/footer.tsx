'use client'

import { HIcon } from '@/components/ui/icon'
import { Button } from '../ui/button'

export function Footer() {
  return (
    <footer className="sticky flex justify-center items-center bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="container flex items-center justify-center px-6 py-4 relative">
        {/* Left side - Icons */}
        <div className="absolute left-6 flex items-center space-x-4">
          <a
            href="https://igris.bot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <HIcon icon="mdi:web" iconClassName="size-5" className="text-foreground hover:text-primary" />
          </a>
        </div>

        <Button
          size="sm"
          className="bg-primary/40 hover:bg-primary/60"
          onClick={() => {
            window.open('https://screen.studio/share/qXT84mzW', '_blank')
          }}
        >
          <HIcon icon="mdi:play-circle" iconClassName="size-5" />
          Watch Demo
        </Button>

        {/* Right side - Text */}
        <div className="absolute right-6 text-base font-medium text-muted-foreground">
          try chat based{' '}
          <a
            href="https://beta.igris.bot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            igris.bot
          </a>
        </div>
      </div>
    </footer>
  )
}
