/**
 * F11-P02 -- JSON-LD for /about/our-team: an AboutPage tied to the homepage
 * Organization node (by @id, never a second Organization), plus one Person per
 * full profile with name and grounded jobTitle only. Person.image is set ONLY
 * for genuine photographs, never for illustrations. Person @ids are
 * locale-independent so EN and HI describe the same people.
 */
import { SITE_URL } from "./articleSchema";
import { ORGANIZATION_ID } from "./organizationSchema";
import { TEAM_MEMBERS, TEAM_PATH, TEAM_SECTIONS, type Locale } from "../../app/data/teamMembers";

export const teamPageUrl = (locale: Locale) => `${SITE_URL}${locale === "hi" ? "/hi" : ""}${TEAM_PATH}`;

export function buildTeamPageSchema(locale: Locale, page: { name: string; description: string }) {
  const url = teamPageUrl(locale);
  const people = TEAM_SECTIONS.flatMap((s) => s.members).map((key) => {
    const m = TEAM_MEMBERS[key];
    return {
      "@type": "Person",
      "@id": `${teamPageUrl("en")}#${m.id}`,
      name: m.name[locale],
      jobTitle: m.title[locale],
      worksFor: { "@id": ORGANIZATION_ID },
      ...(m.image.kind === "photo" ? { image: `${SITE_URL}${m.image.src}` } : {}),
    };
  });
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${url}#webpage`,
        url,
        name: page.name,
        description: page.description,
        inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
        about: { "@id": ORGANIZATION_ID },
        mentions: people.map((p) => ({ "@id": p["@id"] })),
      },
      ...people,
    ],
  };
}
