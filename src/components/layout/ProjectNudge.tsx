"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

/**
 * Corner prompt inviting the reader to get in touch.
 *
 * Three deliberate constraints shape this component.
 *
 * It waits for half the page rather than a timer: scrolling that far is a
 * signal the visitor is actually reading, so the prompt lands on someone
 * interested instead of interrupting someone who just arrived.
 *
 * It is a small corner card, never a full-screen overlay. Google treats
 * intrusive interstitials on mobile as a ranking problem, and the whole site
 * has been built to avoid handing it reasons to demote pages.
 *
 * Dismissal is remembered. A prompt that reappears on every page stops being
 * an invitation and becomes an obstacle.
 */

const STORAGE_KEY = "klent:nudge-dismissed";

export default function ProjectNudge({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Offering a trip to the contact form to someone already filling it in is
  // just noise, so the contact page opts out.
  const onContactPage = pathname?.startsWith(`/${locale}/contact`) ?? false;

  useEffect(() => {
    if (onContactPage) return;

    // localStorage throws in some privacy modes; a prompt is not worth an
    // exception that would take the rest of the effect down with it.
    let alreadyDismissed = false;
    try {
      alreadyDismissed = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* fall through and simply show it this session */
    }
    // Bail out without touching state: setting it here would be a render
    // triggered from an effect on every mount, for a component that should
    // simply stay absent.
    if (alreadyDismissed) return;

    const onScroll = () => {
      const root = document.documentElement;
      // Read both: which one carries the offset depends on how the document
      // is scrolled, and a stale 0 would keep the prompt hidden for good.
      const offset = window.scrollY || root.scrollTop || 0;
      const scrollable = root.scrollHeight - window.innerHeight;
      // Short pages never reach a 50% *scroll* because there is barely
      // anything to scroll; treat those as read and show the prompt.
      if (scrollable < 400 || offset / scrollable >= 0.5) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onContactPage, pathname]);

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* dismissal just won't survive the session */
    }
  };

  // Escape closes it, as it would any dismissible layer. The card is not a
  // modal and traps no focus, so this is a convenience rather than the only
  // way out — the close button is in the tab order either way.
  useEffect(() => {
    if (!visible || dismissed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dismissed]);

  if (onContactPage || dismissed || !visible) return null;

  const { nudge } = dict;

  return (
    /* `complementary` rather than `dialog`: this is supporting content the
       reader may ignore, and announcing it as a dialog would suggest the page
       behind it is blocked, which it is not. */
    <aside className="nudge" role="complementary" aria-label={nudge.title}>
      <button ref={closeRef} type="button" className="nudge-close" onClick={dismiss} aria-label={nudge.close}>
        <span aria-hidden="true">×</span>
      </button>

      <div className="nudge-card">
        <p className="nudge-title">{nudge.title}</p>
        <p className="nudge-body">{nudge.body}</p>
        <Link className="nudge-button" href={`/${locale}/contact`} onClick={dismiss}>
          {nudge.button}
        </Link>
      </div>

      {/* Marquee. The track slides by exactly half its width, so the second
          half lands where the first began and the loop has no seam. Four
          copies rather than two because the seam is only hidden while each
          half is at least as wide as the window it slides through — with two,
          one copy (~280px) was narrower than the strip (~330px) and a gap
          crossed the card on every cycle. The whole strip is aria-hidden:
          decorative repetition, and hearing the same three words four times
          would be noise. */}
      <div className="nudge-tags" aria-hidden="true">
        <div className="nudge-tags-track mono">
          {[0, 1, 2, 3].map((copy) => (
            <span className="nudge-tags-run" key={copy}>
              {nudge.tags.map((tag) => (
                <span className="nudge-tag" key={tag}>
                  {tag} <span className="nudge-plus">+</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
