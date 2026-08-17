import type { ReactNode } from "react";

/**
 * A heading that may draw one of its words as an outline.
 *
 * Plain text stays a plain string, so a heading that needs no emphasis reads
 * exactly as it did before. When one word carries the sentence, the string
 * becomes a list of segments and that word is wrapped in an object.
 *
 * The landing page grew four near-identical copies of this before the service
 * pages needed it on eighty more headings; this is that pattern, written once.
 */
export type RichHeading = string | Array<string | { outline: string }>;

export default function renderHeading(heading: RichHeading): ReactNode {
  if (typeof heading === "string") return heading;

  return heading.map((segment, i) =>
    typeof segment === "string" ? (
      segment
    ) : (
      // Wrapped rather than split out, so the heading's text content is
      // unchanged and nothing glues together when a crawler reads it.
      <span className="outline" key={i}>
        {segment.outline}
      </span>
    ),
  );
}

/**
 * The heading as plain text.
 *
 * Required wherever a heading is consumed as data rather than rendered: the
 * `name` of a structured-data node, a link label, a document title. Serialising
 * the segment array into JSON-LD would emit an array of objects where Google
 * expects a string, so this is not a convenience — it is what keeps the markup
 * valid once a heading gains an outlined word.
 */
export function headingText(heading: RichHeading): string {
  if (typeof heading === "string") return heading;
  return heading.map((s) => (typeof s === "string" ? s : s.outline)).join("");
}
