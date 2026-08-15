import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, buildAlternates, siteUrl } from "@/lib/i18n/config";
import { buildSocial } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import ContactPage from "@/components/contact/ContactPage";
import PageJsonLd from "@/components/seo/PageJsonLd";

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
    ...buildSocial({
      locale,
      title: dict.contact.metaTitle,
      description: dict.contact.metaDescription,
      url: `${siteUrl}/${locale}/contact`,
    }),
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

  return (
    <>
      <PageJsonLd
        locale={locale}
        url={`${siteUrl}/${locale}/contact`}
        name={dict.contact.h1}
        description={dict.contact.metaDescription}
      />
      <ContactPage dict={dict} />
    </>
  );
}
