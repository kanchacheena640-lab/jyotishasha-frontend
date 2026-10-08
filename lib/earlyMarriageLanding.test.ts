/**
 * lib/earlyMarriageLanding.test.ts
 *
 * P4 Early Marriage landing regression guard. Standalone, repo convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/earlyMarriageLanding.test.ts
 *   node .ts-test-out/lib/earlyMarriageLanding.test.js
 *
 * Funnel: early-marriage guide -> EXISTING free Marriage Path tool (primary; no Dasha / D9 / age claims)
 * -> Marriage Report as a contextual card for a broader marriage outlook (never an early-marriage or
 * exact-age report). Data is imported directly; the topic file is checked as source text.
 */
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { toolsData } from "../app/data/toolsData";
import { earlyMarriageLanding, marriageTopicLandings } from "./domains/marriage-astrology/_landing";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const topic = src("lib/domains/marriage-astrology/topics/early-marriage.ts");
const landing = earlyMarriageLanding;
const action = landing.primaryAction;
const inline = landing.inlineTool;
const NO_TIMING_PROMISE = /exact (marriage )?age|when you will marry|marriage age|Dasha timing|D9 timing|Navamsa|timing indicators/i;

console.log("=== A. Primary action: the existing free Marriage Path tool ===");
check("landing registered for early-marriage", marriageTopicLandings["early-marriage"] === landing);
check("tool-led: no report card at the top", landing.offer === undefined);
check("primary action points at the existing /tools/marriage-path route",
  action.href === "/tools/marriage-path" && toolsData.some((t) => t.slug === "marriage-path") && src("app/data/toolContent/index.ts").includes('"marriage-path": marriagePathContent'));
check("CTA copy claims only what the tool computes (7th-house planets, Venus/Jupiter, Rahu with the 7th lord, strongest influence)",
  ["7th house", "Venus and Jupiter", "Rahu", "7th lord", "strongest influence"].every((w) => action.body.en.includes(w)) &&
  !NO_TIMING_PROMISE.test(action.body.en + action.heading.en + action.ctaLabel.en + action.eyebrow.en));
check("microcopy: no Dasha / marriage-age calculation (EN + HI)",
  /does not calculate Dasha periods or a marriage age/.test(action.microcopy.en) && /दशाओं या विवाह की उम्र की गणना नहीं/.test(action.microcopy.hi));
check("analytics ids", action.ctaId === "early_marriage_path_cta" && action.screenName === "early_marriage_topic");
check("bottom block keeps only the free tool CTA, relabelled without a timing promise; no bottom report CTA",
  topic.includes("label:          'Check Your Marriage Path',") && !topic.includes("Check Your Marriage Timing Indicators") &&
  /slug: +'marriage-path'/.test(topic) && !/type: +'report'/.test(topic));

console.log("\n=== B. Secondary: Marriage Report as a contextual card ===");
const report = reportsData.find((r) => r.slug === "marriage_report");
check("inline unit is a contextual-report card for marriage_report (catalogue rep_004, price from the catalogue)",
  inline?.kind === "contextual-report" && inline.reportSlug === "marriage_report" && report?.id === "rep_004" && typeof report.price === "number" && report.price > 0);
if (inline?.kind === "contextual-report") {
  check("placed after the timing section (which exists on the topic)", inline.afterSectionId === "timing-analysis" && topic.includes("id:       'timing-analysis',"));
  check("framed as a broader marriage outlook (EN + HI)",
    inline.heading.en === "Want a Broader Personalised Marriage Outlook?" && /व्यापक, व्यक्तिगत संभावनाएँ/.test(inline.heading.hi));
  check("never sold as an early-marriage / exact-age / when-will-I-marry report; states no exact age or date",
    !/early marriage report|exact marriage age report|when will i marry|early vs late/i.test(JSON.stringify(inline)) &&
    /does not give an exact marriage age or date/.test(inline.body.en) && /सटीक उम्र या तारीख नहीं/.test(inline.body.hi));
  check("names only real report sections; no D9 / Navamsa claim",
    ["7th house and its lord", "key planetary influences", "Dasha window", "practical guidance"].every((w) => inline.body.en.includes(w)) &&
    !/Navamsa|D9|नवांश/.test(JSON.stringify(inline)));
  check("CTA label uses the {price} placeholder", inline.ctaLabel.en.includes("{price}") && inline.ctaLabel.hi.includes("{price}") && !/₹\s*\d/.test(JSON.stringify(landing)));
  check("analytics ids", inline.ctaId === "early_marriage_report_cta" && inline.screenName === "early_marriage_topic");
}

console.log("\n=== C. Short answer ===");
const da = landing.directAnswer;
check("EN names the article's factors (7th house + lord, 2nd/5th/11th, Venus/Jupiter/Moon, early Dasha, Navamsa D9)",
  ["7th house and 7th lord", "2nd, 5th and 11th houses", "Venus, Jupiter and Moon", "Dasha periods", "Navamsa (D9)"].every((w) => da.en.includes(w)));
check("EN: no single placement guarantees it; 'early' is relative; tendency, not an age or date",
  /No single placement guarantees early marriage/.test(da.en) && /relative to the person’s chart/.test(da.en) && /not a fixed age or date/.test(da.en));
check("HI covers the same factors and limits",
  ["सप्तम भाव और सप्तमेश", "द्वितीय, पंचम और एकादश", "शुक्र, गुरु और चंद्रमा", "दशाएँ", "नवांश (D9)", "गारंटी नहीं", "तय उम्र या तारीख नहीं"].every((w) => da.hi.includes(w)));
check("short answer contains no sales copy", !/report|₹|price|buy|रिपोर्ट/i.test(da.en + da.hi));

console.log("\n=== D. Related links ===");
const ctx = landing.contextLinks;
check("context links: marriage-timing / delayed-marriage; overview marriage-prediction",
  JSON.stringify(ctx.topicSlugs) === '["marriage-timing","delayed-marriage"]' && ctx.overviewSlug === "marriage-prediction");
check("every context link exists and is not the page itself",
  [...ctx.topicSlugs, ctx.overviewSlug].every((s) => s !== "early-marriage" && fs.existsSync(path.join(root, `lib/domains/marriage-astrology/topics/${s}.ts`))));
check("ssrFaq + longForm on, no video", landing.ssrFaq === true && landing.longForm === true && landing.video === undefined);

console.log("\n=== E. Page identity and metadata ===");
check("title / H1 unchanged (EN + HI)",
  topic.includes("title:      'Early Marriage in Vedic Astrology',") && topic.includes("title_hi:   'वैदिक ज्योतिष में प्रारंभिक विवाह',"));
check("canonical path unchanged", topic.includes("canonicalPath: '/marriage-astrology/early-marriage',"));
const enMeta = (topic.match(/metaDescription: '([^']+)'/) || [, ""])[1] as string;
check("EN meta keeps its search intent without 'destined'", /indicators traditionally associated with early marriage/.test(enMeta) && /Dasha timing/.test(enMeta) && !/destined/i.test(enMeta));
const hiMeta = (topic.match(/metaDescription_hi: '([^']+)'/) || [, ""])[1] as string;
check("Hindi meta present and informational", hiMeta.length >= 80 && /जल्दी विवाह के योग/.test(hiMeta) && !/रिपोर्ट|₹/.test(hiMeta));
check("hero subtext no longer says astrology 'determines' early marriage or 'destined' (EN + HI)",
  !/determines early marriage|destined early union/.test(topic) && !/निर्धारित करता है — और एक नियत/.test(topic));
const ids = [...topic.matchAll(/\n {8}id: {7}'([a-z0-9-]+)',/g)].map((m) => m[1]);
check("sections unchanged in number and order (no consolidation needed)",
  JSON.stringify(ids) === '["intro","key-houses","planetary-influences","timing-analysis","destined-vs-immature","guidance-remedies","misconceptions","faqs"]');
check("house / planet / Dasha / D9 / Darakaraka depth kept",
  ["id:       'house-7th'", "id:       'house-2nd'", "id:       'house-5th'", "id:       'house-11th'", "id:       'planet-venus'", "id:       'planet-jupiter'", "id:       'planet-moon'", "id:       'planet-mars'", "id:       'timing-dasha'", "id:       'timing-navamsa'", "id:       'timing-darakaraka'"].every((w) => topic.includes(w)));

console.log("\n=== F. Deterministic / timing wording (EN) ===");
for (const [label, re] of [
  ["no 'practically guaranteed'", /practically guaranteed/],
  ["no 'natural, inevitable karmic result'", /inevitable/],
  ["no 'must be inherently strong' / 'must be strong' preconditions", /must be (inherently )?strong|must also be strong|must be robust|must confirm/],
  ["no 'cannot produce early marriage'", /cannot produce early marriage/],
  ["no 'most potent single indicator' / 'most vital indicator'", /most potent single indicator|most vital indicator/],
  ["no 'will be stalled' / 'decisive factor'", /will be stalled|decisive factor/],
  ["no 'karmically destined' / 'part of the karmic design' / 'Karmic Destiny' heading", /karmically destined|part of the karmic design|Karmic Destiny|Destined Early Marriage/],
  ["no 'by karmic design' / 'premature marriage, not destined marriage'", /by karmic design|not destined marriage/],
  ["no 'reliably predicted'", /reliably predicted/],
] as [string, RegExp][]) check(label, !re.test(topic));
check("age threshold framed as a convention, not a prediction (section + FAQ)",
  /As a general convention — not a prediction — early marriage is often taken to mean a union before about 24 or 25/.test(topic) &&
  /This is a traditional heuristic, not a prediction of anyone’s age at marriage\./.test(topic));
check("explicit: absence of early-marriage indicators does not by itself mean a delay",
  /the absence of early-marriage indicators does not by itself mean a delay/.test(topic));

console.log("\n=== G. FAQ ===");
const faqIds = [...topic.matchAll(/\n {12}id: {7}'(faq-[a-z0-9-]+)',/g)].map((m) => m[1]);
check("FAQ count preserved (10)", faqIds.length === 10);
check("'destined' questions reframed", !topic.includes("Is early marriage destined for everyone with a strong 7th house?") && !topic.includes("How can I know if my early marriage is \"destined\"?"));
const rewritten = ["Does a strong 7th house mean early marriage?", "Can one yoga or planet guarantee early marriage?"];
check("reframed questions present", rewritten.every((q) => topic.includes(`label:    '${q}',`)));
const others = fs.readdirSync(path.join(root, "lib/domains/marriage-astrology/topics")).filter((f) => f !== "early-marriage.ts")
  .map((f) => src(`lib/domains/marriage-astrology/topics/${f}`)).join("\n");
check("reframed questions are unique across the marriage cluster", rewritten.every((q) => !others.includes(`'${q}'`)));

console.log("\n=== H. Hindi cleanup ===");
check("no literal-translation markers left (उत्प्रेरक / संरेखण / संरेखित / अंशांकन / चैनल / खिड़की / वादा / ब्लूप्रिंट / समझौता किया / सीट / नियत / निश्चित है / पापी / उपापद)",
  !/उत्प्रेरक|संरेखण|संरेखित|अंशांकन|चैनल|खिड़की|वादा|वादे|ब्लूप्रिंट|समझौता किया|सीट|नियत|निश्चित है|पापी|आशाजनक|स्थिरीकरण|रद्दीकरण|उपापद/.test(topic));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
