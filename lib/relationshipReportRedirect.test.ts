/** Execute the actual page and redirect with isolated React/Next boundaries.
 * Compile with tsc alongside reportPlatformCutover.test.ts, then run with Node.
 * No browser, SDK, HTTP or payment calls are allowed in this test.
 */
import * as fs from "fs";
import * as vm from "vm";
import * as ts from "typescript";
import * as assert from "assert";
import { reportsData } from "../app/data/reportsData";

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

const dependencies: Record<string, unknown> = {
  "react/jsx-runtime": {
    jsx: (type: any, props: any) => ({ type, props }),
    jsxs: (type: any, props: any) => ({ type, props }),
  },
  "next/navigation": { notFound: () => { throw new Error("NOT_FOUND"); } },
  "@/app/data/reportsData": { reportsData },
  "@/app/data/reportSeoContent": { reportSeoContent: {} },
  "@/app/data/reportRelations": { reportRelations: {} },
};
for (const name of ["ReportCheckout", "RelationshipReportRedirect", "ReportSeoSchema",
  "ReportContent", "ReportContentDetails", "RelatedReports"]) {
  dependencies[`@/components/reports/${name}`] = { default: name };
}
const page = load("app/reports/[slug]/page.tsx", dependencies).default;
check("relationship page renders only the redirect, never generic checkout", () => {
  assert.equal(page({ params: { slug: "relationship_future_report" } }).type,
    "RelationshipReportRedirect");
});
for (const report of reportsData.filter(r => r.slug !== "relationship_future_report")) {
  check(`${report.slug} retains the standard page and checkout`, () => {
    const tree = page({ params: { slug: report.slug } });
    assert.equal(tree.type, "div");
    assert.equal(tree.props.children[1].type, "ReportCheckout");
    assert.equal(tree.props.children[0].props.report.slug, report.slug);
  });
}
for (const [locale, language, expected, ready] of [
  [undefined, "en", "en", true], [undefined, "hi", "hi", true],
  [undefined, "hi-IN", "hi", true], ["hi", "en", "hi", true],
  [undefined, "en", "en", false],
] as const) {
  check(`redirect locale=${locale} language=${language} ready=${ready}`, () => {
    const destinations: string[] = [];
    const redirect = load("components/reports/RelationshipReportRedirect.tsx", {
      "@/i18n": {},
      react: { useEffect: (effect: () => void) => effect() },
      "next/navigation": {
        useParams: () => ({ locale }),
        useRouter: () => ({ replace: (url: string) => destinations.push(url) }),
      },
      "react-i18next": { useTranslation: () => ({ ready, i18n: { language } }) },
    }).default;
    assert.equal(redirect(), null);
    assert.deepEqual(destinations, ready
      ? [`/${expected}/love/report/relationship_future_report`] : []);
  });
}
check("destination matches the existing visible catalog route", () => {
  const catalog = fs.readFileSync("app/reports/ReportsPageClient.tsx", "utf8");
  assert.ok(catalog.includes('slug === "relationship_future_report"'));
  assert.ok(catalog.includes('router.push(`/${currentLang}/love/report/${slug}`)'));
  assert.ok(fs.existsSync("app/[locale]/love/report/relationship_future_report/page.tsx"));
});
console.log(`TOTAL: ${passed} passed, 0 failed`);
