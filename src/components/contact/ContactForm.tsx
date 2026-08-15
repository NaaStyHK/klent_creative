"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { ContactForm as Strings } from "@/lib/i18n/dictionary";
import { sendContact, type ContactState } from "@/app/actions/contact";

const INITIAL: ContactState = { status: "idle" };

export default function ContactForm({ locale, t }: { locale: Locale; t: Strings }) {
  const [state, action, pending] = useActionState(sendContact, INITIAL);
  const [isProject, setIsProject] = useState(true);
  const statusRef = useRef<HTMLParagraphElement>(null);

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
  const failedWithoutFieldErrors = state.status === "error" && !state.errors;

  return (
    <form className="contact-form" action={action} noValidate>
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot. Hidden from sight and from assistive tech, and skipped by
          the tab order, so only an automated filler ever completes it. */}
      <div className="contact-hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

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
            {t.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={v.name ?? ""}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            aria-invalid={state.errors?.name ? true : undefined}
          />
          {state.errors?.name && (
            <p className="contact-error" id="name-error">
              {state.errors.name}
            </p>
          )}
        </div>
        <div className="contact-field">
          <label className="contact-label mono" htmlFor="email">
            {t.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={v.email ?? ""}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            aria-invalid={state.errors?.email ? true : undefined}
          />
          {state.errors?.email && (
            <p className="contact-error" id="email-error">
              {state.errors.email}
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
        />
      </div>

      <div className="contact-field">
        <label className="contact-label mono" htmlFor="message">
          {t.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          defaultValue={v.message ?? ""}
          placeholder={isProject ? t.messagePlaceholderProject : t.messagePlaceholderQuestion}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          aria-invalid={state.errors?.message ? true : undefined}
        />
        {state.errors?.message && (
          <p className="contact-error" id="message-error">
            {state.errors.message}
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
