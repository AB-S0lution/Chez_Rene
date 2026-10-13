import '../style.css'
import { menuMidi, menuSoir } from '../data/menus'
import { ardoises } from '../data/ardoises'
import { business } from '../data/business'
import { $, $$, setMain } from '../core/dom'
import { scene, tessBand } from '../core/art'
import { boot, currentTheme, setTheme } from '../core/shell'
import { pageHero, sectionHead, reserveBand, dishRows, mountArdoise, photoBand } from '../core/ui'
import { pick } from '../data/photos'

setMain(`
${pageHero({ label: 'Les cartes', title: 'Midi, soir, et l\'ardoise.', lead: 'Une carte courte qui change chaque semaine. Tournez le cordon de la lampe pour passer du midi au soir.', art: scene('ardoise', 300, '') })}
${tessBand(60, 4)}
<section class="section">
  <div class="wrap">
    <div class="tabs" role="tablist" aria-label="Choisir la carte">
      <button class="chip" role="tab" id="tab-midi" aria-controls="panel-midi" type="button">Carte du midi</button>
      <button class="chip" role="tab" id="tab-soir" aria-controls="panel-soir" type="button">Carte du soir</button>
    </div>
    <p class="note">Carte de la semaine relevée le 13 octobre 2026, sous réserve de changement.</p>
    <div id="panel-midi" role="tabpanel" aria-labelledby="tab-midi" class="panel">
      <h2 style="font-size:clamp(1.8rem,4vw,2.8rem);margin-bottom:18px">Formule du midi</h2>
      <div class="formula-table">${business.formulas.map((f) => `<div class="f" data-reveal><b>${f.display}</b><span>${f.label}</span></div>`).join('')}</div>
      <p class="muted">Du lundi au vendredi, de 12h à 15h. Duo de fromages en supplément de 2 €.</p>
      ${dishRows(menuMidi)}
    </div>
    <div id="panel-soir" role="tabpanel" aria-labelledby="tab-soir" class="panel" hidden>
      <h2 style="font-size:clamp(1.8rem,4vw,2.8rem);margin-bottom:18px">Carte du soir</h2>
      <div class="formula-table" style="grid-template-columns:1fr"><div class="f"><b>25 à 30 €</b><span>Les trois plats : entrée, plat, dessert. Entrées de 5 à 8 €, plats de 14 à 22 €, desserts de 6 à 7 €.</span></div></div>
      ${dishRows(menuSoir)}
    </div>
  </div>
</section>

${photoBand(pick('oeuf-legumes', 'planche', 'cuisine-marmites', 'tomates-mozza', 'mousse', 'tarte-myrtille', 'dessert-assiette', 'marche-paniers'), 'Dans l\'assiette.', 'Terre, mer et veggies, des produits frais de saison. Photos d\'illustration, pas les plats de la maison.')}
<section class="section section--alt">
  <div class="wrap">
    ${sectionHead('L\'archive de l\'ardoise.', 'Dix semaines d\'exemple, toutes saisons, filtrables par thème. Exemple pour la démonstration.')}
    <div id="ardoise-archive"></div>
  </div>
</section>

<section class="section">
  <div class="wrap grid2">
    <div>${sectionHead('Allergènes.')}<p data-reveal>Demandez à l'équipe : chaque plat peut être expliqué, et la cuisine s'adapte autant que possible aux contraintes alimentaires. La liste détaillée des allergènes par plat n'est pas encore publiée.</p></div>
    <div>${sectionHead('La carte change chaque semaine.')}<p data-reveal>Quatre ou cinq entrées, autant de plats et de desserts, et quelques piliers qui restent : l'œuf mayo, la mousse au chocolat, la côte de bœuf.</p></div>
  </div>
</section>
${reserveBand('Une table pour goûter ?')}`)

boot()
const tabs = { midi: $('#tab-midi')!, soir: $('#tab-soir')! }
const panels = { midi: $('#panel-midi')!, soir: $('#panel-soir')! }
const sync = () => {
  const t = currentTheme()
  ;(['midi', 'soir'] as const).forEach((k) => {
    tabs[k].setAttribute('aria-selected', String(k === t))
    tabs[k].setAttribute('aria-pressed', String(k === t))
    tabs[k].tabIndex = k === t ? 0 : -1
    panels[k].hidden = k !== t
  })
}
$$('[role=tab]').forEach((b) => b.addEventListener('click', (e) => {
  const want = b.id === 'tab-midi' ? 'midi' : 'soir'
  if (want !== currentTheme()) { const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); setTheme(want, { x: r.left + r.width / 2, y: r.top + r.height / 2 }) }
}))
document.addEventListener('themechange', sync)
sync()
mountArdoise($('#ardoise-archive')!, ardoises, { filters: true })
