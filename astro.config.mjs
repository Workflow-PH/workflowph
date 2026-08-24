// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.PUBLIC_SITE_URL ?? 'https://workflowph.org';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.includes('/styleguide') }),
    // Icons resolve from @iconify-json/lucide. No local iconDir.
    icon(),
  ],
  image: {
    // sharp handles AVIF/WebP + responsive srcset generation at build time
    responsiveStyles: true,
  },
  redirects: {
    // Peer orgs use /events, people will guess it.
    '/events': '/showcase',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
