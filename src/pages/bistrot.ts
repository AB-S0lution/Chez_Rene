import '../style.css'
import { espaces } from '../data/espaces'
import { press } from '../data/press'
import { team, stats } from '../data/misc'
import { setMain, url } from '../core/dom'
import { photos } from '../data/photos'
import { photoBand } from '../core/ui'
import { scene, tessBand, plate } from '../core/art'
import { boot } from '../core/shell'
import { pageHero, sectionHead, reserveBand, mediaCard, rolePhoto } from '../core/ui'
import { photo } from '../data/photos'

const kinds = ['comptoir', 'tables', 'alcove', 'pub', 'cave']
setMain(`
${pageHero({ label: 'Le bistrot', title: 'Authenticité et simplicité.', lead: 'Une cuisine bistrot, généreuse, gourmande, faite maison. Dans une atmosphère intimiste et conviviale, où l\'on prend le temps.', art: scene('sunburst', 300, '') })}
${tessBand(60, 8)}
<section class="section">
  <div class="wrap grid2">
    <div>
      ${sectionHead('Fait maison et de saison.')}
      <p data-reveal>Chez René, tout se prépare sur place, avec des produits frais et de saison, en circuit court majoritairement, avec des produits locaux. La carte change chaque semaine.</p>
      <p class="muted" data-reveal>Elle s'organise autour de trois thèmes : la terre, la mer et les veggies, sans oublier une sélection de charcuteries et de fromages. Il y a toujours une option végétarienne.</p>
    </div>
    <div class="grid3" style="grid-template-columns:1fr">
      <div class="card" data-reveal><h3><i class="ph ph-fire" aria-hidden="true"></i> La terre</h3><p class="muted">Onglet, poitrine de cochon, boudin noir, terrine de campagne.</p></div>
      <div class="card" data-reveal><h3><i class="ph ph-fish" aria-hidden="true"></i> La mer</h3><p class="muted">Lieu noir breton, seiche persillée, rillettes de thon.</p></div>
      <div class="card" data-reveal><h3><i class="ph ph-leaf" aria-hidden="true"></i> Les veggies</h3><p class="muted">Potimarron rôti, pleurote, risotto de sarrasin, l'œuf qui se met au vert.</p></div>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    ${sectionHead('Quatre salles en enfilade, et une cave.', 'Des espaces qui se suivent, du mobilier vintage chiné au fil du temps, une ambiance feutrée.')}
    <div class="grid2">${espaces.map((e, i) => `<article class="card" style="padding:0;overflow:hidden" data-reveal><div style="aspect-ratio:16/9">${scene(kinds[i], 300, e.name)}</div><div style="padding:22px"><h3>${e.name}</h3><p class="muted">${e.real}</p><p>${e.extra}</p></div></article>`).join('')}</div>
    <p class="note" style="margin-top:18px">Le nombre de places n'est pas communiqué.</p>
  </div>
</section>

<section class="section">
  <div class="wrap grid2">
    <div>${sectionHead('Une ambiance unique.')}
      <p data-reveal>S'ambiancer entre amis, sans chichi : des soirées à thème en semaine.</p>
      <ul style="display:grid;gap:12px;margin-top:20px" data-reveal>
        <li class="card"><h3><i class="ph ph-music-notes" aria-hidden="true"></i> Blind test</h3><p class="muted">Des équipes, des manches, des fous rires.</p></li>
        <li class="card"><h3><i class="ph ph-microphone-stage" aria-hidden="true"></i> Karaoké</h3><p class="muted">Le micro passe de table en table.</p></li>
        <li class="card"><h3><i class="ph ph-martini" aria-hidden="true"></i> Soirées cocktails</h3><p class="muted">Cocktails classiques et signature, créations sur mesure.</p></li>
      </ul>
      <p style="margin-top:20px"><a class="btn" href="${url('agenda/')}">Voir l'agenda</a></p></div>
    <div>${sectionHead('Un lieu, plusieurs vies.', 'Les lieux d\'un quartier ont une mémoire. Cette chronologie est à confirmer avec la maison.')}
      <ol class="timeline" data-reveal>
        <li><h3>Un bar de quartier</h3><p>Une adresse où l'on boit un verre depuis longtemps, boulevard Laënnec.</p></li>
        <li><h3>Un bistrot moderne, puis un bistrot culturel et solidaire</h3><p>Concerts, expositions et rencontres entre 2020 et 2023, quatre salles en enfilade.</p></li>
        <li><h3>Un bistrot et bar à manger</h3><p>Une nouvelle équipe reprend les lieux en décembre 2023.</p></li>
        <li><h3>Chez René</h3><p>À l'automne 2025, la maison choisit un nom plus simple et recentre son offre : un vrai bistrot de quartier.</p></li>
      </ol></div>
  </div>
</section>

${photoBand(photos.filter((p) => p.theme === 'salle' || p.theme === 'cuisine'), 'Salle par salle.', 'Lumière basse, lampes anciennes, cuisine ouverte sur la semaine.')}

<section class="section velvet" style="color:var(--creme)" aria-labelledby="rene">
  <div class="wrap grid2" style="align-items:center">
    <div data-reveal><a class="plaquebig" href="${url('journal/article/?p=pourquoi-rene')}" aria-label="Boulevard René Laennec"><span class="a">Boulevard</span><span class="b">René Laennec</span></a></div>
    <div>
      <h2 id="rene" style="font-size:clamp(2rem,4vw,3.2rem)" data-reveal>Qui est René ?</h2>
      <p data-reveal style="color:var(--muted)">Ce n'est pas le patron. René, c'est René Laennec, l'inventeur breton du stéthoscope, dont le nom figure sur les plaques de rue du boulevard. La maison l'a adopté comme un esprit de maison : on le retrouve dans la terrine de René aux morilles.</p>
      <p data-reveal><a class="btn btn--link" href="${url('journal/article/?p=pourquoi-rene')}">Lire l'article</a></p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="presse">
  <div class="wrap">
    ${sectionHead('Dans la presse.')}
    <h3 id="presse" class="sr-only">Presse</h3>
    <p class="chip" data-reveal style="margin-bottom:24px"><i class="ph ph-trophy" aria-hidden="true"></i> Finaliste du Championnat de Bretagne de l'œuf mayonnaise (ASOM) 2026</p>
    <div class="grid3">${press.map((p) => `<a class="card card--link" href="${p.url}" target="_blank" rel="noopener" data-reveal><span class="label">${p.source}</span><h3 style="margin-top:8px;font-size:1.2rem">${p.title}</h3><p class="muted" style="font-size:.95rem">${p.excerpt}</p><span class="note">${p.date}</span></a>`).join('')}</div>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    ${sectionHead('L\'équipe.', 'Trois métiers, un même sourire. Les prénoms restent à la maison.')}
    <div class="grid3">${team.map((t) => mediaCard(photo(rolePhoto[t.id]), `<h3><i class="ph ${t.icon}" aria-hidden="true"></i> ${t.title}</h3><p class="muted">${t.text}</p>`)).join('')}</div>
    <div class="stats" style="margin-top:36px">${stats.slice(0, 4).map((s) => `<div class="stat" data-reveal><b>${s.value}${s.suffix}</b><span>${s.label}</span></div>`).join('')}</div>
  </div>
</section>
${reserveBand()}`)
void plate
boot()
