import '../style.css'
import { jobs, team } from '../data/misc'
import { business } from '../data/business'
import { setMain } from '../core/dom'
import { scene, tessBand } from '../core/art'
import { boot } from '../core/shell'
import { pageHero, sectionHead, reserveBand } from '../core/ui'

setMain(`
${pageHero({ label: 'Nous recrutons', title: 'Nous recrutons !', lead: 'Cuisine, bar, salle : une petite équipe, un bistrot qui bouge. Déposez votre CV.', art: scene('comptoir', 300, '') })}
${tessBand(60, 18)}
<section class="section">
  <div class="wrap">${sectionHead('Trois métiers.', 'Postes d\'exemple pour la démonstration. Les vraies offres se trouvent auprès de la maison.')}
    <div class="grid3">${jobs.map((j) => `<article class="card" data-reveal><div class="card__top"><span class="sample">${j.contract}</span></div><h3>${j.title}</h3><p class="muted">${j.text}</p><ul class="muted">${j.points.map((p) => `<li>· ${p}</li>`).join('')}</ul></article>`).join('')}</div>
  </div>
</section>
<section class="section section--alt">
  <div class="wrap grid2">
    <div>${sectionHead('Comment candidater ?')}
      <p data-reveal>Aucune adresse e-mail n'est publiée. Le plus simple : passer au bistrot avec votre CV, ou appeler le ${business.phone}.</p>
      <p data-reveal><a class="btn btn--primary" href="${business.phoneHref}">Appeler</a></p></div>
    <div>${sectionHead('L\'équipe.')}<div style="display:grid;gap:12px">${team.map((t) => `<div class="card" data-reveal><h3 style="font-size:1.2rem"><i class="ph ${t.icon}" aria-hidden="true"></i> ${t.title}</h3><p class="muted" style="margin:0">${t.text}</p></div>`).join('')}</div></div>
  </div>
</section>
${reserveBand()}`)
boot()
