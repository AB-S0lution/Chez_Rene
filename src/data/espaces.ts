// REAL descriptions from the venue's own site (« différents espaces en enfilade »). Seat counts are unknown (null).
export interface Espace { id: string; name: string; kind: 'salle' | 'cave'; real: string; extra: string; seats: number | null; isReal: true }
export const espaces: Espace[] = [
  { id: 'comptoir', name: 'Le comptoir', kind: 'salle', real: 'Tables et banquettes hautes face au bar.', extra: 'On y passe pour un verre ou pour un déjeuner sur le pouce, face au bar.', seats: null, isReal: true },
  { id: 'tables', name: 'Les tables bistrot', kind: 'salle', real: 'Des tables bistrot, comme on les aime.', extra: 'Le cœur du déjeuner et du dîner : une cuisine simple, des assiettes généreuses.', seats: null, isReal: true },
  { id: 'alcoves', name: 'Les alcôves', kind: 'salle', real: 'Des alcôves cosys pour se blottir dans les grands coussins.', extra: 'La lumière y est basse. On y vient à deux ou à quatre, sans se presser.', seats: null, isReal: true },
  { id: 'pub', name: 'Le pub anglais revisité', kind: 'salle', real: 'Une dernière salle dans un esprit pub anglais revisité.', extra: 'Mobilier chiné au fil du temps, banquettes de velours, lampes à franges.', seats: null, isReal: true },
  { id: 'cave', name: 'L\'espace cave', kind: 'cave', real: 'À vous de vous lever et d\'aller choisir directement dans notre espace cave, comme à la maison.', extra: 'Pas de carte imposée : l\'équipe conseille, vous choisissez la bouteille.', seats: null, isReal: true },
]
