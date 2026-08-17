import renderHeading from "@/components/ui/RichHeading";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { contact } = dict;
  return (
    <>
      <section className="service-page-hero">
        <div className="eyebrow mono">{contact.eyebrow}</div>
        <h1 className="headline headline--display">{renderHeading(contact.h1)}</h1>
        <p className="service-page-intro reveal-up">{contact.intro}</p>
      </section>

      <section className="contact-form-block reveal-up" aria-label={contact.form.legend}>
        <ContactForm locale={locale} t={contact.form} />
      </section>

      <div className="contact-details reveal-up">
        <div className="contact-block">
          <div className="mono">{contact.emailLabel}</div>
          <a className="hoverable" href="mailto:contact@klentcreative.com">
            contact@klentcreative.com
          </a>
        </div>
        {/* Both numbers are written exactly as they must appear on their
            Google Business Profile: same digits, same international format. A
            different spelling between site and listing is a NAP
            inconsistency, one of the things that holds a local listing back. */}
        <div className="contact-block">
          <div className="mono">{contact.phoneLabel}</div>
          <a className="hoverable" href="tel:+33758747002">
            +33 7 58 74 70 02
          </a>
          <span className="contact-phone-note mono">{contact.phoneFrance}</span>
          <br />
          <a className="hoverable" href="tel:+34615810330">
            +34 615 81 03 30
          </a>
          <span className="contact-phone-note mono">{contact.phoneSpain}</span>
        </div>
        <div className="contact-block">
          <div className="mono">{contact.locationLabel}</div>
          <span>{contact.location}</span>
        </div>
        <div className="contact-block">
          <div className="mono">{contact.socialLabel}</div>
          <a className="hoverable" href="https://www.instagram.com/klentcreative/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <br />
          <a className="hoverable" href="https://www.linkedin.com/company/klent-creative/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}
