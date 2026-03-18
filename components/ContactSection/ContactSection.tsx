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
  const [charCount, setCharCount] = useState(0);

  const { ref: leftRef,  inView: leftVisible  } = useInView({ threshold: 0.12 });
  const { ref: rightRef, inView: rightVisible } = useInView({ threshold: 0.08 });

  const lv = (cls: string) => `${cls}${leftVisible ? " is-visible" : ""}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd    = new FormData(e.currentTarget);
    const email = fd.get("email") as string;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr(true);
      return;
    }
    setEmailErr(false);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  }

  return (
    <section id="contact" className="contact-section">

      {/* Dot grid overlay */}
      <div className="contact-bg-dots" aria-hidden="true" />

      <div className="site-container">
        <div className="contact-grid">

          {/* ── Gauche ── */}
          <div className="contact-info" ref={leftRef as React.RefObject<HTMLDivElement>}>

            {/* Decorative vertical accent line */}
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

              {/* Email with animated arrow */}
              <a href={`mailto:${dict.infoEmail}`} className="contact-email-link">
                <span className="contact-email-icon" aria-hidden="true">↗</span>
                {dict.infoEmail}
              </a>

              {/* Meta cards */}
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

              {/* Social pills */}
              <div className="contact-socials">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-pill"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-pill"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>

          {/* ── Droite — formulaire ── */}
          <div
            className={`contact-form-shell fade-up stagger-2${rightVisible ? " is-visible" : ""}`}
            ref={rightRef as React.RefObject<HTMLDivElement>}
          >
            {/* macOS-style header dots */}
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
                <strong>Message envoyé !</strong>
                <p>{dict.successMessage}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>

                {/* Row — name + email */}
                <div className="contact-form-row">

                  {/* Name — floating label */}
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

                  {/* Email — floating label */}
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
                      <span className="contact-email-err">Email invalide</span>
                    )}
                  </div>
                </div>

                {/* Select — fixed eyebrow label */}
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

                {/* Textarea */}
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

                {/* Submit */}
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