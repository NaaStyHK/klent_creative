import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { workListingSlug } from "@/lib/projects";
import { getAllProjects } from "@/content/projects";

export default function WorkListPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const projects = getAllProjects(locale);
  const listingSlug = workListingSlug[locale];

  return (
    <>
      <section className="service-page-hero">
        <div className="eyebrow mono">{dict.workPage.eyebrow}</div>
        <h1 className="headline">{dict.workPage.h1}</h1>
        <p className="service-page-intro reveal-up">{dict.workPage.intro}</p>
      </section>

      <section className="work-list reveal-up">
        {projects.map((project) => (
          <Link
            className="work-card hoverable"
            href={`/${locale}/${listingSlug}/${project.slug}`}
            key={project.slug}
          >
            <div className="work-card-image">
              <Image src={project.image} alt={project.alt} fill sizes="280px" />
            </div>
            <div>
              <span className="concept-tag">{project.badge ?? dict.workPage.conceptTag}</span>
              <h2>
                {project.name[0]} {project.name[1]}
              </h2>
              <p>{project.intro}</p>
              <div className="work-card-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
