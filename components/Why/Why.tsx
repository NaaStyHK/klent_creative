"use client";

import { useInView } from "@/hooks/useInView";

type WhyDict = {
  eyebrow: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  items: { icon: string; title: string; description: string }[];
  closingLabel: string;
  closingValue: string;
  colKlentLabel: string;
  colKlentItems: string[];
  colOtherLabel: string;
  colOtherItems: string[];
};

export default function Why({ dict }: { dict: WhyDict }) {
  const { ref: headRef, inView: headVisible } = useInView({ threshold: 0.15 });
  const { ref: compareRef, inView: compareVisible } = useInView({ threshold: 0.1 });
  const hv = (cls: string) => `${cls}${headVisible ? " is-visible" : ""}`;

  return (
    <section id="why" className="why-section">
      <div className="site-container">

        <div className="why-heading" ref={headRef as React.RefObject<HTMLDivElement>}>
          <p className={hv("why-eyebrow fade-up")}>{dict.eyebrow}</p>
          <h2 className={hv("why-title fade-up stagger-1")}>
            {dict.titleLine1}<br /><span>{dict.titleHighlight}</span>
          </h2>
          <p className={hv("why-description fade-up stagger-2")}>{dict.description}</p>
        </div>

        <div className="why-compare" ref={compareRef as React.RefObject<HTMLDivElement>}>
          <div className={`why-col why-col-featured fade-left stagger-1${compareVisible ? " is-visible" : ""}`}>
            <div className="why-col-glow" />
            <div className="why-col-header">
              <span className="why-col-logo">&lt;KC&gt;</span>
              <strong>{dict.colKlentLabel}</strong>
            </div>
            <ul className="why-col-list">
              {dict.colKlentItems.map((item, i) => (
                <li key={i} className={`why-col-item fade-up stagger-${Math.min(i + 2, 8)}${compareVisible ? " is-visible" : ""}`}>
                  <span className="why-col-check">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>

          <div className={`why-col why-col-other fade-right stagger-2${compareVisible ? " is-visible" : ""}`}>
            <div className="why-col-header">
              <strong>{dict.colOtherLabel}</strong>
            </div>
            <ul className="why-col-list">
              {dict.colOtherItems.map((item, i) => (
                <li key={i} className={`why-col-item fade-up stagger-${Math.min(i + 2, 8)}${compareVisible ? " is-visible" : ""}`}>
                  <span className="why-col-cross">✕</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`why-closing fade-up${compareVisible ? " is-visible" : ""}`} style={{ transitionDelay: "0.5s" }}>
          <span className="why-closing-label">{dict.closingLabel}</span>
          <strong className="why-closing-value">{dict.closingValue}</strong>
        </div>

      </div>
    </section>
  );
}