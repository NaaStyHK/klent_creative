import { hreflangByLocale, siteUrl, type Locale } from "@/lib/i18n/config";

export default function ServiceJsonLd({
  locale,
  name,
  description,
  url,
}: {
  locale: Locale;
  name: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: "KLENT",
      url: siteUrl,
    },
    inLanguage: hreflangByLocale[locale],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
