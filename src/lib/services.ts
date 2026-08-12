import { locales, defaultLocale, hreflangByLocale, siteUrl, type Locale } from "@/lib/i18n/config";

export type ServiceKey = "branding" | "web-design" | "mobile-app" | "growth-content";

export const serviceKeys: ServiceKey[] = ["branding", "web-design", "mobile-app", "growth-content"];

/**
 * URL slug per (service, locale). Validated by the user before implementation —
 * do not change without re-validating (these slugs get indexed by Google).
 */
export const serviceSlugs: Record<ServiceKey, Record<Locale, string>> = {
  branding: {
    fr: "branding",
    es: "branding",
    "es-ar": "branding",
    en: "branding",
  },
  "web-design": {
    fr: "creation-site-internet",
    es: "creacion-sitio-web",
    "es-ar": "creacion-sitio-web",
    en: "web-design-development",
  },
  "mobile-app": {
    fr: "application-mobile",
    es: "aplicacion-movil",
    "es-ar": "aplicacion-movil",
    en: "mobile-app-development",
  },
  "growth-content": {
    fr: "croissance-contenu",
    es: "crecimiento-contenido",
    "es-ar": "crecimiento-contenido",
    en: "growth-content-marketing",
  },
};

export function resolveService(locale: Locale, slug: string): ServiceKey | undefined {
  return serviceKeys.find((key) => serviceSlugs[key][locale] === slug);
}

/**
 * Unlike a normal page, each locale uses a DIFFERENT slug for the same
 * service, so the generic buildAlternates() (single shared path) doesn't
 * apply here — build the hreflang map from the per-locale slug table.
 */
export function buildServiceAlternates(key: ServiceKey): Record<string, string> {
  const entries = locales.map(
    (locale) => [hreflangByLocale[locale], `${siteUrl}/${locale}/${serviceSlugs[key][locale]}`] as const,
  );
  return {
    ...Object.fromEntries(entries),
    "x-default": `${siteUrl}/${defaultLocale}/${serviceSlugs[key][defaultLocale]}`,
  };
}
