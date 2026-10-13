import '../style.css'
import { business } from '../data/business'
import { stops, landmarks } from '../data/transport'
import { setMain } from '../core/dom'
import { scene, tessBand, radialMap } from '../core/art'
import { boot } from '../core/shell'
import { pageHero, sectionHead, reserveBand, hoursTable, statusPill, photoStrip } from '../core/ui'
import { pick } from '../data/photos'

const items = [
  ...stops.filter((s) => s.id !== 't3').map((s) => ({ name: s.name, meters: s.meters, kind: s.mode })),
  ...landmarks.slice(2).map((l) => ({ name: l.name, meters: l.meters, kind: 'lieu' as const })),
]
setMain(`
${pageHero({ label: 'Nous trouver', title: '6 boulevard René Laënnec.', lead: 'À Rennes, près du quartier Saint-Hélier, à deux pas du lycée Laënnec.', art: scene('plaque', 300, '') })}
${tessBand(60, 16)}
<section class="section">
  <div class="wrap info">
    <div data-reveal><h2 style="font-size:1.6rem;margin-bottom:14px">Adresse</h2>
      <address style="font-style:normal;font-size:1.2rem;line-height:1.7">Chez René<br>${business.address.street}<br>${business.address.zip} ${business.address.city}</address>
      <p style="margin-top:16px"><a class="btn btn--primary btn--sm" href="${business.phoneHref}"><i class="ph ph-phone" aria-hidden="true"></i> ${business.phone}</a></p>
      <p><a href="${business.mapsUrl}" target="_blank" rel="noopener">Ouvrir dans OpenStreetMap</a><br><a href="${business.googleMapsUrl}" target="_blank" rel="noopener">Ouvrir dans Google Maps</a></p>
      <p><a href="${business.instagram.url}" target="_blank" rel="noopener"><i class="ph ph-instagram-logo" aria-hidden="true"></i> ${business.instagram.handle}</a></p></div>
    <div data-reveal><h2 style="font-size:1.6rem;margin-bottom:14px">Horaires</h2>${statusPill()}<div style="margin-top:14px">${hoursTable()}</div></div>
    <div data-reveal><h2 style="font-size:1.6rem;margin-bottom:14px">En bus et en métro</h2><ul class="stops">${stops.map((s) => `<li><span>${s.name} <span class="muted">(${s.lines})</span></span><span>${s.meters} m</span></li>`).join('')}</ul><p class="note">Distances à vol d'oiseau. Pas d'information sur le stationnement.</p></div>
  </div>
</section>
${photoStrip(pick('vitrine-nuit', 'lampes-comptoir', 'bar-tabourets'), 'En arrivant le soir')}
<section class="section section--alt">
  <div class="wrap">${sectionHead('Autour de la maison.', 'Un schéma, pas une carte : les points sont placés selon leur distance à vol d\'oiseau.')}
    <div class="map" style="color:var(--text)" data-reveal>${radialMap(items)}</div>
    <p class="note" style="margin-top:12px">Orange : bus. Rose : métro. Vert : lieux du quartier.</p></div>
</section>
${reserveBand()}`)
boot()
