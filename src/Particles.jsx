import { useEffect, useRef } from 'react'

// Floating bokeh dots. One pre-rendered glow sprite stamped with drawImage, far cheaper than shadowBlur.
export default function Particles({ count = 40 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 64
    const s = sprite.getContext('2d')
    const g = s.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, '#fff')
    g.addColorStop(0.2, '#7ff6ff')
    g.addColorStop(0.5, 'rgba(10, 26, 255, 0.35)')
    g.addColorStop(1, 'rgba(10, 26, 255, 0)')
    s.fillStyle = g
    s.fillRect(0, 0, 64, 64)

    const dots = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 8 + Math.random() * 28,
      v: 0.00002 + Math.random() * 0.00006,
      a: 0.25 + Math.random() * 0.6,
      p: Math.random() * Math.PI * 2,
    }))

    let w = 0
    let h = 0
    const draw = t => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (const d of dots) {
        const y = (((d.y - t * d.v) % 1) + 1) % 1 // drift upward, wrap around
        const x = d.x + Math.sin(t * 0.0003 + d.p) * 0.01
        ctx.globalAlpha = d.a * (0.7 + 0.3 * Math.sin(t * 0.001 + d.p))
        ctx.drawImage(sprite, x * w - d.r, y * (h + 2 * d.r) - 2 * d.r, d.r * 2, d.r * 2)
      }
    }

    // half resolution: the dots are soft blobs anyway, and it's a quarter of the pixels to fill
    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w / 2
      canvas.height = h / 2
      ctx.scale(0.5, 0.5)
      draw(performance.now())
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let raf = 0
    const tick = t => {
      draw(t)
      raf = requestAnimationFrame(tick)
    }

    // only spend frames while on screen
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf)
      if (entry.isIntersecting && !still) raf = requestAnimationFrame(tick)
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [count])

  return <canvas ref={ref} className="particles" aria-hidden="true" />
}
