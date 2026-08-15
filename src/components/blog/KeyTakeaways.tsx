import type { Locale } from "@/lib/i18n/config";

const HEADING: Record<Locale, string> = {
  fr: "L'essentiel",
  es: "Lo esencial",
  "es-ar": "Lo esencial",
  en: "Key takeaways",
};

/**
 * A short, self-contained answer block at the top of an article.
 *
 * This is the highest-leverage pattern for generative engines. They don't read
 * a page the way a person does — a retrieval system splits it into chunks,
 * embeds them, and pulls back the two or three that best match a question.
 * A chunk only gets quoted if it answers the question *on its own*, without
 * the surrounding article for context.
 *
 * So each line here is written to stand alone: it names the subject rather
 * than saying "it" or "this", and it carries a concrete figure or a definite
 * statement rather than a promise that the answer appears further down.
 *
 * Plain <ul>/<li> markup on purpose. The extraction pipelines that feed these
 * models parse raw HTML without running scripts or CSS, and a list is the
 * structure they segment most reliably.
 */
export default function KeyTakeaways({ items, locale }: { items: string[]; locale: Locale }) {
  if (!items.length) return null;

  return (
    <aside className="key-takeaways" aria-labelledby="key-takeaways-title">
      <h2 className="key-takeaways-title mono" id="key-takeaways-title">
        {HEADING[locale]}
      </h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
