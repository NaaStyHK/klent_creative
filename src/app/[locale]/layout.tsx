import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, buildAlternates, siteUrl, type Locale } from "@/lib/i18n/config";
import { buildSocial } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SetHtmlLang from "@/components/motion/SetHtmlLang";
import JsonLd from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: buildAlternates("/"),
    },
    ...buildSocial({
      locale,
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      url: `${siteUrl}/${locale}`,
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <SetHtmlLang locale={locale} />
      <JsonLd locale={locale} />
      <Nav locale={locale} dict={dict} />
      <main>{children}</main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}

export type { Locale };
