import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import { Nav } from '@/components/wf/nav'
import { Footer } from '@/components/wf/footer'
import { Hud } from '@/components/wf/hud'
import { Intro } from '@/components/wf/intro'
import { SmoothScroll } from '@/components/wf/smooth-scroll'
import { SITE_URL, org } from '@/lib/data/site'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const description =
  'WorkFlow PH is a volunteer-run community teaching automation and AI literacy across the Philippines. 20+ events, 1,500+ builders reached, 5 partner orgs.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${org.name} — ${org.tagline}`,
    template: '%s — WorkFlow PH',
  },
  description,
  applicationName: org.name,
  openGraph: {
    siteName: org.name,
    type: 'website',
    locale: 'en_PH',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'WorkFlow PH' }],
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: '#0e1614',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

const introScript = `try{var d=document.documentElement;if(sessionStorage.getItem('wf-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='done'}}catch(e){document.documentElement.dataset.intro='done'}`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrains.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-sun focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Intro />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Hud />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
