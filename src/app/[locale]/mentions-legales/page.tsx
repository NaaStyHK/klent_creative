import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, siteUrl } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Mentions légales | Klent Creative",
  description:
    "Informations légales relatives au site Klent Creative, à son éditeur, son hébergement et au traitement des données personnelles.",
  alternates: {
    canonical: siteUrl + "/fr/mentions-legales",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "fr") notFound();

  return (
    <article className="blog-article" lang="fr">
      <span className="mono blog-date">Informations légales</span>
      <h1 className="headline">Mentions légales</h1>

      <div className="blog-body">
        <p>
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en
          l&apos;économie numérique.
        </p>

        <h2>1. Éditeur du site</h2>
        <p>
          <strong>Nom commercial</strong>
          <br />
          Klent Creative
        </p>
        <p>
          <strong>Responsable de publication</strong>
          <br />
          Kevin Hafsi
        </p>
        <p>
          <strong>Statut</strong>
          <br />
          Micro-entrepreneur
        </p>
        <p>
          <strong>SIRET</strong>
          <br />
          101 813 863 00012
        </p>
        <p>
          <strong>Adresse</strong>
          <br />
          La Rochelle, France
        </p>
        <p>
          <strong>Email</strong>
          <br />
          <a href="mailto:contact@klentcreative.com">contact@klentcreative.com</a>
        </p>
        <p>
          <strong>Site web</strong>
          <br />
          <a href="https://www.klentcreative.com">www.klentcreative.com</a>
        </p>

        <h2>2. Hébergement</h2>
        <p>
          <strong>Hébergeur</strong>
          <br />
          Vercel Inc.
        </p>
        <p>
          <strong>Adresse</strong>
          <br />
          340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis
        </p>
        <p>
          <strong>Site</strong>
          <br />
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
            vercel.com
          </a>
        </p>

        <h2>3. Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu de ce site — textes, visuels, logo, code source, animations et
          structure — est la propriété exclusive de Kevin Hafsi / Klent Creative, sauf mention
          contraire.
        </p>
        <p>
          Toute reproduction, distribution, modification ou exploitation, même partielle, sans
          autorisation écrite préalable est strictement interdite et constitue une contrefaçon
          sanctionnée par le Code de la propriété intellectuelle.
        </p>

        <h2>4. Données personnelles (RGPD)</h2>
        <p>
          Les données collectées via le formulaire de contact (nom, email, message) sont utilisées
          uniquement pour répondre à vos demandes. Elles ne sont jamais revendues, partagées ou
          exploitées à des fins commerciales.
        </p>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de
          suppression de vos données. Pour exercer ce droit, contactez-nous à{" "}
          <a href="mailto:contact@klentcreative.com">contact@klentcreative.com</a>.
        </p>

        <h2>5. Cookies</h2>
        <p>
          Ce site n&apos;utilise pas de cookies de traçage ou publicitaires. Des cookies techniques
          strictement nécessaires au bon fonctionnement du site peuvent être déposés. Aucun cookie
          tiers à des fins marketing n&apos;est utilisé.
        </p>

        <h2>6. Limitation de responsabilité</h2>
        <p>
          Klent Creative s&apos;efforce de maintenir les informations publiées sur ce site à jour et
          exactes, mais ne peut garantir l&apos;exhaustivité ou l&apos;exactitude de ces informations. La
          responsabilité de Klent Creative ne saurait être engagée pour tout dommage direct ou
          indirect résultant de l&apos;utilisation de ce site.
        </p>

        <h2>7. Droit applicable</h2>
        <p>
          Le présent site et ses mentions légales sont soumis au droit français. En cas de litige,
          les tribunaux français seront seuls compétents.
        </p>

        <p>
          <strong>Dernière mise à jour : août 2026</strong>
        </p>
      </div>
    </article>
  );
}
