// Live open / closed status computed from the real opening hours, in Europe/Paris time.
export interface Status { open: boolean; text: string }

function parisNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(now)
  const wd = parts.find((p) => p.type === 'weekday')!.value.replace('.', '').toLowerCase()
  const map: Record<string, number> = { dim: 0, lun: 1, mar: 2, mer: 3, jeu: 4, ven: 5, sam: 6 }
  const h = Number(parts.find((p) => p.type === 'hour')!.value) % 24
  const m = Number(parts.find((p) => p.type === 'minute')!.value)
  return { dow: map[wd] ?? 0, min: h * 60 + m }
}

const isWeekday = (d: number) => d >= 1 && d <= 5

export function getStatus(now = new Date()): Status {
  const { dow, min } = parisNow(now)
  // Lunch 12:00-15:00 (Mon-Fri)
  if (isWeekday(dow) && min >= 12 * 60 && min < 15 * 60) return { open: true, text: 'Ouvert · service du midi jusqu\'à 15h' }
  // Evening 19:00-01:00 (Mon-Fri evening; the after-midnight part belongs to the previous day)
  if (isWeekday(dow) && min >= 19 * 60) return { open: true, text: 'Ouvert · jusqu\'à 01h' }
  const prev = (dow + 6) % 7
  if (isWeekday(prev) && min < 60) return { open: true, text: 'Ouvert · jusqu\'à 01h' }
  // Closed: next opening
  if (isWeekday(dow) && min < 12 * 60) return { open: false, text: 'Fermé · réouverture à 12h' }
  if (isWeekday(dow) && min >= 15 * 60 && min < 19 * 60) return { open: false, text: 'Fermé · réouverture à 19h' }
  const next = dow === 5 && min >= 60 ? 'lundi' : dow === 6 || dow === 0 || (dow === 5 && min >= 60) ? 'lundi' : 'demain'
  return { open: false, text: `Fermé · réouverture ${next} 12h` }
}

/** Index of today's row in the hours table (0 = Monday). */
export const todayIndex = (now = new Date()) => (parisNow(now).dow + 6) % 7
