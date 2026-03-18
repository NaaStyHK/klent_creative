"use client";

import {
  useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

type ProjectItem = {
  slug: string; name: string; category: string; description: string;
  image: string; hrefLabel: string; quote?: string;
  authorName?: string; authorRole?: string; initials?: string;
};
type ProjectsDict = {
  eyebrow: string; titleLine1: string; titleHighlight: string;
  description: string; featured: ProjectItem; items: ProjectItem[];
};

const DURATION = 2500;
const GAP      = 24;

function getCardW(vw: number): number {
  if (vw <= 390)  return vw - 72;
  if (vw <= 480)  return vw - 64;
  if (vw <= 768)  return Math.min(vw - 80, 460);
  if (vw <= 1024) return 560;
  return 700;
}

export default function Projects({ dict }: { dict: ProjectsDict }) {
  const real = useMemo(() => [dict.featured, ...dict.items], [dict.featured, dict.items]);
  const N    = real.length;

  /*
   * On garde 700 côté SSR pour éviter le mismatch hydration.
   * suppresHydrationWarning est mis sur le div du track pour
   * ignorer la différence de style au premier render mobile.
   */
  const [cardW,   setCardW]  = useState(700);
  const [mounted, setMounted]= useState(false);

  const [pos,      setPos]   = useState(N);
  const [animated, setAnim]  = useState(false);
  const [infoKey, setInfoKey]= useState(0);

  const pauseRef    = useRef(false);
  const startRef    = useRef<number | null>(null);
  const accumRef    = useRef(0);
  const rafRef      = useRef<number | null>(null);
  const pauseStart  = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const { ref: headRef, inView: headIn } = useInView({ threshold: 0.1  });
  const { ref: rootRef, inView: rootIn } = useInView({ threshold: 0.05 });
  const hv = (c: string) => `${c}${headIn ? " is-visible" : ""}`;

  const realIdx = ((pos % N) + N) % N;
  const items   = useMemo(() => [...real, ...real, ...real], [real]);

  useEffect(() => {
    const update = () => setCardW(getCardW(window.innerWidth));
    update();
    setMounted(true);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => { setPos(N); }, [N]);

  const goNext = useCallback(() => {
    setAnim(true); setPos(p => p + 1);
    setInfoKey(k => k + 1);
    accumRef.current = 0; startRef.current = null;
  }, []);

  const goPrev = useCallback(() => {
    setAnim(true); setPos(p => p - 1);
    setInfoKey(k => k + 1);
    accumRef.current = 0; startRef.current = null;
  }, []);

  const handleTransitionEnd = useCallback(() => {
    setAnim(false);
    setPos(prev => {
      if (prev >= N * 2) return prev - N;
      if (prev < N)     return prev + N;
      return prev;
    });
  }, [N]);

  useEffect(() => {
    if (!rootIn) return;
    const tick = (ts: number) => {
      if (pauseRef.current) { rafRef.current = requestAnimationFrame(tick); return; }
      if (!startRef.current) startRef.current = ts;
      const pct = Math.min((accumRef.current + ts - startRef.current) / DURATION * 100, 100);
      if (pct >= 100) { goNext(); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [rootIn, realIdx, goNext]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [goNext, goPrev]);

  const pause  = () => { pauseRef.current = true; pauseStart.current = performance.now(); };
  const resume = () => {
    if (pauseStart.current) {
      accumRef.current += performance.now() - pauseStart.current;
      startRef.current = null; pauseStart.current = null;
    }
    pauseRef.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    pause();
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    resume();
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (dx < -40) goNext();
    if (dx >  40) goPrev();
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const cw   = mounted ? cardW : 700;
  const step = cw + GAP;

  /*
   * ─── LA VRAIE FIX ─────────────────────────────────────────
   *
   * Le .sl-track a `left: 50%` en CSS.
   * Son bord GAUCHE commence donc au CENTRE du .sl-window.
   *
   * La carte à l'index `pos` a son bord gauche à :
   *   left_edge = pos * step  (depuis le bord gauche du track)
   *
   * Le centre de cette carte est à :
   *   center_card = pos * step + cw / 2  (depuis le bord gauche du track)
   *
   * On veut que ce centre soit à 0px du centre du window.
   * Donc translateX doit décaler le track de :
   *   tx = -(pos * step + cw / 2)
   *
   * Ce calcul est INDÉPENDANT de la largeur du window/viewport.
   * Il ne dépend que de cardW et de pos. ✓
   * ──────────────────────────────────────────────────────────
   */
  const tx = `${-(pos * step + cw / 2)}px`;

  return (
    <section id="projects" className="projects-section">
      <div className="site-container">

        <div className="projects-heading" ref={headRef as React.RefObject<HTMLDivElement>}>
          <p className={hv("projects-eyebrow fade-left")}>{dict.eyebrow}</p>
          <h2 className={hv("projects-title fade-left stagger-1")}>
            {dict.titleLine1}<br /><span>{dict.titleHighlight}</span>
          </h2>
          <p className={hv("projects-description fade-left stagger-2")}>{dict.description}</p>
        </div>

        <div
          className={`sl-root${rootIn ? " is-visible" : ""}`}
          ref={rootRef as React.RefObject<HTMLDivElement>}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ "--sl-dur": `${DURATION}ms` } as React.CSSProperties}
        >
          <div className="sl-window">
            {/*
             * suppressHydrationWarning : seul le style change entre SSR (cw=700)
             * et le premier render mobile (cw=318). React signale un warning
             * sans ça. Le flash visuel est invisible (<16ms).
             */}
            <div
              className="sl-track"
              suppressHydrationWarning
              style={{
                transform:  `translateX(${tx})`,
                transition: animated ? "transform 0.65s cubic-bezier(0.25, 1, 0.35, 1)" : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {items.map((project, i) => {
                const isActive = i === pos;
                const dist     = Math.abs(i - pos);
                return (
                  <div
                    key={`${i}-${project.slug}`}
                    className={`sl-card${isActive ? " is-active" : ""}`}
                    suppressHydrationWarning
                    style={{
                      width:         `${cw}px`,
                      transform:     isActive ? "scale(1) translateY(0)" : "scale(0.88) translateY(24px)",
                      opacity:       dist === 0 ? 1 : dist === 1 ? 0.45 : dist === 2 ? 0.18 : 0,
                      transition:    "transform 0.65s cubic-bezier(0.25,1,0.35,1), opacity 0.65s ease",
                      cursor:        isActive ? "default" : dist <= 1 ? "pointer" : "default",
                      pointerEvents: dist > 1 ? "none" : "auto",
                    }}
                    onClick={() => {
                      if (isActive) return;
                      if (i > pos) goNext(); else goPrev();
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="sl-img"
                      priority={isActive}
                    />
                    {!isActive && <div className="sl-veil" />}

                    {isActive && (
                      <div className="sl-overlay">
                        <div className="sl-overlay-top">
                          <span className="sl-badge">{project.category}</span>
                          <div className="sl-overlay-top-right">
                            <span className="sl-counter">
                              {String(realIdx + 1).padStart(2, "0")}
                              <span className="sl-counter-sep"> / </span>
                              {String(N).padStart(2, "0")}
                            </span>
                            <a href="#contact" className="sl-cta" aria-label="Voir le projet">
                              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                                <path d="M3 13L13 3M13 3H6M13 3V10"
                                      stroke="currentColor" strokeWidth="2.2"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </a>
                          </div>
                        </div>
                        <div className="sl-overlay-bottom" key={infoKey}>
                          <h3 className="sl-title">{project.name}</h3>
                          <p className="sl-desc">{project.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sl-nav">
            <button type="button" className="sl-arrow" onClick={goPrev} aria-label="Précédent">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="sl-dots">
              {real.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`sl-dot${i === realIdx ? " is-active" : ""}`}
                  aria-label={`Projet ${i + 1}`}
                  onClick={() => {
                    const diff = i - realIdx;
                    if (diff === 0) return;
                    setAnim(true); setPos(pp => pp + diff);
                    setInfoKey(k => k + 1);
                    accumRef.current = 0; startRef.current = null;
                  }}
                />
              ))}
            </div>
            <button type="button" className="sl-arrow" onClick={goNext} aria-label="Suivant">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}