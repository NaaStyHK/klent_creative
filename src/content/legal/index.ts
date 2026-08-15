import type { Locale } from "@/lib/i18n/config";
import type { LegalContent } from "@/lib/i18n/legal-content";

/**
 * Company details are identical in every locale — only the surrounding text is
 * translated. The publisher is a French sole trader, so French law stays the
 * applicable law in all versions; translating the notice does not change the
 * jurisdiction, it only makes it readable for non-French speakers.
 */
const EMAIL = "contact@klentcreative.com";
const SITE = "www.klentcreative.com";
const SIRET = "101 813 863 00012";
const VERCEL_ADDRESS_EN = "340 Pine Street, Suite 701, San Francisco, CA 94104, United States";

export const legal: Record<Locale, LegalContent> = {
  fr: {
    metaTitle: "Mentions légales | Klent Creative",
    metaDescription:
      "Informations légales relatives au site Klent Creative, à son éditeur, son hébergement et au traitement des données personnelles.",
    eyebrow: "Informations légales",
    h1: "Mentions légales",
    intro:
      "Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique.",
    editorTitle: "1. Éditeur du site",
    editorFields: [
      { label: "Nom commercial", value: "Klent Creative" },
      { label: "Responsable de publication", value: "Kevin Hafsi" },
      { label: "Statut", value: "Micro-entrepreneur" },
      { label: "SIRET", value: SIRET },
      { label: "Adresse", value: "La Rochelle, France" },
      { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
      { label: "Site web", value: SITE, href: `https://${SITE}` },
    ],
    hostingTitle: "2. Hébergement",
    hostingFields: [
      { label: "Hébergeur", value: "Vercel Inc." },
      { label: "Adresse", value: "340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis" },
      { label: "Site", value: "vercel.com", href: "https://vercel.com" },
    ],
    sections: [
      {
        title: "3. Propriété intellectuelle",
        paragraphs: [
          "L'ensemble du contenu de ce site — textes, visuels, logo, code source, animations et structure — est la propriété exclusive de Kevin Hafsi / Klent Creative, sauf mention contraire.",
          "Toute reproduction, distribution, modification ou exploitation, même partielle, sans autorisation écrite préalable est strictement interdite et constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.",
        ],
      },
      {
        title: "4. Données personnelles (RGPD)",
        paragraphs: [
          "Les données collectées via le formulaire de contact (nom, email, message) sont utilisées uniquement pour répondre à vos demandes. Elles ne sont jamais revendues, partagées ou exploitées à des fins commerciales.",
          `Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à ${EMAIL}.`,
        ],
      },
      {
        title: "5. Cookies",
        paragraphs: [
          "Ce site n'utilise pas de cookies de traçage ou publicitaires. Des cookies techniques strictement nécessaires au bon fonctionnement du site peuvent être déposés. Aucun cookie tiers à des fins marketing n'est utilisé.",
        ],
      },
      {
        title: "6. Limitation de responsabilité",
        paragraphs: [
          "Klent Creative s'efforce de maintenir les informations publiées sur ce site à jour et exactes, mais ne peut garantir l'exhaustivité ou l'exactitude de ces informations. La responsabilité de Klent Creative ne saurait être engagée pour tout dommage direct ou indirect résultant de l'utilisation de ce site.",
        ],
      },
      {
        title: "7. Droit applicable",
        paragraphs: [
          "Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.",
        ],
      },
    ],
    lastUpdate: "Dernière mise à jour : août 2026",
  },

  es: {
    metaTitle: "Aviso legal | Klent Creative",
    metaDescription:
      "Información legal relativa al sitio de Klent Creative, su editor, su alojamiento y el tratamiento de datos personales.",
    eyebrow: "Información legal",
    h1: "Aviso legal",
    intro:
      "Conforme a lo dispuesto en la ley francesa n.º 2004-575, de 21 de junio de 2004, para la confianza en la economía digital.",
    editorTitle: "1. Editor del sitio",
    editorFields: [
      { label: "Nombre comercial", value: "Klent Creative" },
      { label: "Responsable de publicación", value: "Kevin Hafsi" },
      { label: "Forma jurídica", value: "Micro-entrepreneur (autónomo, Francia)" },
      { label: "SIRET", value: SIRET },
      { label: "Dirección", value: "La Rochelle, Francia" },
      { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
      { label: "Sitio web", value: SITE, href: `https://${SITE}` },
    ],
    hostingTitle: "2. Alojamiento",
    hostingFields: [
      { label: "Proveedor", value: "Vercel Inc." },
      { label: "Dirección", value: "340 Pine Street, Suite 701, San Francisco, CA 94104, Estados Unidos" },
      { label: "Sitio", value: "vercel.com", href: "https://vercel.com" },
    ],
    sections: [
      {
        title: "3. Propiedad intelectual",
        paragraphs: [
          "Todo el contenido de este sitio — textos, imágenes, logotipo, código fuente, animaciones y estructura — es propiedad exclusiva de Kevin Hafsi / Klent Creative, salvo indicación en contrario.",
          "Queda estrictamente prohibida cualquier reproducción, distribución, modificación o explotación, incluso parcial, sin autorización previa por escrito. Dicha conducta constituye una infracción sancionada por la legislación de propiedad intelectual.",
        ],
      },
      {
        title: "4. Datos personales (RGPD)",
        paragraphs: [
          "Los datos recogidos a través del formulario de contacto (nombre, email, mensaje) se utilizan únicamente para responder a vuestras solicitudes. Nunca se venden, comparten ni se explotan con fines comerciales.",
          `Conforme al RGPD, tenéis derecho de acceso, rectificación y supresión de vuestros datos. Para ejercerlo, escribidnos a ${EMAIL}.`,
        ],
      },
      {
        title: "5. Cookies",
        paragraphs: [
          "Este sitio no utiliza cookies de seguimiento ni publicitarias. Pueden instalarse cookies técnicas estrictamente necesarias para el funcionamiento del sitio. No se utiliza ninguna cookie de terceros con fines de marketing.",
        ],
      },
      {
        title: "6. Limitación de responsabilidad",
        paragraphs: [
          "Klent Creative se esfuerza por mantener actualizada y exacta la información publicada en este sitio, pero no puede garantizar su exhaustividad ni su exactitud. Klent Creative no será responsable de ningún daño directo o indirecto derivado del uso de este sitio.",
        ],
      },
      {
        title: "7. Legislación aplicable",
        paragraphs: [
          "Este sitio y su aviso legal se rigen por la legislación francesa. En caso de litigio, serán competentes exclusivamente los tribunales franceses.",
        ],
      },
    ],
    lastUpdate: "Última actualización: agosto de 2026",
  },

  "es-ar": {
    metaTitle: "Aviso legal | Klent Creative",
    metaDescription:
      "Información legal sobre el sitio de Klent Creative, su editor, su alojamiento y el tratamiento de datos personales.",
    eyebrow: "Información legal",
    h1: "Aviso legal",
    intro:
      "Conforme a lo dispuesto en la ley francesa n.º 2004-575, del 21 de junio de 2004, para la confianza en la economía digital.",
    editorTitle: "1. Editor del sitio",
    editorFields: [
      { label: "Nombre comercial", value: "Klent Creative" },
      { label: "Responsable de publicación", value: "Kevin Hafsi" },
      { label: "Forma jurídica", value: "Micro-entrepreneur (monotributista, Francia)" },
      { label: "SIRET", value: SIRET },
      { label: "Dirección", value: "La Rochelle, Francia" },
      { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
      { label: "Sitio web", value: SITE, href: `https://${SITE}` },
    ],
    hostingTitle: "2. Alojamiento",
    hostingFields: [
      { label: "Proveedor", value: "Vercel Inc." },
      { label: "Dirección", value: "340 Pine Street, Suite 701, San Francisco, CA 94104, Estados Unidos" },
      { label: "Sitio", value: "vercel.com", href: "https://vercel.com" },
    ],
    sections: [
      {
        title: "3. Propiedad intelectual",
        paragraphs: [
          "Todo el contenido de este sitio — textos, imágenes, logotipo, código fuente, animaciones y estructura — es propiedad exclusiva de Kevin Hafsi / Klent Creative, salvo indicación en contrario.",
          "Queda estrictamente prohibida cualquier reproducción, distribución, modificación o explotación, incluso parcial, sin autorización previa por escrito. Dicha conducta constituye una infracción sancionada por la legislación de propiedad intelectual.",
        ],
      },
      {
        title: "4. Datos personales (RGPD)",
        paragraphs: [
          "Los datos que se recogen mediante el formulario de contacto (nombre, email, mensaje) se usan únicamente para responder a tus consultas. Nunca se venden, comparten ni se explotan con fines comerciales.",
          `Conforme al RGPD, tenés derecho de acceso, rectificación y supresión de tus datos. Para ejercerlo, escribinos a ${EMAIL}.`,
        ],
      },
      {
        title: "5. Cookies",
        paragraphs: [
          "Este sitio no usa cookies de seguimiento ni publicitarias. Pueden instalarse cookies técnicas estrictamente necesarias para el funcionamiento del sitio. No se usa ninguna cookie de terceros con fines de marketing.",
        ],
      },
      {
        title: "6. Limitación de responsabilidad",
        paragraphs: [
          "Klent Creative se esfuerza por mantener actualizada y exacta la información publicada en este sitio, pero no puede garantizar su exhaustividad ni su exactitud. Klent Creative no será responsable por ningún daño directo o indirecto derivado del uso de este sitio.",
        ],
      },
      {
        title: "7. Legislación aplicable",
        paragraphs: [
          "Este sitio y su aviso legal se rigen por la legislación francesa. En caso de litigio, serán competentes exclusivamente los tribunales franceses.",
        ],
      },
    ],
    lastUpdate: "Última actualización: agosto de 2026",
  },

  en: {
    metaTitle: "Legal notice | Klent Creative",
    metaDescription:
      "Legal information about the Klent Creative website, its publisher, its hosting and the processing of personal data.",
    eyebrow: "Legal information",
    h1: "Legal notice",
    intro:
      "In accordance with French law no. 2004-575 of 21 June 2004 on confidence in the digital economy.",
    editorTitle: "1. Site publisher",
    editorFields: [
      { label: "Trading name", value: "Klent Creative" },
      { label: "Publication manager", value: "Kevin Hafsi" },
      { label: "Legal status", value: "Micro-entrepreneur (French sole trader)" },
      { label: "SIRET", value: SIRET },
      { label: "Address", value: "La Rochelle, France" },
      { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
      { label: "Website", value: SITE, href: `https://${SITE}` },
    ],
    hostingTitle: "2. Hosting",
    hostingFields: [
      { label: "Host", value: "Vercel Inc." },
      { label: "Address", value: VERCEL_ADDRESS_EN },
      { label: "Site", value: "vercel.com", href: "https://vercel.com" },
    ],
    sections: [
      {
        title: "3. Intellectual property",
        paragraphs: [
          "All content on this site — text, visuals, logo, source code, animations and structure — is the exclusive property of Kevin Hafsi / Klent Creative, unless stated otherwise.",
          "Any reproduction, distribution, modification or exploitation, even partial, without prior written permission is strictly prohibited and constitutes an infringement punishable under intellectual property law.",
        ],
      },
      {
        title: "4. Personal data (GDPR)",
        paragraphs: [
          "Data collected through the contact form (name, email, message) is used solely to respond to your enquiries. It is never sold, shared or used for commercial purposes.",
          `Under the GDPR, you have the right to access, correct and delete your data. To exercise that right, contact us at ${EMAIL}.`,
        ],
      },
      {
        title: "5. Cookies",
        paragraphs: [
          "This site does not use tracking or advertising cookies. Technical cookies strictly necessary for the site to function may be set. No third-party cookies are used for marketing purposes.",
        ],
      },
      {
        title: "6. Limitation of liability",
        paragraphs: [
          "Klent Creative strives to keep the information published on this site up to date and accurate, but cannot guarantee that it is complete or error-free. Klent Creative accepts no liability for any direct or indirect damage resulting from use of this site.",
        ],
      },
      {
        title: "7. Governing law",
        paragraphs: [
          "This site and its legal notice are governed by French law. In the event of a dispute, the French courts shall have sole jurisdiction.",
        ],
      },
    ],
    lastUpdate: "Last updated: August 2026",
  },
};

export function getLegalContent(locale: Locale): LegalContent {
  return legal[locale];
}
