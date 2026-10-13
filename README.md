# Chez René, site de démonstration

Maquette complète (17 pages) pour **Chez René**, bistrot de quartier, bar et cocktails au 6 boulevard René Laënnec, Rennes.
Front end statique uniquement : Vite + TypeScript + Tailwind v4, aucun backend. Déployé sur GitHub Pages
(`https://ab-s0lution.github.io/Chez_Rene/`, base `/Chez_Rene/`).

Source de vérité du contenu : [`PLAN.md`](./PLAN.md) (faits vérifiés, règles de publication, inconnues).

## Concept : « L'Enfilade »

Le site est la maison parcourue d'avant en arrière : du comptoir à midi à l'espace cave à une heure du matin.
Deux ambiances, **Midi** (crème) et **Soir** (nuit), commutées par la lampe à franges du bandeau (View Transition circulaire).
Palette : velours bleu `#384870`, nuit `#101018`, crème `#FAF5EF`, un seul accent cognac `#C8743F` (`#9A4E26` en mode midi).
Polices : Bodoni Moda (affichage), Josefin Sans (étiquettes), Karla (texte), auto-hébergées via Fontsource.

## Pages

Accueil, Le bistrot, Les cartes, Le bar (avec l'espace cave interactif), Soirées et agenda, Repas de groupe, Galerie, Le Journal
(+ page article `journal/article/?p=<slug>`), Ils en parlent, FAQ, Nous trouver, Réserver, Nous recrutons, Mentions légales,
Confidentialité, Plan du site, 404.

Chaque page = un `index.html` mince (généré par `scripts/gen-pages.mjs`) + un module `src/pages/<nom>.ts` qui rend le contenu
depuis `src/data/*.ts`. L'en-tête et le pied de page viennent de `src/partials/` (injectés par un plugin dans `vite.config.ts`).

## Données

`src/data/*.ts`, typées, chacune annotée « sample data » ou « real data ». Le champ `isReal` sépare le vrai de l'exemple.
Réel : identité, adresse, téléphone, horaires, cartes midi et soir, notes, citations d'avis (plateforme seule), presse, arrêts STAR.
Exemple : ardoises passées, cocktails, gins, bières, bouteilles, dates de soirées, formules de groupe, articles, galerie, offres d'emploi.

## Mouvement

GSAP (ScrollTrigger, SplitText, Flip) + Lenis, chargés à la demande. Rideau de velours d'ouverture, enfilade épinglée (pan horizontal,
arches qui s'ouvrent, lumière qui baisse), ardoise à la craie, mosaïque, compteurs, cave glissante avec Flip, transitions de page
(View Transitions inter-documents), boutons à fond de cannage. `transform` et `opacity` uniquement (plus quelques `clip-path`).
`prefers-reduced-motion` : pas de rideau, enfilade en liste verticale, compteurs finaux, transitions coupées, Lenis désactivé.
Sur tactile ou écran étroit : l'enfilade devient un carrousel à aimantation, sans pin.

## Commandes

```bash
npm install
npm run dev          # développement
npm run typecheck    # tsc --noEmit
npm run build        # typecheck + build dans dist/
npm run preview      # http://localhost:4173/Chez_Rene/
node scripts/gen-pages.mjs   # régénère les index.html (titres, descriptions, JSON-LD)
```

## À confirmer avec la maison

Voir `PLAN.md` §13. Notamment : horaires (Google diffère), terrasse (non publiée), brunch (non publié), carte du bar et prix,
droit d'utiliser les photos, mention « anciennement Les Bricoles », e-mail, capacité, paiement, accessibilité, logo vectoriel.
Le mot-symbole « Chez René » du site est une interprétation typographique, pas le logo officiel.
