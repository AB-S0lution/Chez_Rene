import '../style.css'
import { occasions, groupFormulas } from '../data/groupes'
import { espaces } from '../data/espaces'
import { business } from '../data/business'
import { euro, setMain } from '../core/dom'
import { scene, tessBand } from '../core/art'
import { boot } from '../core/shell'
import { pageHero, sectionHead, reserveBand, photoBand } from '../core/ui'
import { pick } from '../data/photos'

setMain(`
${pageHero({ label: 'Repas de groupe', title: 'Une grande tablée, sans cérémonie.', lead: 'Anniversaires, séminaires, conférences, repas d\'équipe : Chez René accueille les groupes, sur demande.', art: scene('alcove', 300, '') })}
${tessBand(60, 14)}
<section class="section">
  <div class="wrap">${sectionHead('Les occasions.')}
    <div class="grid4">${occasions.map((o) => `<article class="card" data-reveal><h3><i class="ph ${o.icon}" aria-hidden="true"></i> ${o.title}</h3><p class="muted">${o.text}</p></article>`).join('')}</div></div>
</section>
<section class="section section--alt">
  <div class="wrap">${sectionHead('Les salles qui s\'y prêtent.', 'La capacité d\'accueil n\'est pas communiquée : elle se discute avec la maison.')}
    <div class="grid3">${espaces.slice(0, 4).map((e, i) => `<article class="card" style="padding:0;overflow:hidden" data-reveal><div style="aspect-ratio:16/10">${scene(['comptoir', 'tables', 'alcove', 'pub'][i], 300, e.name)}</div><div style="padding:18px"><h3 style="font-size:1.2rem">${e.name}</h3><p class="muted" style="margin:0;font-size:.95rem">${e.real}</p></div></article>`).join('')}</div></div>
</section>
<section class="section">
  <div class="wrap">${sectionHead('Des formules, à titre d\'exemple.', 'Exemple, sur devis. Les vraies formules de groupe se construisent avec la maison.')}
    <div class="grid3">${groupFormulas.map((g) => `<article class="card" data-reveal><div class="card__top"><h3 style="margin:0">${g.name}</h3><span class="sample">Exemple</span></div><p style="font-family:var(--font-display);font-size:2.4rem;margin:6px 0">${euro(g.price)}<small style="font-size:.4em"> par personne</small></p><ul class="muted">${g.includes.map((i) => `<li>· ${i}</li>`).join('')}</ul></article>`).join('')}</div></div>
</section>
${photoBand(pick('tablee', 'tablee-bougies', 'planche', 'salle-soir'), 'À plusieurs, autour de la table.', 'Planches à partager, grandes tablées, lumière basse. Photos d\'illustration.')}
<section class="section velvet">
  <div class="wrap" style="display:grid;gap:20px;justify-items:start"><h2 style="font-size:clamp(2rem,5vw,3.6rem);max-width:16ch" data-reveal>Faire une demande de groupe.</h2>
    <p style="color:var(--muted)" data-reveal>Le formulaire de la maison est hébergé sur son site actuel. Pour une question rapide, appelez.</p>
    <div style="display:flex;flex-wrap:wrap;gap:12px" data-reveal><a class="btn btn--primary magnetic" href="${business.groupUrl}" target="_blank" rel="noopener">Demande de groupe en ligne</a><a class="btn" href="${business.phoneHref}"><i class="ph ph-phone" aria-hidden="true"></i> ${business.phone}</a></div></div>
</section>
${reserveBand('Plutôt une table pour deux ?')}`)
boot()
