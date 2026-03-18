import "server-only";

const dictionaries = {
  fr: () => import("@/messages/fr.json").then((module) => module.default),
  es: () => import("@/messages/es.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}