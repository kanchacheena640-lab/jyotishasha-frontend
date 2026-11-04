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
check("price comes from reportsData (currently 99)", product?.price === 99);
check("CTA labels use the {price} placeholder (no hard-coded price)", offer.ctaLabel.en.includes("{price}") && offer.ctaLabel.hi.includes("{price}") && !/₹\s*\d/.test(offer.ctaLabel.en + offer.ctaLabel.hi));
check("card heading is the official product title (EN + HI)", offer.heading.en === product?.title.en && offer.heading.hi === product?.title.hi);
check("offer never promises identity, certainty, exact income, diagnosis or lifespan",
  !/guarantee|exact (income|date|person)|net worth|diagnos|lifespan|will marry|who you will marry|definitely|100%/i.test(offerText("en")) &&
  /describes the temperament, communication style and tendencies it shows for your spouse/.test(offer.intro.en) &&
  /स्वभाव, बातचीत की शैली और प्रवृत्तियों/.test(offer.intro.hi) && !/does not|नहीं/.test(offer.intro.en + offer.intro.hi));
check("the identity question is answered once, in FAQ 1 (EN + HI)",
  topic.includes("label:    'Can Vedic astrology tell me exactly who I will marry?',") && /body: {5}'No\. Vedic astrology indicates tendencies/.test(topic) && /body_hi: {2}'नहीं। वैदिक ज्योतिष प्रवृत्तियों/.test(topic));
check("bullets stay within the report sample (nature, communication, 7th/D9/Darakaraka basis, health + financial tendencies)",
  offer.bullets.en.length === 4 && offer.bullets.hi.length === 4 &&
  /nature, temperament and personality/.test(offer.bullets.en[0]) && /Communication and emotional style/.test(offer.bullets.en[1]) &&
  /7th house, Navamsa \(D9\) and Darakaraka/.test(offer.bullets.en[2]) && /health and financial tendencies/.test(offer.bullets.en[3]) &&
  offer.bullets.en[3] === "Your spouse's likely health and financial tendencies" && offer.bullets.hi[3] === "जीवनसाथी की संभावित स्वास्थ्य और आर्थिक प्रवृत्तियाँ");
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
check("EN short answer: likely temperament / communication / relationship style, stated positively (Editorial V1)",
  /describe the likely temperament, communication and relationship style of your future spouse/.test(da.en) && !/does not|not a fixed/.test(da.en));
check("HI short answer covers the same factors, stated positively",
  /सप्तम भाव/.test(da.hi) && /सप्तमेश/.test(da.hi) && /शुक्र और गुरु/.test(da.hi) && /नवांश \(D9\)/.test(da.hi) && /दारकारक/.test(da.hi) && /भावी जीवनसाथी के संभावित स्वभाव/.test(da.hi) && !/तय नहीं|तय विवरण नहीं/.test(da.hi));
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
check("editorial template on (Editorial V1)", spouseNatureLanding.theme === "editorial");
check("video is the approved Short yl9kprGsEZg, inside the article after the opening section; no inline copy (exactly one video)",
  spouseNatureLanding.video?.youtubeId === "yl9kprGsEZg" && spouseNatureLanding.video.articleSectionId === "introduction" &&
  spouseNatureLanding.video.desktopCtaFirst === undefined && spouseNatureLanding.inlineVideo === undefined);
check("free Spouse Lagna tool leads the editorial hero (before the report card)",
  spouseNatureLanding.inlineTool?.kind === "spouse-lagna" && spouseNatureLanding.inlineTool.editorialHero === true &&
  src("components/authority-engine/editorial/EditorialArticle.tsx").includes("{heroTool ?? toolLedAction ?? (tool && (") &&
  src("components/authority-engine/editorial/EditorialArticle.tsx").indexOf("{heroTool ?? toolLedAction ?? (tool && (") < src("components/authority-engine/editorial/EditorialArticle.tsx").indexOf("{offer && <EditorialReportCard"));

console.log("\n=== F. Existing page identity protected ===");
check("H1/title = approved question-led Editorial V1 title (EN)", topic.includes("title:      'Spouse Nature in Vedic Astrology: What Will My Future Spouse Be Like?',"));
check("H1/title = approved question-led Editorial V1 title (HI)", topic.includes("title_hi:   'वैदिक ज्योतिष में जीवनसाथी का स्वभाव: मेरा जीवनसाथी कैसा होगा?',"));
check("EN meta description = approved Editorial V1 text", topic.includes("metaDescription: 'What will your future spouse be like? See how Vedic astrology reads a spouse\\'s nature in a kundli — the 7th house and its lord, Venus and Jupiter, Navamsa (D9) and Darakaraka.',"));
check("subtitle rewritten without overclaiming (EN + HI)",
  topic.includes("subtext:     'How a kundli describes your future spouse") && topic.includes("subtext_hi:  'कुंडली आपके भावी जीवनसाथी के स्वभाव") &&
  !/profound insights|गहरी अंतर्दृष्टि|profound system/.test(topic));
check("opening section heading is descriptive (not 'Introduction')",
  topic.includes("title:    'What Spouse Nature Means in a Birth Chart',") && topic.includes("title_hi: 'कुंडली में जीवनसाथी के स्वभाव का अर्थ',"));
check("gendered karaka cards qualified once (EN + HI)",
  (topic.match(/Modern readings examine both Venus and Jupiter in every chart\./g) || []).length === 1 &&
  (topic.match(/आधुनिक विश्लेषण में हर कुंडली में शुक्र और गुरु दोनों देखे जाते हैं।/g) || []).length === 1);
check("Article schema dates: datePublished 2026-07-20, lastUpdated 2026-11-04",
  topic.includes("datePublished: '2026-07-20',") && topic.includes("lastUpdated:    '2026-11-04',"));
check("no appearance / profession / family-background predictions in the new page copy",
  !/appearance|looks like|profession|career|family background|रूप-रंग|पेशा|करियर/i.test(
    [spouseNatureLanding.directAnswer.en, spouseNatureLanding.directAnswer.hi, offerText("en"), offerText("hi")].join(" ")));
const hiMeta = (topic.match(/metaDescription_hi: '([^']+)'/) || [, ""])[1] as string;
check("Hindi meta description present, informational, no report/price/promise",
  hiMeta.length >= 80 && /जीवनसाथी के स्वभाव/.test(hiMeta) && !/रिपोर्ट|₹|गारंटी|निश्चित/.test(hiMeta));
const ids = [...topic.matchAll(/\n {8}id: {7}'([a-z0-9-]+)',/g)].map((m) => m[1]);
check("content sections unchanged (same 8 sections, same order)",
  JSON.stringify(ids) === '["introduction","primary-houses","planet-wise-analysis","key-indicators","astrological-combinations","improving-married-life","misconceptions-and-remedies","faqs"]');
check("all 10 FAQs kept", (topic.match(/id: {7}'faq-\d+'/g) || []).length === 10);
check("topic CTA data kept (marriage-path + marriage_report); the editorial template renders neither on this page",
  /slug: {11}'marriage-path'/.test(topic) && /slug: {11}'marriage_report'/.test(topic) && !/slug: {11}'spouse_nature_report'/.test(topic));

console.log("\n=== G. Indexability protection ===");
check("dormant noindex fields left in place (not removed, not wired)",
  topic.includes("robots:          'noindex,follow'") && topic.includes("isIndexable:     false"));
check("adapter/seo never read robots / isIndexable",
  !/\.robots\b|isIndexable/.test(src("lib/domains/_shared/domain-topic-adapter.ts")) && !/\.robots\b|isIndexable/.test(src("lib/authority-engine/seo.ts")));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
