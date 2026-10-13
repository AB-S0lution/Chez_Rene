import '../style.css'
import { faq } from '../data/faq'
import { $, $$, esc, setMain } from '../core/dom'
import { scene, tessBand } from '../core/art'
import { boot } from '../core/shell'
import { pageHero, reserveBand, photoStrip } from '../core/ui'
import { pick } from '../data/photos'

const tags = ['Toutes', ...new Set(faq.flatMap((f) => f.tags))]
setMain(`
${pageHero({ label: 'Questions fréquentes', title: 'Vous vous demandez ?', lead: 'Quinze réponses courtes. Quand un point reste à confirmer, nous l\'indiquons.', art: scene('plaque', 300, '') })}
${tessBand(60, 15)}
<section class="section">
  <div class="wrap" style="max-width:900px">
    <div class="searchbox"><i class="ph ph-magnifying-glass" aria-hidden="true"></i><label class="sr-only" for="faq-q">Chercher dans les questions</label><input id="faq-q" type="search" placeholder="Chercher : vin, groupe, horaires" autocomplete="off"></div>
    <div class="tabs" role="group" aria-label="Filtrer par thème">${tags.map((t, i) => `<button class="chip" type="button" data-t="${t}" aria-pressed="${i === 0}">${t[0].toUpperCase() + t.slice(1)}</button>`).join('')}</div>
    <p id="faq-count" class="note" role="status"></p>
    <div class="acc" id="faq-list">${faq.map((f) => `<details data-tags="${f.tags.join(' ')}" data-text="${esc((f.q + ' ' + f.a).toLowerCase())}"><summary><span>${esc(f.q)}</span><i class="ph ph-plus" aria-hidden="true"></i></summary><div class="ans"><p>${esc(f.a)}${f.confirm ? ' <span class="flag">À confirmer</span>' : ''}</p></div></details>`).join('')}</div>
    <div class="empty" id="faq-empty" hidden>Aucune question ne correspond. Appelez-nous au 09 81 75 93 50.</div>
  </div>
</section>
${photoStrip(pick('cave-etagere', 'oeuf-legumes', 'micro-scene'))}
${reserveBand('Une autre question ?')}`)
boot()
let tag = 'Toutes'
const run = () => {
  const q = ($('#faq-q') as HTMLInputElement).value.trim().toLowerCase()
  let n = 0
  $$<HTMLDetailsElement>('#faq-list details').forEach((d) => {
    const ok = (tag === 'Toutes' || d.dataset.tags!.split(' ').includes(tag)) && (!q || d.dataset.text!.includes(q))
    d.hidden = !ok; if (ok) n++
  })
  $('#faq-count')!.textContent = `${n} question${n > 1 ? 's' : ''}`
  ;($('#faq-empty') as HTMLElement).hidden = n > 0
}
$('#faq-q')!.addEventListener('input', run)
$$('[data-t]').forEach((b) => b.addEventListener('click', () => { tag = b.dataset.t!; $$('[data-t]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); run() }))
run()
