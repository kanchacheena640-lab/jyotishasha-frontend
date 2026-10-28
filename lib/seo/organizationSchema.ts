/**
 * F10-P15 -- the site's single Organization node (rendered on the homepage).
 *
 * Every value is already published on the site itself:
 *   name/url            brand + canonical origin
 *   email, telephone    app/terms + app/privacy-policy ("support@jyotishasha.com", "+91 9118877495")
 *   address             app/[locale]/contact + Footer ("Gomti Nagar, Lucknow ... 226010")
 *   sameAs              Footer social profile links
 * Deliberately ABSENT until the owner verifies them:
 *   legalName -- the published Terms/Privacy/Refund pages name "Spiritual
 *                Lifestyle Company" as operator, which conflicts with the
 *                stated "Jyotishasha Private Limited"; neither is published here.
 *   logo      -- no logo image asset exists (the header is a text wordmark).
 * No review/aggregateRating is ever attached to the Organization (self-serving).
 */
import { SITE_URL } from "./articleSchema";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Jyotishasha",
    url: SITE_URL,
    email: "support@jyotishasha.com",
    telephone: "+91-9118877495",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lucknow",
      postalCode: "226010",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@jyotishasha.com",
      telephone: "+91-9118877495",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/AashaJyotish/",
      "https://www.instagram.com/jyotishasha108/",
      "https://www.youtube.com/@jyotishasha",
      "https://x.com/SpiritualLifes1",
      "https://in.pinterest.com/remedy999/",
    ],
  };
}
