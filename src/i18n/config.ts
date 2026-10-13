export const languages = {
  tr: { label: 'Türkçe', short: 'TR', htmlLang: 'tr', ogLocale: 'tr_TR' },
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US' },
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'tr';
export const langs = Object.keys(languages) as Lang[];

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && value in languages;
}
