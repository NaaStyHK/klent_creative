import { localeLabels, type Locale } from "@/lib/i18n/config";

/**
 * Which languages a navigation control offers, and under which label.
 *
 * The site has four locales but the switcher shows three. The Argentine
 * version stays fully crawlable and indexed — it simply is not a fourth choice
 * to weigh up, since a reader picking a language is choosing Spanish, not a
 * country.
 *
 * A visitor who arrives on /es-ar from search gets that regional version in the
 * Spanish slot, labelled ES: their language reads as the active one and they
 * stay on the version written for their market until they deliberately pick
 * another language.
 *
 * This lives apart from both switchers because it used to live inside the
 * desktop one alone. The phone menu mapped over all four locales instead, so
 * the two controls disagreed about which languages the site offers.
 */
export function navigationLocales(current: Locale): Locale[] {
  return current === "es-ar" ? ["fr", "es-ar", "en"] : ["fr", "es", "en"];
}

/** The Argentine version is presented as Spanish, never as its own language. */
export function navigationLocaleLabel(locale: Locale): string {
  return locale === "es-ar" ? localeLabels.es : localeLabels[locale];
}
