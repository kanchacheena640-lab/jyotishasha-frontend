/**
 * lib/compatibilityLanding.test.ts
 *
 * P1 Compatibility landing regression guard. Standalone, repo convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/compatibilityLanding.test.ts
 *   node .ts-test-out/lib/compatibilityLanding.test.js
 *
 * Funnel: compatibility guide -> EXISTING free Kundli Matching calculator (/love) -> result pages
 * (which already offer the Relationship Future Report). Data is imported directly; pages, components
 * and the topic file (path aliases) are checked as source text.
 */
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { getReportProductPath } from "./reportProductSeo";
import { compatibilityLanding, marriageTopicLandings } from "./domains/marriage-astrology/_landing";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const topic = src("lib/domains/marriage-astrology/topics/compatibility.ts");
const action = compatibilityLanding.primaryAction;

console.log("=== A. Tool-led landing -> existing calculator ===");
check("landing registered for compatibility", marriageTopicLandings["compatibility"] === compatibilityLanding);
check("tool-led: no report card in the hero (the free calculator leads; paid step after the result or the Ashtakoota section)", compatibilityLanding.offer === undefined);
check("primary action points at the existing Kundli Matching calculator route (/love)",
  action.href === "/love" && fs.existsSync(path.join(root, "app/[locale]/love/page.tsx")));
check("/love is the Kundli Matching / Guna Milan calculator (its own metadata)",
  /Free Kundli Matching for Marriage – 36 Guna Milan Calculator/.test(src("app/[locale]/love/page.tsx")));
check("calculator collects both partners' birth details and opens /love/result",
  /boy: \{ name: "", dob: "", tob: "", pob: ""/.test(src("app/[locale]/love/LoveForm.tsx")) &&
  /girl: \{ name: "", dob: "", tob: "", pob: ""/.test(src("app/[locale]/love/LoveForm.tsx")) &&
  src("app/[locale]/love/LoveForm.tsx").includes("/love/result"));
check("CTA copy: EN + HI, no hard-coded price",
  action.ctaLabel.en === "Check Compatibility — Free" && action.ctaLabel.hi === "फ्री में अनुकूलता जाँचें" &&
  !/₹\s*\d/.test(JSON.stringify(compatibilityLanding)));
check("analytics ids follow the existing convention", action.ctaId === "compatibility_kundli_matching_cta" && action.screenName === "compatibility_topic");
const card = src("components/authority-engine/landing/LeadPrimaryAction.tsx");
check("primary action card: localised href (/hi prefix) and WebsiteEvents.ctaClick on click",
  card.includes("const href = `${locale === 'hi' ? '/hi' : ''}${action.href}`") && card.includes("WebsiteEvents.ctaClick(action.ctaId, action.screenName)"));

console.log("\n=== B. Existing paid step after the free result (preserved, not changed) ===");
const rel = reportsData.find((r) => r.slug === "relationship_future_report");
check("relationship_future_report exists in the catalogue (price comes from the catalogue)", !!rel && typeof rel.price === "number" && rel.price > 0);
check("result summary offers the report after the free result (one real link, locale-aware)",
  src("app/[locale]/love/result/LoveResultSummaryDetail.tsx").includes("href={`${lp}/love/report/relationship_future_report`}"));
check("Ashtakoot detail page offers the report",
  src("app/[locale]/love/matchmaking-compatibility/MatchmakingCompatibilityDetail.tsx").includes("/love/report/relationship_future_report"));

console.log("\n=== C. Short answer (compatibility is broader than a Guna score) ===");
const da = compatibilityLanding.directAnswer;
check("EN names Guna Milan, Ashtakoota, Nadi, Bhakoot, Graha Maitri, Mangal Dosha, Moon, 7th house + lord, Venus/Jupiter, Navamsa",
  ["Guna Milan", "Ashtakoota", "Nadi", "Bhakoot", "Graha Maitri", "Mangal Dosha", "Moon", "7th house and its lord", "Venus and Jupiter", "Navamsa (D9)"].every((w) => da.en.includes(w)));
check("EN (Editorial V1): the score is the starting point, the full two-chart reading decides — stated positively",
  /broader than a single Guna Milan score/.test(da.en) &&
  /The Guna score is the starting point; the full reading of both charts shows how well the two of you fit together\./.test(da.en) &&
  !/not a verdict|does not by itself/.test(da.en));
check("HI covers the same factors and the same positive ending",
  ["गुण मिलान", "अष्टकूट", "नाड़ी", "भकूट", "ग्रह मैत्री", "मंगल दोष", "चंद्रमा", "सप्तम भाव और सप्तमेश", "शुक्र और गुरु", "नवांश (D9)", "गुण मिलान का स्कोर शुरुआत है"].every((w) => da.hi.includes(w)) &&
  !/अंतिम फैसला नहीं/.test(da.hi));
check("short answer contains no sales copy", !/report|₹|price|buy|रिपोर्ट/i.test(da.en + da.hi));

console.log("\n=== D. Related questions ===");
const ctx = compatibilityLanding.contextLinks;
check("context links: married-life / spouse-nature / love-marriage / arranged-marriage; overview marriage-prediction",
  JSON.stringify(ctx.topicSlugs) === '["married-life","spouse-nature","love-marriage","arranged-marriage"]' && ctx.overviewSlug === "marriage-prediction");
check("every context link exists and is not the page itself",
  [...ctx.topicSlugs, ctx.overviewSlug].every((s) => s !== "compatibility" && fs.existsSync(path.join(root, `lib/domains/marriage-astrology/topics/${s}.ts`))));
check("editorial template on; ssrFaq + longForm kept", compatibilityLanding.theme === "editorial" && compatibilityLanding.ssrFaq === true && compatibilityLanding.longForm === true);
check("one video (_BEtbbOlCOQ) inside the article after the opening section; tracking id kept; no after-lead card",
  compatibilityLanding.video?.youtubeId === "_BEtbbOlCOQ" && compatibilityLanding.video.articleSectionId === "introduction" &&
  compatibilityLanding.video.playFeatureName === "compatibility_video_play" && compatibilityLanding.video.desktopCtaFirst === undefined &&
  compatibilityLanding.inlineVideo === undefined && /\(in Hindi\)/.test(compatibilityLanding.video.caption.en));

console.log("\n=== D2. Secondary: Relationship Future Report card after the Ashtakoota section ===");
const inline = compatibilityLanding.inlineTool;
check("contextual-report card for relationship_future_report (rep_025, price from the catalogue) after kundli-matching-system",
  inline?.kind === "contextual-report" && inline.reportSlug === "relationship_future_report" && rel?.id === "rep_025" &&
  inline.afterSectionId === "kundli-matching-system" && topic.includes("id:       'kundli-matching-system',"));
if (inline?.kind === "contextual-report") {
  check("card names only what the sample shows (kootas, both 5th/7th houses, Venus, Dasha) — no D9 / Navamsa / Mangal claim",
    ["every koota of your Ashtakoot match", "5th and 7th houses", "Venus", "Dasha"].every((w) => inline.body.en.includes(w)) &&
    !/Navamsa|D9|Mangal|Manglik|नवांश|मंगल|मांगलिक/.test(JSON.stringify(inline)));
  check("CTA label uses the {price} placeholder (EN + HI)", inline.ctaLabel.en.includes("{price}") && inline.ctaLabel.hi.includes("{price}"));
  check("new analytics id for the card", inline.ctaId === "compatibility_relationship_future_report_cta" && inline.screenName === "compatibility_topic");
}
check("the card links to the real, locale-aware product page (getReportProductPath)",
  src("components/authority-engine/landing/LandingInlineTool.tsx").includes("reportHref={getReportProductPath(tool.reportSlug, locale)}") &&
  getReportProductPath("relationship_future_report", "hi") === "/hi/love/report/relationship_future_report" &&
  getReportProductPath("relationship_future_report", "en") === "/love/report/relationship_future_report" &&
  ["love_marriage_report", "marriage_report", "problem_in_marriage_report"].every((s) => getReportProductPath(s, "hi") === `/reports/${s}`));

console.log("\n=== E. Page identity and content protected ===");
check("title / H1 = approved question-led Editorial V1 title (EN + HI)",
  topic.includes("title:      'Marriage Compatibility in Vedic Astrology: How Compatible Are We?',") &&
  topic.includes("title_hi:   'वैदिक ज्योतिष में विवाह अनुकूलता: हम दोनों की अनुकूलता कितनी है?',"));
check("EN meta = approved Editorial V1 text",
  topic.includes("metaDescription: 'How compatible are you as a couple? See how Vedic astrology reads marriage compatibility — Guna Milan and the eight kootas, Mangal Dosha, the Moon, the 7th house, Venus, Jupiter and the Navamsa (D9).',"));
check("subtitle rewritten (EN + HI)",
  topic.includes("subtext:     'How two birth charts are read together for marriage") && topic.includes("subtext_hi:  'विवाह के लिए दो जन्मकुंडलियों को साथ कैसे पढ़ा जाता है"));
check("Article schema dates: datePublished 2026-07-20, lastUpdated 2026-11-05",
  topic.includes("datePublished: '2026-07-20',") && topic.includes("lastUpdated:    '2026-11-05',"));
const hiMeta = (topic.match(/metaDescription_hi: '([^']+)'/) || [, ""])[1] as string;
check("Hindi meta: leads with the question, informational, no report/price",
  hiMeta.length >= 80 && hiMeta.startsWith("हम दोनों की अनुकूलता कितनी है?") && /गुण मिलान/.test(hiMeta) && /अष्टकूट/.test(hiMeta) && !/रिपोर्ट|₹/.test(hiMeta));
const ids = [...topic.matchAll(/\n {8}id: {7}'([a-z0-9-]+)',/g)].map((m) => m[1]);
check("content sections unchanged (same 8 sections, same order)",
  JSON.stringify(ids) === '["introduction","kundli-matching-system","key-house-analysis","planetary-influences","advanced-tools","compatibility-dimensions","myths-remedies-ethics","faqs"]');
check("Ashtakoota depth kept (Guna Milan, Mangal, Bhakoot, Nadi, Yoni, Graha Maitri, Tara present)",
  ["'Guna Milan'", "'Mangal Dosha Compatibility'", "'Bhakoot Dosha'", "'Nadi Dosha'", "'Yoni Matching'", "'Graha Maitri'", "'Tara Matching'"].every((w) => topic.includes(w)));
check("all 10 FAQs kept", (topic.match(/id: {7}'faq-\d+'/g) || []).length === 10);
check("opening section: descriptive heading and plain opening (EN + HI)",
  topic.includes("title:    'What Marriage Compatibility Means in Jyotisha',") && topic.includes("title_hi: 'ज्योतिष में विवाह अनुकूलता का अर्थ',") &&
  /body: {5}'In Vedic astrology \(Jyotisha\), marriage is one of the most important Samskaras/.test(topic) &&
  !/is a profound system designed to understand the karmic blueprints|डिज़ाइन की गई एक गहन प्रणाली/.test(topic));
check("health / longevity koota readings framed as tradition (Nadi, Tara, Mahendra / Stree Deergha)",
  /It is traditionally linked with health and children/.test(topic) && /is traditionally read for the well-being of the partnership/.test(topic) &&
  /Stree Deergha is traditionally associated with the stability of the family structure/.test(topic) &&
  !/procreative potential|focusing on health, longevity|longevity of the partner/.test(topic));
check("FAQ 3 no longer a flat 'Yes'", /id: {7}'faq-3',[\s\S]*?body: {5}'It adds depth\./.test(topic));
check("FAQ 8 = Mangal Dosha across both charts (EN + HI)",
  /id: {7}'faq-8',\s*\n\s*label: {4}'Does Mangal Dosha in one chart stop a match\?',/.test(topic) && topic.includes("label_hi: 'क्या एक कुंडली में मंगल दोष मिलान को रोक देता है?',") &&
  !topic.includes("Can astrology tell if I will have a love or arranged marriage?"));
check("FAQ 10 = guna bands: contiguous, non-overlapping (below 18 / 18–24 / above 24 to 32 / above 32), score alone not decisive",
  /id: {7}'faq-10',\s*\n\s*label: {4}'How many gunas should match for marriage\?',/.test(topic) &&
  topic.includes("below 18 calls for a careful review of both charts; 18 to 24 is considered average; above 24 and up to 32 is good; above 32 is excellent.") &&
  topic.includes("The score alone does not decide compatibility") &&
  topic.includes("18 से कम होने पर") && topic.includes("24 से अधिक और 32 तक अच्छा") && topic.includes("32 से अधिक उत्तम") &&
  !topic.includes("Is compatibility analysis the same as predicting marriage success?"));

console.log("\n=== F. Hindi cleanup + bottom CTAs ===");
check("no literal-translation markers left (नेविगेट / ज्योतिषा / संरेखण / संरेखित / अनुनाद / गतिशीलता)",
  !/नेविगेट|ज्योतिषा|संरेखण|संरेखित|अनुनाद|गतिशीलता/.test(topic));
check("separate Mangal Dosh tool CTA removed (the free match result already includes the check)",
  !/slug: {11}'mangal-dosh'/.test(topic) && !topic.includes("Also Check Manglik Dosha"));
check("Relationship Future Report CTA kept in topic data (minimum-one-CTA contract) and shown once: the in-article card (editorial renders no bottom CTAs)",
  (topic.match(/slug: {11}'relationship_future_report'/g) || []).length === 1 && compatibilityLanding.theme === "editorial" &&
  compatibilityLanding.inlineTool?.reportSlug === "relationship_future_report");
check("Summary uses reader-focused wording (no 'karmic blueprints' left, EN + HI)",
  !/karmic blueprints|कार्मिक खाकों/.test(topic) &&
  topic.includes("Assessing compatibility through Jyotisha helps two people understand how their charts work together.") &&
  topic.includes("ज्योतिष के माध्यम से अनुकूलता का आकलन दो लोगों को यह समझने में मदद करता है कि उनकी कुंडलियाँ साथ मिलकर कैसे काम करती हैं।"));
check("existing /love cross-link kept", topic.includes("label:    'Free Kundli Matching (Guna Milan)',"));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
