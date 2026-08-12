import { hreflangByLocale, siteUrl, type Locale } from "@/lib/i18n/config";

export default function JsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KLENT",
    url: `${siteUrl}/${locale}`,
    // Google's Organization `logo` wants a square PNG/JPG, not the wide SVG
    // wordmark used in the UI (public/brand/logo-mark-*.svg). Export a
    // square version and set `logo` here once one exists.
    sameAs: ["https://instagram.com", "https://linkedin.com"],
    inLanguage: hreflangByLocale[locale],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
