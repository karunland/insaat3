/**
 * Firma bilgileri — tek kaynak. Header, footer, iletişim sayfası ve
 * yapılandırılmış veri (Organization JSON-LD) buradan okur.
 *
 * TODO: Aşağıdaki iletişim bilgileri yer tutucudur; gerçek değerlerle değiştir.
 */
export const site = {
  name: 'MAKSEF',
  // TODO: Ticaret sicilindeki tam unvan (ör. "MAKSEF ... İnşaat Ltd. Şti.")
  legalName: 'MAKSEF',
  // TODO: Gerçek telefon numarası (E.164 formatında, ör. +902120000000)
  phone: '+90 212 000 00 00',
  // TODO: Gerçek e-posta adresi
  email: 'info@example.com',
  address: {
    // TODO: Açık adres
    street: '',
    district: '',
    city: 'İstanbul',
    country: 'TR',
  },
  // TODO: Ofisin koordinatları. Girilince iletişim sayfasında tıklayınca yüklenen
  // OpenStreetMap haritası gösterilir; null iken yalnızca adres + harita bağlantısı.
  geo: null as { lat: number; lng: number } | null,
  // İsteğe bağlı: harita bağlantısı (Google Maps / Yandex vb.).
  // Boşsa adres (veya koordinat) üzerinden otomatik bir Google Maps bağlantısı üretilir.
  mapUrl: '',
  // TODO: Sosyal medya profilleri. Boş bırakılanlar gösterilmez.
  social: {
    linkedin: '',
    instagram: '',
  },
} as const;

/** Tek satır açık adres, ör. "Cadde No:1, Avcılar, İstanbul". */
export function addressLine(): string {
  const { street, district, city } = site.address;
  return [street, district, city].filter(Boolean).join(', ');
}

/** Haritada görüntüle bağlantısı: mapUrl > koordinat > adres araması. */
export function mapHref(): string {
  if (site.mapUrl) return site.mapUrl;
  const query = site.geo ? `${site.geo.lat},${site.geo.lng}` : `${site.name}, ${addressLine()}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
