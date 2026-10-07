import { useEffect, useRef } from 'react'

const BARS = 48
const SEGS = 14

// LED spectrum bars along the bottom edge, fed by the <audio> element, mirrored from the centre.
export default function Visualizer({ audio, playing }) {
  const ref = useRef(null)
  const graph = useRef(null)

  useEffect(() => {
    if (!playing) return
    // createMediaElementSource can only run once per element, so the graph is kept across plays
    if (!graph.current) {
      const ctx = new AudioContext()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.8
      ctx.createMediaElementSource(audio.current).connect(analyser)
      analyser.connect(ctx.destination)
      graph.current = { ctx, analyser, data: new Uint8Array(analyser.frequencyBinCount) }
    }
    const { ctx, analyser, data } = graph.current
    ctx.resume()

    const canvas = ref.current
    const c = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio, 2)
    let raf = 0
    const draw = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr)
        canvas.height = Math.round(h * dpr)
      }
      c.setTransform(dpr, 0, 0, dpr, 0, 0)
      c.clearRect(0, 0, w, h)
      analyser.getByteFrequencyData(data)
      const bw = w / BARS
      const sh = h / SEGS
      for (let i = 0; i < BARS; i++) {
        const k = Math.abs(i - (BARS - 1) / 2) / (BARS / 2) // 0 at centre, 1 at the edges
        const v = data[Math.floor(k ** 1.6 * data.length * 0.8)] / 255
        const lit = Math.round(v * SEGS)
        for (let s = 0; s < lit; s++) {
          c.fillStyle = s > SEGS * 0.75 ? '#fff' : s > SEGS * 0.4 ? '#7ff6ff' : '#0a1aff'
          c.fillRect(i * bw + 1, h - (s + 1) * sh + 1, bw - 2, sh - 2)
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [playing, audio])

  return <canvas ref={ref} className={`viz${playing ? ' on' : ''}`} aria-hidden="true" />
}
