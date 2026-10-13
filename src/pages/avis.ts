import '../style.css'
import { reviews, genericTestimonials } from '../data/reviews'
import { ratings, praiseThemes } from '../data/ratings'
import { press } from '../data/press'
import { setMain } from '../core/dom'
import { scene, tessBand } from '../core/art'
import { boot } from '../core/shell'
import { pageHero, sectionHead, reserveBand, mountQuotes, photoStrip } from '../core/ui'
import { pick } from '../data/photos'
import { business } from '../data/business'

const shown = reviews.filter((r) => r.publish)
setMain(`
${pageHero({ label: 'Ils en parlent', title: 'Environ 4,9 sur 5, partout.', lead: 'Les notes relevées le 13 octobre 2026 et les mots de celles et ceux qui sont passés par la porte. Cités tels quels, sans nom.', art: scene('monogram', 300, '') })}
${tessBand(60, 7)}
<section class="section">
  <div class="wrap">
    ${sectionHead('Les notes.', 'Chaque plateforme, avec sa date de relevé.')}
    <div class="grid3" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,230px),1fr))">${ratings.map((r) => `<a class="card card--link" href="${r.url}" target="_blank" rel="noopener" data-reveal><span class="label">${r.platform}</span><p style="font-family:var(--font-display);font-size:3rem;line-height:1;margin:10px 0 4px">${String(r.score).replace('.', ',')}<small style="font-size:.38em;color:var(--muted)"> / 5</small></p><p class="muted" style="margin:0">${r.count}</p><span class="note">Relevé le 13 octobre 2026</span></a>`).join('')}</div>
    <p class="note" style="margin-top:14px">Notes relevées sur les sites cités. Elles évoluent.</p>
  </div>
</section>
${photoStrip(pick('salle-tamisee', 'oeuf-legumes', 'mousse', 'cocktail-coupe'), 'Ce que les avis décrivent')}
<section class="section voice">
  <div class="wrap">${sectionHead('Un avis à la fois.')}<div class="voice__stage" style="grid-template-columns:1fr"><div id="quotes-avis"></div></div></div>
</section>
<section class="section">
  <div class="wrap">
    ${sectionHead('Ce qu\'on revient chercher.', 'Les thèmes qui reviennent le plus dans les avis.')}
    <div class="grid3">${praiseThemes.map((t) => `<div class="card" data-reveal><h3 style="font-size:1.25rem">${t.label}</h3><p class="muted" style="margin:0">${t.text}</p></div>`).join('')}</div>
  </div>
</section>
<section class="section section--alt">
  <div class="wrap">
    ${sectionHead('Tous les avis cités.', 'Extraits d\'avis publics, attribués à la plateforme uniquement.')}
    <div class="masonry" style="columns:1">${shown.map((r) => `<blockquote class="card" style="margin:0 0 14px;break-inside:avoid" data-reveal><p style="font-family:var(--font-display);font-size:1.3rem;margin:0 0 10px">${r.text}</p><footer class="note">${r.platform}, ${r.date}${r.note ? ' · ' + r.note : ''}</footer></blockquote>`).join('')}</div>
    <p style="margin-top:20px"><a class="btn" href="${business.mangeznotezUrl}" target="_blank" rel="noopener">Les avis sur MangezNotez</a></p>
  </div>
</section>
<section class="section">
  <div class="wrap">
    ${sectionHead('Dans la presse.', 'À part des avis clients.')}
    <div class="grid3">${press.map((p) => `<a class="card card--link" href="${p.url}" target="_blank" rel="noopener" data-reveal><span class="label">${p.source}</span><h3 style="font-size:1.2rem;margin-top:8px">${p.title}</h3><p class="muted" style="font-size:.95rem">${p.excerpt}</p><span class="note">${p.date}</span></a>`).join('')}</div>
  </div>
</section>
<section class="section section--alt">
  <div class="wrap">
    ${sectionHead('Exemples de témoignages.', 'Textes imaginés pour la démonstration, sans nom ni plateforme. Ils ne sont pas de vrais avis.')}
    <div class="grid3">${genericTestimonials.map((t) => `<div class="card" data-reveal><div class="card__top"><span class="sample">Exemple</span></div><p style="font-family:var(--font-display);font-size:1.15rem">${t.text}</p><span class="note">${t.label}</span></div>`).join('')}</div>
  </div>
</section>
${reserveBand()}`)
boot()
mountQuotes(document.getElementById('quotes-avis')!, shown.filter((r) => r.featured))
