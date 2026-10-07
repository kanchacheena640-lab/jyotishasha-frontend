/**
 * lib/intercasteMarriageLanding.test.ts
 *
 * P3 Intercaste Marriage landing regression guard. Standalone, repo convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/intercasteMarriageLanding.test.ts
 *   node .ts-test-out/lib/intercasteMarriageLanding.test.js
 *
 * Funnel: intercaste guide -> EXISTING free Marriage Path tool (primary). The Love Marriage Report is a
 * contextual card for readers interested in love-marriage tendency only -- it is never presented as an
 * intercaste / caste / family-acceptance reading. Data is imported directly; the topic file and
 * components are checked as source text.
 */
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { toolsData } from "../app/data/toolsData";
import { intercasteMarriageLanding, marriageTopicLandings } from "./domains/marriage-astrology/_landing";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const topic = src("lib/domains/marriage-astrology/topics/intercaste-marriage.ts");
const landing = intercasteMarriageLanding;
const action = landing.primaryAction;
const inline = landing.inlineTool;

console.log("=== A. Primary action: the existing free Marriage Path tool ===");
check("landing registered for intercaste-marriage", marriageTopicLandings["intercaste-marriage"] === landing);
check("tool-led: no report card at the top", landing.offer === undefined);
check("primary action points at the existing /tools/marriage-path route (toolsData + tool content map)",
  action.href === "/tools/marriage-path" && toolsData.some((t) => t.slug === "marriage-path") &&
  src("app/data/toolContent/index.ts").includes('"marriage-path": marriagePathContent') && fs.existsSync(path.join(root, "app/[locale]/tools/[toolId]/page.tsx")));
check("CTA copy claims only what the tool reads (7th house occupants, Venus/Jupiter, dominant planet, Rahu with the 7th lord)",
  ["7th house", "Venus and Jupiter", "strongest influence", "Rahu", "7th lord"].every((w) => action.body.en.includes(w)) &&
  !/Navamsa|D9|Dasha|caste|family|timing/i.test(action.body.en + action.heading.en + action.ctaLabel.en));
check("microcopy states the tool does not assess caste or family acceptance (EN + HI)",
  /does not assess caste or family acceptance/.test(action.microcopy.en) && /जाति या पारिवारिक स्वीकृति का आकलन नहीं/.test(action.microcopy.hi));
check("free, no price in the primary action", /Free/.test(action.ctaLabel.en) && !/₹/.test(JSON.stringify(action)));
check("analytics ids", action.ctaId === "intercaste_marriage_path_cta" && action.screenName === "intercaste_marriage_topic");
check("bottom block keeps only the free tool CTA (with accurate copy); no bottom report CTA",
  /slug: +'marriage-path'/.test(topic) && !/type: +'report'/.test(topic) &&
  topic.includes("description:    'A free check of your 7th house — the planets placed there, Venus and Jupiter, and the strongest influence on your marriage.',"));

console.log("\n=== B. Secondary: Love Marriage Report as a contextual card only ===");
const love = reportsData.find((r) => r.slug === "love_marriage_report");
check("inline unit is a contextual-report card for love_marriage_report (catalogue rep_006, price from the catalogue)",
  inline?.kind === "contextual-report" && inline.reportSlug === "love_marriage_report" && love?.id === "rep_006" && typeof love.price === "number" && love.price > 0);
if (inline?.kind === "contextual-report") {
  check("placed after the love-vs-intercaste comparison (which exists on the topic)",
    inline.afterSectionId === "love-vs-intercaste" && topic.includes("id: 'love-vs-intercaste',"));
  check("framed as love-marriage tendency (heading EN + HI)",
    inline.heading.en === "Want to Understand Your Love-Marriage Tendency?" && /प्रेम विवाह की प्रवृत्ति/.test(inline.heading.hi));
  check("never presented as an intercaste / caste / family-acceptance report",
    !/intercaste (marriage )?report|will i marry outside|will my family|intercaste prediction/i.test(JSON.stringify(inline)) &&
    /does not assess caste, intercaste indications or family acceptance/.test(inline.body.en) && /आकलन नहीं करती/.test(inline.body.hi));
  check("names only what the report reads (5th house, 7th house, the link, Venus / Mars / Jupiter)",
    ["5th house", "7th house", "the link between them", "Venus, Mars and Jupiter"].every((w) => inline.body.en.includes(w)));
  check("CTA label uses the {price} placeholder", inline.ctaLabel.en.includes("{price}") && inline.ctaLabel.hi.includes("{price}") && !/₹\s*\d/.test(JSON.stringify(landing)));
  check("analytics ids", inline.ctaId === "intercaste_love_marriage_report_cta" && inline.screenName === "intercaste_marriage_topic");
}

console.log("\n=== C. Short answer ===");
const da = landing.directAnswer;
check("EN: traditional association, Rahu/Ketu + 7th, 5th–7th link, 9th house, Navamsa (D9), Dasha",
  /traditionally links certain combinations/.test(da.en) && ["Rahu or Ketu", "7th house", "5th house", "9th house", "Navamsa (D9)", "Dasha"].every((w) => da.en.includes(w)));
check("EN: no single planet or yoga proves it; no caste identity; no family-acceptance verdict",
  /No single planet or yoga proves an intercaste marriage/.test(da.en) && /does not show anyone’s caste/.test(da.en) && /cannot say whether a family will accept/.test(da.en));
check("HI covers the same factors and limits",
  ["राहु या केतु", "पंचम भाव", "नवम भाव", "नवांश (D9)", "दशा", "कोई एक ग्रह या योग", "जाति नहीं बताती", "स्वीकार करेगा या नहीं"].every((w) => da.hi.includes(w)));
check("short answer contains no sales copy", !/report|₹|price|buy|रिपोर्ट/i.test(da.en + da.hi));

console.log("\n=== D. Related links ===");
const ctx = landing.contextLinks;
check("context links: love-marriage / arranged-marriage; overview marriage-prediction",
  JSON.stringify(ctx.topicSlugs) === '["love-marriage","arranged-marriage"]' && ctx.overviewSlug === "marriage-prediction");
check("every context link exists and is not the page itself",
  [...ctx.topicSlugs, ctx.overviewSlug].every((s) => s !== "intercaste-marriage" && fs.existsSync(path.join(root, `lib/domains/marriage-astrology/topics/${s}.ts`))));
check("ssrFaq + longForm on, no video", landing.ssrFaq === true && landing.longForm === true && landing.video === undefined);

console.log("\n=== E. Page identity and structure ===");
check("title / H1 unchanged (EN + HI)",
  topic.includes("title:      'Intercaste Marriage in Vedic Astrology: Karmic Analysis',") && topic.includes("title_hi:   'वैदिक ज्योतिष में अंतरजातीय विवाह: एक कार्मिक विश्लेषण',"));
check("canonical path and EN meta unchanged",
  topic.includes("canonicalPath: '/marriage-astrology/intercaste-marriage',") &&
  topic.includes("metaDescription: 'Understand the astrological promise of intercaste marriage in Vedic Astrology. Explore planetary influences, house analysis, and karmic timing.',"));
const hiMeta = (topic.match(/metaDescription_hi: '([^']+)'/) || [, ""])[1] as string;
check("Hindi meta present and informational", hiMeta.length >= 80 && /अंतरजातीय विवाह/.test(hiMeta) && /राहु/.test(hiMeta) && !/रिपोर्ट|₹/.test(hiMeta));
const ids = [...topic.matchAll(/\n {8}id: '([a-z0-9-]+)',/g)].map((m) => m[1]);
check("sections: the two one-item timing sections merged (Dasha + Transit); every other section kept in order",
  JSON.stringify(ids) === '["what-is-intercaste-marriage","astrological-promise-vs-reality","key-house-analysis","planetary-influences","advanced-indicators","dasha-analysis","astrological-combinations","family-opposition-acceptance","love-vs-intercaste","common-misconceptions","practical-remedies","ethical-interpretation","summary","faq-section"]');
check("merged timing section holds both items (dasha-timing, transit-trigger)",
  /id: 'dasha-analysis',\r?\n\s+title: 'Dasha and Transit Timing',[\s\S]*?id: 'dasha-timing'[\s\S]*?id: 'transit-trigger'[\s\S]*?\]\r?\n {6}\},\r?\n {6}\{\r?\n {8}id: 'astrological-combinations'/.test(topic));
check("house / planet / D9 depth kept",
  ["id: '2nd-house'", "id: '5th-house'", "id: '7th-house'", "id: '8th-house'", "id: '9th-house'", "id: '11th-house'", "id: 'rahu'", "id: 'ketu'", "id: 'venus'", "id: 'navamsa'", "id: 'darakaraka'", "id: 'upapada'"].every((w) => topic.includes(w)));

console.log("\n=== F. Safety wording (EN) ===");
for (const [label, re] of [
  ["no 'family friction is inevitable'", /friction is inevitable/],
  ["no 'destined to conflict'", /destined to conflict/],
  ["no 'will occur regardless of opposition'", /will occur regardless of opposition/],
  ["no 'must be' preconditions for an intercaste union", /the (7th|9th) house must (be|either)/],
  ["no 'essential for breaking the rules'", /essential for breaking the rules/],
  ["no 'primary catalyst' / 'most common planetary signature' certainty for Rahu", /primary catalyst|most common planetary signature/],
  ["no 'will only manifest' / 'validates a marriage'", /will only manifest|validates a marriage/],
  ["no 'the spouse will come from' / 'will defy'", /spouse will come from|will defy/],
  ["no 'undisputed' / 'ensuring the couple' / 'collapses under'", /undisputed|ensuring the couple|collapses under/],
  ["no 'karmic necessity' framing", /karmic necessity/],
] as [string, RegExp][]) check(label, !re.test(topic));
check("explicitly: a horoscope does not reveal caste (intro + 9th house)",
  /a horoscope does not reveal anyone’s caste/.test(topic) && /though it does not reveal a person’s caste/.test(topic));
check("explicitly: a chart cannot tell how a specific family will respond (family section + 2nd house + misconception)",
  /a chart cannot tell how a specific family will respond/.test(topic) && /How a particular family actually responds, however, depends on the people involved/.test(topic) &&
  /not a specific family’s decision/.test(topic));

console.log("\n=== G. FAQ ===");
const faqLabels = [...topic.matchAll(/\{ id: 'faq-\d+', label: '((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]);
check("FAQ count preserved (10)", faqLabels.length === 10);
check("unsafe / off-intent questions replaced (chart-reading certainty, destiny vs opposition, Dasha timing)",
  !topic.includes("How can I tell if my marriage will be intercaste just by looking at my chart?") &&
  !topic.includes("Does parental opposition affect destiny?") && !topic.includes("Does Dasha analysis really tell me when I will marry?"));
const rewritten = [
  "Can a horoscope show whether my marriage will be intercaste?",
  "Can astrology tell whether my family will accept my partner?",
  "Is every intercaste marriage a love marriage in astrology?",
];
check("faq-1 / faq-2 / faq-8 are intercaste-specific replacements", JSON.stringify([faqLabels[0], faqLabels[1], faqLabels[7]]) === JSON.stringify(rewritten));
const others = fs.readdirSync(path.join(root, "lib/domains/marriage-astrology/topics")).filter((f) => f !== "intercaste-marriage.ts")
  .map((f) => src(`lib/domains/marriage-astrology/topics/${f}`)).join("\n");
check("replacement questions are unique across the marriage cluster", rewritten.every((q) => !others.includes(`'${q}'`)));
check("Rahu FAQ answers 'No' (not a guarantee)", /id: 'faq-10'[^\n]*body: 'No\. It is one of the most commonly cited indicators/.test(topic));

console.log("\n=== H. Hindi cleanup ===");
check("no literal-translation markers left (ओवरराइड / डिस्कनेक्ट / कष्टप्रद / निपटानकर्ता / त्वरक / स्टेबलाइजर / नेविगेट / अनुनाद / प्रतिध्वनि / जनादेश / वादा / प्लेसमेंट / ट्रिगर / कर लगाने)",
  !/ओवरराइड|डिस्कनेक्ट|कष्टप्रद|निपटानकर्ता|त्वरक|स्टेबलाइजर|नेविगेट|अनुनाद|प्रतिध्वनि|जनादेश|वादा|वादे|प्लेसमेंट|ट्रिगर|कर लगाने/.test(topic));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
