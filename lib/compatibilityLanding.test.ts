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
check("tool-led: no report card on the page (paid step lives after the free result)", compatibilityLanding.offer === undefined);
check("primary action points at the existing Kundli Matching calculator route (/love)",
  action.href === "/love" && fs.existsSync(path.join(root, "app/[locale]/love/page.tsx")));
check("/love is the Kundli Matching / Guna Milan calculator (its own metadata)",
  /Free Kundli Matching for Marriage \| Love Compatibility & Guna Milan/.test(src("app/[locale]/love/page.tsx")));
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
check("result summary offers the report after the free result",
  src("app/[locale]/love/result/LoveResultSummaryDetail.tsx").includes('go("/love/report/relationship_future_report")'));
check("Ashtakoot detail page offers the report",
  src("app/[locale]/love/matchmaking-compatibility/MatchmakingCompatibilityDetail.tsx").includes("/love/report/relationship_future_report"));

console.log("\n=== C. Short answer (compatibility is broader than a Guna score) ===");
const da = compatibilityLanding.directAnswer;
check("EN names Guna Milan, Ashtakoota, Nadi, Bhakoot, Graha Maitri, Mangal Dosha, Moon, 7th house + lord, Venus/Jupiter, Navamsa",
  ["Guna Milan", "Ashtakoota", "Nadi", "Bhakoot", "Graha Maitri", "Mangal Dosha", "Moon", "7th house and its lord", "Venus and Jupiter", "Navamsa (D9)"].every((w) => da.en.includes(w)));
check("EN: a score is not a verdict", /broader than a single Guna Milan score/.test(da.en) && /not a verdict on its own/.test(da.en));
check("HI covers the same factors and limit",
  ["गुण मिलान", "अष्टकूट", "नाड़ी", "भकूट", "ग्रह मैत्री", "मंगल दोष", "चंद्रमा", "सप्तम भाव और सप्तमेश", "शुक्र और गुरु", "नवांश (D9)", "अंतिम फैसला नहीं"].every((w) => da.hi.includes(w)));
check("short answer contains no sales copy", !/report|₹|price|buy|रिपोर्ट/i.test(da.en + da.hi));

console.log("\n=== D. Related questions ===");
const ctx = compatibilityLanding.contextLinks;
check("context links: married-life / spouse-nature / love-marriage / arranged-marriage; overview marriage-prediction",
  JSON.stringify(ctx.topicSlugs) === '["married-life","spouse-nature","love-marriage","arranged-marriage"]' && ctx.overviewSlug === "marriage-prediction");
check("every context link exists and is not the page itself",
  [...ctx.topicSlugs, ctx.overviewSlug].every((s) => s !== "compatibility" && fs.existsSync(path.join(root, `lib/domains/marriage-astrology/topics/${s}.ts`))));
check("ssrFaq + longForm on, no video", compatibilityLanding.ssrFaq === true && compatibilityLanding.longForm === true && compatibilityLanding.video === undefined);

console.log("\n=== E. Page identity and content protected ===");
check("title / H1 unchanged (EN + HI)",
  topic.includes("title:      'Compatibility in Vedic Astrology: Complete Guide',") && topic.includes("title_hi:   'वैदिक ज्योतिष में अनुकूलता',"));
check("EN meta unchanged", topic.includes("metaDescription: 'Explore Vedic compatibility through Kundli matching, Ashtakoota, Navamsa, and Dasha cycles — a complete guide to karmic alignment and marital harmony.',"));
const hiMeta = (topic.match(/metaDescription_hi: '([^']+)'/) || [, ""])[1] as string;
check("Hindi meta present and informational", hiMeta.length >= 80 && /कुंडली मिलान/.test(hiMeta) && /गुण मिलान/.test(hiMeta) && !/रिपोर्ट|₹/.test(hiMeta));
const ids = [...topic.matchAll(/\n {8}id: {7}'([a-z0-9-]+)',/g)].map((m) => m[1]);
check("content sections unchanged (same 8 sections, same order)",
  JSON.stringify(ids) === '["introduction","kundli-matching-system","key-house-analysis","planetary-influences","advanced-tools","compatibility-dimensions","myths-remedies-ethics","faqs"]');
check("Ashtakoota depth kept (Guna Milan, Mangal, Bhakoot, Nadi, Yoni, Graha Maitri, Tara present)",
  ["'Guna Milan'", "'Mangal Dosha Compatibility'", "'Bhakoot Dosha'", "'Nadi Dosha'", "'Yoni Matching'", "'Graha Maitri'", "'Tara Matching'"].every((w) => topic.includes(w)));
check("all 10 FAQs kept", (topic.match(/id: {7}'faq-\d+'/g) || []).length === 10);

console.log("\n=== F. Hindi cleanup + bottom CTAs ===");
check("no literal-translation markers left (नेविगेट / ज्योतिषा / संरेखण / संरेखित / अनुनाद / गतिशीलता)",
  !/नेविगेट|ज्योतिषा|संरेखण|संरेखित|अनुनाद|गतिशीलता/.test(topic));
check("Mangal Dosha is a secondary 'also check' CTA, not the primary compatibility action",
  topic.includes("label:          'Also Check Manglik Dosha',") && topic.includes("variant:        'secondary',") && !topic.includes("label:          'Check Manglik Dosha',"));
check("existing Relationship Future Report CTA kept", /slug: {11}'relationship_future_report'/.test(topic));
check("existing /love cross-link kept", topic.includes("label:    'Free Kundli Matching (Guna Milan)',"));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
