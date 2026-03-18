"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";

type ServiceCard = {
  badge?: string; icon: string; title: string;
  description: string; testimonial: string; author: string; cta: string;
  includedTitle: string; included: string[]; optionalTitle?: string;
  optional?: string[]; featured?: boolean;
};

type ServicesDict = {
  eyebrow: string; titleLine1: string; titleHighlight: string; description: string;
  tabs: { web: string; app: string }; web: ServiceCard[]; app: ServiceCard[];
  addonsTitle: string; addons: string[];
};

export default function Services({ dict }: { dict?: ServicesDict }) {
  const [activeTab, setActiveTab] = useState<"web" | "app">("web");
  const { ref: headRef, inView: headVisible } = useInView({ threshold: 0.15 });
  const { ref: gridRef, inView: gridVisible } = useInView({ threshold: 0.1 });

  if (!dict) return null;
  const cards = activeTab === "web" ? dict.web ?? [] : dict.app ?? [];
  const hv = (cls: string) => `${cls}${headVisible ? " is-visible" : ""}`;

  // On duplique les addons pour le loop seamless du marquee
  const marqueeItems = [...dict.addons, ...dict.addons];

  return (
    <section id="services" className="services-section">
      <div className="site-container">

        {/* ── Heading ── */}
        <div className="services-heading" ref={headRef as React.RefObject<HTMLDivElement>}>
          <p className={hv("services-eyebrow fade-up")}>{dict.eyebrow}</p>
          <h2 className={hv("services-title fade-up stagger-1")}>
            {dict.titleLine1}<br /><span>{dict.titleHighlight}</span>
          </h2>
          <p className={hv("services-description fade-up stagger-2")}>{dict.description}</p>
          <div className={hv("services-tabs fade-up stagger-3")}>
            <button
              type="button"
              className={`services-tab ${activeTab === "web" ? "is-active" : ""}`}
              onClick={() => setActiveTab("web")}
            >
              {dict.tabs.web}
            </button>
            <button
              type="button"
              className={`services-tab ${activeTab === "app" ? "is-active" : ""}`}
              onClick={() => setActiveTab("app")}
            >
              {dict.tabs.app}
            </button>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="services-grid" ref={gridRef as React.RefObject<HTMLDivElement>}>
          {cards.map((card, i) => (
            <article
              key={`${activeTab}-${card.title}`}
              className={`service-card ${card.featured ? "is-featured" : ""} fade-up stagger-${Math.min(i + 1, 8)}${gridVisible ? " is-visible" : ""}`}
            >
              <div className="service-card-top">
                <div className="service-card-icon">{card.icon}</div>
                {card.badge && <span className="service-card-badge">{card.badge}</span>}
              </div>
              <div className="service-card-head">
                <h3>{card.title}</h3>
                <p className="service-card-description">{card.description}</p>
              </div>
              <div className="service-card-testimonial">
                <p>{card.testimonial}</p>
                <span>{card.author}</span>
              </div>
              <button type="button" className="service-card-cta">
                {card.cta} <span>→</span>
              </button>
              <div className="service-card-divider" />
              <div className="service-card-list-block">
                <p className="service-card-list-title">{card.includedTitle}</p>
                <ul className="service-card-list">
                  {card.included.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              {card.optional && card.optional.length > 0 && (
                <div className="service-card-list-block is-optional">
                  <p className="service-card-list-title">{card.optionalTitle}</p>
                  <ul className="service-card-list is-optional">
                    {card.optional.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* ── Add-ons marquee ── */}
        <div
          className={`services-addons fade-up${gridVisible ? " is-visible" : ""}`}
          style={{ transitionDelay: "0.4s" }}
        >
          <p className="services-addons-title">{dict.addonsTitle}</p>
          <div className="services-addons-list">
            <div className="services-addons-track">
              {marqueeItems.map((addon, i) => (
                <span key={i} className="services-addon-pill">{addon}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}