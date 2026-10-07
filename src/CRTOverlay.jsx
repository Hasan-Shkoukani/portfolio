// Fixed screen-glass layer: soft edges, LED grid, rolling scanlines, vignette, flicker.
export default function CRTOverlay() {
  return (
    <div className="crt" aria-hidden="true">
      <i className="crt-blur" />
      <i className="crt-screen" />
      <i className="crt-band" />
    </div>
  )
}
