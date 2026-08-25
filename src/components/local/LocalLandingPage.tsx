import renderHeading from "@/components/ui/RichHeading";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { LocalLandingContent } from "@/lib/i18n/local-landing-content";
import { workListingSlug } from "@/lib/projects";

/**
 * Renders a local landing with the sections a service page already owns
 * (hero, features, list, process, faq, cta) plus the four blocks a commercial
 * page for a territory needs.
 *
 * Every className here already exists in globals.css and is already used by
 * ServicePage or the home page, with one exception: .related-nav, the row list
 * shared with ServicePage, which reuses the blog row treatment and the site's
 * own tokens. The point is that these pages look like they have always been
 * part of the site, not like a second template bolted next to the first.
 *
 * Server component throughout — nothing here needs client JavaScript, so the
 * pages add none.
 */
export default function LocalLandingPage({
  content,
  locale,
}: {
  content: LocalLandingContent;
  locale: Locale;
}) {
  return (
    <>
      <section className="service-page-hero">
        <div className="eyebrow mono">{content.eyebrow}</div>
        <h1 className="headline headline--display">{renderHeading(content.h1)}</h1>
        <p className="service-page-intro reveal-up">{content.intro}</p>
      </section>

      <section className="service-features">
        {content.features.map((f) => (
          <div className="service-feature reveal-up" key={f.title}>
            {/* h2 rather than h3: this block sits directly under the page h1, so
                an h3 would skip a level and break the heading ladder. */}
            <h2>{f.title}</h2>
            <p>{f.body}</p>
          </div>
        ))}
      </section>

      {content.benefits && (
        <section className="services">
          <div className="section-head reveal-up">
            <div className="eyebrow mono">{content.benefits.eyebrow}</div>
            <h2 className="headline headline--display">{renderHeading(content.benefits.headline)}</h2>
          </div>
          {content.benefits.items.map((item) => (
            <div className="service reveal-up" key={item.num}>
              <div className="mono">{item.num}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <div className="arrow" aria-hidden="true">↗︎</div>
            </div>
          ))}
        </section>
      )}

      {content.process && (
        <section className="process">
          <div className="section-head reveal-up">
            <div className="eyebrow mono">{content.process.eyebrow}</div>
            <h2 className="headline headline--display">{renderHeading(content.process.headline)}</h2>
          </div>
          <div className="steps">
            {content.process.steps.map((step) => (
              <div className="step reveal-up" key={step.num}>
                <div className="step-num mono">{step.num}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.safeguard && (
        <section className="services">
          <div className="section-head reveal-up">
            <div className="eyebrow mono">{content.safeguard.eyebrow}</div>
            <h2 className="headline headline--display">{renderHeading(content.safeguard.headline)}</h2>
            <p className="service-page-intro">{content.safeguard.intro}</p>
          </div>
          {content.safeguard.items.map((item, i) => (
            <div className="service reveal-up" key={item.title}>
              <div className="mono">{String(i + 1).padStart(2, "0")}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <div className="arrow" aria-hidden="true">↗︎</div>
            </div>
          ))}
        </section>
      )}

      {content.coverage && (
        <section className="service-page-hero service-page-hero--inline">
          <div className="eyebrow mono">{content.coverage.eyebrow}</div>
          <h2 className="headline headline--display">{renderHeading(content.coverage.headline)}</h2>
          <p className="service-page-intro reveal-up">{content.coverage.intro}</p>
          {/* Plain text rather than a card grid: eight place names do not need
              eight boxes, and a wall of city cards is the tell of a page built
              for a search engine rather than a reader. */}
          <p className="eyebrow mono reveal-up">{content.coverage.places.join("  ·  ")}</p>
          <p className="eyebrow mono">{content.coverage.note}</p>
        </section>
      )}

      {content.pricing && (
        <section className="services">
          <div className="section-head reveal-up">
            <div className="eyebrow mono">{content.pricing.eyebrow}</div>
            <h2 className="headline headline--display">{renderHeading(content.pricing.headline)}</h2>
            <p className="service-page-intro">{content.pricing.intro}</p>
          </div>
          {content.pricing.rows.map((row) => (
            <div className="service service--price reveal-up" key={row.label}>
              <div className="mono">{row.range}</div>
              <h3>{row.label}</h3>
              <p>{row.body}</p>
            </div>
          ))}
          <p className="eyebrow mono">{content.pricing.note}</p>
        </section>
      )}

      {content.showcase && (
        <section className="services">
          <div className="section-head reveal-up">
            <div className="eyebrow mono">{content.showcase.eyebrow}</div>
            <h2 className="headline headline--display">{renderHeading(content.showcase.headline)}</h2>
            <p className="service-page-intro">{content.showcase.intro}</p>
          </div>
          {content.showcase.items.map((item) => (
            <Link
              className="service hoverable reveal-up"
              href={`/${locale}/${workListingSlug[locale]}/${item.slug}`}
              key={item.slug}
            >
              <div className="mono">{item.meta}</div>
              <h3>{item.name}</h3>
              <p>{item.body}</p>
              <div className="arrow" aria-hidden="true">↗︎</div>
            </Link>
          ))}
        </section>
      )}

      {content.faq && (
        <section aria-labelledby="local-faq-title">
          <div className="section-head reveal-up">
            <div className="eyebrow mono">{content.faq.eyebrow}</div>
            <h2 className="headline headline--display" id="local-faq-title">
              {renderHeading(content.faq.headline)}
            </h2>
          </div>
          <div className="service-features">
            {content.faq.items.map((item) => (
              <div className="service-feature reveal-up" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.related && (
        <section className="service-page-hero service-page-hero--inline">
          <div className="eyebrow mono">{content.related.label}</div>
          {/* A div with the landmark role, not a <nav>: globals.css styles the
              bare `nav` selector as the site header — position:fixed, z-index
              100, its own padding — and that would have applied here too. */}
          <div className="related-nav reveal-up" role="navigation" aria-label={content.related.label}>
            {content.related.links.map((link) => (
              <Link className="related-link hoverable" href={link.href} key={link.href}>
                <span>{link.text}</span>
                <span className="related-arrow" aria-hidden="true">↗︎</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="cta">
        <div className="ring" />
        <div className="mono" style={{ marginBottom: 26, zIndex: 2 }}>
          {content.closingKicker}
        </div>
        <h2 className="reveal-up">
          {renderHeading(content.closingHeadline[0])}
          {" "}<br />
          {renderHeading(content.closingHeadline[1])}
        </h2>
        <Link className="mono hoverable magnetic" href={`/${locale}/contact`}>
          {content.ctaButton}
        </Link>
      </section>
    </>
  );
}
