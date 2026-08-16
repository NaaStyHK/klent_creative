import { siteUrl, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { serviceKeys, serviceSlugs } from "@/lib/services";
import { graph, locationNodes, organizationNode, websiteNode } from "@/lib/schema";

/**
 * Site-wide entities, emitted from [locale]/layout.tsx so every page carries
 * them. Page-specific types (Article, Service, FAQPage, BreadcrumbList) are
 * emitted by their own routes and point back here with { "@id": ORG_ID }
 * rather than restating the company.
 */
export default function JsonLd({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  // Names come from the nav/services list ("Création de site internet"), not
  // from each page's H1, which is a marketing headline ("Un site internet qui
  // convertit, pas juste qui existe.") and useless as a catalogue entry.
  // dict.services.items is numbered 01-04 in the same order as serviceKeys.
  const services = serviceKeys.map((key, i) => {
    const item = dict.services.items[i];
    return {
      title: item.title,
      desc: item.desc,
      url: `${siteUrl}/${locale}/${serviceSlugs[key][locale]}`,
    };
  });

  const data = graph([
    organizationNode(locale, dict.meta.home.description, services),
    ...locationNodes(locale, dict.meta.home.description),
    websiteNode(),
  ]);

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
