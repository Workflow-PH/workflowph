import type { Metadata } from 'next'

export function pageMetadata({
  title,
  description,
  path,
  kicker,
}: {
  title: string
  description: string
  path: string
  kicker?: string
}): Metadata {
  const og = `/og?title=${encodeURIComponent(title)}${kicker ? `&kicker=${encodeURIComponent(kicker)}` : ''}`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — WorkFlow PH`,
      description,
      url: path,
      siteName: 'WorkFlow PH',
      type: 'website',
      locale: 'en_PH',
      images: [{ url: og, width: 1200, height: 630, alt: `${title} — WorkFlow PH` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — WorkFlow PH`,
      description,
      images: [og],
    },
  }
}
