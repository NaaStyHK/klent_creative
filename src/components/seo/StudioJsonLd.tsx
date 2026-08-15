import { hreflangByLocale, siteUrl, type Locale } from "@/lib/i18n/config";
import type { StudioContent } from "@/lib/i18n/studio-content";

export default function StudioJsonLd({
  locale,
  content,
  url,
}: {
  locale: Locale;
  content: StudioContent;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: content.h1,
    description: content.metaDescription,
    url,
    mainEntity: {
      "@type": "Organization",
      name: "KLENT",
      url: siteUrl,
      employee: content.members.map((member) => ({
        "@type": "Person",
        name: member.firstName,
        jobTitle: member.role,
      })),
    },
    inLanguage: hreflangByLocale[locale],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
