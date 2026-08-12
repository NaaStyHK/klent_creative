export const locales = ["fr", "es", "es-ar", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * Slug is what shows up in the URL (/es-ar/...).
 * hreflang is the value Google expects in alternates.languages.
 * es-ar -> es-AR, never "ar" alone (ar = Arabic in the hreflang standard).
 */
export const hreflangByLocale: Record<Locale, string> = {
  fr: "fr",
  es: "es-ES",
  "es-ar": "es-AR",
  en: "en",
};

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  es: "ES",
  "es-ar": "AR",
  en: "EN",
};

export const siteUrl = "https://www.klentcreative.com";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Builds the alternates.languages map for a given path (without locale prefix).
 * e.g. buildAlternates("/branding") ->
 *   { fr: "/fr/branding", "es-ES": "/es/branding", "es-AR": "/es-ar/branding", en: "/en/branding", "x-default": "/en/branding" }
 */
export function buildAlternates(path: string): Record<string, string> {
  const cleanPath = path === "/" ? "" : path;
  const entries = locales.map((locale) => [hreflangByLocale[locale], `${siteUrl}/${locale}${cleanPath}`] as const);
  return {
    ...Object.fromEntries(entries),
    "x-default": `${siteUrl}/${defaultLocale}${cleanPath}`,
  };
}
