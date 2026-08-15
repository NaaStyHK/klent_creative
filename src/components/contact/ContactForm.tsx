"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { ContactForm as Strings } from "@/lib/i18n/dictionary";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { LIMITS, validateContact, type ContactErrors } from "@/lib/contact-validation";

const INITIAL: ContactState = { status: "idle" };

export default function ContactForm({ locale, t }: { locale: Locale; t: Strings }) {
  const [state, action, pending] = useActionState(sendContact, INITIAL);
  const [isProject, setIsProject] = useState(true);
  const statusRef = useRef<HTMLParagraphElement>(null);

  /**
   * Client-side copy of the same rules the server runs. It exists purely so a
   * mistyped address is flagged on the spot rather than after a round trip;
   * the server still re-validates everything and remains the authority.
   */
  const [clientErrors, setClientErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const readValues = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const str = (key: string) => String(data.get(key) ?? "");
    return {
      name: str("name"),
      email: str("email"),
      company: str("company"),
      message: str("message"),
    };
  };

  /** Re-checks one field on blur, and only surfaces errors for fields already left. */
  const handleBlur = (field: keyof ContactErrors) => (event: React.FocusEvent<HTMLElement>) => {
    const form = event.currentTarget.closest("form");
    if (!form) return;
    const next = validateContact(readValues(form), t);
    setTouched((prev) => ({ ...prev, [field]: true }));
    setClientErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const found = validateContact(readValues(event.currentTarget), t);
    if (Object.keys(found).length) {
      // Blocks the action so an invalid submission never reaches the network.
      event.preventDefault();
      setClientErrors(found);
      setTouched({ name: true, email: true, company: true, message: true });
      const first = event.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setClientErrors({});
  };

  // Move focus to the outcome once the server answers. Without this a screen
  // reader user submits and hears nothing: the button stays where it is and
  // the result appears somewhere else on the page.
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="contact-form-done" role="status">
        <p className="contact-form-done-title" ref={statusRef} tabIndex={-1}>
          {t.successTitle}
        </p>
        <p className="contact-form-done-body">{t.successBody}</p>
      </div>
    );
  }

  const v = state.values ?? {};
  const shown = (field: keyof ContactErrors) =>
    (touched[field] ? clientErrors[field] : undefined) ?? state.errors?.[field];
  const failedWithoutFieldErrors = state.status === "error" && !state.errors;

  return (
    <form className="contact-form" action={action} onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot. Hidden from sight and from assistive tech, and skipped by
          the tab order, so only an automated filler ever completes it. */}
      <div className="contact-hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="contact-required-note mono">{t.requiredNote}</p>

      <fieldset className="contact-field contact-field--choice">
        <legend className="contact-label mono">{t.intentLabel}</legend>
        <div className="contact-radios">
          {[
            { value: "project", label: t.intentProject },
            { value: "question", label: t.intentQuestion },
          ].map((option) => (
            <label className="contact-radio" key={option.value}>
              <input
                type="radio"
                name="intent"
                value={option.value}
                defaultChecked={(v.intent ?? "project") === option.value}
                onChange={() => setIsProject(option.value === "project")}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Project-only questions. Rendered conditionally rather than hidden with
          CSS so unanswered fields never reach the server. */}
      {isProject && (
        <>
          <fieldset className="contact-field contact-field--choice">
            <legend className="contact-label mono">
              {t.serviceLabel} <span className="contact-optional">{t.serviceHint}</span>
            </legend>
            <div className="contact-checks">
              {t.services.map((service) => (
                <label className="contact-check" key={service.value}>
                  <input type="checkbox" name="services" value={service.value} />
                  <span>{service.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="contact-row">
            <div className="contact-field">
              <label className="contact-label mono" htmlFor="budget">
                {t.budgetLabel}
              </label>
              <select id="budget" name="budget" defaultValue={v.budget ?? "unknown"}>
                {t.budgets.map((b) => (
                  <option value={b.value} key={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="contact-field">
              <label className="contact-label mono" htmlFor="timeline">
                {t.timelineLabel}
              </label>
              <select id="timeline" name="timeline" defaultValue={v.timeline ?? "undecided"}>
                {t.timelines.map((tl) => (
                  <option value={tl.value} key={tl.value}>
                    {tl.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}

      <div className="contact-row">
        <div className="contact-field">
          <label className="contact-label mono" htmlFor="name">
            {t.nameLabel} <span className="contact-required" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={v.name ?? ""}
            maxLength={LIMITS.name.max}
            onBlur={handleBlur("name")}
            aria-describedby={shown("name") ? "name-error" : undefined}
            aria-invalid={shown("name") ? true : undefined}
          />
          {shown("name") && (
            <p className="contact-error" id="name-error" role="alert">
              {shown("name")}
            </p>
          )}
        </div>
        <div className="contact-field">
          <label className="contact-label mono" htmlFor="email">
            {t.emailLabel} <span className="contact-required" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={v.email ?? ""}
            maxLength={LIMITS.email.max}
            onBlur={handleBlur("email")}
            aria-describedby={shown("email") ? "email-error" : undefined}
            aria-invalid={shown("email") ? true : undefined}
          />
          {shown("email") && (
            <p className="contact-error" id="email-error" role="alert">
              {shown("email")}
            </p>
          )}
        </div>
      </div>

      <div className="contact-field">
        <label className="contact-label mono" htmlFor="company">
          {t.companyLabel} <span className="contact-optional">{t.optional}</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          defaultValue={v.company ?? ""}
          maxLength={LIMITS.company.max}
          onBlur={handleBlur("company")}
          aria-describedby={shown("company") ? "company-error" : undefined}
          aria-invalid={shown("company") ? true : undefined}
        />
        {shown("company") && (
          <p className="contact-error" id="company-error" role="alert">
            {shown("company")}
          </p>
        )}
      </div>

      <div className="contact-field">
        <label className="contact-label mono" htmlFor="message">
          {t.messageLabel} <span className="contact-required" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={v.message ?? ""}
          maxLength={LIMITS.message.max}
          onBlur={handleBlur("message")}
          placeholder={isProject ? t.messagePlaceholderProject : t.messagePlaceholderQuestion}
          aria-describedby={shown("message") ? "message-error" : undefined}
          aria-invalid={shown("message") ? true : undefined}
        />
        {shown("message") && (
          <p className="contact-error" id="message-error" role="alert">
            {shown("message")}
          </p>
        )}
      </div>

      {failedWithoutFieldErrors && (
        <p className="contact-error contact-error--form" ref={statusRef} tabIndex={-1} role="alert">
          <strong>{t.errorTitle}</strong> {t.errorBody}
        </p>
      )}

      <div className="contact-submit-row">
        <button className="contact-submit mono hoverable" type="submit" disabled={pending}>
          {pending ? t.submitting : t.submit}
        </button>
        <p className="contact-privacy">{t.privacy}</p>
      </div>
    </form>
  );
}
