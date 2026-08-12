import type { Dictionary } from "@/lib/i18n/dictionary";

export default function ContactPage({ dict }: { dict: Dictionary }) {
  const { contact } = dict;
  return (
    <>
      <section className="service-page-hero">
        <div className="eyebrow mono">{contact.eyebrow}</div>
        <h1 className="headline">{contact.h1}</h1>
        <p className="service-page-intro reveal-up">{contact.intro}</p>
      </section>

      <div className="contact-details reveal-up">
        <div className="contact-block">
          <div className="mono">{contact.emailLabel}</div>
          <a className="hoverable" href="mailto:hello@klent.studio">
            hello@klent.studio
          </a>
        </div>
        <div className="contact-block">
          <div className="mono">{contact.locationLabel}</div>
          <span>{contact.location}</span>
        </div>
        <div className="contact-block">
          <div className="mono">{contact.socialLabel}</div>
          <a className="hoverable" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <br />
          <a className="hoverable" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}
