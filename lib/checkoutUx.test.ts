/**
 * lib/checkoutUx.test.ts
 *
 * R2-D2 -- report checkout friction fixes: email validation, Google Places
 * load-failure handling, top-of-page purchase CTA + payment reassurance.
 *
 * Pins the payment contract (handleSubmit byte-identical to production main
 * @ 289829b) and renders every standard report detail page on the server.
 *
 * Standalone, repo convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/checkoutUx.test.ts
 *   node .ts-test-out/checkoutUx.test.js
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
let routeSlug = "career_report";
const realNavigation = require("next/navigation");
const originalLoad = NodeModule._load;
NodeModule._load = function (request: string, ...rest: any[]) {
  if (request === "next/navigation") return { ...realNavigation, useParams: () => ({ slug: routeSlug }) };
  return originalLoad.call(this, request, ...rest);
};
const load = (rel: string): any => require(path.join(root, rel));

const ux = load("lib/checkoutUx");
const { reportsData } = load("app/data/reportsData");
const DEVANAGARI = /[ऀ-ॿ]/;

// ------------------------------------------------------------------------------------------------
section("1. email validation (permissive, catches clear typos)");
// ------------------------------------------------------------------------------------------------
const VALID_EMAILS = [
  "a@b.co", "name@gmail.com", "first.last+tag@sub.domain.co.in", "UPPER@EXAMPLE.ORG", "user_99@my-site.com",
  "x@y.technology", "  padded@example.com  ", "o'brien@example.ie", "१२३@example.com",
];
for (const e of VALID_EMAILS) {
  check(`1a: valid ${JSON.stringify(e)}`, ux.isValidCheckoutEmail(e) === true && ux.hasInvalidCheckoutEmail(e) === false);
}
const INVALID_EMAILS = [
  "name", "name@", "@gmail.com", "name@gmail", "name@gmail.c", "name@gmail.", "na me@gmail.com", "a@@b.com",
  "a@b..com", "a@.com", "a@-b.com", "name@gmail,com", "name gmail.com", `${"a".repeat(250)}@b.com`,
];
for (const e of INVALID_EMAILS) {
  check(`1b: invalid ${JSON.stringify(e).slice(0, 40)}`, ux.isValidCheckoutEmail(e) === false && ux.hasInvalidCheckoutEmail(e) === true);
}
for (const e of ["", "   "]) {
  check(`1c: empty ${JSON.stringify(e)} is not flagged as a format error (existing required check handles it)`,
    ux.hasInvalidCheckoutEmail(e) === false && ux.isValidCheckoutEmail(e) === false);
}

// ------------------------------------------------------------------------------------------------
section("2. copy: bilingual, existing destinations only, no new promises");
// ------------------------------------------------------------------------------------------------
for (const [key, v] of Object.entries(ux.CHECKOUT_COPY) as [string, { en: string; hi: string }][]) {
  check(`2a: ${key} English has no Devanagari`, !!v.en && !DEVANAGARI.test(v.en));
  check(`2b: ${key} Hindi is Devanagari`, DEVANAGARI.test(v.hi));
}
const allCopy = JSON.stringify(ux.CHECKOUT_COPY);
check("2c: no refund or delivery-time promises", !/guarantee|100%|within \d|minutes?|instant|money.back|मिनट|गारंटी/i.test(allCopy));
check("2d: support link is the existing WhatsApp number", ux.SUPPORT_WHATSAPP_URL === "https://wa.me/919118877495");
check("2e: refund policy page exists", ux.REFUND_POLICY_PATH === "/refund-policy" && fs.existsSync(path.join(root, "app/refund-policy/page.tsx")));
check("2f: top CTA uses the given price", ux.topCtaLabel("en", 51) === "Get this report — ₹51" && ux.topCtaLabel("hi", 199).endsWith("₹199"));
check("2g: polling capped (~60 s)", ux.PLACES_POLL_INTERVAL_MS * ux.PLACES_MAX_POLLS === 60000);

// ------------------------------------------------------------------------------------------------
section("3. ReportCheckout source: payment contract unchanged, fixes wired outside it");
// ------------------------------------------------------------------------------------------------
const rc = src("components/reports/ReportCheckout.tsx");
{
  const start = rc.indexOf("  const handleSubmit = async () => {");
  const end = rc.indexOf("  if (fulfillmentIssue) {");
  const sha = crypto.createHash("sha256").update(rc.slice(start, end)).digest("hex");
  check(`3a: handleSubmit byte-identical to main@289829b (${sha.slice(0, 12)}…)`,
    start > 0 && end > start && sha === "44902143a7ce30ee5d6c636d37f3e101a58a4fcd76ffb43d86b6b9e060304795");
  const payClick = rc.indexOf("  const handlePayClick = () => {");
  check("3b: email gate defined before (outside) handleSubmit", payClick > 0 && payClick < start);
  const gate = rc.slice(payClick, start);
  check("3c: gate blocks only a non-empty invalid email, then calls the unchanged handleSubmit",
    /if \(hasInvalidCheckoutEmail\(form\.email\)\) \{[\s\S]*?return;\n\s+\}\n\s+handleSubmit\(\);/.test(gate));
  check("3d: Pay button uses the gate", rc.includes("onClick={handlePayClick}") && !rc.includes("onClick={handleSubmit}"));
  check("3e: inline email error is accessible and bilingual",
    rc.includes('aria-invalid={showEmailError}') && rc.includes("CHECKOUT_COPY.invalidEmail[lang]") && rc.includes('role="alert"'));
  check("3f: email trimmed on blur, functionally", rc.includes("{ ...prev, email: prev.email.trim() }"));

  check("3g: Places load rejection is handled", rc.includes("loadGoogleMapsPlaces().catch(fail);") && !/\n\s+loadGoogleMapsPlaces\(\);/.test(rc));
  check("3h: polling capped and stopped on failure/unmount",
    rc.includes("if (polls >= PLACES_MAX_POLLS) fail();") && rc.includes("}, PLACES_POLL_INTERVAL_MS);") && rc.includes("return stop;"));
  check("3i: a successful Places load still wires the Autocomplete", /if \(\(window as any\)\.google\?\.maps\) \{\n\s+stop\(\);\n\s+const autocomplete = new/.test(rc));
  check("3j: Places message only when no coordinates are held (Places pick / R2-C3 prefill unaffected)",
    rc.includes('{placesUnavailable && form.latitude === "" && ('));
  check("3k: coordinate rule untouched (no invented coordinates)",
    !/latitude:\s*["'`]?-?\d/.test(rc) && rc.includes('if (form.latitude === "" || form.longitude === "") {'));

  check("3l: stable checkout anchor", rc.includes('<div id={CHECKOUT_ANCHOR_ID} className="max-w-xl mx-auto px-4 py-10 font-sans scroll-mt-24">'));
  check("3m: reassurance links only to existing refund policy and support",
    rc.includes("href={REFUND_POLICY_PATH}") && (rc.match(/href=\{SUPPORT_WHATSAPP_URL\}/g) || []).length === 2);

  // Baseline counts in main@289829b: 2 fetch() calls (order + /webhook) and
  // 4 tracking references (view_item, begin_checkout, 2x verified purchase).
  const count = (s: string, re: RegExp) => (s.match(re) || []).length;
  check("3n: no new network calls", count(rc, /fetch\(/g) === 2);
  check("3o: no new tracking", count(rc, /pushViewItem\(|pushBeginCheckout\(|trackBackendVerifiedPurchase\(|WebsiteEvents|dataLayer/g) === 4);
  check("3p: no new storage writes", !/(localStorage|sessionStorage)\.setItem/.test(rc));
}

// ------------------------------------------------------------------------------------------------
section("4. ReportContent top CTA");
// ------------------------------------------------------------------------------------------------
{
  const content = src("components/reports/ReportContent.tsx");
  check("4a: CTA links to the checkout anchor", content.includes("href={`#${CHECKOUT_ANCHOR_ID}`}"));
  check("4b: CTA price from the report entry, never hard-coded", content.includes("topCtaLabel(lang, report.price)") && !/Get this report[^\n]*₹\d/.test(content));
  check("4c: exactly one new purchase CTA", (content.match(/CHECKOUT_ANCHOR_ID/g) || []).length === 2);
}

// ------------------------------------------------------------------------------------------------
section("5. server render: checkout + every report detail page");
// ------------------------------------------------------------------------------------------------
{
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const originalError = console.error;
  console.error = () => undefined; // styled-jsx's `jsx` attribute warns outside Next's compiler
  try {
    routeSlug = "career_report";
    const html = renderToStaticMarkup(React.createElement(load("components/reports/ReportCheckout").default));
    check("5a: checkout wrapper carries the anchor id", html.includes('id="report-checkout"'));
    check("5b: reassurance rendered with both links", html.includes("Secure payment via Razorpay") && html.includes('href="/refund-policy"') && html.includes('href="https://wa.me/919118877495"'));
    check("5c: no email error before interaction", !html.includes("checkout-email-error") && !html.includes("valid email address"));
    check("5d: no Places error before a load failure", !html.includes("City search could not load"));
    check("5e: Pay button still renders the catalog price", html.includes("Proceed to Pay ₹51"));

    const ReportContent = load("components/reports/ReportContent").default;
    for (const price of [51, 199, 75]) {
      const h = renderToStaticMarkup(React.createElement(ReportContent, { report: { ...reportsData[0], price }, seo: undefined }));
      check(`5f: top CTA shows configured price ₹${price} and links to #report-checkout`,
        h.includes(`Get this report — ₹${price}`) && h.includes('href="#report-checkout"'));
    }
    const i18next = require("i18next");
    i18next.changeLanguage("hi");
    const hi = renderToStaticMarkup(React.createElement(ReportContent, { report: reportsData[0], seo: undefined }));
    check("5g: Hindi top CTA", hi.includes(`यह रिपोर्ट पाएं — ₹${reportsData[0].price}`));
    routeSlug = reportsData[0].slug;
    const hiCheckout = renderToStaticMarkup(React.createElement(load("components/reports/ReportCheckout").default));
    check("5h: Hindi reassurance", hiCheckout.includes("Razorpay द्वारा सुरक्षित भुगतान") && hiCheckout.includes("रिफंड नीति"));
    i18next.changeLanguage("en");

    const Page = load("app/reports/[slug]/page.tsx").default;
    let pages = 0;
    for (const report of reportsData) {
      if (report.slug === "relationship_future_report") continue; // redirect route, no checkout here
      routeSlug = report.slug;
      let h = "";
      try { h = renderToStaticMarkup(React.createElement(Page, { params: { slug: report.slug } })); }
      catch (e: any) { check(`5i: /reports/${report.slug} renders (${e?.message})`, false); continue; }
      pages++;
      check(`5j: /reports/${report.slug} -- top CTA, anchor target, Pay price all present`,
        h.includes(`Get this report — ₹${report.price}`) && h.includes('href="#report-checkout"') &&
        h.includes('id="report-checkout"') && h.includes(`Proceed to Pay ₹${report.price}`));
      check(`5k: /reports/${report.slug} -- exactly one anchor target`, (h.match(/id="report-checkout"/g) || []).length === 1);
    }
    check(`5l: all ${reportsData.length - 1} standard report pages rendered (got ${pages})`, pages === reportsData.length - 1);
  } finally {
    console.error = originalError;
  }
}

// ------------------------------------------------------------------------------------------------
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.log("\nFailures:\n" + failures.slice(0, 40).map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}
