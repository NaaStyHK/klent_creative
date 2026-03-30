import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Marquee from "@/components/Marquee/Marquee";
import Projects from "@/components/Projects/Projects";
import Services from "@/components/services/Services";
import Why from "@/components/Why/Why";
import Process from "@/components/Process/Process";
import About from "@/components/About/About";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { getDictionary, Locale } from "@/lib/dictionaries";
import type { Metadata } from "next";

const BASE_URL = "https://www.klentcreative.com";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs
      ? "Desarrollador web freelance en La Rochelle — Klent Creative"
      : "Développeur web freelance à La Rochelle — Klent Creative",
    description: isEs
      ? "Kevin Hafsi, desarrollador web freelance en La Rochelle. Creación de sitios web a medida, aplicaciones móviles e interfaces premium. Presupuesto en 24h."
      : "Kevin Hafsi, développeur web freelance à La Rochelle. Création de sites sur mesure, applications mobiles et interfaces premium — pensés pour convertir. Devis sous 24h.",
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        "fr": `${BASE_URL}/fr`,
        "es": `${BASE_URL}/es`,
        "x-default": `${BASE_URL}/fr`,
      },
    },
  };
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Klent Creative",
  "description": "Développeur web freelance à La Rochelle, spécialisé dans la création de sites sur mesure, d'applications mobiles et d'interfaces premium.",
  "url": `${BASE_URL}/fr`,
  "email": "contact@klentcreative.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "La Rochelle",
    "addressRegion": "Nouvelle-Aquitaine",
    "addressCountry": "FR",
  },
  "founder": {
    "@type": "Person",
    "name": "Kevin Hafsi",
    "jobTitle": "Développeur web freelance",
    "url": "https://www.linkedin.com/in/kevin-hafsi/",
  },
  "areaServed": ["La Rochelle", "Nouvelle-Aquitaine", "France"],
  "knowsAbout": ["Développement web", "Next.js", "React", "Flutter", "Applications mobiles", "SEO"],
};

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Navbar locale={locale} dict={dict.navbar} />
      <main>
        <Hero dict={dict.hero} />
        <Marquee />
        <Projects dict={dict.projects} />
        <Services dict={dict.services} />
        <Why dict={dict.why} />
        <Process dict={dict.process} />
        <About dict={dict.about} />
        <ContactSection dict={dict.contact} />
      </main>
      <Footer locale={locale} dict={dict.footer} />
      <ScrollToTop />
    </>
  );
}