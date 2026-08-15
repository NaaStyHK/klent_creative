import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function CTA({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { cta } = dict;
  return (
    <section className="cta" id="contact">
      <div className="ring" />
      <div className="mono" style={{ marginBottom: 26, zIndex: 2 }}>
        {cta.kicker}
      </div>
      {/* Render every line, not just the first two: the headline is 3 lines in
          all locales and the last one was being silently dropped. */}
      <h2 className="reveal-up">
        {cta.headlineLines.map((line, i) => (
          <span key={i}>
            {i > 0 && <>{" "}<br /></>}
            {line}
          </span>
        ))}
      </h2>
      <Link className="mono hoverable magnetic" href={`/${locale}/contact`}>
        {cta.button}
      </Link>
    </section>
  );
}
