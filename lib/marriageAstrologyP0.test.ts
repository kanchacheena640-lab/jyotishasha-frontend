/**
 * Marriage Astrology SEO P0 (CTO-approved): marriage-prediction search title/meta + DOB intro sentence and the
 * free Marriage Path card moved right after the short answer; intercaste ₹99 report card moved right after the
 * short answer. No URL / H1 / canonical / hreflang / indexing change; nothing duplicated; tracking unchanged.
 * Run: node_modules/.bin/tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule \
 *        --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/marriageAstrologyP0.test.ts && node <compiled js>
 */
import * as fs from "fs";
import * as path from "path";
import { marriagePredictionLanding, intercasteMarriageLanding, marriageTopicLandings } from "./domains/marriage-astrology/_landing";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8").replace(/\r\n/g, "\n");

const page = src("app/[locale]/marriage-astrology/[slug]/page.tsx");
const renderer = src("components/authority-engine/AuthorityDetailRenderer.tsx");
const lead = src("components/authority-engine/landing/TopicLandingLead.tsx");
const editorial = src("components/authority-engine/editorial/EditorialArticle.tsx");
const prediction = src("lib/domains/marriage-astrology/topics/marriage-prediction.ts");

// 1. Marriage Prediction: search title (EN/HI), H1 untouched
const t = marriagePredictionLanding.seoTitle!;
check("EN search title is the approved text (<=60 chars)",
  t.en === "Marriage Prediction by Date of Birth & Kundli – Vedic Guide" && t.en.length <= 60);
check("HI search title is the Hindi equivalent", t.hi === "जन्म तिथि और कुंडली से विवाह भविष्यवाणी – वैदिक मार्गदर्शिका");
check("H1 source (identity title EN/HI) unchanged",
  prediction.includes("title:      'Marriage Prediction in Vedic Astrology',") &&
  prediction.includes("title_hi:   'वैदिक ज्योतिष में विवाह भविष्यवाणी',"));
check("route overrides only <title> and og:title, and only when a landing sets seoTitle",
  /const seoTitle = marriageTopicLandings\[params\.slug\]\?\.seoTitle\?\.\[locale\]/.test(page) &&
  /if \(!seoTitle\) return generateAuthorityTopicMetadata\(domain, topic, locale\)/.test(page) &&
  /return \{ \.\.\.metadata, title: seoTitle, openGraph: \{ \.\.\.metadata\.openGraph, title: seoTitle \} \}/.test(page));
check("only marriage-prediction sets seoTitle in this release",
  Object.entries(marriageTopicLandings).filter(([, l]) => l.seoTitle).map(([s]) => s).join() === "marriage-prediction");

// 2. Meta + DOB intro sentence
const en = (prediction.match(/metaDescription: '((?:[^'\\]|\\.)+)'/) || [, ""])[1]!.replace(/\\'/g, "'");
check("EN meta is the approved text (<=155 chars)",
  en === "Marriage prediction by date of birth: see how your kundli's 7th house, Venus, Jupiter, Dasha and Navamsa shape marriage timing. Free tool + ₹99 report." && en.length <= 155);
check("intro mentions date, time and place of birth (EN + HI)",
  prediction.includes("A marriage prediction starts from your date of birth, time of birth and place of birth") &&
  prediction.includes("विवाह भविष्यवाणी आपकी जन्म तिथि, जन्म समय और जन्म स्थान से शुरू होती है"));

// 3. Free tool card moved (not duplicated) right after the short answer
check("prediction landing moves the existing marriage-path tool CTA", marriagePredictionLanding.leadToolCtaSlug === "marriage-path" &&
  /slug: +'marriage-path',/.test(prediction) && /type: +'tool',/.test(prediction));
check("TopicLandingLead renders afterAnswer directly after the direct-answer section",
  /<\/section>\n\s+\{afterAnswer\}\n\s+\{config\.primaryAction/.test(lead));
check("route renders the same CtaBlock in the lead and omits it from the bottom list",
  /const leadToolNode = leadToolCta && \(\n\s+<CtaBlock\n\s+cta=\{leadToolCta\}/.test(page) &&
  page.includes("<TopicLandingLead config={landing} locale={locale} afterAnswer={leadToolNode} />") &&
  /omitCtaSlugs: \[leadToolCta\.slug\]/.test(page));
check("renderer skips omitted CTA slugs and keeps original isPrimary index",
  /omitCtaSlugs\?\.includes\(cta\.slug\) \? null/.test(renderer) && /isPrimary=\{i === 0\}/.test(renderer));

// 4. Intercaste: report card moved (not duplicated) right after the short answer
const it = intercasteMarriageLanding.inlineTool!;
check("intercaste uses after-answer placement for the existing love-marriage ₹99 card",
  intercasteMarriageLanding.inlineToolPlacement === "after-answer" && it.kind === "contextual-report" &&
  it.reportSlug === "love_marriage_report" && it.ctaId === "intercaste_love_marriage_report_cta");
check("after-answer unit is removed from the article (no duplicate, no article row)",
  page.includes("const answerTool = editorial?.inlineToolPlacement === 'after-answer' ? articleTool : undefined") &&
  page.includes("const articleUnit = answerTool ? undefined : articleTool") &&
  /afterAnswer: <LandingInlineTool tool=\{answerTool\}/.test(page) &&
  page.includes("node: <LandingInlineTool tool={articleUnit} locale={locale} variant=\"editorial\" />") &&
  page.includes("articleUnit?.afterSectionId)"));
check("EditorialLead keeps the old markup when there is no afterAnswer",
  /return afterAnswer \? <div className="grid grid-cols-1 gap-4">\{answer\}\{afterAnswer\}<\/div> : answer/.test(editorial));
check("intercaste search title/meta untouched in P0 (no seoTitle)", !intercasteMarriageLanding.seoTitle);

// 5. Nothing else opted in
check("no other landing uses the new opt-ins",
  Object.entries(marriageTopicLandings).filter(([, l]) => l.leadToolCtaSlug || l.inlineToolPlacement).map(([s]) => s).sort().join() ===
  "intercaste-marriage,marriage-prediction");

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
