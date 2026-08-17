import type { RichHeading } from "@/components/ui/RichHeading";
export type StudioMember = {
  firstName: string;
  role: string;
  /** Short label such as "Français · Espagnol". */
  languages: string;
  bio: string;
  /**
   * Path under /public. Optional: when absent the component falls back to the
   * typographic initial, so a member can be added before their portrait is
   * shot without pointing at a file that does not exist.
   */
  photo?: string;
  photoAlt: string;
  /** Public profile. Optional for the same reason as `photo`. */
  linkedin?: string;
};

export type StudioPoint = {
  title: string;
  body: string;
};

export type StudioContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: RichHeading;
  intro: string;
  teamEyebrow: string;
  teamTitle: RichHeading;
  members: StudioMember[];
  reachEyebrow: string;
  reachTitle: RichHeading;
  reachBody: string;
  reachPoints: StudioPoint[];
  approachEyebrow: string;
  approachTitle: RichHeading;
  approachBody: string;
  approachPoints: StudioPoint[];
  ctaKicker: string;
  ctaHeadline: [RichHeading, RichHeading];
  ctaButton: string;
};
