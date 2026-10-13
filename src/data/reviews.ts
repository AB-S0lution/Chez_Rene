// REAL customer quotes (PLAN.md §4.5), word for word, attributed to the platform only (no reviewer name shown).
// The six generic testimonials at the bottom are SAMPLE DATA and are never mixed into the real block.
export interface Review { id: string; text: string; platform: 'Google' | 'Tripadvisor' | 'MangezNotez' | 'Instagram'; date: string; featured: boolean; publish: boolean; note?: string; isReal: true }
const r = (id: string, text: string, platform: Review['platform'], date: string, featured: boolean, extra: Partial<Review> = {}): Review =>
  ({ id, text, platform, date, featured, publish: true, isReal: true, ...extra })

export const reviews: Review[] = [
  r('r01', '« C\'est devenu mon restaurant préféré de Rennes !! »', 'Google', '2026', true),
  r('r02', '« NICO et Alex sont vraiment adorables et l\'accueil est toujours chaleureux et convivial. »', 'Google', '2026', false),
  r('r03', '« Accueil chaleureux dès l\'arrivée, serveur très accueillant et de bons conseils, le tout dans une ambiance conviviale et cosy. »', 'Google', '2026', true),
  r('r04', '« Bistrot de quartier qui mérite d\'être connu… Ce Bistrot à tout d\'un grand. Y aller les yeux fermés »', 'Google', 'avril 2026', true),
  r('r05', '« Cuisine traditionnelle savoureuse (œufs mayo tops, travers de porc purée excellent, crumble super). »', 'Google', 'avril 2026', true),
  r('r06', '« Mention très spéciale pour la mousse au chocolat d\'Alex, tout simplement exceptionnelle ! »', 'Google', 'février 2026', false),
  r('r07', '« Bravo à la Cheffe qui a su s\'adapter à certaines contraintes alimentaires »', 'Google', 'février 2026', false),
  r('r08', '« une cuisine simple sans chichis avec un très bon rapport qualité/prix. Allez y les yeux fermés c\'est un 20/20 »', 'Google', 'octobre 2025', true),
  r('r09', '« Le restau est divisé en 3 salles plus ou moins tamisées. »', 'Google', 'septembre 2025', false),
  r('r10', '« Exactement le genre de restaurant où on se dit en regardant la carte "il faut que je revienne pour goûter ça" »', 'Google', 'juillet 2025', true),
  r('r11', '« Une pépite. »', 'Google', 'novembre 2025', true),
  r('r12', '« Excellent restaurant avec un rapport qualité prix imbattable. »', 'Tripadvisor', 'septembre 2026', true),
  r('r13', '« Un restaurant comme on aimerait en croiser plus souvent par ces plats goûteux et copieux ! »', 'Tripadvisor', 'mars 2026', true),
  r('r14', '« Service au top et surtout le rapport qualité/prix est vraiment très très bien ! »', 'MangezNotez', 'octobre 2026', true),
  r('r15', '« Chez René, tu manges en quantité, en qualité, et à prix rikiki »', 'Instagram', 'octobre 2025', false, { note: 'Repas sur invitation (compte Instagram de recommandations).' }),
  r('r16', '« Top le midi (vitello tonato, œufs mimosa primés, onglet de veau) »', 'Google', 'sans date', false, { publish: false, note: 'Ne pas republier : « primés » ne peut pas être revendiqué.' }),
  r('r17', '« … la qualité, l\'ambiance, la déco et le patron très sympa »', 'Tripadvisor', 'novembre 2025', false, { note: 'Extrait.' }),
  r('r18', '« Accueil agréable. Endroit ou l\'on se sent bien avec une belle décoration ! Carte alléchante et c\'est très bon ! »', 'Tripadvisor', 'mars 2026', false),
  r('r19', '« Petite carte mais tout est bon [...] une excellente carte des vins, bières et cocktails préparés par le patron »', 'Tripadvisor', 'octobre 2025', false, { note: 'Extrait. Le vin se choisit en réalité à la cave.' }),
  r('r20', '« Les plats sont de qualité avec un mélange des saveurs parfaitement proportioné. Le service est agréable, tout comme le cadre. »', 'Tripadvisor', 'septembre 2026', false),
]

export interface Generic { id: string; text: string; label: string; isReal: false }
export const genericTestimonials: Generic[] = [
  { id: 'x1', text: 'On y déjeune entre collègues presque chaque semaine. La carte change, le sourire reste.', label: 'Habitué·e du midi', isReal: false },
  { id: 'x2', text: 'Un dîner à deux dans les alcôves, la lumière basse, une bouteille choisie à la cave. Parfait.', label: 'Client·e fidèle', isReal: false },
  { id: 'x3', text: 'Le blind test du jeudi est devenu notre rendez-vous.', label: 'Client·e de la soirée blind test', isReal: false },
  { id: 'x4', text: 'Ça fait du bien un bistrot qui ne se prend pas au sérieux.', label: 'Voisin·e du quartier', isReal: false },
  { id: 'x5', text: 'Nous avons fêté un anniversaire à douze. Tout s\'est passé simplement.', label: 'Client·e en groupe', isReal: false },
  { id: 'x6', text: 'Les cocktails de saison valent le détour après le théâtre.', label: 'Client·e du soir', isReal: false },
]
