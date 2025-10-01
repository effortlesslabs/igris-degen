export function OverlayLoader() {
  return (
    <>
      <div
        className="absolute -inset-1 rounded-full border-2 border-primary opacity-75"
        style={{ animation: 'wave 3s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
      />
      <div
        className="absolute -inset-1 rounded-full border-2 border-primary opacity-50"
        style={{ animation: 'wave 3s cubic-bezier(0.4, 0, 0.2, 1) infinite 1.5s' }}
      />
    </>
  )
}
