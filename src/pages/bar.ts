import '../style.css'
import { cocktails, gins, bieres } from '../data/bar'
import { cave, bodyLabel, type Bottle, type Couleur, type StyleVin } from '../data/cave'
import { $, $$, esc, reduceMotion, setMain } from '../core/dom'
import { photos } from '../data/photos'
import { photoBand } from '../core/ui'
import { scene, tessBand, bottle, glass } from '../core/art'
import { boot } from '../core/shell'
import { loadKit } from '../core/motion'
import { pageHero, sectionHead, reserveBand, cocktailCard } from '../core/ui'

const chips = (name: string, vals: [string, string][]) => `<div class="grp" role="group" aria-label="${name}"><span>${name}</span>${vals.map(([v, l], i) => `<button type="button" class="chip" data-g="${name}" data-v="${v}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div>`

setMain(`
${pageHero({ label: 'Le bar', title: 'Le bar de chez René.', lead: 'Bar à cocktails, vins et bières artisanales. Des cocktails classiques et signature, des créations sur mesure, et une cave où l\'on va se servir.', art: scene('cocktail', 300, '') })}
${tessBand(60, 11)}
<section class="section" aria-labelledby="cocktails">
  <div class="wrap">
    ${sectionHead('Cocktails et mocktails.', 'Des cocktails classiques et signature, des créations sur mesure, une carte de mocktails travaillés.')}
    <h3 id="cocktails" class="sr-only">Cocktails</h3>
    <div class="cave-filters">${chips('Type', [['all', 'Tout'], ['classique', 'Classiques'], ['signature', 'Signature'], ['mocktail', 'Mocktails']])}</div>
    <p class="note">Recettes, noms et prix indicatifs pour la démonstration : la carte réelle du bar n'est pas publiée.</p>
    <div class="grid4" id="cocktail-grid">${cocktails.map((c) => `<div data-kind="${c.kind}">${cocktailCard(c)}</div>`).join('')}</div>
  </div>
</section>

<section class="section section--alt" aria-labelledby="gin">
  <div class="wrap">
    ${sectionHead('Gin & tonic, une passion.', '« Nous vouons une passion pour les gins. » Huit façons de le servir, décrites sans marque.')}
    <h3 id="gin" class="sr-only">Gin & tonic</h3>
    <div class="grid4">${gins.map((g) => `<article class="card" data-reveal><div class="cocktail__glass" style="height:90px" aria-hidden="true">${glass('highball', '#BFD8D0')}</div><h3>${g.name}</h3><p class="muted" style="margin:0">${g.desc}</p></article>`).join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="bieres">
  <div class="wrap">
    ${sectionHead('Bières artisanales de saison.', 'Les références changent avec les saisons. Styles d\'exemple.')}
    <h3 id="bieres" class="sr-only">Bières</h3>
    <div class="grid4">${bieres.map((b) => `<article class="card" data-reveal><div class="card__top"><h3 style="margin:0">${b.style}</h3><span class="sample">Exemple</span></div><p class="muted">${b.desc}</p><span class="note">${b.degre}</span></article>`).join('')}</div>
  </div>
</section>

${photoBand(photos.filter((p) => p.theme === 'bar' || p.theme === 'cave'), 'Au comptoir.', 'Cocktails, gin & tonic, bières de saison et vins de la cave.')}

<section class="section velvet" id="cave" style="color:var(--creme)" aria-labelledby="cave-t">
  <div class="wrap">
    <div class="sec-head"><span class="label" data-reveal>L'espace cave</span><h2 id="cave-t" data-reveal>Allez choisir votre bouteille.</h2>
    <p data-reveal style="color:var(--muted)">Pas de carte imposée : les bouteilles changent au fil des envies. Levez-vous, parcourez l'étagère, posez une bouteille sur la table pour la découvrir. Demandez conseil à l'équipe.</p></div>
    <div class="cave-filters" id="cave-filters">
      ${chips('Couleur', [['all', 'Toutes'], ['rouge', 'Rouge'], ['blanc', 'Blanc'], ['rosé', 'Rosé'], ['orange', 'Orange'], ['bulles', 'Bulles']])}
      ${chips('Style', [['all', 'Tous'], ['nature', 'Nature'], ['biodynamie', 'Biodynamie'], ['traditionnel', 'Traditionnel']])}
      ${chips('Corps', [['all', 'Tous'], ['light', 'Léger'], ['mid', 'Moyen'], ['full', 'Charpenté']])}
    </div>
    <p class="cave-count" id="cave-count" role="status"></p>
    <div class="shelfwrap"><div class="shelf" id="shelf" role="group" aria-label="Étagère de la cave. Flèches gauche et droite pour parcourir."></div>
      <div class="shelf__ctrls"><button class="iconbtn" type="button" id="sh-prev" aria-label="Étagère vers la gauche"><i class="ph ph-arrow-left" aria-hidden="true"></i></button><button class="iconbtn" type="button" id="sh-next" aria-label="Étagère vers la droite"><i class="ph ph-arrow-right" aria-hidden="true"></i></button><span class="note" style="color:var(--muted)">Faites glisser l'étagère ou utilisez les flèches.</span></div></div>
    <div class="cave-table" style="background:rgb(16 16 24 / .5);border-color:rgb(250 245 239 / .16)" aria-live="polite">
      <div class="cave-table__slot" id="cave-slot"><span class="note" style="color:var(--muted);text-align:center;padding:10px">Posez une bouteille ici</span></div>
      <div class="cave-card" id="cave-card"><p style="color:var(--muted);margin:0">Choisissez une bouteille sur l'étagère : son étiquette se retourne ici, avec le style, le cépage, la région et l'accord avec un plat de la carte.</p></div>
    </div>
    <p class="note" style="margin-top:14px;color:var(--muted)">Bouteilles d'exemple, sans producteur ni prix. La sélection réelle change au fil des envies.</p>
  </div>
</section>

<section class="section">
  <div class="wrap grid2" style="align-items:center">
    <div>${sectionHead('Une question ?', 'Vin nature, biodynamie ou classique : l\'équipe vous conseille selon ce que vous mangez et ce que vous aimez.')}</div>
    <div class="card" data-reveal><h3>Quelques mots pour vous aider</h3><p class="muted">« Un rouge léger pour la terrine ? Un blanc tendu pour le lieu noir ? » Dites-nous ce que vous avez choisi, on vous accompagne jusqu'à la cave.</p></div>
  </div>
</section>
${reserveBand('Un verre au comptoir ?')}`)

boot()

// ---- cocktail filter
const cf: Record<string, string> = { Type: 'all' }
$$('#cocktail-grid').length && $$('[data-g="Type"]').forEach((b) => b.addEventListener('click', () => {
  cf.Type = b.dataset.v!
  $$('[data-g="Type"]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
  $$('#cocktail-grid > div').forEach((d) => (d.hidden = cf.Type !== 'all' && d.dataset.kind !== cf.Type))
}))

// ---- cave: shelf, drag with inertia, filters, Flip to the table
const shelf = $('#shelf')!, slot = $('#cave-slot')!, card = $('#cave-card')!, countEl = $('#cave-count')!
const f: { Couleur: string; Style: string; Corps: string } = { Couleur: 'all', Style: 'all', Corps: 'all' }
let selected: string | null = null
const byId = new Map(cave.map((b) => [b.id, b]))
const mk = (b: Bottle) => {
  const el = document.createElement('button')
  el.type = 'button'; el.className = 'bottle'; el.dataset.id = b.id; el.setAttribute('aria-pressed', 'false')
  el.setAttribute('aria-label', `${b.name}, ${b.couleur}, ${b.style}. Poser sur la table.`)
  el.innerHTML = bottle(b.couleur, b.style)
  return el
}
cave.forEach((b) => shelf.append(mk(b)))
const matches = (b: Bottle) => (f.Couleur === 'all' || b.couleur === (f.Couleur as Couleur)) && (f.Style === 'all' || b.style === (f.Style as StyleVin)) &&
  (f.Corps === 'all' || (f.Corps === 'light' ? b.body <= 2 : f.Corps === 'mid' ? b.body === 3 : b.body >= 4))
const refresh = () => {
  let n = 0
  $$<HTMLElement>('.bottle', shelf).forEach((el) => { const b = byId.get(el.dataset.id ?? el.dataset.gapFor ?? ''); if (!b) return; const ok = matches(b); el.hidden = !ok; if (ok) n++ })
  countEl.textContent = `${n} bouteille${n > 1 ? 's' : ''} sur l'étagère`
}
$$('#cave-filters .chip').forEach((b) => b.addEventListener('click', () => {
  const g = b.dataset.g as keyof typeof f
  f[g] = b.dataset.v!
  $$(`[data-g="${g}"]`).forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
  refresh()
}))
refresh()

const cardHTML = (b: Bottle) => `<div class="cave-card__in"><span class="label">${b.couleur} · ${b.style}</span><h3>${esc(b.name)}</h3>
  <dl><dt>Cépage</dt><dd>${esc(b.grape)}</dd><dt>Région</dt><dd>${esc(b.region)}</dd><dt>Corps</dt><dd>${bodyLabel[b.body]}</dd><dt>Au verre</dt><dd>${esc(b.note)}</dd><dt>Avec quoi ?</dt><dd>Avec ${esc(b.pairing)}.</dd></dl>
  <button type="button" class="btn btn--sm" id="putback"><i class="ph ph-arrow-left" aria-hidden="true"></i> Remettre sur l'étagère</button></div>`

async function putBack(animate = true) {
  if (!selected) return
  const el = slot.querySelector<HTMLElement>('.bottle')
  const gap = shelf.querySelector<HTMLElement>(`[data-gap-for="${selected}"]`)
  if (el && gap) {
    const run = animate && !reduceMotion()
    const kit = run ? await loadKit() : null
    const state = kit?.Flip.getState(el)
    gap.replaceWith(el)
    el.setAttribute('aria-pressed', 'false')
    if (kit && state) kit.Flip.from(state, { duration: 0.7, ease: 'power3.inOut', absolute: true })
  }
  selected = null
}

async function pick(id: string) {
  if (selected === id) return putBack()
  await putBack(false)
  const b = byId.get(id)!
  const el = shelf.querySelector<HTMLElement>(`.bottle[data-id="${id}"]`)!
  const gap = document.createElement('span')
  gap.className = 'bottle is-gap'; gap.dataset.gapFor = id; gap.setAttribute('aria-hidden', 'true')
  el.before(gap)
  const run = !reduceMotion()
  const kit = run ? await loadKit() : null
  const state = kit?.Flip.getState(el)
  slot.replaceChildren(el)
  el.setAttribute('aria-pressed', 'true')
  selected = id
  if (kit && state) kit.Flip.from(state, { duration: 0.85, ease: 'power3.inOut', absolute: true, scale: false })
  card.innerHTML = cardHTML(b)
  const inner = card.firstElementChild!
  if (kit) kit.gsap.fromTo(inner, { rotateY: -80, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 0.7, delay: 0.35, ease: 'power3.out' })
  $('#putback')!.addEventListener('click', () => { putBack(); card.innerHTML = '<p style="color:var(--muted);margin:0">Bouteille remise sur l\'étagère. Choisissez-en une autre.</p>' })
  el.focus({ preventScroll: true })
}

let moved = 0
shelf.addEventListener('click', (e) => {
  if (moved > 6) { e.preventDefault(); return }
  const el = (e.target as HTMLElement).closest<HTMLElement>('.bottle[data-id]')
  if (el) pick(el.dataset.id!)
})
// drag with inertia (mouse / pen; touch uses native scrolling)
let down = false, sx = 0, sl = 0, lastX = 0, lastT = 0, vel = 0
shelf.addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch') return; down = true; moved = 0; sx = e.clientX; sl = shelf.scrollLeft; lastX = e.clientX; lastT = performance.now(); vel = 0 })
addEventListener('pointermove', (e) => {
  if (!down) return
  const dx = e.clientX - sx
  moved = Math.max(moved, Math.abs(dx))
  if (moved > 6) shelf.classList.add('is-drag')
  shelf.scrollLeft = sl - dx
  const t = performance.now()
  vel = (e.clientX - lastX) / Math.max(1, t - lastT)
  lastX = e.clientX; lastT = t
})
addEventListener('pointerup', async () => {
  if (!down) return
  down = false
  shelf.classList.remove('is-drag')
  if (moved > 6 && Math.abs(vel) > 0.1 && !reduceMotion()) {
    const { gsap } = await loadKit()
    gsap.to(shelf, { scrollLeft: shelf.scrollLeft - vel * 420, duration: 0.9, ease: 'power3.out' })
  }
  setTimeout(() => (moved = 0), 0)
})
const scrollBy = (d: number) => shelf.scrollBy({ left: d, behavior: reduceMotion() ? 'auto' : 'smooth' })
$('#sh-prev')!.addEventListener('click', () => scrollBy(-320))
$('#sh-next')!.addEventListener('click', () => scrollBy(320))
shelf.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
  const list = $$<HTMLElement>('.bottle[data-id]', shelf).filter((b) => !b.hidden)
  const i = list.indexOf(document.activeElement as HTMLElement)
  const n = list[Math.min(list.length - 1, Math.max(0, i + (e.key === 'ArrowRight' ? 1 : -1)))]
  if (n) { n.focus(); n.scrollIntoView({ inline: 'center', block: 'nearest', behavior: reduceMotion() ? 'auto' : 'smooth' }); e.preventDefault() }
})
