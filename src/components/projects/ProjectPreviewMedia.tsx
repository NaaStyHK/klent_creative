type ProjectPreviewMediaProps = {
  slug: string;
  image: string;
  alt: string;
};

export default function ProjectPreviewMedia({ slug, image, alt }: ProjectPreviewMediaProps) {
  if (slug === "manna") {
    return (
      <div className="case-media-manna" aria-hidden="true">
        <span className="case-media-manna-light" />
        <img src="/projects/manna/logo-manna.svg" alt="" width={1496} height={860} />
        <small className="mono">Poblenou / Barcelona</small>
      </div>
    );
  }

  if (slug === "oxploria") {
    return (
      <div className="case-media-oxploria" aria-hidden="true">
        <span className="case-media-oxploria-grid" />
        <img src="/projects/oxploria/logo-oxploria-home.svg" alt="" width={286} height={150} />
        <small className="mono">Flutter / Next.js</small>
      </div>
    );
  }

  return <img src={image} alt={alt} loading="lazy" />;
}
