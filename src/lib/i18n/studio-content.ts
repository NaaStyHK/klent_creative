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
  h1: string;
  intro: string;
  teamEyebrow: string;
  teamTitle: string;
  members: StudioMember[];
  reachEyebrow: string;
  reachTitle: string;
  reachBody: string;
  reachPoints: StudioPoint[];
  approachEyebrow: string;
  approachTitle: string;
  approachBody: string;
  approachPoints: StudioPoint[];
  ctaKicker: string;
  ctaHeadline: [string, string];
  ctaButton: string;
};
