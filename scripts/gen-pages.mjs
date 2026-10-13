// Generates the thin HTML shell of every page (content is rendered by src/pages/*.ts).
// Run once: node scripts/gen-pages.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SITE = 'https://ab-s0lution.github.io/Chez_Rene/'
const pages = [
  ['', 'home', 'Chez René, bistrot de quartier à Rennes', "Bistrot de quartier, bar et cocktails au 6 boulevard René Laënnec à Rennes. Cuisine maison de saison, formule du midi à 21 €, carte qui change chaque semaine."],
  ['le-bistrot', 'bistrot', 'Le bistrot', "Cuisine faite maison et de saison, quatre salles en enfilade, ambiance feutrée et mobilier chiné : le bistrot Chez René, à Rennes."],
  ['cartes', 'cartes', 'Nos cartes : midi et soir', "Formule du midi à 12, 16,50 ou 21 €, carte du soir de 25 à 30 € les trois plats, ardoise qui change chaque semaine. Chez René, Rennes."],
  ['le-bar', 'bar', 'Le bar et l\'espace cave', "Cocktails classiques et signature, mocktails, gin & tonic, bières artisanales et espace cave en libre-service. Le bar de Chez René, Rennes."],
  ['agenda', 'agenda', 'Soirées et agenda', "Blind test, karaoké et soirées cocktails Chez René, en semaine. Dates d'exemple pour la démonstration."],
  ['groupes', 'groupes', 'Repas de groupe et privatisation', "Anniversaires, séminaires, conférences et repas d'équipe Chez René, à Rennes. Demande via le formulaire de l'établissement."],
  ['galerie', 'galerie', 'Galerie', "Velours, cannage, miroirs, plats et cocktails : la galerie illustrée de Chez René."],
  ['journal', 'journal', 'Le Journal', "Le journal de Chez René : coulisses de la carte, histoire du nom, vie du quartier Saint-Hélier."],
  ['journal/article', 'article', 'Article du Journal', "Un article du journal de Chez René, bistrot de quartier à Rennes."],
  ['avis', 'avis', 'Ils en parlent : avis et presse', "Environ 4,9 sur 5 sur toutes les plateformes. Avis clients et presse sur Chez René, bistrot de quartier à Rennes."],
  ['faq', 'faq', 'Questions fréquentes', "Réservation, carte des vins, groupes, accès : les réponses aux questions fréquentes sur Chez René, à Rennes."],
  ['nous-trouver', 'trouver', 'Nous trouver', "6 boulevard René Laënnec, 35000 Rennes, près de Saint-Hélier. Plan, bus, métro, horaires et téléphone."],
  ['reserver', 'reserver', 'Réserver', "Réservez une table Chez René par téléphone au 09 81 75 93 50 ou en ligne. Fermé le week-end."],
  ['recrutement', 'recrutement', 'Nous recrutons', "Chez René recrute en cuisine, au bar et en salle. Postes d'exemple pour la démonstration."],
  ['mentions-legales', 'mentions', 'Mentions légales', "Mentions légales du site de démonstration de Chez René : KARIOCA BSB, SIREN 980 808 307."],
  ['confidentialite', 'confidentialite', 'Confidentialité', "Ce site n'utilise ni cookie ni traceur. Seul le choix midi ou soir est gardé dans votre navigateur."],
  ['plan-du-site', 'plan', 'Plan du site', "Toutes les pages du site de Chez René."],
]

const ld = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': ['Restaurant', 'BarOrPub'],
  name: 'Chez René',
  description: 'Bistrot de quartier, bar et cocktails à Rennes. Cuisine maison de saison, carte qui change chaque semaine.',
  url: SITE,
  telephone: '+33981759350',
  priceRange: '€€',
  servesCuisine: 'Française, bistrot',
  address: { '@type': 'PostalAddress', streetAddress: '6 boulevard René Laënnec', postalCode: '35000', addressLocality: 'Rennes', addressCountry: 'FR' },
  geo: { '@type': 'GeoCoordinates', latitude: 48.1095, longitude: -1.66585 },
  sameAs: ['https://www.instagram.com/chezrene_rennes/'],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '12:00', closes: '15:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '19:00', closes: '01:00' },
  ],
})

for (const [path, mod, title, desc] of pages) {
  const dir = path ? join(process.cwd(), path) : process.cwd()
  mkdirSync(dir, { recursive: true })
  const depth = path ? path.split('/').length : 0
  const url = SITE + (path ? path + '/' : '')
  const full = path === '' ? title : `${title} | Chez René`
  const jsonld = path === '' || path === 'nous-trouver' ? `\n    <script type="application/ld+json">${ld}</script>` : ''
  const html = `<!doctype html>
<html lang="fr" data-theme="soir">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${full}</title>
    <meta name="description" content="${desc}" />
    <link rel="canonical" href="${url}" />
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#101018" />
    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FAF5EF" />
    <meta name="color-scheme" content="dark light" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:site_name" content="Chez René" />
    <meta property="og:title" content="${full}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:card" content="summary" />
    <link rel="icon" type="image/svg+xml" href="{{base}}favicon.svg" />
    <script>
      (function () {
        var d = document.documentElement, t = null;
        try { t = localStorage.getItem('chezrene-theme'); } catch (e) {}
        if (t !== 'midi' && t !== 'soir') {
          var h = new Date().getHours(), dark = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
          t = dark ? 'soir' : (h >= 6 && h < 17 ? 'midi' : 'soir');
        }
        d.setAttribute('data-theme', t);
        d.classList.add('js');
        if (!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) d.classList.add('js-motion');
      })();
    </script>${jsonld}
  </head>
  <body data-page="${mod}" data-depth="${depth}">
    <!--HEADER-->
    <main id="main" tabindex="-1"></main>
    <!--FOOTER-->
    <script type="module" src="/src/pages/${mod}.ts"></script>
  </body>
</html>
`
  writeFileSync(join(dir, 'index.html'), html)
}
console.log('generated', pages.length, 'pages')
