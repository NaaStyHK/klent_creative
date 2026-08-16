import { hreflangByLocale, siteUrl, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { workListingSlug } from "@/lib/projects";
import { ORG_ID, absoluteUrl, breadcrumbNode, graph, webPageNode } from "@/lib/schema";

export default function ProjectJsonLd({
  locale,
  name,
  description,
  url,
  image,
}: {
  locale: Locale;
  name: string;
  description: string;
  url: string;
  image: string;
}) {
  const dict = getDictionary(locale);

  const data = graph([
    webPageNode({ locale, url, name, description }),
    breadcrumbNode(url, [
      { name: dict.loader.brand, url: `${siteUrl}/${locale}` },
      { name: dict.nav.work, url: `${siteUrl}/${locale}/${workListingSlug[locale]}` },
      { name, url },
    ]),
    {
      "@type": "CreativeWork",
      "@id": `${url}#project`,
      name,
      description,
      url,
      image: absoluteUrl(image),
      creator: { "@id": ORG_ID },
      inLanguage: hreflangByLocale[locale],
    },
  ]);

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
