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
import { getReportDisplayName, getReportProductPath, RELATIONSHIP_REPORT_PATH, RELATIONSHIP_REPORT_SLUG } from "./reportProductSeo";

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
  "@/lib/reportProductSeo": { getReportDisplayName, RELATIONSHIP_REPORT_PATH, RELATIONSHIP_REPORT_SLUG },
  // F10-P15: the page fetches registry availability + published reviews once;
  // stubbed here (no network in this test).
  "@/lib/reportReviews": { fetchProductActive: async () => true, fetchReviewSummary: async () => SUMMARY },
};
const SUMMARY = { product: "x", review_count: 0, average_rating: null, distribution: {}, reviews: [] };
for (const name of ["ReportCheckout", "ReportSeoSchema", "ReportContent", "ReportContentDetails", "RelatedReports", "ProductBreadcrumb", "ProductReviews"]) {
  dependencies[`@/components/reports/${name}`] = { default: name };
}
const childOfType = (tree: any, type: string) => tree.props.children.find((c: any) => c && c.type === type);
const page = load("app/reports/[slug]/page.tsx", dependencies).default;

async function pageChecks() {
  let redirectError: unknown = null;
  try { await page({ params: { slug: RELATIONSHIP_REPORT_SLUG } }); } catch (e) { redirectError = e; }
  check("relationship slug issues a server-side permanent redirect to the real product page, never a page or checkout", () => {
    assert.ok(redirectError instanceof Error && /NEXT_REDIRECT/.test(redirectError.message));
    assert.deepEqual(redirects, ["/love/report/relationship_future_report"]);
  });
  for (const report of reportsData.filter(r => r.slug !== RELATIONSHIP_REPORT_SLUG)) {
    const tree = await page({ params: { slug: report.slug } });
    check(`${report.slug} retains the standard page and checkout`, () => {
      assert.equal(tree.type, "div");
      const types = tree.props.children.filter(Boolean).map((c: any) => c.type);
      assert.ok(types.indexOf("ReportContent") < types.indexOf("ReportCheckout"), "checkout follows the report content");
      assert.ok(childOfType(tree, "ReportCheckout"), "checkout still rendered");
      assert.equal(childOfType(tree, "ReportContent").props.report.slug, report.slug);
      const crumbs = childOfType(tree, "ProductBreadcrumb").props.items;
      assert.deepEqual(crumbs.map((c: any) => c.path), ["", "/reports", `/reports/${report.slug}`]);
      assert.equal(crumbs[2].name, getReportDisplayName(report, undefined, "en"), "last crumb = H1/Product name");
      // Visible reviews and the Product JSON-LD get the SAME fetched data.
      assert.equal(childOfType(tree, "ProductReviews").props.summary, SUMMARY);
      assert.equal(childOfType(tree, "ReportSeoSchema").props.reviews, SUMMARY);
      assert.equal(childOfType(tree, "ReportSeoSchema").props.active, true);
    });
  }
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
pageChecks().then(() => {
  console.log(`TOTAL: ${passed} passed, 0 failed`);
}).catch((e) => { console.error("FAIL:", e); process.exit(1); });
