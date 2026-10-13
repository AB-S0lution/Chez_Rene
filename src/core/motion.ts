// Motion kit: GSAP (ScrollTrigger, SplitText, Flip) + Lenis, loaded lazily. Everything animates transform / opacity
// (plus a few clip-paths). Reduced motion and touch devices get calm fallbacks.
import { reduceMotion, isCoarse, $$ } from './dom'

export interface Kit {
  gsap: typeof import('gsap').gsap
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
  SplitText: typeof import('gsap/SplitText').SplitText
  Flip: typeof import('gsap/Flip').Flip
  lenis: import('lenis').default | null
}

let kitPromise: Promise<Kit> | null = null

export function loadKit(): Promise<Kit> {
  if (kitPromise) return kitPromise
  kitPromise = (async () => {
    const [{ gsap }, { ScrollTrigger }, { SplitText }, { Flip }] = await Promise.all([
      import('gsap'), import('gsap/ScrollTrigger'), import('gsap/SplitText'), import('gsap/Flip'),
    ])
    gsap.registerPlugin(ScrollTrigger, SplitText, Flip)
    // Mobile URL-bar show/hide must not trigger a full refresh (jank + jumping pins).
    ScrollTrigger.config({ ignoreMobileResize: true })
    let lenis: Kit['lenis'] = null
    if (!reduceMotion() && !isCoarse()) {
      const { default: Lenis } = await import('lenis')
      lenis = new Lenis({ duration: 1.05, easing: (t: number) => 1 - Math.pow(1 - t, 3.2), smoothWheel: true })
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((t) => lenis!.raf(t * 1000))
      gsap.ticker.lagSmoothing(0)
      document.documentElement.classList.add('lenis')
    }
    return { gsap, ScrollTrigger, SplitText, Flip, lenis }
  })()
  return kitPromise
}

/** Scroll-reveal for [data-reveal] and the chalk / tesserae helpers. CSS handles the transition. */
export function initReveals(root: ParentNode = document) {
  const els = $$<HTMLElement>('[data-reveal], .chalk-line, .tess-band', root)
  if (!('IntersectionObserver' in window) || reduceMotion()) {
    els.forEach((e) => e.classList.add('is-in'))
    return
  }
  const groups = new Map<Element, number>()
  els.forEach((el) => {
    const p = el.parentElement!
    const i = groups.get(p) ?? 0
    groups.set(p, i + 1)
    if (!el.style.getPropertyValue('--d') && !el.classList.contains('tess-band')) el.style.setProperty('--d', `${Math.min(i, 8) * 0.07}s`)
  })
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target) } })
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
  els.forEach((e) => io.observe(e))
  // Fail-safe: anything already at or above the fold after 2.5 s is shown, whatever the observer did
  // (tall elements on short landscape phones can miss the threshold). Printing shows everything.
  setTimeout(() => els.forEach((e) => { if (!e.classList.contains('is-in') && e.getBoundingClientRect().top < innerHeight) { e.classList.add('is-in'); io.unobserve(e) } }), 2500)
  addEventListener('beforeprint', () => els.forEach((e) => e.classList.add('is-in')))
}

/** Pause infinite CSS loops (sound waves, bouncing ball, sway) while they are off screen. */
export function pauseOffscreenLoops(root: ParentNode = document) {
  const els = $$<HTMLElement>('.wave, .lyric, .bubbles', root)
  if (!els.length || !('IntersectionObserver' in window)) return
  const io = new IntersectionObserver((entries) => entries.forEach((en) => en.target.classList.toggle('is-paused', !en.isIntersecting)), { rootMargin: '80px' })
  els.forEach((e) => io.observe(e))
}

/** Count-up numbers: <span data-count="16.5" data-dec="2"> */
export async function initCounters(root: ParentNode = document) {
  const els = $$<HTMLElement>('[data-count]', root)
  if (!els.length) return
  const fmt = (v: number, dec: number) => v.toFixed(dec).replace('.', ',')
  if (reduceMotion()) { els.forEach((e) => (e.textContent = fmt(Number(e.dataset.count), Number(e.dataset.dec ?? 0)))); return }
  const { gsap } = await loadKit()
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return
      const el = en.target as HTMLElement
      io.unobserve(el)
      const to = Number(el.dataset.count), dec = Number(el.dataset.dec ?? 0)
      const o = { v: 0 }
      gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', onUpdate: () => (el.textContent = fmt(o.v, dec)) })
    })
  }, { threshold: 0.4 })
  els.forEach((e) => { e.textContent = fmt(0, Number(e.dataset.dec ?? 0)); io.observe(e) })
}

/** Magnetic buttons (fine pointers only, max 6 px) and directional cane fill. */
export function initButtons(root: ParentNode = document) {
  $$<HTMLElement>('.btn', root).forEach((b) => {
    b.addEventListener('pointerenter', (e) => {
      const r = b.getBoundingClientRect()
      b.dataset.side = e.clientX - r.left > r.width / 2 ? 'r' : 'l'
    })
    b.addEventListener('pointerleave', (e) => {
      const r = b.getBoundingClientRect()
      b.dataset.side = e.clientX - r.left > r.width / 2 ? 'r' : 'l'
    })
  })
  if (reduceMotion() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return
  $$<HTMLElement>('.magnetic', root).forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width - 0.5) * 12
      const y = ((e.clientY - r.top) / r.height - 0.5) * 12
      b.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`
    })
    b.addEventListener('pointerleave', () => { b.style.translate = '0 0' })
  })
}
