"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

type ProcessStep = { number: string; title: string; description: string; tag: string };
type ProcessDict = {
  eyebrow: string; titleLine1: string; titleHighlight: string;
  description: string; steps: ProcessStep[];
};

export default function Process({ dict }: { dict: ProcessDict }) {
  const { ref: headRef, inView: headVisible } = useInView({ threshold: 0.1 });
  const { ref: trackRef, inView: trackVisible } = useInView({ threshold: 0.02 });
  const hv = (cls: string) => `${cls}${headVisible ? " is-visible" : ""}`;

  // ── Bidirectional scroll-driven activation ─────────────────────────────────
  // On recalcule activeStep à chaque scroll, dans les deux sens.
  const [activeStep, setActiveStep] = useState(-1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const computeActive = useCallback(() => {
    const mid = window.innerHeight * 0.52;
    const steps = stepRefs.current;
    const total = steps.length;

    // ── Cas 1 : le bas du DERNIER step est passé au-dessus de mid
    //    → sticky ne peut plus le retenir, tout le monde est done ──────────────
    const lastEl = steps[total - 1];
    if (lastEl) {
      const lastRect = lastEl.getBoundingClientRect();
      if (lastRect.bottom < mid) {
        setActiveStep(total); // i < total → tous isDone
        return;
      }
    }

    // ── Cas 2 : section pas encore atteinte ──────────────────────────────────
    const firstEl = steps[0];
    if (firstEl) {
      const firstRect = firstEl.getBoundingClientRect();
      if (firstRect.top > window.innerHeight) {
        setActiveStep(-1);
        return;
      }
    }

    // ── Cas 3 : step le plus proche de mid ───────────────────────────────────
    let closest = -1;
    let minDist = Infinity;
    steps.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const dist = Math.abs(cardCenter - mid);
      if (dist < minDist && rect.bottom > 80 && rect.top < window.innerHeight - 80) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveStep(closest);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", computeActive, { passive: true });
    computeActive();
    return () => window.removeEventListener("scroll", computeActive);
  }, [computeActive]);

  return (
    <section id="process" className="process-section">
      <div className="site-container">

        {/* ── Heading ── */}
        <div className="process-heading" ref={headRef as React.RefObject<HTMLDivElement>}>
          <p className={hv("process-eyebrow fade-up")}>{dict.eyebrow}</p>
          <h2 className={hv("process-title fade-up stagger-1")}>
            {dict.titleLine1}<br /><span>{dict.titleHighlight}</span>
          </h2>
          <p className={hv("process-description fade-up stagger-2")}>{dict.description}</p>

          {/* ── Barre de progression globale ── */}
          <div className={`process-progress-bar fade-up stagger-3${headVisible ? " is-visible" : ""}`}>
            <div
              className="process-progress-fill"
              style={{
                width: activeStep < 0
                  ? "0%"
                  : `${(Math.min(activeStep + 1, dict.steps.length) / dict.steps.length) * 100}%`,
              }}
            />
            <span className="process-progress-label">
              {activeStep < 0 ? "0" : Math.min(activeStep + 1, dict.steps.length)}&nbsp;/&nbsp;{dict.steps.length}
            </span>
          </div>
        </div>

        {/* ── Steps ── */}
        <div className="process-track" ref={trackRef as React.RefObject<HTMLDivElement>}>
          {dict.steps.map((step, i) => {
            const isDone   = i < activeStep;
            const isActive = i === activeStep;
            const delay    = `${i * 0.12}s`;

            return (
              <div
                key={i}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="process-step"
                style={{
                  position: "sticky",
                  top: `${110 + i * 18}px`,
                  zIndex: i + 1,
                }}
              >
                {/* ── Numéro + ligne ── */}
                <div className="process-step-left">
                  <div
                    className={[
                      "process-step-num scale-in",
                      trackVisible ? "is-visible" : "",
                      isActive     ? "is-active"  : "",
                      isDone       ? "is-done"     : "",
                    ].filter(Boolean).join(" ")}
                    style={{ transitionDelay: delay }}
                  >
                    {/* Ring de pulse sur le step actif */}
                    {isActive && <span className="process-step-ring" aria-hidden="true" />}

                    {isDone ? (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path
                          d="M3.5 9L7.5 13L14.5 5.5"
                          stroke="#142028"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>

                  {i < dict.steps.length - 1 && (
                    <div className="process-step-line">
                      <div className={`process-step-line-fill${isDone ? " is-filled" : ""}`} />
                    </div>
                  )}
                </div>

                {/* ── Card ── */}
                <div
                  className={[
                    "process-step-card fade-right",
                    trackVisible ? "is-visible" : "",
                    isActive     ? "is-active"  : "",
                    isDone       ? "is-done"     : "",
                  ].filter(Boolean).join(" ")}
                  style={{ transitionDelay: delay }}
                >
                  <div className="process-card-glow" aria-hidden="true" />
                  <div className="process-step-top">
                    <h3>{step.title}</h3>
                    <span
                      className={[
                        "process-step-tag",
                        isActive ? "is-active" : "",
                        isDone   ? "is-done"   : "",
                      ].filter(Boolean).join(" ")}
                    >
                      {step.tag}
                    </span>
                  </div>
                  <p>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}