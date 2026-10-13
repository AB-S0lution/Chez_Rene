import '../style.css'
import { setMain } from '../core/dom'
import { boot } from '../core/shell'
import { pageHero } from '../core/ui'

setMain(`
${pageHero({ label: 'Confidentialité', title: 'Confidentialité.', lead: 'Ce site ne vous suit pas.' })}
<section class="section"><div class="wrap prose">
  <h2>Cookies et traceurs</h2>
  <p>Ce site n'utilise aucun cookie, aucun outil de mesure d'audience et aucun traceur publicitaire. Il n'envoie aucune donnée à des tiers.</p>
  <h2>Ce qui est gardé dans votre navigateur</h2>
  <p>Un seul réglage : votre choix entre l'ambiance midi et l'ambiance soir (clé « chezrene-theme » dans le stockage local de votre navigateur). Il reste sur votre appareil et vous pouvez l'effacer à tout moment.</p>
  <h2>Contact</h2>
  <p>Ce site ne comporte aucun formulaire. Pour nous joindre, utilisez le téléphone : 09 81 75 93 50.</p>
  <h2>Liens externes</h2>
  <p>Certains liens mènent vers des sites tiers (Instagram, OpenStreetMap, MangezNotez, presse). Leurs propres règles s'appliquent une fois sur place.</p>
</div></section>`)
boot()
