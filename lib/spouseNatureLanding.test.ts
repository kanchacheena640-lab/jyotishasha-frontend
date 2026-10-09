/**
 * lib/spouseNatureLanding.test.ts
 *
 * Spouse Nature landing (MC-03 canary) regression guard. Standalone, repo
 * convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/spouseNatureLanding.test.ts
 *   node .ts-test-out/lib/spouseNatureLanding.test.js
 *
 * Data is imported directly; the topic file and engine sources (which use
 * path aliases) are checked as source text.
 */
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { getReportSampleUrl } from "./reportSamples";
import { spouseNatureLanding, marriageTopicLandings } from "./domains/marriage-astrology/_landing";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}

const here = __dirname;
// Walk up to the repo root (the compiled test lives under .ts-test-out/...).
let root = here;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

const offer = spouseNatureLanding.offer;
const topic = src("lib/domains/marriage-astrology/topics/spouse-nature.ts");
const offerText = (l: "en" | "hi") => [offer.eyebrow[l], offer.heading[l], offer.intro[l], offer.ctaLabel[l], offer.microcopy[l], ...offer.bullets[l]].join(" ");

console.log("=== A. Dedicated report product ===");
const product = reportsData.find((r) => r.slug === offer.reportSlug);
check("offer points at spouse_nature_report (rep_026)", offer.reportSlug === "spouse_nature_report" && product?.id === "rep_026");
check("price comes from reportsData (currently 51)", product?.price === 51);
check("CTA labels use the {price} placeholder (no hard-coded price)", offer.ctaLabel.en.includes("{price}") && offer.ctaLabel.hi.includes("{price}") && !/₹\s*\d/.test(offer.ctaLabel.en + offer.ctaLabel.hi));
check("card heading is the official product title (EN + HI)", offer.heading.en === product?.title.en && offer.heading.hi === product?.title.hi);
check("offer never promises identity, certainty, exact income, diagnosis or lifespan",
  !/guarantee|exact (income|date|person)|net worth|diagnos|lifespan|will marry|who you will marry|definitely|100%/i.test(offerText("en")) &&
  /does not identify a specific person/.test(offer.intro.en) && /पहचान नहीं बताती/.test(offer.intro.hi));
check("bullets stay within the report sample (nature, communication, 7th/D9/Darakaraka basis, health + financial tendencies)",
  offer.bullets.en.length === 4 && offer.bullets.hi.length === 4 &&
  /nature, temperament and personality/.test(offer.bullets.en[0]) && /Communication and emotional style/.test(offer.bullets.en[1]) &&
  /7th house, Navamsa \(D9\) and Darakaraka/.test(offer.bullets.en[2]) && /Health and financial tendencies/.test(offer.bullets.en[3]) &&
  /not certainties/.test(offer.bullets.en[3]));
check("no paid-report copy leaks into the short answer", !/report|₹|price|buy/i.test(spouseNatureLanding.directAnswer.en) && !/रिपोर्ट|₹/.test(spouseNatureLanding.directAnswer.hi));
check("analytics ids follow the existing convention",
  offer.reportCtaId === "spouse_nature_report_cta" && offer.sampleCtaId === "spouse_nature_sample_report" && offer.screenName === "spouse_nature_topic");
check("landing registered for spouse-nature", marriageTopicLandings["spouse-nature"] === spouseNatureLanding);

console.log("\n=== B. Sample report link ===");
for (const locale of ["en", "hi"]) {
  const url = getReportSampleUrl(offer.reportSlug, locale);
  check(`sample (${locale}) = ${url} exists in public/`, url === `/report-samples/spouse_nature_report_${locale}.pdf` && fs.existsSync(path.join(root, "public", url)));
}
check("sample title is the product title", offer.sampleTitle.en === "Spouse Nature Report" && offer.sampleTitle.hi === "जीवनसाथी स्वभाव रिपोर्ट");

console.log("\n=== C. Short answer ===");
const da = spouseNatureLanding.directAnswer;
check("EN short answer names the 7th house, its lord, Venus/Jupiter, Navamsa (D9) and Darakaraka",
  /7th house/.test(da.en) && /its lord/.test(da.en) && /Venus and Jupiter/.test(da.en) && /Navamsa \(D9\)/.test(da.en) && /Darakaraka/.test(da.en));
check("EN short answer is non-deterministic (tendencies, not a fixed person)", /likely tendencies/.test(da.en) && /not a fixed description/.test(da.en));
check("HI short answer covers the same factors and limit",
  /सप्तम भाव/.test(da.hi) && /सप्तमेश/.test(da.hi) && /शुक्र और गुरु/.test(da.hi) && /नवांश \(D9\)/.test(da.hi) && /दारकारक/.test(da.hi) && /संभावित प्रवृत्तियों/.test(da.hi) && /तय विवरण नहीं/.test(da.hi));
check("short answer is concise (EN <= 110 words)", da.en.trim().split(/\s+/).length <= 110);

console.log("\n=== D. Related questions ===");
const ctx = spouseNatureLanding.contextLinks;
check("context links: compatibility / married life / timing / arranged; overview = marriage-prediction",
  JSON.stringify(ctx.topicSlugs) === '["compatibility","married-life","marriage-timing","arranged-marriage"]' && ctx.overviewSlug === "marriage-prediction");
check("every context-link target topic exists and is not the page itself",
  [...ctx.topicSlugs, ctx.overviewSlug].every((slug) => slug !== "spouse-nature" && fs.existsSync(path.join(root, `lib/domains/marriage-astrology/topics/${slug}.ts`))));

console.log("\n=== E. Presentation flags ===");
check("ssrFaq on (FAQ answers + accordion bodies in server HTML)", spouseNatureLanding.ssrFaq === true);
check("longForm on (text-heavy page)", spouseNatureLanding.longForm === true);
check("lead video is the approved Short yl9kprGsEZg; no inline copy (exactly one video)",
  spouseNatureLanding.video?.youtubeId === "yl9kprGsEZg" && spouseNatureLanding.video.desktopCtaFirst === true && spouseNatureLanding.inlineVideo === undefined);

console.log("\n=== F. Existing page identity protected ===");
check("H1/title unchanged (EN)", topic.includes("title:      'Spouse Nature in Vedic Astrology: Houses & Planets',"));
check("H1/title unchanged (HI)", topic.includes("title_hi:   'वैदिक ज्योतिष में जीवनसाथी का स्वभाव',"));
check("EN meta description unchanged", topic.includes("metaDescription: 'Discover how Vedic astrology reveals your spouse\\'s nature through the 7th house, planetary karakas, Navamsa, and Darakaraka for clearer understanding.',"));
const hiMeta = (topic.match(/metaDescription_hi: '([^']+)'/) || [, ""])[1] as string;
check("Hindi meta description present, informational, no report/price/promise",
  hiMeta.length >= 80 && /जीवनसाथी के स्वभाव/.test(hiMeta) && !/रिपोर्ट|₹|गारंटी|निश्चित/.test(hiMeta));
const ids = [...topic.matchAll(/\n {8}id: {7}'([a-z0-9-]+)',/g)].map((m) => m[1]);
check("content sections unchanged (same 8 sections, same order)",
  JSON.stringify(ids) === '["introduction","primary-houses","planet-wise-analysis","key-indicators","astrological-combinations","improving-married-life","misconceptions-and-remedies","faqs"]');
check("all 10 FAQs kept", (topic.match(/id: {7}'faq-\d+'/g) || []).length === 10);
check("bottom CTAs unchanged: free marriage-path tool + broader marriage_report (dedicated report offered once, in the card)",
  /slug: {11}'marriage-path'/.test(topic) && /slug: {11}'marriage_report'/.test(topic) && !/slug: {11}'spouse_nature_report'/.test(topic));

console.log("\n=== G. Indexability protection ===");
check("dormant noindex fields left in place (not removed, not wired)",
  topic.includes("robots:          'noindex,follow'") && topic.includes("isIndexable:     false"));
check("adapter/seo never read robots / isIndexable",
  !/\.robots\b|isIndexable/.test(src("lib/domains/_shared/domain-topic-adapter.ts")) && !/\.robots\b|isIndexable/.test(src("lib/authority-engine/seo.ts")));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
