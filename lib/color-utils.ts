export function getDominantColor(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve('#f3f4f6') // fallback gray
        return
      }

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      let r = 0,
        g = 0,
        b = 0,
        count = 0

      // Sample pixels to get average color
      for (let i = 0; i < imageData.length; i += 16) {
        r += imageData[i]
        g += imageData[i + 1]
        b += imageData[i + 2]
        count++
      }

      const avgR = Math.round(r / count)
      const avgG = Math.round(g / count)
      const avgB = Math.round(b / count)

      // Make it much lighter like the portfolio icon background
      const lightR = Math.min(255, avgR + 200)
      const lightG = Math.min(255, avgG + 200)
      const lightB = Math.min(255, avgB + 200)

      resolve(`rgba(${lightR}, ${lightG}, ${lightB}, 0.15)`)
    }
    img.onerror = () => resolve('#f3f4f6') // fallback gray
    img.src = imageUrl
  })
}

export function getLighterBackgroundColor(baseColor: string): string {
  // Convert hex to RGB and make it much lighter and glass-like
  const hex = baseColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  const lightR = Math.min(255, r + 200)
  const lightG = Math.min(255, g + 200)
  const lightB = Math.min(255, b + 200)

  return `rgba(${lightR}, ${lightG}, ${lightB}, 0.15)`
}
