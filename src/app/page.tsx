import { permanentRedirect } from "next/navigation";

/**
 * "/" is not itself an indexed URL — it redirects to a locale.
 *
 * Deliberately French, and deliberately NOT tied to `defaultLocale`. The live
 * site has been sending "/" to /fr for months, and a migration is the worst
 * moment to change a behaviour Google already knows: France is the historic
 * market and every URL currently indexed is French.
 *
 * `defaultLocale` stays English because it serves a different purpose — the
 * hreflang x-default, the fallback for a visitor whose language matches none
 * of the four. Wiring this redirect to it would have silently moved the site's
 * front door to /en.
 *
 * Spanish and English visitors are not affected: they arrive from search,
 * where hreflang already routes them straight to /es or /en. This only governs
 * people typing the bare domain.
 *
 * Fixed target on purpose, never browser-language based: Googlebot crawls from
 * the US in English and would always be sent to /en, which can keep the other
 * versions from being discovered.
 */
const ROOT_LOCALE = "fr";

export default function RootPage() {
  permanentRedirect(`/${ROOT_LOCALE}`);
}
