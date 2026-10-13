import { ui, type Dictionary } from './ui';
import type { Lang } from './config';

export function useTranslations(lang: Lang): Dictionary {
  return ui[lang];
}

/** `format('{count} proje', { count: 3 })` → `3 proje` */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}
