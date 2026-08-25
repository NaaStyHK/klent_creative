import type { LocalLandingContent } from "@/lib/i18n/local-landing-content";
import type { LocalLandingKey } from "@/lib/local-landings";
import { refonteLaRochelle } from "./refonte-la-rochelle";
import { devWebCharenteMaritime } from "./dev-web-charente-maritime";

const content: Record<LocalLandingKey, LocalLandingContent> = {
  "refonte-la-rochelle": refonteLaRochelle,
  "dev-web-charente-maritime": devWebCharenteMaritime,
};

export function getLocalLandingContent(key: LocalLandingKey): LocalLandingContent {
  return content[key];
}
