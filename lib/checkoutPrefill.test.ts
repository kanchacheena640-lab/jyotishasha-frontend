/**
 * lib/checkoutPrefill.test.ts
 *
 * R2-C2 -- report checkout birth-details prefill regression guards.
 *
 * Covers the pure helpers in lib/checkoutPrefill.ts (validation, empty-only
 * merge, edit protection, Clear prefill) and pins the payment contract of
 * components/reports/ReportCheckout.tsx: the whole handleSubmit block (field
 * validation, /api/razorpay-order request schema, Razorpay options, /webhook
 * handling, purchase measurement) must stay byte-identical to production
 * main @ 289829b. Also renders ReportCheckout on the server to prove the
 * prefill never runs there (no hydration mismatch).
 *
 * Standalone, repo convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/checkoutPrefill.test.ts
 *   node .ts-test-out/checkoutPrefill.test.js
 * (then remove .ts-test-out/ -- build output, never committed.)
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports -- test-only module loader */
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

let passed = 0;
let failed = 0;
const failures: string[] = [];
function check(label: string, ok: boolean): void {
  if (ok) { passed++; }
  else { failed++; failures.push(label); console.log(`  FAIL: ${label}`); }
}
function section(title: string): void {
  console.log(`\n=== ${title} ===`);
}

// ---- repo root + test-only TypeScript source loader (maps `@/`, stubs CSS + useParams) ---------
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8").replace(/\r\n/g, "\n");

const ts = require("typescript");
const NodeModule: any = require("module");
const originalResolve = NodeModule._resolveFilename;
NodeModule._resolveFilename = function (request: string, parent: any, ...rest: any[]) {
  const mapped = request.startsWith("@/") ? path.join(root, request.slice(2)) : request;
  return originalResolve.call(this, mapped, parent, ...rest);
};
for (const ext of [".ts", ".tsx"]) {
  NodeModule._extensions[ext] = (m: any, filename: string) => {
    const out = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      fileName: filename,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    m._compile(out, filename);
  };
}
NodeModule._extensions[".css"] = () => undefined;
const realNavigation = require("next/navigation");
const originalLoad = NodeModule._load;
NodeModule._load = function (request: string, ...rest: any[]) {
  if (request === "next/navigation") return { ...realNavigation, useParams: () => ({ slug: "career_report" }) };
  return originalLoad.call(this, request, ...rest);
};
const load = (rel: string): any => require(path.join(root, rel));

const {
  buildCheckoutPrefill, applyCheckoutPrefill, clearCheckoutPrefill, hasAppliedPrefill, validDob, validTob, validPlace,
} = load("lib/checkoutPrefill");

const NOW = new Date(2026, 9, 23, 12, 0, 0); // 2026-10-23 local
const VALID = {
  name: "Asha Verma", dob: "1990-08-15", tob: "06:30", gender: "Female", language: "hi",
  place: "Varanasi", coords: { lat: 25.3176, lng: 82.9739 },
};
const EMPTY_FORM = { name: "", email: "", phone: "", dob: "", tob: "", pob: "", latitude: "", longitude: "", language: "en" };
const none = new Set<string>();

// ------------------------------------------------------------------------------------------------
section("1. valid profile");
// ------------------------------------------------------------------------------------------------
{
  const p = buildCheckoutPrefill(VALID, NOW);
  check("1a: name", p.name === "Asha Verma");
  check("1b: dob", p.dob === "1990-08-15");
  check("1c: tob", p.tob === "06:30");
  check("1d: place + coords as strings", p.place?.pob === "Varanasi" && p.place?.latitude === "25.3176" && p.place?.longitude === "82.9739");
  check("1e: only birth fields are produced (no email/phone/language/gender)", Object.keys(p).sort().join() === "dob,name,place,tob");
  check("1f: name is trimmed", buildCheckoutPrefill({ ...VALID, name: "  Asha  " }, NOW).name === "Asha");
  check("1g: today is a valid DOB", validDob("2026-10-23", NOW) === "2026-10-23");
  check("1h: leap day 2024-02-29 is valid", validDob("2024-02-29", NOW) === "2024-02-29");
  check("1i: negative (southern/western) coordinates are valid", !!validPlace("Lima", { lat: -12.04, lng: -77.04 }));
}

// ------------------------------------------------------------------------------------------------
section("2. invalid fields are skipped individually");
// ------------------------------------------------------------------------------------------------
{
  const badDobs = ["2026-10-24", "2099-01-01", "2023-02-29", "2023-02-30", "2023-13-01", "2023-00-10", "1899-12-31",
    "15-08-1990", "1990/08/15", "1990-8-15", "", "  ", 19900815, null, undefined, "1990-08-15T00:00:00"];
  for (const d of badDobs) check(`2a: DOB ${JSON.stringify(d)} rejected`, validDob(d, NOW) === undefined);

  const badTobs = ["24:00", "9:30", "10:60", "10:00:00", "6.30", "06:30 PM", "", null, 630];
  for (const t of badTobs) check(`2b: TOB ${JSON.stringify(t)} rejected`, validTob(t) === undefined);

  const badNames = ["", "   ", "a".repeat(101), "<script>", "Asha\u0000", "Ash\na", 42, null, ["Asha"]];
  for (const n of badNames) check(`2c: name ${JSON.stringify(n)?.slice(0, 20)} rejected`, buildCheckoutPrefill({ ...VALID, name: n }, NOW).name === undefined);
  check("2d: 100-char name accepted", buildCheckoutPrefill({ ...VALID, name: "a".repeat(100) }, NOW).name?.length === 100);

  const badCoords: unknown[] = [
    { lat: 0, lng: 82.9 }, { lat: 25.3, lng: 0 }, { lat: 0, lng: 0 }, { lat: NaN, lng: 82.9 }, { lat: 25.3, lng: Infinity },
    { lat: 91, lng: 82.9 }, { lat: 25.3, lng: -181 }, { lat: "25.3", lng: "82.9" }, { lat: 25.3 }, {}, null, [25.3, 82.9], "25.3,82.9",
  ];
  for (const c of badCoords) check(`2e: coords ${JSON.stringify(c)} rejected`, validPlace("Varanasi", c) === undefined);
  check("2f: place without coords rejected", buildCheckoutPrefill({ ...VALID, coords: undefined }, NOW).place === undefined);
  check("2g: coords without place rejected", buildCheckoutPrefill({ ...VALID, place: "" }, NOW).place === undefined);
  check("2h: over-long place rejected", validPlace("x".repeat(201), VALID.coords) === undefined);

  // One bad field never blocks the valid ones.
  const p = buildCheckoutPrefill({ ...VALID, dob: "2099-01-01", tob: "25:00" }, NOW);
  check("2i: invalid DOB/TOB skipped, name and place still filled", !p.dob && !p.tob && p.name === "Asha Verma" && !!p.place);
}

// ------------------------------------------------------------------------------------------------
section("3. missing / malformed / stale cache");
// ------------------------------------------------------------------------------------------------
for (const c of [undefined, null, {}, [], "jyotishasha", 42, true, { dob: 1, tob: {}, place: [], coords: "x" }, { unrelated: "x" }]) {
  let out: any;
  let threw = false;
  try { out = buildCheckoutPrefill(c as any, NOW); } catch { threw = true; }
  check(`3a: cache ${JSON.stringify(c)} -> no throw, empty prefill`, !threw && Object.keys(out).length === 0);
}
check("3b: prefill with nothing valid -> nothing applied",
  !hasAppliedPrefill(applyCheckoutPrefill(EMPTY_FORM, buildCheckoutPrefill({}, NOW), none).applied));

// ------------------------------------------------------------------------------------------------
section("4. empty-only merge, atomic place, never email/phone/language");
// ------------------------------------------------------------------------------------------------
{
  const prefill = buildCheckoutPrefill(VALID, NOW);
  const { form, applied } = applyCheckoutPrefill(EMPTY_FORM, prefill, none);
  check("4a: all birth fields filled into an empty form",
    form.name === "Asha Verma" && form.dob === "1990-08-15" && form.tob === "06:30" &&
    form.pob === "Varanasi" && form.latitude === "25.3176" && form.longitude === "82.9739");
  check("4b: email, phone, language untouched", form.email === "" && form.phone === "" && form.language === "en");
  check("4c: applied records exactly what was inserted",
    JSON.stringify(applied) === JSON.stringify({ name: "Asha Verma", dob: "1990-08-15", tob: "06:30", pob: "Varanasi", latitude: "25.3176", longitude: "82.9739" }));
  check("4d: input form object is not mutated", EMPTY_FORM.name === "");

  const typed = { ...EMPTY_FORM, name: "Ravi", tob: "22:15", email: "r@x.in", language: "hi" };
  const r = applyCheckoutPrefill(typed, prefill, none);
  check("4e: non-empty fields are never overwritten", r.form.name === "Ravi" && r.form.tob === "22:15");
  check("4f: only the empty fields are filled", r.form.dob === "1990-08-15" && r.form.pob === "Varanasi");
  check("4g: language preserved", r.form.language === "hi");
  check("4h: applied omits the fields that were kept", r.applied.name === undefined && r.applied.tob === undefined);

  for (const partial of [{ pob: "Delhi" }, { latitude: "28.6" }, { longitude: "77.2" }]) {
    const res = applyCheckoutPrefill({ ...EMPTY_FORM, ...partial }, prefill, none);
    check(`4i: place not filled when ${Object.keys(partial)[0]} already set (atomic)`,
      res.applied.pob === undefined && res.form.pob === ((partial as any).pob ?? "") &&
      res.form.latitude === ((partial as any).latitude ?? "") && res.form.longitude === ((partial as any).longitude ?? ""));
  }
}

// ------------------------------------------------------------------------------------------------
section("5. user edit protection (including rapid edits before the effect)");
// ------------------------------------------------------------------------------------------------
{
  const prefill = buildCheckoutPrefill(VALID, NOW);
  for (const field of ["name", "dob", "tob"] as const) {
    // Typed, then deleted again before the cache loaded: empty but edited.
    const res = applyCheckoutPrefill(EMPTY_FORM, prefill, new Set([field]));
    check(`5a: edited-then-emptied ${field} is not refilled`, res.form[field] === "" && res.applied[field] === undefined);
    check(`5b: other fields still filled when only ${field} was edited`, hasAppliedPrefill(res.applied));
  }
  const res = applyCheckoutPrefill(EMPTY_FORM, prefill, new Set(["place"]));
  check("5c: edited place is not refilled (pob + coords)", res.form.pob === "" && res.form.latitude === "" && res.applied.pob === undefined);

  const rc = src("components/reports/ReportCheckout.tsx");
  check("5d: name/tob edits are recorded", rc.includes('if (name === "name" || name === "tob") editedFieldsRef.current.add(name);'));
  check("5e: DOB picker edits are recorded", rc.includes('editedFieldsRef.current.add("dob");'));
  check("5f: typed and Places-selected place edits are recorded", (rc.match(/editedFieldsRef\.current\.add\("place"\);/g) || []).length === 2);
  check("5g: handleChange uses a functional update", rc.includes("setForm((prev) => ({ ...prev, [name]: value }));") && !rc.includes("setForm({ ...form,"));
  check("5h: prefill state update is functional", rc.includes("setForm((prev) => applyCheckoutPrefill(prev, prefill, editedFieldsRef.current).form);"));
  check("5i: prefill applies at most once", rc.includes("if (prefillAppliedRef.current) return;") && rc.includes("prefillAppliedRef.current = true;"));
}

// ------------------------------------------------------------------------------------------------
section("6. Clear prefill keeps manual values");
// ------------------------------------------------------------------------------------------------
{
  const prefill = buildCheckoutPrefill(VALID, NOW);
  const { form, applied } = applyCheckoutPrefill({ ...EMPTY_FORM, email: "a@b.in", phone: "9999999999", language: "hi" }, prefill, none);

  const cleared = clearCheckoutPrefill(form, applied);
  check("6a: all unchanged prefilled birth fields cleared",
    cleared.name === "" && cleared.dob === "" && cleared.tob === "" && cleared.pob === "" && cleared.latitude === "" && cleared.longitude === "");
  check("6b: manual email/phone/language kept", cleared.email === "a@b.in" && cleared.phone === "9999999999" && cleared.language === "hi");

  const edited = { ...form, name: "Asha V. Sharma", tob: "07:45" };
  const c2 = clearCheckoutPrefill(edited, applied);
  check("6c: fields the user changed after prefill are kept", c2.name === "Asha V. Sharma" && c2.tob === "07:45");
  check("6d: untouched prefilled fields still cleared", c2.dob === "" && c2.pob === "");

  const reselected = { ...form, pob: "Lucknow", latitude: "26.85", longitude: "80.95" };
  const c3 = clearCheckoutPrefill(reselected, applied);
  check("6e: a re-selected place is kept", c3.pob === "Lucknow" && c3.latitude === "26.85" && c3.longitude === "80.95");

  const partialTyped = { ...form, pob: "Varanasi City", latitude: "", longitude: "" };
  const c4 = clearCheckoutPrefill(partialTyped, applied);
  check("6f: place only clears as a unit (edited place text kept)", c4.pob === "Varanasi City");

  const typedBefore = applyCheckoutPrefill({ ...EMPTY_FORM, name: "Ravi" }, prefill, new Set(["name"]));
  check("6g: a name typed before prefill survives Clear", clearCheckoutPrefill(typedBefore.form, typedBefore.applied).name === "Ravi");
  check("6h: clearing with nothing applied is a no-op", JSON.stringify(clearCheckoutPrefill(form, {})) === JSON.stringify(form));

  const rc = src("components/reports/ReportCheckout.tsx");
  check("6i: Clear updates the form functionally and hides the notice",
    rc.includes("setForm((prev) => clearCheckoutPrefill(prev, appliedPrefill));") && rc.includes("setAppliedPrefill({});"));
  check("6j: Clear is a plain button (never submits/pays)", /<button type="button" onClick=\{handleClearPrefill\}/.test(rc));
  check("6k: Clear never deletes the saved tool data", !rc.includes("clearUserData") && !/localStorage\.removeItem/.test(rc));
}

// ------------------------------------------------------------------------------------------------
section("7. server render: no prefill, no notice (hydration-safe)");
// ------------------------------------------------------------------------------------------------
{
  const store = new Map<string, string>([["jyotishasha_user", JSON.stringify(VALID)]]);
  (globalThis as any).localStorage = { getItem: (k: string) => store.get(k) ?? null, setItem: () => undefined, removeItem: () => undefined };
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const originalError = console.error;
  console.error = () => undefined; // styled-jsx's `jsx` attribute warns outside Next's compiler
  let html = "";
  try {
    html = renderToStaticMarkup(React.createElement(load("components/reports/ReportCheckout").default));
  } catch (e: any) {
    check(`7a: ReportCheckout renders on the server (${e?.message})`, false);
  } finally {
    console.error = originalError;
    delete (globalThis as any).localStorage;
  }
  if (html) {
    check("7b: server markup has the checkout form", html.includes('name="email"') && html.includes("Proceed to Pay"));
    const input = (name: string) => (html.match(new RegExp(`<input[^>]*name="${name}"[^>]*>`)) || [""])[0];
    check("7c: no prefilled name in server markup", input("name").includes('value=""') && !html.includes("Asha Verma"));
    check("7d: no prefilled place in server markup", input("pob").includes('value=""') && !html.includes("Varanasi"));
    check("7e: no prefill notice in server markup", !html.includes("last astrology tool entry") && !html.includes('role="status"'));
  }
  const rc = src("components/reports/ReportCheckout.tsx");
  check("7f: prefill runs only inside an effect keyed on the loaded cache", /useEffect\(\(\) => \{\n\s+if \(prefillAppliedRef\.current\) return;[\s\S]*?\}, \[userData\]\);/.test(rc));
  check("7g: initial form state is still all-empty", /useState\(\{\n\s+name: "",\n\s+email: "",\n\s+phone: "",\n\s+dob: "",\n\s+tob: "",\n\s+pob: "",\n\s+latitude: "",\n\s+longitude: "",\n\s+language: currentLang,\n\s+\}\);/.test(rc));
}

// ------------------------------------------------------------------------------------------------
section("8. payment contract unchanged; no new storage, URL or tracking exposure");
// ------------------------------------------------------------------------------------------------
{
  const rc = src("components/reports/ReportCheckout.tsx");
  const start = rc.indexOf("  const handleSubmit = async () => {");
  const end = rc.indexOf("  if (fulfillmentIssue) {");
  const block = rc.slice(start, end);
  const sha = crypto.createHash("sha256").update(block).digest("hex");
  // handleSubmit as shipped in production main @ 289829b: field validation,
  // /api/razorpay-order request schema, Razorpay options, /webhook handling,
  // purchase measurement. Any change here must be a deliberate payment change.
  check(`8a: handleSubmit byte-identical to main@289829b (sha256 ${sha.slice(0, 12)}…)`,
    start > 0 && end > start && sha === "44902143a7ce30ee5d6c636d37f3e101a58a4fcd76ffb43d86b6b9e060304795");
  check("8b: required-field validation unchanged",
    block.includes("if (!form.email || !form.dob || !form.tob || !form.pob || !form.name || !form.phone) {") &&
    block.includes('if (form.latitude === "" || form.longitude === "") {'));
  check("8c: order request body unchanged",
    /product: productId,\n\s+name: form\.name,\n\s+email: form\.email,\n\s+phone: form\.phone,\n\s+dob: form\.dob,\n\s+tob: form\.tob,\n\s+pob: form\.pob,\n\s+latitude: form\.latitude,\n\s+longitude: form\.longitude,\n\s+language: form\.language,/.test(block));
  check("8d: no new storage writes", !/(localStorage|sessionStorage)\.setItem/.test(rc));
  check("8e: no birth details in URLs", !/searchParams|URLSearchParams|router\.(push|replace)|\?(name|dob|tob|pob)=/.test(rc));
  check("8f: no new tracking calls", !/WebsiteEvents|dataLayer|gtag\(|fbq\(/.test(rc));
  const lib = src("lib/checkoutPrefill.ts");
  check("8g: prefill helpers never touch storage, network or tracking",
    !/localStorage|sessionStorage|fetch\(|WebsiteEvents|dataLayer|window\./.test(lib.replace(/\/\*[\s\S]*?\*\//g, "")));
}

// ------------------------------------------------------------------------------------------------
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.log("\nFailures:\n" + failures.slice(0, 40).map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}
