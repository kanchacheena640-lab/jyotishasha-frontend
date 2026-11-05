/**
 * lib/secondMarriageLanding.test.ts
 *
 * P5 Second Marriage landing regression guard. Standalone, repo convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/secondMarriageLanding.test.ts
 *   node .ts-test-out/lib/secondMarriageLanding.test.js
 *
 * Funnel: second-marriage guide -> dedicated Second Marriage Report (primary card; claims only what the
 * report reads) -> article -> FAQ -> related questions. The free Marriage Path tool stays a secondary,
 * honestly-worded bottom action. Data is imported directly; the topic file is checked as source text.
 */
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { getReportSampleUrl } from "./reportSamples";
import { secondMarriageLanding, marriageTopicLandings } from "./domains/marriage-astrology/_landing";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const topic = src("lib/domains/marriage-astrology/topics/second-marriage.ts");
const landing = secondMarriageLanding;
const offer = landing.offer;

console.log("=== A. Primary: the dedicated Second Marriage Report ===");
const product = reportsData.find((r) => r.slug === "second_marriage_report");
check("landing registered for second-marriage", marriageTopicLandings["second-marriage"] === landing);
check("report-led: offer = second_marriage_report (catalogue rep_022, price from the catalogue)",
  offer.reportSlug === "second_marriage_report" && product?.id === "rep_022" && typeof product.price === "number" && product.price > 0);
const action = landing.primaryAction;
check("editorial hero: tracked free Marriage Path card (new id only) before the report card",
  landing.theme === "editorial" && action?.href === "/tools/marriage-path" && action.ctaId === "second_marriage_marriage_path_cta" &&
  action.screenName === "second_marriage_topic" &&
  src("components/authority-engine/editorial/EditorialArticle.tsx").indexOf("{heroTool ?? freeToolAction ?? (tool && (") <
  src("components/authority-engine/editorial/EditorialArticle.tsx").indexOf("{offer && <EditorialReportCard"));
check("free card claims only what the tool reads and points to the report for the 9th house; free, no price, no D9 / Dasha / date",
  !!action && ["7th house", "Venus and Jupiter", "strongest influence"].every((w) => action.body.en.includes(w)) &&
  /adds the 9th house and later-union indications/.test(action.microcopy.en) && /नवम भाव और बाद के विवाह के संकेत/.test(action.microcopy.hi) &&
  /Free/.test(action.ctaLabel.en) && !/₹|Navamsa|D9|Dasha|date|divorce|तलाक/i.test(JSON.stringify(action)));
check("purchase route exists (/reports/[slug])", fs.existsSync(path.join(root, "app/reports/[slug]/page.tsx")));
for (const loc of ["en", "hi"] as const) {
  const url = getReportSampleUrl(offer.reportSlug, loc);
  check(`sample PDF exists (${loc}): ${url}`, fs.existsSync(path.join(root, "public", url)));
}
check("heading + CTA wording (EN + HI), catalogue price via {price}",
  offer.heading.en === "Explore Your Second-Marriage Indications" && offer.ctaLabel.en === "Get Second Marriage Report – ₹{price}" &&
  offer.ctaLabel.hi === "दूसरे विवाह की रिपोर्ट प्राप्त करें – ₹{price}" && !/₹\s*\d/.test(JSON.stringify(landing)));
check("bullets name only what the report reads (L/M/E indication, 7th + 9th houses, Venus/Jupiter, Dasha context, guidance)",
  offer.bullets.en.length === 4 && /Low, Moderate or Elevated/.test(offer.bullets.en[0]) && /7th and 9th houses/.test(offer.bullets.en[1]) &&
  /Venus and Jupiter/.test(offer.bullets.en[2]) && /Dasha context and practical guidance/.test(offer.bullets.en[3]) && offer.bullets.hi.length === 4);
const sold = JSON.stringify([offer.eyebrow, offer.heading, offer.intro, offer.bullets]);
check("no unsupported claims: D9 / Navamsa / transit / exact date / age / guarantee",
  !/Navamsa|D9|नवांश|transit|गोचर|exact date|marriage age|will (re)?marry|guarantee|गारंटी/i.test(sold) &&
  offer.intro.en === "A personalised reading of later-union indications in your own chart — the supportive and challenging factors, and the periods when they are emphasised.");
check("never assumes the reader is divorced or separated", !/divorce|separat|after your|तलाक|अलगाव/i.test(sold));
check("standard microcopy (EN + HI); the exact-date question is answered once, in FAQ 8",
  offer.microcopy.en === "Personalised using your Date, Time & Place of Birth." && offer.microcopy.hi === "आपकी जन्म तिथि, समय और स्थान के आधार पर तैयार।" &&
  /id: 'faq-8', label: 'Can astrology predict the exact date of a second marriage\?',[^\n]*body: 'No\./.test(topic));
check("catalogue rep_022: key / ID / price / route unchanged; descriptions no longer assume a prior divorce or separation",
  product?.slug === "second_marriage_report" && product.price === 99 && product.title.en === "Second Marriage Report" &&
  product.title.hi === "दूसरे विवाह की रिपोर्ट" && offer.sampleTitle.hi === product.title.hi &&
  /second marriage or significant later union/.test(product.fullDescription.en) && /दूसरे विवाह या जीवन में आगे/.test(product.fullDescription.hi) &&
  !/separation|divorce|तलाक|अलगाव/i.test(JSON.stringify([product.description, product.fullDescription])));
check("analytics ids", offer.reportCtaId === "second_marriage_report_cta" && offer.sampleCtaId === "second_marriage_sample_report" && offer.screenName === "second_marriage_topic");

console.log("\n=== B. Secondary: free tool, honestly worded; no duplicate report CTA ===");
check("bottom block: only the free Marriage Path tool, labelled as general indicators and not a second-marriage calculator",
  topic.includes("label:          'Explore Your General Marriage Indicators',") && topic.includes("It is not a second-marriage calculator.") &&
  !/type: +'report'/.test(topic) && !/Second Marriage Probability|Will Marry Again|Second Marriage Date/i.test(topic));
check("no contextual/inline report card (the top card is the single paid CTA)", landing.inlineTool === undefined);

console.log("\n=== C. Short answer ===");
const da = landing.directAnswer;
check("EN names the article's factors (7th house + lord, 9th, 2nd, Venus and Jupiter, Dasha, Navamsa D9)",
  ["7th house and its lord", "9th", "2nd", "Venus and Jupiter", "Dasha periods", "Navamsa (D9)"].every((w) => da.en.includes(w)));
check("EN (Editorial V1): positive reading, relationship safeguard said once, no divorce/separation prediction",
  /a second marriage is read from several factors together/.test(da.en) &&
  /Together they show how strongly a chart indicates a later union and when it may be emphasised\./.test(da.en) &&
  (da.en.match(/do not mean a present relationship must end/g) || []).length === 1 && !/divorce|separat|guarantee/i.test(da.en));
check("HI covers the same factors and the same single safeguard",
  ["सप्तम भाव और सप्तमेश", "नवम भाव", "द्वितीय भाव", "शुक्र और गुरु", "दशाएँ", "नवांश (D9)", "किसी वर्तमान संबंध को समाप्त होना चाहिए"].every((w) => da.hi.includes(w)) &&
  !/तलाक|अलगाव|गारंटी/.test(da.hi));
check("short answer contains no sales copy", !/report|₹|price|buy|रिपोर्ट/i.test(da.en + da.hi));

console.log("\n=== D. Related links ===");
const ctx = landing.contextLinks;
check("context links: divorce-possibility / married-life; overview marriage-prediction",
  JSON.stringify(ctx.topicSlugs) === '["divorce-possibility","married-life"]' && ctx.overviewSlug === "marriage-prediction");
check("every context link exists and is not the page itself",
  [...ctx.topicSlugs, ctx.overviewSlug].every((s) => s !== "second-marriage" && fs.existsSync(path.join(root, `lib/domains/marriage-astrology/topics/${s}.ts`))));
check("ssrFaq + longForm on, no video", landing.ssrFaq === true && landing.longForm === true && landing.video === undefined);

console.log("\n=== E. Identity / shared text protected ===");
check("title / H1 = approved question-led Editorial V1 title (EN + HI)",
  topic.includes("title:      'Second Marriage in Vedic Astrology: Is It Indicated in My Horoscope?',") &&
  topic.includes("title_hi:   'वैदिक ज्योतिष में दूसरा विवाह: क्या मेरी कुंडली में दूसरे विवाह का योग है?',"));
check("canonical unchanged; EN meta = approved Editorial V1 text",
  topic.includes("canonicalPath: '/marriage-astrology/second-marriage',") &&
  topic.includes("metaDescription: 'Is a second marriage indicated in your horoscope? See how Vedic astrology reads later-union yogas — the 7th and 9th houses, Venus and Jupiter, the running Dasha and the Navamsa (D9).',"));
check("hero subtext = approved Editorial V1 text (EN + HI), no 'karmic promise' / 'कार्मिक वादा'",
  topic.includes("subtext:     'How a horoscope is read for a second or later marriage — the 7th and 9th houses, Venus and Jupiter, the running Dasha and the Navamsa (D9).',") &&
  topic.includes("subtext_hi:  'कुंडली में दूसरे या बाद के विवाह के योग कैसे पढ़े जाते हैं — सप्तम और नवम भाव, शुक्र और गुरु, चल रही दशा और नवांश (D9)।',") &&
  !/कार्मिक वादा|karmic promise, planetary conditions/.test(topic));
check("Article schema dates: datePublished 2026-07-20, lastUpdated 2026-11-05",
  topic.includes("datePublished: '2026-07-20',") && topic.includes("lastUpdated:    '2026-11-05',"));
check("neutral wording: Rahu / Saturn / Venus / 'specific indication' / Summary (EN + HI)",
  /Rahu, the planet of intensity and unconventionality/.test(topic) && /with a more mature and committed nature/.test(topic) &&
  /it is traditionally read as suggesting the potential for more than one significant partnership/.test(topic) &&
  /A second marriage is read as a specific indication in the chart\./.test(topic) &&
  /Vedic astrology reads a second marriage as a theme in the chart, shaped together with real-life circumstances and decisions\./.test(topic) &&
  /राहु तीव्रता और अपरंपरागतता का ग्रह है/.test(topic) && /अधिक परिपक्व और प्रतिबद्ध स्वभाव का हो/.test(topic) &&
  !/planet of obsession|universal right|restrictive nature|mere matter of choice|सार्वभौमिक अधिकार/.test(topic));
const hiMeta = (topic.match(/metaDescription_hi: '([^']+)'/) || [, ""])[1] as string;
check("Hindi meta: leads with the Hub question, informational, no report/price, no guarantee refrain",
  hiMeta.length >= 80 && hiMeta.startsWith("क्या मेरी कुंडली में दूसरे विवाह का योग है?") && /पुनर्विवाह के योग/.test(hiMeta) &&
  !/रिपोर्ट|₹|गारंटी/.test(hiMeta));
const ids = [...topic.matchAll(/\n {8}id: {5}'([a-z0-9-]+)',/g)].map((m) => m[1]);
check("sections unchanged in number and order",
  JSON.stringify(ids) === '["promise-vs-possibility","key-house-analysis","planetary-influences","advanced-indicators","timing-dashas-transits","separation-divorce","ethical-interpretation","common-misconceptions","practical-remedies","summary","faq-section"]');

console.log("\n=== F. Content: rules and calibration ===");
check("empty-house rule stated (sign + lord still describe the marriage)", /an empty house is never irrelevant/.test(topic) && /खाली भाव कभी महत्वहीन नहीं होता/.test(topic));
check("9th vs 2nd presented as approaches, not a universal rule", /Not every tradition uses the 9th house in the same way/.test(topic) && /Other approaches give more weight to the 9th house/.test(topic) && /not a universal rule/.test(topic));
check("second-marriage indications do not presuppose divorce (section + FAQ)",
  /do not predict a divorce and are not a reason to leave a present relationship/.test(topic) && /Can second-marriage indications appear without a prior divorce\?/.test(topic));
for (const [label, re] of [
  ["no 'destined to conclude' / 'is destined'", /destined/],
  ["no 'ultimate arbiter' / 'must corroborate'", /ultimate arbiter|must corroborate/],
  ["no 'paramount when analyzing the dissolution'", /paramount/],
  ["no 'usually manifests' / 'frequently the catalyst'", /usually manifests|frequently the catalyst/],
  ["no 'must clearly indicate the dissolution of the first'", /must clearly indicate the dissolution/],
  ["no 'functionally dead' marriage FAQ", /functionally dead/],
  ["no 'Absolutely.' / 'widely accepted principle' certainty", /Absolutely\.|widely accepted principle/],
  ["no 'leads to the dissolution' / 'strongly indicate the manifestation'", /leads to the dissolution|strongly indicate the manifestation/],
] as [string, RegExp][]) check(label, !re.test(topic));

console.log("\n=== G. FAQ ===");
const faqLabels = [...topic.matchAll(/\{ id: 'faq-\d+', label: '((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]);
check("FAQ count preserved (10)", faqLabels.length === 10);
check("divorce-intent and legal-grey questions replaced (8th-house dissolution, 'never officially ended')",
  !topic.includes("Why does the 8th house matter so much in marital dissolution?") && !topic.includes("Can a second marriage happen if the first one never officially ended?"));
const rewritten = ["Can remedies change a second-marriage indication?", "Can second-marriage indications appear without a prior divorce?", "Can astrology predict the exact date of a second marriage?"];
check("faq-6 / faq-7 / faq-8 are the reframed questions", JSON.stringify([faqLabels[5], faqLabels[6], faqLabels[7]]) === JSON.stringify(rewritten));
const others = fs.readdirSync(path.join(root, "lib/domains/marriage-astrology/topics")).filter((f) => f !== "second-marriage.ts")
  .map((f) => src(`lib/domains/marriage-astrology/topics/${f}`)).join("\n");
check("reframed questions are unique across the marriage cluster", rewritten.every((q) => !others.includes(`'${q}'`)));

console.log("\n=== H. Hindi cleanup (body text; the shared hero subtext and keywords are untouched) ===");
const body = topic.slice(topic.indexOf("contentBlocks:"));
check("no literal-translation markers left in the content (वादा / सीट / मिसाल / कष्ट / चालक / दोहरे संकेत / पहलू प्राप्त / ट्रिगर / उत्प्रेरक / मृत / 2वें / घर)",
  !/वादा|वादे|सीट|मिसाल|कष्ट|चालक|दोहरे संकेत|पहलू प्राप्त|ट्रिगर|उत्प्रेरक|मृत|2वें|घर/.test(body));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
