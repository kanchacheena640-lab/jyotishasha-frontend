/**
 * lib/planetInHouseCtaGuards.test.ts
 *
 * R2-A2 -- planet-in-house CTA regression guards.
 *
 * Every planet-in-house page (discovered from the real content registry, both
 * locales) must render a CTA that points to a destination that genuinely
 * exists -- a real paid report, a real free tool, or the /reports catalog --
 * with honest EN/HI copy. Guards the 162 pages (81 content entries x en/hi)
 * whose legacy CTA linked to non-existent `<planet>-analysis-report` slugs.
 *
 * Pages are rendered to static HTML from SOURCE through a test-only
 * TypeScript loader that maps the `@/` path alias, so the guards check the
 * links a visitor actually receives. No network, no backend, no payments.
 *
 * Standalone, repo convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/planetInHouseCtaGuards.test.ts
 *   node .ts-test-out/lib/planetInHouseCtaGuards.test.js
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

// ---- repo root + test-only TypeScript source loader (maps `@/`) -------------------------------
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
const load = (rel: string): any => require(path.join(root, rel));

const { renderToStaticMarkup } = require("react-dom/server");

const { planetInHouseList } = load("lib/planetInHouse/index");
const { resolvePlanetInHouseCta, PLANET_IN_HOUSE_CTA_RULES, MANGAL_DOSH_HOUSES, REPORTS_CATALOG_PATH } =
  load("lib/planetInHouse/ctaDestinations");
const { reportsData } = load("app/data/reportsData");
const { toolsData } = load("app/data/toolsData");
const pageModule = load("app/[locale]/planet-in-house/[slug]/page.tsx");

const LOCALES = ["en", "hi"] as const;
const reportBySlug = new Map<string, any>(reportsData.map((r: any) => [r.slug, r]));
const toolSlugs = new Set<string>(toolsData.map((t: any) => t.slug));
const DEVANAGARI = /[ऀ-ॿ]/;

// Approved R2-A2 mapping (planet -> destination). Mars depends on the house.
const EXPECTED_REPORT: Record<string, string> = {
  saturn: "saturn_transit_report",
  jupiter: "jupiter_transit_report",
  venus: "love_relationship_report",
};
const CATALOG_PLANETS = new Set(["rahu", "ketu", "mercury"]);

function expectedHref(planetSlug: string, house: number, locale: "en" | "hi"): string {
  if (EXPECTED_REPORT[planetSlug]) return `/reports/${EXPECTED_REPORT[planetSlug]}`;
  if (planetSlug === "mars" && MANGAL_DOSH_HOUSES.includes(house)) return `${locale === "hi" ? "/hi" : ""}/tools/mangal-dosh`;
  return REPORTS_CATALOG_PATH;
}

// Copy that promised products/services that do not exist -- must never render again.
const FORBIDDEN_COPY = [
  /every other planet/i,
  /premium consultation/i,
  /Personalized Mars Report/i,
  /Personalized PDF Report/i,
  /analysis-report/i,
  /प्रीमियम परामर्श/,
  /हर दूसरे ग्रह/,
];

// ------------------------------------------------------------------------------------------------
section("1. destinations exist (catalog, tool and route files)");
// ------------------------------------------------------------------------------------------------
check("1a: app/reports/[slug]/page.tsx route exists", fs.existsSync(path.join(root, "app/reports/[slug]/page.tsx")));
check("1b: app/reports/page.tsx (catalog) route exists", fs.existsSync(path.join(root, "app/reports/page.tsx")));
check("1c: app/[locale]/tools/[toolId]/page.tsx route exists", fs.existsSync(path.join(root, "app/[locale]/tools/[toolId]/page.tsx")));
check("1d: mangal-dosh is a real free tool in toolsData", toolSlugs.has("mangal-dosh"));
for (const slug of Object.values(EXPECTED_REPORT)) {
  const report = reportBySlug.get(slug);
  check(`1e: ${slug} exists in reportsData`, !!report);
  check(`1f: ${slug} is a single-person ₹51 report`, report?.price === 51 && slug !== "relationship_future_report");
}

// ------------------------------------------------------------------------------------------------
section("2. mapping coverage");
// ------------------------------------------------------------------------------------------------
const planetsWithLegacyCta = new Set<string>(planetInHouseList.filter((d: any) => d.cta).map((d: any) => d.planetSlug));
for (const p of planetsWithLegacyCta) {
  check(`2a: planet "${p}" with CTA content has a mapping rule`, typeof PLANET_IN_HOUSE_CTA_RULES[p] === "function");
}
check("2b: the 7 approved planets are exactly the planets with CTA content",
  [...planetsWithLegacyCta].sort().join(",") === ["jupiter", "ketu", "mars", "mercury", "rahu", "saturn", "venus"].join(","));
check("2c: content registry has 108 planet-in-house pages", planetInHouseList.length === 108);

// ------------------------------------------------------------------------------------------------
section("3. resolved CTA per page (216 = 108 x en/hi)");
// ------------------------------------------------------------------------------------------------
let ctaPages = 0;
const kindCounts: Record<string, number> = {};
for (const data of planetInHouseList) {
  for (const locale of LOCALES) {
    const id = `${locale}:${data.slug}`;
    const cta = resolvePlanetInHouseCta(data, locale);
    if (!data.cta) {
      check(`3a: ${id} -- no legacy CTA, so no CTA rendered`, cta === null);
      continue;
    }
    ctaPages++;
    if (!cta) { check(`3b: ${id} -- CTA resolved`, false); continue; }
    kindCounts[cta.kind] = (kindCounts[cta.kind] || 0) + 1;

    check(`3c: ${id} -- href matches approved mapping (${cta.href})`, cta.href === expectedHref(data.planetSlug, data.house, locale));
    check(`3d: ${id} -- legacy slug not used`, !cta.href.includes(data.cta.reportSlug));

    if (cta.kind === "report") {
      const slug = cta.href.replace(/^\/reports\//, "");
      const report = reportBySlug.get(slug);
      check(`3e: ${id} -- report slug exists in reportsData`, !!report);
      check(`3f: ${id} -- label shows the catalog price ₹${report?.price}`, cta.label.includes(`₹${report?.price}`));
    } else if (cta.kind === "free_tool") {
      check(`3g: ${id} -- free tool exists`, toolSlugs.has(cta.href.split("/").pop() as string));
    } else {
      check(`3h: ${id} -- catalog CTA points to /reports`, cta.href === REPORTS_CATALOG_PATH);
      check(`3i: ${id} -- catalog CTA only for planets without a report`, CATALOG_PLANETS.has(data.planetSlug) || data.planetSlug === "mars");
    }

    // Copy: honest, localized, non-empty.
    const copy = `${cta.title} ${cta.description} ${cta.label}`;
    check(`3j: ${id} -- title/description/label non-empty`, !!cta.title && !!cta.description && !!cta.label);
    check(`3k: ${id} -- no forbidden/misleading copy`, FORBIDDEN_COPY.every((re) => !re.test(copy)));
    if (locale === "hi") check(`3l: ${id} -- Hindi copy is Devanagari`, DEVANAGARI.test(cta.title) && DEVANAGARI.test(cta.description) && DEVANAGARI.test(cta.label));
    else check(`3m: ${id} -- English copy has no Devanagari`, !DEVANAGARI.test(copy));
    if (data.planetSlug === "saturn" || data.planetSlug === "jupiter") {
      check(`3n: ${id} -- transit report copy says current transit`,
        locale === "hi" ? cta.title.includes("वर्तमान गोचर") && cta.description.includes("वर्तमान गोचर")
                        : /current transit/i.test(cta.title) && /current transit/i.test(cta.description));
      check(`3o: ${id} -- transit copy disclaims birth-placement analysis`,
        locale === "hi" ? cta.description.includes("जन्म के ग्रह-स्थान का विश्लेषण नहीं") : /not an analysis of your birth placement/i.test(cta.description));
    }
  }
}
check(`3p: 162 pages render a CTA (got ${ctaPages})`, ctaPages === 162);
console.log(`  CTA kinds: ${JSON.stringify(kindCounts)}`);

// ------------------------------------------------------------------------------------------------
section("4. fallback never renders a broken link");
// ------------------------------------------------------------------------------------------------
{
  const sample = planetInHouseList.find((d: any) => d.planetSlug === "saturn" && d.cta);
  const original = PLANET_IN_HOUSE_CTA_RULES.saturn;
  try {
    (PLANET_IN_HOUSE_CTA_RULES as any).saturn = () => ({ kind: "report", reportSlug: "does_not_exist_report", copy: () => ({}) });
    const cta = resolvePlanetInHouseCta(sample, "en");
    check("4a: unknown report slug falls back to the /reports catalog", cta?.kind === "catalog" && cta?.href === REPORTS_CATALOG_PATH);
  } finally {
    (PLANET_IN_HOUSE_CTA_RULES as any).saturn = original;
  }
}

// ------------------------------------------------------------------------------------------------
section("5. rendered HTML (216 pages)");
// ------------------------------------------------------------------------------------------------
let rendered = 0;
for (const data of planetInHouseList) {
  for (const locale of LOCALES) {
    const id = `${locale}:${data.slug}`;
    let html = "";
    try {
      html = renderToStaticMarkup(pageModule.default({ params: { slug: data.slug, locale } }));
      rendered++;
    } catch (e: any) {
      check(`5a: ${id} -- renders (${e?.message})`, false);
      continue;
    }
    const hrefs = [...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);
    check(`5b: ${id} -- no *-analysis-report link`, hrefs.every((h) => !h.includes("analysis-report")));
    for (const h of hrefs.filter((x) => x.startsWith("/reports/"))) {
      check(`5c: ${id} -- rendered report link ${h} exists`, reportBySlug.has(h.slice("/reports/".length)));
    }
    if (data.cta) {
      const cta = resolvePlanetInHouseCta(data, locale);
      check(`5d: ${id} -- CTA link rendered`, !!cta && hrefs.includes(cta.href));
      check(`5e: ${id} -- legacy CTA copy not rendered`, !html.includes(data.cta.title) && !html.includes(data.cta.title_hi));
    }
    check(`5f: ${id} -- no forbidden copy anywhere in the CTA area`, !/every other planet|premium consultation|प्रीमियम परामर्श/i.test(html));
  }
}
check(`5g: all 216 pages rendered (got ${rendered})`, rendered === 216);

// ------------------------------------------------------------------------------------------------
section("6. source guards");
// ------------------------------------------------------------------------------------------------
const pageSrc = src("app/[locale]/planet-in-house/[slug]/page.tsx");
check("6a: page renders the CTA from resolvePlanetInHouseCta", pageSrc.includes("resolvePlanetInHouseCta(data"));
check("6b: page no longer reads legacy data.cta fields", !/data\.cta\b/.test(pageSrc));
check("6c: page has no hard-coded 'Get Your Report' label", !pageSrc.includes("Get Your Report"));

// ------------------------------------------------------------------------------------------------
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.log("\nFailures:\n" + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}
