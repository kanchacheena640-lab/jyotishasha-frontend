/**
 * Free love match speed fix: main result first, Truth-or-Dare + Marriage potential afterwards (lib/loveTools.ts).
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule --esModuleInterop \
 *     --jsx react-jsx --outDir .ts-test-out lib/loveTools.test.ts
 *   node .ts-test-out/lib/loveTools.test.js
 */
import * as fs from "fs";
import * as path from "path";
import { loveMatchKey } from "./loveMatchForm";
import { loadLoveTools, pendingToolsRecord, readLoveTools } from "./loveTools";

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

// ---- browser stand-ins ------------------------------------------------------------------------------------------
const store = new Map<string, string>();
const g = globalThis as any;
g.sessionStorage = { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, String(v)) };
let calls: string[] = [];
let respond: (url: string) => { ok: boolean; body: unknown } = () => ({ ok: true, body: {} });
const gates: Array<() => void> = [];
let holdResponses = false;
g.fetch = (url: string) => {
  calls.push(url);
  const answer = () => {
    const r = respond(url);
    return { ok: r.ok, status: r.ok ? 200 : 500, json: async () => r.body };
  };
  if (!holdResponses) return Promise.resolve(answer());
  return new Promise((resolve) => gates.push(() => resolve(answer())));
};

const person = (name: string) => ({ name, dob: "1994-03-15", tob: "08:30", pob: "Delhi", lat: 28.6139, lng: 77.209 });
const payloadA = { language: "en", boy_is_user: true, user: person("SYNTHETIC A"), partner: person("SYNTHETIC B") };
const payloadB = { language: "en", boy_is_user: true, user: person("SYNTHETIC C"), partner: person("SYNTHETIC D") };
const keyA = loveMatchKey(payloadA);
const keyB = loveMatchKey(payloadB);
const TRUTH = { data: { verdict: "TRUTH", verdict_line: "x" } };
const MARRIAGE = { data: { user_result: { pct: 75 } } };
const okBoth = (url: string) => ({ ok: true, body: url.includes("truth-or-dare") ? TRUTH : MARRIAGE });

(async () => {
  console.log("1. readLoveTools");
  check("nothing stored -> null", readLoveTools(null, keyA) === null);
  check("pending record for this match -> pending", readLoveTools(pendingToolsRecord(keyA), keyA)?.status === "pending");
  check("record for another match -> null (never shown for this match)", readLoveTools(pendingToolsRecord(keyB), keyA) === null);
  const r = readLoveTools(JSON.stringify({ key: keyA, truth_or_dare: TRUTH, marriage_potential: MARRIAGE }), keyA);
  check("loaded record -> ready, nested data unwrapped", r?.status === "ready" && (r as any).truthOrDare.verdict === "TRUTH" && (r as any).marriagePotential.user_result.pct === 75);
  check("failed record -> failed", readLoveTools(JSON.stringify({ key: keyA, failed: true }), keyA)?.status === "failed");
  check("session saved before this change (no key) still readable", readLoveTools(JSON.stringify({ truth_or_dare: TRUTH, marriage_potential: MARRIAGE }), keyA)?.status === "ready");
  check("garbage -> null", readLoveTools("{not json", keyA) === null);

  console.log("2. loadLoveTools: one load per match, both secondary calls, keyed storage");
  store.clear(); calls = []; respond = okBoth;
  store.set("love_payload", JSON.stringify(payloadA));
  store.set("love_tools", pendingToolsRecord(keyA));
  const p1 = loadLoveTools(payloadA, "http://b");
  const p2 = loadLoveTools(payloadA, "http://b");
  check("second caller reuses the load in flight (no duplicate requests)", p1 === p2);
  const s1 = await p1;
  check("exactly the two secondary endpoints, once each", calls.length === 2 && calls.includes("http://b/api/love/truth-or-dare") && calls.includes("http://b/api/love/love-marriage-probability"));
  check("never calls the main report again", !calls.some((u) => u.includes("/api/love/report")));
  check("ready state returned", s1.status === "ready" && (s1 as any).truthOrDare.verdict === "TRUTH");
  check("stored keyed to the match", JSON.parse(store.get("love_tools") || "{}").key === keyA);
  calls = [];
  const s2 = await loadLoveTools(payloadA, "http://b");
  check("already loaded -> served from storage, no request", s2.status === "ready" && calls.length === 0);

  console.log("3. a late answer for an older match never overwrites a newer one");
  store.clear(); calls = []; holdResponses = true;
  store.set("love_payload", JSON.stringify(payloadA));
  const late = loadLoveTools(payloadA, "http://b");
  store.set("love_payload", JSON.stringify(payloadB));              // visitor started a new match meanwhile
  store.set("love_tools", pendingToolsRecord(keyB));
  gates.splice(0).forEach((go) => go());
  await late;
  holdResponses = false;
  check("newer match's pending record untouched", JSON.parse(store.get("love_tools") || "{}").key === keyB && JSON.parse(store.get("love_tools") || "{}").pending === true);

  console.log("4. failures");
  store.clear(); calls = [];
  const payloadC = { ...payloadA, partner: person("SYNTHETIC E") };
  store.set("love_payload", JSON.stringify(payloadC));
  respond = (url) => (url.includes("truth-or-dare") ? { ok: false, body: {} } : { ok: true, body: MARRIAGE });
  const part = await loadLoveTools(payloadC, "http://b");
  check("one call fails -> ready with that part null, the other shown", part.status === "ready" && (part as any).truthOrDare === null && (part as any).marriagePotential.user_result.pct === 75);
  const payloadD = { ...payloadA, partner: person("SYNTHETIC F") };
  store.set("love_payload", JSON.stringify(payloadD));
  respond = () => ({ ok: false, body: {} });
  const none = await loadLoveTools(payloadD, "http://b");
  check("both fail -> failed (stored as failed, never throws)", none.status === "failed" && JSON.parse(store.get("love_tools") || "{}").failed === true);
  const payloadE = { ...payloadA, partner: person("SYNTHETIC G") };
  store.set("love_payload", JSON.stringify(payloadE));
  g.fetch = () => Promise.reject(new TypeError("network down"));
  const net = await loadLoveTools(payloadE, "http://b");
  check("network error -> failed, never throws", net.status === "failed");

  console.log("5. wiring");
  const form = read("app/[locale]/love/LoveForm.tsx");
  const iReport = form.indexOf("const reportRes = await fetch(`${BACKEND}/api/love/report`");
  const iGate = form.indexOf('if (!reportRes.ok) throw new Error("Primary API failed")');
  const iTools = form.indexOf("void loadLoveTools(payload, BACKEND)");
  const iFeature = form.indexOf('WebsiteEvents.featureUsed("love_matchmaking_generate")');
  check("form awaits only the main report (no Promise.all of three calls)", iReport > 0 && !/Promise\.all\(\[\s*fetch/.test(form));
  check("secondary load starts only after the report succeeded and its result is stored", iGate < iTools && form.indexOf('sessionStorage.setItem("love_summary"') < iTools);
  check("pending marker written before navigation; tracking after the main result, before navigation",
    form.indexOf('sessionStorage.setItem("love_tools", pendingToolsRecord(matchKey))') > 0 && iGate < iFeature && iFeature < form.indexOf("router.push("));
  check("form never awaits the secondary load", !/await\s+loadLoveTools/.test(form));
  const result = read("app/[locale]/love/result/LoveResultSummaryDetail.tsx");
  check("result page fills the two tiles from loadLoveTools and shows loading / unavailable meanwhile",
    result.includes("loadLoveTools(storedPayload)") && result.includes('"Loading…"') && !result.includes('"PENDING"') && !result.includes("pct || 0"));
  for (const f of ["app/[locale]/love/truth-or-dare/TruthOrDareDetail.tsx", "app/[locale]/love/marriage-potential/MarriagePotentialDetail.tsx"]) {
    const src = read(f);
    check(`${f.split("/").pop()}: waits for / reloads the secondary result, explains failure`, src.includes("loadLoveTools(payload)") && src.includes("couldn't be calculated right now"));
  }

  console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
  if (failed) process.exit(1);
})();
