// Page shell behaviour: theme (lamp switch with View Transition), navigation, header, buttons, reveals.
import { $, $$, reduceMotion } from './dom'
import { getStatus, todayIndex } from './status'
import { initButtons, initReveals, initCounters, loadKit } from './motion'

type Theme = 'midi' | 'soir'
const root = document.documentElement
const KEY = 'chezrene-theme'

export const currentTheme = (): Theme => (root.dataset.theme === 'midi' ? 'midi' : 'soir')

function paintLamp() {
  const lamp = $('#lamp')
  if (!lamp) return
  const t = currentTheme()
  lamp.setAttribute('aria-pressed', String(t === 'midi'))
  lamp.setAttribute('aria-label', t === 'soir' ? 'Changer d\'ambiance : passer en mode midi' : 'Changer d\'ambiance : passer en mode soir')
  const lab = $('.lamp__label', lamp)
  if (lab) lab.textContent = t === 'soir' ? 'Soir' : 'Midi'
  const tc = $('meta[name="theme-color"][media*="dark"]')
  if (tc) tc.setAttribute('content', t === 'soir' ? '#101018' : '#FAF5EF')
}

export async function setTheme(next: Theme, origin?: { x: number; y: number }) {
  const apply = () => {
    root.dataset.theme = next
    try { localStorage.setItem(KEY, next) } catch { /* private mode */ }
    paintLamp()
    document.dispatchEvent(new CustomEvent('themechange', { detail: next }))
  }
  const start = (document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> } }).startViewTransition
  if (!start || reduceMotion()) { apply(); return }
  root.classList.add('vt-lamp')
  const vt = start.call(document, apply)
  try {
    await vt.ready
    const x = origin?.x ?? innerWidth - 60, y = origin?.y ?? 40
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 800, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', pseudoElement: '::view-transition-new(root)' })
    await vt.finished
  } finally { root.classList.remove('vt-lamp') }
}

function initLamp() {
  const lamp = $('#lamp')
  paintLamp()
  lamp?.addEventListener('click', () => {
    const r = lamp.getBoundingClientRect()
    setTheme(currentTheme() === 'soir' ? 'midi' : 'soir', { x: r.left + r.width / 2, y: r.top + r.height / 2 })
  })
}

function initNav() {
  const header = $('.site-header')!
  const burger = $('#burger')!
  const nav = $('#nav')!
  const path = location.pathname.replace(/\/index\.html$/, '/')
  $$<HTMLAnchorElement>('a', nav).forEach((a) => {
    const href = new URL(a.href).pathname
    if (path === href || (path.startsWith(href) && href !== import.meta.env.BASE_URL)) a.setAttribute('aria-current', 'page')
  })
  const set = (open: boolean) => {
    header.classList.toggle('nav-open', open)
    burger.setAttribute('aria-expanded', String(open))
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu')
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }
  burger.addEventListener('click', () => set(!header.classList.contains('nav-open')))
  nav.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) set(false) })
  addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false) })
  matchMedia('(min-width: 1180px)').addEventListener('change', (m) => { if (m.matches) set(false) })
  const sentinel = document.createElement('div')
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none'
  document.body.prepend(sentinel)
  new IntersectionObserver(([en]) => header.classList.toggle('is-scrolled', !en.isIntersecting)).observe(sentinel)
}

/** Fills every [data-status] pill and today's row in [data-hours] tables. */
export function paintStatus() {
  const st = getStatus()
  $$<HTMLElement>('[data-status]').forEach((el) => {
    el.dataset.open = String(st.open)
    const t = $('.status__text', el)
    if (t) t.textContent = st.text.replace(' · ', ' · ')
  })
  const idx = todayIndex()
  $$('[data-hours] tbody tr').forEach((tr, i) => tr.classList.toggle('is-today', i === idx))
}

export interface BootOpts { counters?: boolean }

export function boot(opts: BootOpts = {}) {
  if (reduceMotion()) root.classList.add('js-reduce')
  initLamp()
  initNav()
  paintStatus()
  setInterval(paintStatus, 60_000)
  initButtons()
  initReveals()
  if (opts.counters !== false) initCounters()
  // Smooth scroll + ScrollTrigger on every page (lazy). Anchors go through Lenis when present.
  loadKit().then(({ lenis, ScrollTrigger }) => {
    document.addEventListener('click', (e) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a || !lenis) return
      const target = a.getAttribute('href')
      if (target && target.length > 1) { const el = document.querySelector<HTMLElement>(target); if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -80 }) } }
    })
    addEventListener('load', () => ScrollTrigger.refresh())
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  })
}
