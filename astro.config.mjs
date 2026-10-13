// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// TODO: Gerçek alan adı belli olunca .env içinde SITE_URL'i ayarla.
// canonical, hreflang, Open Graph ve sitemap bu adresten üretilir.
const site = env.SITE_URL || 'https://example.com';

/** Teşekkür sayfaları arama motorlarına kapalı; sitemap'e girmesin. */
const NOINDEX_PATHS = ['/tesekkurler/', '/en/thank-you/'];

export default defineConfig({
  site,
  trailingSlash: 'always',

  build: {
    // CSS'i her sayfaya göm: render'ı engelleyen ayrı istek olmaz (FCP/LCP için).
    // Tailwind çıktısı küçük (~10 KB gzip) olduğu için bu takas mantıklı.
    inlineStylesheets: 'always',
  },

  i18n: {
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  env: {
    schema: {
      // Web3Forms erişim anahtarı HTML'e gömülür (servisin tasarımı böyle), bu yüzden public.
      PUBLIC_WEB3FORMS_ACCESS_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },

  integrations: [
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((path) => page.endsWith(path)),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
