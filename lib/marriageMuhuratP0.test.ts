/**
 * Marriage Muhurat P0 + safe optimisation: empty/error state, shared score labels on the true 0-7 scale,
 * accurate method statement (sunrise Panchang, Lucknow reference), CTA wording/localisation/links,
 * Marriage Timing link on month pages, click tracking with the existing cta_click event.
 * Source-level + pure functions, no network.
 * Run: node_modules/.bin/tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule \
 *        --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/marriageMuhuratP0.test.ts && node <compiled js>
 */
import * as fs from "fs";
import * as path from "path";
import { MUHURAT_MAX_SCORE, muhuratCtaIds, muhuratScoreLabel, muhuratScoreText } from "./muhuratSeo";
import { muhurthTopics } from "../app/[locale]/panchang/muhurat/muhurth_topics";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const code = (rel: string) => src(rel).split("\n").filter((l) => !/^\s*\/\//.test(l)).join("\n");

const hub = code("app/[locale]/panchang/muhurat/[slug]/page.tsx");
const month = code("app/[locale]/panchang/muhurat/[slug]/[period]/page.tsx");
const prime = code("components/muhurat/PrimeDates.tsx");
const list = code("components/muhurat/ExpandableDates.tsx");
const hero = code("components/muhurat/DynamicHero.tsx");
const ctaM = code("components/cta/CtaMuhurth.tsx");
const ctaR = code("components/cta/CtaReport.tsx");
const ctaK = code("components/cta/CtaKundali.tsx");
const months = code("components/muhurat/UpcomingMonths.tsx");
const empty = code("components/muhurat/MuhuratDatesUnavailable.tsx");

// Empty / error state
check("both pages render MuhuratDatesUnavailable when no date is listed",
  [hub, month].every((s) => /dates\.length > 0 \? \(/.test(s) && /<MuhuratDatesUnavailable/.test(s) &&
    /reason=\{fetched\.failed \? "error" : "none"\}/.test(s)));
check("both fetchers report failure on HTTP error, bad JSON shape or network error (no silent [])",
  [hub, month].every((s) => /if \(!res\.ok\) return \{ results: \[\], failed: true \};/.test(s) &&
    /if \(!Array\.isArray\(data\?\.results\)\) return \{ results: \[\], failed: true \};/.test(s) &&
    /catch \{\s*return \{ results: \[\], failed: true \};/.test(s)));
check("empty state is localized for error / none / rolling",
  /लोड नहीं हो सकीं/.test(empty) && /could not be loaded/.test(empty) &&
  /अगले 60 दिनों/.test(empty) && /next 60 days/.test(empty) && /role="status"/.test(empty));

// Score labels: one shared function, true 0-7 scale, same bands everywhere
check("max score is 7 (Tithi +2, weekday +2, Nakshatra +3)", MUHURAT_MAX_SCORE === 7);
check("score text uses /7 in EN and HI", muhuratScoreText(5, false) === "Score: 5/7" && muhuratScoreText(7, true) === "स्कोर: 7/7");
check("label bands: 7 / 5-6 / 4 / <4",
  muhuratScoreLabel(7, false).short === "Most auspicious" && muhuratScoreLabel(6, false).short === "Highly favourable" &&
  muhuratScoreLabel(5, false).short === "Highly favourable" && muhuratScoreLabel(4, false).short === "Favourable" &&
  muhuratScoreLabel(3, false).short === "Neutral" && muhuratScoreLabel(7, true).short === "अत्यंत शुभ" &&
  muhuratScoreLabel(4, true).short === "अनुकूल");
check("Top 3 and full list use the same label function; old divergent copies removed",
  /muhuratScoreLabel\(d\.score, isHi\)\.short/.test(prime) && /muhuratScoreLabel\(score, isHi\)\.long/.test(list) &&
  !/getSummary/.test(prime + hub + month) && !/\/10</.test(list) && !/Exceptionally auspicious/.test(list));

// Claims and method disclosure
check("hero no longer claims experts, transit analysis or 'most accurate'",
  !/experts|most accurate|गोचर|सबसे सटीक/i.test(hero));
check("hero states sunrise Panchang factors and the Lucknow reference (EN + HI)",
  /Tithi, Nakshatra, weekday, Yoga and Karana at sunrise, with Lucknow as the reference location/.test(hero) &&
  /सूर्योदय के समय की तिथि, नक्षत्र, वार, योग और करण/.test(hero) && /संदर्भ स्थान लखनऊ है/.test(hero));
const mt = muhurthTopics["marriage-muhurat"];
check("marriage description states the sunrise-Panchang/Lucknow basis and where Lagna, Jupiter, Venus apply",
  mt.description.includes("sunrise Panchang") && mt.description.includes("Lucknow") &&
  mt.description.includes("when the exact ceremony time is fixed") &&
  mt.description_hi.includes("लखनऊ") && mt.description_hi.includes("विवाह का सटीक समय तय करते समय"));
check("Panchang policy content left unchanged (Magha still named in the description; rules untouched)",
  mt.description.includes("Rohini, Magha, and Uttara Phalguni"));

// CTAs
check("Muhurat CTA no longer doubles 'Muhurat' and is localized",
  /topicShortName\(topicName \|\| fallback\)/.test(ctaM) && /Check Your \$\{name\} Dates/.test(ctaM) &&
  /अपनी तिथियां देखें/.test(ctaM) && !/Muhurat Dates`/.test(ctaM.replace("${name} Dates", "")));
check("marriage pages link the verified marriage report product; others keep the catalogue",
  /"marriage-muhurat": \{\s*href: "\/reports\/marriage_report"/.test(ctaR) && /\?\? "\/reports"/.test(ctaR) &&
  /विवाह रिपोर्ट/.test(ctaR));
check("free Kundali CTA keeps the Hindi locale and Hindi copy",
  /\$\{isHi \? "\/hi" : ""\}\/free-kundali/.test(ctaK) && /मुफ़्त कुंडली/.test(ctaK));
check("pages pass slug/locale/topic name to the CTAs",
  [hub, month].every((s) => /<CtaKundali slug=\{slug\} isHi=\{isHi\} \/>/.test(s) && /<CtaReport slug=\{slug\} isHi=\{isHi\} \/>/.test(s) &&
    /<CtaMuhurth slug=\{slug\} isHi=\{isHi\} topicName=/.test(s)));

// Links and analytics
check("month pages now include the topic's related guide (Marriage Timing) link",
  /topic\.relatedLink && \(/.test(month) && /topic\.relatedLink\.href/.test(month));
check("marriage relatedLink still points at the Marriage Timing guide", mt.relatedLink?.href === "/marriage-astrology/marriage-timing");
check("CTAs, related guide and month navigation use the tracked link (existing cta_click event)",
  [ctaM, ctaR, ctaK, months].every((s) => /TrackedLink/.test(s)) && /ctaId=\{ids\.monthNav\}/.test(months) &&
  [hub, month].every((s) => /ctaId=\{muhuratCtaIds\(slug\)\.relatedGuide\}/.test(s)));
const tracked = code("components/muhurat/TrackedLink.tsx");
check("tracking is fire-and-forget and never blocks navigation",
  /"use client"/.test(src("components/muhurat/TrackedLink.tsx")) && /WebsiteEvents\.ctaClick\(ctaId, screenName\)/.test(tracked) &&
  /try \{/.test(tracked) && !/preventDefault/.test(tracked));
const ids = muhuratCtaIds("marriage-muhurat");
check("analytics ids are stable and namespaced",
  ids.screenName === "muhurat_marriage_muhurat" && ids.report === "muhurat_marriage_muhurat_report" &&
  ids.monthNav === "muhurat_marriage_muhurat_month_nav");

// URLs / canonical / hreflang untouched
check("canonical and hreflang templates unchanged",
  hub.includes("}/panchang/muhurat/${params.slug}`;") && hub.includes('"x-default": `${SITE_URL}/panchang/muhurat/${params.slug}`') &&
  month.includes("}/panchang/muhurat/${params.slug}/${params.period}`;"));
check("month navigation URLs unchanged", /\/panchang\/muhurat\/\$\{slug\}\/\$\{month\}/.test(months));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
