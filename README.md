# MAKSEF — Kurumsal Web Sitesi

Astro + Tailwind CSS ile yazılmış, tamamen statik, iki dilli (TR/EN) kurumsal site.
Tasarım konsepti: **teknik çizim ve beton** — beton tonları, milimetrik ızgara, ölçü çizgileri,
pafta numaraları ve antet (footer). Tek vurgu rengi şantiye işaret turuncusu.

## Hızlı başlangıç

```bash
npm install
cp .env.example .env      # SITE_URL ve Web3Forms anahtarını gir
npm run dev               # http://localhost:4321
npm run build             # astro check + statik çıktı → dist/
npm run preview           # dist/ klasörünü yerelde sun
```

Node 22.12+ gerekir.

| Ortam değişkeni               | Açıklama                                                                 |
| ----------------------------- | ------------------------------------------------------------------------ |
| `SITE_URL`                    | Yayındaki tam adres. canonical, hreflang, OG, sitemap ve robots.txt bundan üretilir. |
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | [web3forms.com](https://web3forms.com) anahtarı. Boşsa formlar "yapılandırılmadı" mesajı gösterir. |

## Klasör yapısı

```
src/
├── config/site.ts            Firma bilgileri (telefon, e-posta, adres, sosyal) — tek kaynak
├── content.config.ts         Proje koleksiyonu şeması (Zod)
├── content/projects/<slug>/  Her proje bir klasör
│   ├── tr.md                 Türkçe içerik + frontmatter
│   ├── en.md                 İngilizce içerik + frontmatter
│   └── images/               İki dilin ortak kullandığı fotoğraflar
├── i18n/
│   ├── config.ts             Diller
│   ├── routes.ts             Sayfa yolları (TR/EN) — dil değiştirici ve hreflang buradan beslenir
│   ├── ui.ts                 TÜM arayüz ve sayfa metinleri (tek çeviri dosyası)
│   └── utils.ts              useTranslations(), format()
├── lib/projects.ts           Proje sorguları, TR/EN tutarlılık kontrolü, getStaticPaths
├── layouts/BaseLayout.astro  <html>, <head>, header, footer
├── views/                    Sayfa gövdeleri (dil parametresi alır)
├── pages/                    İnce route dosyaları: her biri bir view'u lang ile çağırır
├── components/
│   ├── layout/               Header, Footer, Seo, Logo, LanguageSwitcher
│   ├── projects/             ProjectCard, ProjectList (+filtre), Gallery (+lightbox), BeforeAfter
│   ├── forms/                Web3Form kabuğu, ContactForm, RenewalForm (3 adım), alanlar
│   └── ui/                   PageHeader, SectionHeading, DimensionLine, ContactCta
├── scripts/                  Vanilla TS: filtre, lightbox, form gönderimi, form adımları
└── styles/global.css         Tailwind v4 tema (renk/font token'ları) ve bileşen sınıfları
scripts/generate-placeholders.mjs   Eksik proje görselleri için yer tutucu üretir
```

**Neden `views/` + ince `pages/`?** Türkçe ve İngilizce URL'ler farklı (`/hakkimizda/` ↔ `/en/about/`).
Her sayfanın gövdesi bir kez `views/` altında yazılır; `pages/` altındaki iki küçük dosya onu
`lang="tr"` ve `lang="en"` ile çağırır.

## Sayfalar

| TR                     | EN                       | Not                                            |
| ---------------------- | ------------------------ | ---------------------------------------------- |
| `/`                    | `/en/`                   | Ana sayfa                                      |
| `/hakkimizda/`         | `/en/about/`             | Referans idareler projelerden otomatik derlenir |
| `/taahhut/`            | `/en/contracting/`       | Taahhüt projeleri + durum filtresi             |
| `/kentsel-donusum/`    | `/en/urban-renewal/`     | Süreç, projeler, **bina/arsa sahibi başvuru formu** (`#basvuru`), SSS |
| `/projeler/`           | `/en/projects/`          | Tüm projeler; kategori + durum filtresi (URL'e yazılır) |
| `/projeler/<slug>/`    | `/en/projects/<slug>/`   | Proje detayı                                   |
| `/iletisim/`           | `/en/contact/`           | Genel iletişim formu (`?topic=contracting` ile konu ön seçilir) |
| `/tesekkurler/`        | `/en/thank-you/`         | JS kapalıyken form sonrası yönlendirme (noindex) |

## Proje ekleme

1. `src/content/projects/` altında yeni bir klasör aç. Klasör adı URL olur: `ornek-okul-onarimi-2026`.
2. Fotoğrafları `images/` klasörüne koy (`cover.jpg`, `01.jpg`, `02.jpg`…). Büyük boy yükleyebilirsin;
   Astro AVIF/WebP'ye çevirip farklı genişliklerde üretir.
3. `tr.md` ve `en.md` dosyalarını oluştur. Var olan bir projeyi kopyalamak en kolayı:

```yaml
---
title: "Proje adı"
summary: "Kartlarda ve meta description'da görünen kısa açıklama (en fazla 260 karakter)."
category: taahhut            # taahhut | kentsel-donusum
status: completed            # completed | ongoing
year: 2026
client: "İdare / işveren"    # isteğe bağlı; yoksa satır gizlenir
location: "İstanbul, Avcılar" # isteğe bağlı
scope:
  - "Kapsam maddesi"
cover: ./images/cover.jpg
coverAlt: "Görselin açıklaması"
gallery:
  - src: ./images/01.jpg
  - src: ./images/02.jpg
    alt: "İsteğe bağlı açıklama (boşsa 'Başlık — fotoğraf 2' kullanılır)"
featured: true               # ana sayfada öne çıkar
# Yalnızca kentsel dönüşümde:
beforeAfter:
  before: ./images/before.jpg
  beforeAlt: "Dönüşüm öncesi"
  after: ./images/after.jpg
  afterAlt: "Dönüşüm sonrası"
# Sitede GÖSTERİLMEYEN iç kayıt alanları:
contractValue: 12500000      # sözleşme bedeli (TL)
discountRate: 18.5           # kırım oranı (%)
---

Markdown gövdesi detay sayfasında "Proje hakkında" bölümüdür.
```

Doğrulama build sırasında yapılır:

- Şemaya uymayan alan (yanlış kategori, eksik görsel…) → Zod hatası.
- `beforeAfter` taahhüt projesinde kullanılırsa → hata.
- TR ve EN dosyalarında `category`, `status`, `year`, `isExample` farklıysa → hata (bir dilde güncelleyip diğerini unutmayı yakalar).

Bir projenin yalnızca tek dili varsa dil değiştirici diğer dilin proje listesine gider.

### Yer tutucu görseller

Şu anki tüm görseller yer tutucudur. Gerçek fotoğrafı **aynı dosya adıyla** `images/` klasörüne koyman yeterli.
`npm run placeholders` yalnızca *eksik* dosyaları üretir; var olan fotoğraflara dokunmaz.

### Örnek kentsel dönüşüm projeleri

`ornek-kentsel-donusum-*` klasörleri `isExample: true` ile işaretli gösterim içerikleridir
(sayfada "Örnek" rozeti ve uyarı çıkar, ana sayfada ve referanslarda gösterilmez).
Gerçek proje eklenince klasörleri silmen yeterli.

## Çeviriler

- Arayüz ve sayfa metinlerinin tamamı `src/i18n/ui.ts` içinde. Türkçe sözlük kaynak; İngilizce sözlük aynı
  şekle uymak zorunda — TR'ye eklenen bir anahtar EN'de yoksa `npm run build` (astro check) hata verir.
- Yeni sayfa: `src/i18n/routes.ts`'e yol ekle → `src/views/` altına view yaz → `src/pages/` altına iki ince dosya.

## Formlar (Web3Forms)

- `ContactForm` (genel) ve `RenewalForm` (kentsel dönüşüm, 3 adım: Mülk → Yapı → İletişim).
- JS varsa: fetch ile gönderilir, sonuç sayfada gösterilir. JS yoksa: doğrudan Web3Forms'a POST edilir,
  ardından teşekkür sayfasına yönlenir. Adımlı form JS olmadan tek sayfa form olarak çalışır.
- Alan adları ve seçenek değerleri, sayfa dili ne olursa olsun **Türkçe** gönderilir (e-postayı okuyan ekip için);
  hangi dilden geldiği `Dil` alanında yazar.
- Bot koruması: Web3Forms `botcheck` honeypot alanı.

## Etkileşimler (framework yok, vanilla TS)

| Bileşen         | Dosya                          | Erişilebilirlik                                                    |
| --------------- | ------------------------------ | ------------------------------------------------------------------ |
| Mobil menü      | `Header.astro`                 | `aria-expanded`, Esc ile kapanır                                    |
| Proje filtresi  | `scripts/project-filter.ts`    | Radyo grupları (`fieldset/legend`), sonuç sayısı `aria-live`         |
| Lightbox        | `scripts/lightbox.ts`          | Yerel `<dialog>`: odak tuzağı, Esc, ← →, kaydırma; odak açan öğeye döner |
| Önce/sonra      | `BeforeAfter.astro`            | Görünmez `<input type="range">`: sürükleme + klavye + ekran okuyucu |
| Form adımları   | `scripts/form-stepper.ts`      | Adım başlığına odak, geçersiz alanda ilerlemez, `aria-current="step"` |

Tüm animasyonlar `prefers-reduced-motion: reduce` tercihinde kapanır (`global.css`).

## SEO

Her sayfada: başlık/açıklama, canonical, `hreflang` (tr, en, x-default), Open Graph + Twitter kartı
(proje sayfalarında kapak görselinden 1200×630 üretilir), Organization JSON-LD.
`sitemap-index.xml` ve `robots.txt` build'de `SITE_URL`'e göre üretilir.

## Performans

- Görseller `astro:assets` ile AVIF/WebP, `srcset` + `sizes`, tembel yükleme; LCP görseli `fetchpriority="high"`.
- Fontlar Fontsource ile self-host (Archivo Variable genişlik ekseniyle, JetBrains Mono). Harici istek yok.
- CSS her sayfaya gömülü (`build.inlineStylesheets: 'always'`), sayfa başına yalnızca birkaç KB JS.
- Yerel Lighthouse (mobil, `astro preview`, sıkıştırmasız): Performans 93–97, Erişilebilirlik / En İyi Uygulamalar / SEO 100, CLS 0.

## Yayına alma

**Netlify:** depo bağla; `netlify.toml` hazır. Ortam değişkenlerini site ayarlarından gir.

**Cloudflare Pages:** Build command `npm run build`, output `dist`, ortam değişkenleri + `NODE_VERSION=22`.

`public/_headers` her iki platformda da `/_astro/*` için uzun süreli önbellek ve temel güvenlik başlıklarını ayarlar.

## Yapılacaklar (TODO)

Kodda `TODO` ile işaretli:

- [ ] `src/config/site.ts` — gerçek telefon, e-posta, adres, unvan, sosyal medya
- [ ] `.env` — `SITE_URL`, `PUBLIC_WEB3FORMS_ACCESS_KEY`
- [ ] Gerçek proje fotoğrafları (aynı dosya adlarıyla)
- [ ] Bilinmeyen işveren / konum alanları (proje `tr.md`/`en.md` dosyalarında)
- [ ] İSKİ 2025 projesinin durumu ("devam ediyor" varsayıldı)
- [ ] Proje kapsam maddeleri taslak — gerçek iş kalemleriyle güncelle
- [ ] Kurumsal logo (`Logo.astro`, `public/favicon.svg`)
- [ ] Hakkımızda metni (kuruluş yılı, ekip vb.), kentsel dönüşüm süreç adımları ve SSS yanıtlarının doğrulanması
- [ ] KVKK aydınlatma metni ve formlardaki onay kutusundan bağlantı
