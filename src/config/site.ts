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
  // TODO: Harita bağlantısı (Google Maps / Yandex vb.). Boşsa gösterilmez.
  mapUrl: '',
  // TODO: Sosyal medya profilleri. Boş bırakılanlar gösterilmez.
  social: {
    linkedin: '',
    instagram: '',
  },
} as const;

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
