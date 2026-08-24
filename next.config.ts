import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets you open the dev server from another device on the same network
  // (e.g. a phone) to test mobile — without this, Next.js dev blocks
  // cross-origin requests for its JS chunks and the page never finishes
  // hydrating (which is why the loader looked "stuck" on mobile: the script
  // that removes it never ran). Dev-only setting, has no effect on
  // `next build` / production.
  allowedDevOrigins: ["192.168.1.230"],
  // "/" is the only redirect. Every localised URL is served directly, in all
  // four locales, and none has ever been redirected or removed — including the
  // French ones, which keep the search signals they have accumulated.
  //
  // It lives here rather than in an app/page.tsx so that app/[locale]/layout
  // can be the single root layout and render <html lang> on the server. A page
  // at "/" would have forced a second root layout just to redirect.
  //
  // English on purpose: "/" is the language-neutral entry point, so it must
  // land on the locale that x-default declares (defaultLocale in
  // src/lib/i18n/config.ts, currently "en"). The two are a pair — changing one
  // without the other tells Google a default the site does not actually serve.
  // Fixed target, never browser-language based, so a crawler and a visitor
  // always see the same thing.
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: true }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
