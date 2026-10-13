import '../style.css'
import { business } from '../data/business'
import { setMain, url } from '../core/dom'
import { scene, tessBand } from '../core/art'
import { boot } from '../core/shell'
import { pageHero, sectionHead, hoursTable, statusPill } from '../core/ui'

setMain(`
${pageHero({ label: 'Réserver', title: 'Réserver une table.', lead: 'Le plus rapide, c\'est le téléphone. On vous répond du lundi au vendredi.', art: scene('comptoir', 300, '') })}
${tessBand(60, 17)}
<section class="section">
  <div class="wrap grid2">
    <div>
      <a class="btn btn--primary magnetic" style="--h:64px;font-size:1.05rem;padding:0 2.2rem" href="${business.phoneHref}"><i class="ph ph-phone" aria-hidden="true"></i> ${business.phone}</a>
      <p class="muted" style="margin-top:18px">Pour une table, un groupe ou une soirée à thème. Si nous ne décrochons pas, rappelez un peu plus tard : en plein service, les mains sont prises.</p>
      <div class="card" style="margin-top:26px"><h2 style="font-size:1.4rem;margin-bottom:10px">Ou réserver en ligne</h2>
        <p class="muted">Le module de réservation de la maison est hébergé sur son site actuel.</p>
        <p style="display:flex;gap:10px;flex-wrap:wrap;margin:0"><a class="btn btn--sm" href="${business.bookingUrl}" target="_blank" rel="noopener">Réserver en ligne</a><a class="btn btn--sm" href="${business.mangeznotezUrl}" target="_blank" rel="noopener">MangezNotez</a></p></div>
    </div>
    <div>
      ${statusPill()}
      <div style="margin-top:18px">${hoursTable()}</div>
      <h2 style="font-size:1.4rem;margin:30px 0 10px">Bon à savoir</h2>
      <ul style="display:grid;gap:8px" class="muted">
        <li>· Fermé le samedi et le dimanche.</li>
        <li>· Pour un groupe : <a href="${url('groupes/')}">la page Repas de groupe</a>.</li>
        <li>· Pour une soirée à thème : <a href="${url('agenda/')}">l'agenda</a>.</li>
        <li>· Pas de carte des vins : le vin se choisit à la cave.</li>
      </ul>
    </div>
  </div>
</section>`)
boot()
void sectionHead
