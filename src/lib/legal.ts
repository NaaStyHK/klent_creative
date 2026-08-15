import { locales, defaultLocale, hreflangByLocale, siteUrl, type Locale } from "@/lib/i18n/config";

/**
 * Slug per locale. `fr` keeps "mentions-legales" because that URL is already
 * published in the sitemap — do not rename it without adding a 301.
 */
export const legalSlug: Record<Locale, string> = {
  fr: "mentions-legales",
  es: "aviso-legal",
  "es-ar": "aviso-legal",
  en: "legal-notice",
};

export function isLegalSlug(locale: Locale, slug: string): boolean {
  return legalSlug[locale] === slug;
}

export function buildLegalAlternates(): Record<string, string> {
  const entries = locales.map(
    (locale) => [hreflangByLocale[locale], `${siteUrl}/${locale}/${legalSlug[locale]}`] as const,
  );
  return {
    ...Object.fromEntries(entries),
    "x-default": `${siteUrl}/${defaultLocale}/${legalSlug[defaultLocale]}`,
  };
}
