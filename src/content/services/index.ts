import type { Locale } from "@/lib/i18n/config";
import type { ServiceKey } from "@/lib/services";
import type { ServiceContent } from "@/lib/i18n/service-content";
import { branding } from "@/content/services/branding";
import { webDesign } from "@/content/services/web-design";
import { mobileApp } from "@/content/services/mobile-app";
import { growth } from "@/content/services/growth";

const registry: Record<ServiceKey, Record<Locale, ServiceContent>> = {
  branding,
  "web-design": webDesign,
  "mobile-app": mobileApp,
  "growth-content": growth,
};

export function getServiceContent(key: ServiceKey, locale: Locale): ServiceContent {
  return registry[key][locale];
}
