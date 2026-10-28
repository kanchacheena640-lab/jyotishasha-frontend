/** F10-P15 -- Organization identity markup and sitewide rating hygiene.
 * Proves every Organization value is already published on the site, that
 * unverified fields (legalName, logo) and self-serving ratings are absent,
 * that the homepage renders exactly one Organization node, and that no
 * hard-coded aggregateRating remains anywhere (the /free-kundali 4.9 is gone).
 * Compile with tsc alongside the other lib/*.test.ts files; run with Node from the repo root.
 */
import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";
import { buildOrganizationSchema, ORGANIZATION_ID } from "./seo/organizationSchema";

let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}
const read = (f: string) => fs.readFileSync(path.join(process.cwd(), f), "utf8");
const org: any = buildOrganizationSchema();

check("Organization: brand name, canonical URL, stable @id", () => {
  assert.equal(org["@type"], "Organization");
  assert.equal(org.name, "Jyotishasha");
  assert.equal(org.url, "https://www.jyotishasha.com");
  assert.equal(org["@id"], ORGANIZATION_ID);
});
check("unverified fields are NOT published: no legalName, no logo, no ratings/reviews", () => {
  for (const key of ["legalName", "logo", "aggregateRating", "review", "taxID", "vatID", "identifier", "foundingDate"]) {
    assert.ok(!(key in org), `${key} must be absent until verified`);
  }
});
check("contact email and phone are exactly what Terms and Privacy already publish", () => {
  const legal = read("app/terms/page.tsx") + read("app/privacy-policy/page.tsx");
  assert.ok(legal.includes(org.email) && legal.includes("+91 9118877495"));
  assert.equal(org.telephone.replace(/\D/g, ""), "919118877495");
  assert.equal(org.contactPoint.email, org.email);
  assert.equal(org.contactPoint.telephone, org.telephone);
});
check("address is only the visibly published 'Lucknow, India, Pin 226010' (no invented street/region/CIN/GST)", () => {
  const footer = read("components/Footer.tsx");
  assert.ok(footer.includes("226010") && footer.includes("Lucknow") && footer.includes("India"));
  assert.deepEqual(Object.keys(org.address).sort(), ["@type", "addressCountry", "addressLocality", "postalCode"].sort());
  assert.equal(org.address.postalCode, "226010");
});
check("sameAs = exactly the social profiles the site's footer links to", () => {
  const footer = read("components/Footer.tsx");
  for (const url of org.sameAs) assert.ok(footer.includes(`href="${url}"`), url);
});
check("homepage renders the Organization node exactly once", () => {
  const home = read("app/[locale]/page.tsx");
  assert.equal((home.match(/buildOrganizationSchema\(\)/g) || []).length, 1);
  assert.ok(home.includes('type="application/ld+json"'));
});
check("no other standalone Organization node with conflicting identity exists", () => {
  const files: string[] = [];
  (function walk(dir: string) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { if (!["node_modules", ".next", ".ts-test-out"].includes(e.name)) walk(p); }
      else if (/\.(tsx?|jsx?)$/.test(e.name) && !e.name.includes(".test.")) files.push(p);
    }
  })(path.join(process.cwd(), "app"));
  const conflicts = files.filter((f) => /legalName|Spiritual Lifestyle Company"|"Jyotishasha Private Limited"/.test(fs.readFileSync(f, "utf8")) && /application\/ld\+json/.test(fs.readFileSync(f, "utf8")));
  assert.deepEqual(conflicts, []);
});
check("/free-kundali no longer publishes the hard-coded 4.9 aggregateRating", () => {
  const src = read("app/[locale]/free-kundali/layout.tsx");
  assert.ok(!/"aggregateRating"\s*:|ratingValue|ratingCount/.test(src));
});
check("no hard-coded rating markup anywhere in app/components (only the review-driven helper)", () => {
  const hits: string[] = [];
  for (const root of ["app", "components"]) {
    (function walk(dir: string) {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p);
        else if (/\.(tsx?|jsx?)$/.test(e.name) && /"?ratingValue"?\s*:\s*["']?\d/.test(fs.readFileSync(p, "utf8"))) hits.push(p);
      }
    })(path.join(process.cwd(), root));
  }
  assert.deepEqual(hits, []);
});
console.log(`TOTAL: ${passed} passed, 0 failed`);
