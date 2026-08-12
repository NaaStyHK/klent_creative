"use client";

import { useEffect, useRef } from "react";

/**
 * Mounted once inside [locale]/layout.tsx, which persists across internal
 * client-side navigation (Link clicks). It only re-runs on a genuine full
 * page load (new tab, hard refresh, direct URL), matching the original
 * single-page mockup's behaviour exactly.
 */
export default function IntroLoader({ brand }: { brand: string }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const loaderCounter = counterRef.current;
    const loaderBar = barRef.current;
    const reduceMotionLoader = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finishLoader = () => {
      if (!loader) {
        document.body.classList.remove("is-loading");
        return;
      }

      if (reduceMotionLoader) {
        loader.style.opacity = "0";
        loader.style.transition = "opacity .28s ease";
      } else {
        loader.style.transformOrigin = "top";
        loader.style.webkitTransformOrigin = "top";
        loader.style.transition =
          "transform .85s cubic-bezier(.76,0,.24,1), opacity .25s ease .58s";
        loader.style.webkitTransition =
          "-webkit-transform .85s cubic-bezier(.76,0,.24,1), opacity .25s ease .58s";
        loader.style.transform = "translateZ(0) scaleY(0)";
        loader.style.webkitTransform = "translateZ(0) scaleY(0)";
        loader.style.opacity = "0";
      }

      window.setTimeout(
        () => {
          loader.style.display = "none";
          document.body.classList.remove("is-loading");
        },
        reduceMotionLoader ? 320 : 900,
      );
    };

    if (loader && loaderCounter && loaderBar) {
      let progress = 0;
      let rafId = 0;
      const startedAt = performance.now();
      const minimumDuration = window.matchMedia("(max-width:850px)").matches ? 1350 : 1050;

      const renderProgress = () => {
        const elapsed = performance.now() - startedAt;

        if (progress < 94) {
          progress += Math.max(1, Math.ceil((94 - progress) * 0.085));
        }

        loaderCounter.textContent = String(Math.min(progress, 99)).padStart(2, "0");
        loaderBar.style.width = Math.min(progress, 99) + "%";

        if (elapsed < minimumDuration || document.readyState !== "complete") {
          rafId = requestAnimationFrame(renderProgress);
          return;
        }

        progress = 100;
        loaderCounter.textContent = "100";
        loaderBar.style.width = "100%";

        window.setTimeout(finishLoader, 180);
      };

      rafId = requestAnimationFrame(renderProgress);

      const fallback = window.setTimeout(() => {
        if (document.body.classList.contains("is-loading")) {
          loaderCounter.textContent = "100";
          loaderBar.style.width = "100%";
          finishLoader();
        }
      }, 4500);

      return () => {
        cancelAnimationFrame(rafId);
        window.clearTimeout(fallback);
      };
    }

    document.body.classList.remove("is-loading");
  }, []);

  return (
    <div className="intro-loader" aria-hidden="true" ref={loaderRef}>
      <div className="intro-loader__inner">
        <div className="intro-loader__brand-block">
          {/* eslint-disable-next-line @next/next/no-img-element -- local SVG icon, next/image adds no optimization for vectors here */}
          <img className="intro-loader__mark" src="/brand/logo-mark-dark-bg.svg" alt="" />
          <div className="intro-loader__brand">{brand}</div>
        </div>
        <div className="intro-loader__counter" ref={counterRef}>
          00
        </div>
      </div>
      <div className="intro-loader__bar">
        <span ref={barRef}></span>
      </div>
    </div>
  );
}
