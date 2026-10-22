/**
 * lib/yogaReportCtaGuards.test.ts
 *
 * R2-B2 -- Kundali yoga report CTA regression guards.
 *
 * The 13 yoga tool results (components/ToolResultSection.tsx) used to render
 * the backend `upsell` blocks: 26 <button>s with no handler, offering a
 * per-yoga "₹49" report and a "₹199" 14-Rajyog bundle that do not exist, even
 * when the yoga was not present. These guards pin the replacement: a real
 * Link to an existing report (or the /reports catalog), shown only when the
 * yoga is active, honest EN/HI copy, catalog prices, and fire-and-forget
 * click tracking that never carries user data or blocks navigation.
 *
 * Components are rendered from SOURCE through a test-only TypeScript loader
 * that maps the `@/` alias and stubs next/navigation's useParams (to select
 * the route locale). No network, no backend, no payments.
 *
 * Standalone, repo convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/yogaReportCtaGuards.test.ts
 *   node .ts-test-out/yogaReportCtaGuards.test.js
 * (then remove .ts-test-out/ -- build output, never committed.)
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports -- test-only module loader */
import * as fs from "fs";
import * as path from "path";

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

// ---- repo root + test-only TypeScript source loader (maps `@/`, stubs useParams) ----------------
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

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
let routeLocale: "en" | "hi" = "en";
const realNavigation = require("next/navigation");
const originalLoad = NodeModule._load;
NodeModule._load = function (request: string, ...rest: any[]) {
  if (request === "next/navigation") return { ...realNavigation, useParams: () => ({ locale: routeLocale }) };
  return originalLoad.call(this, request, ...rest);
};
const load = (rel: string): any => require(path.join(root, rel));

const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { YOGA_REPORT_RULES, resolveYogaReportCta, REPORTS_CATALOG_PATH } = load("lib/yogaReportCta");
const { reportsData } = load("app/data/reportsData");
const { toolsData } = load("app/data/toolsData");
const { WebsiteEvents } = load("lib/websiteEvents");
const yogaCtaModule = load("components/YogaReportCta");
const ToolResultSection = load("components/ToolResultSection").default;

const LOCALES = ["en", "hi"] as const;
const DEVANAGARI = /[ऀ-ॿ]/;
const reportBySlug = new Map<string, any>(reportsData.map((r: any) => [r.slug, r]));
const toolSlugs = new Set<string>(toolsData.map((t: any) => t.slug));

// Approved R2-B2 mapping: yoga key -> [tool page, destination].
const APPROVED: Record<string, [string, string]> = {
  parashari_rajyog: ["parashari-rajyog", "/reports/career_report"],
  rajya_sambandh_rajyog: ["rajya-sambandh", "/reports/career_report"],
  dharma_karmadhipati_rajyog: ["dharma-karmadhipati", "/reports/career_report"],
  panch_mahapurush_yog: ["panch-mahapurush", "/reports/career_report"],
  gajakesari_yog: ["gajakesari-yog", "/reports/career_report"],
  dhan_yog: ["dhan-yog", "/reports/financial_report"],
  kuber_rajyog: ["kuber-rajyog", "/reports/financial_report"],
  lakshmi_yog: ["lakshmi-yog", "/reports/financial_report"],
  chandra_mangal_yog: ["chandra-mangal", "/reports/financial_report"],
  adhi_rajyog: ["adhi-rajyog", REPORTS_CATALOG_PATH],
  neechbhang_rajyog: ["neechbhang-rajyog", REPORTS_CATALOG_PATH],
  vipreet_rajyog: ["vipreet-rajyog", REPORTS_CATALOG_PATH],
  shubh_kartari_yog: ["shubh-kartari", REPORTS_CATALOG_PATH],
};
const KEYS = Object.keys(APPROVED);

// Copy the old backend upsell rendered -- must never appear again.
const FORBIDDEN = [/₹\s?49\b/, /₹\s?199\b/, /14 Rajyog/i, /14 राजयोग/, /Unlock the full/i, /Dosha Analysis/i, /दोष विश्लेषण/, /@ ₹/];

// Backend-shaped yoga entry, including the (now ignored) misleading upsell.
function yogaEntry(isActive: boolean | undefined): any {
  return {
    id: "x", name: "Yoga", heading: { en: "Yoga heading", hi: "योग" }, description: { en: "Desc", hi: "विवरण" },
    strength: isActive ? "Strong" : "None", emoji: "*", challenge: "", positives: [], reasons: [],
    ...(isActive === undefined ? {} : { is_active: isActive }),
    upsell: {
      products: [
        { title: { en: "Unlock the full power — Get Full Report @ ₹49", hi: "₹49 में" }, dropdown: { en: ["a"], hi: ["b"] }, cta: { en: "Get Full Report @ ₹49", hi: "₹49" } },
        { title: { en: "Get All 14 Rajyog Reports + Dosha Analysis @ ₹199", hi: "₹199" }, cta: { en: "Download Complete Report @ ₹199", hi: "₹199" } },
      ],
    },
  };
}
function kundali(key: string, entry: any): any {
  return { name: "Test", dob: "1990-01-01", tob: "10:00", rashi: "Aries", lagna_sign: "Aries", latitude: 28.6, longitude: 77.2, planets: [], [key]: entry };
}

// ------------------------------------------------------------------------------------------------
section("1. mapping matches the approved table; destinations exist");
// ------------------------------------------------------------------------------------------------
check("1a: exactly the 13 approved yoga keys are mapped", Object.keys(YOGA_REPORT_RULES).sort().join() === [...KEYS].sort().join());
for (const key of KEYS) {
  const [toolId, href] = APPROVED[key];
  const rule = YOGA_REPORT_RULES[key];
  check(`1b: ${key} -> tool page ${toolId}`, rule?.toolId === toolId);
  check(`1c: ${key} -> tool ${toolId} exists in toolsData`, toolSlugs.has(toolId));
  if (href !== REPORTS_CATALOG_PATH) {
    const report = reportBySlug.get(href.slice("/reports/".length));
    check(`1d: ${key} -> ${href} exists in reportsData`, !!report);
    check(`1e: ${key} -> single-person ₹51 report`, report?.price === 51 && report?.slug !== "relationship_future_report");
  }
}
check("1f: app/reports/[slug] and app/reports routes exist",
  fs.existsSync(path.join(root, "app/reports/[slug]/page.tsx")) && fs.existsSync(path.join(root, "app/reports/page.tsx")));

// ------------------------------------------------------------------------------------------------
section("2. resolve: active / inactive, language, price, copy");
// ------------------------------------------------------------------------------------------------
for (const key of KEYS) {
  const [toolId, href] = APPROVED[key];
  for (const locale of LOCALES) {
    const id = `${locale}:${key}`;
    for (const [state, entry] of [["inactive", { is_active: false }], ["missing flag", {}], ["null", null], ["undefined", undefined], ["string 'true'", { is_active: "true" }]] as const) {
      check(`2a: ${id} -- ${state} -> no CTA`, resolveYogaReportCta(key, entry as any, locale) === null);
    }
    const cta = resolveYogaReportCta(key, { is_active: true }, locale);
    if (!cta) { check(`2b: ${id} -- active -> CTA`, false); continue; }
    check(`2c: ${id} -- href ${cta.href}`, cta.href === href);
    check(`2d: ${id} -- kind`, cta.kind === (href === REPORTS_CATALOG_PATH ? "catalog" : "report"));
    if (cta.kind === "report") {
      const price = reportBySlug.get(href.slice("/reports/".length))?.price;
      check(`2e: ${id} -- label shows catalog price ₹${price}`, cta.label.endsWith(`₹${price}`));
      check(`2f: ${id} -- says it is not a separate yoga report`,
        locale === "hi" ? cta.description.includes("की अलग रिपोर्ट नहीं है") : /not a separate .* report/i.test(cta.description));
    } else {
      check(`2g: ${id} -- catalog copy says no separate report`,
        locale === "hi" ? cta.description.includes("अलग रिपोर्ट उपलब्ध नहीं है") : cta.description.startsWith("There is no separate"));
    }
    const all = `${cta.title} ${cta.description} ${cta.label}`;
    check(`2h: ${id} -- no forbidden pricing/promises`, FORBIDDEN.every((re) => !re.test(all)));
    if (locale === "hi") check(`2i: ${id} -- Hindi copy is Devanagari`, [cta.title, cta.description, cta.label].every((s) => DEVANAGARI.test(s)));
    else check(`2j: ${id} -- English copy has no Devanagari`, !DEVANAGARI.test(all));
    check(`2k: ${id} -- tracking ids are fixed identifiers`, cta.ctaId === `tools_${toolId}_report_cta` && cta.screenName === `tools_${toolId}`);
  }
}
{
  const original = YOGA_REPORT_RULES.dhan_yog;
  try {
    (YOGA_REPORT_RULES as any).dhan_yog = { ...original, destination: "does_not_exist_report" };
    const cta = resolveYogaReportCta("dhan_yog", { is_active: true }, "en");
    check("2l: unknown report slug falls back to the /reports catalog", cta?.kind === "catalog" && cta?.href === REPORTS_CATALOG_PATH);
  } finally {
    (YOGA_REPORT_RULES as any).dhan_yog = original;
  }
}

// ------------------------------------------------------------------------------------------------
section("3. rendered ToolResultSection (13 tools x en/hi x active/inactive)");
// ------------------------------------------------------------------------------------------------
for (const key of KEYS) {
  const [toolId, href] = APPROVED[key];
  for (const locale of LOCALES) {
    routeLocale = locale;
    const id = `${locale}:${toolId}`;
    for (const active of [true, false, undefined]) {
      let html = "";
      try {
        html = renderToStaticMarkup(React.createElement(ToolResultSection, { result: { title: "T", toolId }, kundaliData: kundali(key, yogaEntry(active)) }));
      } catch (e: any) {
        check(`3a: ${id} active=${active} -- renders (${e?.message})`, false);
        continue;
      }
      const cta = resolveYogaReportCta(key, { is_active: true }, locale);
      const hasLink = html.includes(`href="${href}"`) && html.includes(cta.title.replace(/&/g, "&amp;").replace(/'/g, "&#x27;"));
      check(`3b: ${id} active=${active} -- CTA ${active === true ? "shown" : "hidden"}`, active === true ? hasLink : !hasLink);
      check(`3c: ${id} active=${active} -- old upsell copy never rendered`, FORBIDDEN.every((re) => !re.test(html)));
      check(`3d: ${id} active=${active} -- no dead pink upsell buttons`, !/<button[^>]*bg-pink-600/.test(html));
    }
  }
}
routeLocale = "en";

// ------------------------------------------------------------------------------------------------
section("4. click tracking (fire-and-forget, ids only, never blocks navigation)");
// ------------------------------------------------------------------------------------------------
{
  const originalCtaClick = WebsiteEvents.ctaClick;
  const calls: any[][] = [];
  try {
    WebsiteEvents.ctaClick = (...args: any[]) => { calls.push(args); };
    for (const key of KEYS) {
      const element = yogaCtaModule.default({ yogaKey: key, yoga: { is_active: true }, locale: "en" });
      const link = (Array.isArray(element.props.children) ? element.props.children : [element.props.children])
        .find((c: any) => c?.props?.href);
      let prevented = false;
      const before = calls.length;
      link.props.onClick({ preventDefault: () => { prevented = true; } });
      const [toolId] = APPROVED[key];
      check(`4a: ${key} -- one ctaClick per click`, calls.length === before + 1);
      check(`4b: ${key} -- ctaClick(tools_${toolId}_report_cta, tools_${toolId})`,
        calls[calls.length - 1]?.[0] === `tools_${toolId}_report_cta` && calls[calls.length - 1]?.[1] === `tools_${toolId}`);
      check(`4c: ${key} -- navigation not prevented`, !prevented);
    }
    const sent = JSON.stringify(calls);
    check("4d: tracking never carries birth details", !/1990|10:00|28\.6|77\.2|Test/.test(sent));

    WebsiteEvents.ctaClick = () => { throw new Error("analytics down"); };
    let threw = false;
    try { yogaCtaModule.trackYogaReportCtaClick({ ctaId: "a", screenName: "b" }); } catch { threw = true; }
    check("4e: a throwing tracker never breaks the click", !threw);
  } finally {
    WebsiteEvents.ctaClick = originalCtaClick;
  }
}

// ------------------------------------------------------------------------------------------------
section("5. source guards");
// ------------------------------------------------------------------------------------------------
{
  const trs = src("components/ToolResultSection.tsx");
  check("5a: no backend upsell is read", !/\.upsell\b/.test(trs.replace(/upsell\?: \{[\s\S]*?\n {2}\};/, "")));
  check("5b: no pink upsell buttons remain", !trs.includes("bg-pink-600"));
  check("5c: exactly 13 <YogaReportCta> usages", (trs.match(/<YogaReportCta /g) || []).length === 13);
  // Each tool's result block renders the CTA for its OWN yoga key.
  for (const key of KEYS) {
    const [toolId] = APPROVED[key];
    const gate = trs.indexOf(`result.toolId === '${toolId}' && kundaliData.${key}`);
    const nextGate = trs.indexOf("result.toolId === '", gate + 1);
    const block = trs.slice(gate, nextGate === -1 ? undefined : nextGate);
    check(`5d: ${toolId} block renders <YogaReportCta yogaKey="${key}">`,
      gate !== -1 && block.includes(`<YogaReportCta yogaKey="${key}" yoga={kundaliData.${key}}`));
  }
  const comp = src("components/YogaReportCta.tsx");
  check("5e: component never calls preventDefault", !comp.includes("preventDefault"));
  check("5f: component tracks via WebsiteEvents.ctaClick only", comp.includes("WebsiteEvents.ctaClick(cta.ctaId, cta.screenName)"));
}

// ------------------------------------------------------------------------------------------------
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.log("\nFailures:\n" + failures.slice(0, 40).map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}
