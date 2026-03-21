"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

function useParallax(strength = 18) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);
  return ref;
}

type HeroDict = {
  availability: string;
  titleLine1: string;
  titleHighlight: string;
  titleLine3: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  badge: string;
  cardTitle: string;
  style: string;
  styleValue: string;
  approach: string;
  approachValue: string;
  stack: string;
  impact: string;
  premiumLabel: string;
  signature: string;
  signatureValue: string;
  capsule: string;
};

const CODE_LINES = [
  "const ui = () => <Premium />",
  "export default function Hero()",
  "transform: translateY(0)",
  "useState<'web' | 'app'>('web')",
  "border: 1px solid var(--accent)",
  "async function getDictionary()",
  "grid-template-columns: 1fr 1fr",
  "import { useInView } from '@/hooks'",
  "backdrop-filter: blur(12px)",
  "const [inView, setInView] = useState",
  "radial-gradient(ellipse at 50% 0%)",
  "border-radius: var(--r-full)",
];

// Délai en ms avant que le typewriter recommence
const RESTART_DELAY = 4000;

export default function Hero({ dict }: { dict: HeroDict }) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  const LINE_COLORS = ["var(--text)", "var(--accent)", "var(--text)"];

  const [line0, setLine0] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const displayed = [line0, line1, line2];
  const [currentLine, setCurrentLine] = useState(-1);

  const linesRef = useRef<string[]>([]);
  const animating = useRef(false);

  useEffect(() => {
    linesRef.current = [dict.titleLine1, dict.titleHighlight, dict.titleLine3];
  }, [dict.titleLine1, dict.titleHighlight, dict.titleLine3]);

  // Fonction de typewriter réutilisable (pour le loop)
  const runTypewriter = useCallback(() => {
    if (animating.current) return;
    animating.current = true;

    // Reset
    setLine0("");
    setLine1("");
    setLine2("");
    setCurrentLine(0);

    let lineIdx = 0;
    let charIdx = 0;

    const tick = () => {
      const lines = linesRef.current;
      if (!lines || lineIdx >= lines.length) {
        animating.current = false;
        // Relance après RESTART_DELAY
        setTimeout(runTypewriter, RESTART_DELAY);
        return;
      }

      const currentText = lines[lineIdx];
      if (!currentText) return;

      charIdx++;

      if (lineIdx === 0) setLine0(currentText.slice(0, charIdx));
      else if (lineIdx === 1) setLine1(currentText.slice(0, charIdx));
      else if (lineIdx === 2) setLine2(currentText.slice(0, charIdx));

      if (charIdx >= currentText.length) {
        lineIdx++;
        charIdx = 0;
        setCurrentLine(lineIdx);
        setTimeout(() => requestAnimationFrame(tick), 150);
      } else {
        setTimeout(() => requestAnimationFrame(tick), 38);
      }
    };

    setTimeout(() => requestAnimationFrame(tick), 400);
  }, []);

  useEffect(() => {
    if (!inView) return;
    runTypewriter();
  }, [inView]);

  const v = (cls: string) => `${cls}${inView ? " is-visible" : ""}`;
  const lines = [dict.titleLine1, dict.titleHighlight, dict.titleLine3];
  const parallaxRef = useParallax(14);

  return (
    <section className="hero-section">

      {/* Fond : lignes de code */}
      <div className="hero-code-bg" ref={parallaxRef} aria-hidden="true">
        {CODE_LINES.map((line, i) => (
          <span
            key={i}
            className="hero-code-line"
            style={{
              left: `${(i * 9.1 + 2) % 98}%`,
              animationDelay: `${i * 1.3}s`,
              animationDuration: `${15 + (i % 5) * 3}s`,
            }}
          >
            {line}
          </span>
        ))}
      </div>

      <div className="site-container hero-grid">

        {/* Contenu gauche */}
        <div className="hero-content" ref={ref as React.RefObject<HTMLDivElement>}>

          <div className={v("availability-pill fade-in")}>
            <span className="availability-dot" />
            {dict.availability}
          </div>

          <h1 className="hero-title" style={{ position: "relative" }}>
            {/* Texte invisible — réserve l'espace dès le départ, évite le layout shift */}
            <span aria-hidden="true" style={{ visibility: "hidden", display: "block" }}>
              {lines.map((line, i) => (
                <span key={i} className="hero-title-row">
                  <span className="hero-title-typed" style={{ color: LINE_COLORS[i] }}>
                    {line}
                  </span>
                  {i < lines.length - 1 && <br />}
                </span>
              ))}
            </span>

            {/* Texte animé — positionné par-dessus le placeholder */}
            <span aria-live="polite" style={{ position: "absolute", inset: 0 }}>
              {lines.map((line, i) => {
                const isTyping = currentLine === i;
                const isDone = displayed[i].length >= line.length;
                const showCursor = isTyping && !isDone;

                return (
                  <span key={i} className="hero-title-row">
                    <span className="hero-title-typed" style={{ color: LINE_COLORS[i] }}>
                      {displayed[i]}
                    </span>
                    {showCursor && (
                      <span className="typewriter-cursor-inline" style={{ color: LINE_COLORS[i] }}>
                        |
                      </span>
                    )}
                    {i < lines.length - 1 && <br />}
                  </span>
                );
              })}
            </span>
          </h1>

          <p className={v("hero-description fade-up stagger-4")}>
            {dict.description}
          </p>

          <div className={v("hero-actions fade-up stagger-5")}>
            <a href="#contact" className="btn btn-primary">
              {dict.ctaPrimary}
              <span className="btn-arrow">→</span>
            </a>
            <a href="#projects" className="btn btn-secondary">
              {dict.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Mockup droit */}
        <div className={v("hero-visual fade-right")} style={{ transitionDelay: "0.25s" }}>
          <div className="mockup-shell">
            <div className="mockup-header">
              <div className="mockup-dots"><span /><span /><span /></div>
              <div className="mockup-header-right">
                <span className="mockup-mini-pill">Klentcreative.com</span>
                <span className="mockup-status-pill">&lt;&gt; {dict.capsule}</span>
              </div>
            </div>

            <div className="mockup-divider" />

            <div className="mockup-card mockup-card-featured">
              <p className="mockup-label">{dict.badge}</p>
              <h3>{dict.cardTitle}</h3>
            </div>

            <div className="mockup-two-cols">
              <div className="mockup-card">
                <p className="mockup-muted">{dict.style}</p>
                <strong>{dict.styleValue}</strong>
              </div>
              <div className="mockup-card">
                <p className="mockup-muted">{dict.approach}</p>
                <strong>{dict.approachValue}</strong>
              </div>
            </div>

            <div className="mockup-card">
              <p className="mockup-muted">{dict.stack}</p>
              <div className="mockup-tags">
                <span>Next.js</span>
                <span>Flutter</span>
                <span>Figma</span>
                <span>WordPress</span>
              </div>
            </div>

            <div className="mockup-card">
              <div className="mockup-impact-row">
                <span className="mockup-muted">{dict.impact}</span>
                <strong>{dict.premiumLabel}</strong>
              </div>
              {/* Barre avec shimmer infini */}
              <div className="impact-bar">
                <div className="impact-bar-fill impact-bar-infinite" />
              </div>
            </div>

            <div className="signature-box">
              <span>{dict.signature}</span>
              <strong>{dict.signatureValue}</strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}