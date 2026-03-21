import type { Metadata } from "next";
import "./globals.css";
import Loader from "@/components/Loader/Loader";
import Cursor from "@/components/Cursor/Cursor";

export const metadata: Metadata = {
  title: "Développeur web freelance La Rochelle | Sites & Apps sur mesure — Klent Creative",
  description:
    "Kevin Hafsi, développeur web freelance basé à La Rochelle. Création de sites web sur mesure, applications mobiles et interfaces premium avec Next.js. Devis gratuit sous 24h.",
  keywords: [
    "développeur web freelance La Rochelle",
    "création site web La Rochelle",
    "développeur Next.js freelance",
    "développeur Flutter freelance France",
    "site vitrine premium sur mesure",
    "Klent Creative",
  ],
  authors: [{ name: "Kevin Hafsi" }],
  creator: "Kevin Hafsi — Klent Creative",
  openGraph: {
    type: "website",
    url: "https://www.klentcreative.com",
    title: "Développeur web freelance La Rochelle — Klent Creative",
    description:
      "Sites web et apps sur mesure à La Rochelle. Design premium, code propre, livraison rapide. Indépendants, startups et PME — discutons de votre projet.",
    siteName: "Klent Creative",
    images: [{ url: "https://www.klentcreative.com/og-image.png", width: 1200, height: 630, alt: "Klent Creative — Développeur web freelance La Rochelle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Développeur web freelance La Rochelle — Klent Creative",
    description:
      "Sites web et apps sur mesure à La Rochelle. Design premium, code propre, livraison rapide.",
    images: ["https://www.klentcreative.com/og-image.png"],
  },
  alternates: {
    canonical: "https://www.klentcreative.com/fr",
    languages: {
      fr: "https://www.klentcreative.com/fr",
      es: "https://www.klentcreative.com/es",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Person", "LocalBusiness"],
    name: "Kevin Hafsi — Klent Creative",
    jobTitle: "Développeur web freelance",
    description:
      "Développeur web freelance basé à La Rochelle, spécialisé dans la création de sites sur mesure, applications mobiles et interfaces premium avec Next.js et Flutter.",
    url: "https://www.klentcreative.com",
    email: "contact@klentcreative.com",
    image: "https://www.klentcreative.com/logo.svg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "La Rochelle",
      addressRegion: "Nouvelle-Aquitaine",
      addressCountry: "FR",
    },
    areaServed: [
      { "@type": "City", name: "La Rochelle" },
      { "@type": "Country", name: "France" },
    ],
    knowsAbout: [
      "Développement web",
      "Next.js",
      "Flutter",
      "TypeScript",
      "Figma",
      "WordPress",
    ],
    sameAs: ["https://www.linkedin.com/in/kevin-hafsi/"],
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Cursor />
        <Loader />
        {children}
      </body>
    </html>
  );
}