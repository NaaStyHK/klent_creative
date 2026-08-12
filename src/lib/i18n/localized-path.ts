import type { Locale } from "@/lib/i18n/config";
import { resolveProjectSlug, workListingSlug } from "@/lib/projects";
import { resolveService, serviceSlugs } from "@/lib/services";

/**
 * Equivalent articles available in several languages. Articles missing from
 * the target locale intentionally fall back to that locale's blog listing
 * instead of sending visitors to a 404.
 */
const localizedBlogArticles: Array<Partial<Record<Locale, string>>> = [
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
];

function pathSegments(pathname: string, currentLocale: Locale): string[] {
  const prefix = "/" + currentLocale;
  if (pathname === prefix || pathname === prefix + "/") return [];
  if (!pathname.startsWith(prefix + "/")) return [];
  return pathname.slice(prefix.length + 1).split("/").filter(Boolean);
}

export function getLocalizedPath(
  pathname: string,
  currentLocale: Locale,
  targetLocale: Locale,
): string {
  const segments = pathSegments(pathname, currentLocale);
  const [first, second] = segments;

  if (!first) return "/" + targetLocale;

  const service = resolveService(currentLocale, first);
  if (service) return "/" + targetLocale + "/" + serviceSlugs[service][targetLocale];

  if (first === workListingSlug[currentLocale]) {
    if (!second) return "/" + targetLocale + "/" + workListingSlug[targetLocale];
    const project = resolveProjectSlug(second);
    return project
      ? "/" + targetLocale + "/" + workListingSlug[targetLocale] + "/" + project
      : "/" + targetLocale + "/" + workListingSlug[targetLocale];
  }

  if (first === "contact") return "/" + targetLocale + "/contact";

  if (first === "blog") {
    if (!second) return "/" + targetLocale + "/blog";
    const article = localizedBlogArticles.find((group) => group[currentLocale] === second);
    const targetSlug = article?.[targetLocale];
    return targetSlug
      ? "/" + targetLocale + "/blog/" + targetSlug
      : "/" + targetLocale + "/blog";
  }

  // The legal notice currently exists in French only. Switching language from
  // that page goes to the selected locale's home rather than a non-existent
  // translated legal route.
  if (first === "mentions-legales") {
    return targetLocale === "fr" ? "/fr/mentions-legales" : "/" + targetLocale;
  }

  // Unknown or future locale-specific routes fail safely to the target home.
  return "/" + targetLocale;
}
