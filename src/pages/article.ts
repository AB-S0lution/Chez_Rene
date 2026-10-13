import '../style.css'
import { posts } from '../data/journal'
import { esc, frDate, setMain, url } from '../core/dom'
import { scene, tessBand } from '../core/art'
import { boot } from '../core/shell'
import { reserveBand, postCard } from '../core/ui'

const slug = new URLSearchParams(location.search).get('p') ?? posts[0].slug
const p = posts.find((x) => x.slug === slug) ?? posts[0]
const others = posts.filter((x) => x.id !== p.id).slice(0, 3)
document.title = `${p.title} | Chez René`
setMain(`
<section class="phero velvet"><div class="wrap"><a class="btn btn--link" href="${url('journal/')}"><i class="ph ph-arrow-left" aria-hidden="true"></i> Le Journal</a>
  <span class="label" style="margin-top:22px">${esc(p.tag)} · ${frDate(p.date)}</span><h1 id="page-title" data-reveal>${esc(p.title)}</h1><p>${esc(p.excerpt)}</p></div></section>
${tessBand(60, 12)}
<article class="section"><div class="wrap article">
  <div style="aspect-ratio:16/9;border-radius:var(--r);overflow:hidden;margin-bottom:34px" data-reveal>${scene(p.art, 300, p.title)}</div>
  ${p.body.map((t) => `<p data-reveal>${esc(t)}</p>`).join('')}
  <p class="note">${p.grounded ? 'Article appuyé sur des faits publics et sourcés.' : 'Article d\'exemple pour la démonstration.'}</p>
</div></article>
<section class="section section--alt"><div class="wrap"><h2 style="margin-bottom:28px;font-size:clamp(1.8rem,3.4vw,2.6rem)">À lire aussi</h2><div class="grid3">${others.map((p) => postCard(p)).join('')}</div></div></section>
${reserveBand()}`)
boot()
