/**
 * lib/arrangedMarriageLanding.test.ts
 *
 * Arranged Marriage landing (AM-2) regression guard. Standalone, repo
 * convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/arrangedMarriageLanding.test.ts
 *   node .ts-test-out/lib/arrangedMarriageLanding.test.js
 *
 * Data is imported directly; components/pages and the topic file (which use
 * path aliases) are checked as source text.
 */
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { getReportSampleUrl } from "./reportSamples";
import { arrangedMarriageLanding, marriageTopicLandings } from "./domains/marriage-astrology/_landing";

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

const offer = arrangedMarriageLanding.offer;
const topic = src("lib/domains/marriage-astrology/topics/arranged-marriage.ts");
const renderer = src("components/authority-engine/AuthorityDetailRenderer.tsx");
const block = (id: string) => {
  const start = topic.indexOf(`id:       '${id}'`);
  if (start < 0) return "";
  // Next section start (the topic file may use CRLF line endings).
  const next = topic.slice(start + 1).search(/\r?\n {6}\{\r?\n {8}id:/);
  return topic.slice(start, next < 0 ? topic.indexOf("ctas: [") : start + 1 + next);
};
const countItems = (b: string) => (b.match(/\n\s{10}\{\r?\n\s{12}id:/g) || []).length;

console.log("=== A. Report product: general marriage reading only ===");
const product = reportsData.find((r) => r.slug === offer.reportSlug);
check("offer points at the existing marriage_report product", offer.reportSlug === "marriage_report" && !!product);
check("product price comes from reportsData (currently 51)", product?.price === 51);
check("CTA labels use the {price} placeholder, never a hardcoded amount",
  offer.ctaLabel.en.includes("{price}") && offer.ctaLabel.hi.includes("{price}") && !/₹\s*\d/.test(offer.ctaLabel.en + offer.ctaLabel.hi));
check("landing is registered for the arranged-marriage slug", marriageTopicLandings["arranged-marriage"] === arrangedMarriageLanding);
const offerEn = [offer.eyebrow.en, offer.heading.en, offer.ctaLabel.en, ...offer.bullets.en].join(" ");
check("card is framed as a personalised marriage reading", offer.heading.en === "Personalised Marriage Reading");
check("card never claims an arranged / love-vs-arranged verdict or a guarantee",
  !/arranged|love|verdict|guarantee|find out whether/i.test(offerEn));
check("card intro states the report does not label the marriage love or arranged",
  /does not label your marriage as love or arranged/.test(offer.intro.en) && /लव या अरेंज घोषित नहीं करती/.test(offer.intro.hi));
check("bullets cover only sample-proven sections (7th house/lord, planets, Dasha window, guidance)",
  offer.bullets.en.length === 4 && offer.bullets.hi.length === 4 &&
  /7th house and its lord/.test(offer.bullets.en[0]) && /planetary influences/.test(offer.bullets.en[1]) &&
  /Dasha window and supportive periods/.test(offer.bullets.en[2]) && /practical guidance/.test(offer.bullets.en[3]));
check("analytics ids follow the existing convention",
  offer.reportCtaId === "arranged_marriage_report_cta" && offer.sampleCtaId === "arranged_marriage_sample_report" && offer.screenName === "arranged_marriage_topic");

console.log("\n=== B. Sample report (EN + HI) ===");
for (const loc of ["en", "hi"] as const) {
  const url = getReportSampleUrl(offer.reportSlug, loc);
  check(`sample URL (${loc}) = ${url}`, url === `/report-samples/marriage_report_${loc}.pdf`);
  check(`sample PDF exists on disk (${loc})`, fs.existsSync(path.join(root, "public", url)));
}

console.log("\n=== C. No video ===");
check("config has no video and no sample-hook lead", arrangedMarriageLanding.video === undefined && offer.sampleHookLead === undefined);
check("no YouTube id / play event in the config", !/youtube|playFeatureName|video_play/i.test(JSON.stringify(arrangedMarriageLanding)));

console.log("\n=== D. SSR accordions: opt-in only ===");
check("renderer sends accordion sections to StaticFaqSection only when ssrFaq is on",
  renderer.includes("ssrFaq && (section.layout === 'faq' || section.layout === 'accordion')"));
check("renderer keeps SectionRouter (client accordion) as the default path", renderer.includes("<SectionRouter section={section} locale={locale} />"));
check("AccordionSection itself is untouched (still client-only, body only when open)",
  src("components/authority-engine/sections/AccordionSection.tsx").includes("{isOpen && item.body && ("));
check("arranged landing opts in (ssrFaq)", arrangedMarriageLanding.ssrFaq === true);
check("long-form reading rhythm: arranged opts in; marriage-timing / love-marriage do not",
  arrangedMarriageLanding.longForm === true &&
  !marriageTopicLandings["marriage-timing"].longForm && !marriageTopicLandings["love-marriage"].longForm);
check("renderer adds the .longform class only when the flag is set (unchanged markup otherwise)",
  renderer.includes("${longForm ? ` ${landingStyles.longform}` : ''}") &&
  src("app/[locale]/marriage-astrology/[slug]/page.tsx").includes("longForm: landing.longForm,"));
const landingCss = src("components/authority-engine/landing/landing.module.css");
check("long-form CSS is scoped under .longform and leaves content untouched (no hiding / content rules)",
  /\.longform :global\(section\.mb-10\)/.test(landingCss) &&
  !/\.longform[^{]*\{[^}]*(display:\s*none|content:|visibility:\s*hidden)/.test(landingCss));
check("other marriage topics with accordions have no landing config (spouse-nature opted in at MC-03, compatibility at P1, married-life at P2)",
  ["intercaste-marriage", "divorce-possibility", "second-marriage"]
    .every((slug) => marriageTopicLandings[slug] === undefined));
check("Marriage Timing / Love Marriage topics have no accordion sections (unaffected by the opt-in)",
  !/layout:\s*'accordion'/.test(src("lib/domains/marriage-astrology/topics/marriage-timing.ts")) &&
  !/layout:\s*'accordion'/.test(src("lib/domains/marriage-astrology/topics/love-marriage.ts")));

console.log("\n=== E. Copy: direct answer + topic content ===");
const da = arrangedMarriageLanding.directAnswer.en;
check("direct answer present EN/HI", da.length > 300 && arrangedMarriageLanding.directAnswer.hi.length > 300);
check("direct answer: no single placement + 7th/2nd/9th/11th + Jupiter/Venus + Navamsa + Dasha",
  /No single placement/.test(da) && /7th house/.test(da) && /2nd house/.test(da) && /9th house/.test(da) &&
  /11th house/.test(da) && /Jupiter and Venus/.test(da) && /Navamsa/.test(da) && /Dasha/.test(da));
check("direct answer: personal choice and family circumstances matter", /Personal choice, family circumstances/.test(da));
check("direct answer avoids absolute words", !/guarantee|ensure|\bcertain\b|destined|\balways\b/i.test(da));
check("H1/title (EN)", topic.includes("title:      'Arranged Marriage in Vedic Astrology: Will I Have an Arranged Marriage?'"));
check("H1/title (HI) uses अरेंज मैरिज", topic.includes("title_hi:   'वैदिक ज्योतिष में अरेंज मैरिज: क्या मेरी अरेंज मैरिज होगी?'"));
check("Hindi subtext keeps व्यवस्थित विवाह", /subtext_hi:\s*'[^']*व्यवस्थित विवाह/.test(topic));
check("EN + HI meta descriptions present", /metaDescription:\s*'Will I have an arranged marriage\?/.test(topic) && /metaDescription_hi:\s*'क्या मेरी अरेंज मैरिज होगी\?/.test(topic));
check("AM-1 overclaims and first-person voice removed",
  !/guarantees|ensures?\b|destined|exactly when|entirely subservient|most significant planet|supreme significator|perfectly|will blossom|\bI (observe|look)\b/.test(topic));
check("transit drift removed (no Transit Analysis section)", !/transit-analysis|Transit Analysis/.test(topic));

const order = ["what-it-means", "arranged-indications", "key-house-analysis", "planetary-influences", "navamsa-supporting",
  "love-or-arranged", "family-introductions-matching", "dasha-activation", "common-misconceptions", "practical-remedies", "faq-section"];
const positions = order.map((id) => topic.indexOf(`id:       '${id}'`));
check("sections exist in the approved order", positions.every((p) => p > 0) && positions.every((p, i) => i === 0 || p > positions[i - 1]));
check("indications section covers 7th-lord family links, Jupiter, Saturn, weak 5th-7th, 10th/Navamsa",
  /7th Lord Linked With the 2nd, 9th or 11th/.test(block("arranged-indications")) && /Jupiter’s Influence on the 7th/.test(block("arranged-indications")) &&
  /Saturn: Structure and Maturity/.test(block("arranged-indications")) && /never proof of an arranged marriage/.test(block("arranged-indications")) &&
  /10th House and Navamsa/.test(block("arranged-indications")) && /No Single Placement Decides It/.test(block("arranged-indications")));
check("Key Houses keeps 2nd, 7th, 9th, 11th first, then 4th and 5th (accordion)",
  /layout:\s*'accordion'/.test(block("key-house-analysis")) &&
  ["2nd-house", "7th-house", "9th-house", "11th-house", "4th-house", "5th-house"].map((id) => block("key-house-analysis").indexOf(`id:       '${id}'`))
    .every((p, i, a) => p > 0 && (i === 0 || p > a[i - 1])));
check("Planetary Influences leads with Jupiter, Venus, Saturn and keeps all 9 (accordion)",
  /layout:\s*'accordion'/.test(block("planetary-influences")) && countItems(block("planetary-influences")) === 9 &&
  ["jupiter", "venus", "saturn"].map((id) => block("planetary-influences").indexOf(`id:       '${id}'`)).every((p, i, a) => p > 0 && (i === 0 || p > a[i - 1])));
check("Love-or-Arranged section is a single brief comparison that hands off to Love Marriage",
  countItems(block("love-or-arranged")) === 1 && /Love Marriage guide linked below/.test(block("love-or-arranged")) &&
  !/Gandharva|Venus-Rahu|Venus-Mars/.test(block("love-or-arranged")));
check("Dasha section is activation, not timing, and hands off to Marriage Timing",
  /Activation is not a marriage date/.test(block("dasha-activation")) && /Marriage Timing guide linked below/.test(block("dasha-activation")));
check("matching hands off to Compatibility", /Compatibility guide linked below/.test(block("family-introductions-matching")));
check("Darakaraka hands off to Spouse Nature", /Spouse Nature guide/.test(block("navamsa-supporting")));
const faqCount = countItems(block("faq-section"));
check(`FAQ has 8 questions (got ${faqCount})`, faqCount === 8);
check("every item has EN and HI label + body", (() => {
  const items = topic.split(/\n\s{10}\{\r?\n/).slice(1).filter((s) => /^\s{12}id:/.test(s));
  return items.length > 0 && items.every((s) => /label:\s/.test(s) && /label_hi:\s/.test(s) && /body:\s/.test(s) && /body_hi:\s/.test(s));
})());
check("free tool kept and described honestly (general 7th-house check, not an arranged calculator)",
  topic.includes("slug:           'marriage-path'") && /general 7th-house marriage check/.test(topic) &&
  !/arranged marriage calculator|find (out )?whether your marriage will be arranged/i.test(topic));

console.log("\n=== F. Context links + indexability protection ===");
const ctx = arrangedMarriageLanding.contextLinks;
check("context links: love / timing / compatibility / spouse nature / married life; overview = marriage-prediction",
  JSON.stringify(ctx.topicSlugs) === '["love-marriage","marriage-timing","compatibility","spouse-nature","married-life"]' && ctx.overviewSlug === "marriage-prediction");
check("every context-link target topic exists",
  [...ctx.topicSlugs, ctx.overviewSlug].every((slug) => fs.existsSync(path.join(root, `lib/domains/marriage-astrology/topics/${slug}.ts`))));
check("dormant noindex fields left in place (not removed, not wired)",
  topic.includes("robots:             'noindex,follow'") && topic.includes("isIndexable:     false"));
const adapter = src("lib/domains/_shared/domain-topic-adapter.ts");
const seo = src("lib/authority-engine/seo.ts");
check("adapter/seo never read robots / isIndexable", !/\.robots\b|isIndexable/.test(adapter) && !/\.robots\b|isIndexable/.test(seo));
check("sticky app bar rule unchanged", src("components/StickyAppDownloadCTA.tsx").includes('const HIDDEN_ROUTE_PREFIXES = ["/marriage-astrology/"]'));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
