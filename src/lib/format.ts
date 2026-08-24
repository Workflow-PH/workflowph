const MANILA = 'Asia/Manila';

export function formatDate(date: Date, opts: Intl.DateTimeFormatOptions = {}): string {
  return new Intl.DateTimeFormat('en-PH', {
    timeZone: MANILA,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...opts,
  }).format(date);
}

export function formatDateRange(start: Date, end?: Date): string {
  if (!end) return formatDate(start);
  const sameMonth =
    start.getUTCFullYear() === end.getUTCFullYear() && start.getUTCMonth() === end.getUTCMonth();
  if (sameMonth) {
    const from = new Intl.DateTimeFormat('en-PH', { timeZone: MANILA, day: 'numeric' }).format(start);
    return `${from}–${formatDate(end)}`;
  }
  return `${formatDate(start)} – ${formatDate(end)}`;
}

export function year(date: Date): string {
  return new Intl.DateTimeFormat('en-PH', { timeZone: MANILA, year: 'numeric' }).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function isUpcoming(date: Date): boolean {
  return date.getTime() >= Date.now();
}

/** Initials for the avatar fallback. Never render a blank silhouette. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((part) => /^[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('');
}
