import { siteUrl, type Locale } from "@/lib/i18n/config";

/**
 * Landing pages tied to a French territory.
 *
 * These sit apart from `serviceSlugs` on purpose. A service exists in all four
 * locales and the slug table enforces that. "Refonte de site internet à La
 * Rochelle" has no Argentinian equivalent — inventing one would produce a
 * translated page nobody searches for and an hreflang cluster pointing at
 * content that answers a different market's question.
 *
 * So these are FR-only by design: a single self-referencing hreflang, and an
 * x-default on the page itself, which is the honest answer to "and for
 * everyone else?" when no other version exists. Same pattern the geolocated
 * blog posts already use (see buildPostAlternates in lib/blog.ts).
 */
export const localLandingKeys = ["refonte-la-rochelle", "dev-web-charente-maritime"] as const;

export type LocalLandingKey = (typeof localLandingKeys)[number];

/** The locale these pages exist in. Not a Record over Locale: that is the point. */
export const LOCAL_LANDING_LOCALE: Locale = "fr";

/**
 * hreflang value, deliberately the bare "fr" the rest of the site uses.
 *
 * "fr-FR" was tempting for a page about a French department, but the territory
 * signal belongs in the content, the structured data and the local context —
 * not in a regional hreflang code that would make these two pages the only
 * ones on the site speaking a different dialect of the same convention.
 */
export const LOCAL_LANDING_HREFLANG = "fr";

export const localLandingSlugs: Record<LocalLandingKey, string> = {
  "refonte-la-rochelle": "refonte-site-internet-la-rochelle",
  "dev-web-charente-maritime": "developpement-web-charente-maritime",
};

export function isLocalLandingSlug(locale: string, slug: string): boolean {
  if (locale !== LOCAL_LANDING_LOCALE) return false;
  return localLandingKeys.some((key) => localLandingSlugs[key] === slug);
}

export function resolveLocalLanding(locale: string, slug: string): LocalLandingKey | undefined {
  if (locale !== LOCAL_LANDING_LOCALE) return undefined;
  return localLandingKeys.find((key) => localLandingSlugs[key] === slug);
}

export function localLandingUrl(key: LocalLandingKey): string {
  return `${siteUrl}/${LOCAL_LANDING_LOCALE}/${localLandingSlugs[key]}`;
}

/**
 * One entry and an x-default, both pointing here. Never emits a URL for a
 * locale in which the page does not exist.
 */
export function buildLocalLandingAlternates(key: LocalLandingKey): Record<string, string> {
  const url = localLandingUrl(key);
  return {
    [LOCAL_LANDING_HREFLANG]: url,
    "x-default": url,
  };
}
