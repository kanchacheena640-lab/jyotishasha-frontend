/**
 * lib/loveMarriageLanding.test.ts
 *
 * Love Marriage landing (LM-2) regression guard. Standalone, repo
 * convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/loveMarriageLanding.test.ts
 *   node .ts-test-out/lib/loveMarriageLanding.test.js
 *
 * Data is imported directly; components/pages and the topic file (which use
 * path aliases) are checked as source text.
 */
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { getReportSampleUrl } from "./reportSamples";
import { loveMarriageLanding, marriageTopicLandings } from "./domains/marriage-astrology/_landing";

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

const offer = loveMarriageLanding.offer;
const lead = src("components/authority-engine/landing/TopicLandingLead.tsx");
const topic = src("lib/domains/marriage-astrology/topics/love-marriage.ts");

console.log("=== A. Report product + CTA source of truth ===");
const product = reportsData.find((r) => r.slug === offer.reportSlug);
check("offer points at the existing love_marriage_report product", offer.reportSlug === "love_marriage_report" && !!product);
check("product price comes from reportsData (currently 51)", product?.price === 51);
check("CTA labels take the price from a {price} placeholder, never a hardcoded amount",
  offer.ctaLabel.en.includes("{price}") && offer.ctaLabel.hi.includes("{price}") && !/₹\s*\d/.test(offer.ctaLabel.en + offer.ctaLabel.hi));
check("landing is registered for the love-marriage slug", marriageTopicLandings["love-marriage"] === loveMarriageLanding);

console.log("\n=== B. Sample report (EN + HI, visually verified) ===");
for (const loc of ["en", "hi"] as const) {
  const url = getReportSampleUrl(offer.reportSlug, loc);
  check(`sample URL (${loc}) = ${url}`, url === `/report-samples/love_marriage_report_${loc}.pdf`);
  check(`sample PDF exists on disk (${loc})`, fs.existsSync(path.join(root, "public", url)));
}
check("sample title present EN/HI", offer.sampleTitle.en.length > 0 && offer.sampleTitle.hi.length > 0);

console.log("\n=== C. Video: the approved Short in the top report card ===");
check("lead video is the approved WkTFU_-uqGg with its own play event",
  loveMarriageLanding.video?.youtubeId === "WkTFU_-uqGg" && loveMarriageLanding.video.playFeatureName === "love_marriage_video_play");
check("sample-hook lead present (rendered under the video)", !!offer.sampleHookLead?.en && !!offer.sampleHookLead?.hi);
const noVideoBranch = lead.slice(lead.indexOf(") : ("));
check("lead has a separate no-video branch", lead.includes("{video ? (") && noVideoBranch.length > 0);
check("no-video branch has no figure, facade or sample hook",
  !/<figure|YouTubeShortFacade|SampleHookLink/.test(noVideoBranch));
check("no-video branch still renders heading, bullets and actions", /\{heading\}/.test(noVideoBranch) && /\{bullets\}/.test(noVideoBranch) && /\{actions/.test(noVideoBranch));
// Video placement stage A: the only video is the lead Short (no inline copy inside the article).
check("no inline Short (exactly one video on the page)", loveMarriageLanding.inlineVideo === undefined);
check("caption says the video is in Hindi (EN); desktop keeps the CTA near its original position",
  /\(in Hindi\)$/.test(loveMarriageLanding.video?.caption.en ?? "") && loveMarriageLanding.video?.desktopCtaFirst === true);

console.log("\n=== D. Copy: EN/HI present, balanced, sample-proven ===");
for (const loc of ["en", "hi"] as const) {
  check(`direct answer present (${loc})`, loveMarriageLanding.directAnswer[loc].length > 200);
  check(`offer bullets present (${loc})`, offer.bullets[loc].length === 4);
}
const da = loveMarriageLanding.directAnswer.en;
check("direct answer names the 5th/7th houses, Venus, Navamsa and Dasha", /5th house/.test(da) && /7th house/.test(da) && /Venus/.test(da) && /Navamsa/.test(da) && /Dasha/.test(da));
check("direct answer says tendency not certainty, and that personal choice/family matter",
  /a tendency, not a certainty/.test(da) && /personal choice/.test(da) && /family circumstances/.test(da));
check("direct answer avoids guarantee words", !/guarantee|\bcertain\b|\balways\b|definitely/i.test(da));
const offerText = [offer.intro.en, offer.heading.en, offer.eyebrow.en, offer.ctaLabel.en, ...offer.bullets.en].join(" ");
check("offer never promises timing, dates, Navamsa or a guaranteed outcome (not in the sample)",
  !/guarantee|timing|\bwhen\b|date|year|navamsa|D9/i.test(offerText));
check("offer bullets cover only sample-proven sections",
  /tendency/.test(offer.bullets.en[0]) && /5th house/.test(offer.bullets.en[1]) && /7th house/.test(offer.bullets.en[1]) &&
  /Venus, Mars and Jupiter/.test(offer.bullets.en[2]) && /Dasha context/.test(offer.bullets.en[3]) && /practical guidance/.test(offer.bullets.en[3]));

console.log("\n=== E. Topic content: intent, overclaims, FAQ, sibling hand-offs ===");
check("H1/title keeps the core phrase + question (EN)", topic.includes("title:      'Love Marriage in Vedic Astrology: Will I Have a Love Marriage?'"));
check("H1/title (HI)", topic.includes("title_hi:   'वैदिक ज्योतिष में प्रेम विवाह: क्या मेरा प्रेम विवाह होगा?'"));
check("Hindi meta description present", /metaDescription_hi: '[^']*प्रेम विवाह/.test(topic));
check("LM-1 overclaims removed",
  !/almost always|non-negotiable|most important planet|ultimate validator|will likely end up|Absolutely\.|'Yes\. A love marriage that will endure/.test(topic));
check("old Karmic-Choice intro replaced", !/Karmic Choice/.test(topic) && topic.includes("'What Love Marriage Means in a Birth Chart'"));
const faqBlock = topic.slice(topic.indexOf("layout:   'faq'"), topic.indexOf("ctas: ["));
const faqCount = (faqBlock.match(/id:\s+'faq-/g) || []).length;
check(`FAQ has 8 questions (got ${faqCount})`, faqCount === 8);
check("intercaste + marriage-success FAQs consolidated away",
  !/faq-love-inter-caste|faq-love-vs-arranged-success|faq-success-indicators/.test(topic));
check("Dasha section exists, is about activation and points to Marriage Timing",
  topic.includes("id:       'dasha-activation'") && /Activation is not a marriage date/.test(topic) && /Marriage Timing guide/.test(topic));
check("Dasha section sits directly before the FAQ (next to the related-questions links)",
  topic.indexOf("id:       'dasha-activation'") < topic.indexOf("id:       'faqs'") &&
  topic.indexOf("id:       'misconceptions'") < topic.indexOf("id:       'dasha-activation'"));
check("preserved sections still present",
  ["houses-of-attraction", "planetary-actors", "love-marriage-yogas", "obstacles", "practical-guidance", "misconceptions"]
    .every((id) => topic.includes(`id:       '${id}'`)));
check("SSR FAQ enabled", loveMarriageLanding.ssrFaq === true);
const ctx = loveMarriageLanding.contextLinks;
check("context links hand off timing / arranged / intercaste / married life, overview = marriage-prediction",
  JSON.stringify(ctx.topicSlugs) === '["marriage-timing","arranged-marriage","intercaste-marriage","married-life"]' &&
  ctx.overviewSlug === "marriage-prediction");
check("every context-link target topic exists",
  [...ctx.topicSlugs, ctx.overviewSlug].every((slug) => fs.existsSync(path.join(root, `lib/domains/marriage-astrology/topics/${slug}.ts`))));
check("free tool + report CTAs kept", topic.includes("slug:           'love-life'") && topic.includes("slug:           'love_marriage_report'"));

console.log("\n=== F. Analytics ids + indexability protection ===");
check("analytics ids follow the existing convention",
  offer.reportCtaId === "love_marriage_report_cta" && offer.sampleCtaId === "love_marriage_sample_report" && offer.screenName === "love_marriage_topic");
check("dormant topic noindex fields left as they were (not removed, not wired)",
  topic.includes("robots:             'noindex,follow'") && topic.includes("isIndexable:     false"));
const adapter = src("lib/domains/_shared/domain-topic-adapter.ts");
const seo = src("lib/authority-engine/seo.ts");
check("adapter/seo never read robots / isIndexable",
  !/\.robots\b|isIndexable/.test(adapter) && !/\.robots\b|isIndexable/.test(seo));
const sticky = src("components/StickyAppDownloadCTA.tsx");
check("sticky app bar rule unchanged (hidden on marriage topic pages)", sticky.includes('const HIDDEN_ROUTE_PREFIXES = ["/marriage-astrology/"]'));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
