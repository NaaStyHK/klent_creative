import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { workListingSlug } from "@/lib/projects";
import { getAllProjects } from "@/content/projects";
import ProjectPreviewMedia from "@/components/projects/ProjectPreviewMedia";

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

      <section className="work-list work-list--editorial reveal-up">
        {projects.map((project, index) => (
          <article className={`work-project-card case-card case-card--${project.slug}`} key={project.slug}>
            <Link
              className="case-media hoverable"
              href={`/${locale}/${listingSlug}/${project.slug}`}
              aria-label={`${dict.workPage.viewProject}: ${project.name.join(" ")}`}
            >
              <ProjectPreviewMedia slug={project.slug} image={project.image} alt={project.alt} />
            </Link>

            <div className="case-info">
              <div className="case-index mono">
                {String(index + 1).padStart(2, "0")} / {project.category}
              </div>
              <div className="case-info-main">
                <span className="concept-tag">{project.badge ?? dict.workPage.conceptTag}</span>
                <h2 className="case-name">
                  {project.name[0]}
                  {project.name[1] && <>{" "}<br />{project.name[1]}</>}
                </h2>
                <p className="case-desc">{project.intro}</p>
                <div className="case-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <Link className="case-link magnetic" href={`/${locale}/${listingSlug}/${project.slug}`}>
                  {dict.workPage.viewProject}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
