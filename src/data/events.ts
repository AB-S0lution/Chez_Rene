// SAMPLE DATA for upcoming nights (weekday evenings only). Two REAL past appearances are flagged isReal: true.
export type EventType = 'blindtest' | 'karaoke' | 'cocktail' | 'hors-les-murs'
export interface Evenement { id: string; type: EventType; date: string; time: string; title: string; theme?: string; blurb: string; isReal: boolean; link?: string }
export const typeLabel: Record<EventType, string> = { blindtest: 'Blind test', karaoke: 'Karaoké', cocktail: 'Soirée cocktails', 'hors-les-murs': 'Hors les murs' }
const e = (id: string, type: EventType, date: string, time: string, title: string, theme: string | undefined, blurb: string): Evenement =>
  ({ id, type, date, time, title, theme, blurb, isReal: false })

export const upcoming: Evenement[] = [
  e('e01', 'blindtest', '2026-10-15', '20h30', 'Blind test', 'Années 90', 'Trois manches, des équipes de quatre, un point par bonne réponse. Réservez votre table.'),
  e('e02', 'karaoke', '2026-10-21', '20h30', 'Karaoké', undefined, 'Le micro circule, les classiques aussi. Aucun talent requis.'),
  e('e03', 'cocktail', '2026-10-23', '19h30', 'Soirée cocktails', 'Automne', 'Une carte courte de cocktails de saison, préparés au comptoir.'),
  e('e04', 'blindtest', '2026-10-29', '20h30', 'Blind test', 'Cinéma et séries', 'Génériques, répliques et bandes originales.'),
  e('e05', 'karaoke', '2026-11-04', '20h30', 'Karaoké', 'Variété française', 'Brel, Aznavour, Indochine : on chante ensemble.'),
  e('e06', 'cocktail', '2026-11-06', '19h30', 'Soirée cocktails', 'Spécial gin', 'Gin & tonic et cocktails au gin, de classique à audacieux.'),
  e('e07', 'blindtest', '2026-11-12', '20h30', 'Blind test', 'Variété française', 'Quatre manches pour départager les tablées.'),
  e('e08', 'karaoke', '2026-11-18', '20h30', 'Karaoké', 'Spécial duos', 'Venez à deux, repartez avec un tube.'),
  e('e09', 'cocktail', '2026-11-20', '19h30', 'Soirée cocktails', 'Mocktails et cocktails', 'Une soirée où le sans alcool a toute sa place.'),
  e('e10', 'blindtest', '2026-11-26', '20h30', 'Blind test', 'Années 80', 'Synthés, refrains et jeux de mots.'),
  e('e11', 'karaoke', '2026-12-02', '20h30', 'Karaoké', undefined, 'Le rendez-vous de début d\'hiver.'),
  e('e12', 'cocktail', '2026-12-04', '19h30', 'Soirée cocktails', 'De saison', 'Épices, agrumes d\'hiver et cocktails chaleureux.'),
  e('e13', 'blindtest', '2026-12-10', '20h30', 'Blind test', 'Rock', 'Guitares obligatoires.'),
  e('e14', 'karaoke', '2026-12-16', '20h30', 'Karaoké', 'Chansons de fin d\'année', 'Un dernier micro avant les fêtes.'),
  e('e15', 'cocktail', '2026-12-18', '19h30', 'Soirée cocktails', 'Dernier verre avant les fêtes', 'Le bar propose ses recettes préférées de l\'année.'),
  e('e16', 'blindtest', '2027-01-14', '20h30', 'Blind test', 'Rentrée', 'On remet les équipes en jeu.'),
  e('e17', 'karaoke', '2027-01-20', '20h30', 'Karaoké', 'Tubes de l\'année', 'Les refrains de l\'année passée, au micro.'),
  e('e18', 'cocktail', '2027-01-22', '19h30', 'Soirée cocktails', 'Agrumes d\'hiver', 'Pamplemousse, orange sanguine et cocktails frais pour janvier.'),
]

export const pastReal: Evenement[] = [
  { id: 'p1', type: 'hors-les-murs', date: '2026-07-05', time: 'Dimanche', title: 'Le Marché à Manger, édition des 10 ans', blurb: 'Chez René a cuisiné à La Criée, Marché central de Rennes. L\'organisateur parle d\'« une institution rennaise ».', isReal: true, link: 'https://www.instagram.com/p/DbJC6TwCJtL/' },
  { id: 'p2', type: 'hors-les-murs', date: '2026-04-23', time: 'Jeudi', title: 'Championnat de Bretagne de l\'œuf mayonnaise', theme: 'Finaliste 2026', blurb: 'Chez René figure parmi les restaurants finalistes de la 5e édition (ASOM), à Taden près de Dinan. Il n\'a pas remporté le titre.', isReal: true, link: 'https://actu.fr/bretagne/dinan_22050/championnat-de-bretagne-de-loeuf-mayonnaise-la-liste-des-restaurants-participants-a-ete-devoilee_64143360.html' },
]
