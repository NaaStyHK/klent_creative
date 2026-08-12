"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Page-wide interaction layer ported 1:1 from the original mockup's vanilla
 * JS. Kept as a single client component (rather than one per effect) because
 * the source script itself is one global script wiring listeners across the
 * whole page via querySelectorAll — splitting it up would risk diverging
 * timing/behaviour from the maquette for no benefit. It renders only the
 * small fixed decorative nodes (cursor, noise, grid, scroll line, wipe,
 * cursor label); all real content stays server-rendered in the page
 * components.
 */
export default function MotionFX() {
  const pathname = usePathname();

  // Re-wires on every route change: this component lives in the root layout
  // (so the intro loader never replays on internal navigation — see
  // src/app/layout.tsx), which means it mounts once for the whole session.
  // Without `pathname` as a dependency, querySelectorAll would only ever see
  // the very first page's DOM and reveal/parallax/etc. would silently stop
  // working after the first client-side navigation.
  useEffect(() => {
    // A route can change before the hovered project fires `mouseleave`.
    // Always reset the floating cursor label when wiring the new page.
    document.querySelector<HTMLElement>(".cursor-label")?.classList.remove("show");

    const cursor = document.querySelector<HTMLElement>(".cursor");
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const isFinePointer = window.matchMedia("(pointer:fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2,
      cx = mx,
      cy = my;
    let cursorRaf = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    if (isFinePointer && cursor && dot) {
      window.addEventListener("mousemove", onMouseMove);
      const animateCursor = () => {
        cx += (mx - cx) * 0.14;
        cy += (my - cy) * 0.14;
        cursor.style.left = cx + "px";
        cursor.style.top = cy + "px";
        dot.style.left = mx + "px";
        dot.style.top = my + "px";
        cursorRaf = requestAnimationFrame(animateCursor);
      };
      cursorRaf = requestAnimationFrame(animateCursor);
    }

    const hoverEnter = () => cursor?.classList.add("active");
    const hoverLeave = () => cursor?.classList.remove("active");
    const hoverables = Array.from(document.querySelectorAll<HTMLElement>(".hoverable"));
    if (isFinePointer && cursor) {
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", hoverEnter);
        el.addEventListener("mouseleave", hoverLeave);
      });
    }

    // ===== REVEAL ON SCROLL =====
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal-up").forEach((el) => revealObserver.observe(el));

    // ===== EDITORIAL TICKER REVEAL =====
    // Runs once when the band enters the viewport. The CSS then handles the
    // restrained acid selection movement on pointer hover.
    const ticker = document.querySelector<HTMLElement>(".ticker");
    let tickerObserver: IntersectionObserver | null = null;
    if (ticker) {
      ticker.classList.add("ticker-motion");
      if (reduceMotion) {
        ticker.classList.add("ticker-in");
      } else {
        tickerObserver = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              ticker.classList.add("ticker-in");
              tickerObserver?.disconnect();
            }
          },
          { threshold: 0.35 },
        );
        tickerObserver.observe(ticker);
      }
    }

    // ===== HERO ORB SCROLL DRIFT =====
    const onOrbScroll = () => {
      const y = window.scrollY;
      const orb = document.querySelector<HTMLElement>(".hero-orb");
      if (orb) orb.style.transform = `translateY(${y * 0.18}px) rotate(${y * 0.02}deg)`;
    };
    window.addEventListener("scroll", onOrbScroll, { passive: true });

    // ===== SCROLL PROGRESS LINE =====
    const scrollLine = document.querySelector<HTMLElement>(".scroll-line");
    const updateScrollLine = () => {
      if (!scrollLine) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      scrollLine.style.width = pct + "%";
    };
    updateScrollLine();
    window.addEventListener("scroll", updateScrollLine, { passive: true });

    // ===== SECTION POINTER GLOW =====
    const glowCleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>("section").forEach((section) => {
      const glow = document.createElement("div");
      glow.className = "section-glow";
      section.appendChild(glow);
      if (isFinePointer) {
        const onMove = (e: MouseEvent) => {
          const r = section.getBoundingClientRect();
          glow.style.left = e.clientX - r.left + "px";
          glow.style.top = e.clientY - r.top + "px";
        };
        section.addEventListener("mousemove", onMove);
        glowCleanups.push(() => {
          section.removeEventListener("mousemove", onMove);
          glow.remove();
        });
      } else {
        glowCleanups.push(() => glow.remove());
      }
    });

    // ===== MAGNETIC BUTTONS =====
    const magneticCleanups: Array<() => void> = [];
    if (isFinePointer) {
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
        };
        const onLeave = () => {
          el.style.transition = "transform .45s cubic-bezier(.2,.75,.25,1)";
          el.style.transform = "translate(0,0)";
          window.setTimeout(() => (el.style.transition = ""), 450);
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        magneticCleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    // ===== SCROLL-BASED PARALLAX (orb / sphere / ring) =====
    const parallaxItems = [
      { el: document.querySelector<HTMLElement>(".hero-orb"), speed: 0.13 },
      { el: document.querySelector<HTMLElement>(".sphere"), speed: -0.08 },
      { el: document.querySelector<HTMLElement>(".ring"), speed: 0.05 },
    ].filter((x): x is { el: HTMLElement; speed: number } => !!x.el);
    const animateParallax = () => {
      const y = window.scrollY;
      parallaxItems.forEach(({ el, speed }) => {
        el.style.translate = `0 ${y * speed}px`;
      });
    };
    window.addEventListener("scroll", animateParallax, { passive: true });

    // ===== TEXT SCALE/ROTATION ON ENTER =====
    const motionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.animate(
            [
              { opacity: 0.15, transform: "translateY(45px) scale(.96) rotate(.5deg)", filter: "blur(8px)" },
              { opacity: 1, transform: "translateY(0) scale(1) rotate(0deg)", filter: "blur(0px)" },
            ],
            { duration: 900, easing: "cubic-bezier(.2,.75,.25,1)", fill: "both" },
          );
          motionObserver.unobserve(el);
        });
      },
      { threshold: 0.18 },
    );
    document
      .querySelectorAll(".headline,.statement-copy,.service h3,.step h3,.cta h2")
      .forEach((el) => motionObserver.observe(el));

    // ===== MOBILE-SPECIFIC MOTION =====
    if (!isFinePointer) {
      const mobileObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("mobile-active");
              window.setTimeout(() => entry.target.classList.remove("mobile-active"), 900);
            }
          });
        },
        { threshold: 0.55 },
      );
      const manifestoGrid = document.querySelector(".manifesto-grid");
      if (manifestoGrid) mobileObs.observe(manifestoGrid);
      document.querySelectorAll(".cta a,.nav-cta").forEach((el) => el.classList.add("mobile-pulse"));
    }

    // ===== PAGE TRANSITION FOR INTERNAL HASH NAV =====
    const wipe = document.querySelector<HTMLElement>(".section-wipe");
    const hashLinkCleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((link) => {
      const hash = link.hash;
      if (!hash || hash === "#" || !wipe) return;
      const onClick = (e: MouseEvent) => {
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        wipe.style.transformOrigin = "bottom";
        wipe.style.transition = "transform .42s cubic-bezier(.76,0,.24,1)";
        wipe.style.transform = "scaleY(1)";
        window.setTimeout(() => {
          target.scrollIntoView({ behavior: "auto" });
          wipe.style.transformOrigin = "top";
          wipe.style.transform = "scaleY(0)";
        }, 420);
      };
      link.addEventListener("click", onClick);
      hashLinkCleanups.push(() => link.removeEventListener("click", onClick));
    });

    // ===== NAV SCROLLED STATE =====
    const nav = document.querySelector("nav");
    const setNavState = () => nav?.classList.toggle("scrolled", window.scrollY > 24);
    window.addEventListener("scroll", setNavState, { passive: true });
    setNavState();

    // ===== CASE CARD REVEAL + IMAGE PARALLAX =====
    const caseCards = Array.from(document.querySelectorAll<HTMLElement>(".case-card"));
    const caseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.18 },
    );
    caseCards.forEach((card) => caseObserver.observe(card));

    let caseParallaxCleanup = () => {};
    if (!reduceMotion) {
      let rafPending = false;
      const updateCaseParallax = () => {
        caseCards.forEach((card) => {
          const media = card.querySelector<HTMLElement>(".case-media");
          const img = card.querySelector<HTMLElement>(".case-media img");
          if (!media || !img) return;
          const r = media.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return;
          const center = r.top + r.height / 2;
          const delta = (center - window.innerHeight / 2) / window.innerHeight;
          const shift = Math.max(-8, Math.min(8, delta * -18));
          img.style.transform = `translateY(${shift - 5}%) scale(1.08)`;
        });
        rafPending = false;
      };
      const onScrollParallax = () => {
        if (!rafPending) {
          requestAnimationFrame(updateCaseParallax);
          rafPending = true;
        }
      };
      window.addEventListener("scroll", onScrollParallax, { passive: true });
      updateCaseParallax();
      caseParallaxCleanup = () => window.removeEventListener("scroll", onScrollParallax);
    }

    // ===== KINETIC BAND SCROLL REACTION =====
    const kinetic = document.querySelector<HTMLElement>(".kinetic-row");
    const moveKinetic = () => {
      if (!kinetic || reduceMotion || !kinetic.parentElement) return;
      const parent = kinetic.parentElement.getBoundingClientRect();
      const t = (window.innerHeight - parent.top) / (window.innerHeight + parent.height);
      kinetic.style.transform = `translate3d(${-22 + t * 16}%,0,0)`;
    };
    window.addEventListener("scroll", moveKinetic, { passive: true });
    moveKinetic();

    // ===== METRICS COUNT-UP =====
    const metricObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
            const target = Number(el.dataset.count || 0);
            const suffix = "+";
            const start = performance.now();
            const duration = 1150;
            const run = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.round(target * eased) + suffix;
              if (p < 1) requestAnimationFrame(run);
            };
            requestAnimationFrame(run);
          });
          metricObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll(".metrics-grid").forEach((el) => metricObserver.observe(el));

    // ===== PROCESS PROGRESS BAR =====
    const steps = document.querySelector<HTMLElement>(".steps");
    const updateProcess = () => {
      if (!steps) return;
      const r = steps.getBoundingClientRect();
      const visible = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
      steps.style.setProperty("--process-progress", `${visible * 100}%`);
    };
    window.addEventListener("scroll", updateProcess, { passive: true });
    updateProcess();

    // ===== CURSOR LABEL FOR IMMERSIVE AREAS =====
    const cursorLabel = document.querySelector<HTMLElement>(".cursor-label");
    const cursorLabelCleanups: Array<() => void> = [];
    if (isFinePointer && cursorLabel) {
      const hideCursorLabel = () => cursorLabel.classList.remove("show");
      document.querySelectorAll<HTMLElement>("[data-cursor]").forEach((el) => {
        const onEnter = () => {
          cursorLabel.textContent = el.dataset.cursor || "View";
          cursorLabel.classList.add("show");
        };
        const onMove = (e: MouseEvent) => {
          cursorLabel.style.left = `${e.clientX}px`;
          cursorLabel.style.top = `${e.clientY}px`;
        };
        const onLeave = hideCursorLabel;
        const onClick = hideCursorLabel;
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        el.addEventListener("click", onClick);
        cursorLabelCleanups.push(() => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
          el.removeEventListener("click", onClick);
        });
      });
      window.addEventListener("scroll", hideCursorLabel, { passive: true });
      cursorLabelCleanups.push(() => window.removeEventListener("scroll", hideCursorLabel));
      cursorLabelCleanups.push(hideCursorLabel);
    }

    // ===== MOBILE: CARDS ANIMATE IN WITH SLIGHT DEPTH =====
    let mobileCardsObserver: IntersectionObserver | null = null;
    if (!isFinePointer && !reduceMotion) {
      mobileCardsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.animate(
                [
                  { opacity: 0.35, transform: "translateY(34px) scale(.985)" },
                  { opacity: 1, transform: "translateY(0) scale(1)" },
                ],
                { duration: 700, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" },
              );
              mobileCardsObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 },
      );
      document.querySelectorAll(".case-card,.service,.metric,.step").forEach((el) => mobileCardsObserver?.observe(el));
    }

    // ===== PROJECT CASE STUDY — EDITORIAL MOTION SYSTEM =====
    const projectCase = document.querySelector<HTMLElement>(".case-study");
    let projectObserver: IntersectionObserver | null = null;
    let projectRaf = 0;
    let projectScrollCleanup = () => {};
    if (projectCase) {
      if (reduceMotion) {
        projectCase.classList.add("case-motion-reduced");
      } else {
        projectCase.classList.add("case-motion-ready");
        requestAnimationFrame(() => projectCase.classList.add("case-motion-in"));

        const projectItems = Array.from(
          projectCase.querySelectorAll<HTMLElement>(
            ".brand-system-grid,.brand-palette,.type-specimen,.brand-voice-lines,.case-study-photo,.digital-browser,.case-study-result>*",
          ),
        );
        projectItems.forEach((item, index) => {
          item.classList.add("case-motion-item");
          item.style.setProperty("--case-delay", `${Math.min(index % 4, 3) * 85}ms`);
        });
        projectObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("case-in");
              projectObserver?.unobserve(entry.target);
            });
          },
          { threshold: 0.14, rootMargin: "0px 0px -7%" },
        );
        projectItems.forEach((item) => projectObserver?.observe(item));

        let projectTicking = false;
        const updateProjectDepth = () => {
          const viewport = window.innerHeight;
          const setDepth = (selector: string, distance: number) => {
            projectCase.querySelectorAll<HTMLElement>(selector).forEach((item) => {
              const rect = item.getBoundingClientRect();
              if (rect.bottom < -100 || rect.top > viewport + 100) return;
              const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
              item.style.setProperty("--case-shift", `${Math.max(-distance, Math.min(distance, progress * -distance))}px`);
            });
          };
          setDepth(".case-study-cover-gradient", 28);
          setDepth(".case-study-cover-mark", 18);
          setDepth(".case-study-photo img", 16);
          setDepth(".digital-browser-screenshot img", 10);
          projectTicking = false;
        };
        const onProjectScroll = () => {
          if (projectTicking) return;
          projectTicking = true;
          projectRaf = requestAnimationFrame(updateProjectDepth);
        };
        window.addEventListener("scroll", onProjectScroll, { passive: true });
        updateProjectDepth();
        projectScrollCleanup = () => window.removeEventListener("scroll", onProjectScroll);
      }
    }

    return () => {
      cancelAnimationFrame(cursorRaf);
      window.removeEventListener("mousemove", onMouseMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", hoverEnter);
        el.removeEventListener("mouseleave", hoverLeave);
      });
      revealObserver.disconnect();
      tickerObserver?.disconnect();
      window.removeEventListener("scroll", onOrbScroll);
      window.removeEventListener("scroll", updateScrollLine);
      glowCleanups.forEach((fn) => fn());
      magneticCleanups.forEach((fn) => fn());
      window.removeEventListener("scroll", animateParallax);
      motionObserver.disconnect();
      hashLinkCleanups.forEach((fn) => fn());
      window.removeEventListener("scroll", setNavState);
      caseObserver.disconnect();
      caseParallaxCleanup();
      window.removeEventListener("scroll", moveKinetic);
      metricObserver.disconnect();
      window.removeEventListener("scroll", updateProcess);
      cursorLabelCleanups.forEach((fn) => fn());
      mobileCardsObserver?.disconnect();
      projectObserver?.disconnect();
      cancelAnimationFrame(projectRaf);
      projectScrollCleanup();
    };
  }, [pathname]);

  return (
    <>
      <div className="noise" />
      <div className="page-grid" />
      <div className="cursor-label">View project</div>
      <div className="scroll-line" />
      <div className="section-wipe" />
      <div className="cursor" />
      <div className="cursor-dot" />
    </>
  );
}
