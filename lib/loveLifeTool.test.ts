/**
 * Love Life page and result (/tools/love-life, EN + HI): server rendering, FAQ/schema parity, copy that claims only
 * what services/love_life.py computes (5th/7th signs and occupants; Venus/Moon supportive unless debilitated;
 * Saturn/Ketu in 5th/7th and Sun/Mars in 7th to watch -- no Dasha, compatibility, timing, D9 or lords), links that
 * resolve, localised points, empty-state handling and the single tracked report CTA. Source-level, no network.
 * Run: node_modules/.bin/tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule \
 *        --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/loveLifeTool.test.ts && node <compiled loveLifeTool.test.js>
 */
import * as fs from "fs";
import * as path from "path";
import { loveLifeContent } from "../app/data/toolContent/loveLife";
import { reportsData } from "../app/data/reportsData";
import { getReportProductPath } from "./reportProductSeo";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

const page = src("app/[locale]/tools/[toolId]/page.tsx");
const landing = src("components/tools/love-life/LoveLifeLanding.tsx");
const result = src("components/tools/love-life/LoveLifeResult.tsx");
const cta = src("components/tools/love-life/LoveLifeReportCta.tsx");
const trs = src("components/ToolResultSection.tsx");
const sugg = src("components/ToolSuggestions.tsx");
const parse = src("utils/parseToolResponse.ts");
const toolsData = src("app/data/toolsData.ts");

console.log("=== A. Rendering and SEO ===");
check("server-rendered landing for love-life; canonical/hreflang generator unchanged",
  !/^['"]use client['"]/m.test(landing) && page.includes('if (params.toolId === "love-life") {') && page.includes("<LoveLifeLanding locale={lang} />") &&
  page.includes("hi: `${SITE_URL}/hi/tools/${params.toolId}`") && page.includes("canonical: `https://www.jyotishasha.com/${lang === 'hi' ? 'hi/' : ''}tools/${params.toolId}`"));
check("H1 and intro before the calculator island; H1 has no brand or pipe; positioned as 5th & 7th house analysis",
  landing.indexOf("<h1") > 0 && landing.indexOf("<h1") < landing.indexOf("<ToolDynamicPage submitLabel") &&
  !/[|]/.test(loveLifeContent.en.landing.h1 + loveLifeContent.hi.landing.h1) &&
  loveLifeContent.en.landing.h1.includes("5th & 7th House") && loveLifeContent.en.seo.title.includes("5th & 7th House") && loveLifeContent.hi.seo.title.includes("पंचम और सप्तम"));
check("7 visible FAQs per language, same array as FAQPage; Hindi marked; no rating",
  loveLifeContent.en.faq.length === 7 && loveLifeContent.hi.faq.length === 7 &&
  landing.includes("c.faq.map((f) => (") && landing.includes("mainEntity: c.faq.map(") && landing.includes("lang={isHi ? 'hi' : undefined}") && !/aggregateRating/.test(landing));
check("broken Shorts video removed from this page", !/youtube|<iframe/.test(landing) && !("video" in loveLifeContent.en) && !("video" in loveLifeContent.hi));

console.log("\n=== B. Copy claims only what the calculator computes ===");
for (const locale of ["en", "hi"] as const) {
  const c = loveLifeContent[locale];
  const all = JSON.stringify(c);
  const checks = c.landing.sections.find((s) => s.id === "ll-checks")!.body.join(" ");
  if (locale === "en") {
    check("EN: no claims of Dasha/timing/compatibility analysis, lords, D9 analysis or guaranteed outcomes",
      !/(?<!not )(analyse|analyze)s? (your )?(dasha|navamsa)|lord of the (5th|7th)|5th lord|7th lord|when you will|perfect match|guarantee|will definitely|Positive Points|Negative Points/i.test(all) &&
      /does not analyse Dasha periods, the Navamsa \(D9\) chart or a partner's chart/.test(checks));
    check("EN: method lists exactly the backend rules (Venus/Moon; debilitation; Saturn/Ketu 5th/7th; Sun/Mars 7th)",
      /Venus or the Moon/.test(checks) && /Venus in Virgo, the Moon in Scorpio/.test(checks) && /Saturn or Ketu in the 5th or 7th house, and the Sun or Mars in the 7th/.test(checks) &&
      !/Rahu|Jupiter/.test(checks));
  } else {
    check("HI: no compatibility/timing promise; explicit non-analysis sentence; same rules",
      /यह दशाओं, नवमांश \(D9\) कुंडली या साथी की कुंडली का विश्लेषण नहीं करता/.test(checks) && /कन्या में शुक्र, वृश्चिक में चंद्र/.test(checks) &&
      /शनि या केतु/.test(checks) && /सूर्य या मंगल/.test(checks) && !/राहु|गुरु/.test(checks) && !/निश्चित रूप से|गारंटी/.test(all));
  }
}
check("tool card and result title no longer claim compatibility or timing",
  !/Love Life & Compatibility|प्रेम जीवन और अनुकूलता/.test(parse) && !/timing of significant relationship developments/.test(toolsData) &&
  parse.includes('"Love Life: 5th & 7th House Analysis"'));

console.log("\n=== C. Links resolve to real routes ===");
const hrefs = [
  ...loveLifeContent.en.landing.related.links.map((l) => l.href),
  ...loveLifeContent.en.landing.sections.flatMap((s) => ("links" in s && s.links ? s.links.map((l) => l.href) : [])),
  "/tools/marriage-path", "/marriage-astrology/love-marriage", "/marriage-astrology",
];
const exists = (href: string) => {
  if (href === "/kundli-matching") return fs.existsSync(path.join(root, "app/[locale]/kundli-matching/page.tsx"));
  if (href === "/marriage-astrology") return fs.existsSync(path.join(root, "lib/domains/marriage-astrology/_hub.ts"));
  if (href.startsWith("/marriage-astrology/")) return fs.existsSync(path.join(root, `lib/domains/marriage-astrology/topics/${href.split("/").pop()}.ts`));
  if (href.startsWith("/tools/")) return toolsData.includes(`slug: "${href.split("/").pop()}"`);
  return false;
};
const bad = hrefs.filter((h) => !exists(h));
check(`every content and next-step link points at an existing route (${hrefs.length} links)`, hrefs.length >= 10 && bad.length === 0);
bad.forEach((b) => console.log("     missing:", b));
check("EN and HI link to the same routes", JSON.stringify(loveLifeContent.en.landing.related.links.map((l) => l.href)) === JSON.stringify(loveLifeContent.hi.landing.related.links.map((l) => l.href)));

console.log("\n=== D. Result ===");
check("points shown in the page language (point[locale]), never hard-coded .en",
  result.includes("p?.[locale] || p?.en") && !/point\.en\b/.test(result) && !/kundaliData\.love_life\.(positive_points|negative_points|verdict|cta)/.test(trs));
check("empty point lists never render a heading; no-rule note shown with the facts",
  result.includes("{positives.length > 0 && (") && result.includes("{negatives.length > 0 && (") && result.includes('data-testid="ll-no-rule"') &&
  result.includes("const noRule = positives.length === 0 && negatives.length === 0;"));
check("5th/7th facts are optional (older backend still renders) and localised",
  /fifth_sign\?: string/.test(result) && /seventh_house_planets\?: string\[\]/.test(result) && result.includes("signName(data.fifth_sign, isHi)") && result.includes("planetName(p, isHi)"));
check("result mounted via LoveLifeResult with the page locale; editorial chart column",
  trs.includes("<LoveLifeResult data={kundaliData.love_life} locale={ctaLocale} />") && trs.includes("result.toolId === 'love-life';") && trs.includes("'xl:grid-cols-3'"));
check("backend verdict/cta strings are not rendered (no universal remedy line)", !/\.verdict|\.cta\b/.test(result));

console.log("\n=== E. Report CTA and suggestions ===");
const rep = reportsData.find((r) => r.slug === "love_relationship_report");
check("love_relationship_report exists in the catalogue with a price", Boolean(rep) && typeof rep!.price === "number" && rep!.price > 0);
check("exactly one tracked CTA: catalogue price, product-path helper, fixed analytics ids",
  (cta.match(/<Link/g) || []).length === 1 && cta.includes("getReportProductPath(report.slug, locale)") && cta.includes("₹${report.price}") &&
  !/₹\s?\d/.test(cta) && cta.includes("ctaId: 'tools_love-life_report_cta', screenName: 'tools_love-life'") &&
  (result.match(/<LoveLifeReportCta/g) || []).length === 1 && !/\/reports\//.test(result));
check("product path resolves for both locales", /love/.test(getReportProductPath("love_relationship_report", "en")) && getReportProductPath("love_relationship_report", "hi").length > 0);
const llSugg = (sugg.match(/'love-life': \[[\s\S]*?\],/) || [""])[0];
check("Love Life suggestions: relationship-related free tools, no report, no Sade Sati",
  llSugg.includes("/kundli-matching") && llSugg.includes("/tools/marriage-path") && !/\/reports\/|sade-sati/i.test(llSugg));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
