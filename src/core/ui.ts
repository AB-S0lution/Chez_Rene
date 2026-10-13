// Shared HTML builders and small interactive mounts (ardoise, quotes, accordion filters, lightbox).
import type { Photo } from '../data/photos'
import { business, hours } from '../data/business'
import type { Dish, Tag } from '../data/menus'
import type { Ardoise } from '../data/ardoises'
import type { Evenement } from '../data/events'
import { typeLabel } from '../data/events'
import type { Cocktail } from '../data/bar'
import type { Post } from '../data/journal'
import type { Review } from '../data/reviews'
import { $, $$, esc, euro, frParts, reduceMotion, url } from './dom'
import { glass, scene } from './art'
import { loadKit } from './motion'

export const tagName: Record<Tag, string> = { terre: 'Terre', mer: 'Mer', veggie: 'Veggie' }
export const tagChips = (tags: Tag[]) =>
  tags.map((t) => `<span class="chip${t === 'veggie' ? ' chip--veg' : ''}" style="padding:2px 10px;font-size:.74rem"><i class="ph ${t === 'veggie' ? 'ph-leaf' : t === 'mer' ? 'ph-fish' : 'ph-fire'}" aria-hidden="true"></i>${tagName[t]}</span>`).join('')

export const sample = (text = 'Exemple') => `<span class="sample">${text}</span>`

export function pageHero(o: { label: string; title: string; lead: string; art?: string }) {
  return `<section class="phero velvet" aria-labelledby="page-title">
  ${o.art ? `<div class="phero__art" aria-hidden="true">${o.art}</div>` : ''}
  <div class="wrap">
    <span class="label" data-reveal>${o.label}</span>
    <h1 id="page-title" data-reveal>${o.title}</h1>
    <p data-reveal>${o.lead}</p>
  </div>
</section>`
}

export const sectionHead = (title: string, lead = '', label = '') =>
  `<div class="sec-head">${label ? `<span class="label" data-reveal>${label}</span>` : ''}<h2 data-reveal>${title}</h2>${lead ? `<p data-reveal>${lead}</p>` : ''}</div>`

export function reserveBand(title = 'Une table, une bouteille, une soirée ?') {
  return `<section class="section velvet" style="color:var(--creme)">
  <div class="wrap" style="display:grid;gap:22px;justify-items:start">
    <h2 style="font-size:clamp(2rem,5vw,3.8rem);max-width:16ch" data-reveal>${title}</h2>
    <p style="color:var(--muted)" data-reveal>Du lundi au vendredi, midi et soir. Le plus simple : nous appeler.</p>
    <div style="display:flex;flex-wrap:wrap;gap:12px" data-reveal>
      <a class="btn btn--primary magnetic" href="${url('reserver/')}">Réserver</a>
      <a class="btn" style="color:var(--creme)" href="${business.phoneHref}"><i class="ph ph-phone" aria-hidden="true"></i> ${business.phone}</a>
    </div>
  </div>
</section>`
}

export function dishRows(list: Dish[]) {
  const sections = [...new Set(list.map((d) => d.section))]
  return sections.map((s) => `<div class="menu-sec" data-reveal><h3>${s}</h3>${list.filter((d) => d.section === s).map((d) => `<article class="dishrow"><h4>${esc(d.name)}</h4><span class="price">${d.priceLabel ?? (d.price ? euro(d.price) : '')}</span>${d.desc ? `<p>${esc(d.desc)}</p>` : ''}<div class="badges">${tagChips(d.tags)}</div></article>`).join('')}</div>`).join('')
}

export const hoursTable = () => `<table class="hours" data-hours><caption class="sr-only">Horaires d'ouverture</caption><tbody>${hours.map((h) => `<tr class="${h.slots.length ? '' : 'is-closed'}"><th scope="row">${h.day}</th><td>${h.slots.length ? h.slots.map((s) => `${s.from.replace(':', 'h')} à ${s.to.replace(':', 'h')}`).join('<br>') : 'Fermé'}</td></tr>`).join('')}</tbody></table><p class="note">${business.hoursNote}</p>`

export const statusPill = () => `<p class="status" data-status data-open="false" role="status"><span class="status__dot" aria-hidden="true"></span><span class="status__text">Horaires en cours de chargement</span></p>`

export function posterCard(e: Evenement, i = 0) {
  const p = frParts(e.date)
  const art = e.type === 'cocktail'
    ? `<div class="bubbles" aria-hidden="true">${'<i></i>'.repeat(8)}</div><div class="poster__art" aria-hidden="true" style="width:90px;opacity:.75">${glass('coupe', '#F0B24A')}</div>`
    : e.type === 'blindtest'
      ? `<div class="wave" aria-hidden="true">${'<i></i>'.repeat(26)}</div>`
      : e.type === 'karaoke'
        ? `<p class="lyric" aria-hidden="true"><span class="ball"></span>Et le micro passe à la table d'à côté</p>`
        : ''
  return `<article class="poster poster--${e.type}" data-reveal data-type="${e.type}" style="--d:${(i % 3) * 0.08}s">
  <div><span class="tag">${typeLabel[e.type]}</span>
  <h3>${esc(e.title)}${e.theme ? `<br><span style="font-size:.7em;font-style:italic;font-weight:400">${esc(e.theme)}</span>` : ''}</h3>
  <p>${esc(e.blurb)}</p></div>
  <div>${art}<div class="poster__date" style="margin-top:14px">${p.day}<small>${p.dow} ${p.month} · ${e.time}</small></div>
  ${e.isReal ? '' : `<p class="note" style="margin:10px 0 0;color:#eadfd2">Date d'exemple.</p>`}</div>
</article>`
}

export const cocktailCard = (c: Cocktail) => `<article class="cocktail" data-reveal>
  <div class="bubbles" aria-hidden="true">${'<i></i>'.repeat(8)}</div>
  <div class="cocktail__glass" aria-hidden="true">${glass(c.glass, c.kind === 'mocktail' ? '#8FB04A' : c.kind === 'signature' ? '#E6A054' : '#C8743F')}</div>
  <h3><span>${esc(c.name)}</span><span class="price">${euro(c.price)}</span></h3><p>${esc(c.desc)}</p></article>`

export const postCard = (p: Post, ph?: Photo) => `<a class="post" href="${url(`journal/article/?p=${p.slug}`)}" data-reveal>
  ${ph ? `<div class="post__art post__art--photo">${photoImg(ph)}<span class="ph__tag ph__tag--over">Photo d'illustration</span></div>` : `<div class="post__art" aria-hidden="true">${scene(p.art, 250)}</div>`}
  <span class="meta">${esc(p.tag)} · ${new Date(p.date + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
  <h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p></a>`

// ---------- Ardoise (weekly slate) ----------
export function ardoiseHTML(a: Ardoise, filter: Tag | 'all' = 'all') {
  const col = (title: string, lines: Ardoise['entrees']) => `<div><h3>${title}</h3><ul>${lines.filter((l) => filter === 'all' || l.tag === filter).map((l, i) => `<li class="chalk-line" style="--d:${(i * 0.09).toFixed(2)}s"><span>${esc(l.name)}<span class="t t--${l.tag}">${tagName[l.tag]}</span></span><span class="p">${euro(l.price)}</span></li>`).join('') || '<li><span style="opacity:.7">Rien de ce côté cette semaine.</span></li>'}</ul></div>`
  return `<div class="ardoise__title">L'ardoise</div><p class="ardoise__week">${a.label} · exemple de carte</p>
  <div class="ardoise__cols">${col('Entrées', a.entrees)}${col('Plats', a.plats)}${col('Desserts', a.desserts)}</div>
  <p class="ardoise__foot">Exemple d'ardoise pour la démonstration. La carte réelle de la semaine est sur la page Les cartes.</p>`
}

export async function mountArdoise(host: HTMLElement, list: Ardoise[], opts: { filters?: boolean } = {}) {
  let cur = 0
  let filter: Tag | 'all' = 'all'
  host.innerHTML = `
    ${opts.filters ? `<div class="tabs" role="group" aria-label="Filtrer l'ardoise">${(['all', 'terre', 'mer', 'veggie'] as const).map((t) => `<button type="button" class="chip" data-f="${t}" aria-pressed="${t === 'all'}">${t === 'all' ? 'Tout' : tagName[t]}</button>`).join('')}</div>` : ''}
    <div class="weekpick" role="tablist" aria-label="Choisir une semaine">${list.map((a, i) => `<button type="button" role="tab" class="chip" data-i="${i}" aria-selected="${i === 0}">${a.label.replace('Semaine du ', '')}</button>`).join('')}</div>
    <div class="ardoise-wrap"><div class="ardoise" id="${host.id}-board" aria-live="polite">${ardoiseHTML(list[0])}</div></div>`
  const board = $('.ardoise', host)!
  const paint = () => { board.innerHTML = ardoiseHTML(list[cur], filter); requestAnimationFrame(() => $$('.chalk-line', board).forEach((l) => l.classList.add('is-in'))) }
  const flip = async () => {
    if (reduceMotion()) return paint()
    const { gsap } = await loadKit()
    await gsap.to(board, { rotateX: -88, duration: 0.3, ease: 'power2.in', transformOrigin: 'top center' })
    paint()
    gsap.fromTo(board, { rotateX: 88 }, { rotateX: 0, duration: 0.3, ease: 'power2.out', transformOrigin: 'top center' })
  }
  $$('.weekpick .chip', host).forEach((b) => b.addEventListener('click', () => {
    cur = Number(b.dataset.i)
    $$('.weekpick .chip', host).forEach((x) => x.setAttribute('aria-selected', String(x === b)))
    flip()
  }))
  $$('[data-f]', host).forEach((b) => b.addEventListener('click', () => {
    filter = b.dataset.f as Tag | 'all'
    $$('[data-f]', host).forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
    paint()
  }))
  // chalk wipe when the board first enters
  const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { $$('.chalk-line', board).forEach((l) => l.classList.add('is-in')); io.disconnect() } }, { threshold: 0.2 })
  io.observe(board)
}

// ---------- Single-quote carousel ----------
export function mountQuotes(host: HTMLElement, list: Review[]) {
  let i = 0
  let timer = 0
  host.innerHTML = `<figure class="quote" aria-live="polite"><blockquote></blockquote><figcaption></figcaption></figure>
  <div class="voice__ctrl"><button class="iconbtn" type="button" data-d="-1" aria-label="Avis précédent"><i class="ph ph-arrow-left" aria-hidden="true"></i></button><button class="iconbtn" type="button" data-d="1" aria-label="Avis suivant"><i class="ph ph-arrow-right" aria-hidden="true"></i></button><span class="voice__count"></span></div>`
  const bq = $('blockquote', host)!, cap = $('figcaption', host)!, cnt = $('.voice__count', host)!
  const show = async (n: number) => {
    i = (n + list.length) % list.length
    const r = list[i]
    const apply = () => { bq.textContent = r.text; cap.textContent = `${r.platform}, ${r.date}${r.note ? ' · ' + r.note : ''}`; cnt.textContent = `${i + 1} / ${list.length}` }
    if (reduceMotion()) return apply()
    const { gsap } = await loadKit()
    await gsap.to(host.firstElementChild, { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in' })
    apply()
    gsap.fromTo(host.firstElementChild, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
  }
  const stop = () => clearInterval(timer)
  host.addEventListener('click', (e) => { const b = (e.target as HTMLElement).closest<HTMLElement>('[data-d]'); if (b) { stop(); show(i + Number(b.dataset.d)) } })
  show(0)
  if (!reduceMotion()) timer = window.setInterval(() => { if (document.visibilityState === 'visible') show(i + 1) }, 9000)
  host.addEventListener('focusin', stop)
}

// ---------- Lightbox for gallery ----------
export function mountLightbox(items: { id: string; kind: string; title: string; alt: string; ratio: number }[]) {
  const dlg = document.createElement('dialog')
  dlg.className = 'lightbox'
  dlg.setAttribute('aria-label', 'Image agrandie')
  dlg.innerHTML = `<div class="lightbox__in"><div class="lb-art"></div><div class="lightbox__bar"><p class="lb-title" style="margin:0"></p><div style="display:flex;gap:8px"><button class="iconbtn" type="button" data-n="-1" aria-label="Précédente"><i class="ph ph-arrow-left"></i></button><button class="iconbtn" type="button" data-n="1" aria-label="Suivante"><i class="ph ph-arrow-right"></i></button><button class="iconbtn" type="button" data-close aria-label="Fermer"><i class="ph ph-x"></i></button></div></div></div>`
  document.body.append(dlg)
  let cur = 0
  const show = (n: number) => { cur = (n + items.length) % items.length; const it = items[cur]; $('.lb-art', dlg)!.innerHTML = scene(it.kind, Math.round(400 / Math.max(it.ratio, 0.9)), it.alt); $('.lb-title', dlg)!.textContent = it.title }
  document.addEventListener('click', (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('[data-lb]')
    if (t) { show(Number(t.dataset.lb)); dlg.showModal(); return }
    if (e.target === dlg || (e.target as HTMLElement).closest('[data-close]')) dlg.close()
    const n = (e.target as HTMLElement).closest<HTMLElement>('[data-n]')
    if (n && dlg.contains(n)) show(cur + Number(n.dataset.n))
  })
  dlg.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1) })
}

// ---------- Photos d'illustration (Unsplash) ----------
export const photoImg = (ph: Photo, cls = '') => `<img class="ph-img ${cls}" src="${ph.src}" alt="${esc(ph.alt)}" width="${ph.width}" height="${ph.height}" loading="lazy" decoding="async">`
export const photoFigure = (ph: Photo) => `<figure class="phfig" data-reveal>${photoImg(ph)}<figcaption><span class="ph__tag">Photo d'illustration</span> <a href="${ph.url}" target="_blank" rel="noopener">${esc(ph.credit)} / Unsplash</a></figcaption></figure>`
/** Section with a row of illustrative photos. */
export const photoBand = (list: Photo[], title: string, lead = '') => `<section class="section ph-band" aria-label="${esc(title)}">
  <div class="wrap">${sectionHead(title, lead)}
    <div class="ph-grid">${list.map(photoFigure).join('')}</div>
    <p class="note" style="margin-top:14px">Photos d'illustration Unsplash (licence Unsplash), pas des photos de la maison.</p>
  </div>
</section>`
