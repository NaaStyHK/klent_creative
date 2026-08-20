import { siteUrl, type Locale } from "@/lib/i18n/config";
import { breadcrumbNode, graph, webPageNode, BRAND } from "@/lib/schema";

/**
 * WebPage + BreadcrumbList for the pages that carry no richer type of their
 * own (contact, blog index, category listings, legal, work listing).
 *
 * The home crumb is prepended here so callers only pass the trail below it.
 * Home pages themselves don't use this component: a breadcrumb whose only
 * item is the page you're already on tells Google nothing.
 */
export default function PageJsonLd({
  locale,
  url,
  name,
  description,
  trail = [],
}: {
  locale: Locale;
  url: string;
  name: string;
  description: string;
  /** Ancestors between the home page and this one, in order. */
  trail?: { name: string; url: string }[];
}) {

  const data = graph([
    webPageNode({ locale, url, name, description }),
    breadcrumbNode(url, [
      { name: BRAND, url: `${siteUrl}/${locale}` },
      ...trail,
      { name, url },
    ]),
  ]);

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
