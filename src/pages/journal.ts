import '../style.css'
import { posts } from '../data/journal'
import { photos } from '../data/photos'
import { $, $$, setMain } from '../core/dom'
import { scene, tessBand } from '../core/art'
import { boot } from '../core/shell'
import { pageHero, reserveBand, postCard } from '../core/ui'

const tags = ['Tous', ...new Set(posts.map((p) => p.tag))]
setMain(`
${pageHero({ label: 'Le Journal', title: 'Coulisses, produits et quartier.', lead: 'Dix articles d\'exemple pour la démonstration, dont deux appuyés sur des faits publics et sourcés.', art: scene('terrine', 300, '') })}
${tessBand(60, 9)}
<section class="section">
  <div class="wrap">
    <div class="tabs" role="group" aria-label="Filtrer par thème">${tags.map((t, i) => `<button class="chip" type="button" data-t="${t}" aria-pressed="${i === 0}">${t}</button>`).join('')}</div>
    <div class="grid3" id="posts" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))">${posts.map((p, i) => `<div data-tag="${p.tag}">${postCard(p, photos[(i * 7 + 3) % photos.length])}</div>`).join('')}</div>
  </div>
</section>
${reserveBand()}`)
boot()
$$('[data-t]').forEach((b) => b.addEventListener('click', () => {
  $$('[data-t]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
  $$('#posts > div').forEach((d) => (d.hidden = b.dataset.t !== 'Tous' && d.dataset.tag !== b.dataset.t))
}))
void $
