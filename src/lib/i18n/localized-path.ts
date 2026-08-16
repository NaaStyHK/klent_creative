import type { Locale } from "@/lib/i18n/config";
import { resolveProjectSlug, workListingSlug } from "@/lib/projects";
import { resolveService, serviceSlugs } from "@/lib/services";
import { isLegalSlug, legalSlug } from "@/lib/legal";
import { isStudioSlug, studioSlug } from "@/lib/studio";
import { blogCategorySlugs, resolveCategorySlug } from "@/lib/blog-categories";
import { articleSwitcherGroups } from "@/lib/blog-translations";


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

  if (isStudioSlug(currentLocale, first)) {
    return "/" + targetLocale + "/" + studioSlug[targetLocale];
  }

  // The legal notice exists in all four locales under its own slug
  // (mentions-legales / aviso-legal / legal-notice). This used to send every
  // non-French visitor to the home page, from a page that has a translation.
  if (isLegalSlug(currentLocale, first)) {
    return "/" + targetLocale + "/" + legalSlug[targetLocale];
  }

  if (first === "blog") {
    if (!second) return "/" + targetLocale + "/blog";

    // Category listings live at the same depth as articles, so they have to be
    // resolved before falling through to the article table.
    const category = resolveCategorySlug(currentLocale, second);
    if (category) return "/" + targetLocale + "/blog/" + blogCategorySlugs[category][targetLocale];

    const article = articleSwitcherGroups.find((group) => group[currentLocale] === second);
    const targetSlug = article?.[targetLocale];
    return targetSlug
      ? "/" + targetLocale + "/blog/" + targetSlug
      : "/" + targetLocale + "/blog";
  }

  // Unknown or future locale-specific routes fail safely to the target home.
  return "/" + targetLocale;
}
