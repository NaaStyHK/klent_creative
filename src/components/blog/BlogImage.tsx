import Image from "next/image";

/**
 * Images written in Markdown, rendered through the image optimiser.
 *
 * MDX turns `![alt](src)` into a bare `<img>`, which bypasses Next entirely:
 * the Mannà website capture would have been served as its original 979 KB PNG,
 * at full size, on every article that showed it. Routed through `next/image`
 * it is converted, resized to the reader's screen and loaded lazily.
 *
 * The dimensions below are a declared aspect ratio rather than the file's real
 * size, which Markdown never tells us. `height: auto` in the stylesheet lets
 * the real proportions win, while these numbers still reserve space in the
 * layout so nothing jumps once the image arrives.
 */
export default function BlogImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;

  // A caption is worth more than a decorative image: it tells the reader what
  // they are looking at, and search engines read it as part of the content.
  const caption = alt?.trim();

  return (
    <figure className="blog-figure">
      <Image
        src={src}
        alt={caption ?? ""}
        width={1600}
        height={1000}
        sizes="(max-width: 850px) 100vw, 820px"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
