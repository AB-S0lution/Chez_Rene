// Small DOM + French typography helpers.
export const BASE = import.meta.env.BASE_URL

/** Prefix an internal path (no leading slash) with the deploy base. */
export const url = (p: string) => BASE + p.replace(/^\//, '')

const NB = ' '
const NNB = ' '

/** French typography on text nodes of an HTML string: nbsp before : ; ! ? and inside « ». */
export function typo(html: string): string {
  return html
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (part.startsWith('<')) return part
      return part
        .replace(/ +([?!;])/g, `${NNB}$1`)
        .replace(/ +:/g, `${NB}:`)
        .replace(/«\s+/g, `«${NB}`)
        .replace(/\s+»/g, `${NB}»`)
        .replace(/(\d) (€|h\b|%)/g, `$1${NB}$2`)
        .replace(/(\d) (kg|g)\b/g, `$1${NB}$2`)
    })
    .join('')
}

export const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string)

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel)
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel))

export const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
export const isCoarse = () => matchMedia('(pointer: coarse)').matches

export const euro = (n: number) => (Number.isInteger(n) ? `${n}${NB}€` : `${n.toFixed(2).replace('.', ',')}${NB}€`)

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
export function frDate(iso: string, withDay = false) {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  const s = `${d === 1 ? '1er' : d} ${MONTHS[m - 1]} ${y}`
  return withDay ? `${DAYS[dt.getUTCDay()]} ${s}` : s
}
export const frParts = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  return { day: d, month: MONTHS[m - 1], dow: DAYS[dt.getUTCDay()], year: y }
}
export const setMain = (html: string) => {
  const main = document.getElementById('main')!
  main.innerHTML = typo(html)
  return main
}
