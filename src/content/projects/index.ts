import type { Locale } from "@/lib/i18n/config";
import type { ProjectSlug } from "@/lib/projects";
import type { ProjectContent } from "@/lib/i18n/project-content";
import { oxploria } from "@/content/projects/oxploria";
import { manna } from "@/content/projects/manna";

const registry: Record<ProjectSlug, Record<Locale, ProjectContent>> = {
  oxploria,
  manna,
};

export function getProjectContent(slug: ProjectSlug, locale: Locale): ProjectContent {
  return registry[slug][locale];
}

export function getAllProjects(locale: Locale): Array<ProjectContent & { slug: ProjectSlug }> {
  return (Object.keys(registry) as ProjectSlug[]).map((slug) => ({
    slug,
    ...registry[slug][locale],
  }));
}
