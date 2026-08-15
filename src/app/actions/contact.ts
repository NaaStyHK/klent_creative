"use server";

import { Resend } from "resend";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

/**
 * Where enquiries land. Kept separate from the "from" address: Resend will
 * only send from a domain you have verified, while the destination can be any
 * inbox.
 */
const TO = "contact@klentcreative.com";
const FROM = "Klent Creative <contact@klentcreative.com>";

export type ContactState = {
  status: "idle" | "success" | "error";
  /** Field-level messages, keyed by input name. */
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  /** Echoed back so the form can repopulate after a failed submit. */
  values?: Record<string, string>;
};

/**
 * In-memory throttle: at most 3 submissions per IP per 10 minutes.
 *
 * Deliberately not a database. Serverless instances are short-lived and not
 * shared, so this stops the naive case — someone hammering submit, a simple
 * script — without pretending to be real abuse protection. The honeypot below
 * catches the bulk of automated spam, which is what actually reaches a
 * contact form in practice.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function label(options: { value: string; label: string }[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const localeRaw = String(formData.get("locale") ?? "");
  const locale: Locale = isLocale(localeRaw) ? localeRaw : "fr";
  const dict = getDictionary(locale);
  const t = dict.contact.form;

  const get = (key: string) => String(formData.get(key) ?? "").trim();

  const values = {
    intent: get("intent") || "project",
    budget: get("budget"),
    timeline: get("timeline"),
    name: get("name"),
    email: get("email"),
    company: get("company"),
    message: get("message"),
  };
  const services = formData.getAll("services").map(String);

  // Hidden field, positioned off-screen and never focusable. A human leaves it
  // empty; most bots fill every input they find. Answering with a success
  // state rather than an error means the bot has no signal to adapt to.
  if (get("website")) return { status: "success" };

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = t.required.name;
  if (!values.email) errors.email = t.required.email;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) errors.email = t.required.emailInvalid;
  if (!values.message) errors.message = t.required.message;
  else if (values.message.length < 20) errors.message = t.required.messageShort;

  if (Object.keys(errors).length) return { status: "error", errors, values };

  // Trusting the client here would let anyone post arbitrary strings straight
  // into the notification email.
  const { headers } = await import("next/headers");
  const head = await headers();
  const ip = head.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return { status: "error", values };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante : impossible d'envoyer le formulaire de contact.");
    return { status: "error", values };
  }

  const isProject = values.intent === "project";
  const rows: [string, string][] = [
    [t.intentLabel, isProject ? t.intentProject : t.intentQuestion],
    ...(isProject
      ? ([
          [t.serviceLabel, services.map((s) => label(t.services, s)).join(", ") || "—"],
          [t.budgetLabel, label(t.budgets, values.budget)],
          [t.timelineLabel, label(t.timelines, values.timeline)],
        ] as [string, string][])
      : []),
    [t.nameLabel, values.name],
    [t.emailLabel, values.email],
    ...(values.company ? ([[t.companyLabel, values.company]] as [string, string][]) : []),
  ];

  const subject = isProject
    ? `Projet — ${values.name}${values.company ? ` (${values.company})` : ""}`
    : `Question — ${values.name}`;

  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111">
      <p style="margin:0 0 18px;font-size:13px;color:#6f6d66">
        ${escapeHtml(locale.toUpperCase())} · klentcreative.com
      </p>
      <table cellpadding="0" cellspacing="0" style="margin:0 0 22px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:3px 18px 3px 0;color:#6f6d66;white-space:nowrap">${escapeHtml(
                k,
              )}</td><td style="padding:3px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <div style="padding:16px 18px;background:#f2f0e8;border-left:3px solid #d8ff3e;white-space:pre-wrap">${escapeHtml(
        values.message,
      )}</div>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      // Lets a reply go straight back to the visitor instead of to ourselves.
      replyTo: values.email,
      html,
      text: [...rows.map(([k, v]) => `${k}: ${v}`), "", values.message].join("\n"),
    });
    if (error) {
      console.error("Envoi Resend refusé:", error);
      return { status: "error", values };
    }
  } catch (cause) {
    console.error("Envoi Resend impossible:", cause);
    return { status: "error", values };
  }

  return { status: "success" };
}
