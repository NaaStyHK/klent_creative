import { locales, defaultLocale, hreflangByLocale, siteUrl, type Locale } from "@/lib/i18n/config";

/** Oxploria and Mannà are the studio's two published client projects. */
export const projectSlugs = ["oxploria", "manna"] as const;
export type ProjectSlug = (typeof projectSlugs)[number];

/** URL slug for the listing page ("Work"), per locale. Brand names in the
 * project slugs themselves aren't translated, so those stay identical across
 * locales — only this index slug varies. */
export const workListingSlug: Record<Locale, string> = {
  fr: "realisations",
  es: "proyectos",
  "es-ar": "proyectos",
  en: "work",
};

export function isWorkListingSlug(locale: Locale, slug: string): boolean {
  return workListingSlug[locale] === slug;
}

export function resolveProjectSlug(slug: string): ProjectSlug | undefined {
  return projectSlugs.find((s) => s === slug);
}

export function buildWorkListingAlternates(): Record<string, string> {
  const entries = locales.map(
    (locale) => [hreflangByLocale[locale], `${siteUrl}/${locale}/${workListingSlug[locale]}`] as const,
  );
  return {
    ...Object.fromEntries(entries),
    "x-default": `${siteUrl}/${defaultLocale}/${workListingSlug[defaultLocale]}`,
  };
}

export function buildProjectAlternates(slug: ProjectSlug): Record<string, string> {
  const entries = locales.map(
    (locale) => [hreflangByLocale[locale], `${siteUrl}/${locale}/${workListingSlug[locale]}/${slug}`] as const,
  );
  return {
    ...Object.fromEntries(entries),
    "x-default": `${siteUrl}/${defaultLocale}/${workListingSlug[defaultLocale]}/${slug}`,
  };
}
