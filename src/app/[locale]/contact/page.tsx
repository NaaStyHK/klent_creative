import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, buildAlternates, siteUrl, hreflangByLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import ContactPage from "@/components/contact/ContactPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    alternates: {
      canonical: `${siteUrl}/${locale}/contact`,
      languages: buildAlternates("/contact"),
    },
    openGraph: {
      title: dict.contact.metaTitle,
      description: dict.contact.metaDescription,
      url: `${siteUrl}/${locale}/contact`,
      siteName: "KLENT",
      locale: hreflangByLocale[locale].replace("-", "_"),
      type: "website",
    },
  };
}

export default async function ContactRoutePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return <ContactPage dict={dict} />;
}
