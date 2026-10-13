// REAL data only (verified in PLAN.md, 2026-10-13). Not sample data.
export interface DayHours { day: string; short: string; slots: { from: string; to: string }[] }

export const business = {
  name: 'Chez René',
  tagline: 'Bistrot de quartier',
  legalName: 'KARIOCA BSB',
  legalForm: 'SARL au capital de 2 000 €',
  siren: '980 808 307',
  manager: 'Nicolas Potier',
  address: { street: '6 boulevard René Laënnec', zip: '35000', city: 'Rennes', quartier: 'Saint-Hélier' },
  geo: { lat: 48.1095, lng: -1.66585 }, // OSM node 5336401731 (not the wrong JSON-LD of the old site)
  phone: '09 81 75 93 50',
  phoneHref: 'tel:+33981759350',
  instagram: { handle: '@chezrene_rennes', url: 'https://www.instagram.com/chezrene_rennes/' },
  bookingUrl: 'https://www.les-bricoles-restaurant-rennes.fr/booking-restopro',
  groupUrl: 'https://www.les-bricoles-restaurant-rennes.fr/repas-de-groupe-anniversaire-conference-congres-seminaire-les-bricoles-restaurant-rennes',
  mangeznotezUrl: 'https://www.mangeznotez.com/restaurant/rennes/chez-rene',
  mapsUrl: 'https://www.openstreetmap.org/?mlat=48.1095&mlon=-1.66585#map=18/48.1095/-1.66585',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Chez+Ren%C3%A9+6+boulevard+Ren%C3%A9+La%C3%ABnnec+Rennes',
  hoursConfirmed: false,
  hoursNote: 'Horaires à confirmer, susceptibles de varier les jours fériés.',
  formulas: [
    { label: 'Le plat', price: 12, display: '12 €' },
    { label: 'Entrée + plat ou plat + dessert', price: 16.5, display: '16,50 €' },
    { label: 'Entrée + plat + dessert', price: 21, display: '21 €' },
  ],
  dinnerRange: '25 à 30 € les trois plats',
  isReal: true,
} as const

const wk = [{ from: '12:00', to: '15:00' }, { from: '19:00', to: '01:00' }]
export const hours: DayHours[] = [
  { day: 'Lundi', short: 'Lun', slots: wk },
  { day: 'Mardi', short: 'Mar', slots: wk },
  { day: 'Mercredi', short: 'Mer', slots: wk },
  { day: 'Jeudi', short: 'Jeu', slots: wk },
  { day: 'Vendredi', short: 'Ven', slots: wk },
  { day: 'Samedi', short: 'Sam', slots: [] },
  { day: 'Dimanche', short: 'Dim', slots: [] },
]
