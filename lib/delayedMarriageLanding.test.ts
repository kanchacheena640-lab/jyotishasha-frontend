/**
 * lib/delayedMarriageLanding.test.ts
 *
 * Delayed Marriage landing (DM-2) regression guard. Standalone, repo
 * convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/delayedMarriageLanding.test.ts
 *   node .ts-test-out/lib/delayedMarriageLanding.test.js
 *
 * Data is imported directly; components/pages and the topic file (which use
 * path aliases) are checked as source text.
 */
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { getReportSampleUrl } from "./reportSamples";
import { delayedMarriageLanding, marriageTopicLandings } from "./domains/marriage-astrology/_landing";

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

const offer = delayedMarriageLanding.offer;
const topic = src("lib/domains/marriage-astrology/topics/delayed-marriage.ts");
const block = (id: string) => {
  const start = topic.indexOf(`id:       '${id}'`);
  if (start < 0) return "";
  // Next section start (the topic file uses CRLF line endings).
  const next = topic.slice(start + 1).search(/\r?\n {6}\{\r?\n {8}id:/);
  return topic.slice(start, next < 0 ? topic.indexOf("ctas: [") : start + 1 + next);
};
const countItems = (b: string) => (b.match(/\n\s{10}\{\r?\n\s{12}id:/g) || []).length;
const words = (s: string) => s.trim().split(/\s+/).length;
const bodyOf = (b: string) => (b.match(/body:\s+'((?:[^'\\]|\\.)*)'/) || [, ""])[1] as string;

console.log("=== A. Dedicated report product ===");
const product = reportsData.find((r) => r.slug === offer.reportSlug);
check("offer points at delay_in_marriage_report (rep_013)", offer.reportSlug === "delay_in_marriage_report" && product?.id === "rep_013");
check("price comes from reportsData (currently 51)", product?.price === 51);
check("CTA labels use the {price} placeholder", offer.ctaLabel.en.includes("{price}") && offer.ctaLabel.hi.includes("{price}") && !/₹\s*\d/.test(offer.ctaLabel.en + offer.ctaLabel.hi));
check("card heading is the official product title", offer.heading.en === "Delay in Marriage Report" && offer.heading.hi === "विवाह में देरी रिपोर्ट");
check("focused marriage_delay_reason / easing products are not used", !/marriage_delay_reason|marriage_delay_easing|marriage-delay/.test(JSON.stringify(delayedMarriageLanding)));
const offerEn = [offer.eyebrow.en, offer.heading.en, offer.intro.en, offer.ctaLabel.en, ...offer.bullets.en].join(" ");
check("offer never claims Navamsa, transits, an exact date or a guaranteed end of delay",
  !/navamsa|D9|transit|guarantee|will end|end of (the )?delay/i.test(offerEn) && /does not predict an exact marriage date/.test(offer.intro.en));
check("bullets stay within the sample (delay signal, 7th house/lord, Saturn/Mars/Rahu-Ketu, Dasha + support)",
  offer.bullets.en.length === 4 && offer.bullets.hi.length === 4 &&
  /delay signal/.test(offer.bullets.en[0]) && /7th house and 7th lord/.test(offer.bullets.en[1]) &&
  /Saturn, Mars and Rahu–Ketu/.test(offer.bullets.en[2]) && /Dasha window/.test(offer.bullets.en[3]) && /support the pattern/.test(offer.bullets.en[3]));
check("analytics ids follow the existing convention",
  offer.reportCtaId === "delayed_marriage_report_cta" && offer.sampleCtaId === "delayed_marriage_sample_report" && offer.screenName === "delayed_marriage_topic");
check("landing registered for delayed-marriage", marriageTopicLandings["delayed-marriage"] === delayedMarriageLanding);

console.log("\n=== B. Sample report (EN + HI) ===");
for (const loc of ["en", "hi"] as const) {
  const url = getReportSampleUrl(offer.reportSlug, loc);
  check(`sample URL (${loc}) = ${url}`, url === `/report-samples/delay_in_marriage_report_${loc}.pdf`);
  check(`sample PDF exists on disk (${loc})`, fs.existsSync(path.join(root, "public", url)));
}

console.log("\n=== C. No video; SSR FAQ + long-form opt-ins ===");
// MC Shorts: the only video is the approved inline Short after the intro; the lead/offer unit stays video-free.
const { inlineVideo: delayedInlineVideo, ...delayedWithoutInlineVideo } = delayedMarriageLanding;
check("no lead video / sample-hook lead; no play event outside the approved inline Short",
  delayedMarriageLanding.video === undefined && offer.sampleHookLead === undefined &&
  !/youtube|playFeatureName|video_play/i.test(JSON.stringify(delayedWithoutInlineVideo)));
check("inline Short is the approved tNHyYsD3x5M, after the intro section",
  delayedInlineVideo?.youtubeId === "tNHyYsD3x5M" && delayedInlineVideo.afterSectionId === "intro" &&
  delayedInlineVideo.playFeatureName === "delayed_marriage_video_play");
check("ssrFaq and longForm enabled", delayedMarriageLanding.ssrFaq === true && delayedMarriageLanding.longForm === true);
check("topic has no accordion sections (all content already server-rendered)", !/layout:\s*'accordion'/.test(topic));

console.log("\n=== D. Direct answer ===");
const da = delayedMarriageLanding.directAnswer.en;
check("direct answer present EN/HI", da.length > 300 && delayedMarriageLanding.directAnswer.hi.length > 300);
check("direct answer: no single placement + 7th house/lord + Saturn/Mars/Rahu/Ketu + Venus/Jupiter + Navamsa + Dasha",
  /does not trace a delay in marriage to one placement/.test(da) && /7th house and its lord/.test(da) && /Saturn, Mars, Rahu and Ketu/.test(da) &&
  /Venus and Jupiter/.test(da) && /Navamsa/.test(da) && /Dasha/.test(da));
check("direct answer: not 'no marriage', and real-world circumstances matter",
  /not that marriage will not happen/.test(da) && /Real-world circumstances/.test(da));
check("direct answer avoids absolute words", !/guarantee|ensure|\bcertain\b|destined|\balways\b|inevitable/i.test(da));

console.log("\n=== E. Topic: titles, meta, fatalism cleanup ===");
check("H1/title (EN) keeps the core phrase", topic.includes("title:      'Delayed Marriage in Vedic Astrology: Why Is My Marriage Getting Delayed?'"));
check("H1/title (HI) uses शादी में देरी", topic.includes("title_hi:   'वैदिक ज्योतिष में शादी में देरी: मेरी शादी में देरी क्यों हो रही है?'"));
check("EN + Hindi meta descriptions present (HI actually Hindi)",
  /metaDescription:\s+'Why is my marriage getting delayed\?/.test(topic) && /metaDescription_hi:\s+'मेरी शादी में देरी क्यों हो रही है\?/.test(topic));
check("विवाह में देरी kept in supporting copy", (topic.match(/विवाह में देरी/g) || []).length >= 3);
check("fatalistic / overclaim wording removed",
  !/inevitable|cannot be altered|Great Delayer|highly probable|karmic timetable|structurally|cannot actualize|negated|most durable|severely hampers|uninterested in marriage|ensures?\b|window itself is fixed|statistically|30 or 32/i.test(topic));
check("Hindi never uses अस्वीकृति for denial; uses विवाह न होना", !topic.includes("अस्वीकृति") && topic.includes("विवाह न होना"));
check("Saturn is not presented as a delay rule", /is not a rule/.test(block("delay-reasons")) && /Saturn — Slower, More Considered Progress/.test(topic) && !/Saturn — The Great/.test(topic));
check("gendered karaka rule is qualified, not universal", /modern readings examine both in every chart/.test(topic) && !/Venus for men, Jupiter for women/.test(topic));
check("D9 is supporting evidence, not cancel/confirm", /does not cancel or confirm anything on its own/.test(block("structural-analysis")));

console.log("\n=== F. Structure and hand-offs ===");
const order = ["intro", "delay-reasons", "delay-houses", "structural-analysis", "delay-not-denial", "dasha-activation",
  "real-world-factors", "remedies", "misconceptions", "faqs"];
const pos = order.map((id) => topic.indexOf(`id:       '${id}'`));
check("sections exist in the approved order", pos.every((p) => p > 0) && pos.every((p, i) => i === 0 || p > pos[i - 1]));
check("'Delayed Marriage Does Not Mean No Marriage' H2 present EN/HI",
  topic.includes("title:    'Delayed Marriage Does Not Mean No Marriage'") && topic.includes("title_hi: 'शादी में देरी का अर्थ विवाह न होना नहीं है'"));
const denialWords = words(bodyOf(block("delay-not-denial")));
check(`delay-vs-no-marriage body is ~120-160 words (got ${denialWords})`, denialWords >= 110 && denialWords <= 170);
const rwWords = words(bodyOf(block("real-world-factors")));
check(`real-world factors body is ~80-100 words (got ${rwWords})`, rwWords >= 70 && rwWords <= 110);
check("real-world factors mention education/career, choice, family, expectations, location, previous relationships",
  /education/.test(block("real-world-factors")) && /career/.test(block("real-world-factors")) && /personal choice/.test(block("real-world-factors")) &&
  /family/.test(block("real-world-factors")) && /expectations/.test(block("real-world-factors")) && /social circle/.test(block("real-world-factors")) &&
  /previous relationship/.test(block("real-world-factors")));
check("Dasha section is activation and hands off timing to Marriage Timing",
  topic.includes("title:    'Dasha: Are Delay Factors Active?'") && /Marriage Timing guide linked below/.test(block("dasha-activation")) &&
  !/transit-analysis|timing-transit/.test(topic));
check("main reasons section has the no-single-placement card + 6 indicators", countItems(block("delay-reasons")) === 7 && /No Single Placement Decides It/.test(block("delay-reasons")));
check("houses kept: 7th, 2nd, 8th, 1st, 12th", ["house-7th", "house-2nd", "house-8th", "house-1st", "house-12th"].every((id) => block("delay-houses").includes(`id:       '${id}'`)));
check("Darakaraka hands off to Spouse Nature", /Spouse Nature guide/.test(block("structural-analysis")));
const faqCount = countItems(block("faqs"));
check(`FAQ has 9 questions (got ${faqCount})`, faqCount === 9);
check("FAQ 'when will the delay end' hands off to Marriage Timing", /faq-when-delay-ends[\s\S]*?see Marriage Timing/.test(block("faqs")));
check("every item has EN and HI label + body", (() => {
  const items = topic.split(/\r?\n\s{10}\{\r?\n/).slice(1).filter((s) => /^\s{12}id:/.test(s));
  return items.length > 0 && items.every((s) => /label:\s/.test(s) && /label_hi:\s/.test(s) && /body:\s/.test(s) && /body_hi:\s/.test(s));
})());
check("free tool is described honestly (general 7th-house check, not a delay/timing calculator)",
  topic.includes("label:          'Check Your 7th House for Free'") && /general 7th-house marriage check/.test(topic) &&
  !/delay calculator|delay prediction tool|timing calculator/i.test(topic));
const ctx = delayedMarriageLanding.contextLinks;
check("context links: timing / love / arranged / compatibility / married life; overview = marriage-prediction",
  JSON.stringify(ctx.topicSlugs) === '["marriage-timing","love-marriage","arranged-marriage","compatibility","married-life"]' && ctx.overviewSlug === "marriage-prediction");
check("every context-link target topic exists",
  [...ctx.topicSlugs, ctx.overviewSlug].every((slug) => fs.existsSync(path.join(root, `lib/domains/marriage-astrology/topics/${slug}.ts`))));

console.log("\n=== G. Indexability protection ===");
check("dormant noindex fields left in place (not removed, not wired)",
  topic.includes("robots:             'noindex,follow'") && topic.includes("isIndexable:     false"));
check("adapter/seo never read robots / isIndexable",
  !/\.robots\b|isIndexable/.test(src("lib/domains/_shared/domain-topic-adapter.ts")) && !/\.robots\b|isIndexable/.test(src("lib/authority-engine/seo.ts")));
check("sticky app bar rule unchanged", src("components/StickyAppDownloadCTA.tsx").includes('const HIDDEN_ROUTE_PREFIXES = ["/marriage-astrology/"]'));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
