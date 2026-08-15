import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { legalSlug } from "@/lib/legal";

export default function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [line1, line2] = dict.footer.tagline.split("\n");

  return (
    <footer className="mono">
      <div className="footer-brand">
        {/* eslint-disable-next-line @next/next/no-img-element -- local SVG icon, next/image adds no optimization for vectors here */}
        <img className="brand-mark" src="/brand/logo-mark-light-bg.svg" alt="" />
        <div>
          {line1}
          {" "}<br />
          {line2}
        </div>
      </div>
      <div className="footer-right">
        {/* The blog is deliberately kept out of the top nav — this is its only
            site-wide entry point. */}
        <Link className="hoverable" href={`/${locale}/blog`}>
          {dict.blog.eyebrow}
        </Link>
        <a className="hoverable" href="https://www.instagram.com/klentcreative/" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a className="hoverable" href="https://www.linkedin.com/company/klent-creative/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <Link className="hoverable" href={`/${locale}/${legalSlug[locale]}`}>
          {dict.footer.legal}
        </Link>
        <span>{dict.footer.copyright}</span>
      </div>
    </footer>
  );
}
