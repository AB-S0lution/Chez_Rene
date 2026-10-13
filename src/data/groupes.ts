// Occasions are REAL (named on the venue's group page); the three formulas are SAMPLE DATA, "exemple, sur devis".
export interface Occasion { id: string; title: string; text: string; icon: string; isReal: boolean }
export interface GroupFormula { id: string; name: string; price: number; includes: string[]; isReal: false }
export const occasions: Occasion[] = [
  { id: 'o1', title: 'Anniversaire', text: 'Une grande tablée de copains autour de la carte de la semaine.', icon: 'ph-cheers', isReal: true },
  { id: 'o2', title: 'Séminaire et afterwork', text: 'Un déjeuner d\'équipe ou un verre en fin de journée, à deux pas des bureaux.', icon: 'ph-users-three', isReal: true },
  { id: 'o3', title: 'Conférence', text: 'Un repas pour les intervenants et les participants, à organiser en amont.', icon: 'ph-microphone-stage', isReal: true },
  { id: 'o4', title: 'Repas d\'équipe', text: 'Le déjeuner qui réunit tout le service, sans cérémonie.', icon: 'ph-bowl-food', isReal: false },
]
export const groupFormulas: GroupFormula[] = [
  { id: 'g1', name: 'Déjeuner d\'équipe', price: 21, includes: ['Entrée, plat, dessert de la carte du midi', 'Eau et café'], isReal: false },
  { id: 'g2', name: 'Dîner entre amis', price: 28, includes: ['Entrée, plat, dessert de la carte du soir', 'Un apéritif au comptoir'], isReal: false },
  { id: 'g3', name: 'Soirée sur mesure', price: 30, includes: ['Menu validé avec la maison', 'Bouteilles choisies à la cave', 'Options cocktails'], isReal: false },
]
