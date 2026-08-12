import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, hreflangByLocale, buildAlternates, siteUrl, type Locale } from "@/lib/i18n/config";
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
    openGraph: {
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      url: `${siteUrl}/${locale}`,
      siteName: "KLENT",
      locale: hreflangByLocale[locale].replace("-", "_"),
      type: "website",
      // No OG image yet — add one at public/og/{locale}.jpg and reference it
      // here once real brand visuals are ready (a missing image URL is worse
      // than none for social previews).
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    },
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
