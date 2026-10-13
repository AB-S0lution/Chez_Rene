// FAQ: facts are REAL (isReal true); wording is SAMPLE. Unconfirmed answers carry confirm: true ("à confirmer").
export interface Faq { id: string; q: string; a: string; confirm: boolean; tags: string[]; isReal: boolean }
const f = (id: string, q: string, a: string, tags: string[], confirm = false, isReal = true): Faq => ({ id, q, a, confirm, tags, isReal })
export const faq: Faq[] = [
  f('f01', 'Pourquoi « Chez René » ?', 'René n\'est pas le patron : c\'est un hommage à René Laennec, l\'inventeur breton du stéthoscope, dont le nom est écrit sur les plaques de rue du boulevard. La maison a repris son prénom comme un esprit de maison.', ['maison']),
  f('f02', 'Faut-il réserver ?', 'C\'est recommandé, surtout le midi en semaine et pour les soirées à thème. Vous pouvez appeler le 09 81 75 93 50 ou passer par la page Réserver.', ['réservation']),
  f('f03', 'Quels sont les horaires d\'ouverture ?', 'Du lundi au vendredi, de 12h à 15h et de 19h à 1h. Fermé le samedi et le dimanche.', ['horaires'], true),
  f('f04', 'Y a-t-il une carte des vins ?', 'Non, pas de carte imposée. À vous de vous lever et d\'aller choisir directement dans l\'espace cave, comme à la maison. L\'équipe vous conseille.', ['bar']),
  f('f05', 'La carte change-t-elle ?', 'Oui, chaque semaine : quatre ou cinq entrées, autant de plats et de desserts, avec quelques piliers qui restent, comme l\'œuf mayo.', ['carte']),
  f('f06', 'Combien coûte la formule du midi ?', '12 € le plat, 16,50 € entrée + plat ou plat + dessert, 21 € entrée + plat + dessert. Le soir, comptez 25 à 30 € les trois plats.', ['carte']),
  f('f07', 'Proposez-vous des plats végétariens ?', 'Oui, il y a toujours une option veggie à la carte, au midi comme au soir.', ['carte']),
  f('f08', 'Acceptez-vous les groupes ?', 'Oui : anniversaires, séminaires, conférences et repas d\'équipe. La demande se fait en ligne via le formulaire de la maison, ou par téléphone.', ['groupes']),
  f('f09', 'Y a-t-il des soirées à thème ?', 'Oui : blind test, karaoké et soirées cocktails, en semaine. Consultez la page Soirées.', ['soirées']),
  f('f10', 'Comment venir ?', 'Le bus C4, C6 ou N4 s\'arrête à Pont de Châteaudun, à 170 m. Les stations de métro Gares et Saint-Germain sont à environ 800 m.', ['accès']),
  f('f11', 'Les enfants sont-ils bienvenus ?', 'Oui, des familles viennent déjeuner et dîner. À confirmer avec la maison pour des besoins particuliers.', ['maison'], true),
  f('f12', 'Quels moyens de paiement acceptez-vous ?', 'La carte bancaire est généralement acceptée. Les autres moyens (titres-restaurant, paiement mobile) sont à confirmer.', ['pratique'], true),
  f('f13', 'Le restaurant est-il accessible en fauteuil roulant ?', 'Certaines sources l\'indiquent. Appelez-nous avant de venir pour que nous vous répondions précisément.', ['pratique'], true),
  f('f14', 'Faites-vous de la vente à emporter ?', 'Pas à notre connaissance : la maison est pensée pour manger sur place. À confirmer.', ['pratique'], true),
  f('f15', 'Recrutez-vous ?', 'Oui, la page Nous recrutons explique comment déposer votre candidature, par téléphone ou en passant au bistrot.', ['maison']),
]
