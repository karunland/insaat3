import type { APIRoute } from 'astro';

// Sitemap adresi astro.config.mjs'teki `site` (SITE_URL) değerinden üretilir.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
