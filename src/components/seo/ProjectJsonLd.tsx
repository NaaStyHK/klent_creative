import { hreflangByLocale, siteUrl, type Locale } from "@/lib/i18n/config";

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
  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url,
    image,
    creator: {
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
