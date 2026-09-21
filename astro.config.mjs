// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  // Astro 7: output 'static' is the default and supports prerender=false on individual routes
  // (output 'hybrid' was removed in Astro 7 — Spike S-1)
  output: 'static',
  adapter: vercel(),
  site: process.env.SITE_URL || 'https://www.wmargentina.com.ar',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/api/'),
    }),
    icon(),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});