// SAMPLE DATA. Invented weekly ardoises built from the venue's real vocabulary (prices stay inside the real ranges).
// The real, current cartes live in menus.ts.
export type Tag = 'terre' | 'mer' | 'veggie'
export type Season = 'automne' | 'hiver' | 'printemps' | 'été'
export interface Line { name: string; tag: Tag; price: number }
export interface Ardoise { id: string; weekOf: string; label: string; season: Season; entrees: Line[]; plats: Line[]; desserts: Line[]; isReal: false }

type R = [string, Tag, number]
const L = (r: R[]): Line[] => r.map(([name, tag, price]) => ({ name, tag, price }))
const A = (id: string, weekOf: string, label: string, season: Season, e: R[], p: R[], d: R[]): Ardoise =>
  ({ id, weekOf, label, season, entrees: L(e), plats: L(p), desserts: L(d), isReal: false })

export const ardoises: Ardoise[] = [
  A('a01', '2026-10-12', 'Semaine du 12 octobre', 'automne',
    [['Œuf mayo « Mon œuf se met au vert »', 'veggie', 5], ['Terrine de campagne de René aux morilles', 'terre', 6], ['Crudo de lieu noir, passion et aneth', 'mer', 8], ['Pleurote rôtie, houmous de cocos de Paimpol', 'veggie', 7]],
    [['Onglet de bœuf, sauce échalote', 'terre', 19], ['Boudin noir, pommes rôties, cidre', 'terre', 14], ['Lieu noir breton, mousseline de céleri', 'mer', 17], ['Risotto de sarrasin, potimarron rôti', 'veggie', 14], ['Côte de cochon, jus de cèpes', 'terre', 22]],
    [['Mousse au chocolat fleur de sel', 'veggie', 6], ['Coings rôtis au miel, crumble sarrasin', 'veggie', 6], ['Pavlova et figues', 'veggie', 6], ['Duo de fromages', 'terre', 7]]),
  A('a02', '2026-10-05', 'Semaine du 5 octobre', 'automne',
    [['Œuf mayo, pesto roquette-noisette', 'veggie', 5], ['Rillettes de thon et lieu noir', 'mer', 6], ['Vitello tonnato', 'terre', 8], ['Velouté de potimarron, crumble parmesan', 'veggie', 6]],
    [['Faux-filet, chimichurri, grenailles', 'terre', 20], ['Suprême de volaille au cidre et thym', 'terre', 16], ['Seiche persillée au chorizo', 'mer', 16], ['Gnocchis rôtis, champignons, parmesan', 'veggie', 15], ['Travers de porc, purée maison', 'terre', 17]],
    [['Crumble aux pommes, chantilly', 'veggie', 6], ['Poire pochée au vin rouge, riz au lait', 'veggie', 7], ['Mousse au chocolat fleur de sel', 'veggie', 6], ['Trio de fromages', 'terre', 7]]),
  A('a03', '2026-09-28', 'Semaine du 28 septembre', 'automne',
    [['Œuf mayo aux herbes', 'veggie', 5], ['Effiloché de canard confit, grenailles', 'terre', 7], ['Tartare de maquereau, pickles', 'mer', 8], ['Tarte fine tomates anciennes, chèvre', 'veggie', 7]],
    [['Poitrine de cochon rôtie, cocos de Paimpol', 'terre', 17], ['Lieu noir, beurre blanc, poireaux', 'mer', 18], ['Onglet, sauce poivre, frites maison', 'terre', 19], ['Courge farcie, lentilles, noisettes', 'veggie', 14], ['Andouillette, purée, sauce moutarde', 'terre', 15]],
    [['Figues rôties au miel, mascarpone', 'veggie', 7], ['Crumble aux prunes', 'veggie', 6], ['Mousse au chocolat fleur de sel', 'veggie', 6], ['Duo de fromages', 'terre', 7]]),
  A('a04', '2026-09-07', 'Semaine du 7 septembre', 'automne',
    [['Œuf mayo « Mon œuf se met au vert »', 'veggie', 5], ['Salade de tomates, burrata, basilic', 'veggie', 8], ['Terrine de campagne, cornichons', 'terre', 6], ['Crudo de daurade, citron vert', 'mer', 8]],
    [['Faux-filet, chimichurri', 'terre', 20], ['Suprême de volaille, jus au thym', 'terre', 16], ['Lieu noir breton, fenouil rôti', 'mer', 17], ['Risotto aux champignons', 'veggie', 14], ['Côte de cochon, pommes sautées', 'terre', 21]],
    [['Pavlova aux fruits rouges', 'veggie', 6], ['Mousse au chocolat fleur de sel', 'veggie', 6], ['Crumble pomme-poire', 'veggie', 6], ['Trio de fromages', 'terre', 7]]),
  A('a05', '2026-06-22', 'Semaine du 22 juin', 'été',
    [['Œuf mayo, herbes du jardin', 'veggie', 5], ['Gaspacho de concombre, aneth', 'veggie', 6], ['Vitello tonnato', 'terre', 8], ['Rillettes de thon, pickles d\'oignon', 'mer', 6]],
    [['Faux-filet, chimichurri, salade', 'terre', 19], ['Poulet rôti, courgettes, citron confit', 'terre', 16], ['Lieu noir, tomates rôties, basilic', 'mer', 17], ['Salade de lentilles, légumes grillés, féta', 'veggie', 14], ['Seiche à la plancha, persillade', 'mer', 16]],
    [['Pavlova fraises-menthe', 'veggie', 6], ['Mousse au chocolat fleur de sel', 'veggie', 6], ['Crème brûlée à la verveine', 'veggie', 6], ['Duo de fromages', 'terre', 7]]),
  A('a06', '2026-06-08', 'Semaine du 8 juin', 'été',
    [['Œuf mayo « Mon œuf se met au vert »', 'veggie', 5], ['Asperges, sabayon aux herbes', 'veggie', 8], ['Terrine de campagne de René', 'terre', 6], ['Tartare de bar, agrumes', 'mer', 8]],
    [['Onglet, sauce échalote', 'terre', 19], ['Suprême de volaille, petits pois', 'terre', 16], ['Lieu noir, beurre blanc', 'mer', 18], ['Risotto de petits pois et menthe', 'veggie', 14], ['Côte de cochon grillée, haricots', 'terre', 21]],
    [['Riz au lait, fraises', 'veggie', 6], ['Mousse au chocolat fleur de sel', 'veggie', 6], ['Rhubarbe rôtie, chantilly', 'veggie', 6], ['Trio de fromages', 'terre', 7]]),
  A('a07', '2026-04-27', 'Semaine du 27 avril', 'printemps',
    [['Œuf mayo, pesto d\'ail des ours', 'veggie', 5], ['Rillettes de lieu noir, radis', 'mer', 6], ['Effiloché de canard, carotte', 'terre', 7], ['Asperges vertes, parmesan', 'veggie', 8]],
    [['Faux-filet, chimichurri', 'terre', 19], ['Poitrine de cochon, jus réduit, petits pois', 'terre', 17], ['Lieu noir breton, épinards', 'mer', 17], ['Potimarron rôti, lentilles', 'veggie', 14], ['Seiche persillée, chorizo', 'mer', 16]],
    [['Crumble rhubarbe', 'veggie', 6], ['Mousse au chocolat fleur de sel', 'veggie', 6], ['Pavlova et fraises', 'veggie', 6], ['Duo de fromages', 'terre', 7]]),
  A('a08', '2026-03-16', 'Semaine du 16 mars', 'printemps',
    [['Œuf mayo « Mon œuf se met au vert »', 'veggie', 5], ['Velouté de petits pois, menthe', 'veggie', 6], ['Terrine de campagne, oignons rouges', 'terre', 6], ['Crudo de lieu noir', 'mer', 8]],
    [['Onglet, grenailles, pleurotes', 'terre', 19], ['Suprême de volaille au cidre', 'terre', 16], ['Lieu noir, mousseline de céleri', 'mer', 17], ['Risotto de sarrasin, champignons', 'veggie', 14], ['Travers de porc, purée', 'terre', 17]],
    [['Crumble aux pommes', 'veggie', 6], ['Poire pochée au vin rouge', 'veggie', 7], ['Mousse au chocolat fleur de sel', 'veggie', 6], ['Trio de fromages', 'terre', 7]]),
  A('a09', '2026-02-02', 'Semaine du 2 février', 'hiver',
    [['Œuf mayo, croûton crumble', 'veggie', 5], ['Velouté de topinambour, noisettes', 'veggie', 6], ['Terrine de campagne de René aux morilles', 'terre', 6], ['Rillettes de thon et lieu noir', 'mer', 6]],
    [['Boudin noir, pommes rôties, cidre', 'terre', 14], ['Côte de cochon, cocos de Paimpol', 'terre', 21], ['Lieu noir, sauce crémeuse au haddock', 'mer', 18], ['Potimarron rôti, parmesan', 'veggie', 14], ['Faux-filet, sauce poivre', 'terre', 20]],
    [['Coings rôtis au miel', 'veggie', 6], ['Mousse au chocolat fleur de sel', 'veggie', 6], ['Riz au lait, caramel beurre salé', 'veggie', 6], ['Duo de fromages', 'terre', 7]]),
  A('a10', '2026-01-12', 'Semaine du 12 janvier', 'hiver',
    [['Œuf mayo « Mon œuf se met au vert »', 'veggie', 5], ['Pleurote rôtie, houmous', 'veggie', 7], ['Vitello tonnato', 'terre', 8], ['Soupe de poisson, rouille', 'mer', 8]],
    [['Poitrine de cochon rôtie, lentilles', 'terre', 17], ['Onglet, sauce échalote', 'terre', 19], ['Seiche au chorizo, panais rôtis', 'mer', 16], ['Risotto de sarrasin, potimarron', 'veggie', 14], ['Andouillette, purée, moutarde', 'terre', 15]],
    [['Poire pochée au vin rouge, riz au lait', 'veggie', 7], ['Crumble aux pommes', 'veggie', 6], ['Mousse au chocolat fleur de sel', 'veggie', 6], ['Trio de fromages', 'terre', 7]]),
]
