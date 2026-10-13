import '../style.css'
import { business } from '../data/business'
import { setMain } from '../core/dom'
import { boot } from '../core/shell'
import { pageHero } from '../core/ui'

setMain(`
${pageHero({ label: 'Mentions légales', title: 'Mentions légales.', lead: 'Informations sur l\'établissement et sur ce site de démonstration.' })}
<section class="section"><div class="wrap prose">
  <h2>Établissement</h2>
  <dl class="legalgrid">
    <dt>Enseigne</dt><dd>${business.name}</dd>
    <dt>Société</dt><dd>${business.legalName}, ${business.legalForm}</dd>
    <dt>SIREN</dt><dd>${business.siren}</dd>
    <dt>Adresse</dt><dd>${business.address.street}, ${business.address.zip} ${business.address.city}</dd>
    <dt>Téléphone</dt><dd>${business.phone}</dd>
    <dt>Responsable</dt><dd>${business.manager}, gérant</dd>
  </dl>
  <h2>Ce site</h2>
  <p>Ce site est une maquette de démonstration. Il n'a pas été publié par l'établissement. Les contenus signalés « exemple » (ardoises passées, cocktails, bouteilles, dates de soirées, articles, offres d'emploi) sont fictifs. Les adresses, horaires, prix des cartes et avis cités sont relevés sur des sources publiques et peuvent changer.</p>
  <h2>Hébergement</h2>
  <p>Le site est hébergé par GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis).</p>
  <h2>Crédits</h2>
  <p>Illustrations, motifs et animations : créations originales pour ce site. Aucune photographie de l'établissement n'est utilisée. Typographies : Bodoni Moda, Josefin Sans et Karla (licence SIL OFL). Icônes : Phosphor Icons (licence MIT).</p>
  <h2>Avis et presse</h2>
  <p>Les avis sont cités avec la mention de la plateforme et sans nom. Les extraits de presse sont courts et renvoient vers leur source.</p>
</div></section>`)
boot()
