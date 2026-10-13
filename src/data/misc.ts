// Mixed small datasets. Stats are REAL; team roles and job cards are SAMPLE DATA.
export const stats = [
  { id: 's1', value: 'Environ 4,9', suffix: '/5', label: 'sur toutes les plateformes', isReal: true },
  { id: 's2', value: '229', suffix: '', label: 'avis sur MangezNotez', isReal: true },
  { id: 's3', value: '21', suffix: ' €', label: 'la formule du midi complète', isReal: true },
  { id: 's4', value: '4', suffix: '', label: 'salles en enfilade', isReal: true },
  { id: 's5', value: '01h', suffix: '', label: 'fermeture en semaine', isReal: true },
  { id: 's6', value: '50', suffix: ' €/kg', label: 'la côte de bœuf', isReal: true },
] as const

export interface Role { id: string; title: string; text: string; icon: string; isReal: false }
export const team: Role[] = [
  { id: 'k', title: 'En cuisine', text: 'Une carte courte, des produits frais, tout est préparé sur place.', icon: 'ph-cooking-pot', isReal: false },
  { id: 'b', title: 'Au bar', text: 'Cocktails classiques et signature, gin & tonic, bières de saison.', icon: 'ph-martini', isReal: false },
  { id: 's', title: 'En salle', text: 'Conseil, accueil, et un coup de main pour choisir la bouteille.', icon: 'ph-wine', isReal: false },
]

export interface Job { id: string; title: string; contract: string; text: string; points: string[]; isReal: false }
export const jobs: Job[] = [
  { id: 'j1', title: 'Cuisinier·ère de bistrot', contract: 'Exemple de poste', text: 'Préparer la carte de la semaine, du midi au soir.', points: ['Cuisine faite maison', 'Travail en petite équipe'] },
  { id: 'j2', title: 'Barman ou barmaid', contract: 'Exemple de poste', text: 'Cocktails, gin & tonic, bières de saison et conseil à la cave.', points: ['Soirées en semaine', 'Service jusqu\'à 1 h'] },
  { id: 'j3', title: 'Serveur·se', contract: 'Exemple de poste', text: 'Accueil, service en salle et prise de réservations.', points: ['Midi et soir', 'Équipe souriante'] },
].map((j) => ({ ...j, isReal: false as const }))
