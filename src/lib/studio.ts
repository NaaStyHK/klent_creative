import { locales, defaultLocale, hreflangByLocale, siteUrl, type Locale } from "@/lib/i18n/config";

export const studioSlug: Record<Locale, string> = {
  fr: "studio",
  es: "estudio",
  "es-ar": "estudio",
  en: "studio",
};

export function isStudioSlug(locale: Locale, slug: string): boolean {
  return studioSlug[locale] === slug;
}

export function buildStudioAlternates(): Record<string, string> {
  const entries = locales.map(
    (locale) => [hreflangByLocale[locale], `${siteUrl}/${locale}/${studioSlug[locale]}`] as const,
  );
  return {
    ...Object.fromEntries(entries),
    "x-default": `${siteUrl}/${defaultLocale}/${studioSlug[defaultLocale]}`,
  };
}
