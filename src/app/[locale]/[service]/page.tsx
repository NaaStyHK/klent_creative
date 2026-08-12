import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, siteUrl, hreflangByLocale, type Locale } from "@/lib/i18n/config";
import { serviceKeys, serviceSlugs, resolveService, buildServiceAlternates } from "@/lib/services";
import { workListingSlug, isWorkListingSlug, buildWorkListingAlternates } from "@/lib/projects";
import { getServiceContent } from "@/content/services";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import ServicePage from "@/components/services/ServicePage";
import ServiceJsonLd from "@/components/seo/ServiceJsonLd";
import WorkListPage from "@/components/projects/WorkListPage";

export function generateStaticParams() {
  const serviceParams = locales.flatMap((locale) =>
    serviceKeys.map((key) => ({ locale, service: serviceSlugs[key][locale] })),
  );
  const workParams = locales.map((locale) => ({ locale, service: workListingSlug[locale] }));
  return [...serviceParams, ...workParams];
}

function getContent(localeParam: string, serviceParam: string) {
  if (!isLocale(localeParam)) return null;
  const key = resolveService(localeParam, serviceParam);
  if (!key) return null;
  return { locale: localeParam, key, content: getServiceContent(key, localeParam) };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}): Promise<Metadata> {
  const { locale, service } = await params;
  if (!isLocale(locale)) return {};

  if (isWorkListingSlug(locale, service)) {
    const dict = getDictionary(locale);
    const path = `/${service}`;
    return {
      title: dict.workPage.metaTitle,
      description: dict.workPage.metaDescription,
      alternates: {
        canonical: `${siteUrl}/${locale}${path}`,
        languages: buildWorkListingAlternates(),
      },
      openGraph: {
        title: dict.workPage.metaTitle,
        description: dict.workPage.metaDescription,
        url: `${siteUrl}/${locale}${path}`,
        siteName: "KLENT",
        locale: hreflangByLocale[locale].replace("-", "_"),
        type: "website",
      },
    };
  }

  const resolved = getContent(locale, service);
  if (!resolved) return {};
  const { content, key } = resolved;
  const path = `/${service}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `${siteUrl}/${locale}${path}`,
      languages: buildServiceAlternates(key),
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${siteUrl}/${locale}${path}`,
      siteName: "KLENT",
      locale: hreflangByLocale[locale as keyof typeof hreflangByLocale].replace("-", "_"),
      type: "website",
    },
  };
}

export default async function ServiceRoutePage({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}) {
  const { locale, service } = await params;
  if (!isLocale(locale)) notFound();

  if (isWorkListingSlug(locale, service)) {
    const dict = getDictionary(locale as Locale);
    return <WorkListPage locale={locale as Locale} dict={dict} />;
  }

  const resolved = getContent(locale, service);
  if (!resolved) notFound();

  return (
    <>
      <ServiceJsonLd
        locale={resolved.locale}
        name={resolved.content.h1}
        description={resolved.content.metaDescription}
        url={`${siteUrl}/${resolved.locale}/${service}`}
      />
      <ServicePage content={resolved.content} />
    </>
  );
}
