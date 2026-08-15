/**
 * Rasterises the brand SVG into the fixed-size PNGs that social platforms and
 * Google's structured data require. Both refuse SVG: Open Graph consumers
 * (LinkedIn, WhatsApp, Slack) silently drop it, and Google's Organization
 * `logo` property needs a raster it can crawl and thumbnail.
 *
 * Run with `npm run brand:images` after changing public/brand/*.svg.
 * The outputs are committed, so the build itself never depends on sharp.
 */
import sharp from "sharp";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";

const DARK = "#111111";
const ACID = "#d8ff3e";

// logo-mark-dark-bg.svg is the light-coloured mark intended to sit ON a dark
// background (same file the intro loader uses), which is what we want here.
const logo = readFileSync("public/brand/logo-mark-dark-bg.svg");

mkdirSync("public/og", { recursive: true });

/**
 * 1200x630 is the size Open Graph consumers crop to; anything else gets
 * letterboxed. The mark alone is just "<KC>", which nobody recognises in a
 * LinkedIn feed, so the wordmark and positioning line carry the identity.
 *
 * Text is drawn with a system grotesque rather than Manrope: next/font caches
 * Google fonts as .woff2 only, which neither librsvg nor Satori can consume.
 * At this size and letter-spacing the difference is not perceptible, and the
 * PNG is committed, so the substitution is baked in once here rather than
 * varying per machine.
 */
async function openGraph() {
  const width = 1200;
  const height = 630;
  const logoWidth = 460;

  const mark = await sharp(logo).resize({ width: logoWidth }).png().toBuffer();
  const { height: logoHeight } = await sharp(mark).metadata();

  const markTop = 168;

  const text = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
       <text x="${width / 2}" y="${markTop + logoHeight + 96}"
             font-family="Segoe UI, Arial, sans-serif" font-size="62" font-weight="700"
             fill="#f2f0e8" text-anchor="middle" letter-spacing="4">KLENT CREATIVE</text>
       <text x="${width / 2}" y="${markTop + logoHeight + 152}"
             font-family="Consolas, Courier New, monospace" font-size="21" font-weight="400"
             fill="${ACID}" text-anchor="middle" letter-spacing="5">LA ROCHELLE / BARCELONA / CORDOBA</text>
     </svg>`,
  );

  const bar = await sharp({
    create: { width, height: 10, channels: 4, background: ACID },
  })
    .png()
    .toBuffer();

  await sharp({
    create: { width, height, channels: 4, background: DARK },
  })
    .composite([
      { input: mark, left: Math.round((width - logoWidth) / 2), top: markTop },
      { input: text, left: 0, top: 0 },
      { input: bar, left: 0, top: height - 10 },
    ])
    .png()
    .toFile("public/og/klent-creative.png");
}

/** Square raster for schema.org Organization.logo (Google wants >=112px). */
async function organizationLogo() {
  const size = 512;
  const logoWidth = 400;

  const mark = await sharp(logo).resize({ width: logoWidth }).png().toBuffer();
  const { height: logoHeight } = await sharp(mark).metadata();

  await sharp({
    create: { width: size, height: size, channels: 4, background: DARK },
  })
    .composite([
      {
        input: mark,
        left: Math.round((size - logoWidth) / 2),
        top: Math.round((size - logoHeight) / 2),
      },
    ])
    .png()
    .toFile("public/brand/logo-square.png");
}

/**
 * The 180x180 Apple touch icon, downscaled from src/app/icon.png.
 *
 * src/app/icon.png is hand-supplied artwork and is NEVER written by this
 * script — every icon here derives from it, so the whole set stays in step
 * with whatever square version of the mark is current.
 */
async function appleIcon() {
  await sharp("src/app/icon.png")
    .resize(180, 180, { kernel: "lanczos3" })
    .flatten({ background: DARK })
    .png()
    .toFile("src/app/apple-icon.png");
}

/**
 * Builds src/app/favicon.ico from src/app/icon.png.
 *
 * Without it, /favicon.ico 404s. Modern browsers don't care — they follow the
 * <link rel="icon"> that Next.js emits for icon.png — but plenty of crawlers,
 * feed readers and link-preview bots still request the bare path.
 *
 * sharp cannot encode ICO, so this writes the container by hand. Since Vista,
 * an .ico may hold PNG payloads verbatim, which makes the format little more
 * than a header plus a directory: 16, 32 and 48 are embedded so the browser
 * picks per context (tab, bookmark bar, desktop shortcut) instead of
 * downscaling one size badly.
 */
async function faviconIco() {
  const sizes = [16, 32, 48];
  // ensureAlpha is required, not cosmetic: Turbopack's ICO decoder rejects
  // embedded PNGs that aren't RGBA ("The PNG is not in RGBA format!"), and the
  // source artwork is opaque RGB.
  const images = await Promise.all(
    sizes.map((size) =>
      sharp("src/app/icon.png")
        .resize(size, size, { kernel: "lanczos3" })
        .ensureAlpha()
        .png()
        .toBuffer(),
    ),
  );

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(sizes.length, 4);

  let offset = 6 + sizes.length * 16;
  const entries = sizes.map((size, i) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0); // width  (0 would mean 256)
    entry.writeUInt8(size, 1); // height
    entry.writeUInt8(0, 2); // palette size: 0 for truecolour
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(images[i].length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += images[i].length;
    return entry;
  });

  writeFileSync("src/app/favicon.ico", Buffer.concat([header, ...entries, ...images]));
}

await openGraph();
await organizationLogo();
await appleIcon();
await faviconIco();
console.log("Wrote og image, square logo, apple-icon.png and favicon.ico");
