/** Execute the actual page with isolated React/Next boundaries (F10-P03: the
 * obsolete /reports/relationship_future_report URL is a SERVER-side permanent
 * redirect -- next.config.js 301 plus a permanentRedirect() fallback in the
 * route -- not an empty page with a client-side redirect).
 * Compile with tsc alongside reportPlatformCutover.test.ts, then run with Node.
 * No browser, SDK, HTTP or payment calls are allowed in this test.
 */
import * as fs from "fs";
import * as vm from "vm";
import * as ts from "typescript";
import * as assert from "assert";
import { reportsData } from "../app/data/reportsData";
import { getReportProductPath, RELATIONSHIP_REPORT_PATH, RELATIONSHIP_REPORT_SLUG } from "./reportProductSeo";

let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}

function load(file: string, dependencies: Record<string, unknown>) {
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports: Record<string, any> = {};
  vm.runInNewContext(code, {
    exports,
    require: (name: string) => {
      assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
      return dependencies[name];
    },
    fetch: () => { throw new Error("Redirect must never make a payment/network request"); },
  });
  return exports;
}

const redirects: string[] = [];
const dependencies: Record<string, unknown> = {
  "react/jsx-runtime": {
    jsx: (type: any, props: any) => ({ type, props }),
    jsxs: (type: any, props: any) => ({ type, props }),
  },
  "next/navigation": {
    notFound: () => { throw new Error("NOT_FOUND"); },
    permanentRedirect: (url: string) => { redirects.push(url); throw new Error("NEXT_REDIRECT"); },
  },
  "@/app/data/reportsData": { reportsData },
  "@/app/data/reportSeoContent": { reportSeoContent: {} },
  "@/app/data/reportRelations": { reportRelations: {} },
  "@/lib/reportProductSeo": { RELATIONSHIP_REPORT_PATH, RELATIONSHIP_REPORT_SLUG },
};
for (const name of ["ReportCheckout", "ReportSeoSchema", "ReportContent", "ReportContentDetails", "RelatedReports"]) {
  dependencies[`@/components/reports/${name}`] = { default: name };
}
const page = load("app/reports/[slug]/page.tsx", dependencies).default;
check("relationship slug issues a server-side permanent redirect to the real product page, never a page or checkout", () => {
  assert.throws(() => page({ params: { slug: RELATIONSHIP_REPORT_SLUG } }), /NEXT_REDIRECT/);
  assert.deepEqual(redirects, ["/love/report/relationship_future_report"]);
});
for (const report of reportsData.filter(r => r.slug !== RELATIONSHIP_REPORT_SLUG)) {
  check(`${report.slug} retains the standard page and checkout`, () => {
    const tree = page({ params: { slug: report.slug } });
    assert.equal(tree.type, "div");
    assert.equal(tree.props.children[1].type, "ReportCheckout");
    assert.equal(tree.props.children[0].props.report.slug, report.slug);
  });
}
check("next.config.js has the permanent 301 for the obsolete URL", () => {
  const config = fs.readFileSync("next.config.js", "utf8");
  assert.ok(/source: '\/reports\/relationship_future_report',\s*destination: '\/love\/report\/relationship_future_report',\s*permanent: true,/.test(config),
    "redirect rule missing or not permanent");
});
check("the client-only redirect component is gone", () => {
  assert.ok(!fs.existsSync("components/reports/RelationshipReportRedirect.tsx"));
});
check("internal product links point at the real, locale-correct page (no redirect hop)", () => {
  assert.equal(getReportProductPath(RELATIONSHIP_REPORT_SLUG), "/love/report/relationship_future_report");
  assert.equal(getReportProductPath(RELATIONSHIP_REPORT_SLUG, "en"), "/love/report/relationship_future_report");
  assert.equal(getReportProductPath(RELATIONSHIP_REPORT_SLUG, "hi"), "/hi/love/report/relationship_future_report");
  for (const report of reportsData.filter(r => r.slug !== RELATIONSHIP_REPORT_SLUG)) {
    assert.equal(getReportProductPath(report.slug, "hi"), `/reports/${report.slug}`);
  }
  for (const file of ["app/reports/page.tsx", "components/reports/RelatedReports.tsx", "components/authority-engine/CtaBlock.tsx"]) {
    assert.ok(fs.readFileSync(file, "utf8").includes("getReportProductPath("), `${file} must use getReportProductPath`);
  }
});
check("destination matches the existing visible catalog route", () => {
  const catalog = fs.readFileSync("app/reports/ReportsPageClient.tsx", "utf8");
  assert.ok(catalog.includes('slug === "relationship_future_report"'));
  assert.ok(catalog.includes('router.push(`/${currentLang}/love/report/${slug}`)'));
  assert.ok(fs.existsSync("app/[locale]/love/report/relationship_future_report/page.tsx"));
});
console.log(`TOTAL: ${passed} passed, 0 failed`);
