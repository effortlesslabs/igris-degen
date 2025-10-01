function SuggestionSkeleton({ index }: { index: number }) {
  return (
    <div
      className="relative animate-pulse"
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'both',
      }}
    >
      <div className="rounded-full flex items-center justify-center p-1 bg-primary/40">
        <div className="w-7 h-7 rounded-full bg-muted" />
      </div>
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <div
          className="rounded-full bg-background flex items-center justify-center shadow-sm ring-2 ring-border"
          style={{
            width: '16px',
            height: '16px',
          }}
        >
          <div className="w-3 h-3 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  )
}

export { SuggestionSkeleton }
