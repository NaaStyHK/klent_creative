"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { Locale } from "@/lib/i18n/config";

const labels: Record<Locale, string> = {
  fr: "Progression de la lecture",
  es: "Progreso de lectura",
  "es-ar": "Progreso de lectura",
  en: "Reading progress",
};

export default function ReadingProgress({ locale, targetId }: { locale: Locale; targetId: string }) {
  const [progress, setProgress] = useState(0);
  const [footerOverlap, setFooterOverlap] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const footer = document.querySelector("footer");

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const pageTop = window.scrollY + rect.top;
      const pageBottom = pageTop + rect.height;
      const start = pageTop - window.innerHeight * 0.2;
      const end = Math.max(start + 1, pageBottom - window.innerHeight * 0.8);
      const next = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      setProgress(Math.round(next * 100));

      const footerTop = footer?.getBoundingClientRect().top ?? window.innerHeight;
      setFooterOverlap(Math.max(0, Math.round(window.innerHeight - footerTop)));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(requestUpdate);
    observer.observe(target);
    if (footer) observer.observe(footer);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <aside
      className="reading-progress"
      style={{ "--reading-footer-overlap": `${footerOverlap}px` } as CSSProperties}
      aria-label={labels[locale]}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <span className="reading-progress-track" aria-hidden="true">
        <span className="reading-progress-fill" style={{ height: `${progress}%` }} />
      </span>
      <span className="reading-progress-value mono">{progress}%</span>
    </aside>
  );
}
