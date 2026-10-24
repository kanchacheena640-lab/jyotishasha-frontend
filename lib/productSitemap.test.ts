/** F10-P04 -- paid-report product URLs in the XML sitemap.
 * EXECUTES the real app/sitemap.ts (TypeScript transpiled on the fly, "@/"
 * alias resolved to the repo root; pure data, no network) and checks the
 * product URL set. Compile with tsc alongside the other lib/*.test.ts files,
 * then run with Node from the repo root.
 */
import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import * as assert from "assert";
import { reportsData } from "../app/data/reportsData";
import { listFocusedReportHumanSlugs } from "../app/data/focusedReportsConfig";
import { RELATIONSHIP_REPORT_PATH, RELATIONSHIP_REPORT_SLUG } from "./reportProductSeo";

const ROOT = process.cwd();
const SITE = "https://www.jyotishasha.com";
let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}

// Minimal TS loader for app/sitemap.ts and its imports.
const Module = require("module");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request: string, parent: any, ...rest: any[]) {
  let mapped = request.startsWith("@/") ? path.join(ROOT, request.slice(2)) : request;
  if ((mapped.startsWith(".") || path.isAbsolute(mapped)) && !path.extname(mapped)) {
    const base = path.isAbsolute(mapped) ? mapped : path.join(path.dirname(parent.filename), mapped);
    for (const ext of [".ts", ".tsx"]) if (fs.existsSync(base + ext)) { mapped = base + ext; break; }
  }
  return originalResolve.call(this, mapped, parent, ...rest);
};
for (const ext of [".ts", ".tsx"]) {
  Module._extensions[ext] = (m: any, filename: string) => {
    const out = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      fileName: filename,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true, resolveJsonModule: true, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    m._compile(out, filename);
  };
}

async function main() {
  const entries: any[] = await require(path.join(ROOT, "app/sitemap.ts")).default();
  const byUrl = new Map(entries.map((e) => [e.url, e]));
  const urls = entries.map((e) => e.url);
  console.log(`sitemap entries: ${entries.length}`);

  const standard = reportsData.filter((r) => r.slug !== RELATIONSHIP_REPORT_SLUG);
  const reportEntries = entries.filter((e) => /^https:\/\/www\.jyotishasha\.com\/reports\/[^/]+$/.test(e.url));

  check("exactly the 25 standard /reports/<slug> product URLs, each once", () => {
    assert.equal(standard.length, 25);
    assert.deepEqual(reportEntries.map((e) => e.url).sort(), standard.map((r) => `${SITE}/reports/${r.slug}`).sort());
  });
  check("the redirected ₹199 legacy URL is NOT listed", () => {
    assert.ok(!byUrl.has(`${SITE}/reports/${RELATIONSHIP_REPORT_SLUG}`));
  });
  check("the canonical ₹199 EN + HI product URLs are listed exactly once each", () => {
    assert.equal(urls.filter((u) => u === `${SITE}${RELATIONSHIP_REPORT_PATH}`).length, 1);
    assert.equal(urls.filter((u) => u === `${SITE}/hi${RELATIONSHIP_REPORT_PATH}`).length, 1);
  });
  check("the /reports catalogue hub is listed once", () => {
    assert.equal(urls.filter((u) => u === `${SITE}/reports`).length, 1);
  });
  check("no focused report (EN or HI, product or hub) and no /hi/reports URL is listed", () => {
    assert.equal(listFocusedReportHumanSlugs().length, 63);
    assert.ok(!urls.some((u) => u.includes("/reports/focused")), "focused URL in sitemap");
    assert.ok(!urls.some((u) => u.startsWith(`${SITE}/hi/reports`)), "/hi/reports URL in sitemap");
  });
  check("product URLs carry no fabricated lastModified", () => {
    const productUrls = [...reportEntries.map((e) => e.url), `${SITE}/reports`, `${SITE}${RELATIONSHIP_REPORT_PATH}`, `${SITE}/hi${RELATIONSHIP_REPORT_PATH}`];
    for (const u of productUrls) assert.ok(!("lastModified" in byUrl.get(u)), `${u} has lastModified`);
  });
  check("scope: non-product URLs are unchanged (still emitted with lastModified)", () => {
    for (const u of [`${SITE}/love`, `${SITE}/hi/love`, `${SITE}/privacy-policy`, `${SITE}/tools`]) {
      assert.ok(byUrl.has(u), `${u} missing`);
      assert.ok("lastModified" in byUrl.get(u), `${u} lost lastModified`);
    }
  });
  check("every listed product URL is absolute, https, www, no trailing slash, and unique", () => {
    const product = urls.filter((u) => u.includes("/reports") || u.includes(RELATIONSHIP_REPORT_PATH));
    for (const u of product) assert.ok(/^https:\/\/www\.jyotishasha\.com\/[^?#]*[^/]$/.test(u), u);
    assert.equal(new Set(product).size, product.length);
  });
  check("standard product pages declare the same canonical the sitemap lists", () => {
    const page = fs.readFileSync(path.join(ROOT, "app/reports/[slug]/page.tsx"), "utf8");
    assert.ok(page.includes("`https://www.jyotishasha.com/reports/${report.slug}`"), "canonical pattern changed");
  });
  console.log(`\nTOTAL: ${passed} passed, 0 failed`);
}
main().catch((e) => { console.error("FAIL:", e); process.exit(1); });
