/**
 * lib/marriageTimingLanding.test.ts
 *
 * Marriage Timing landing (MT-2) regression guard. Standalone, repo
 * convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/marriageTimingLanding.test.ts
 *   node .ts-test-out/lib/marriageTimingLanding.test.js
 *
 * Data is imported directly; components/pages (which use path aliases) are
 * checked as source text.
 */
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { getReportSampleUrl } from "./reportSamples";
import { marriageTimingLanding, marriageTopicLandings } from "./domains/marriage-astrology/_landing";

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

const offer = marriageTimingLanding.offer;
const video = marriageTimingLanding.video;

console.log("=== A. Report product + CTA source of truth ===");
const product = reportsData.find((r) => r.slug === offer.reportSlug);
check("offer points at the existing marriage_report product", offer.reportSlug === "marriage_report" && !!product);
check("product price comes from reportsData (currently 51)", product?.price === 51);
check("CTA labels take the price from a {price} placeholder, never a hardcoded amount",
  offer.ctaLabel.en.includes("{price}") && offer.ctaLabel.hi.includes("{price}") && !/₹\s*\d/.test(offer.ctaLabel.en + offer.ctaLabel.hi));
const lead = src("components/authority-engine/landing/TopicLandingLead.tsx");
check("lead builds the report href as /reports/<slug> (existing route)", lead.includes("`/reports/${offer.reportSlug}`"));
check("lead reads price from reportsData", lead.includes("reportsData.find(") && lead.includes("product?.price"));

console.log("\n=== B. Sample report ===");
for (const loc of ["en", "hi"] as const) {
  const url = getReportSampleUrl(offer.reportSlug, loc);
  check(`sample URL (${loc}) = ${url}`, url === `/report-samples/marriage_report_${loc}.pdf`);
  check(`sample PDF exists on disk (${loc})`, fs.existsSync(path.join(root, "public", url)));
}
const viewer = src("components/focused-reports/FocusedSampleViewer.tsx");
check("viewer: purchaseHref/triggerLabel/triggerClassName are optional props", /purchaseHref\?: string/.test(viewer) && /triggerLabel\?: string/.test(viewer) && /triggerClassName\?: string/.test(viewer));
check("viewer: default focused-report scroll-to-form path still present", viewer.includes('const PURCHASE_FORM_ID = "focused-report-form"') && viewer.includes("getElementById(PURCHASE_FORM_ID)"));
check("viewer: default trigger label unchanged", viewer.includes('(isHi ? "Sample देखें" : "View Sample")'));

const hook = src("components/authority-engine/landing/SampleHookLink.tsx");
check("video-adjacent sample hook reuses the existing viewer (activates [data-sample-trigger]; no own dialog/viewer)",
  hook.includes("[data-sample-trigger]") && hook.includes("trigger.click()") && !/<dialog|FocusedSampleViewer\b(?! trigger)|iframe/.test(hook.replace(/\/\/.*$/gm, "")));
check("hook uses the same locale sample URL + label helpers, rendered under the video",
  lead.includes("<SampleHookLink") && lead.includes("href={getReportSampleUrl(offer.reportSlug, locale)}") && lead.includes("label={getReportSampleLabel(locale)}"));
check("hook lead copy present EN/HI", offer.sampleHookLead.en.length > 0 && offer.sampleHookLead.hi.length > 0);
check("card keeps its own sample link (viewer still rendered in LeadOfferActions)", src("components/authority-engine/landing/LeadOfferActions.tsx").includes("<FocusedSampleViewer"));

console.log("\n=== C. Video facade ===");
const facade = src("components/authority-engine/landing/YouTubeShortFacade.tsx");
check("video id is the approved Short", video.youtubeId === "uJ8DrQmh0nA");
check("iframe uses youtube-nocookie.com with autoplay + playsinline",
  facade.includes("https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&playsinline=1"));
check("iframe only renders after a tap (playing state)", /\{playing \? \(\s*<iframe/.test(facade));
check("poster is local, lazy and has fixed dimensions",
  video.posterSrc.startsWith("/media/") && fs.existsSync(path.join(root, "public", video.posterSrc)) &&
  facade.includes('loading="lazy"') && Math.abs((video.posterWidth * 16) / 9 - video.posterHeight) < 1);
check("reserved 9:16 box (no CLS)", facade.includes("aspect-[9/16]"));
check("mobile width 240px (220–250 allowed), desktop 290px", lead.includes("w-[240px]") && lead.includes("md:w-[290px]"));

console.log("\n=== D. Copy: EN/HI present, no over-promising ===");
for (const loc of ["en", "hi"] as const) {
  check(`direct answer present (${loc})`, marriageTimingLanding.directAnswer[loc].length > 120);
  check(`offer bullets present (${loc})`, offer.bullets[loc].length === 4);
}
const offerText = [offer.intro.en, offer.heading.en, offer.ctaLabel.en, ...offer.bullets.en].join(" ");
check("offer copy never claims a guaranteed / exact / confirmed date", !/guarantee|exact date|confirmed date|will marry on/i.test(offerText));
check("direct answer frames a window, not a guaranteed date", /not a guaranteed date/.test(marriageTimingLanding.directAnswer.en));

console.log("\n=== E. Scope + indexability protection ===");
check("landing opt-in exists only for marriage-timing", JSON.stringify(Object.keys(marriageTopicLandings)) === '["marriage-timing"]');
const adapter = src("lib/domains/_shared/domain-topic-adapter.ts");
const seo = src("lib/authority-engine/seo.ts");
check("dormant topic noindex fields stay unwired (adapter/seo never read robots / isIndexable)",
  !/\.robots\b|isIndexable/.test(adapter) && !/\.robots\b|isIndexable/.test(seo));
const topic = src("lib/domains/marriage-astrology/topics/marriage-timing.ts");
check("H1/title keeps the core phrase (EN)", topic.includes("title:      'Marriage Timing in Vedic Astrology: When Will I Get Married?'"));
check("Hindi title and Hindi meta description present", topic.includes("title_hi:   'वैदिक ज्योतिष में विवाह का समय: मेरी शादी कब होगी?'") && topic.includes("metaDescription_hi:"));
const sticky = src("components/StickyAppDownloadCTA.tsx");
check("app bar hidden on all marriage topic detail pages (prefix rule), hub keeps exact-path deferral",
  sticky.includes('const HIDDEN_ROUTE_PREFIXES = ["/marriage-astrology/"]') &&
  sticky.includes('const DEFERRED_ROUTES = new Set(["/marriage-astrology"])') &&
  sticky.includes("if (hidden) return null;"));
const renderer = src("components/authority-engine/AuthorityDetailRenderer.tsx");
check("renderer slots are optional (other topics unchanged)", /lead\?: ReactNode/.test(renderer) && /ssrFaq\?: boolean/.test(renderer));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
