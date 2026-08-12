import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { en } from "@/content/i18n/en";
import { fr } from "@/content/i18n/fr";
import { es } from "@/content/i18n/es";
import { esAr } from "@/content/i18n/es-ar";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  fr,
  es,
  "es-ar": esAr,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
