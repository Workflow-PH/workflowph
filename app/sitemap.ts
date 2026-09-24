import type { MetadataRoute } from 'next'
import { events } from '@/lib/data/events'
import { SITE_URL } from '@/lib/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-09-24')
  const routes = ['', '/showcase', '/builds', '/people', '/about', '/partners', '/join', '/press-kit']
  return [
    ...routes.map((r) => ({
      url: `${SITE_URL}${r}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: r === '' ? 1 : r === '/showcase' ? 0.9 : 0.7,
    })),
    ...events.map((e) => ({
      url: `${SITE_URL}/showcase/${e.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
