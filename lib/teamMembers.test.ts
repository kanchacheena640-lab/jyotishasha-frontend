/** F11-P02 -- "Brains Behind Jyotishasha" (/about/our-team) content and SEO guards.
 * Keeps the team page grounded: real photo files only, Deepak Sharma never
 * pictured, illustrations labelled and never used as Person.image, one full
 * profile per person, approved titles, no invented credentials or report-
 * authorship claims, complete Hindi, and correct structured data/sitemap/footer.
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/teamMembers.test.ts
 *   node .ts-test-out/lib/teamMembers.test.js
 * (then remove .ts-test-out/ -- build output, never committed.)
 */
import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";
import { TEAM_MEMBERS, TEAM_PATH, TEAM_SECTIONS, profileSectionOf, type Localized } from "../app/data/teamMembers";
import { buildTeamPageSchema, teamPageUrl } from "./seo/teamPageSchema";
import { ORGANIZATION_ID } from "./seo/organizationSchema";

let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}
const ROOT = process.cwd();
const read = (f: string) => fs.readFileSync(path.join(ROOT, f), "utf8");
const PAGE = "app/[locale]/about/our-team/page.tsx";
const page = read(PAGE);
const members = Object.entries(TEAM_MEMBERS);
const DEVANAGARI = /[ऀ-ॿ]/;

check("every photo is a real WebP file on disk; the illustration is an SVG", () => {
  for (const [key, m] of members) {
    const file = path.join(ROOT, "public", m.image.src);
    assert.ok(fs.existsSync(file), `${key}: missing ${m.image.src}`);
    const head = fs.readFileSync(file).subarray(0, 12).toString("latin1");
    if (m.image.kind === "photo") assert.ok(head.startsWith("RIFF") && head.endsWith("WEBP"), `${key}: not a WebP photo`);
    else assert.ok(m.image.src.endsWith(".svg"), `${key}: illustration must be the SVG artwork`);
  }
});
check("Deepak Sharma has no profile card and no image of any kind", () => {
  for (const [, m] of members) assert.ok(!/deepak/i.test(m.name.en + m.image.src));
  assert.ok(!fs.readdirSync(path.join(ROOT, "public/images/team")).some((f) => /deepak/i.test(f)));
  assert.ok(!/deepak[^"\n]*\.(webp|png|jpe?g|svg)|<Image[^>]*deepak/i.test(page));
  assert.ok(page.includes("Deepak Sharma") && page.includes("दीपक शर्मा"), "origin story names him in both languages");
});
check("illustrations are labelled as such and never claim to be the person", () => {
  const illustrations = members.filter(([, m]) => m.image.kind === "illustration");
  assert.deepEqual(illustrations.map(([k]) => k), ["sarita"]);
  for (const [, m] of illustrations) {
    assert.ok(/illustration/i.test(m.image.alt.en) && /not a portrait/i.test(m.image.alt.en), m.image.alt.en);
    assert.ok(m.image.alt.hi.includes("चित्रण") && m.image.alt.hi.includes("तस्वीर नहीं"), m.image.alt.hi);
  }
  const svg = read("public/images/team/sarita-marketing.svg");
  assert.ok(svg.includes(">ILLUSTRATION<") && /Not a portrait/.test(svg), "artwork carries a visible Illustration label");
  assert.ok(!/<image\b/i.test(svg), "artwork embeds no raster image");
  assert.ok(read("components/about/TeamMemberCard.tsx").includes('"Illustration"'), "card shows a visible Illustration badge");
});
check("each person has exactly ONE full profile; Shiksha and Suvesh appear elsewhere only as cross-references", () => {
  const full = TEAM_SECTIONS.flatMap((s) => s.members);
  assert.equal(new Set(full).size, full.length, "duplicate full profile");
  assert.deepEqual([...full].sort(), Object.keys(TEAM_MEMBERS).sort());
  const refs = TEAM_SECTIONS.flatMap((s) => s.alsoSee.map((r) => [s.key, r.member]));
  assert.deepEqual(refs, [["astrology", "shiksha"], ["technology", "suvesh"]]);
  for (const [section, member] of refs) assert.notEqual(profileSectionOf(member), section);
});
check("titles and experience are exactly the owner-approved values", () => {
  const titles = Object.fromEntries(members.map(([k, m]) => [k, [m.title.en, m.experience?.en ?? null]]));
  assert.deepEqual(titles, {
    shiksha: ["CEO", "7+ years"],
    suvesh: ["CTO", null],
    abhinav: ["Senior Astrology Consultant", "15+ years"],
    mohini: ["Vedic Astrology & Vastu Expert", "10+ years"],
    vineet: ["Python & Data Engineering Specialist", null],
    sarita: ["Marketing & Industry Growth Expert", "10+ years in the astrology industry"],
  });
});
check("no invented credentials, unconfirmed titles, named brands, guarantees or report-authorship claims", () => {
  const text = JSON.stringify(TEAM_MEMBERS) + JSON.stringify(TEAM_SECTIONS) + page;
  for (const banned of [/certif/i, /award/i, /\bPh\.?D\b/i, /\bdegree\b/i, /Chief Astrology Advisor/i, /\bfounder\b/i, /co-?founder/i, /\bowner of\b|\bowns\b|संस्थापक|मालिक/i,
    /astro ?sage|astro ?talk|astroyogi|ganesha ?speaks|clickastro|anytime ?astro/i,
    /(astrologers?|experts?|team)[^.]{0,40}\b(write|writes|written|prepare|prepares|review|reviews|reviewed|check|checks)\b[^.]{0,30}report/i]) {
    assert.ok(!banned.test(text), `banned: ${banned}`);
  }
  for (const m of text.matchAll(/guarantee[a-z]*/gi)) {
    assert.ok(/not guaranteed outcomes/.test(text.slice(Math.max(0, m.index! - 20), m.index! + 30)), "only a negated guarantee is allowed");
  }
  assert.ok(page.includes("generated by our platform"), "report creation is described as the platform's, not an astrologer's");
});
check("every visible string has a Hindi version, and Hindi names are in Devanagari", () => {
  const walk = (v: unknown, at: string): void => {
    if (v && typeof v === "object") {
      const o = v as Record<string, unknown>;
      if ("en" in o && "hi" in o) {
        const l = o as Localized;
        assert.ok(l.en.trim() && l.hi.trim(), `${at}: empty translation`);
        return;
      }
      for (const [k, child] of Object.entries(o)) walk(child, `${at}.${k}`);
    }
  };
  walk(TEAM_MEMBERS, "TEAM_MEMBERS");
  walk(TEAM_SECTIONS, "TEAM_SECTIONS");
  for (const [k, m] of members) assert.ok(DEVANAGARI.test(m.name.hi) && DEVANAGARI.test(m.title.hi), k);
});
check("structured data: AboutPage -> existing Organization @id; Person.image only for real photos; stable @ids", () => {
  for (const locale of ["en", "hi"] as const) {
    const graph: any[] = (buildTeamPageSchema(locale, { name: "n", description: "d" }) as any)["@graph"];
    const about = graph.find((n) => n["@type"] === "AboutPage");
    assert.equal(about.url, teamPageUrl(locale));
    assert.deepEqual(about.about, { "@id": ORGANIZATION_ID });
    assert.ok(!graph.some((n) => n["@type"] === "Organization"), "no second Organization node");
    const people = graph.filter((n) => n["@type"] === "Person");
    assert.equal(people.length, members.length);
    for (const p of people) {
      const m = members.find(([, mm]) => p["@id"] === `https://www.jyotishasha.com${TEAM_PATH}#${mm.id}`)![1];
      assert.equal(p.name, m.name[locale]);
      assert.equal(p.jobTitle, m.title[locale]);
      if (m.image.kind === "photo") assert.equal(p.image, `https://www.jyotishasha.com${m.image.src}`);
      else assert.ok(!("image" in p), "illustration used as Person.image");
      for (const k of ["award", "alumniOf", "hasCredential", "honorificPrefix", "aggregateRating", "review"]) assert.ok(!(k in p));
    }
  }
  assert.ok(page.includes("serializeJsonLd(buildTeamPageSchema("), "rendered through the escaping serializer");
});
check("metadata: localized canonical + hreflang en/hi/x-default, indexable", () => {
  assert.equal(teamPageUrl("en"), "https://www.jyotishasha.com/about/our-team");
  assert.equal(teamPageUrl("hi"), "https://www.jyotishasha.com/hi/about/our-team");
  assert.ok(page.includes('languages: { en: pageUrl("en"), hi: pageUrl("hi"), "x-default": pageUrl("en") }'));
  assert.ok(!/noindex|index:\s*false/.test(page));
});
check("sitemap lists both locales once; footer links to the localized team page", () => {
  const sitemap = read("app/sitemap.ts");
  assert.equal((sitemap.match(/\$\{baseUrl\}\/about\/our-team`/g) || []).length, 1);
  assert.equal((sitemap.match(/\$\{baseUrl\}\/hi\/about\/our-team`/g) || []).length, 1);
  const footer = read("components/Footer.tsx");
  assert.ok(footer.includes("href={`${langPath}/about/our-team`}") && footer.includes('"हमारी टीम" : "Our Team"'));
});

console.log(`TOTAL: ${passed} passed, 0 failed`);
