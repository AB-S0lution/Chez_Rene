import '../style.css'
import { setMain, url } from '../core/dom'
import { boot } from '../core/shell'
import { pageHero, photoStrip } from '../core/ui'
import { pick } from '../data/photos'

const links: [string, string][] = [
  ['', 'Accueil'], ['le-bistrot/', 'Le bistrot'], ['cartes/', 'Les cartes'], ['le-bar/', 'Le bar et l\'espace cave'], ['agenda/', 'Soirées et agenda'], ['groupes/', 'Repas de groupe'],
  ['galerie/', 'Galerie'], ['journal/', 'Le Journal'], ['avis/', 'Ils en parlent'], ['faq/', 'Questions fréquentes'], ['nous-trouver/', 'Nous trouver'], ['reserver/', 'Réserver'],
  ['recrutement/', 'Nous recrutons'], ['mentions-legales/', 'Mentions légales'], ['confidentialite/', 'Confidentialité'],
]
setMain(`
${pageHero({ label: 'Plan du site', title: 'Plan du site.', lead: 'Toutes les pages, en une liste.' })}
${photoStrip(pick('salle-tamisee', 'cocktail-coupe', 'oeuf-legumes', 'cave-rayon'))}
<section class="section"><div class="wrap"><ul class="sitemap">${links.map(([p, l]) => `<li><a href="${url(p)}">${l}</a></li>`).join('')}</ul></div></section>`)
boot()
