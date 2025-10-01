'use client'

const PERCENTAGE_OPTIONS: (number | 'max')[] = [25, 50, 75, 'max']

interface HowMuchProps {
  handlePercentageSelect: (percentage: number | 'max') => void
}

export function HowMuch({ handlePercentageSelect }: HowMuchProps) {
  return (
    <div className="flex items-center gap-1.5 absolute  top-4 right-4 z-10">
      {PERCENTAGE_OPTIONS.map((percentage, index) => (
        <button
          key={percentage}
          type="button"
          onClick={() => handlePercentageSelect(percentage)}
          className="px-2 py-1 cursor-pointer text-xs font-medium rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-out min-w-[32px] h-7 flex items-center justify-center animate-in slide-in-from-right fade-in"
          style={{
            animationDelay: `${(PERCENTAGE_OPTIONS.length - 1 - index) * 150}ms`,
            animationFillMode: 'both',
          }}
        >
          {percentage === 'max' ? 'Max' : `${percentage}%`}
        </button>
      ))}
    </div>
  )
}
