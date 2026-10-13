import '../style.css'
import { upcoming, pastReal, typeLabel, type EventType } from '../data/events'
import { $, $$, esc, frDate, setMain } from '../core/dom'
import { scene, tessBand } from '../core/art'
import { boot } from '../core/shell'
import { pageHero, sectionHead, reserveBand, posterCard } from '../core/ui'
import { business } from '../data/business'

const types: (EventType | 'all')[] = ['all', 'blindtest', 'karaoke', 'cocktail']
setMain(`
${pageHero({ label: 'Soirées et agenda', title: 'Des soirées en semaine, sans chichi.', lead: 'Blind test, karaoké, soirées cocktails : on s\'ambiance entre amis, du lundi au vendredi. Les dates ci-dessous sont des exemples.', art: scene('lamp', 300, '') })}
${tessBand(60, 6)}
<section class="section">
  <div class="wrap">
    <div class="tabs" role="group" aria-label="Filtrer par type de soirée">${types.map((t, i) => `<button class="chip" type="button" data-t="${t}" aria-pressed="${i === 0}">${t === 'all' ? 'Toutes' : typeLabel[t]}</button>`).join('')}</div>
    <p class="note">Programmation d'exemple pour la démonstration. Les vraies dates se confirment au 09 81 75 93 50.</p>
    <p id="agenda-count" class="note" role="status"></p>
    <div class="posters posters--wide" id="agenda-grid">${upcoming.map((e, i) => posterCard(e, i)).join('')}</div>
  </div>
</section>
<section class="section section--alt">
  <div class="wrap grid2">
    <div>${sectionHead('Comment ça marche ?')}
      <ol class="timeline" data-reveal>
        <li><h3>Réservez une table</h3><p>Par téléphone ou en ligne, en précisant la soirée.</p></li>
        <li><h3>Venez dîner</h3><p>La carte du soir est servie comme d'habitude, avant et pendant la soirée.</p></li>
        <li><h3>Jouez ou chantez</h3><p>Pas de niveau demandé. Le plus important est de participer.</p></li>
      </ol>
      <p style="margin-top:22px"><a class="btn btn--primary" href="${business.phoneHref}">Appeler</a></p></div>
    <div>${sectionHead('Hors les murs.', 'Deux rendez-vous réels, hors du bistrot.')}
      <div style="display:grid;gap:14px">${pastReal.map((p) => `<article class="card" data-reveal><span class="label">${frDate(p.date, true)}</span><h3 style="margin-top:8px">${esc(p.title)}</h3>${p.theme ? `<span class="chip" style="margin-bottom:10px">${p.theme}</span>` : ''}<p class="muted">${esc(p.blurb)}</p><a href="${p.link}" target="_blank" rel="noopener">Voir la source</a></article>`).join('')}</div></div>
  </div>
</section>
<section class="section">
  <div class="wrap">${sectionHead('Soirées passées.', 'Illustrations d\'ambiance, en attendant les photos de la maison.')}
    <div class="grid3">${['lamp', 'cocktail', 'pub'].map((k, i) => `<div class="card" style="padding:0;overflow:hidden;aspect-ratio:4/3" data-reveal>${scene(k, 300, ['Lumière basse', 'Cocktail de saison', 'Dernière salle'][i])}</div>`).join('')}</div></div>
</section>
${reserveBand()}`)
boot()
let cur: string = 'all'
const apply = () => {
  let n = 0
  $$('#agenda-grid .poster').forEach((p) => { const ok = cur === 'all' || p.dataset.type === cur; p.hidden = !ok; if (ok) n++ })
  $('#agenda-count')!.textContent = `${n} soirée${n > 1 ? 's' : ''}`
}
$$('[data-t]').forEach((b) => b.addEventListener('click', () => { cur = b.dataset.t!; $$('[data-t]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); apply() }))
apply()
