import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const CATEGORIES = ['taahhut', 'kentsel-donusum'] as const;
export const STATUSES = ['completed', 'ongoing'] as const;

export type Category = (typeof CATEGORIES)[number];
export type Status = (typeof STATUSES)[number];

/**
 * Projeler: her proje bir klasör, her dil bir Markdown dosyası.
 *
 *   src/content/projects/<slug>/tr.md
 *   src/content/projects/<slug>/en.md
 *   src/content/projects/<slug>/images/*.jpg   (iki dil ortak kullanır)
 *
 * Girdi kimliği (id) "<slug>/<lang>" biçimindedir; src/lib/projects.ts bunu ayrıştırır.
 * Markdown gövdesi detay sayfasındaki "Proje hakkında" bölümüdür.
 */
const projects = defineCollection({
  loader: glob({ pattern: '*/{tr,en}.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        /** Kartlarda ve meta description'da kullanılan kısa açıklama. */
        summary: z.string().min(1).max(260),
        category: z.enum(CATEGORIES),
        status: z.enum(STATUSES),
        year: z.number().int().min(1990).max(2100),
        /** İdare / işveren. Bilinmiyorsa boş bırak; sayfada satır gizlenir. */
        client: z.string().optional(),
        location: z.string().optional(),
        scope: z.array(z.string()).default([]),

        cover: image(),
        coverAlt: z.string().min(1),
        gallery: z
          .array(
            z.object({
              src: image(),
              /** Boşsa "<başlık> — fotoğraf N" kullanılır. */
              alt: z.string().optional(),
            }),
          )
          .default([]),

        /** Yalnızca kentsel dönüşüm projelerinde: önce/sonra karşılaştırması. */
        beforeAfter: z
          .object({
            before: image(),
            beforeAlt: z.string().min(1),
            after: image(),
            afterAlt: z.string().min(1),
          })
          .optional(),

        /** Ana sayfadaki "Son projeler" bölümünde öne çıkar. */
        featured: z.boolean().default(false),
        /** Gerçek olmayan, gösterim amaçlı içerik. Sayfada "Örnek" rozeti ve uyarı çıkar. */
        isExample: z.boolean().default(false),

        /** İhale bilgileri — iç kayıt; sitede HİÇBİR YERDE gösterilmez. */
        tender: z
          .object({
            /** İhale kayıt numarası, ör. "2024/123456". */
            ikn: z
              .string()
              .regex(/^\d{4}\/\d+$/, 'İKN "YYYY/numara" biçiminde olmalı (ör. 2024/123456).')
              .optional(),
            /** Sözleşme bedeli (TL). */
            contractValue: z.number().positive().optional(),
            /** Kırım oranı (%). */
            discountRate: z.number().min(0).max(100).optional(),
          })
          .optional(),
      })
      .refine((data) => !data.beforeAfter || data.category === 'kentsel-donusum', {
        error: 'beforeAfter yalnızca "kentsel-donusum" kategorisindeki projelerde kullanılabilir.',
        path: ['beforeAfter'],
      }),
});

export const collections = { projects };
