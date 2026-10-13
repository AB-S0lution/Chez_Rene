// Photos d'illustration Unsplash (licence Unsplash), pas des photos du commerce.
// Sample imagery only: none of these pictures shows Chez René, its dishes or its team.
export type PhotoTheme = 'salle' | 'bar' | 'cave' | 'assiette' | 'cuisine' | 'marche' | 'soiree'
export interface Photo { slug: string; src: string; alt: string; credit: string; url: string; width: number; height: number; theme: PhotoTheme }
const B = import.meta.env.BASE_URL
const p = (slug: string, alt: string, credit: string, id: string, width: number, height: number, theme: PhotoTheme): Photo => ({ slug, src: `${B}photos/${slug}.jpg`, alt, credit, url: `https://unsplash.com/photos/${id}`, width, height, theme })
export const photos: Photo[] = [
  p('salle-tamisee', 'Salle tamisée éclairée par des appliques murales anciennes', 'Maria Ivanova', '1nq1Gg-deKk', 1200, 1500, 'salle'),
  p('lampe-table', 'Table dressée sous une petite lampe allumée', 'Roman', 'mLPNw6L5t5o', 1200, 1800, 'salle'),
  p('bar-tabourets', 'Salle aux murs de bois sombre, tables et chaises de bistrot', 'rawkkim', '_Qt2XF4ch3s', 1200, 1800, 'salle'),
  p('lampes-comptoir', 'Rangée de lampes anciennes sur un comptoir de bar', 'Joey Zhou', 'oVPUOmIwgEg', 1200, 800, 'salle'),
  p('lampe-fenetre', 'Lampe vintage posée sur une table près d\'une fenêtre', 'Charles Puaud', 'Z2Ryb7r-hso', 1200, 1598, 'salle'),
  p('cocktail-coupe', 'Cocktail ambré dans une coupe, bouteilles en arrière-plan', 'Brett Wharton', 'Pq6omXyUpWA', 1200, 800, 'bar'),
  p('cocktail-vintage', 'Préparation d\'un cocktail dans une timbale en métal', 'Chris Alvar', 'AKoV-c6qyhQ', 1000, 1740, 'bar'),
  p('negroni-citron', 'Cocktail rouge orangé garni d\'agrumes', 'Edson Rosas', 'KoWd3-tLWJk', 1000, 1333, 'bar'),
  p('gin-verre', 'Gin tonic au citron vert dans un verre ballon, fond sombre', 'Laure Noverraz', 'nQMdkTVrnlk', 1200, 1803, 'bar'),
  p('biere-tirage', 'Bière pression tirée au comptoir', 'Ben Black', 'fydJtvAdeas', 1200, 800, 'bar'),
  p('biere-verser', 'Bière ambrée versée dans un verre', 'Josh Olalde', '-Ygu9Qx309s', 1200, 800, 'bar'),
  p('cave-etagere', 'Mur de bouteilles de vin rangées sur des étagères', 'Klara Kulikova', 'CPMZguYURMw', 1200, 1800, 'cave'),
  p('cave-rayon', 'Rayonnage de cave avec bouteilles et objets', 'Ben Iwara', 'b60QEskC4JY', 1200, 800, 'cave'),
  p('vin-pinot', 'Verre de vin rouge posé sur la table', 'the blowup', '8em0b1ziHd0', 1200, 900, 'cave'),
  p('mousse', 'Mousse au chocolat avec éclats de noisette', 'Jordane Mathieu', '9trWI5ULtJQ', 1200, 1800, 'assiette'),
  p('oeuf-legumes', 'Œuf au plat, tartines à la tomate et pousses vertes', 'Karoline Henrique', 'Fsdb3WNK84s', 1200, 1798, 'assiette'),
  p('tomates-mozza', 'Tomates anciennes, mozzarella et basilic', 'Unsplash', 'WCyxtVptGJM', 1200, 800, 'assiette'),
  p('dessert-assiette', 'Dessert aux fruits rouges sur une assiette', 'Magdalena Raczka', 'b1eZWNyoBn4', 1200, 1798, 'assiette'),
  p('tarte-myrtille', 'Part de tarte aux myrtilles', 'Unsplash', 'aiIANaSK9DQ', 1000, 1500, 'assiette'),
  p('dessert-pile', 'Assiette de desserts empilés', 'Pars Sahin', 'FC8cWqT-xSw', 1200, 800, 'assiette'),
  p('cuisine-poele', 'Cuisson à la poêle sur le feu', 'Ray Zhou', 'zi6Kr-fNicU', 1200, 800, 'cuisine'),
  p('cuisine-marmites', 'Cuisses de canard, oranges et beurre dans une poêle sur le feu', 'Alexander Lunyov', 'ZWDTaJy_K1I', 1200, 1600, 'cuisine'),
  p('marche-paniers', 'Paniers de légumes de saison au marché', 'Unsplash', 'GPxxXAbzsXU', 1200, 900, 'marche'),
  p('cagette', 'Cagette en bois remplie de fruits et légumes', 'Unsplash', 'OqXXSSPs4zw', 1200, 1600, 'marche'),
  p('marche-etal', 'Étal de fruits et légumes frais en plein air', 'Unsplash', '2WmVYrCwEKg', 1000, 750, 'marche'),
  p('salle-soir', 'Salle de restaurant le soir, tables dressées sous une lumière chaude', 'Jahanzeb Ahsan', 'VQsV9yDspnw', 1200, 750, 'salle'),
  p('vitrine-nuit', 'Fenêtres à petits carreaux éclairées de l\'intérieur, la nuit', 'Jahanzeb Ahsan', 'Q8rj4DYlcIE', 1200, 800, 'salle'),
  p('tablee', 'Longue tablée dressée avec assiettes blanches, bougies et carafes', 'Nadia Valko', '0hAdietsUrE', 1200, 800, 'salle'),
  p('tablee-bougies', 'Longue table en bois couverte de plats à partager à la bougie', 'Stephanie McCabe', 'U3zasaqWD-I', 1200, 1800, 'salle'),
  p('planche', 'Planche de charcuteries, fromages, olives et pain grillé', 'Ana Maltez', 'FHNJO45Qx_k', 1200, 800, 'assiette'),
  p('micro-vintage', 'Micro chromé vintage sur pied, fond violet', 'Matt Botsford', 'OKLqGsCT8qs', 1200, 675, 'soiree'),
  p('micro-scene', 'Micro sur scène dans un faisceau de lumière bleue', 'Brunxs', 'dtqlaz4HyHw', 1200, 801, 'soiree'),
]
export const photo = (slug: string) => photos.find((x) => x.slug === slug) ?? photos[0]
export const byTheme = (t: PhotoTheme) => photos.filter((x) => x.theme === t)
export const pick = (...slugs: string[]) => slugs.map(photo)
/** Cover photo for each journal post (by slug). */
const postCovers: Record<string, string> = {
  'pourquoi-rene': 'vitrine-nuit', 'oeuf-mayo-championnat-bretagne': 'oeuf-legumes', 'pas-de-carte-des-vins': 'cave-etagere',
  'la-terrine-de-rene': 'planche', 'mon-oeuf-se-met-au-vert': 'tomates-mozza', 'les-cocos-de-paimpol': 'marche-paniers',
  'cinq-salles-une-enfilade': 'salle-tamisee', 'saint-helier-quartier-village': 'lampe-fenetre', 'blind-test-mode-d-emploi': 'micro-scene',
  'gin-tonic-notre-passion': 'gin-verre',
}
export const postCover = (slug: string) => photo(postCovers[slug] ?? 'salle-soir')
