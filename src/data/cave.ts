// SAMPLE DATA. Mock bottles for the « espace cave ». No producer, domaine or price is known: ask the team.
export type Couleur = 'rouge' | 'blanc' | 'rosé' | 'orange' | 'bulles'
export type StyleVin = 'nature' | 'biodynamie' | 'traditionnel'
export interface Bottle { id: string; name: string; couleur: Couleur; style: StyleVin; grape: string; region: string; body: 1 | 2 | 3 | 4 | 5; note: string; pairing: string; isReal: false }
type Row = [Couleur, StyleVin, string, string, 1 | 2 | 3 | 4 | 5, string, string]
const rows: Row[] = [
  ['rouge', 'nature', 'Gamay', 'Beaujolais', 1, 'Fruits rouges croquants, très digeste, à boire frais.', 'la terrine de René aux morilles'],
  ['rouge', 'traditionnel', 'Cabernet franc', 'Loire', 2, 'Poivron doux, framboise, tanins fins.', 'le boudin noir et pommes rôties'],
  ['rouge', 'biodynamie', 'Syrah', 'Rhône', 4, 'Olive noire, poivre, matière dense.', 'l\'onglet de bœuf'],
  ['rouge', 'traditionnel', 'Grenache et carignan', 'Languedoc', 3, 'Garrigue, fruits noirs, chaleur douce.', 'la côte de cochon rôtie'],
  ['rouge', 'nature', 'Pinot noir', 'Alsace', 2, 'Cerise, épices douces, texture soyeuse.', 'la poitrine de cochon rôtie'],
  ['rouge', 'traditionnel', 'Merlot et cabernet', 'Bordeaux', 4, 'Cassis, cèdre, structure classique.', 'la côte de bœuf'],
  ['rouge', 'biodynamie', 'Poulsard', 'Jura', 1, 'Transparent, fraise, légèrement épicé.', 'le vitello tonnato'],
  ['rouge', 'traditionnel', 'Malbec', 'Sud-Ouest', 5, 'Mûre, violette, tanins affirmés.', 'le faux-filet, sauce chimichurri'],
  ['rouge', 'nature', 'Mourvèdre', 'Provence', 4, 'Sauvage, cuir, fruits noirs.', 'l\'onglet de bœuf'],
  ['rouge', 'traditionnel', 'Pinot noir', 'Bourgogne', 3, 'Cerise noire, sous-bois, finale longue.', 'le suprême de volaille au cidre et thym'],
  ['blanc', 'nature', 'Chenin', 'Loire', 3, 'Pomme mûre, miel, belle tension.', 'les coings rôtis au miel'],
  ['blanc', 'traditionnel', 'Muscadet', 'Loire', 1, 'Iodé, citron, sec et vif.', 'le crudo de lieu noir'],
  ['blanc', 'biodynamie', 'Riesling', 'Alsace', 2, 'Agrumes, pierre à fusil, très net.', 'les rillettes de thon et lieu noir'],
  ['blanc', 'traditionnel', 'Chardonnay', 'Bourgogne', 4, 'Beurre frais, noisette, rondeur.', 'le lieu noir breton, sauce à l\'églefin fumé'],
  ['blanc', 'nature', 'Savagnin', 'Jura', 5, 'Noix, épices, caractère affirmé.', 'le duo de fromages'],
  ['blanc', 'traditionnel', 'Sauvignon', 'Loire', 2, 'Buis, pamplemousse, fraîcheur.', 'l\'œuf mayo « Mon œuf se met au vert »'],
  ['blanc', 'biodynamie', 'Roussanne et marsanne', 'Rhône', 4, 'Abricot, amande, texture grasse.', 'le risotto crémeux de sarrasin'],
  ['blanc', 'traditionnel', 'Vermentino', 'Corse', 2, 'Fleurs blanches, citron, sel.', 'la seiche persillée au chorizo'],
  ['blanc', 'nature', 'Aligoté', 'Bourgogne', 1, 'Citron vert, craie, très vivant.', 'l\'effiloché de canard et pickles'],
  ['rosé', 'traditionnel', 'Grenache et cinsault', 'Provence', 1, 'Pamplemousse, pêche blanche, léger.', 'la pleurote rôtie'],
  ['rosé', 'nature', 'Gamay', 'Loire', 2, 'Fraise, rhubarbe, jus.', 'l\'assiette de coppa'],
  ['rosé', 'biodynamie', 'Pinot noir', 'Sancerre', 3, 'Cerise, épices, belle matière.', 'le vitello tonnato'],
  ['orange', 'nature', 'Sauvignon gris', 'Loire', 3, 'Zeste d\'orange, thé noir, léger grip.', 'le potimarron rôti'],
  ['orange', 'biodynamie', 'Gewurztraminer', 'Alsace', 4, 'Rose, litchi, épices, longueur.', 'le duo de fromages'],
  ['orange', 'nature', 'Muscat', 'Roussillon', 3, 'Abricot sec, fleurs, amertume douce.', 'la pavlova et figues'],
  ['bulles', 'traditionnel', 'Chardonnay', 'Champagne', 3, 'Brioche, pomme verte, bulle fine.', 'l\'œuf mayo « Mon œuf se met au vert »'],
  ['bulles', 'nature', 'Chenin', 'Loire', 2, 'Pétillant naturel, pomme, léger trouble.', 'l\'assiette de pata negra'],
  ['bulles', 'traditionnel', 'Pinot noir', 'Bourgogne', 3, 'Fruits rouges, bulle gourmande.', 'la mousse au chocolat fleur de sel'],
  ['bulles', 'biodynamie', 'Mauzac', 'Sud-Ouest', 2, 'Pomme cuite, fleur blanche, doux-sec.', 'le crumble aux pommes'],
  ['bulles', 'nature', 'Gamay', 'Beaujolais', 1, 'Pétillant rosé, framboise, soif.', 'la terrine de René aux morilles'],
]
export const cave: Bottle[] = rows.map(([couleur, style, grape, region, body, note, pairing], i) => ({
  id: `v${String(i + 1).padStart(2, '0')}`, name: `${grape}, ${region}`, couleur, style, grape, region, body, note, pairing, isReal: false,
}))
export const bodyLabel = ['', 'très léger', 'léger', 'moyen', 'ample', 'charpenté'] as const
