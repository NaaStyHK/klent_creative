import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { ProjectContent } from "@/lib/i18n/project-content";
import { workListingSlug } from "@/lib/projects";

export default function ProjectDetailPage({
  locale,
  dict,
  content,
}: {
  locale: Locale;
  dict: Dictionary;
  content: ProjectContent;
}) {
  if (content.caseStudy) {
    const study = content.caseStudy;
    const swatchTextColor = (hex: string) => {
      const clean = hex.replace("#", "");
      const value = Number.parseInt(clean.length === 3 ? clean.split("").map((digit) => digit + digit).join("") : clean, 16);
      const red = (value >> 16) & 255;
      const green = (value >> 8) & 255;
      const blue = value & 255;
      return red * 0.299 + green * 0.587 + blue * 0.114 > 155 ? study.theme.dark : study.theme.secondary;
    };
    const caseLabels = locale === "fr"
      ? {
          year: "Année", location: "Localisation", scope: "Périmètre", status: "Statut",
          symbol: "Symbole compact / Avatar / Sceau", allProjects: "Voir tous les projets ↗",
          typeDisplayNote: "Typographie display — caractère & émotion",
          typeFunctionalNote: "Typographie fonctionnelle — précision & lisibilité",
        }
      : locale === "en"
        ? {
            year: "Year", location: "Location", scope: "Scope", status: "Status",
            symbol: "Compact symbol / Avatar / Stamp", allProjects: "View all projects ↗",
            typeDisplayNote: "Display typeface — character & emotion",
            typeFunctionalNote: "Functional typeface — precision & legibility",
          }
        : {
            year: "Año", location: "Ubicación", scope: "Alcance", status: "Estado",
            symbol: "Símbolo compacto / Avatar / Sello", allProjects: "Ver todos los proyectos ↗",
            typeDisplayNote: "Tipografía display — carácter y emoción",
            typeFunctionalNote: "Tipografía funcional — precisión y legibilidad",
          };
    const oxploriaLogoLabels = locale === "fr"
      ? {
          primary: "Version principale / Blanc et jaune sur noir",
          secondary: "Version secondaire / Noir et jaune sur blanc",
        }
      : locale === "en"
        ? {
            primary: "Primary version / White and yellow on black",
            secondary: "Secondary version / Black and yellow on white",
          }
        : {
            primary: "Versión principal / Blanco y amarillo sobre negro",
            secondary: "Versión secundaria / Negro y amarillo sobre blanco",
          };

    return (
      <article
        className={`case-study${study.abstractCover ? " case-study--abstract" : ""}${study.variant ? ` case-study--${study.variant}` : ""}`}
        style={{
          "--case-red": study.theme.primary,
          "--case-cream": study.theme.secondary,
          "--case-coal": study.theme.dark,
          "--case-acid": study.theme.accent,
        } as CSSProperties}
      >
        <header className="case-study-hero">
          <div className="case-study-topline">
            <Link className="case-study-back mono hoverable" href={`/${locale}/${workListingSlug[locale]}`}>
              {dict.workPage.backToWork}
            </Link>
            <span className="concept-tag">{content.badge ?? dict.workPage.conceptTag}</span>
          </div>

          <div className="case-study-title-grid">
            <div>
              <p className="case-study-category mono">{content.category}</p>
              <h1 className="case-study-title">
                <span>{content.name[0]}</span>
                {content.name[1] && <span>{content.name[1]}</span>}
              </h1>
            </div>
            <div className="case-study-intro">
              <p>{content.intro}</p>
              <div className="project-tags">
                {content.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <dl className="case-study-facts mono">
            <div><dt>{caseLabels.year}</dt><dd>{study.year}</dd></div>
            <div><dt>{caseLabels.location}</dt><dd>{study.location}</dd></div>
            <div><dt>{caseLabels.scope}</dt><dd>{study.scope}</dd></div>
            <div><dt>{caseLabels.status}</dt><dd>{study.status}</dd></div>
          </dl>
        </header>

        <figure
          className={`case-study-cover${study.abstractCover ? " case-study-cover--abstract" : ""}${
            study.coverBanner ? " case-study-cover--banner" : ""
          }`}
          aria-label={study.abstractCover ? content.alt : undefined}
        >
          {study.abstractCover ? (
            <div className="case-study-cover-gradient" aria-hidden="true">
              <span className="case-study-cover-orb case-study-cover-orb--one" />
              <span className="case-study-cover-orb case-study-cover-orb--two" />
              <span className="case-study-cover-orb case-study-cover-orb--three" />
            </div>
          ) : (
            <Image src={content.image} alt={content.alt} fill sizes="100vw" priority />
          )}
          {/* The page already carries the project name as its h1 directly
              above, so repeating it inside the cover reads as a duplicate. */}
          {study.variant !== "oxploria" && !study.coverBanner && (
            <div className="case-study-cover-mark" aria-hidden="true">
              {study.logoLines.map((line) => <span key={line}>{line}</span>)}
            </div>
          )}
          <figcaption className="mono">{study.coverCaption}</figcaption>
        </figure>

        <section className="case-study-editorial reveal-up">
          <p className="case-study-eyebrow mono">{study.conceptEyebrow}</p>
          <div>
            <h2>{study.conceptTitle}</h2>
            <p>{study.conceptBody}</p>
          </div>
        </section>

        <section className="case-study-identity">
          <div className="case-study-section-head reveal-up">
            <p className="case-study-eyebrow mono">{study.identityEyebrow}</p>
            <div>
              <h2>{study.identityTitle}</h2>
              <p>{study.identityBody}</p>
            </div>
          </div>

          <div className="brand-system-grid">
            <div className={`brand-logo-board${study.logo ? " brand-logo-board--asset" : ""}`}>
              {study.logo ? (
                <div className="brand-logo-asset">
                  <Image
                    src={study.variant === "oxploria" ? "/projects/oxploria/logo-oxploria-white-yellow-v3.svg" : study.logo}
                    alt={`Logo ${content.name.filter(Boolean).join(" ")}`}
                    fill
                    sizes="(max-width: 850px) 80vw, 50vw"
                  />
                </div>
              ) : (
                <div className="brand-logo-lockup" aria-label={content.name.filter(Boolean).join(" ")}>
                  {study.logoLines.map((line) => <span key={line}>{line}</span>)}
                </div>
              )}
              <p className="mono">{study.variant === "oxploria" ? oxploriaLogoLabels.primary : study.logoNote}</p>
            </div>
            <div className={`brand-symbol-board${study.logo && !study.symbolLetters ? " brand-symbol-board--logo" : ""}`} aria-label={study.symbolLetters ? `Símbolo ${study.symbolLetters.join("")}` : `Versión negra del logo ${content.name.filter(Boolean).join(" ")}`}>
              {study.logo && !study.symbolLetters ? (
                <div className="brand-logo-asset brand-logo-asset--black">
                  <Image
                    src={study.variant === "oxploria" ? "/projects/oxploria/logo-oxploria-dark-yellow.svg" : study.logo}
                    alt={`Logo negro ${content.name.filter(Boolean).join(" ")}`}
                    fill
                    sizes="(max-width: 850px) 80vw, 30vw"
                  />
                </div>
              ) : study.symbolLetters ? (
                <div className="brand-symbol">
                  {study.symbolLetters.map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
                </div>
              ) : (
                <div className="brand-symbol-phrase">{study.voiceLines[0]}</div>
              )}
              <p className="mono">
                {study.logo && !study.symbolLetters
                  ? study.variant === "oxploria"
                    ? oxploriaLogoLabels.secondary
                    : locale === "fr"
                      ? "Version monochrome / Noir sur blanc"
                      : locale === "en"
                        ? "Monochrome version / Black on white"
                        : "Versión monocroma / Negro sobre blanco"
                  : caseLabels.symbol}
              </p>
            </div>
          </div>

          <div className="brand-palette" aria-label="Paleta cromática">
            {study.colors.map((color) => (
              <div
                className="brand-swatch"
                key={color.hex}
                style={{ backgroundColor: color.hex, color: swatchTextColor(color.hex) }}
              >
                <span className="mono">{color.name}</span>
                <span className="mono">{color.hex}</span>
              </div>
            ))}
          </div>

          {study.logo ? (
            <div className="brand-type-grid brand-type-grid--specimen reveal-up">
              <div className="type-specimen type-specimen--fraunces">
                <div className="type-specimen-heading">
                  <span className="mono">{study.typePrimaryLabel}</span>
                  <p>{caseLabels.typeDisplayNote}</p>
                </div>
                <div className="type-specimen-layout">
                  <div className="type-specimen-glyph">Aa<small>Aa</small></div>
                  <div className="type-specimen-weights">
                    <div className="type-weight type-weight--regular">
                      <strong>Regular</strong>
                      <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                      <p>abcdefghijklmnopqrstuvwxyz</p>
                      <p>0123456789</p>
                    </div>
                    <div className="type-weight type-weight--medium">
                      <strong>Medium</strong>
                      <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                      <p>abcdefghijklmnopqrstuvwxyz</p>
                      <p>0123456789</p>
                    </div>
                    <div className="type-weight type-weight--semibold">
                      <strong>Semibold</strong>
                      <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                      <p>abcdefghijklmnopqrstuvwxyz</p>
                      <p>0123456789</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="type-specimen type-specimen--inter">
                <div className="type-specimen-heading">
                  <span className="mono">{study.typeSecondaryLabel}</span>
                  <p>{caseLabels.typeFunctionalNote}</p>
                </div>
                <div className="type-specimen-layout">
                  <div className="type-specimen-glyph">Aa<small>Aa</small></div>
                  <div className="type-specimen-weights">
                    <div className="type-weight type-weight--regular">
                      <strong>Regular</strong>
                      <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                      <p>abcdefghijklmnopqrstuvwxyz</p>
                      <p>0123456789</p>
                    </div>
                    <div className="type-weight type-weight--medium">
                      <strong>Medium</strong>
                      <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                      <p>abcdefghijklmnopqrstuvwxyz</p>
                      <p>0123456789</p>
                    </div>
                    <div className="type-weight type-weight--semibold">
                      <strong>Semibold</strong>
                      <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                      <p>abcdefghijklmnopqrstuvwxyz</p>
                      <p>0123456789</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="brand-type-grid reveal-up">
              <div className="brand-type-display">
                <span className="mono">{study.typePrimaryLabel}</span>
                <strong>{study.typeDisplayLines.map((line) => <span key={line}>{line}</span>)}</strong>
              </div>
              <div className="brand-type-copy">
                <span className="mono">{study.typeSecondaryLabel}</span>
                <h3>{study.typographyTitle}</h3>
                <p>{study.typographyBody}</p>
                <div className="brand-type-sample mono">{study.typeSample}</div>
              </div>
            </div>
          )}
        </section>

        <section className="case-study-voice">
          <div className="case-study-section-head reveal-up">
            <p className="case-study-eyebrow mono">{study.voiceEyebrow}</p>
            <div>
              <h2>{study.voiceTitle}</h2>
              <p>{study.voiceBody}</p>
            </div>
          </div>
          <div className="brand-voice-lines" aria-label="Mensajes de marca">
            {study.voiceLines.map((line, index) => (
              <div key={line} className={index === 1 ? "is-outline" : ""}>{line}</div>
            ))}
          </div>
        </section>

        <section className="case-study-applications">
          <div className="case-study-section-head reveal-up">
            <p className="case-study-eyebrow mono">{study.applicationsEyebrow}</p>
            <div>
              <h2>{study.applicationsTitle}</h2>
              <p>{study.applicationsBody}</p>
            </div>
          </div>

          {study.galleryImages ? (
            <div className="case-study-photo-grid">
              {study.galleryImages.map((photo, index) => (
                <figure className={`case-study-photo case-study-photo-${index + 1}`} key={photo.src}>
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 850px) 100vw, 60vw" />
                  <figcaption className="application-caption mono">{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
          <div className="application-grid">
            <div className="application-menu">
              <div className="menu-sheet">
                <div className="menu-brand">
                  {study.applicationOne.titleLines.map((line) => <span key={line}>{line}</span>)}
                </div>
                <div className="menu-list mono">
                  {study.applicationOne.rows.flatMap(([label, value]) => [
                    <span key={`${label}-label`}>{label}</span>,
                    <span key={`${label}-value`}>{value}</span>,
                  ])}
                </div>
              </div>
              <span className="application-caption mono">{study.applicationOne.caption}</span>
            </div>
            <div className="application-packaging">
              <div className="takeaway-bag">
                {study.applicationTwo.titleLines.map((line) => <span key={line}>{line}</span>)}
                <small className="mono">{study.applicationTwo.small}</small>
              </div>
              <div className="brand-sticker mono">
                {study.applicationTwo.sticker.map((line) => <span key={line}>{line}</span>)}
              </div>
              <span className="application-caption mono">{study.applicationTwo.caption}</span>
            </div>
            <figure className="application-photo">
              <Image src={content.image} alt={content.alt} fill sizes="(max-width: 850px) 100vw, 66vw" />
              <div className="application-photo-copy">
                {study.applicationPhoto.lines.map((line) => <span key={line}>{line}</span>)}
              </div>
              <figcaption className="application-caption mono">{study.applicationPhoto.caption}</figcaption>
            </figure>
          </div>
          )}
        </section>

        <section className="case-study-digital">
          <div className="case-study-digital-layout">
            <div className="case-study-section-head reveal-up">
              <p className="case-study-eyebrow mono">{study.digitalEyebrow}</p>
              <div>
                <h2>{study.digitalTitle}</h2>
                <p>{study.digitalBody}</p>
              </div>
            </div>

            <div className={`digital-browser${study.digitalScreenshot ? " digital-browser--screenshot" : ""}`}>
            {!study.digitalScreenshot && (
              <div className="digital-browser-bar mono"><span>{study.digitalMockup.url}</span><span>{study.digitalMockup.nav}</span></div>
            )}
            {study.digitalScreenshot ? (
              <a
                className="digital-browser-screenshot hoverable"
                href={study.liveUrl ?? study.digitalScreenshot}
                target="_blank"
                rel="noreferrer"
                aria-label={study.digitalMockup.cta}
              >
                <Image
                  src={study.digitalScreenshot}
                  alt={content.alt}
                  fill
                  sizes="(max-width: 850px) 100vw, 94vw"
                />
              </a>
            ) : (
              <div className="digital-browser-screen">
                <div className="digital-browser-copy">
                  <span className="mono">{study.digitalMockup.kicker}</span>
                  <strong>{study.digitalMockup.headline}</strong>
                  {study.liveUrl ? (
                    <a className="digital-browser-cta hoverable" href={study.liveUrl} target="_blank" rel="noreferrer">
                      {study.digitalMockup.cta}
                    </a>
                  ) : (
                    <span className="digital-browser-cta">{study.digitalMockup.cta}</span>
                  )}
                </div>
                <div className="digital-browser-image">
                  <Image src={content.image} alt={content.alt} fill sizes="50vw" />
                </div>
              </div>
            )}
            </div>
          </div>
        </section>

        <section className="case-study-result reveal-up">
          <p className="case-study-eyebrow mono">{study.resultEyebrow}</p>
          <h2>{study.resultHeadline}</h2>
          <p>{study.resultBody}</p>
          <Link className="case-study-next hoverable" href={`/${locale}/${workListingSlug[locale]}`}>
            {caseLabels.allProjects}
          </Link>
        </section>
      </article>
    );
  }

  return (
    <article className="blog-article">
      <Link className="blog-back mono hoverable" href={`/${locale}/${workListingSlug[locale]}`}>
        {dict.workPage.backToWork}
      </Link>
      <span className="concept-tag">{dict.workPage.conceptTag}</span>
      <h1 className="headline">
        {content.name.filter(Boolean).join(" ")}
      </h1>
      <p className="service-page-intro">{content.conceptNote}</p>
      <div className="project-tags">
        {content.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="project-hero-image">
        <Image src={content.image} alt={content.alt} fill sizes="(max-width: 850px) 100vw, 820px" priority />
      </div>

      <div className="blog-body">
        <p>{content.intro}</p>
      </div>

      <div className="project-sections">
        <div className="project-section">
          <h3>{content.briefTitle}</h3>
          <p>{content.brief}</p>
        </div>
        <div className="project-section">
          <h3>{content.approachTitle}</h3>
          <p>{content.approach}</p>
        </div>
        <div className="project-section">
          <h3>{content.resultTitle}</h3>
          <p>{content.result}</p>
        </div>
      </div>
    </article>
  );
}
