const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function parts(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return { y, m: m - 1, d }
}

export function formatDateRange(start: string, end?: string, monthOnly?: boolean) {
  const s = parts(start)
  if (monthOnly) return `${MONTHS[s.m]} ${s.y} · day TBC`
  if (!end) return `${MONTHS[s.m]} ${s.d}, ${s.y}`
  const e = parts(end)
  if (s.y === e.y && s.m === e.m) return `${MONTHS[s.m]} ${s.d}–${e.d}, ${s.y}`
  if (s.y === e.y) return `${MONTHS[s.m]} ${s.d} – ${MONTHS[e.m]} ${e.d}, ${s.y}`
  return `${MONTHS[s.m]} ${s.d}, ${s.y} – ${MONTHS[e.m]} ${e.d}, ${e.y}`
}

export function monthKey(iso: string) {
  return iso.slice(0, 7)
}

export function monthLabel(key: string) {
  const [y, m] = key.split('-').map(Number)
  return `${MONTHS_LONG[m - 1]} ${y}`
}

export function shortStamp(iso: string) {
  const s = parts(iso)
  return `${String(s.d).padStart(2, '0')} ${MONTHS[s.m].toUpperCase()}`
}

export function quarterOf(iso: string) {
  const s = parts(iso)
  return `Q${Math.floor(s.m / 3) + 1} ${s.y}`
}
