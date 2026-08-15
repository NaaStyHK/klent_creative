import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, siteUrl, type Locale } from "@/lib/i18n/config";
import { buildSocial } from "@/lib/seo";
import { workListingSlug, isWorkListingSlug, projectSlugs, resolveProjectSlug, buildProjectAlternates } from "@/lib/projects";
import { getProjectContent } from "@/content/projects";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import ProjectDetailPage from "@/components/projects/ProjectDetailPage";
import ProjectJsonLd from "@/components/seo/ProjectJsonLd";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projectSlugs.map((project) => ({ locale, service: workListingSlug[locale], project })),
  );
}

function resolve(localeParam: string, serviceParam: string, projectParam: string) {
  if (!isLocale(localeParam)) return null;
  if (!isWorkListingSlug(localeParam, serviceParam)) return null;
  const slug = resolveProjectSlug(projectParam);
  if (!slug) return null;
  return { locale: localeParam as Locale, slug, content: getProjectContent(slug, localeParam as Locale) };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service: string; project: string }>;
}): Promise<Metadata> {
  const { locale, service, project } = await params;
  const resolved = resolve(locale, service, project);
  if (!resolved) return {};
  const { content, slug, locale: typedLocale } = resolved;
  const path = `/${service}/${project}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `${siteUrl}/${locale}${path}`,
      languages: buildProjectAlternates(slug),
    },
    ...buildSocial({
      locale: typedLocale,
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${siteUrl}/${locale}${path}`,
      image: content.image,
    }),
  };
}

export default async function ProjectRoutePage({
  params,
}: {
  params: Promise<{ locale: string; service: string; project: string }>;
}) {
  const { locale, service, project } = await params;
  const resolved = resolve(locale, service, project);
  if (!resolved) notFound();
  const dict = getDictionary(resolved.locale);

  return (
    <>
      <ProjectJsonLd
        locale={resolved.locale}
        name={`${resolved.content.name[0]} ${resolved.content.name[1]}`}
        description={resolved.content.metaDescription}
        url={`${siteUrl}/${resolved.locale}/${service}/${project}`}
        image={resolved.content.image}
      />
      <ProjectDetailPage locale={resolved.locale} dict={dict} content={resolved.content} />
    </>
  );
}
