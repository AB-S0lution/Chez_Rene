// Real menu lines copied from the venue's own cartes (seen 2026-10-13, "carte de la semaine, sous réserve").
export type Tag = 'terre' | 'mer' | 'veggie'
export interface Dish { id: string; section: string; name: string; desc: string; price?: number; priceLabel?: string; tags: Tag[]; isReal: true; seenOn: string }
const S = '2026-10-13'
const d = (id: string, section: string, name: string, desc: string, tags: Tag[], price?: number, priceLabel?: string): Dish =>
  ({ id, section, name, desc, price, priceLabel, tags, isReal: true, seenOn: S })

export const menuMidi: Dish[] = [
  d('m-e1', 'Entrées', 'Œuf mayonnaise « Mon œuf se met au vert »', 'Mayonnaise aux herbes et miso, pesto roquette-basilic-noisette, chips de jambon (croûton crumble en version veggie), jeunes pousses de tournesol, graines de moutarde marinées.', ['terre', 'veggie']),
  d('m-e2', 'Entrées', 'Effiloché de cuisses de canard confites', 'Salade de grenailles, crème de carotte, ciboulette, pickles.', ['terre']),
  d('m-e3', 'Entrées', 'Terrine de campagne de René aux morilles', 'Salade, graines de moutarde et oignons rouges marinés.', ['terre']),
  d('m-e4', 'Entrées', 'Rillettes de thon et lieu noir', 'Herbes, moutarde à l\'ancienne et fromage frais, tartare concombre-aneth, oignons rouges marinés, huile verte.', ['mer']),
  d('m-p1', 'Plats', 'Faux-filet, sauce chimichurri', 'Grenailles et salade.', ['terre']),
  d('m-p2', 'Plats', 'Suprême de volaille au cidre et thym', 'Purée, mizuna rouge.', ['terre']),
  d('m-p3', 'Plats', 'Poitrine de cochon rôtie', 'Jus réduit, cocos de Paimpol et champignons, purée.', ['terre']),
  d('m-p4', 'Plats', 'Lieu noir breton', 'Sauce crémeuse à l\'églefin fumé, mousseline de céleri au sel fumé, chou-fleur rôti, épinards fanés.', ['mer']),
  d('m-p5', 'Plats', 'Potimarron rôti', 'Lentilles aux échalotes, crème de parmesan et crumble, mizuna vert.', ['veggie']),
  d('m-d1', 'Desserts', 'Duo de fromages', 'Supplément de 2 € sur la formule.', ['terre'], undefined, '+ 2 €'),
  d('m-d2', 'Desserts', 'Mousse au chocolat fleur de sel', '', ['veggie']),
  d('m-d3', 'Desserts', 'Poire pochée au vin rouge', 'Riz au lait, sauce chocolat, amandes effilées.', ['veggie']),
  d('m-d4', 'Desserts', 'Crumble aux pommes', 'Crème chantilly.', ['veggie']),
]

export const menuSoir: Dish[] = [
  d('s-a1', 'À partager', 'Assiette de pata negra', '', ['terre'], 12),
  d('s-a2', 'À partager', 'Assiette de coppa', '', ['terre'], 6),
  d('s-e1', 'Entrées', 'Œuf mayo « Mon œuf se met au vert »', 'Le plat emblème de la maison.', ['terre', 'veggie'], 5),
  d('s-e2', 'Entrées', 'Vitello tonnato', 'Cul de veau cuit longuement, sauce tonnato, câpres, oignons marinés, parmesan.', ['terre'], 8),
  d('s-e3', 'Entrées', 'Terrine de campagne de René aux morilles', '', ['terre'], 6),
  d('s-e4', 'Entrées', 'Crudo de lieu noir', 'Passion, mangue, eau concombre-pomme-aneth, jeunes pousses d\'oseille.', ['mer'], 8),
  d('s-e5', 'Entrées', 'Pleurote rôtie', 'Houmous de cocos de Paimpol et tahini, noisettes torréfiées, chimichurri.', ['veggie'], 7),
  d('s-p1', 'Plats', 'Boudin noir et pommes rôties', 'Purée, sauce cidre.', ['terre'], 14),
  d('s-p2', 'Plats', 'Onglet de bœuf', 'Sauce échalote, grenailles, pleurotes.', ['terre'], 19),
  d('s-p3', 'Plats', 'Côte de cochon rôtie', 'Jus de cèpes, cocos de Paimpol.', ['terre'], 22),
  d('s-p4', 'Plats', 'Seiche persillée au chorizo', 'Carottes et panais rôtis aux épices, crème au paprika fumé.', ['mer'], 16),
  d('s-p5', 'Plats', 'Risotto crémeux de sarrasin au parmesan', 'Potimarron rôti.', ['veggie'], 14),
  d('s-p6', 'Plats', 'Côte de bœuf', 'Environ 1 kg, grenailles. Prix au kilo.', ['terre'], 50, '50 €/kg'),
  d('s-d1', 'Desserts', 'Trio de fromages', '', ['terre'], 7),
  d('s-d2', 'Desserts', 'Coings rôtis au miel', 'Crumble sarrasin-noisette, chantilly au miel.', ['veggie'], 6),
  d('s-d3', 'Desserts', 'Pavlova et figues', 'Tonka, miel.', ['veggie'], 6),
  d('s-d4', 'Desserts', 'Mousse au chocolat fleur de sel', '', ['veggie'], 6),
]
