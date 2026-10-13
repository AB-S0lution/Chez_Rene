// REAL stops (STAR open data, straight-line distances, PLAN.md §1).
export interface Stop { id: string; name: string; mode: 'bus' | 'metro'; lines: string; meters: number; isReal: true }
export const stops: Stop[] = [
  { id: 't1', name: 'Pont de Châteaudun', mode: 'bus', lines: 'C4, C6, N4', meters: 170, isReal: true },
  { id: 't2', name: 'Paul Bert', mode: 'bus', lines: 'C4, C6, N4, E4', meters: 250, isReal: true },
  { id: 't3', name: 'Châteaudun / Saint-Vincent', mode: 'bus', lines: 'C5', meters: 360, isReal: true },
  { id: 't4', name: 'Robidou', mode: 'bus', lines: 'C4, C6, 67, N4', meters: 450, isReal: true },
  { id: 't5', name: 'Laënnec', mode: 'bus', lines: 'C1, C2, 11, E4', meters: 530, isReal: true },
  { id: 't6', name: 'Gares', mode: 'metro', lines: 'Métro a et b', meters: 785, isReal: true },
  { id: 't7', name: 'Saint-Germain', mode: 'metro', lines: 'Métro b', meters: 790, isReal: true },
  { id: 't8', name: 'Charles de Gaulle', mode: 'metro', lines: 'Métro a', meters: 930, isReal: true },
]
export const landmarks = [
  { name: 'Lycée Laënnec', meters: 50 }, { name: 'Alphonse.G', meters: 130 }, { name: 'TNB', meters: 530 }, { name: 'Parc du Thabor', meters: 570 },
  { name: 'La Brasserie Saint-Hélier', meters: 750 }, { name: 'Gare de Rennes', meters: 880 },
]
