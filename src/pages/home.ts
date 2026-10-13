import '../style.css'
import { business } from '../data/business'
import { espaces } from '../data/espaces'
import { ardoises } from '../data/ardoises'
import { upcoming } from '../data/events'
import { reviews } from '../data/reviews'
import { ratings } from '../data/ratings'
import { cave } from '../data/cave'
import { $, $$, reduceMotion, setMain, url } from '../core/dom'
import { heroMirror, plate, scene, tessBand, bottle } from '../core/art'
import { boot } from '../core/shell'
import { loadKit } from '../core/motion'
import { mountArdoise, mountQuotes, posterCard, hoursTable, statusPill, sectionHead, photoImg, photoBand } from '../core/ui'
import { stops } from '../data/transport'
import { photo, photos } from '../data/photos'

const rooms = espaces.map((e, i) => {
  const kind = ['comptoir', 'tables', 'alcove', 'pub', 'cave'][i]
  return `<article class="room" data-room="${i}" aria-labelledby="room-${e.id}">
    <div class="room__scene">${scene(kind, 300, e.name)}<div class="room__door"></div></div>
    <div class="room__copy"><span class="label">${e.kind === 'cave' ? 'Une étape' : 'Une salle'}</span><h3 id="room-${e.id}">${e.name}</h3><p>${e.real}</p><p>${e.extra}</p></div>
  </article>`
}).join('')

const today = new Date().toISOString().slice(0, 10)
const next3 = upcoming.filter((e) => e.date >= today).slice(0, 3)
const feat = reviews.filter((r) => r.featured && r.publish)

function render() {
  const main = setMain(`
<section class="hero velvet" id="accueil" aria-label="Chez René">
  <div class="curtain" aria-hidden="true"><div></div><div></div></div>
  <div class="wrap hero__grid">
    <div class="hero__copy">
      ${statusPill()}
      <p class="hero__tag">Ici, pas de chichi.</p>
      <p class="hero__sub">Un bistrot simple, vivant et chaleureux, où l'on prend le temps de partager.</p>
      <div class="hero__cta">
        <a class="btn btn--primary magnetic" href="${url('reserver/')}">Réserver</a>
        <a class="btn" href="${url('cartes/')}">Les cartes</a>
      </div>
    </div>
    <div class="hero__mirror">
      ${heroMirror()}
      <h1 class="hero__word" aria-label="Chez René, bistrot de quartier à Rennes"><span class="l1" aria-hidden="true">Chez</span><span class="l2" aria-hidden="true">René</span></h1>
    </div>
  </div>
</section>
${tessBand(60, 5)}

<section class="section" aria-labelledby="bienvenue">
  <div class="wrap intro">
    <div>
      <span class="label" data-reveal>Bienvenue</span>
      <h2 id="bienvenue" class="intro__quote" style="margin-top:14px" data-reveal>Bienvenue Chez René, votre bistrot de quartier à Rennes.</h2>
    </div>
    <div>
      <p style="font-size:1.25rem" data-reveal>L'âme des bistrots d'hier avec une touche d'aujourd'hui : des plats faits maison, préparés avec des produits frais et de saison.</p>
      <p class="muted" data-reveal>La carte change chaque semaine, autour de la terre, de la mer et des veggies, sans oublier une sélection de charcuteries et de fromages. Un bar à cocktails, une cave où l'on va choisir sa bouteille soi-même, et des prix qui ne font pas peur.</p>
      <div class="intro__chips" data-reveal><span class="chip">Fait maison</span><span class="chip">De saison</span><span class="chip">Circuit court, majoritairement</span><span class="chip chip--veg">Toujours une option veggie</span></div>
    </div>
  </div>
</section>


<section class="ph-feature" aria-label="Ambiance">
  <div class="ph-feature__row">
    <figure class="ph-feature__big" data-reveal>${photoImg(photo('bar-tabourets'))}</figure>
    <figure data-reveal>${photoImg(photo('cocktail-coupe'))}</figure>
    <figure data-reveal>${photoImg(photo('cave-etagere'))}</figure>
  </div>
  <p class="ph-feature__cap"><span class="ph__tag">Photo d'illustration</span> Unsplash, pas des photos de la maison.</p>
</section>

<section class="enf enf--list" id="enfilade" aria-labelledby="enf-title">
  <div class="wrap enf__head"><span class="label">L'enfilade</span><h2 id="enf-title" style="margin-top:12px">Entrez, on vous fait traverser la maison.</h2><p>Des salles qui se suivent, du comptoir à la cave. La lumière baisse d'une pièce à l'autre.</p></div>
  <div class="enf__stage" id="enf-stage">
    <p class="enf__hint" aria-hidden="true"><i class="ph ph-hand-swipe-left"></i> Glissez pour traverser les salles</p>
    <div class="enf__track" id="enf-track">${rooms}</div>
    <div class="enf__dim" aria-hidden="true"></div>
    <div class="enf__nav"><div class="enf__floor" aria-hidden="true"><i></i></div>
      <div class="enf__stops" role="group" aria-label="Aller à une salle">${espaces.map((e, i) => `<button type="button" data-go="${i}" ${i === 0 ? 'aria-current="true"' : ''}>${e.name.replace(/^L[ea]s? |^L'/, '')}</button>`).join('')}</div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="ardoise-title">
  <div class="wrap">
    ${sectionHead('L\'ardoise de la semaine.', 'Chaque lundi, quatre ou cinq entrées, autant de plats et de desserts. Feuilletez les semaines passées.')}
    <h3 id="ardoise-title" class="sr-only">Ardoise</h3>
    <div id="ardoise-home"></div>
    <p style="margin-top:22px" data-reveal><a class="btn btn--link" href="${url('cartes/')}">Voir la carte réelle de la semaine</a></p>
  </div>
</section>

<section class="section section--alt" aria-labelledby="sig-title">
  <div class="wrap">
    ${sectionHead('Les plats qu\'on vous raconte.', 'Tels qu\'ils figurent sur la carte du soir.')}
    <h3 id="sig-title" class="sr-only">Plats signature</h3>
    <div class="bento">
      <article class="dish dish--egg b1" data-reveal><div class="dish__art" aria-hidden="true">${plate('egg')}</div><div class="dish__body"><div class="dish__row"><h3>Mon œuf se met au vert</h3><span class="dish__price">5 €</span></div><p>Mayonnaise aux herbes et miso, pesto roquette-basilic-noisette. Le plat emblème de la maison.</p></div></article>
      <article class="dish dish--b2 b2" data-reveal><div class="dish__art" aria-hidden="true">${plate('terrine')}</div><div class="dish__body"><div class="dish__row"><h3>Terrine de René aux morilles</h3><span class="dish__price">6 €</span></div></div></article>
      <article class="dish dish--b3 b3" data-reveal><div class="dish__art" aria-hidden="true">${plate('mousse')}</div><div class="dish__body"><div class="dish__row"><h3>Mousse au chocolat fleur de sel</h3><span class="dish__price">6 €</span></div></div></article>
      <article class="dish dish--b4 b4" data-reveal><div class="dish__art" aria-hidden="true">${plate('cote')}</div><div class="dish__body"><div class="dish__row"><h3>Côte de bœuf</h3><span class="dish__price">50 €/kg</span></div><p>Environ 1 kg, grenailles. À partager.</p></div></article>
      <article class="dish dish--b5 b5" data-reveal><div class="dish__art" aria-hidden="true">${plate('vitello')}</div><div class="dish__body"><div class="dish__row"><h3>Vitello tonnato</h3><span class="dish__price">8 €</span></div></div></article>
    </div>
  </div>
</section>

${photoBand(photos.filter((p) => ['assiette', 'marche', 'cuisine'].includes(p.theme)).slice(0, 8), 'Du marché à l\'assiette.', 'Produits frais, de saison, cuisinés sur place. Une idée de l\'ambiance, en photos d\'illustration.')}

<section class="section formula" aria-labelledby="formule-title">
  <div class="wrap">
    <h2 id="formule-title" class="sr-only">La formule du midi</h2>
    <p class="label" style="color:var(--glow)">La formule du midi, du lundi au vendredi</p>
    <div class="formula__grid">
      <div class="formula__item"><div class="formula__num"><span data-count="12">12</span><small>€</small></div><p class="formula__what">Le plat</p></div>
      <div class="formula__item"><div class="formula__num"><span data-count="16.5" data-dec="2">16,50</span><small>€</small></div><p class="formula__what">Entrée + plat ou plat + dessert</p></div>
      <div class="formula__item"><div class="formula__num"><span data-count="21">21</span><small>€</small></div><p class="formula__what">Entrée + plat + dessert</p></div>
    </div>
    <p class="formula__pride" data-reveal>« Du bon avec des prix d'il y a six ou sept ans. »<cite>Nicolas Potier, gérant, à Ouest-France, 23 septembre 2025</cite></p>
  </div>
</section>

<section class="section" aria-labelledby="cave-title">
  <div class="wrap">
    ${sectionHead('Pas de carte des vins. Levez-vous.', 'Côté vins, pas de carte imposée : à vous de vous lever et d\'aller choisir directement dans notre espace cave, comme à la maison.')}
    <h3 id="cave-title" class="sr-only">La cave</h3>
    <div class="shelfwrap" data-reveal><div class="shelf" aria-hidden="true" style="cursor:default">${cave.slice(0, 22).map((b) => `<span class="bottle" style="padding-bottom:22px">${bottle(b.couleur, b.style)}</span>`).join('')}</div></div>
    <p style="margin-top:26px" data-reveal><a class="btn btn--primary" href="${url('le-bar/#cave')}">Choisir une bouteille</a></p>
    <p class="note" style="margin-top:12px" data-reveal>Bouteilles d'exemple pour la démonstration. Demandez conseil à l'équipe.</p>
  </div>
</section>

<section class="section section--alt" aria-labelledby="soirees-title">
  <div class="wrap">
    ${sectionHead('Prochaines soirées.', 'Blind test, karaoké, soirées cocktails : en semaine, jamais le week-end.')}
    <h3 id="soirees-title" class="sr-only">Prochaines soirées</h3>
    <div class="posters">${next3.map((e, i) => posterCard(e, i)).join('')}</div>
    <p style="margin-top:26px" data-reveal><a class="btn btn--link" href="${url('agenda/')}">Tout l'agenda</a> <span class="note">Dates d'exemple.</span></p>
  </div>
</section>

<section class="section voice" aria-labelledby="voix-title">
  <div class="wrap">
    ${sectionHead('Ils en parlent.', '')}
    <h3 id="voix-title" class="sr-only">Avis clients</h3>
    <div class="voice__stage">
      <div id="quotes-home"></div>
      <div class="score" data-reveal><div class="score__big">4,9<small> / 5</small></div><p class="muted" style="margin:0">Environ, sur toutes les plateformes. Notes relevées le 13 octobre 2026.</p>
        <ul>${ratings.slice(0, 3).map((r) => `<li><span>${r.platform}</span><b>${String(r.score).replace('.', ',')}</b></li>`).join('')}</ul>
        <a class="btn btn--link" href="${url('avis/')}">Tous les avis et la presse</a></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="infos-title">
  <div class="wrap">
    ${sectionHead('Infos pratiques.')}
    <h3 id="infos-title" class="sr-only">Horaires et accès</h3>
    <div class="info">
      <div data-reveal><h3>Horaires</h3>${hoursTable()}</div>
      <div data-reveal><h3>Adresse</h3><address style="font-style:normal;font-size:1.15rem">${business.address.street}<br>${business.address.zip} ${business.address.city}<br><span class="muted">Près du quartier Saint-Hélier</span></address>
        <p style="margin-top:16px"><a class="btn btn--primary btn--sm" href="${business.phoneHref}"><i class="ph ph-phone" aria-hidden="true"></i> Appeler</a></p>
        <p><a href="${business.mapsUrl}" target="_blank" rel="noopener">Voir sur la carte</a> · <a href="${url('nous-trouver/')}">Plan et accès</a></p></div>
      <div data-reveal><h3>Y venir</h3><ul class="stops">${stops.slice(0, 4).map((s) => `<li><span>${s.name} <span class="muted">(${s.lines})</span></span><span>${s.meters} m</span></li>`).join('')}</ul><p class="note">Distances à vol d'oiseau.</p></div>
    </div>
  </div>
</section>

<section class="section velvet" style="color:var(--creme)" aria-labelledby="insta-title">
  <div class="wrap" style="display:grid;gap:20px;justify-items:start">
    <h2 id="insta-title" style="font-size:clamp(2rem,5vw,3.8rem);max-width:15ch" data-reveal>Les plats du jour, sur Instagram.</h2>
    <p style="color:var(--muted)" data-reveal>Suivez @chezrene_rennes pour voir l'ardoise de la semaine et les soirées à venir.</p>
    <div style="display:flex;flex-wrap:wrap;gap:12px" data-reveal><a class="btn btn--primary magnetic" href="${business.instagram.url}" target="_blank" rel="noopener"><i class="ph ph-instagram-logo" aria-hidden="true"></i> ${business.instagram.handle}</a><a class="btn" style="color:var(--creme)" href="${url('reserver/')}">Réserver</a></div>
  </div>
</section>`)
  return main
}

async function heroIntro() {
  const mirror = $('.hero__mirror')!
  if (reduceMotion()) { mirror.classList.add('is-lit'); return }
  const { gsap, SplitText } = await loadKit()
  const s1 = SplitText.create('.hero__word .l1', { type: 'chars', aria: 'none' })
  const s2 = SplitText.create('.hero__word .l2', { type: 'chars', aria: 'none' })
  const chars = [...s1.chars, ...s2.chars]
  gsap.set(chars, { yPercent: 110, opacity: 0 })
  gsap.set('.hero__copy > *', { opacity: 0, y: 22 })
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
  tl.to('.curtain > div:first-child', { xPercent: -101, duration: 1.2 }, 0.15)
    .to('.curtain > div:last-child', { xPercent: 101, duration: 1.2 }, 0.15)
    .add(() => mirror.classList.add('is-lit'), 0.35)
    .to(chars, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.045 }, 0.55)
    .to('.hero__copy > *', { opacity: 1, y: 0, duration: 0.9, stagger: 0.09 }, 0.9)
    .set('.curtain', { display: 'none' })
  // Parallax: full on desktop, a lighter drift (no scale, smaller travel) on phones and tablets.
  const mm = gsap.matchMedia()
  mm.add({ desk: '(min-width: 900px) and (hover: hover)', touch: '(max-width: 899px), (hover: none)' }, (ctx) => {
    const { desk } = ctx.conditions as { desk: boolean; touch: boolean }
    gsap.to(mirror, { yPercent: desk ? -10 : -5, scale: desk ? 0.94 : 1, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: desk ? true : 0.6 } })
  })
}

async function enfilade() {
  const enf = $('#enfilade')!
  const { gsap, ScrollTrigger, lenis } = await loadKit()
  const track = $('#enf-track')!, stage = $('#enf-stage')!
  const rms = $$('.room', track)
  const mm = gsap.matchMedia()
  mm.add({
    pin: '(min-width: 900px) and (hover: hover) and (prefers-reduced-motion: no-preference)',
    snap: '((max-width: 899px), (hover: none)) and (prefers-reduced-motion: no-preference)',
    list: '(prefers-reduced-motion: reduce)',
  }, (ctx) => {
    const c = ctx.conditions as { pin: boolean; snap: boolean; list: boolean }
    enf.classList.remove('enf--list', 'enf--snap', 'enf--pin')
    if (c.list) { enf.classList.add('enf--list'); return }
    if (c.snap) {
      // Touch: native swipe with scroll-snap (no pin). A thin progress bar under the cards follows the swipe.
      enf.classList.add('enf--snap')
      const bar = $('.enf__floor i')!
      let raf = 0
      const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { const max = track.scrollWidth - track.clientWidth; gsap.set(bar, { scaleX: max > 0 ? Math.max(0.08, track.scrollLeft / max) : 1 }) }) }
      track.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      return () => { track.removeEventListener('scroll', onScroll); gsap.set(bar, { clearProps: 'all' }) }
    }
    enf.classList.add('enf--pin')
    const dist = () => track.scrollWidth - innerWidth
    const bar = $('.enf__floor i')!
    const btns = $$<HTMLButtonElement>('.enf__stops button')
    const dim = $('.enf__dim')!
    const tween = gsap.to(track, { x: () => -dist(), ease: 'none' })
    const st = ScrollTrigger.create({
      trigger: stage, start: 'top top', end: () => `+=${dist()}`, pin: true, anticipatePin: 1, scrub: 1, animation: tween, invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress })
        gsap.set(dim, { opacity: self.progress * 0.42 })
        const idx = Math.round(self.progress * (rms.length - 1))
        btns.forEach((b, i) => (i === idx ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current')))
      },
    })
    rms.forEach((room, i) => {
      if (i === 0) return
      gsap.fromTo($('.room__scene', room), { clipPath: 'inset(16% 26% 0% 26% round 50vh 50vh 0 0)' }, {
        clipPath: 'inset(0% 0% 0% 0% round 14px 14px 14px 14px)', ease: 'none',
        scrollTrigger: { trigger: room, containerAnimation: tween, start: 'left 96%', end: 'left 38%', scrub: true },
      })
    })
    btns.forEach((b, i) => b.addEventListener('click', () => {
      const y = st.start + (i / (rms.length - 1)) * (st.end - st.start)
      if (lenis) lenis.scrollTo(y, { duration: 1.4 }); else scrollTo({ top: y, behavior: 'smooth' })
    }))
    return () => { enf.classList.remove('enf--pin') }
  })
}

render()
boot()
mountArdoise($('#ardoise-home')!, ardoises.slice(0, 6))
mountQuotes($('#quotes-home')!, feat)
heroIntro()
enfilade()
