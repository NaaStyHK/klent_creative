import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { workListingSlug } from "@/lib/projects";

export default function Showcase({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { work } = dict;
  const listingSlug = workListingSlug[locale];

  return (
    <section className="work showcase" id="work">
      <div className="section-head reveal-up">
        <div className="eyebrow mono">{work.eyebrow}</div>
        <div>
          <h2 className="headline">
            {work.headline[0]}
            <br />
            {work.headline[1]}
          </h2>
          <p className="work-intro">{work.description}</p>
        </div>
      </div>

      <div className="showcase-grid">
        {work.cases.map((c) => (
          <article className={`case-card case-card--${c.slug} reveal-up`} data-cursor={c.cursor} key={c.slug}>
            <Link className="case-media hoverable" href={`/${locale}/${listingSlug}/${c.slug}`} aria-label={`${c.link}: ${c.name.join(" ")}`}>
              {c.slug === "manna" ? (
                <div className="case-media-manna" aria-hidden="true">
                  <span className="case-media-manna-light" />
                  <img src="/projects/manna/logo-manna.svg" alt="" />
                  <small className="mono">Poblenou / Barcelona</small>
                </div>
              ) : (
                <img src={c.image} alt={c.alt} loading="lazy" />
              )}
            </Link>
            <div className="case-info">
              <div className="case-index mono">{c.index}</div>
              <div className="case-info-main">
                <h3 className="case-name">
                  {c.name[0]}
                  {c.name[1] && <><br />{c.name[1]}</>}
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
