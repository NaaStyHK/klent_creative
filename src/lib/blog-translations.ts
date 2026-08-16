import type { Locale } from "@/lib/i18n/config";

/**
 * Which blog articles correspond across locales — one place, two lists,
 * because the language switcher and hreflang are not asking the same question.
 *
 * The switcher asks "where should this reader go if they change language?" and
 * a near-equivalent is a good answer. hreflang asks "is this the same page for
 * another audience?" and answering yes about a different page misleads Google.
 */

/**
 * The same article, translated. Safe for hreflang, and used by the switcher.
 *
 * Add a line here when you publish a translation. Locales the article does not
 * exist in are simply omitted — a two-language cluster is perfectly valid, and
 * `buildPostAlternates` checks that the file is really there before declaring
 * it, so a typo here can never produce a hreflang pointing at a 404.
 */
export const articleTranslations: Array<Partial<Record<Locale, string>>> = [
  {
    fr: "application_oxploria",
    es: "application_oxploria",
    "es-ar": "application_oxploria",
    en: "application_oxploria",
  },
  {
    fr: "site-vitrine-moderne-2026",
    es: "sitio-web-moderno-2026",
    "es-ar": "sitio-web-moderno-2026",
    en: "modern-website-standards-2026",
  },
  {
    fr: "application-sur-mesure-vs-no-code",
    es: "no-code-vs-desarrollo-a-medida",
    "es-ar": "no-code-vs-desarrollo-a-medida",
    en: "no-code-vs-custom-development",
  },
  {
    fr: "pourquoi-site-premium-change-perception-marque",
    es: "web-premium-percepcion-de-marca",
    "es-ar": "web-premium-percepcion-de-marca",
    en: "premium-website-brand-perception",
  },
];

/**
 * Nearest equivalent per market — deliberately NOT hreflang.
 *
 * These cover the same topic for a different city: prices in euros for La
 * Rochelle, in euros for Barcelona, in dollars for Buenos Aires. Sending a
 * reader who switches language to the version written for their market is
 * helpful. Telling Google they are the same page would not be true.
 */
export const articleEquivalents: Array<Partial<Record<Locale, string>>> = [
  {
    fr: "freelance-developpeur-web-la-rochelle",
    es: "freelance-desarrollador-web-barcelona",
    "es-ar": "freelance-desarrollador-web-buenos-aires",
    en: "freelance-web-developer-vs-agency",
  },
  {
    fr: "combien-coute-site-vitrine-la-rochelle",
    es: "cuanto-cuesta-sitio-web-barcelona",
    "es-ar": "cuanto-cuesta-sitio-web-buenos-aires",
    en: "how-much-does-a-website-cost",
  },
  {
    fr: "Comment-avoir-plus-de-clients-internet-la-rochelle",
    es: "conseguir-clientes-online-barcelona",
    "es-ar": "conseguir-clientes-online-buenos-aires",
    en: "get-clients-online-with-your-website",
  },
  {
    fr: "refonte-site-web-la-rochelle",
    es: "rediseno-web-barcelona",
    "es-ar": "rediseno-web-buenos-aires",
    en: "website-redesign-when-and-how",
  },
  {
    fr: "creation-application-mobile-la-rochelle",
    es: "crear-app-movil-barcelona",
    "es-ar": "crear-app-movil-buenos-aires",
    en: "mobile-app-cost-and-timeline",
  },
];

/** Everything the language switcher may follow: real translations first. */
export const articleSwitcherGroups = [...articleTranslations, ...articleEquivalents];

/** The translation cluster a slug belongs to, if it is a translated article. */
export function findTranslationGroup(slug: string): Partial<Record<Locale, string>> | undefined {
  return articleTranslations.find((group) =>
    (Object.values(group) as string[]).includes(slug),
  );
}
