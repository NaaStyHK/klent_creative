import type { RichHeading } from "@/components/ui/RichHeading";
import type { ServiceContent } from "@/lib/i18n/service-content";

/**
 * A local landing reuses the whole ServiceContent shape — hero, features,
 * benefits, process, faq, closing — so it renders with the existing sections
 * and feeds ServiceJsonLd without a second schema builder.
 *
 * What it adds is what a commercial page for a territory needs and a service
 * page does not: a reassurance block, a real price table, the two published
 * projects as proof, and a coverage area. All optional, so a future landing can
 * skip any of them rather than pad.
 */
export type LocalLandingContent = ServiceContent & {
  /** Reassurance block — the objection that decides the sale. */
  safeguard?: {
    eyebrow: string;
    headline: RichHeading;
    intro: string;
    items: { title: string; body: string }[];
  };
  /** Published work shown as evidence of craft. Slugs must exist in projectSlugs. */
  showcase?: {
    eyebrow: string;
    headline: RichHeading;
    intro: string;
    items: { slug: string; name: string; meta: string; body: string }[];
  };
  /**
   * Price ranges. Only ever populated from figures already published elsewhere
   * on the site — never estimated here.
   */
  pricing?: {
    eyebrow: string;
    headline: RichHeading;
    intro: string;
    rows: { label: string; range: string; body: string }[];
    note: string;
  };
  /** Where the studio works, phrased as reach and never as offices. */
  coverage?: {
    eyebrow: string;
    headline: RichHeading;
    intro: string;
    places: string[];
    note: string;
  };
};
