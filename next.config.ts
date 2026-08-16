import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets you open the dev server from another device on the same network
  // (e.g. a phone) to test mobile — without this, Next.js dev blocks
  // cross-origin requests for its JS chunks and the page never finishes
  // hydrating (which is why the loader looked "stuck" on mobile: the script
  // that removes it never ran). Dev-only setting, has no effect on
  // `next build` / production.
  allowedDevOrigins: ["192.168.1.230"],
  // "/" is the only redirect: every URL indexed on the previous site (/fr,
  // /es, /fr/contact, /fr/blog, /es/blog, and all 10 FR blog slugs) is
  // reproduced at an identical path in this app.
  //
  // It lives here rather than in an app/page.tsx so that app/[locale]/layout
  // can be the single root layout and render <html lang> on the server. A page
  // at "/" would have forced a second root layout just to redirect.
  //
  // French on purpose: the live site has sent "/" to /fr for months and every
  // indexed URL is French. Fixed target, never browser-language based —
  // Googlebot crawls from the US in English and would always land on /en.
  async redirects() {
    return [{ source: "/", destination: "/fr", permanent: true }];
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
