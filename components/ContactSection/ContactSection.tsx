"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";

type ContactDict = {
  eyebrow: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  projectLabel: string;
  projectOptions: string[];
  messagePlaceholder: string;
  submitLabel: string;
  successMessage: string;
  sentTitle: string;
  emailInvalidMessage: string;
  submitErrMessage: string;
  infoEmail: string;
  infoResponseLabel: string;
  infoResponseValue: string;
  infoAvailLabel: string;
  infoAvailValue: string;
};

const MAX_CHARS = 500;

export default function Contact({ dict }: { dict: ContactDict }) {
  const [sent, setSent]           = useState(false);
  const [loading, setLoading]     = useState(false);
  const [emailErr, setEmailErr]   = useState(false);
  const [submitErr, setSubmitErr] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const { ref: leftRef,  inView: leftVisible  } = useInView({ threshold: 0.12 });
  const { ref: rightRef, inView: rightVisible } = useInView({ threshold: 0.08 });

  const lv = (cls: string) => `${cls}${leftVisible ? " is-visible" : ""}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitErr(false);

    const fd      = new FormData(e.currentTarget);
    const name    = fd.get("name") as string;
    const email   = fd.get("email") as string;
    const project = fd.get("project") as string;
    const message = fd.get("message") as string;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr(true);
      return;
    }

    setEmailErr(false);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, project, message }),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      setSent(true);
    } catch {
      setSubmitErr(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="contact-section">

      <div className="contact-bg-dots" aria-hidden="true" />

      <div className="site-container">
        <div className="contact-grid">

          {/* ── Gauche ── */}
          <div className="contact-info" ref={leftRef as React.RefObject<HTMLDivElement>}>

            <div className={lv("contact-deco-line fade-left")} aria-hidden="true" />

            <p className={lv("contact-eyebrow fade-up")}>{dict.eyebrow}</p>

            <h2 className={lv("contact-title fade-up stagger-1")}>
              {dict.titleLine1}<br />
              <span>{dict.titleHighlight}</span>
            </h2>

            <p className={lv("contact-description fade-up stagger-2")}>
              {dict.description}
            </p>

            <div className={lv("contact-details fade-up stagger-3")}>

              <a href={`mailto:${dict.infoEmail}`} className="contact-email-link">
                <span className="contact-email-icon" aria-hidden="true">↗</span>
                {dict.infoEmail}
              </a>

              <div className="contact-meta-row">
                <div className="contact-meta-item">
                  <span>{dict.infoResponseLabel}</span>
                  <strong>{dict.infoResponseValue}</strong>
                </div>
                <div className="contact-meta-item">
                  <span>{dict.infoAvailLabel}</span>
                  <strong className="contact-meta-accent">{dict.infoAvailValue}</strong>
                </div>
              </div>

              <div className="contact-socials">
                <a
                  href="https://www.linkedin.com/in/kevin-hafsi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-pill"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </div>

          {/* ── Droite — formulaire ── */}
          <div
            className={`contact-form-shell fade-up stagger-2${rightVisible ? " is-visible" : ""}`}
            ref={rightRef as React.RefObject<HTMLDivElement>}
          >
            <div className="contact-form-header" aria-hidden="true">
              <span className="contact-form-dot" />
              <span className="contact-form-dot" />
              <span className="contact-form-dot" />
            </div>

            {sent ? (
              <div className="contact-success">
                <div className="contact-success-icon">
                  <svg viewBox="0 0 52 52" fill="none" aria-hidden="true">
                    <circle
                      cx="26" cy="26" r="24"
                      stroke="currentColor" strokeWidth="2"
                      className="cs-circle"
                    />
                    <path
                      d="M14 27l8 8 16-16"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      className="cs-check"
                    />
                  </svg>
                </div>
                <strong>{dict.sentTitle}</strong>
                <p>{dict.successMessage}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>

                <div className="contact-form-row">
                  <div className="contact-field">
                    <input
                      type="text"
                      name="name"
                      id="contact-name"
                      required
                      placeholder=" "
                      className="contact-input"
                    />
                    <label htmlFor="contact-name" className="contact-field-label">
                      {dict.namePlaceholder}
                    </label>
                  </div>

                  <div className="contact-field">
                    <input
                      type="email"
                      name="email"
                      id="contact-email"
                      required
                      placeholder=" "
                      className={`contact-input${emailErr ? " contact-input--error" : ""}`}
                      onChange={() => setEmailErr(false)}
                    />
                    <label htmlFor="contact-email" className="contact-field-label">
                      {dict.emailPlaceholder}
                    </label>
                    {emailErr && (
                      <span className="contact-email-err">{dict.emailInvalidMessage}</span>
                    )}
                  </div>
                </div>

                <div className="contact-select-wrap">
                  <label htmlFor="contact-project" className="contact-select-label">
                    {dict.projectLabel}
                  </label>
                  <select
                    name="project"
                    id="contact-project"
                    className="contact-input contact-select"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled />
                    {dict.projectOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="contact-textarea-wrap">
                  <textarea
                    name="message"
                    required
                    placeholder={dict.messagePlaceholder}
                    className="contact-input contact-textarea"
                    rows={5}
                    maxLength={MAX_CHARS}
                    onChange={(e) => setCharCount(e.target.value.length)}
                  />
                  <span className={`contact-charcount${charCount > MAX_CHARS * 0.85 ? " is-warn" : ""}`}>
                    {charCount}/{MAX_CHARS}
                  </span>
                </div>

                {submitErr && (
                  <p className="contact-submit-err">
                    {dict.submitErrMessage}{" "}
                    <a href={`mailto:${dict.infoEmail}`}>{dict.infoEmail}</a>.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary contact-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="contact-loader">
                      <span /><span /><span />
                    </span>
                  ) : (
                    <>
                      {dict.submitLabel}
                      <span className="btn-arrow contact-submit-arrow">→</span>
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}