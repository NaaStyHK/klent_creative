import { hreflangByLocale, type Locale } from "@/lib/i18n/config";
import type { StudioContent } from "@/lib/i18n/studio-content";
import { ORG_ID, graph } from "@/lib/schema";

/**
 * The About page describes the company that already exists in the graph, so it
 * points at it by @id.
 *
 * This used to inline a second Organization — no @id, named "KLENT" rather
 * than "Klent Creative" — which read as a different company from the one every
 * other page references, splitting the entity in two.
 */
export default function StudioJsonLd({
  locale,
  content,
  url,
}: {
  locale: Locale;
  content: StudioContent;
  url: string;
}) {
  const data = graph([
    {
      "@type": "AboutPage",
      "@id": `${url}#aboutpage`,
      name: content.h1,
      description: content.metaDescription,
      url,
      mainEntity: { "@id": ORG_ID },
      inLanguage: hreflangByLocale[locale],
    },
  ]);

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
