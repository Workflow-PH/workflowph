import { kindLabel, modeLabel, type EventRecord } from '@/lib/data/events'
import { formatDateRange } from '@/lib/format'
import type { IndexItem } from '@/components/wf/events-index'

export function toIndexItems(list: EventRecord[]): IndexItem[] {
  return list.map((e) => ({
    slug: e.slug,
    title: e.title,
    date: formatDateRange(e.start, e.end, e.monthOnly),
    meta: `${kindLabel[e.kind]} · ${e.city ?? modeLabel[e.mode]}`,
  }))
}
