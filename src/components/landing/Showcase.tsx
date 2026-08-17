import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { workListingSlug } from "@/lib/projects";
import ProjectPreviewMedia from "@/components/projects/ProjectPreviewMedia";

export default function Showcase({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { work } = dict;
  const listingSlug = workListingSlug[locale];

  return (
    <section className="work showcase" id="work">
      <div className="section-head reveal-up">
        <div className="eyebrow mono">{work.eyebrow}</div>
        <div>
          <h2 className="headline headline--display">
            {work.headline.map((line, i) => (
              <span key={i}>
                {i > 0 && <>{" "}<br /></>}
                {typeof line === "string"
                  ? line
                  : line.map((seg, j) =>
                      typeof seg === "string" ? (
                        seg
                      ) : (
                        <span className="outline" key={j}>
                          {seg.outline}
                        </span>
                      ),
                    )}
              </span>
            ))}
          </h2>
          <p className="work-intro">{work.description}</p>
        </div>
      </div>

      <div className="showcase-grid">
        {work.cases.map((c) => (
          <article className={`case-card case-card--${c.slug} reveal-up`} data-cursor={c.cursor} key={c.slug}>
            <Link className="case-media hoverable" href={`/${locale}/${listingSlug}/${c.slug}`} aria-label={`${c.link}: ${c.name.join(" ")}`}>
              <ProjectPreviewMedia slug={c.slug} image={c.image} alt={c.alt} />
            </Link>
            <div className="case-info">
              <div className="case-index mono">{c.index}</div>
              <div className="case-info-main">
                <h3 className="case-name">
                  {c.name[0]}
                  {c.name[1] && <>{" "}<br />{c.name[1]}</>}
                </h3>
                <p className="case-desc">{c.desc}</p>
                <div className="case-tags">
                  {c.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <Link className="case-link magnetic" href={`/${locale}/${listingSlug}/${c.slug}`}>
                  {c.link}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
