/**
 * lib/spouseLagnaTool.test.ts
 *
 * MC-04 -- Spouse Nature "Lagna -> 7th-house sign" mini-tool guard. Standalone, repo convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/spouseLagnaTool.test.ts
 *   node .ts-test-out/lib/spouseLagnaTool.test.js
 *
 * DRIFT PROTECTION
 *   The astrology rule lives in the backend: Jyotishasha_Backend/modules/payments/spouse_sign_table.py
 *   (SIGN_ORDER, seventh_sign_for_lagna, SEVENTH_SIGN_TABLE), which the paid Spouse Nature Report reads.
 *   1. FROZEN_* below is the contract frozen from that module at backend fdf0f8c (MC-04). The frontend
 *      data must equal it -- always checked, no backend needed.
 *   2. When the sibling backend checkout is present (../Jyotishasha_Backend), section 2 parses that
 *      module's SIGN_ORDER / SIGN_ELEMENT / SIGN_MODALITY / *_VOTES and re-derives every pair and vote,
 *      failing on any backend change. In CI without the backend it is skipped (and says so).
 *   A deliberate backend rule change therefore needs: update spouseLagnaTool.ts + the frozen contract
 *   here + re-review the affected descriptions, in the same change.
 */
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { toolsData } from "../app/data/toolsData";
import { spouseNatureLanding } from "./domains/marriage-astrology/_landing";
import {
  LAGNA_ORDER, SEVENTH_SIGN_CARDS, SIGN_NAME_HI, SPOUSE_LAGNA_TOOL_COPY as COPY, SPOUSE_LAGNA_TOOL_EVENTS as EVENTS, seventhSignForLagna,
  createFirstResultTracker,
} from "./domains/marriage-astrology/spouseLagnaTool";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

// ---- frozen contract (backend modules/payments/spouse_sign_table.py @ fdf0f8c) ----------------------
const FROZEN_SIGN_ORDER = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
const FROZEN_SEVENTH_SIGN: Record<string, string> = {
  Aries: "Libra", Taurus: "Scorpio", Gemini: "Sagittarius", Cancer: "Capricorn", Leo: "Aquarius", Virgo: "Pisces",
  Libra: "Aries", Scorpio: "Taurus", Sagittarius: "Gemini", Capricorn: "Cancer", Aquarius: "Leo", Pisces: "Virgo",
};
const FROZEN_VOTES: Record<string, Record<string, string>> = {
  Aries: { temperament: "dynamic", communication: "expressive", independence: "independent" },
  Taurus: { temperament: "steady", approach_to_life: "practical", responsibility: "dutiful" },
  Gemini: { communication: "expressive", sociability: "outgoing", responsibility: "flexible" },
  Cancer: { temperament: "dynamic", emotional_style: "open", sociability: "home_centred", independence: "independent" },
  Leo: { communication: "expressive", responsibility: "dutiful" },
  Virgo: { temperament: "steady", communication: "expressive", approach_to_life: "practical", responsibility: "flexible" },
  Libra: { temperament: "dynamic", communication: "expressive", sociability: "outgoing", independence: "independent" },
  Scorpio: { temperament: "steady", emotional_style: "open", sociability: "home_centred", responsibility: "dutiful" },
  Sagittarius: { temperament: "dynamic", communication: "expressive", responsibility: "flexible" },
  Capricorn: { approach_to_life: "practical", independence: "independent" },
  Aquarius: { temperament: "steady", communication: "expressive", sociability: "outgoing", responsibility: "dutiful" },
  Pisces: { communication: "expressive", emotional_style: "open", sociability: "home_centred", responsibility: "flexible" },
};
const sortObj = (o: Record<string, string>) => JSON.stringify(Object.keys(o).sort().map((k) => [k, o[k]]));

console.log("=== 1. Frontend data == frozen backend contract ===");
check("12 Lagna values, zodiac order, backend naming", JSON.stringify(LAGNA_ORDER) === JSON.stringify(FROZEN_SIGN_ORDER));
check("no duplicate Lagna", new Set(LAGNA_ORDER).size === 12);
for (const lagna of FROZEN_SIGN_ORDER) {
  check(`${lagna} -> 7th-house sign ${FROZEN_SEVENTH_SIGN[lagna]}`, seventhSignForLagna(lagna) === FROZEN_SEVENTH_SIGN[lagna]);
}
const sevenths = LAGNA_ORDER.map((l) => seventhSignForLagna(l));
check("mapping is a bijection (every sign is the 7th of exactly one Lagna)", new Set(sevenths).size === 12 && sevenths.every((s) => s && LAGNA_ORDER.includes(s)));
check("unknown / differently-cased input is rejected, never guessed", seventhSignForLagna("aries") === null && seventhSignForLagna("") === null && seventhSignForLagna("Mesha") === null);
check("one card per 7th sign, none missing or extra", JSON.stringify(Object.keys(SEVENTH_SIGN_CARDS).sort()) === JSON.stringify([...FROZEN_SIGN_ORDER].sort()));
for (const sign of FROZEN_SIGN_ORDER) {
  const c = SEVENTH_SIGN_CARDS[sign];
  check(`${sign} card id + votes equal the frozen backend table`, c.cardId === `seventh_sign_${sign.toLowerCase()}` && sortObj(c.votes) === sortObj(FROZEN_VOTES[sign]));
}
check("Hindi sign names for all 12", FROZEN_SIGN_ORDER.every((s) => /[ऀ-ॿ]/.test(SIGN_NAME_HI[s] ?? "")) && new Set(Object.values(SIGN_NAME_HI)).size === 12);

console.log("\n=== 2. Live parity with the sibling backend source (when checked out) ===");
const backendFile = path.join(root, "..", "Jyotishasha_Backend", "modules", "payments", "spouse_sign_table.py");
if (!fs.existsSync(backendFile)) {
  console.log("  SKIP: sibling backend not present -- the frozen contract above still applies");
} else {
  const py = fs.readFileSync(backendFile, "utf8");
  // One top-level assignment, up to its own closing bracket at column 0 (several are adjacent in the
  // backend file, which may also use CRLF line endings).
  const block = (name: string) => {
    const i = py.indexOf(`\n${name} = `);
    if (i < 0) return "";
    const end = py.slice(i + 1).search(/\r?\n[})]/);
    return py.slice(i + 1, end < 0 ? undefined : i + 1 + end + 3);
  };
  const order = [...block("SIGN_ORDER").matchAll(/"([A-Za-z]+)"/g)].map((m) => m[1]);
  const pairs = (name: string) => Object.fromEntries([...block(name).matchAll(/"([A-Za-z]+)":\s*"([a-z]+)"/g)].map((m) => [m[1], m[2]]));
  const votesOf = (name: string) => {
    const out: Record<string, Record<string, string>> = {};
    for (const m of block(name).matchAll(/"([a-z]+)":\s*\{([^}]*)\}/g)) out[m[1]] = Object.fromEntries([...m[2].matchAll(/"([a-z_]+)":\s*"([a-z_]+)"/g)].map((x) => [x[1], x[2]]));
    return out;
  };
  const element = pairs("SIGN_ELEMENT"), modality = pairs("SIGN_MODALITY");
  const elementVotes = votesOf("ELEMENT_VOTES"), modalityVotes = votesOf("MODALITY_VOTES");
  const dimOrder = [...block("TRAIT_DIMENSIONS").matchAll(/\("([a-z_]+)",\s*\(/g)].map((m) => m[1]);
  // Port of backend _combine_votes: one vote per dimension; element/modality conflict abstains.
  const combine = (e: string, m: string) => {
    const votes: Record<string, string> = {}; const conflicts = new Set<string>();
    for (const source of [elementVotes[e], modalityVotes[m]]) for (const [d, pole] of Object.entries(source)) {
      if (conflicts.has(d)) continue;
      if (d in votes && votes[d] !== pole) { conflicts.add(d); delete votes[d]; } else votes[d] = pole;
    }
    return Object.fromEntries(dimOrder.filter((d) => d in votes).map((d) => [d, votes[d]]));
  };
  check("backend still uses the whole-sign (+6) rule", /SIGN_ORDER\[\(SIGN_ORDER\.index\(lagna_sign\) \+ 6\) % 12\]/.test(py));
  check(`backend SIGN_ORDER == frontend LAGNA_ORDER (${order.length} signs)`, JSON.stringify(order) === JSON.stringify(LAGNA_ORDER));
  for (const sign of order) {
    check(`backend ${sign}: element/modality/votes == frontend card`,
      SEVENTH_SIGN_CARDS[sign]?.element === element[sign] && SEVENTH_SIGN_CARDS[sign]?.modality === modality[sign] &&
      sortObj(SEVENTH_SIGN_CARDS[sign]?.votes ?? {}) === sortObj(combine(element[sign], modality[sign])));
  }
}

console.log("\n=== 3. Result copy (EN + HI), cautious and sign-scoped ===");
const CAUTIOUS_EN = /\b(may|can indicate|often associated|tends? to)\b/;
const BANNED_EN = /\b(will|definitely|guarantee[sd]?|certainly|always|never|exact(ly)?)\b|your spouse/i;
const BANNED_HI = /होगा|होगी|होंगे|गारंटी|निश्चित रूप से|अवश्य|ज़रूर(?!त)|हमेशा/;   // "ज़रूरत" (need) is fine
for (const sign of FROZEN_SIGN_ORDER) {
  const c = SEVENTH_SIGN_CARDS[sign];
  check(`${sign} EN: about the 7th-house sign, cautious, no certainty`,
    c.en.startsWith(`${sign} on the 7th house`) && CAUTIOUS_EN.test(c.en) && !BANNED_EN.test(c.en) && c.en.split(/\s+/).length <= 55);
  check(`${sign} HI: about the 7th-house sign, cautious, no certainty`,
    c.hi.startsWith(`सप्तम भाव में ${SIGN_NAME_HI[sign]} राशि`) && /सकती है|मानी जाती है|जोड़ा जाता है/.test(c.hi) && !BANNED_HI.test(c.hi));
}
check("scope note says this is basic and names what it leaves out (EN)",
  /basic indication from the 7th-house sign alone/.test(COPY.scopeNote.en) && ["7th lord", "Venus and Jupiter", "Navamsa (D9)", "Darakaraka"].every((w) => COPY.scopeNote.en.includes(w)));
check("scope note says this is basic and names what it leaves out (HI)",
  /बुनियादी संकेत/.test(COPY.scopeNote.hi) && ["सप्तमेश", "शुक्र और गुरु", "नवांश (D9)", "दारकारक"].every((w) => COPY.scopeNote.hi.includes(w)));
check("labels: 'Select your Lagna (Ascendant)' / 'अपना लग्न चुनें'", COPY.label.en === "Select your Lagna (Ascendant)" && COPY.label.hi === "अपना लग्न चुनें");

console.log("\n=== 4. CTA, links, analytics ===");
const tool = spouseNatureLanding.inlineTool;
const product = reportsData.find((r) => r.slug === tool?.reportSlug);
check("inline tool configured on spouse-nature: spouse-lagna -> spouse_nature_report", tool?.kind === "spouse-lagna" && tool.reportSlug === "spouse_nature_report" && product?.id === "rep_026");
check("placed after the Introduction section (which exists on the topic)",
  tool?.afterSectionId === "introduction" && src("lib/domains/marriage-astrology/topics/spouse-nature.ts").includes("id:       'introduction',"));
check("CTA label uses the {price} placeholder (price comes from the catalogue)", COPY.ctaLabel.en.includes("{price}") && COPY.ctaLabel.hi.includes("{price}") && !/₹\s*\d/.test(COPY.ctaLabel.en + COPY.ctaLabel.hi));
const registry = src("components/authority-engine/landing/LandingInlineTool.tsx");
check("server registry builds /reports/<slug> and reads the price from reportsData",
  registry.includes("reportsData.find(r => r.slug === tool.reportSlug)") && registry.includes("reportHref={`/reports/${tool.reportSlug}`}") && registry.includes("priceRupees={product?.price}"));
const component = src("components/authority-engine/landing/SpouseLagnaTool.tsx");
check("result CTA is a compact text link inside the result (not a second report card)",
  (component.match(/<Link\b/g) || []).length === 2 && !/rounded-3xl|shadow-xl/.test(component) && component.indexOf("{COPY.ctaLead[locale]}") > component.indexOf("{card[locale]}"));
check("unknown-Lagna link points at the existing Lagna Finder tool route",
  component.includes("href={`${localePath}/tools/lagna-finder`}") && toolsData.some((t) => t.slug === "lagna-finder") && src("app/data/toolContent/index.ts").includes('"lagna-finder": lagnaFinderContent'));
check("analytics reuse WebsiteEvents (featureUsed on result, ctaClick on CTA) with stable ids",
  component.includes("WebsiteEvents.featureUsed(EVENTS.resultFeature)") && component.includes("WebsiteEvents.ctaClick(EVENTS.reportCtaId, EVENTS.screenName)") &&
  EVENTS.resultFeature === "spouse_lagna_tool_result" && EVENTS.reportCtaId === "spouse_lagna_tool_report_cta" && EVENTS.screenName === "spouse_nature_topic");

console.log("\n=== 5. No API / no calculation / minimal server HTML ===");
const dataSrc = src("lib/domains/marriage-astrology/spouseLagnaTool.ts");
check("tool + data make no network request", ![component, dataSrc, registry].some((s) => /fetch\(|axios|XMLHttpRequest|\/api\/|NEXT_PUBLIC_[A-Z_]*API/.test(s)));
check("descriptions are not passed as server props (only locale, href, price)",
  registry.includes("<SpouseLagnaTool locale={locale} reportHref={`/reports/${tool.reportSlug}`} priceRupees={product?.price} />"));
check("result renders only after a selection (initial state empty)", component.includes("useState('')") && component.includes("{seventh && card && ("));
check("selector is a labelled native <select> with an aria-live result region",
  /<label htmlFor=\{selectId\}/.test(component) && /<select\s+id=\{selectId\}/.test(component) && component.includes('aria-live="polite"'));

console.log("\n=== 6. MC-03 page identity untouched ===");
const topic = src("lib/domains/marriage-astrology/topics/spouse-nature.ts");
check("title / H1 unchanged", topic.includes("title:      'Spouse Nature in Vedic Astrology: Houses & Planets',") && topic.includes("title_hi:   'वैदिक ज्योतिष में जीवनसाथी का स्वभाव',"));
check("EN + HI meta unchanged", topic.includes("metaDescription: 'Discover how Vedic astrology reveals your spouse\\'s nature") && topic.includes("metaDescription_hi: 'जानें वैदिक ज्योतिष में सप्तम भाव"));
check("report card unchanged (spouse_nature_report) and ssrFaq / longForm kept", spouseNatureLanding.offer.reportSlug === "spouse_nature_report" && spouseNatureLanding.ssrFaq === true && spouseNatureLanding.longForm === true);

console.log("\n=== 7. Analytics dedupe (MC-04A) ===");
{
  // Behaviour of the real tracker, driven exactly as the tool's onChange drives it.
  let emitted = 0;
  const track = createFirstResultTracker(() => { emitted++; });
  const results: (string | null)[] = [];
  track(""); // placeholder / cleared selection
  check("no event before a valid Lagna (empty value)", emitted === 0);
  track("aries"); // invalid input
  check("no event for an unrecognised value", emitted === 0);
  for (const lagna of ["Aries", "Leo", "Pisces"]) { track(lagna); results.push(seventhSignForLagna(lagna)); }
  check("first valid selection emits exactly one tool-use event", emitted === 1);
  check("second and third selections emit nothing more", emitted === 1);
  check("the result itself still changes on every selection (Libra -> Aquarius -> Virgo)", JSON.stringify(results) === '["Libra","Aquarius","Virgo"]');
  let emittedB = 0;
  const trackB = createFirstResultTracker(() => { emittedB++; });
  trackB("Taurus"); trackB("Taurus");
  check("a fresh tracker (new mounted tool session) counts its own first result once", emittedB === 1 && emitted === 1);
}
check("tool creates one tracker per mounted instance and calls it from onChange after updating state",
  component.includes("const [trackFirstResult] = useState(() => createFirstResultTracker(() => WebsiteEvents.featureUsed(EVENTS.resultFeature)))") &&
  /setLagna\(value\)\s*\n\s*trackFirstResult\(value\)/.test(component));
check("featureUsed is called only through the tracker (no direct per-change call)", (component.match(/WebsiteEvents\.featureUsed\(/g) || []).length === 1);
check("tracker uses no persistent storage", !/localStorage|sessionStorage|document\.cookie/.test(dataSrc) && !/localStorage|sessionStorage|document\.cookie/.test(component));
check("report CTA analytics stay click-based (onClick -> ctaClick + purchase intent) on the result link",
  /<Link\s+href=\{reportHref\}\s+onClick=\{onReportClick\}/.test(component) &&
  component.includes("WebsiteEvents.ctaClick(EVENTS.reportCtaId, EVENTS.screenName)") && component.includes("pushMarketingMeasurementEvent({ name: 'jyotishasha_report_purchase_intent' })"));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
