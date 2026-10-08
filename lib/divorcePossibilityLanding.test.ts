/**
 * lib/divorcePossibilityLanding.test.ts
 *
 * P6 Divorce Possibility landing regression guard. Standalone, repo convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/divorcePossibilityLanding.test.ts
 *   node .ts-test-out/lib/divorcePossibilityLanding.test.js
 *
 * Funnel: divorce-possibility guide -> dedicated Divorce Possibility Report (primary card; claims only what
 * the report reads; scope limit visible on phones) -> article -> contextual Problem in Marriage card for
 * readers already in difficulty -> FAQ -> related questions. Data is imported directly; the topic file is
 * checked as source text.
 */
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { getReportSampleUrl } from "./reportSamples";
import { divorcePossibilityLanding, marriageTopicLandings } from "./domains/marriage-astrology/_landing";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const topic = src("lib/domains/marriage-astrology/topics/divorce-possibility.ts");
const landing = divorcePossibilityLanding;
const offer = landing.offer;
const inline = landing.inlineTool;
const SENSATIONAL = /will you get divorced|written in your chart|divorce date|will fail|guaranteed|partner will leave|तलाक निश्चित|विवाह टूटेगा|छोड़ देगा/i;

console.log("=== A. Primary: the dedicated Divorce Possibility Report ===");
const product = reportsData.find((r) => r.slug === "divorce_possibility_report");
check("landing registered for divorce-possibility", marriageTopicLandings["divorce-possibility"] === landing);
check("report-led: offer = divorce_possibility_report (catalogue rep_023, price from the catalogue), no primary tool card",
  offer.reportSlug === "divorce_possibility_report" && product?.id === "rep_023" && typeof product.price === "number" && product.price > 0 && landing.primaryAction === undefined);
check("purchase route exists (/reports/[slug])", fs.existsSync(path.join(root, "app/reports/[slug]/page.tsx")));
for (const loc of ["en", "hi"] as const) {
  const url = getReportSampleUrl(offer.reportSlug, loc);
  check(`sample PDF exists (${loc}): ${url}`, fs.existsSync(path.join(root, "public", url)));
}
check("heading + CTA wording (EN + HI), catalogue price via {price}",
  offer.heading.en === "Understand Your Marriage Stability Indicators" && offer.ctaLabel.en === "Explore Divorce Possibility Report – ₹{price}" &&
  offer.ctaLabel.hi === "तलाक की संभावना रिपोर्ट देखें – ₹{price}" && !/₹\s*\d/.test(JSON.stringify(landing)));
check("bullets name only what the report reads (L/M/E signal, 7th foundation + 6th/8th, Dasha + protective factors, guidance + remedies)",
  offer.bullets.en.length === 4 && /Low, Moderate or Elevated/.test(offer.bullets.en[0]) && /7th-house foundation, with the 6th and 8th houses/.test(offer.bullets.en[1]) &&
  /Dasha period and the protective factors/.test(offer.bullets.en[2]) && /Communication guidance and restrained/.test(offer.bullets.en[3]) && offer.bullets.hi.length === 4);
const sold = JSON.stringify([offer.eyebrow, offer.heading, offer.intro, offer.bullets]);
check("no unsupported claims: D9 / Navamsa / transit / 12th house / date / legal verdict", !/Navamsa|D9|नवांश|transit|गोचर|12th|द्वादश|date|तारीख|court|अदालत/i.test(sold));
check("no sensational / fear wording anywhere in the overlay", !SENSATIONAL.test(JSON.stringify(landing)));
check("mobile-visible microcopy carries the scope limit (the intro is hidden on phones) — EN + HI",
  /Shows tendencies and protective factors — not a certain divorce, a date or a legal outcome\./.test(offer.microcopy.en) &&
  /निश्चित तलाक, तारीख या कानूनी परिणाम नहीं/.test(offer.microcopy.hi));
check("sample title = catalogue title (EN + HI)", offer.sampleTitle.en === product?.title.en && offer.sampleTitle.hi === product?.title.hi);
check("analytics ids", offer.reportCtaId === "divorce_possibility_report_cta" && offer.sampleCtaId === "divorce_possibility_sample_report" && offer.screenName === "divorce_possibility_topic");

console.log("\n=== B. Secondary: Problem in Marriage Report, contextual only ===");
const problem = reportsData.find((r) => r.slug === "problem_in_marriage_report");
check("inline unit is a contextual-report card for problem_in_marriage_report (catalogue rep_018)",
  inline?.kind === "contextual-report" && inline.reportSlug === "problem_in_marriage_report" && problem?.id === "rep_018");
if (inline?.kind === "contextual-report") {
  check("placed after the timing / communication section (which exists on the topic)",
    inline.afterSectionId === "timing-and-factors" && topic.includes("id:       'timing-and-factors',") && topic.includes("id:       'emotional-communication',"));
  check("framed for readers already facing difficulty; does not predict separation (EN + HI)",
    inline.heading.en === "Facing Difficulties in Your Marriage?" && /does not predict separation/.test(inline.body.en) && /भविष्यवाणी नहीं करता/.test(inline.body.hi));
  check("analytics ids", inline.ctaId === "divorce_problem_in_marriage_report_cta" && inline.screenName === "divorce_possibility_topic");
}
check("no bottom report CTA (no duplicate paid card)", /\n {4}ctas: \[\],/.test(topic) && !/type: +'report'/.test(topic));

console.log("\n=== C. Short answer ===");
const da = landing.directAnswer;
check("EN: several factors, not one planet/house (7th + lord, 6th/8th/12th, Venus/Jupiter, Mars/Saturn/Rahu/Ketu, Dasha, D9, protective combinations)",
  /not from one planet or one house/.test(da.en) &&
  ["7th house and its lord", "6th, 8th and 12th houses", "Venus and Jupiter", "Mars, Saturn, Rahu and Ketu", "Dasha", "Navamsa (D9)", "protective combinations"].every((w) => da.en.includes(w)));
check("EN: no guarantee; choices / communication / legal realities are separate",
  /A difficult combination does not guarantee divorce/.test(da.en) && /legal realities are separate/.test(da.en));
check("HI covers the same factors and limits",
  ["सप्तम भाव और सप्तमेश", "षष्ठ, अष्टम और द्वादश", "शुक्र और गुरु", "राहु और केतु", "दशा", "नवांश (D9)", "सुरक्षात्मक योग", "गारंटी नहीं", "कानूनी वास्तविकताएँ"].every((w) => da.hi.includes(w)));
check("short answer contains no sales copy", !/report|₹|price|buy|रिपोर्ट/i.test(da.en + da.hi));

console.log("\n=== D. Related links ===");
const ctx = landing.contextLinks;
check("context links: second-marriage / married-life; overview marriage-prediction",
  JSON.stringify(ctx.topicSlugs) === '["second-marriage","married-life"]' && ctx.overviewSlug === "marriage-prediction");
check("every context link exists and is not the page itself",
  [...ctx.topicSlugs, ctx.overviewSlug].every((s) => s !== "divorce-possibility" && fs.existsSync(path.join(root, `lib/domains/marriage-astrology/topics/${s}.ts`))));
check("ssrFaq + longForm on, no video", landing.ssrFaq === true && landing.longForm === true && landing.video === undefined);

console.log("\n=== E. Identity / shared text protected ===");
check("title / H1 unchanged (EN + HI)",
  topic.includes("title:      'Divorce Possibility in Vedic Astrology: A Guide',") && topic.includes("title_hi:   'वैदिक ज्योतिष में तलाक की संभावना',"));
check("canonical + EN meta unchanged",
  topic.includes("canonicalPath: '/marriage-astrology/divorce-possibility',") &&
  topic.includes("metaDescription: 'Learn how Vedic astrology identifies divorce possibility through the 7th house, Navamsa, and Dasha cycles — a guide to karmic patterns and marital resilience.',"));
check("hero subtext: EN unchanged; HI 'नेविगेट' replaced with natural Hindi (shown on other pages' related-topic cards)",
  topic.includes("subtext:     'Vedic astrology approaches divorce possibility not as a fixed fate but as a karmic probability") &&
  topic.includes("subtext_hi:  'वैदिक ज्योतिष तलाक की संभावना को एक निश्चित भाग्य के रूप में नहीं बल्कि एक कार्मिक संभावना के रूप में देखता है — संभावित टकराव और समय-समय पर आने वाली चुनौतियों का एक नक्शा, जिन्हें परिपक्वता, सचेत प्रयास और गहरी आत्म-समझ से संभाला जा सकता है।',") &&
  !/नेविगेट/.test(topic));
check("catalogue rep_023: key / ID / price / EN title / category unchanged; HI title corrected; EN description no transit claim",
  product?.slug === "divorce_possibility_report" && product.price === 51 && product.title.en === "Divorce Possibility Report" &&
  product.title.hi === "तलाक की संभावना रिपोर्ट" && product.category.en === "Self" && !/transit/i.test(product.fullDescription.en) &&
  /Dasha context/.test(product.fullDescription.en));
const rep018 = reportsData.find((r) => r.id === "rep_018");
check("catalogue rep_018: Hindi spelling 'वैवाहिक' (not 'विवाहिक') in its description", /वैवाहिक जीवन में कलह/.test(rep018?.description.hi ?? "") && !/विवाहिक/.test(JSON.stringify(rep018)));
const hiMeta = (topic.match(/metaDescription_hi: '([^']+)'/) || [, ""])[1] as string;
check("Hindi meta present, informational, non-sensational", hiMeta.length >= 80 && /तलाक के योग/.test(hiMeta) && /विवाह की स्थिरता/.test(hiMeta) && !/रिपोर्ट|₹/.test(hiMeta) && !SENSATIONAL.test(hiMeta));
const ids = [...topic.matchAll(/\n {8}id: {7}'([a-z0-9-]+)',/g)].map((m) => m[1]);
check("sections unchanged in number and order",
  JSON.stringify(ids) === '["introduction","key-house-analysis","planetary-influences","advanced-tools","yogas-and-protection","timing-and-factors","remedies-ethics-summary","faqs"]');

console.log("\n=== F. Calibration, empty-house rule and safety ===");
check("empty-house rule stated for the 7th house (EN + HI)", /an empty 7th house is never unreadable/.test(topic) && /खाली सप्तम भाव/.test(topic));
for (const [label, re] of [
  ["no 'universally protective'", /universally protective/],
  ["no 'conclusive insight' / 'indispensable tool'", /conclusive insight|indispensable/],
  ["no 'most decisive single indicator'", /most decisive single indicator/],
  ["no 'high potential for the dissolution' without qualification", /indicating high potential for the dissolution/],
  ["no 'rarely lead to complete marital breakdown'", /rarely lead to complete marital breakdown/],
  ["no 'reconciliation is always a possibility'", /reconciliation is always a possibility/],
  ["no 'powerful triggers for marital events' / 'likely to surface repeatedly'", /powerful triggers for marital events|likely to surface repeatedly/],
  ["no 'resolve constructively rather than through separation' (separation is not framed as failure)", /rather than through separation/],
] as [string, RegExp][]) check(label, !re.test(topic));
check("safety + autonomy: never used to keep anyone in an unsafe or abusive relationship (ethics + FAQ)",
  /never to keep anyone in an unsafe or abusive relationship/.test(topic) && /A chart is never a reason to stay in a relationship that is unsafe/.test(topic));
check("remedies are not a substitute for counselling, legal or safety support (section + FAQ)",
  /not a substitute for counselling, legal advice or safety support/.test(topic) && /They are not a substitute for counselling, legal or safety support\./.test(topic));
check("reconciliation framed as the partners' own choice and only when safe",
  /whether to reconcile remains the partners’ own decision/.test(topic) && /when both partners want it and it is safe/.test(topic));
check("astrology cannot determine a legal outcome (FAQ)", /cannot decide whether a separation is final or what a court will decide/.test(topic));

console.log("\n=== G. FAQ ===");
const faqLabels = [...topic.matchAll(/\n {12}id: {7}'faq-\d+',\r?\n {12}label: {4}'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]);
check("FAQ count preserved (10)", faqLabels.length === 10);
check("abstract 'stability analysis vs predicting the future' FAQ replaced by stress-vs-legal-divorce",
  !topic.includes("Is stability analysis the same as predicting the future?") && faqLabels[9] === "What is the difference between marital stress and a legal divorce?");
const others = fs.readdirSync(path.join(root, "lib/domains/marriage-astrology/topics")).filter((f) => f !== "divorce-possibility.ts")
  .map((f) => src(`lib/domains/marriage-astrology/topics/${f}`)).join("\n");
check("replacement question is unique across the marriage cluster", !others.includes("'What is the difference between marital stress and a legal divorce?'"));

console.log("\n=== H. Hindi cleanup (content; the shared hero subtext is untouched) ===");
const body = topic.slice(topic.indexOf("contentBlocks:"));
check("no literal-translation markers left in the content (ज्योतिषा / नेविगेट / नेविगेशन / संरेखित / गतिशीलता / ट्रिगर / विमशोत्तरी / वादा / स्नैपशॉट / निर्विरोध)",
  !/ज्योतिषा|नेविगेट|नेविगेशन|संरेखित|गतिशीलता|ट्रिगर|विमशोत्तरी|वादा|वादे|स्नैपशॉट|निर्विरोध/.test(body));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
