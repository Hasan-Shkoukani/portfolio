import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  varying vec3 vView;
  varying float vD;
  void main() {
    vec3 p = position;
    float t = uTime * 0.6;
    float d = sin(p.x * 2.1 + t) * sin(p.y * 2.4 + t * 1.3) * sin(p.z * 1.9 + t * 0.8)
            + 0.5 * sin(p.x * 4.3 - t * 1.1) * sin(p.y * 3.7 + t * 0.6) * sin(p.z * 4.1 + t * 1.4);
    p += normal * d * uAmp;
    vD = d;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vView = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vView;
  varying float vD;
  void main() {
    vec3 n = normalize(cross(dFdx(vView), dFdy(vView)));
    vec3 v = normalize(-vView);
    float fr = pow(1.0 - abs(dot(n, v)), 2.2);
    vec3 cobalt = vec3(0.039, 0.102, 1.0);
    vec3 cyan = vec3(0.498, 0.965, 1.0);
    float k = 0.5 + 0.5 * sin(vD * 3.0 + n.y * 2.0 + uTime * 0.4);
    vec3 col = mix(cobalt, cyan, k);
    col = mix(col, vec3(1.0), 0.6 * smoothstep(0.25, 0.95, n.x * 0.6 + vD * 0.5 + 0.2 * sin(uTime * 0.3)));
    float spec = pow(max(dot(reflect(-normalize(vec3(-0.4, 0.8, 0.6)), n), v), 0.0), 24.0);
    col += spec * 0.6 + fr * 0.35;
    gl_FragColor = vec4(col, 1.0);
  }
`

export default function Blob() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const small = window.innerWidth < 768
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' })
    } catch {
      return // no WebGL: the CSS gradients carry the hero alone
    }
    // ponytail: fixed 0.75 render scale; the CRT grid hides the softness. Raise it if a sharper blob matters more than frame rate.
    renderer.setPixelRatio(0.75)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50)
    camera.position.z = 7

    const time = { value: 0 }
    const material = amp => new THREE.ShaderMaterial({ uniforms: { uTime: time, uAmp: { value: amp } }, vertexShader, fragmentShader })

    const group = new THREE.Group()
    const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, small ? 24 : 40), material(0.28))
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.03, 12, 160), material(0))
    ring.rotation.set(1.15, 0.3, 0)
    const moons = [0.22, 0.14, 0.09].map(size => {
      const m = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 6), material(0.2))
      group.add(m)
      return m
    })
    group.add(blob, ring)
    scene.add(group)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas.parentElement
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      const visH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z
      if (camera.aspect > 1.1) {
        group.position.set(visH * camera.aspect * 0.2, 0.1, 0)
        group.scale.setScalar(1)
      } else {
        group.position.set(0, visH * 0.23, 0)
        group.scale.setScalar(Math.min(0.85, camera.aspect * 0.9))
      }
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)
    resize()

    const pointer = { x: 0, y: 0 }
    const onPointer = e => {
      pointer.x = e.clientX / window.innerWidth - 0.5
      pointer.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    const clock = new THREE.Clock()
    let raf = 0
    let visible = true
    const tick = () => {
      const t = clock.getElapsedTime()
      time.value = t
      const scrolled = Math.min(window.scrollY / window.innerHeight, 1)
      group.rotation.x += (pointer.y * 0.6 + scrolled * 0.9 - group.rotation.x) * 0.05
      group.rotation.y += (pointer.x * 0.9 - group.rotation.y) * 0.05
      blob.rotation.y = t * 0.15
      ring.rotation.z = t * 0.25
      moons.forEach((m, i) => {
        const a = t * (0.5 + i * 0.22) + i * 2.1
        const r = 1.75 + i * 0.35
        m.position.set(Math.cos(a) * r, Math.sin(a * 1.3) * 0.6, Math.sin(a) * r)
      })
      renderer.render(scene, camera)
      if (visible && !still) raf = requestAnimationFrame(tick)
    }

    // only spend frames while the hero is on screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) tick()
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      scene.traverse(o => {
        o.geometry?.dispose()
        o.material?.dispose()
      })
      renderer.dispose()
    }
  }, [])

  return <canvas ref={ref} className="blob" aria-hidden="true" />
}
