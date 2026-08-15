import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { StudioContent } from "@/lib/i18n/studio-content";

export default function StudioPage({ content, locale }: { content: StudioContent; locale: Locale }) {
  return (
    <>
      <section className="studio-editorial-hero">
        <div className="studio-hero-meta mono">
          <span>{content.eyebrow}</span>
          <span>La Rochelle / Barcelona / International</span>
        </div>

        <h1 className="studio-display reveal-up">{content.h1}</h1>

        <div className="studio-hero-grid">
          <div className="studio-focus-panel reveal-up">
            <span className="mono">{content.approachEyebrow}</span>
            <div className="studio-focus-words">
              {content.approachPoints.map((point, index) => (
                <span key={point.title} className={index === 1 ? "is-accent" : ""}>
                  {point.title}
                </span>
              ))}
            </div>
          </div>

          <div className="studio-definition reveal-up">
            <span className="studio-definition-mark" aria-hidden="true">+</span>
            <p>{content.intro}</p>
            <Link className="studio-inline-cta mono hoverable" href={`/${locale}/contact`}>
              {content.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      <section className="studio-editorial-team">
        <div className="studio-section-heading reveal-up">
          <div className="eyebrow mono">{content.teamEyebrow}</div>
          <h2 className="headline">{content.teamTitle}</h2>
        </div>

        <div className="studio-people-grid">
          {content.members.map((member, index) => (
            <article className="studio-person reveal-up" key={member.firstName}>
              <div className="studio-person-visual">
                <span className="studio-person-index mono">0{index + 1}</span>
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.photoAlt}
                    fill
                    sizes="(max-width: 850px) 100vw, 50vw"
                  />
                ) : (
                  <span className="studio-person-initial" aria-hidden="true">
                    {member.firstName.charAt(0)}
                  </span>
                )}
                <span className="studio-person-stamp mono">KLENT / CREATIVE STUDIO</span>
              </div>
              <div className="studio-person-info">
                <div>
                  <h3>{member.firstName}</h3>
                  <p className="studio-person-role mono">{member.role}</p>
                </div>
                <p className="studio-person-languages mono">{member.languages}</p>
              </div>
              <p className="studio-person-bio">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="studio-editorial-reach">
        <div className="studio-section-heading reveal-up">
          <div className="eyebrow mono">{content.reachEyebrow}</div>
          <div>
            <h2 className="headline">{content.reachTitle}</h2>
            <p className="studio-section-body">{content.reachBody}</p>
          </div>
        </div>

        <div className="studio-market-list">
          {content.reachPoints.map((point, index) => (
            <article className="studio-market-row reveal-up" key={point.title}>
              <span className="mono">0{index + 1}</span>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
              <span className="studio-market-arrow" aria-hidden="true">↗︎</span>
            </article>
          ))}
        </div>
      </section>

      <section className="studio-editorial-approach">
        <div className="studio-section-heading is-dark reveal-up">
          <div className="eyebrow mono">{content.approachEyebrow}</div>
          <div>
            <h2 className="headline">{content.approachTitle}</h2>
            <p className="studio-section-body">{content.approachBody}</p>
          </div>
        </div>

        <div className="studio-beliefs">
          {content.approachPoints.map((point, index) => (
            <article className="studio-belief reveal-up" key={point.title}>
              <span className="studio-belief-index mono">0{index + 1}</span>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>

        <div className="studio-giant-word" aria-hidden="true">KLENT</div>
      </section>

      <section className="cta">
        <div className="ring" />
        <div className="mono" style={{ marginBottom: 26, zIndex: 2 }}>
          {content.ctaKicker}
        </div>
        <h2 className="reveal-up">
          {content.ctaHeadline[0]}
          {" "}<br />
          {content.ctaHeadline[1]}
        </h2>
        <Link className="mono hoverable magnetic" href={`/${locale}/contact`}>
          {content.ctaButton}
        </Link>
      </section>
    </>
  );
}
