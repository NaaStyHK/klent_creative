import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets you open the dev server from another device on the same network
  // (e.g. a phone) to test mobile — without this, Next.js dev blocks
  // cross-origin requests for its JS chunks and the page never finishes
  // hydrating (which is why the loader looked "stuck" on mobile: the script
  // that removes it never ran). Dev-only setting, has no effect on
  // `next build` / production.
  allowedDevOrigins: ["192.168.1.230"],
  // No redirects: every URL indexed on the previous site (/fr, /es,
  // /fr/contact, /fr/blog, /es/blog, and all 10 FR blog slugs) is
  // reproduced at an identical path in this app. Add a `redirects()`
  // entry here (301) only if an existing slug ever needs to change.
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
