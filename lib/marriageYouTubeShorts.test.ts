// lib/marriageYouTubeShorts.test.ts

/**
 * MC Shorts -- seven approved YouTube Shorts embedded inline on their Marriage topic pages
 * (TopicLandingConfig.inlineVideo -> MarriageYouTubeShort -> YouTubeShortFacade).
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

/** Top-level content-section ids of a topic file, in page order. */
function sectionIds(slug: string): string[] {
  const src = read(`lib/domains/marriage-astrology/topics/${slug}.ts`);
  const start = src.indexOf("contentBlocks:");
  const end = src.indexOf("ctas:", start);
  const body = src.slice(start, end > start ? end : undefined);
  return [...body.matchAll(/^ {8}id:\s*'([^']+)'/gm)].map((m) => m[1]);
}

/** Width/height of a lossy (VP8) WebP file. */
function webpSize(file: string): { w: number; h: number } | null {
  const b = fs.readFileSync(file);
  if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP" || b.toString("ascii", 12, 16) !== "VP8 ") return null;
  return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
}

// ===========================================================================
console.log("1. Mapping: exactly the 7 approved Shorts, one per page");
// ===========================================================================
const withInline = Object.entries(marriageTopicLandings).filter(([, c]) => c.inlineVideo);
check("exactly 7 topics have an inline Short", withInline.length === 7);
check("they are exactly the 7 approved pages", JSON.stringify(withInline.map(([s]) => s).sort()) === JSON.stringify(Object.keys(APPROVED).sort()));
for (const [slug, id] of Object.entries(APPROVED)) {
  check(`${slug} -> ${id}`, marriageTopicLandings[slug]?.inlineVideo?.youtubeId === id);
}
const ids = withInline.map(([, c]) => c.inlineVideo!.youtubeId);
check("no Short is reused on two pages", new Set(ids).size === ids.length);
check("none of the 7 also has a lead video (no duplicate video on the page)",
  withInline.every(([, c]) => c.video === undefined));
check("marriage-timing keeps only its existing lead video (unchanged), no inline Short",
  marriageTopicLandings["marriage-timing"].video?.youtubeId === "uJ8DrQmh0nA" && !marriageTopicLandings["marriage-timing"].inlineVideo);
check("YouTube ids are well-formed (11 chars)", ids.every((id) => /^[A-Za-z0-9_-]{11}$/.test(id)));

// ===========================================================================
console.log("2. Placement: after the first (introductory) content section");
// ===========================================================================
for (const [slug] of Object.entries(APPROVED)) {
  const v = marriageTopicLandings[slug].inlineVideo!;
  const sections = sectionIds(slug);
  check(`${slug}: after "${v.afterSectionId}" = first section (${sections[0]}) of ${sections.length}`,
    sections.length > 3 && sections[0] === v.afterSectionId);
}
check("spouse-nature: video shares the intro slot with the Spouse Lagna tool (tool first, then video)",
  marriageTopicLandings["spouse-nature"].inlineTool?.afterSectionId === "introduction" &&
  marriageTopicLandings["spouse-nature"].inlineVideo?.afterSectionId === "introduction");
const renderer = read("components/authority-engine/AuthorityDetailRenderer.tsx");
check("renderer renders afterSection (tool) before afterSections (video) for the same section",
  renderer.indexOf("afterSection?.sectionId === section.id") < renderer.indexOf("afterSections?.map(") &&
  renderer.indexOf("afterSections?.map(") > 0);
const page = read("app/[locale]/marriage-astrology/[slug]/page.tsx");
check("page wires inlineVideo into afterSections with MarriageYouTubeShort",
  /landing\.inlineVideo && \{\s*afterSections: \[\{\s*sectionId: landing\.inlineVideo\.afterSectionId,\s*node: \(\s*<MarriageYouTubeShort\s+video=\{landing\.inlineVideo\}\s+locale=\{locale\}/.test(page));
check("lead (direct answer + report/tool unit) is untouched: still rendered before sections",
  renderer.indexOf("{lead}") > 0 && renderer.indexOf("{lead}") < renderer.indexOf("topic.sections.map("));

// ===========================================================================
console.log("3. Self-hosted 9:16 posters");
// ===========================================================================
for (const [slug, cfg] of withInline) {
  const v = cfg.inlineVideo!;
  const file = path.join(ROOT, "public", v.posterSrc);
  const size = fs.existsSync(file) ? webpSize(file) : null;
  check(`${slug}: ${v.posterSrc} exists, WebP ${size?.w}x${size?.h} matches config ${v.posterWidth}x${v.posterHeight} (9:16)`,
    v.posterSrc === `/media/${slug}-short-poster.webp` && !!size && size.w === v.posterWidth && size.h === v.posterHeight &&
    Math.abs(v.posterWidth / v.posterHeight - 9 / 16) < 0.01);
}

// ===========================================================================
console.log("4. Copy: topic-specific EN/HI headings, labels and play events");
// ===========================================================================
for (const [slug, cfg] of withInline) {
  const v = cfg.inlineVideo!;
  check(`${slug}: EN heading "Watch: ...", HI heading "देखें: ..." (Devanagari)`,
    v.heading.en.startsWith("Watch: ") && v.heading.hi.startsWith("देखें: ") && /[ऀ-ॿ]/.test(v.heading.hi));
  check(`${slug}: EN description says the video is in Hindi; HI description in Devanagari`,
    /\(in Hindi\)/.test(v.description.en) && /[ऀ-ॿ]/.test(v.description.hi));
  check(`${slug}: play labels localized`, v.playLabel.en.startsWith("Play video: ") && v.playLabel.hi.startsWith("वीडियो चलाएं: "));
  check(`${slug}: play event ${v.playFeatureName}`, v.playFeatureName === `${slug.replace("-", "_")}_video_play`);
}
const headings = withInline.map(([, c]) => c.inlineVideo!.heading.en);
check("headings are topic-specific (all different)", new Set(headings).size === 7);
check("copy invents no duration / date / transcript",
  !withInline.some(([, c]) => /\d+\s*(sec|second|min|minute)|सेकंड|मिनट|uploaded|transcript/i.test(JSON.stringify(c.inlineVideo))));

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
  withInline.every(([, c]) => c.inlineVideo!.posterSrc.startsWith("/media/")) && !/ytimg/.test(short + facade));
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
const REPORT_LED = ["delayed-marriage", "arranged-marriage", "love-marriage", "spouse-nature", "married-life"];
for (const [slug, cfg] of withInline) {
  const offer = (cfg as { offer?: { reportSlug: string } }).offer;
  const hasLead = !!cfg.inlineVideo!.sampleHookLead;
  if (REPORT_LED.includes(slug)) {
    const files = ["en", "hi"].map((l) => path.join(ROOT, "public", "report-samples", `${offer?.reportSlug}_${l}.pdf`));
    check(`${slug}: sample hook for ${offer?.reportSlug}, EN+HI sample PDFs exist`,
      hasLead && !!offer && files.every((f) => fs.existsSync(f)));
  } else {
    check(`${slug}: tool-led page (no report card) -> no sample hook`, !hasLead && !offer);
  }
}
check("page passes the sample only with a report offer + hook text, from the offer's own report",
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
