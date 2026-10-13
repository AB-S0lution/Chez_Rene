// REAL ratings seen on 2026-10-13. Display as "environ 4,9 sur 5" only; never declared as aggregateRating in JSON-LD.
export interface Rating { platform: string; score: number; count: string; url: string; seenOn: string; isReal: true }
export const ratings: Rating[] = [
  { platform: 'MangezNotez', score: 4.92, count: '229 avis', url: 'https://www.mangeznotez.com/restaurant/rennes/chez-rene', seenOn: '2026-10-13', isReal: true },
  { platform: 'Google', score: 4.9, count: 'environ 140 avis', url: 'https://rennes.food/restaurant/chez-rene', seenOn: '2026-10-13', isReal: true },
  { platform: 'Tripadvisor', score: 4.8, count: '4 avis', url: 'https://www.tripadvisor.fr/Restaurant_Review-g187103-d33877733-Reviews-Chez_Rene-Rennes_Ille_et_Vilaine_Brittany.html', seenOn: '2026-10-13', isReal: true },
  { platform: 'Petit Futé', score: 4.9, count: '60 avis', url: 'https://www.petitfute.com/v9272-rennes-35000/c1165-restaurants/c4-cuisine-francaise/c1-bistrot-brasserie/2183667-chez-rene/tous-les-avis.html', seenOn: '2026-10-13', isReal: true },
  { platform: 'Restaurants de France', score: 4.8, count: '68 avis', url: 'https://restaurant.restaurants-de-france.fr/chez-ren-3403038.html', seenOn: '2026-10-13', isReal: true },
]
export const praiseThemes = [
  { label: 'Le rapport qualité-prix', text: '« imbattable », « addition légère », « prix rikiki »' },
  { label: 'Le fait maison, de saison', text: 'Une carte courte qui change régulièrement.' },
  { label: 'L\'accueil', text: 'Une équipe souriante, un patron de bon conseil.' },
  { label: 'Le cadre', text: 'Déco vintage, plusieurs salles, lumière feutrée.' },
  { label: 'Les plats signature', text: 'Œuf mayo, mousse au chocolat, côte de bœuf, onglet.' },
  { label: 'Une adresse vivante', text: 'Soirées, groupes, anniversaires.' },
]
