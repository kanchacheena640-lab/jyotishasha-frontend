/**
 * lib/marriagePredictionLanding.test.ts
 *
 * P7 Marriage Prediction landing regression guard. Standalone, repo convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/marriagePredictionLanding.test.ts
 *   node .ts-test-out/lib/marriagePredictionLanding.test.js
 *
 * Funnel: marriage-prediction guide (broad entry page) -> Marriage Report (primary card; claims only what
 * the report reads; scope limit visible on phones) -> article -> FAQ -> specialised cluster pages. The free
 * Marriage Path tool is a secondary, honestly-worded bottom action. Data is imported directly; the topic
 * file is checked as source text.
 */
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { getReportSampleUrl } from "./reportSamples";
import { marriagePredictionLanding, marriageTopicLandings } from "./domains/marriage-astrology/_landing";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const topic = src("lib/domains/marriage-astrology/topics/marriage-prediction.ts");
const landing = marriagePredictionLanding;
const offer = landing.offer;

console.log("=== A. Primary: the broad Marriage Report ===");
const product = reportsData.find((r) => r.slug === "marriage_report");
check("landing registered for marriage-prediction", marriageTopicLandings["marriage-prediction"] === landing);
check("report-led: offer = marriage_report (catalogue rep_004, price from the catalogue), no primary tool card",
  offer.reportSlug === "marriage_report" && product?.id === "rep_004" && typeof product.price === "number" && product.price > 0 && landing.primaryAction === undefined);
check("purchase route exists (/reports/[slug])", fs.existsSync(path.join(root, "app/reports/[slug]/page.tsx")));
for (const loc of ["en", "hi"] as const) {
  const url = getReportSampleUrl(offer.reportSlug, loc);
  check(`sample PDF exists (${loc}): ${url}`, fs.existsSync(path.join(root, "public", url)));
}
check("heading + CTA wording (EN + HI), catalogue price via {price}",
  offer.heading.en === "Explore Your Personal Marriage Prospects" && offer.ctaLabel.en === "Get Personal Marriage Report – ₹{price}" &&
  offer.ctaLabel.hi === "व्यक्तिगत विवाह रिपोर्ट प्राप्त करें – ₹{price}" && !/₹\s*\d/.test(JSON.stringify(landing)));
check("bullets name only real report sections (7th house + lord, Venus/Jupiter/Mars/Saturn/Rahu, Dasha window, married-life dynamics + guidance)",
  offer.bullets.en.length === 4 && /7th house and its lord/.test(offer.bullets.en[0]) && /Venus, Jupiter, Mars, Saturn and Rahu/.test(offer.bullets.en[1]) &&
  /Dasha window and comparatively supportive periods/.test(offer.bullets.en[2]) && /Married-life dynamics/.test(offer.bullets.en[3]) && offer.bullets.hi.length === 4);
const sold = JSON.stringify([offer.eyebrow, offer.heading, offer.intro, offer.bullets]);
check("no unsupported claims: D9 / Navamsa / transit / Manglik / exact date or age / Muhurat / love-vs-arranged / spouse traits",
  !/Navamsa|D9|नवांश|transit|गोचर|Manglik|मांगलिक|exact|सटीक|Muhurat|मुहूर्त|love|arranged|प्रेम विवाह|अरेंज|spouse|जीवनसाथी/i.test(sold));
check("mobile-visible microcopy carries the scope limit (the intro is hidden on phones) — EN + HI",
  /Shows indications and possible supportive periods — not a guaranteed marriage date or exact age\./.test(offer.microcopy.en) &&
  /विवाह की निश्चित तारीख या सटीक उम्र नहीं/.test(offer.microcopy.hi));
check("sample title = catalogue title (EN + HI)", offer.sampleTitle.en === product?.title.en && offer.sampleTitle.hi === product?.title.hi);
check("catalogue rep_004: key / ID / price / category / titles unchanged; full description is a single-chart outlook (no compatibility claim, EN + HI)",
  product?.slug === "marriage_report" && product.price === 51 && product.category.en === "Marriage" && product.title.en === "Marriage Report" &&
  product.fullDescription.en === "Explore your marriage outlook, supportive Dasha periods and married-life dynamics through a personalized birth-chart reading." &&
  !/compatibility/i.test(product.fullDescription.en) && !/अनुकूलता/.test(product.fullDescription.hi) && /सहायक दशा अवधियाँ/.test(product.fullDescription.hi));
check("unused topic fields corrected without deterministic / promotional wording (metaTitle 40–60, headline 40–90 chars)",
  /metaTitle: +'Marriage Prediction in Vedic Astrology: Houses & Dasha',/.test(topic) &&
  /headline: +'Marriage Prediction in Vedic Astrology: Reading Your Chart',/.test(topic) &&
  !/Accurate Marriage Prediction|Decoding Your Destiny|अपनी नियति/.test(topic));
check("analytics ids", offer.reportCtaId === "marriage_prediction_report_cta" && offer.sampleCtaId === "marriage_prediction_sample_report" && offer.screenName === "marriage_prediction_topic");

console.log("\n=== B. Secondary: free Marriage Path, honestly worded; no duplicate report CTA ===");
check("bottom tool CTA: 'Explore Your Marriage Indicators', names only what the tool reads, says it does not predict an exact date",
  topic.includes("label:          'Explore Your Marriage Indicators',") && /It does not predict an exact wedding date\./.test(topic) &&
  /the planets in your 7th house, Venus and Jupiter, and the strongest influence/.test(topic) && !topic.includes("Check Your Marriage Path"));
check("no bottom report CTA and no inline report card (single paid CTA)", !/type: +'report'/.test(topic) && landing.inlineTool === undefined);
check("tool is never sold as a full prediction / timing calculator",
  !/marriage prediction calculator|timing calculator|know when you will marry|exact marriage age/i.test(topic + JSON.stringify(landing)));

console.log("\n=== C. Short answer ===");
const da = landing.directAnswer;
check("EN names the article's factors (7th house + lord, Venus and Jupiter, Darakaraka, Saturn/Mars/Rahu, Navamsa D9, Dasha)",
  /does not predict marriage from one placement/.test(da.en) &&
  ["7th house and its lord", "Venus and Jupiter", "Darakaraka", "Saturn, Mars and Rahu", "Navamsa (D9)", "Dasha periods"].every((w) => da.en.includes(w)));
check("EN: no single placement guarantees marriage or an exact date; Dasha = supportive periods, not wedding dates",
  /No single placement guarantees marriage or fixes an exact date/.test(da.en) && /not certain wedding dates/.test(da.en));
check("HI covers the same factors and limits",
  ["सप्तम भाव और सप्तमेश", "शुक्र और गुरु", "दारकारक", "शनि, मंगल व राहु", "नवांश (D9)", "दशाएँ", "गारंटी नहीं", "निश्चित विवाह-तिथि नहीं"].every((w) => da.hi.includes(w)));
check("short answer contains no sales copy", !/report|₹|price|buy|रिपोर्ट/i.test(da.en + da.hi));

console.log("\n=== D. Cluster navigation ===");
const ctx = landing.contextLinks;
check("contextual links to specialised pages (timing, delay, love, arranged, spouse nature) + compatibility as the two-chart step",
  JSON.stringify(ctx.topicSlugs) === '["marriage-timing","delayed-marriage","love-marriage","arranged-marriage","spouse-nature"]' && ctx.overviewSlug === "compatibility");
check("every link exists and is not the page itself",
  [...ctx.topicSlugs, ctx.overviewSlug].every((s) => s !== "marriage-prediction" && fs.existsSync(path.join(root, `lib/domains/marriage-astrology/topics/${s}.ts`))));
check("detailed timing is handed to Marriage Timing (FAQ + context link)", /Detailed timing methods are covered in the Marriage Timing guide\./.test(topic) && ctx.topicSlugs.includes("marriage-timing"));
check("ssrFaq + longForm on, no video", landing.ssrFaq === true && landing.longForm === true && landing.video === undefined);

console.log("\n=== E. Identity / shared text protected ===");
check("title / H1 unchanged (EN + HI)",
  topic.includes("title:      'Marriage Prediction in Vedic Astrology',") && topic.includes("title_hi:   'वैदिक ज्योतिष में विवाह भविष्यवाणी',"));
check("canonical + EN meta unchanged",
  topic.includes("canonicalPath: '/marriage-astrology/marriage-prediction',") &&
  topic.includes("metaDescription: 'Seeking marriage prediction? Explore how Vedic astrology analyzes the 7th house, Venus, Jupiter, and Navamsa to provide insights into marriage timing and compatibility.',"));
check("hero subtext (EN + HI) unchanged — it is shown on other pages' related-topic cards",
  topic.includes("subtext:     'Discover insights into your potential marriage timing, compatibility, and life partner characteristics through the timeless wisdom of Vedic astrology.',") &&
  topic.includes("subtext_hi:  'वैदिक ज्योतिष के कालातीत ज्ञान के माध्यम से अपने संभावित विवाह समय, अनुकूलता और जीवनसाथी की विशेषताओं के बारे में अंतर्दृष्टि प्राप्त करें।',"));
const hiMeta = (topic.match(/metaDescription_hi: '([^']+)'/) || [, ""])[1] as string;
check("Hindi meta present and informational", hiMeta.length >= 80 && /विवाह की भविष्यवाणी/.test(hiMeta) && /सप्तमेश/.test(hiMeta) && !/रिपोर्ट|₹/.test(hiMeta));
const blocks = topic.slice(topic.indexOf("contentBlocks:"), topic.indexOf("\n    ctas: ["));
const ids = [...blocks.matchAll(/\n {8}id: {7}'([a-z0-9-]+)',/g)].map((m) => m[1]);
check("sections unchanged in number and order",
  JSON.stringify(ids) === '["intro","key-pillars","yogas-factors","timing-analysis","misconceptions","faqs"]');

console.log("\n=== F. Calibration + empty-house rule ===");
check("empty-house rule stated (pillar + FAQ, EN + HI)",
  /an empty 7th house does not mean no marriage/.test(topic) && /An empty 7th house does not mean no marriage\./.test(topic) && /खाली सप्तम भाव का अर्थ विवाह न होना नहीं है/.test(topic));
for (const [label, re] of [
  ["no 'most reliable' / 'most reliably' / 'universally reliable'", /most reliabl|universally reliable/],
  ["no 'ultimate validator' / 'indispensable'", /ultimate validator|indispensable/],
  ["no 'the Transit is what converts potential into event'", /converts potential into event/],
  ["no 'at its peak' timing claim", /at its peak/],
  ["no 'strength, placement, and aspects determine quality'", /aspects determine quality/],
] as [string, RegExp][]) check(label, !re.test(topic));

console.log("\n=== G. FAQ ===");
const faqLabels = [...topic.matchAll(/\n {12}id: {7}'faq-[a-z-]+',\r?\n {12}label: {4}'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]);
check("FAQ count preserved (8)", faqLabels.length === 8);
check("off-intent 'How do I choose the right astrologer?' replaced by the empty-7th-house question",
  !topic.includes("How do I choose the right astrologer?") && faqLabels.includes("What if my 7th house is empty?"));
const others = fs.readdirSync(path.join(root, "lib/domains/marriage-astrology/topics")).filter((f) => f !== "marriage-prediction.ts")
  .map((f) => src(`lib/domains/marriage-astrology/topics/${f}`)).join("\n");
check("replacement question is unique across the marriage cluster", !others.includes("'What if my 7th house is empty?'"));
check("exact-date FAQ answers 'Not to an exact date'", /body: +'Not to an exact date\./.test(topic));

console.log("\n=== H. Hindi cleanup (content; the shared hero subtext is untouched) ===");
const body = topic.slice(topic.indexOf("contentBlocks:"));
check("no literal / wrong translations left (संरेखण / एन्कोड / पुरातात्विक / अनुनाद / प्रक्षेपपथ / नेविगेट / खिड़की / अंतिम सत्यापनकर्ता / मान्य कर / कर्मिक / व्यवस्थित विवाह / नक्षत्र (लाहिड़ी))",
  !/संरेखण|एन्कोड|पुरातात्विक|अनुनाद|प्रक्षेपपथ|नेविगेट|खिड़की|अंतिम सत्यापनकर्ता|मान्य कर|कर्मिक|व्यवस्थित विवाह|व्यवस्थित-आधारित|नक्षत्र \(लाहिड़ी\)/.test(body));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
