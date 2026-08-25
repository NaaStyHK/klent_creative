import { headingText } from "@/components/ui/RichHeading";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, siteUrl, type Locale } from "@/lib/i18n/config";
import { buildSocial } from "@/lib/seo";
import { serviceKeys, serviceSlugs, resolveService, buildServiceAlternates } from "@/lib/services";
import { workListingSlug, isWorkListingSlug, buildWorkListingAlternates } from "@/lib/projects";
import { legalSlug, isLegalSlug, buildLegalAlternates } from "@/lib/legal";
import { studioSlug, isStudioSlug, buildStudioAlternates } from "@/lib/studio";
import {
  LOCAL_LANDING_LOCALE,
  localLandingKeys,
  localLandingSlugs,
  resolveLocalLanding,
  buildLocalLandingAlternates,
} from "@/lib/local-landings";
import { getServiceContent } from "@/content/services";
import { getLegalContent } from "@/content/legal";
import { getStudioContent } from "@/content/studio";
import { getLocalLandingContent } from "@/content/local";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import ServicePage from "@/components/services/ServicePage";
import ServiceJsonLd from "@/components/seo/ServiceJsonLd";
import WorkListPage from "@/components/projects/WorkListPage";
import LegalPage from "@/components/legal/LegalPage";
import StudioPage from "@/components/studio/StudioPage";
import StudioJsonLd from "@/components/seo/StudioJsonLd";
import LocalLandingPage from "@/components/local/LocalLandingPage";
import PageJsonLd from "@/components/seo/PageJsonLd";

export function generateStaticParams() {
  const serviceParams = locales.flatMap((locale) =>
    serviceKeys.map((key) => ({ locale, service: serviceSlugs[key][locale] })),
  );
  const workParams = locales.map((locale) => ({ locale, service: workListingSlug[locale] }));
  const legalParams = locales.map((locale) => ({ locale, service: legalSlug[locale] }));
  const studioParams = locales.map((locale) => ({ locale, service: studioSlug[locale] }));
  // FR-only: these exist in one locale by design, so they are not mapped over
  // `locales` like the rest.
  const localParams = localLandingKeys.map((key) => ({
    locale: LOCAL_LANDING_LOCALE,
    service: localLandingSlugs[key],
  }));
  return [...serviceParams, ...workParams, ...legalParams, ...studioParams, ...localParams];
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
      ...buildSocial({
        locale,
        title: dict.workPage.metaTitle,
        description: dict.workPage.metaDescription,
        url: `${siteUrl}/${locale}${path}`,
      }),
    };
  }

  if (isLegalSlug(locale, service)) {
    const legalContent = getLegalContent(locale);
    const path = `/${service}`;
    return {
      title: legalContent.metaTitle,
      description: legalContent.metaDescription,
      alternates: {
        canonical: `${siteUrl}/${locale}${path}`,
        languages: buildLegalAlternates(),
      },
      ...buildSocial({
        locale,
        title: legalContent.metaTitle,
        description: legalContent.metaDescription,
        url: `${siteUrl}/${locale}${path}`,
      }),
    };
  }

  if (isStudioSlug(locale, service)) {
    const studioContent = getStudioContent(locale);
    const path = `/${service}`;
    return {
      title: studioContent.metaTitle,
      description: studioContent.metaDescription,
      alternates: {
        canonical: `${siteUrl}/${locale}${path}`,
        languages: buildStudioAlternates(),
      },
      ...buildSocial({
        locale,
        title: studioContent.metaTitle,
        description: studioContent.metaDescription,
        url: `${siteUrl}/${locale}${path}`,
      }),
    };
  }

  const localKey = resolveLocalLanding(locale, service);
  if (localKey) {
    const landing = getLocalLandingContent(localKey);
    const url = `${siteUrl}/${locale}/${service}`;
    return {
      title: landing.metaTitle,
      description: landing.metaDescription,
      alternates: {
        canonical: url,
        languages: buildLocalLandingAlternates(localKey),
      },
      ...buildSocial({
        locale,
        title: landing.metaTitle,
        description: landing.metaDescription,
        url,
      }),
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
    ...buildSocial({
      locale,
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${siteUrl}/${locale}${path}`,
    }),
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
    return (
      <>
        <PageJsonLd
          locale={locale as Locale}
          url={`${siteUrl}/${locale}/${service}`}
          name={headingText(dict.workPage.h1)}
          description={dict.workPage.metaDescription}
        />
        <WorkListPage locale={locale as Locale} dict={dict} />
      </>
    );
  }

  if (isLegalSlug(locale, service)) {
    const legalContent = getLegalContent(locale);
    return (
      <>
        <PageJsonLd
          locale={locale as Locale}
          url={`${siteUrl}/${locale}/${service}`}
          name={legalContent.h1}
          description={legalContent.metaDescription}
        />
        <LegalPage content={legalContent} />
      </>
    );
  }

  if (isStudioSlug(locale, service)) {
    const localeTyped = locale as Locale;
    const content = getStudioContent(localeTyped);
    return (
      <>
        <StudioJsonLd locale={localeTyped} content={content} url={`${siteUrl}/${locale}/${service}`} />
        <PageJsonLd
          locale={localeTyped}
          url={`${siteUrl}/${locale}/${service}`}
          name={headingText(content.h1)}
          description={content.metaDescription}
        />
        <StudioPage content={content} locale={localeTyped} />
      </>
    );
  }

  const localKey = resolveLocalLanding(locale, service);
  if (localKey) {
    const landing = getLocalLandingContent(localKey);
    const url = `${siteUrl}/${locale}/${service}`;
    return (
      <>
        <ServiceJsonLd
          locale={locale as Locale}
          name={headingText(landing.h1)}
          description={landing.metaDescription}
          url={url}
          content={landing}
        />
        <LocalLandingPage content={landing} locale={locale as Locale} />
      </>
    );
  }

  const resolved = getContent(locale, service);
  if (!resolved) notFound();

  return (
    <>
      <ServiceJsonLd
        locale={resolved.locale}
        name={headingText(resolved.content.h1)}
        description={resolved.content.metaDescription}
        url={`${siteUrl}/${resolved.locale}/${service}`}
        content={resolved.content}
      />
      <ServicePage content={resolved.content} locale={resolved.locale} />
    </>
  );
}
