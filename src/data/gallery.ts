// SAMPLE DATA. Illustrated scenes (original SVG art). Six slots are reserved for real photos: photoSlot true.
export type SceneKind = 'velvet' | 'cane' | 'sunburst' | 'mosaic' | 'lamp' | 'egg' | 'terrine' | 'mousse' | 'cote' | 'bottles' | 'gin' | 'cocktail' | 'comptoir' | 'alcove' | 'pub' | 'plaque' | 'chair' | 'monogram' | 'ardoise' | 'cave'
export interface GalleryItem { id: string; kind: SceneKind; title: string; alt: string; ratio: number; photoSlot: boolean; isReal: false }
const g = (id: string, kind: SceneKind, title: string, alt: string, ratio: number, photoSlot = false): GalleryItem => ({ id, kind, title, alt, ratio, photoSlot, isReal: false })
export const gallery: GalleryItem[] = [
  g('g01', 'sunburst', 'Le miroir soleil', 'Illustration d\'un miroir doré en rayons sur un mur bleu nuit', 1),
  g('g02', 'egg', 'L\'œuf qui se met au vert', 'Illustration vue du dessus d\'un œuf mayonnaise sur une assiette blanche', 1.1),
  g('g03', 'comptoir', 'Le comptoir', 'Illustration du comptoir avec hauts tabourets et bouteilles', 0.8),
  g('g04', 'lamp', 'L\'abat-jour à franges', 'Illustration d\'un abat-jour à franges allumé', 1.3),
  g('g05', 'cane', 'Le cannage', 'Motif de cannage doré sur fond bleu', 0.75),
  g('g06', 'terrine', 'La terrine de René', 'Illustration d\'une tranche de terrine de campagne aux morilles', 1),
  g('g07', 'alcove', 'Les alcôves', 'Illustration d\'une alcôve avec de grands coussins', 0.9),
  g('g08', 'cocktail', 'Un cocktail de saison', 'Illustration d\'un cocktail dans une coupe avec zeste', 1.25),
  g('g09', 'mosaic', 'Le miroir mosaïque', 'Illustration d\'un miroir rond en tesselles bleues, vertes et dorées', 1),
  g('g10', 'bottles', 'L\'étagère de la cave', 'Illustration de bouteilles alignées sur une étagère en bois', 0.85),
  g('g11', 'mousse', 'La mousse au chocolat', 'Illustration d\'une mousse au chocolat avec des flocons de fleur de sel', 1.05),
  g('g12', 'pub', 'Le pub anglais revisité', 'Illustration de la dernière salle, banquettes cognac', 0.8),
  g('g13', 'plaque', 'La plaque de rue', 'Illustration d\'une plaque de rue bleue « Boulevard René Laennec »', 1.6),
  g('g14', 'cote', 'La côte de bœuf', 'Illustration d\'une côte de bœuf sur une assiette', 1.1),
  g('g15', 'velvet', 'Le velours', 'Texture de velours bleu avec reflet', 1.2),
  g('g16', 'gin', 'Gin & tonic', 'Illustration d\'un verre à gin garni de concombre', 0.7),
  g('g17', 'chair', 'La chaise cannée', 'Illustration du dossier d\'une chaise cannée', 0.85),
  g('g18', 'ardoise', 'L\'ardoise de la semaine', 'Illustration de l\'ardoise de la semaine', 1.3),
  g('g19', 'monogram', 'Le monogramme', 'Monogramme R dans un ovale à double filet', 1),
  g('g20', 'cave', 'L\'espace cave', 'Illustration de l\'espace cave avec ses bouteilles', 0.95),
].map((x, i) => ({ ...x, photoSlot: [2, 4, 7, 11, 14, 18].includes(i) }))
