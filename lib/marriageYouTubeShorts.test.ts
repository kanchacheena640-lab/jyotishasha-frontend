// lib/marriageYouTubeShorts.test.ts

/**
 * MC Shorts -- seven approved YouTube Shorts on their Marriage topic pages, placed in the top
 * introductory area (video placement stages A/B):
 *   - report-led pages: the report card's own video slot (TopicLandingConfig.video -> TopicLandingLead),
 *     like Marriage Timing -- CTA first on phones, CTA kept near its old desktop position (desktopCtaFirst);
 *   - free-tool pages (no report card): the standalone Short card right after the top tool card
 *     (inlineVideo placement 'after-lead' -> MarriageYouTubeShort).
 *
 * Same standalone check()/pass-fail-counter convention as every other
 * lib/*.test.ts file in this repo (no test runner installed).
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/marriageYouTubeShorts.test.ts
 *   node .ts-test-out/lib/marriageYouTubeShorts.test.js
 */

import * as fs from "fs";
import * as path from "path";
import { marriageTopicLandings } from "./domains/marriage-astrology/_landing";

let passed = 0;
let failed = 0;

function check(label: string, condition: boolean) {
  if (condition) {
    passed += 1;
    console.log(`  PASS: ${label}`);
  } else {
    failed += 1;
    console.log(`  FAIL: ${label}`);
  }
}

// Repo root = nearest ancestor with package.json (compiled output depth varies with tsc's rootDir).
const ROOT = (() => {
  let dir = __dirname;
  while (!fs.existsSync(path.join(dir, "package.json")) && path.dirname(dir) !== dir) dir = path.dirname(dir);
  return dir;
})();
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");

// Owner-approved mapping (MC Shorts task). Never substitute another video.
const APPROVED: Record<string, string> = {
  "delayed-marriage": "tNHyYsD3x5M",
  "arranged-marriage": "5-7nLtnnpfs",
  "love-marriage": "WkTFU_-uqGg",
  "spouse-nature": "yl9kprGsEZg",
  "compatibility": "_BEtbbOlCOQ",
  "intercaste-marriage": "0Ldyl0oygJQ",
  "married-life": "KyKc4_EjLoY",
};

/** Width/height of a lossy (VP8) WebP file. */
function webpSize(file: string): { w: number; h: number } | null {
  const b = fs.readFileSync(file);
  if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP" || b.toString("ascii", 12, 16) !== "VP8 ") return null;
  return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
}

/** The page's single Short, whichever slot carries it. */
type Short = { slot: "lead" | "after-lead"; youtubeId: string; posterSrc: string; posterWidth: number; posterHeight: number;
  captionEn: string; captionHi: string; playLabel: { en: string; hi: string }; playFeatureName: string };
function shortOf(slug: string): Short | null {
  const c = marriageTopicLandings[slug];
  const v = c.video, iv = c.inlineVideo;
  if (v) return { slot: "lead", youtubeId: v.youtubeId, posterSrc: v.posterSrc, posterWidth: v.posterWidth, posterHeight: v.posterHeight,
    captionEn: v.caption.en, captionHi: v.caption.hi, playLabel: v.playLabel, playFeatureName: v.playFeatureName };
  if (iv) return { slot: "after-lead", youtubeId: iv.youtubeId, posterSrc: iv.posterSrc, posterWidth: iv.posterWidth, posterHeight: iv.posterHeight,
    captionEn: `${iv.heading.en} ${iv.description.en}`, captionHi: iv.heading.hi, playLabel: iv.playLabel, playFeatureName: iv.playFeatureName };
  return null;
}
const REPORT_LED = ["delayed-marriage", "arranged-marriage", "love-marriage", "spouse-nature", "married-life"];
const TOOL_LED = ["compatibility", "intercaste-marriage"];

// ===========================================================================
console.log("1. Mapping: exactly the 7 approved Shorts, one per page");
// ===========================================================================
const withShort = Object.keys(APPROVED).map((slug) => [slug, shortOf(slug)!] as const);
for (const [slug, id] of Object.entries(APPROVED)) {
  check(`${slug} -> ${id}`, shortOf(slug)?.youtubeId === id);
  const c = marriageTopicLandings[slug];
  check(`${slug}: exactly one Short on the page (lead video XOR standalone card)`, !!c.video !== !!c.inlineVideo);
}
const ids = withShort.map(([, v]) => v.youtubeId);
check("no Short is reused on two pages", new Set(ids).size === ids.length);
check("no other topic has an inline Short",
  Object.entries(marriageTopicLandings).filter(([, c]) => c.inlineVideo).every(([slug]) => TOOL_LED.includes(slug)));
check("marriage-timing keeps only its existing lead video (unchanged), no inline Short",
  marriageTopicLandings["marriage-timing"].video?.youtubeId === "uJ8DrQmh0nA" && !marriageTopicLandings["marriage-timing"].inlineVideo &&
  marriageTopicLandings["marriage-timing"].video?.desktopCtaFirst === undefined);
check("YouTube ids are well-formed (11 chars)", ids.every((id) => /^[A-Za-z0-9_-]{11}$/.test(id)));

// ===========================================================================
console.log("2. Placement: top introductory area, before the first article section");
// ===========================================================================
for (const slug of REPORT_LED) {
  const c = marriageTopicLandings[slug];
  check(`${slug}: Short in the top report card's video slot, CTA kept high on desktop (desktopCtaFirst)`,
    !!c.offer && c.video?.youtubeId === APPROVED[slug] && c.video.desktopCtaFirst === true && c.inlineVideo === undefined);
}
for (const slug of TOOL_LED) {
  const c = marriageTopicLandings[slug];
  check(`${slug}: free-tool page -> standalone Short card right after the top tool card (no invented report card)`,
    !c.offer && !!c.primaryAction && c.video === undefined && c.inlineVideo?.placement === "after-lead" && c.inlineVideo.afterSectionId === undefined);
}
check("spouse-nature: Spouse Lagna tool stays in the article after the intro", marriageTopicLandings["spouse-nature"].inlineTool?.afterSectionId === "introduction");
const renderer = read("components/authority-engine/AuthorityDetailRenderer.tsx");
const page = read("app/[locale]/marriage-astrology/[slug]/page.tsx");
const leadSrc = read("components/authority-engine/landing/TopicLandingLead.tsx");
check("lead slot (direct answer + report/tool unit + after-lead Short) renders before the article sections",
  renderer.indexOf("{lead}") > 0 && renderer.indexOf("{lead}") < renderer.indexOf("topic.sections.map("));
check("page renders the after-lead Short card inside the lead slot, right after TopicLandingLead",
  /<TopicLandingLead config=\{landing\} locale=\{locale\} \/>\s*\{shortCard && landing\.inlineVideo\?\.placement === 'after-lead' && shortCard\}/.test(page));
check("page builds the Short card from inlineVideo with MarriageYouTubeShort",
  /const shortCard = landing\?\.inlineVideo && \(\s*<MarriageYouTubeShort\s+video=\{landing\.inlineVideo\}\s+locale=\{locale\}/.test(page));
check("in-article placement only for placement 'after-section' (no page uses it now)",
  page.includes("landing.inlineVideo?.placement !== 'after-lead' && landing.inlineVideo?.afterSectionId"));
check("phones: lead video after the report CTA (order-2); desktop: buy button above the bullets only with desktopCtaFirst",
  leadSrc.includes('<figure className="order-2 w-[240px] flex-none md:order-none md:w-[290px]">') &&
  /video\.desktopCtaFirst \? \((?:\s*\/\/[^\n]*)*\s*<>\s*<div className="md:order-2">\{bullets\}<\/div>\s*\{actions && <div className="mt-5 md:order-1">\{actions\}<\/div>\}/.test(leadSrc));

// ===========================================================================
console.log("3. Self-hosted 9:16 posters");
// ===========================================================================
for (const [slug, v] of withShort) {
  const file = path.join(ROOT, "public", v.posterSrc);
  const size = fs.existsSync(file) ? webpSize(file) : null;
  check(`${slug}: ${v.posterSrc} exists, WebP ${size?.w}x${size?.h} matches config ${v.posterWidth}x${v.posterHeight} (9:16)`,
    v.posterSrc === `/media/${slug}-short-poster.webp` && !!size && size.w === v.posterWidth && size.h === v.posterHeight &&
    Math.abs(v.posterWidth / v.posterHeight - 9 / 16) < 0.01);
}

// ===========================================================================
console.log("4. Copy: topic-specific EN/HI captions, labels and play events");
// ===========================================================================
for (const [slug, v] of withShort) {
  check(`${slug}: EN caption "Watch: ...", HI caption "देखें: ..." (Devanagari)`,
    v.captionEn.startsWith("Watch: ") && v.captionHi.startsWith("देखें: ") && /[ऀ-ॿ]/.test(v.captionHi));
  check(`${slug}: EN caption says the video is in Hindi`, /\(in Hindi\)/.test(v.captionEn));
  check(`${slug}: play labels localized`, v.playLabel.en.startsWith("Play video: ") && v.playLabel.hi.startsWith("वीडियो चलाएं: "));
  check(`${slug}: play event ${v.playFeatureName}`, v.playFeatureName === `${slug.replace("-", "_")}_video_play`);
}
const captions = withShort.map(([, v]) => v.captionEn);
check("captions are topic-specific (all different)", new Set(captions).size === 7);
check("copy invents no duration / date / transcript",
  !withShort.some(([, v]) => /\d+\s*(sec|second|min|minute)|सेकंड|मिनट|uploaded|transcript/i.test(JSON.stringify(v))));

// ===========================================================================
console.log("5. Performance / privacy: nothing from YouTube before a tap");
// ===========================================================================
const facade = read("components/authority-engine/landing/YouTubeShortFacade.tsx");
const short = read("components/authority-engine/landing/MarriageYouTubeShort.tsx");
const shortCode = short.split("\n").filter((l) => !/^\s*\/\//.test(l)).join("\n"); // JSX/code without comments
check("facade starts not playing (poster first)", facade.includes("useState(false)"));
check("iframe is only in the playing branch", /\{playing \? \(\s*<iframe/.test(facade));
check("iframe uses youtube-nocookie.com; autoplay only after the tap mounts it",
  facade.includes("https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0"));
check("poster box reserves 9:16 (aspect-ratio) -> no layout shift", facade.includes("aspect-[9/16]"));
check("poster is a local lazy image (no i.ytimg.com request)", facade.includes('loading="lazy"') &&
  withShort.every(([, v]) => v.posterSrc.startsWith("/media/")) && !/ytimg/.test(short + facade));
check("MarriageYouTubeShort is a server component (only the facade hydrates)", !/['"]use client['"]/.test(short));
check("accessible: iframe title + play label passed; aside labelled by its caption",
  short.includes("iframeTitle={video.heading[locale]}") && short.includes("playLabel={video.playLabel[locale]}") &&
  short.includes('aria-labelledby="topic-landing-video"') && /<figcaption id="topic-landing-video"/.test(shortCode));
check("no extra heading: caption below the video (article <h2> outline unchanged, no <h3>)",
  !/<h[1-6][\s>]/.test(shortCode) && shortCode.indexOf("<YouTubeShortFacade") < shortCode.indexOf("<figcaption"));

// ===========================================================================
console.log("5b. Styling aligned with the Marriage Timing lead video");
// ===========================================================================
const lead = read("components/authority-engine/landing/TopicLandingLead.tsx");
check("same poster widths as Marriage Timing: 240px phone, 290px desktop",
  /<figure className="[^"]*\bw-\[240px\][^"]*\bmd:w-\[290px\][^"]*">/.test(lead) && shortCode.includes('className="mx-auto w-[240px] md:w-[290px]"'));
check("same caption style as Marriage Timing",
  lead.includes('<figcaption className="mt-2 text-center text-sm leading-5 text-gray-300">') &&
  shortCode.includes('className="mt-2 text-center text-sm leading-5 text-gray-300"'));
const cardClasses = "overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#1d1530] via-[#151a31] to-[#121a2e] p-4 shadow-xl shadow-black/40 sm:p-6";
check("same card border / gradient / padding / shadow as the Marriage Timing unit",
  lead.includes(cardClasses) && shortCode.includes(cardClasses));

// ===========================================================================
console.log("5c. Sample hook: report-led pages only, verified sample PDFs");
// ===========================================================================
for (const [slug] of withShort) {
  const c = marriageTopicLandings[slug];
  if (REPORT_LED.includes(slug)) {
    const files = ["en", "hi"].map((l) => path.join(ROOT, "public", "report-samples", `${c.offer?.reportSlug}_${l}.pdf`));
    check(`${slug}: sample hook under the lead video for ${c.offer?.reportSlug}, EN+HI sample PDFs exist`,
      !!c.offer?.sampleHookLead && files.every((f) => fs.existsSync(f)));
  } else {
    check(`${slug}: tool-led page (no report card) -> no sample hook`, !c.inlineVideo?.sampleHookLead && !c.offer);
  }
}
check("lead renders the sample hook under the video only with the product + offer hook text",
  /\{product && offer\.sampleHookLead && \(\s*<SampleHookLink/.test(leadSrc));
check("standalone card passes a sample only with a report offer + hook text, from the offer's own report",
  /landing\.offer && landing\.inlineVideo\.sampleHookLead && \{\s*sampleHref: getReportSampleUrl\(landing\.offer\.reportSlug, locale\),\s*sampleLabel: getReportSampleLabel\(locale\),/.test(page));
const hook = read("components/authority-engine/landing/SampleHookLink.tsx");
check("SampleHookLink: own unit's trigger first (Marriage Timing unchanged), else the page's offer trigger",
  /closest\('section'\)\?\.querySelector<HTMLAnchorElement>\('\[data-sample-trigger\]'\) \?\?\s*document\.querySelector<HTMLAnchorElement>\('section\[aria-labelledby="topic-landing-offer"\] \[data-sample-trigger\]'\)/.test(hook));

// ===========================================================================
console.log("6. SEO: no unverifiable VideoObject schema");
// ===========================================================================
const files: string[] = [];
const walk = (dir: string) => {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) walk(rel);
    else if (/\.(ts|tsx)$/.test(e.name) && !/\.test\.ts$/.test(e.name)) files.push(rel);
  }
};
["app", "components", "lib"].forEach(walk);
check("no VideoObject schema introduced", !files.some((f) => read(f).includes("VideoObject")));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
