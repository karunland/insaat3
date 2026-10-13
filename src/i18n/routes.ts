import type { Lang } from './config';

/**
 * Sayfaların her dildeki yolu. Türkçe varsayılan dil olduğu için ön eksiz,
 * İngilizce /en/ altında. Dil değiştirici ve hreflang etiketleri bu tablodan beslenir.
 *
 * Yeni bir sayfa eklerken: buraya bir anahtar ekle, sonra src/pages altında
 * her iki dil için ince bir route dosyası oluştur (bkz. src/pages/hakkimizda.astro).
 */
export const routes = {
  home: { tr: '/', en: '/en/' },
  about: { tr: '/hakkimizda/', en: '/en/about/' },
  contracting: { tr: '/taahhut/', en: '/en/contracting/' },
  urbanRenewal: { tr: '/kentsel-donusum/', en: '/en/urban-renewal/' },
  projects: { tr: '/projeler/', en: '/en/projects/' },
  contact: { tr: '/iletisim/', en: '/en/contact/' },
  thankYou: { tr: '/tesekkurler/', en: '/en/thank-you/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

/** Bir sayfanın tüm dillerdeki karşılıkları (hreflang + dil değiştirici). */
export type Alternates = Record<Lang, string>;

export function path(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

export function projectPath(slug: string, lang: Lang): string {
  return `${routes.projects[lang]}${slug}/`;
}

/** Kentsel dönüşüm başvuru formunun çapası (sayfa içi bağlantılar için). */
export const RENEWAL_FORM_ID = 'basvuru';
