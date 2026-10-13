// SAMPLE DATA. No real cocktail, gin or beer names or prices are known (PLAN.md §3.3). Prices are indicative only.
export type CocktailKind = 'classique' | 'signature' | 'mocktail'
export interface Cocktail { id: string; name: string; kind: CocktailKind; glass: 'coupe' | 'tumbler' | 'highball' | 'flute' | 'ballon'; desc: string; price: number; isReal: false }
const c = (id: string, name: string, kind: CocktailKind, glass: Cocktail['glass'], desc: string, price: number): Cocktail => ({ id, name, kind, glass, desc, price, isReal: false })

export const cocktails: Cocktail[] = [
  c('c01', 'Negroni', 'classique', 'tumbler', 'Gin, vermouth rouge, bitter. Amer et franc.', 10),
  c('c02', 'Old Fashioned', 'classique', 'tumbler', 'Whisky, sucre, bitters, zeste d\'orange.', 11),
  c('c03', 'Margarita', 'classique', 'coupe', 'Tequila, citron vert, liqueur d\'orange, sel.', 10),
  c('c04', 'Espresso Martini', 'classique', 'coupe', 'Vodka, café, liqueur de café.', 11),
  c('c05', 'Spritz', 'classique', 'ballon', 'Vin pétillant, amer orangé, eau gazeuse.', 9),
  c('c06', 'Mojito', 'classique', 'highball', 'Rhum, menthe, citron vert, eau gazeuse.', 10),
  c('c07', 'Moscow Mule', 'classique', 'tumbler', 'Vodka, citron vert, ginger beer.', 10),
  c('c08', 'Whisky Sour', 'classique', 'tumbler', 'Whisky, citron, sucre, blanc d\'œuf.', 11),
  c('c09', 'Daiquiri', 'classique', 'coupe', 'Rhum blanc, citron vert, sucre de canne.', 10),
  c('c10', 'Paloma', 'classique', 'highball', 'Tequila, pamplemousse, citron vert.', 10),
  c('c11', 'Petite Californie', 'signature', 'coupe', 'Gin, agrumes, miel, un clin d\'œil au quartier.', 12),
  c('c12', 'Velours bleu', 'signature', 'coupe', 'Gin, violette, citron, mousse légère.', 12),
  c('c13', 'Le Cannage', 'signature', 'tumbler', 'Rhum ambré, café, vanille, zeste de citron.', 12),
  c('c14', 'Boulevard René', 'signature', 'tumbler', 'Whisky, miel, citron, une pointe de gingembre.', 12),
  c('c15', 'Thabor', 'signature', 'highball', 'Gin, concombre, basilic, tonic.', 11),
  c('c16', 'Enfilade', 'signature', 'ballon', 'Bourbon, figue, orange, bitters maison.', 12),
  c('c17', 'Minuit moins le quart', 'signature', 'flute', 'Vin pétillant, liqueur de poire, thym.', 11),
  c('c18', 'Pas de chichi', 'signature', 'highball', 'Vodka, citron vert, tonic. Simple et bien fait.', 9),
  c('m01', 'Sans chichi', 'mocktail', 'highball', 'Concombre, citron vert, tonic.', 6),
  c('m02', 'Petit velours', 'mocktail', 'coupe', 'Myrtille, romarin, citron.', 7),
  c('m03', 'Verger du Thabor', 'mocktail', 'tumbler', 'Pomme, gingembre, citron, eau gazeuse.', 7),
  c('m04', 'Mojito sans alcool', 'mocktail', 'highball', 'Menthe, citron vert, sucre de canne, eau gazeuse.', 7),
  c('m05', 'Rouge Laënnec', 'mocktail', 'ballon', 'Fruits rouges, basilic, verjus.', 8),
  c('m06', 'Citronnade maison', 'mocktail', 'highball', 'Citron pressé, miel, eau pétillante.', 6),
]

export interface Gin { id: string; name: string; desc: string; garnish: string; isReal: false }
export const gins: Gin[] = [
  { id: 'g1', name: 'Le floral', desc: 'Gin floral, tonic, tranche de concombre.', garnish: 'concombre', isReal: false },
  { id: 'g2', name: 'L\'agrume', desc: 'Gin vif aux agrumes, tonic, zeste de pamplemousse.', garnish: 'pamplemousse', isReal: false },
  { id: 'g3', name: 'Le genièvre', desc: 'Gin sec, baies de genièvre, tonic classique.', garnish: 'genièvre', isReal: false },
  { id: 'g4', name: 'L\'herbacé', desc: 'Gin aux herbes, tonic, brin de romarin.', garnish: 'romarin', isReal: false },
  { id: 'g5', name: 'Le fruité', desc: 'Gin rond, tonic, fruits rouges écrasés.', garnish: 'fruits rouges', isReal: false },
  { id: 'g6', name: 'Le très sec', desc: 'Gin londonien, tonic sec, citron vert.', garnish: 'citron vert', isReal: false },
  { id: 'g7', name: 'Le poivré', desc: 'Gin épicé, tonic, baies roses.', garnish: 'baies roses', isReal: false },
  { id: 'g8', name: 'Le fumé', desc: 'Gin et thé fumé, tonic, zeste d\'orange.', garnish: 'orange', isReal: false },
]

export interface Biere { id: string; style: string; desc: string; degre: string; isReal: false }
export const bieres: Biere[] = [
  { id: 'b1', style: 'Blanche', desc: 'Légère, citronnée, parfaite en début de soirée.', degre: 'autour de 4,5 %', isReal: false },
  { id: 'b2', style: 'IPA', desc: 'Houblonnée, fruits exotiques, amertume nette.', degre: 'autour de 6 %', isReal: false },
  { id: 'b3', style: 'Ambrée', desc: 'Notes de caramel et de pain grillé.', degre: 'autour de 5,5 %', isReal: false },
  { id: 'b4', style: 'Stout', desc: 'Café, cacao, rondeur. Une bière de dessert.', degre: 'autour de 6 %', isReal: false },
  { id: 'b5', style: 'Saison', desc: 'Sèche, poivrée, très désaltérante.', degre: 'autour de 5 %', isReal: false },
  { id: 'b6', style: 'Blonde', desc: 'Ronde et franche, pour la tablée.', degre: 'autour de 5 %', isReal: false },
  { id: 'b7', style: 'Pale ale', desc: 'Fruitée et équilibrée, peu amère.', degre: 'autour de 5,2 %', isReal: false },
  { id: 'b8', style: 'Bière de saison d\'automne', desc: 'Épices douces et fruits d\'arrière-saison.', degre: 'autour de 6,5 %', isReal: false },
]
