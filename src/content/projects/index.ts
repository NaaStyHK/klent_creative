import type { Locale } from "@/lib/i18n/config";
import type { ProjectSlug } from "@/lib/projects";
import type { ProjectContent } from "@/lib/i18n/project-content";
import { sinAmorNo } from "@/content/projects/sin-amor-no";
import { casaBrava } from "@/content/projects/casa-brava";
import { northClub } from "@/content/projects/north-club";
import { manna } from "@/content/projects/manna";

const registry: Record<ProjectSlug, Record<Locale, ProjectContent>> = {
  "sin-amor-no": sinAmorNo,
  "casa-brava": casaBrava,
  "north-club": northClub,
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
