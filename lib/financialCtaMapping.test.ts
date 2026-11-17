/**
 * lib/financialCtaMapping.test.ts
 *
 * Financial Astrology P0 -- honest CTA mapping. Renders every Financial guide (EN + HI) in-process
 * through the real route (same test-only loader as marriageClusterSsr.test.ts) and checks:
 *   - each guide shows exactly the approved products, in the approved order, at the exact routes
 *     (EXPECTED below is written independently of lib/domains/financial-astrology/_ctas.ts);
 *   - prices come from the catalogs (reportsData ₹99 / focusedReportsConfig ₹51);
 *   - focused cards state the horizon their content (and backend generator) uses: 12 months / 5 years;
 *   - base-report and free-tool cards make no timing, transit or forecast promises, and tools no PDF;
 *   - Hindi pages localize tool + focused links and flag English-only report pages;
 *   - no old CtaBlock link (or any other /reports, /tools link) remains outside the panel.
 *
 * Run (repo convention):
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/financialCtaMapping.test.ts
 *   node .ts-test-out/financialCtaMapping.test.js
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports -- test-only module loader */
import * as fs from "fs";
import * as path from "path";

let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);

const ts = require("typescript");
const NodeModule: any = require("module");
const originalResolve = NodeModule._resolveFilename;
NodeModule._resolveFilename = function (request: string, parent: any, ...rest: any[]) {
  let mapped = request.startsWith("@/") ? path.join(root, request.slice(2)) : request;
  // As in marriageClusterSnapshot.test.ts: like the Next bundler, a .ts module wins over a same-named
  // .json sibling (app/data/intentCatalog.ts vs intentCatalog.json); Node alone would pick the JSON.
  const abs = mapped.startsWith(".") && parent?.filename ? path.resolve(path.dirname(parent.filename), mapped) : mapped;
  if (path.isAbsolute(abs) && !path.extname(abs) && fs.existsSync(`${abs}.ts`) && fs.existsSync(`${abs}.json`)) mapped = `${abs}.ts`;
  return originalResolve.call(this, mapped, parent, ...rest);
};
for (const ext of [".ts", ".tsx"]) {
  NodeModule._extensions[ext] = (m: any, filename: string) => {
    m._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      fileName: filename,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
    }).outputText, filename);
  };
}
NodeModule._extensions[".css"] = (m: any) => { m.exports = new Proxy({}, { get: (_t: any, k: any) => (k === "__esModule" ? false : String(k)) }); };
const load = (rel: string): any => require(path.join(root, rel));
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; } else { failed++; console.log(`  FAIL: ${label}`); }
}

const resolver = load("lib/authority-engine/resolver");
const route = load("app/[locale]/financial-astrology/[slug]/page.tsx").default;
const { reportsData } = load("app/data/reportsData");
const focusedCfg = load("app/data/focusedReportsConfig");
const { toolsData } = load("app/data/toolsData");
const domain = resolver.getAuthorityDomain("financial-astrology");
const slugs: string[] = resolver.getAllTopicSlugs(domain);

// The approved mapping, as locale-neutral paths (base reports have no /hi route).
const EXPECTED: Record<string, string[]> = {
  "best-career":           ["/reports/career_report", "/tools/career-path"],
  "job-vs-business":       ["/reports/business_report", "/reports/focused/business-start-timing", "/tools/business-path"],
  "government-job":        ["/reports/government_job_report", "/tools/government-job"],
  "salary-growth":         ["/reports/focused/salary-growth-timing", "/reports/financial_report", "/tools/dhan-yog"],
  "new-job-chances":       ["/reports/focused/new-job-timing", "/reports/career_report", "/tools/grah-dasha-finder"],
  "job-change-prediction": ["/reports/focused/job-change-now", "/reports/career_report", "/tools/grah-dasha-finder"],
  "promotion-chances":     ["/reports/focused/promotion-timing", "/reports/career_report", "/tools/grah-dasha-finder"],
  "career-growth":         ["/reports/career_report", "/reports/focused/next-strong-career-period", "/tools/grah-dasha-finder"],
  "career-challenges":     ["/reports/career_report", "/reports/focused/career-growth-delay-reason", "/tools/grah-dasha-finder"],
  "career-after-40":       ["/reports/career_report", "/reports/focused/best-career-years", "/tools/grah-dasha-finder"],
  "career-after-marriage": ["/reports/career_report"],
  "dhan-yoga":             ["/tools/dhan-yog", "/reports/financial_report", "/reports/focused/money-growth-periods"],
  "financial-stability":   ["/reports/financial_stability_report", "/reports/focused/financial-pressure-easing", "/reports/focused/financial-improvement-timing", "/tools/grah-dasha-finder"],
  "business-astrology":    ["/reports/business_report", "/reports/focused/business-growth-timing", "/reports/focused/new-venture-partnership-timing", "/reports/startup_suggestion_report", "/tools/business-path"],
};
const HORIZON: Record<string, "12" | "60"> = { "best-career-years": "60", "money-growth-periods": "60" };

const ENT: Record<string, string> = { "&amp;": "&", "&#x27;": "'", "&quot;": '"', "&lt;": "<", "&gt;": ">", "&nbsp;": " " };
const decode = (s: string) => s.replace(/&(?:amp|#x27|quot|lt|gt|nbsp);/g, (e) => ENT[e]);
const text = (html: string) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const mainOf = (html: string) => html.slice(html.indexOf("<main"), html.lastIndexOf("</main>") + 7);

// Timing/forecast words a base report or free tool must never promise.
const NO_TIMING = /transit|gochar|गोचर|month|महीन|year|वर्ष|window|forecast|timeline|predict|भविष्य|next \d|अगले|₹98|nakshatra|नक्षत्र|atmakaraka|आत्मकारक|guarantee|गारंटी/i;
const ENGLISH_ONLY_NOTICE = "यह पेज अंग्रेज़ी में है; फ़ॉर्म में रिपोर्ट की भाषा हिंदी चुन सकते हैं।";

check("all 14 approved guides are registered, and nothing else", JSON.stringify([...slugs].sort()) === JSON.stringify(Object.keys(EXPECTED).sort()));
check("destination route files exist (base report, focused report, tool)",
  ["app/reports/[slug]/page.tsx", "app/[locale]/reports/focused/[slug]/page.tsx", "app/[locale]/tools/[toolId]/page.tsx"]
    .every((f) => fs.existsSync(path.join(root, f))));

let cards = 0;
for (const slug of slugs) {
  for (const locale of ["en", "hi"] as const) {
    const where = `${locale}/${slug}`;
    const main = mainOf(renderToStaticMarkup(React.createElement(route, { params: { locale, slug } })));
    const start = main.indexOf("data-financial-cta-panel");
    check(`${where}: exactly one Financial CTA panel`, start > 0 && main.indexOf("data-financial-cta-panel", start + 1) === -1);
    const panelStart = main.lastIndexOf("<div", start);
    const blocks = [...main.matchAll(/<div[^>]*data-cta-kind="(report|focused|tool)"[^>]*>([\s\S]*?)<\/div>(?=<div[^>]*data-cta-kind=|<\/div>)/g)];
    const panelEnd = blocks.length ? main.indexOf(blocks[blocks.length - 1][0]) + blocks[blocks.length - 1][0].length : start;

    const expected = EXPECTED[slug].map((p) => (locale === "hi" && !p.startsWith("/reports/") ? `/hi${p}` : locale === "hi" && p.startsWith("/reports/focused/") ? `/hi${p}` : p));
    const hrefs = blocks.map((b) => (b[2].match(/href="([^"]+)"/) || [])[1]);
    check(`${where}: destinations ${JSON.stringify(hrefs)} == ${JSON.stringify(expected)}`, JSON.stringify(hrefs) === JSON.stringify(expected));

    // No other product link anywhere in <main> (old CtaBlocks removed, nothing duplicated).
    const outside = (main.slice(0, panelStart) + main.slice(panelEnd)).match(/href="(?:\/hi)?\/(?:reports|tools)\/[^"]*"/g) || [];
    check(`${where}: no /reports or /tools link outside the panel (${outside.join(",")})`, outside.length === 0);
    check(`${where}: one H1`, (main.match(/<h1\b/g) || []).length === 1);

    blocks.forEach((b, i) => {
      cards++;
      const kind = b[1];
      const body = text(b[2]);
      const href = hrefs[i] || "";
      const price = (body.match(/₹(\d+)/) || [])[1];
      if (kind === "report") {
        const rslug = href.replace("/reports/", "");
        const product = reportsData.find((r: any) => r.slug === rslug);
        check(`${where}: ${rslug} exists in reportsData`, Boolean(product));
        check(`${where}: ${rslug} shows the catalog price ₹${product?.price} (= ₹99)`, price === String(product?.price) && price === "99");
        check(`${where}: ${rslug} card makes no timing/forecast promise`, !NO_TIMING.test(body));
        check(`${where}: ${rslug} Hindi notice present only on Hindi pages`, locale === "hi" ? body.includes(ENGLISH_ONLY_NOTICE) : !body.includes(ENGLISH_ONLY_NOTICE));
      } else if (kind === "focused") {
        const human = href.replace(/^(\/hi)?\/reports\/focused\//, "");
        const config = focusedCfg.getFocusedReportConfigBySlug(human);
        check(`${where}: focused '${human}' exists in focusedReportsConfig`, Boolean(config));
        check(`${where}: focused '${human}' shows the catalog price ₹${config?.priceRupees} (= ₹51)`, price === String(config?.priceRupees) && price === "51");
        const months = HORIZON[human] || "12";
        const promised = months === "60" ? /5 years|five years|5 वर्ष|पाँच वर्ष/ : /12 months|12 महीने|12 महीनों/;
        const other = months === "60" ? /12 months|12 महीने|12 महीनों/ : /5 years|five years|5 वर्ष|पाँच वर्ष/;
        check(`${where}: focused '${human}' states its ${months}-month horizon only`, promised.test(body) && !other.test(body));
        const content = fs.readFileSync(path.join(root, "app/data/focused-report-content", `${config.questionKey}.ts`), "utf8");
        check(`${where}: '${human}' horizon matches its content file`, months === "60" ? /five years|5 years/i.test(content) : /12 months|12-month/.test(content));
        const question = focusedCfg.getFocusedReportCatalogEntry(config).question.question[locale];
        check(`${where}: '${human}' heading is the catalog question`, body.includes(text(question)));
      } else {
        const tslug = href.replace(/^(\/hi)?\/tools\//, "");
        check(`${where}: tool '${tslug}' exists in toolsData`, toolsData.some((t: any) => t.slug === tslug));
        check(`${where}: tool '${tslug}' makes no timing/transit/PDF/price promise`, !NO_TIMING.test(body) && !/PDF|₹/.test(body));
        check(`${where}: tool '${tslug}' mentions dasha only if it is the dasha finder`, tslug === "grah-dasha-finder" || !/dasha|दशा/i.test(body));
        check(`${where}: tool '${tslug}' localized`, locale === "hi" ? href.startsWith("/hi/tools/") : href.startsWith("/tools/"));
      }
    });
  }
}

console.log(`\nchecked ${slugs.length} guides x 2 locales, ${cards} CTA cards`);
console.log(`RESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
