/**
 * lib/marriedLifeLanding.test.ts
 *
 * P2 Married Life landing regression guard. Standalone, repo convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/marriedLifeLanding.test.ts
 *   node .ts-test-out/lib/marriedLifeLanding.test.js
 *
 * Funnel: married-life guide -> Marriage Report (primary card). Readers already facing difficulties
 * get a compact contextual Problem in Marriage Report card after the harmony/challenges section;
 * couples comparing two charts get the existing free /love calculator. Data is imported directly;
 * components and the topic file (path aliases) are checked as source text.
 */
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { marriedLifeLanding, marriageTopicLandings } from "./domains/marriage-astrology/_landing";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const topic = src("lib/domains/marriage-astrology/topics/married-life.ts");
const offer = marriedLifeLanding.offer;
const inline = marriedLifeLanding.inlineTool;

console.log("=== A. Primary report: Marriage Report ===");
const marriage = reportsData.find((r) => r.slug === "marriage_report");
check("landing registered for married-life", marriageTopicLandings["married-life"] === marriedLifeLanding);
check("primary card offers marriage_report (catalogue rep_004, price from the catalogue)",
  offer.reportSlug === "marriage_report" && marriage?.id === "rep_004" && typeof marriage.price === "number" && marriage.price > 0);
check("CTA label uses the {price} placeholder; no hard-coded price anywhere in the overlay",
  offer.ctaLabel.en.includes("{price}") && offer.ctaLabel.hi.includes("{price}") && !/₹\s*\d/.test(JSON.stringify(marriedLifeLanding)));
check("card is framed around married-life outlook (heading EN + HI)",
  offer.heading.en === "Your Married Life Outlook" && offer.heading.hi === "आपके वैवाहिक जीवन की संभावनाएँ");
const sold = JSON.stringify([offer.intro, offer.bullets, offer.heading, offer.eyebrow]);
check("card never claims Navamsa / D9 (the Marriage Report does not read it)", !/Navamsa|D9|नवांश/.test(sold));
check("bullets name only real report sections (outlook / 7th house, married-life dynamics, strengths & attention, planets + Dasha + guidance)",
  offer.bullets.en.length === 4 && /7th house and its lord/.test(offer.bullets.en[0]) && /^Married-life dynamics/.test(offer.bullets.en[1]) &&
  /Strengths and areas needing attention/.test(offer.bullets.en[2]) && /Dasha window and practical guidance/.test(offer.bullets.en[3]) &&
  offer.bullets.hi.length === 4);
check("no age / date / certainty promise in the card", !/\b(19|20)\d{2}\b|guarantee|will marry|पक्का|गारंटी/i.test(sold));
check("analytics ids follow the existing convention",
  offer.reportCtaId === "married_life_report_cta" && offer.sampleCtaId === "married_life_sample_report" && offer.screenName === "married_life_topic");

console.log("\n=== B. Secondary report: contextual Problem in Marriage card ===");
const problem = reportsData.find((r) => r.slug === "problem_in_marriage_report");
check("inline unit is a contextual-report card for problem_in_marriage_report (catalogue rep_018)",
  inline?.kind === "contextual-report" && inline.reportSlug === "problem_in_marriage_report" && problem?.id === "rep_018");
if (inline?.kind === "contextual-report") {
  check("placed after the harmony / challenges section (which exists on the topic)",
    inline.afterSectionId === "harmony-and-challenges" && topic.includes("id:       'harmony-and-challenges',"));
  const copy = JSON.stringify([inline.eyebrow, inline.heading, inline.body]);
  check("addressed to readers ALREADY facing difficulties (EN + HI)",
    inline.heading.en === "Already Facing Difficulties in Your Marriage?" && /पहले से कठिनाइयाँ/.test(inline.heading.hi));
  check("no fear / certainty language; states it does not predict separation",
    !/divorce|broken|doomed|fail|danger|warning|तलाक|खतरा/i.test(copy) && /does not predict separation/.test(inline.body.en) && /भविष्यवाणी नहीं करती/.test(inline.body.hi));
  check("CTA label uses the {price} placeholder", inline.ctaLabel.en.includes("{price}") && inline.ctaLabel.hi.includes("{price}"));
  check("analytics ids", inline.ctaId === "married_life_problem_report_cta" && inline.screenName === "married_life_topic");
}
const registry = src("components/authority-engine/landing/LandingInlineTool.tsx");
check("server registry resolves /reports/<slug> + catalogue price for the contextual card",
  registry.includes("case 'contextual-report'") && registry.includes("reportHref={`/reports/${tool.reportSlug}`} priceRupees={product.price}"));
const card = src("components/authority-engine/landing/ContextualReportCard.tsx");
check("contextual card is compact and secondary (no large panel / shadow / filled accent button) and tracks clicks",
  !/rounded-3xl|shadow-xl|bg-rose-600/.test(card) && card.includes("bg-white/10") && card.includes("WebsiteEvents.ctaClick(unit.ctaId, unit.screenName)"));
check("no bottom report CTA left on the topic (no duplicate / competing report card)", /\n {4}ctas: \[\],/.test(topic) && !/type: +'report'/.test(topic));

console.log("\n=== C. Short answer ===");
const da = marriedLifeLanding.directAnswer;
check("EN: not one planet or one yoga; 7th house + lord, 2nd/4th/8th/9th, Venus and Jupiter, Moon, Navamsa (D9), Dasha",
  /not judge a marriage from one planet or one yoga/.test(da.en) &&
  ["7th house and its lord", "2nd, 4th, 8th and 9th", "Venus and Jupiter", "Moon", "Navamsa (D9)", "Dasha"].every((w) => da.en.includes(w)));
check("EN: tendencies, not a verdict", /describes tendencies/.test(da.en) && /not a verdict/.test(da.en));
check("HI covers the same factors and limit",
  ["एक ग्रह या एक योग", "सप्तम भाव और सप्तमेश", "द्वितीय, चतुर्थ, अष्टम और नवम", "शुक्र और गुरु", "चंद्रमा", "नवांश (D9)", "दशा", "फैसला नहीं"].every((w) => da.hi.includes(w)));
check("short answer contains no sales copy", !/report|₹|price|buy|रिपोर्ट/i.test(da.en + da.hi));

console.log("\n=== D. Related links + compatibility path ===");
const ctx = marriedLifeLanding.contextLinks;
check("context links: compatibility / spouse-nature / divorce-possibility; overview marriage-prediction",
  JSON.stringify(ctx.topicSlugs) === '["compatibility","spouse-nature","divorce-possibility"]' && ctx.overviewSlug === "marriage-prediction");
check("every context link exists and is not the page itself",
  [...ctx.topicSlugs, ctx.overviewSlug].every((s) => s !== "married-life" && fs.existsSync(path.join(root, `lib/domains/marriage-astrology/topics/${s}.ts`))));
check("couples get the existing free Kundli Matching calculator (/love) as a cross-link, not a report",
  /domain: +'love',\s+slug: +'',/.test(topic) && topic.includes("label:    'Check Compatibility — Free Kundli Matching',") &&
  fs.existsSync(path.join(root, "app/[locale]/love/page.tsx")));
check("relationship_future_report is not offered on the page", !JSON.stringify(marriedLifeLanding).includes("relationship_future_report") && !topic.includes("relationship_future_report"));
check("ssrFaq + longForm on", marriedLifeLanding.ssrFaq === true && marriedLifeLanding.longForm === true);
check("lead video is the approved Short KyKc4_EjLoY; no inline copy (exactly one video)",
  marriedLifeLanding.video?.youtubeId === "KyKc4_EjLoY" && marriedLifeLanding.video.desktopCtaFirst === true && marriedLifeLanding.inlineVideo === undefined);

console.log("\n=== E. Page identity and content protected ===");
check("title / H1 unchanged (EN + HI)",
  topic.includes("title:      'Married Life in Vedic Astrology: A Complete Guide',") && topic.includes("title_hi:   'वैदिक ज्योतिष में वैवाहिक जीवन',"));
check("canonical path unchanged", topic.includes("canonicalPath: '/marriage-astrology/married-life',"));
check("EN meta unchanged", topic.includes("metaDescription: 'Explore how Vedic astrology assesses married life through the 7th house, Navamsa, and Dasha cycles — a guide to harmony, challenges, and karmic growth.',"));
const hiMeta = (topic.match(/metaDescription_hi: '([^']+)'/) || [, ""])[1] as string;
check("Hindi meta present and informational", hiMeta.length >= 80 && /वैवाहिक जीवन/.test(hiMeta) && /सप्तम भाव/.test(hiMeta) && !/रिपोर्ट|₹/.test(hiMeta));
const ids = [...topic.matchAll(/\n {8}id: {7}'([a-z0-9-]+)',/g)].map((m) => m[1]);
check("content sections unchanged (same 8 sections, same order)",
  JSON.stringify(ids) === '["introduction","key-house-analysis","planetary-analysis","advanced-tools","harmony-and-challenges","timing-and-stability","guidance-and-ethics","faqs"]');
check("house / planet / D9 depth kept",
  ["'The 7th House'", "'The 8th House'", "'Venus and Jupiter as Marital Karakas'", "'The 7th Lord'", "'Navamsa (D9)'", "'Darakaraka'", "'Upapada Lagna'"].every((w) => topic.includes(w)));

console.log("\n=== F. FAQ de-duplication ===");
const faqLabels = [...topic.matchAll(/\n {12}id: {7}'faq-\d+',\r?\n {12}label: {4}'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]);
check("FAQ count preserved (10) with ids faq-1..faq-10", faqLabels.length === 10 && (topic.match(/id: {7}'faq-\d+'/g) || []).length === 10);
check("Compatibility-duplicate and off-intent love/arranged questions removed",
  !topic.includes("Is compatibility analysis the same as predicting marriage success?") && !topic.includes("love or arranged marriage?"));
const rewritten = [
  "Can astrology predict what my married life will be like?",
  "Which factors in a kundli indicate a happy married life?",
  "Is married life read from my chart alone, or from both partners\\' charts?",
];
check("faq-1 / faq-8 / faq-10 rewritten as married-life questions", JSON.stringify([faqLabels[0], faqLabels[7], faqLabels[9]]) === JSON.stringify(rewritten));
check("Compatibility's 'predict the success of my marriage' question no longer duplicated here", !topic.includes("Can Vedic astrology predict the success of my marriage?"));
const others = fs.readdirSync(path.join(root, "lib/domains/marriage-astrology/topics")).filter((f) => f !== "married-life.ts")
  .map((f) => src(`lib/domains/marriage-astrology/topics/${f}`)).join("\n");
check("rewritten questions are unique across the marriage cluster", rewritten.every((q) => !others.includes(`'${q}'`)));
const faqPairs = [...topic.matchAll(/\n {12}label: {4}'((?:[^'\\]|\\.)*)',\r?\n {12}label_hi: [^\n]*\n {12}body: {5}'((?:[^'\\]|\\.)*)'/g)]
  .filter((m) => faqLabels.includes(m[1]));
check("no married-life FAQ repeats another topic's question AND answer",
  faqPairs.length === 10 && faqPairs.every((m) => !(others.includes(`'${m[1]}'`) && others.includes(m[2].slice(0, 80)))));

console.log("\n=== G. Hindi cleanup + wording ===");
check("no literal-translation markers left (ज्योतिषा / नेविगेट / नेविगेशन / संरेखण / संरेखित / अनुनाद / गतिशीलता / खिड़की / राजनयिक / पेश कर)",
  !/ज्योतिषा|नेविगेट|नेविगेशन|संरेखण|संरेखित|अनुनाद|गतिशीलता|खिड़की|राजनयिक|पेश कर/.test(topic));
check("no deterministic 'karmically destined' / 'conclusive insight' wording", !/karmically destined|conclusive insight/.test(topic));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
