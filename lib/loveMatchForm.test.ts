/**
 * Free Kundli Matching ads sprint: form validation, error wording, Mangal labels, match-success tracking.
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule --esModuleInterop \
 *     --jsx react-jsx --outDir .ts-test-out lib/loveMatchForm.test.ts
 *   node .ts-test-out/lib/loveMatchForm.test.js
 */
import * as fs from "fs";
import * as path from "path";
import { LOVE_MATCH_MEASURED_PREFIX, loveMatchErrorMessage, loveMatchKey, validateLoveMatchForm, type LoveMatchPerson } from "./loveMatchForm";
import { mangalSignalView } from "./loveMangalSignal";
import { pushMarketingMeasurementEvent } from "./marketingMeasurementBridge";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean) {
  if (ok) { passed += 1; console.log(`  PASS: ${label}`); } else { failed += 1; console.log(`  FAIL: ${label}`); }
}
const ROOT = (() => {
  let dir = __dirname;
  while (!fs.existsSync(path.join(dir, "package.json")) && path.dirname(dir) !== dir) dir = path.dirname(dir);
  return dir;
})();
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");

const TODAY = new Date(Date.UTC(2026, 9, 10));
const person = (over: Partial<LoveMatchPerson> = {}): LoveMatchPerson => ({
  name: "SYNTHETIC Boy", dob: "1994-03-15", tob: "08:30", pob: "New Delhi, India", lat: 28.6139, lng: 77.209, placeSelected: true, ...over,
});
const ok = { boy: person(), girl: person({ name: "SYNTHETIC Girl", dob: "1996-11-02", tob: "17:45", pob: "Mumbai", lat: 19.076, lng: 72.8777 }) };
const v = (boy: Partial<LoveMatchPerson>, girl: Partial<LoveMatchPerson>, hi = false) =>
  validateLoveMatchForm({ boy: { ...ok.boy, ...boy }, girl: { ...ok.girl, ...girl } }, hi, TODAY);

console.log("1. Validation: names, dates, BOTH birth times, selected places");
check("complete form -> valid", v({}, {}) === null);
check("boy name blank -> names the boy's name", /boy's name/.test(v({ name: " " }, {}) || ""));
check("girl name blank -> names the girl's name", /girl's name/.test(v({}, { name: "" }) || ""));
check("boy time blank -> time message (no 'server' wording)", /boy's time of birth/.test(v({ tob: "" }, {}) || "") && !/server/i.test(v({ tob: "" }, {}) || ""));
check("girl time blank -> blocked (no DOB-only estimate is ever requested)", /girl's time of birth/.test(v({}, { tob: "" }) || ""));
check("malformed time -> blocked", v({ tob: "25:00" }, {}) !== null && v({}, { tob: "8:30" }) !== null);
check("time with seconds accepted", v({ tob: "08:30:15" }, {}) === null);
check("future DOB -> blocked", /date of birth/.test(v({ dob: "2027-01-01" }, {}) || ""));
check("impossible date -> blocked", v({}, { dob: "1996-02-30" }) !== null);
check("year before 1900 -> blocked", v({ dob: "1899-12-31" }, {}) !== null);
check("place typed but not selected -> blocked", /place of birth from the suggestions/.test(v({ placeSelected: false }, {}) || ""));
check("0,0 coordinates -> blocked even if flagged selected", v({}, { lat: 0, lng: 0 }) !== null);
check("Hindi messages are Devanagari", /[ऀ-ॿ]/.test(v({}, { tob: "" }, true) || "") && /जन्म समय/.test(v({}, { tob: "" }, true) || ""));
check("boy checked before girl", /boy's/.test(v({ tob: "" }, { tob: "" }) || ""));

console.log("2. Error messages after a failed calculation");
check("4xx -> check-your-details message", /check the names, dates, times and places/.test(loveMatchErrorMessage(400, false)));
check("5xx -> try-again message", /try again in a minute/.test(loveMatchErrorMessage(502, false)));
check("no answer -> try-again message", /try again in a minute/.test(loveMatchErrorMessage(null, false)));
check("no message says the server is slow", !/slow/i.test(loveMatchErrorMessage(400, false) + loveMatchErrorMessage(null, false)));
check("Hindi messages present", /[ऀ-ॿ]/.test(loveMatchErrorMessage(400, true)) && /[ऀ-ॿ]/.test(loveMatchErrorMessage(null, true)));

console.log("3. Match key (local de-duplication only)");
const payload = { language: "en", user: ok.boy, partner: ok.girl };
check("same couple -> same key", loveMatchKey(payload) === loveMatchKey({ ...payload, user: { ...ok.boy, name: " synthetic boy " } }));
check("different time -> different key", loveMatchKey(payload) !== loveMatchKey({ ...payload, partner: { ...ok.girl, tob: "17:46" } }));
check("key is 8 hex chars and contains no birth data", /^[0-9a-f]{8}$/.test(loveMatchKey(payload)) && !loveMatchKey(payload).includes("1994"));
check("storage prefix fixed", LOVE_MATCH_MEASURED_PREFIX === "love_match_measured:");

console.log("4. Mangal Dosh wording");
check("GREEN -> Balanced", mangalSignalView({ signal: "GREEN" }, false).label === "Balanced" && mangalSignalView({ signal: "GREEN" }, true).label === "संतुलित");
check("RED -> Mismatch", mangalSignalView({ signal: "RED" }, false).label === "Mismatch");
for (const missing of [null, undefined, {}, { signal: "UNKNOWN" }]) {
  const view = mangalSignalView(missing, false);
  check(`${JSON.stringify(missing)} -> Not available + needs-full-details explanation`, view.tone === "unavailable" && /full birth details/.test(view.explanation || ""));
}

console.log("5. Ads measurement event");
const w = globalThis as unknown as { window?: unknown; dataLayer?: unknown[] };
w.window = w;
w.dataLayer = [];
pushMarketingMeasurementEvent({ name: "jyotishasha_love_match_success" });
check("pushes exactly {event: jyotishasha_love_match_success}", w.dataLayer.length === 1 &&
  JSON.stringify(w.dataLayer[0]) === JSON.stringify({ event: "jyotishasha_love_match_success" }));
delete w.window;

console.log("6. Wiring");
const form = read("app/[locale]/love/LoveForm.tsx");
const iValidate = form.indexOf("validateLoveMatchForm(form, isHi)");
check("form validates before the attempt event and before any request",
  iValidate > 0 && iValidate < form.indexOf('WebsiteEvents.ctaClick("love_matchmaking_generate"') && iValidate < form.indexOf("fetch(`${BACKEND}/api/love/report`"));
check("match success measured once, right after the existing featureUsed (success path only)",
  form.indexOf('WebsiteEvents.featureUsed("love_matchmaking_generate");\n      measureMatchSuccess(loveMatchKey(payload));') > 0 &&
  (form.match(/pushMarketingMeasurementEvent\(/g) || []).length === 1);
check("de-duplicated in memory and per browser session", form.includes("measuredRef.current.has(key)") && form.includes("sessionStorage.getItem(storageKey)"));
check("no 'Server is slow' and no blocking alert() left in the free form", !/Server is slow|सर्वर धीमा/.test(form) && !/\balert\(/.test(form));
check("errors shown inline with role=alert", form.includes('role="alert"'));
check("place edits drop stale coordinates (shared helpers)", form.includes("applyPobEdit(prev[section], value)") && form.includes("applyPlaceSelection(prev[section], place)"));
const paid = read("app/[locale]/love/report/relationship_future_report/RelationshipFutureReportForm.tsx");
const iDetails = paid.indexOf('birthDetailsError(form.boy, "boy", isHi) || birthDetailsError(form.girl, "girl", isHi)');
check("Rs199 form checks names/dates/times before begin_checkout (shared pure helper, no new import)",
  iDetails > 0 && iDetails < paid.indexOf("pushBeginCheckout(funnelItem)") && !paid.includes("@/lib/loveMatchForm"));
const tile = read("app/[locale]/love/result/LoveResultSummaryDetail.tsx");
check("approximate result shows no number", tile.includes('precision === "approximate" ? "—"'));
check("Mangal tile shows plain labels, never the raw signal or CHECK", tile.includes("mangalView.label") && !tile.includes('"CHECK"'));
const mangal = read("app/[locale]/love/mangal-dosh/MangalDoshDetail.tsx");
check("Mangal detail: missing data is an explained state, not an endless spinner", mangal.includes("setLoaded(true)") && mangal.includes("view.explanation"));
const page = read("app/[locale]/love/page.tsx");
check("unsupported claims removed", !/NASA-Grade|Verified by Vedic Experts|high probability of a stable marriage|unmatched by generic/.test(page));
check("metadata unchanged", page.includes('"Free Kundli Matching for Marriage | Love Compatibility & Guna Milan"') &&
  page.includes('"फ्री कुंडली मिलान: शादी के लिए 36 गुण और लव कंपैटिबिलिटी"'));
check("FAQ (and FAQPage schema) text unchanged", page.includes("a score above 18 is considered acceptable, while 25 to 32 is regarded as very good"));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
