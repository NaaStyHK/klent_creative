import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { ServiceContent } from "@/lib/i18n/service-content";

export default function ServicePage({ content, locale }: { content: ServiceContent; locale: Locale }) {
  return (
    <>
      <section className="service-page-hero">
        <div className="eyebrow mono">{content.eyebrow}</div>
        <h1 className="headline">{content.h1}</h1>
        <p className="service-page-intro reveal-up">{content.intro}</p>
      </section>

      <section className="service-features">
        {content.features.map((f) => (
          <div className="service-feature reveal-up" key={f.title}>
            {/* h2, not h3: this block sits directly under the page h1 with no
                intermediate heading, so h3 skipped a level. Heading depth is
                how retrieval systems chunk a document, so a clean ladder
                matters beyond accessibility. */}
            <h2>{f.title}</h2>
            <p>{f.body}</p>
          </div>
        ))}
      </section>

      {content.benefits && (
        <section className="services">
          <div className="section-head reveal-up">
            <div className="eyebrow mono">{content.benefits.eyebrow}</div>
            <h2 className="headline">{content.benefits.headline}</h2>
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
            <h2 className="headline">{content.process.headline}</h2>
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

      {content.faq && (
        <section aria-labelledby="service-faq-title">
          <div className="section-head reveal-up">
            <div className="eyebrow mono">{content.faq.eyebrow}</div>
            <h2 className="headline" id="service-faq-title">{content.faq.headline}</h2>
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

      <section className="cta">
        <div className="ring" />
        <div className="mono" style={{ marginBottom: 26, zIndex: 2 }}>
          {content.closingKicker}
        </div>
        <h2 className="reveal-up">
          {content.closingHeadline[0]}
          {" "}<br />
          {content.closingHeadline[1]}
        </h2>
        <Link className="mono hoverable magnetic" href={`/${locale}/contact`}>
          {content.ctaButton}
        </Link>
      </section>
    </>
  );
}
