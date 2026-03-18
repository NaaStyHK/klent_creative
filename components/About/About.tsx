"use client";

import { useInView } from "@/hooks/useInView";
import { useCounter } from "@/hooks/useCounter";

type AboutStat = { value: string; label: string };

type AboutDict = {
  eyebrow: string;
  titleLine1: string;
  titleHighlight: string;
  bio1: string;
  bio2: string;
  stackLabel: string;
  ctaLabel: string;
  stats: AboutStat[];
  availabilityLabel: string;
  availabilityValue: string;
};

// Stack avec niveau de maîtrise (0-100) pour les barres animées
const STACK_ITEMS = [
  { name: "Next.js",     level: 95 },
  { name: "TypeScript",  level: 92 },
  { name: "Flutter",     level: 85 },
  { name: "Figma",       level: 88 },
  { name: "Tailwind",    level: 93 },
  { name: "WordPress",   level: 80 },
];

function parseStat(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1]), suffix: match[2] };
}

function AnimatedStat({
  value, label, inView, delay,
}: {
  value: string; label: string; inView: boolean; delay: number;
}) {
  const { num, suffix } = parseStat(value);
  const count = useCounter(num, 1800, inView);
  return (
    <div
      className={`about-stat fade-up${inView ? " is-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <strong>
        <span className="counter-value">{count}</span>
        <span className="counter-suffix">{suffix}</span>
      </strong>
      <span>{label}</span>
    </div>
  );
}

function SkillBar({
  name, level, inView, delay,
}: {
  name: string; level: number; inView: boolean; delay: number;
}) {
  return (
    <div
      className={`about-skill-item fade-up${inView ? " is-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="about-skill-head">
        <span className="about-skill-name">{name}</span>
        <span className="about-skill-pct">{level}%</span>
      </div>
      <div className="about-skill-track">
        <div
          className={`about-skill-fill${inView ? " is-animated" : ""}`}
          style={{
            width: inView ? `${level}%` : "0%",
            transitionDelay: `${delay + 200}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function About({ dict }: { dict: AboutDict }) {
  if (!dict) return null;

  const { ref: leftRef,  inView: leftVisible  } = useInView({ threshold: 0.12 });
  const { ref: rightRef, inView: rightVisible } = useInView({ threshold: 0.12 });

  const stats = dict.stats ?? [];
  const lv = (cls: string) => `${cls}${leftVisible  ? " is-visible" : ""}`;

  return (
    <section id="about" className="about-section">
      {/* Déco background — grille subtile derrière la card */}
      <div className="about-bg-grid" aria-hidden="true" />

      <div className="site-container">
        <div className="about-grid">

          {/* ── Colonne gauche ── */}
          <div ref={leftRef as React.RefObject<HTMLDivElement>}>

            <p className={lv("about-eyebrow fade-up")}>{dict.eyebrow}</p>

            <h2 className={lv("about-title fade-up stagger-1")}>
              {dict.titleLine1}<br />
              <span>{dict.titleHighlight}</span>
            </h2>

            {/* Bios avec ligne verticale accent */}
            <div className={lv("about-bios fade-up stagger-2")}>
              <p className="about-bio">{dict.bio1}</p>
              <p className="about-bio">{dict.bio2}</p>
            </div>

            {/* Stack — barres de niveau */}
            <div className={lv("about-stack fade-up stagger-3")}>
              <p className="about-stack-label">{dict.stackLabel}</p>
              <div className="about-skills-list">
                {STACK_ITEMS.map((item, i) => (
                  <SkillBar
                    key={item.name}
                    name={item.name}
                    level={item.level}
                    inView={leftVisible}
                    delay={i * 80}
                  />
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className={lv("btn btn-primary about-cta fade-up stagger-4")}
            >
              {dict.ctaLabel}
              <span className="btn-arrow">→</span>
            </a>
          </div>

          {/* ── Colonne droite — carte premium ── */}
          <div
            className={`about-card-wrapper fade-left${rightVisible ? " is-visible" : ""}`}
            ref={rightRef as React.RefObject<HTMLDivElement>}
          >
            {/* Border animée — pseudo conic-gradient via wrapper */}
            <div className="about-card-border" aria-hidden="true" />

            <div className="about-card-shell">

              {/* Avatar avec double ring rotatif */}
              <div className="about-avatar-outer">
                <div className="about-avatar-ring-spin" aria-hidden="true" />
                <div className="about-avatar-ring-spin about-avatar-ring-spin--reverse" aria-hidden="true" />
                <div className="about-avatar">
                  <span>&lt;KH&gt;</span>
                </div>
              </div>

              {/* Nom + rôle */}
              <div className="about-name-block">
                <strong>Kevin Hafsi</strong>
                <span>Klent Creative</span>
              </div>

              {/* Badge localisation */}
              <div className="about-location-badge">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <circle cx="6" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M6 1C3.79 1 2 2.79 2 5c0 3 4 7 4 7s4-4 4-7c0-2.21-1.79-4-4-4z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
                </svg>
                <span>France — UTC+1</span>
              </div>

              {/* Séparateur */}
              <div className="about-card-sep" />

              {/* Stats compteurs */}
              <div className="about-stats">
                {stats.map((stat, i) => (
                  <AnimatedStat
                    key={i}
                    value={stat.value}
                    label={stat.label}
                    inView={rightVisible}
                    delay={i * 120}
                  />
                ))}
              </div>

              {/* Séparateur */}
              <div className="about-card-sep" />

              {/* Ligne de disponibilité */}
              <div className="about-availability-row">
                <span className="availability-dot" />
                <span className="about-avail-label">{dict.availabilityLabel}</span>
                <strong className="about-avail-value">{dict.availabilityValue}</strong>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}