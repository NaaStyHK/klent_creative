import { hreflangByLocale, siteUrl, type Locale } from "@/lib/i18n/config";
import type { ServiceContent } from "@/lib/i18n/service-content";
import { ORG_ID, breadcrumbNode, graph, webPageNode, type SchemaNode, BRAND } from "@/lib/schema";

/**
 * Service page entities. `provider` is a reference to the site-wide
 * Organization rather than a fresh copy of it, so all the local signals
 * (address, areaServed, catalogue) attach to one entity.
 *
 * The FAQ block is only emitted when the page actually renders those questions
 * — marking up content a visitor cannot see is a structured-data violation.
 * Note that since 2023 Google shows FAQ rich results only for government and
 * health sites, so this earns comprehension rather than SERP real estate.
 */
export default function ServiceJsonLd({
  locale,
  name,
  description,
  url,
  content,
}: {
  locale: Locale;
  name: string;
  description: string;
  url: string;
  content?: ServiceContent;
}) {

  const nodes: SchemaNode[] = [
    webPageNode({ locale, url, name, description }),
    breadcrumbNode(url, [
      { name: BRAND, url: `${siteUrl}/${locale}` },
      { name, url },
    ]),
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name,
      description,
      url,
      provider: { "@id": ORG_ID },
      inLanguage: hreflangByLocale[locale],
    },
  ];

  if (content?.faq?.items.length) {
    nodes.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: content.faq.items.map((item) => ({
        "@type": "Question",
        name: item.title,
        acceptedAnswer: { "@type": "Answer", text: item.body },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(nodes)) }}
    />
  );
}
