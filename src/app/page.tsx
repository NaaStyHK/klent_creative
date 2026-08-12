import { permanentRedirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n/config";

// "/" is not an indexed URL — fixed redirect to the default locale (/en),
// not IP/browser-based, so it never interferes with crawling the other locales.
export default function RootPage() {
  permanentRedirect(`/${defaultLocale}`);
}
