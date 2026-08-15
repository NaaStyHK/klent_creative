import type { ContactForm } from "@/lib/i18n/dictionary";

/**
 * One set of rules, imported by both the browser and the Server Action.
 *
 * The client copy exists so a visitor is told immediately that an address is
 * malformed instead of after a round trip. The server copy is the one that
 * decides: anything arriving over the wire is treated as hostile, because the
 * client checks can be stripped by disabling JavaScript or replayed with a
 * hand-rolled POST.
 */

export const LIMITS = {
  name: { min: 3, max: 60 },
  email: { max: 254, localMax: 64 },
  company: { max: 80 },
  message: { min: 20, max: 4000 },
} as const;

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

/**
 * Names in the four markets this site serves contain accents, apostrophes
 * (O'Brien), hyphens (Marie-Claire) and periods (J. Martín). Digits are the
 * reliable spam tell — a person's name does not contain them — so they are
 * rejected outright rather than stripped.
 */
const NAME_ALLOWED = /^[\p{L}\p{M}][\p{L}\p{M}\s'’.-]*$/u;
const LETTER = /\p{L}/gu;

/**
 * Deliberately stricter than the RFC, which permits addresses no mail provider
 * would issue. This rejects spaces, consecutive dots, a leading or trailing
 * dot, and demands a TLD of at least two letters.
 */
const EMAIL =
  /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

/**
 * Drops non-printable characters — a paste accident, or an attempt to smuggle
 * a newline into a field that ends up in the notification email's subject.
 *
 * Written as a code-point filter rather than a regex character class on
 * purpose: a class spelled with literal control characters is invisible in an
 * editor and trivially corrupted by the next edit, and its escaped form is one
 * backslash away from silently matching nothing at all.
 */
function stripControl(value: string, keepNewlines = false): string {
  let out = "";
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    if (keepNewlines && char === "\n") out += char;
    else if (code >= 32 && code !== 127) out += char;
  }
  return out;
}

/** Collapses runs of whitespace and strips control characters. */
export function normalise(value: string): string {
  return stripControl(value).replace(/\s+/g, " ").trim();
}

/** Same rules, minus the whitespace collapsing that would flatten paragraphs. */
export function normaliseMessage(value: string): string {
  return stripControl(value, true)
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}


export function validateContact(values: ContactValues, t: ContactForm): ContactErrors {
  const errors: ContactErrors = {};
  const name = normalise(values.name);
  const email = normalise(values.email);
  const company = normalise(values.company);
  const message = normaliseMessage(values.message);

  if (!name) errors.name = t.required.name;
  else if (/\d/.test(name)) errors.name = t.required.nameDigits;
  else if (!NAME_ALLOWED.test(name)) errors.name = t.required.nameInvalid;
  else if ((name.match(LETTER) ?? []).length < LIMITS.name.min) errors.name = t.required.nameShort;
  else if (name.length > LIMITS.name.max) errors.name = t.required.nameLong;

  if (!email) errors.email = t.required.email;
  else if (email.length > LIMITS.email.max) errors.email = t.required.emailInvalid;
  else if ((email.split("@")[0] ?? "").length > LIMITS.email.localMax)
    errors.email = t.required.emailInvalid;
  else if (!EMAIL.test(email)) errors.email = t.required.emailInvalid;

  if (company.length > LIMITS.company.max) errors.company = t.required.companyLong;

  if (!message) errors.message = t.required.message;
  else if (message.length < LIMITS.message.min) errors.message = t.required.messageShort;
  else if (message.length > LIMITS.message.max) errors.message = t.required.messageLong;

  return errors;
}
