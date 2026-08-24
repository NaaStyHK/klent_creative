"use client";

import { useEffect, useRef } from "react";

/** Marks that the intro has already played in this browsing session. Kept in
 *  sync with the inline pre-paint script in [locale]/layout.tsx, which reads
 *  the same key to hide the loader before it can flash. */
const SESSION_KEY = "klent:intro-seen";

/** The loader used to hold a fully-loaded page for 1050ms (desktop) / 1350ms
 *  (mobile) before it would even begin its exit. Profiling showed the page
 *  reaching loadEventEnd in ~150ms, so the intro was the sole reason the
 *  viewport stayed covered for ~2.4s — which is exactly what Speed Index was
 *  measuring (4.8s-5.0s against a 1.0s FCP). 350ms keeps the sweep readable
 *  without ever holding a page that is already ready. */
const MINIMUM_DURATION = 350;

/** The counter stops at 94 until the document is actually complete, so the
 *  number on screen never claims more progress than there really is. */
const PROGRESS_CEILING = 94;

/**
 * Mounted once inside [locale]/layout.tsx, which persists across internal
 * client-side navigation (Link clicks). It only re-runs on a genuine full
 * page load (new tab, hard refresh, direct URL), and now only on the first
 * such load of a session.
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
      /** Recorded on completion rather than on start: a run that gets torn
       *  down before it finishes (React re-invoking the effect, a navigation
       *  mid-intro) should not count as the session's intro. */
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* Not fatal: the intro simply plays again on the next full load. */
      }

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

    /** Already played this session: the pre-paint script in the layout has
     *  hidden it via html.intro-seen, so there is nothing to animate away.
     *  Hiding the node directly as well keeps it gone even if that class does
     *  not survive hydration. */
    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* Private mode / storage disabled: fall through and play the intro. */
    }

    if (alreadySeen) {
      if (loader) loader.style.display = "none";
      document.body.classList.remove("is-loading");
      return;
    }

    /** prefers-reduced-motion short-circuits the whole rAF loop rather than
     *  only shortening the exit — a reduced-motion visitor previously still
     *  waited out the full minimum duration watching a counter animate. */
    if (reduceMotionLoader) {
      finishLoader();
      return;
    }

    if (loader && loaderCounter && loaderBar) {
      let rafId = 0;
      let paintedValue = -1;
      const startedAt = performance.now();

      /** Both writes are change-guarded: the counter only touches textContent
       *  when the integer actually differs, and the bar drives transform
       *  instead of width so a frame costs a composite rather than a layout. */
      const paintProgress = (value: number) => {
        if (value === paintedValue) return;
        paintedValue = value;
        loaderCounter.textContent =
          value >= 100 ? "100" : String(value).padStart(2, "0");
        loaderBar.style.transform = `scaleX(${value / 100})`;
      };

      const renderProgress = () => {
        const elapsed = performance.now() - startedAt;

        /** Time-driven rather than per-frame increments. The original added a
         *  fraction of the remaining distance every frame, which over ~1s read
         *  as an ease-out; across 350ms that shape only survives if it is
         *  normalised against elapsed time, otherwise a low-refresh device
         *  would show a stunted 0-40 sweep instead of the full count-up. */
        const t = Math.min(elapsed / MINIMUM_DURATION, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        paintProgress(Math.min(PROGRESS_CEILING, Math.round(PROGRESS_CEILING * eased)));

        if (elapsed < MINIMUM_DURATION || document.readyState !== "complete") {
          rafId = requestAnimationFrame(renderProgress);
          return;
        }

        paintProgress(100);
        window.setTimeout(finishLoader, 180);
      };

      rafId = requestAnimationFrame(renderProgress);

      const fallback = window.setTimeout(() => {
        if (document.body.classList.contains("is-loading")) {
          paintProgress(100);
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
          <img className="intro-loader__mark" src="/brand/logo-mark-dark-bg.svg" alt="" width={1000} height={375} />
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
