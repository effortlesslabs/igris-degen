/**
 * Deterministic Portfolio Icon Generator
 *
 * This component generates unique SVG icons based on crypto addresses.
 * The same address will always produce the same icon without storing any data.
 *
 * Usage:
 * <PortfolioIcon address="0x1234..." />
 * <PortfolioIcon address="0x1234..." size={64} />
 * <PortfolioIcon /> // Uses default address
 */

interface PortfolioIconProps {
  className?: string
  size?: number
  address?: string
}

// Simple hash function to convert string to number
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

// Generate colors from address
function generateColors(address: string) {
  const hash = hashString(address)

  // Generate primary color (hue, saturation, lightness)
  const hue1 = hash % 360
  const sat1 = 60 + (hash % 20) // 60-80%
  const light1 = 45 + (hash % 15) // 45-60%

  // Generate secondary color
  const hue2 = (hue1 + 180) % 360 // Complementary
  const sat2 = 40 + (hash % 30) // 40-70%
  const light2 = 20 + (hash % 20) // 20-40%

  // Generate accent color
  const hue3 = (hue1 + 120) % 360 // Triadic
  const sat3 = 70 + (hash % 20) // 70-90%
  const light3 = 50 + (hash % 20) // 50-70%

  return {
    primary: `hsl(${hue1}, ${sat1}%, ${light1}%)`,
    secondary: `hsl(${hue2}, ${sat2}%, ${light2}%)`,
    accent: `hsl(${hue3}, ${sat3}%, ${light3}%)`,
    background: `hsl(${hue1}, ${sat1}%, ${light1}%, 0.1)`,
  }
}

// Generate shape parameters from address
function generateShapeParams(address: string) {
  const hash = hashString(address)

  // Determine shape type (0-3: circle, square, star, polygon)
  const shapeType = hash % 4

  // Generate rotation
  const rotation = hash % 360

  // Generate scale factors
  const scaleX = 0.6 + (hash % 40) / 100 // 0.6-1.0
  const scaleY = 0.6 + ((hash >> 8) % 40) / 100 // 0.6-1.0

  // Generate position offset
  const offsetX = (hash % 8) - 4 // -4 to 4
  const offsetY = ((hash >> 4) % 8) - 4 // -4 to 4

  return {
    shapeType,
    rotation,
    scaleX,
    scaleY,
    offsetX,
    offsetY,
  }
}

// Generate SVG path based on shape type and parameters
function generatePath(shapeType: number, params: any): string {
  const { scaleX, scaleY, offsetX, offsetY } = params

  switch (shapeType) {
    case 0: // Circle
      return `M${24 + offsetX} ${12 + offsetY} A${12 * scaleX} ${12 * scaleY} 0 1 1 ${24 + offsetX} ${36 + offsetY} A${12 * scaleX} ${12 * scaleY} 0 1 1 ${24 + offsetX} ${12 + offsetY} Z`

    case 1: {
      // Square
      const size = 12 * Math.min(scaleX, scaleY)
      return `M${24 - size + offsetX} ${24 - size + offsetY} L${24 + size + offsetX} ${24 - size + offsetY} L${24 + size + offsetX} ${24 + size + offsetY} L${24 - size + offsetX} ${24 + size + offsetY} Z`
    }

    case 2: {
      // Star
      const points = 5
      const outerRadius = 12 * scaleX
      const innerRadius = 6 * scaleY
      let path = ''
      for (let i = 0; i < points * 2; i++) {
        const angle = (i * Math.PI) / points
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const x = 24 + offsetX + radius * Math.cos(angle)
        const y = 24 + offsetY + radius * Math.sin(angle)
        path += i === 0 ? `M${x} ${y}` : ` L${x} ${y}`
      }
      return path + ' Z'
    }

    case 3: {
      // Polygon (hexagon)
      const sides = 6
      const radius = 12 * Math.min(scaleX, scaleY)
      let hexPath = ''
      for (let i = 0; i < sides; i++) {
        const angle = (i * Math.PI * 2) / sides
        const x = 24 + offsetX + radius * Math.cos(angle)
        const y = 24 + offsetY + radius * Math.sin(angle)
        hexPath += i === 0 ? `M${x} ${y}` : ` L${x} ${y}`
      }
      return hexPath + ' Z'
    }

    default:
      return `M${24 + offsetX} ${12 + offsetY} A${12 * scaleX} ${12 * scaleY} 0 1 1 ${24 + offsetX} ${36 + offsetY} A${12 * scaleX} ${12 * scaleY} 0 1 1 ${24 + offsetX} ${12 + offsetY} Z`
  }
}

export function PortfolioIcon({ className = '', size = 48, address = '' }: PortfolioIconProps) {
  // Use a consistent default address if none provided
  const defaultAddress = '0x0000000000000000000000000000000000000000'
  const targetAddress = address || defaultAddress

  const colors = generateColors(targetAddress)
  const shapeParams = generateShapeParams(targetAddress)
  const path = generatePath(shapeParams.shapeType, shapeParams)

  // Create a consistent title that doesn't change between renders
  const titleText = `Portfolio Icon - ${targetAddress.slice(0, 8)}...`

  return (
    <svg height={size} width={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
      <title>{titleText}</title>
      <g style={{ transformOrigin: 'center center' }}>
        {/* Background circle */}
        <circle cx="24" cy="24" fill={colors.background} r="24"></circle>

        {/* Main shape */}
        <g transform={`translate(24, 24) rotate(${shapeParams.rotation}) translate(-24, -24)`}>
          <path d={path} fill={colors.primary} fillRule="evenodd" />
        </g>

        {/* Secondary decorative elements */}
        <g opacity="0.6">
          <circle cx={12 + shapeParams.offsetX} cy={12 + shapeParams.offsetY} fill={colors.secondary} r="3" />
          <circle cx={36 + shapeParams.offsetX} cy={36 + shapeParams.offsetY} fill={colors.accent} r="2" />
        </g>
      </g>
    </svg>
  )
}
