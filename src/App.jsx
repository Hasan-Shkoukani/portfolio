import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { TypeAnimation } from 'react-type-animation'
import CRTOverlay from './CRTOverlay'
import GlowText from './GlowText'
import Particles from './Particles'
import Visualizer from './Visualizer'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const Blob = lazy(() => import('./Blob'))

const LINKEDIN = 'https://www.linkedin.com/in/hshkoukani'
const GITHUB = 'https://github.com/Hasan-Shkoukani'

const roles = [
  {
    title: 'AI systems',
    text: 'AI agents, LLM automations and production pipelines built with LangGraph, Gemini and custom machine learning models.',
  },
  {
    title: 'Full-stack',
    text: 'Web, mobile and API platforms with React, Next.js, Express and FastAPI, taken from idea to deployment.',
  },
  {
    title: 'Community',
    text: 'Hackathon organizer, student club founder and Python instructor who has mentored 50+ students.',
  },
]

const technical = [
  ['Frontend development', 'frontend'],
  ['Backend development', 'backend'],
  ['AI models & integration', 'ai-model'],
  ['AI agents & LangGraph', 'ai-agent'],
  ['Databases & SQL', 'database'],
  ['Data analysis', 'data'],
  ['Mobile development', 'mobile'],
]
const soft = [
  ['Agile & SDLC', 'agile'],
  ['Team collaboration', 'tc'],
  ['Problem solving', 'ps'],
]

const projects = [
  {
    name: 'Prof Dux Mini',
    note: 'Senior project II',
    text: 'AI calling service built on Twilio that helps lecturers send announcements, run online meetings and organize tasks through Google Calendar.',
    href: `${GITHUB}/profduxmini`,
  },
  {
    name: 'SolinDocs',
    note: 'Senior project I',
    text: 'AI-powered mobile app for university life. MERN and React Native, with a live timetable, event calendar and LLM document parsing.',
    href: `${GITHUB}/solin`,
  },
  {
    name: 'Unit-testing framework',
    note: 'Python',
    text: 'A lightweight, extensible Python test framework with custom assertions, decorators, a test runner and LLM-powered debugging.',
    href: `${GITHUB}/unit-testing`,
  },
  {
    name: 'Bolt.py',
    note: 'Chrome extension',
    text: 'AI Gmail responder for the NEU Registration Office that classifies incoming email and drafts replies.',
    href: `${GITHUB}/bolt`,
  },
  {
    name: 'Charti',
    note: 'Gemini + React Flow',
    text: 'Turns text or code into diagrams, with dark mode and PNG export.',
    href: `${GITHUB}/charti`,
  },
  {
    name: 'Spendless',
    note: 'Gemini',
    text: 'Builds shopping and meal plans that fit a budget, or estimates what an existing plan will cost.',
    href: `${GITHUB}/spendless`,
  },
  {
    name: 'Paradise Nursery',
    note: 'IBM React course',
    text: 'A small e-commerce store with a Redux cart, submitted and accepted in the IBM React.js course.',
    href: `${GITHUB}/Paradise-Nursery`,
  },
  {
    name: 'Arduino RGB strip',
    note: 'C + Tinkercad',
    text: 'An Arduino LED strip with two light animations, written in C and simulated in Tinkercad.',
    href: 'https://www.tinkercad.com/things/1pRDMiVGglL-project',
  },
]

const Chars = ({ text }) =>
  [...text].map((c, i) => (
    <span className="char" key={i}>
      {c}
    </span>
  ))

export default function App() {
  const root = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia(root.current)

    mm.add(
      { motion: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 900px)', fine: '(pointer: fine)' },
      ({ conditions: c }) => {
        if (!c.motion) return

        // eased wheel scrolling on desktop; touch keeps native momentum. Must exist before the ScrollTriggers.
        if (c.fine) ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 1.1 })

        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from('.char', { yPercent: 120, rotateX: -90, opacity: 0, stagger: 0.035, duration: 1.3 })
          .from('.hero-sub > *', { y: 40, opacity: 0, stagger: 0.1, duration: 1.1 }, '-=0.9')

        // the two halves of the name drift apart as you leave the hero
        const hero = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('.name-line:first-child', { xPercent: -14, scrollTrigger: hero })
        gsap.to('.name-line:last-child', { xPercent: 9, scrollTrigger: hero })

        gsap.utils.toArray('.mask').forEach(el =>
          gsap.from(el, {
            clipPath: 'inset(0 0 100% 0)',
            y: 50,
            duration: 1.3,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }),
        )

        // headings smear in like a tube catching the signal: stretched and blurred, then sharp
        gsap.utils.toArray('.glow').forEach(el =>
          // fromTo with explicit end values: a plain from() reads the current state as the end,
          // and StrictMode's second effect run would find the heading still stretched
          gsap.fromTo(el, { filter: 'blur(14px)', scaleX: 1.35, opacity: 0 }, {
            filter: 'blur(0px)',
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            clearProps: 'filter',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }),
        )

        gsap.utils.toArray('.role h3').forEach((el, i) =>
          gsap.fromTo(
            el,
            { xPercent: i % 2 ? -25 : 25, rotateY: i % 2 ? 25 : -25 },
            { xPercent: 0, rotateY: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 55%', scrub: true } },
          ),
        )

        gsap.fromTo(
          '.orbit',
          { rotateX: -30, rotateY: -60 },
          { rotateX: -8, rotateY: 120, ease: 'none', scrollTrigger: { trigger: '.skills', start: 'top bottom', end: 'bottom top', scrub: true } },
        )

        if (c.wide) {
          const track = root.current.querySelector('.track')
          const distance = () => track.scrollWidth - window.innerWidth
          const pan = gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: '.projects',
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          // cards swing through 3D space as the track slides past
          gsap.utils.toArray('.card').forEach(card =>
            gsap.fromTo(
              card,
              { rotateY: -32, z: -120 },
              {
                keyframes: [
                  { rotateY: 0, z: 0 },
                  { rotateY: 32, z: -120 },
                ],
                ease: 'none',
                scrollTrigger: { trigger: card, containerAnimation: pan, start: 'left right', end: 'right left', scrub: true },
              },
            ),
          )
        } else {
          // phones: cards flip up into place instead of panning sideways
          gsap.utils.toArray('.card').forEach(card =>
            gsap.from(card, {
              rotateX: 35,
              y: 80,
              opacity: 0,
              transformPerspective: 900,
              transformOrigin: '50% 100%',
              duration: 1.1,
              ease: 'expo.out',
              scrollTrigger: { trigger: card, start: 'top 92%' },
            }),
          )
        }
      },
    )

    // magnetic buttons + tilting cards, only for real pointers
    const fine = window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches
    const cleanups = []
    if (fine) {
      root.current.querySelectorAll('[data-magnet], [data-tilt]').forEach(el => {
        const tilt = el.hasAttribute('data-tilt')
        const opts = { duration: 0.6, ease: 'power3' }
        const a = gsap.quickTo(el, tilt ? 'rotateY' : 'x', opts)
        const b = gsap.quickTo(el, tilt ? 'rotateX' : 'y', opts)
        gsap.set(el, { transformPerspective: 900 })
        const move = e => {
          const r = el.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width - 0.5
          const py = (e.clientY - r.top) / r.height - 0.5
          el.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
          el.style.setProperty('--my', `${(py + 0.5) * 100}%`)
          if (tilt) {
            a(px * 16)
            b(-py * 16)
          } else {
            a(px * r.width * 0.35)
            b(py * r.height * 0.35)
          }
        }
        const leave = () => {
          a(0)
          b(0)
        }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        cleanups.push(() => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
        })
      })
    }

    // VT323 can land after ScrollTrigger measured the page; re-measure once it's in
    document.fonts.ready.then(() => ScrollTrigger.refresh())

    return () => {
      mm.revert()
      cleanups.forEach(f => f())
    }
  }, [])

  const ring = [...technical, ...soft]

  // browsers block autoplay with sound, so music starts on a click
  const audio = useRef(null)
  const [playing, setPlaying] = useState(false)
  // the smoother moves content with transforms, so native #anchor jumps land in the wrong place
  const onNav = e => {
    const href = e.target.closest('a')?.getAttribute('href')
    const smoother = ScrollSmoother.get()
    if (smoother && href?.startsWith('#')) {
      e.preventDefault()
      smoother.scrollTo(href, true, 'top top')
    }
  }

  const toggleSound = () => {
    const a = audio.current
    if (a.paused) {
      a.volume = 0.4
      a.play().then(() => setPlaying(true), () => {})
    } else {
      a.pause()
      setPlaying(false)
    }
  }

  return (
    <div ref={root}>
      <CRTOverlay />
      <div className="progress" aria-hidden="true" />

      <nav className="nav" onClick={onNav}>
        <a href="#top" className="logo">
          h.shkoukani
        </a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <button type="button" onClick={toggleSound} aria-pressed={playing}>
          {playing ? 'Sound on' : 'Sound off'}
        </button>
        <audio ref={audio} src="/music.mp3" loop preload="none" />
      </nav>
      <Visualizer audio={audio} playing={playing} />

      <div id="smooth-wrapper">
      <div id="smooth-content">
      <header className="hero" id="top">
        <div className="hero-canvas">
          <Particles />
          <Suspense fallback={null}>
            <Blob />
          </Suspense>
        </div>
        <div className="hero-copy">
          <h1 className="name" aria-label="Hasan Shkoukani">
            <span className="name-line" aria-hidden="true">
              <Chars text="Hasan" />
            </span>
            <span className="name-line" aria-hidden="true">
              <Chars text="Shkoukani" />
            </span>
          </h1>
          <div className="hero-sub">
            <p>AI systems engineer and full-stack developer, building agents, automations and the apps around them.</p>
            <p className="typed">
              Let's build{' '}
              <TypeAnimation
                sequence={['an AI agent', 1600, 'a website', 1600, 'a mobile app', 1600, 'an automation', 1600]}
                wrapper="span"
                className="typed-word"
                speed={30}
                deletionSpeed={60}
                repeat={Infinity}
              />
            </p>
            <div className="ctas">
              <a className="btn btn-primary" href={LINKEDIN} target="_blank" rel="noopener noreferrer" data-magnet>
                Hire me
              </a>
              <a className="btn btn-ghost" href={GITHUB} target="_blank" rel="noopener noreferrer" data-magnet>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="about" id="about">
          <p className="lede mask">
            I work mainly in Python and JavaScript, turning complex ideas into practical products that people actually use.
          </p>
          <div className="roles">
            {roles.map(r => (
              <article className="role" key={r.title}>
                <GlowText as="h3">{r.title}</GlowText>
                <p>{r.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="skills" id="skills">
          <GlowText>Toolbox</GlowText>
          <div className="stage" aria-hidden="true">
            <div className="orbit">
              <div className="spin">
                {ring.map(([, icon], i) => (
                  <div className="tile" key={icon} style={{ '--i': i, '--n': ring.length }}>
                    <img src={`/icons/${icon}.png`} alt="" width="56" height="56" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="skill-lists">
            <div>
              <h3>Technical</h3>
              <ul>
                {technical.map(([name]) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>How I work</h3>
              <ul>
                {soft.map(([name]) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="track">
            <div className="track-intro">
              <GlowText>Projects</GlowText>
              <p>Things I've built, from senior projects to weekend experiments.</p>
            </div>
            {projects.map((p, i) => (
              <a className="card" href={p.href} target="_blank" rel="noopener noreferrer" key={p.name} style={{ '--h': ((i * 7) % 24) - 12 }}>
                <div className="card-inner" data-tilt>
                  <div className="card-art" aria-hidden="true">
                    <span>{p.name[0]}</span>
                  </div>
                  <div className="card-body">
                    <h3>{p.name}</h3>
                    <p className="note">{p.note}</p>
                    <p>{p.text}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="contact">
          <GlowText>Got something to build?</GlowText>
          <p>Websites, AI agents, mobile apps, automations. Send me a message on LinkedIn.</p>
          <a className="btn btn-primary btn-big" href={LINKEDIN} target="_blank" rel="noopener noreferrer" data-magnet>
            Hire me
          </a>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 Hasan Shkoukani</span>
        <a href={GITHUB} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </footer>
      </div>
      </div>
    </div>
  )
}
