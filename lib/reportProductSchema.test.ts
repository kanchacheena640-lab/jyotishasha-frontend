/** F10-P03 -- paid-report Product structured data.
 * Executes the real schema components with a stub JSX runtime (no React, no
 * browser, no network) and parses the JSON-LD each one would put in the
 * server HTML. Compile with tsc alongside the other lib/*.test.ts files, then
 * run with Node.
 */
import * as fs from "fs";
import * as vm from "vm";
import * as ts from "typescript";
import * as assert from "assert";
import { reportsData } from "../app/data/reportsData";
import { reportSeoContent } from "../app/data/reportSeoContent";
import { getFocusedReportConfigBySlug, listFocusedReportHumanSlugs } from "../app/data/focusedReportsConfig";
import { getReportDisplayName, serializeJsonLd, RELATIONSHIP_REPORT_PATH, RELATIONSHIP_REPORT_SLUG, getReportProductPath } from "./reportProductSeo";

const SITE = "https://www.jyotishasha.com";
let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}

const jsx = (type: any, props: any) => ({ type, props });
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
    fetch: () => { throw new Error("schema must never make a network request"); },
  });
  return exports;
}

/** Every <script type="application/ld+json"> element in a stub render tree. */
function jsonLdScripts(node: any, out: any[] = []): any[] {
  if (Array.isArray(node)) { node.forEach((n) => jsonLdScripts(n, out)); return out; }
  if (!node || typeof node !== "object") return out;
  if (node.type === "script" && node.props?.type === "application/ld+json") {
    const html: string = node.props.dangerouslySetInnerHTML.__html;
    assert.ok(!/<\/?script|<!--/i.test(html), "JSON-LD must not contain a raw </script> or <!--");
    out.push(JSON.parse(html));
  }
  assert.notEqual(typeof node.type === "string" ? node.type : "", "Script", "next/script must not be used");
  jsonLdScripts(node.props?.children, out);
  return out;
}

const runtime = { "react/jsx-runtime": { jsx, jsxs: jsx, Fragment: "Fragment" } };
const seoHelpers = { getReportDisplayName, serializeJsonLd, RELATIONSHIP_REPORT_PATH, RELATIONSHIP_REPORT_SLUG, getReportProductPath };

console.log("=== 1. serializer ===");
check("serializeJsonLd escapes script-terminating and comment sequences but round-trips", () => {
  const value = { a: "</script><script>alert(1)</script>", b: "<!-- x -->", c: "a & b", d: "line\u2028sep" };
  const out = serializeJsonLd(value);
  assert.ok(!out.includes("</script") && !out.includes("<!--") && !out.includes("<"));
  assert.deepEqual(JSON.parse(out), value);
});

console.log("\n=== 2. standard reports (server-rendered Product + Breadcrumb) ===");
const ReportSeoSchema = load("components/reports/ReportSeoSchema.tsx", {
  ...runtime,
  "@/lib/seo/articleSchema": { SITE_URL: SITE },
  "@/lib/reportProductSeo": seoHelpers,
}).default;
const standard = reportsData.filter((r) => r.slug !== RELATIONSHIP_REPORT_SLUG);
check("26 standard catalog products (25 /reports pages + the ₹199 love page)", () => {
  assert.equal(reportsData.length, 26);
  assert.equal(standard.length, 25);
});
for (const report of standard) {
  check(`${report.slug}: one Product + one BreadcrumbList, matching the visible page`, () => {
    const seo = (reportSeoContent as any)[report.slug];
    const blocks = jsonLdScripts(ReportSeoSchema({ report, seoContent: seo }));
    const products = blocks.filter((b) => b["@type"] === "Product");
    assert.equal(products.length, 1, "exactly one Product entity");
    assert.equal(blocks.filter((b) => b["@type"] === "BreadcrumbList").length, 1);
    assert.equal(blocks.filter((b) => b["@type"] === "FAQPage").length, 0, "no FAQPage (rich result retired)");
    const p = products[0];
    assert.equal(p.name, getReportDisplayName(report, seo, "en"), "name = visible H1");
    assert.ok(p.name.length > 0);
    assert.deepEqual(p.image, [`${SITE}${report.image}`], "absolute image URL");
    assert.ok(fs.existsSync(`public${report.image}`), "image asset exists");
    assert.equal(p.brand.name, "Jyotishasha");
    assert.equal(p.offers.price, report.price);
    assert.equal(p.offers.priceCurrency, "INR");
    assert.equal(p.offers.url, `${SITE}/reports/${report.slug}`);
    assert.equal(p.offers.availability, undefined, "no unverifiable availability claim (F10-P05)");
    assert.equal(p.offers.shippingDetails, undefined, "no physical shipping claim");
    assert.equal(p.offers.hasMerchantReturnPolicy.returnPolicyCategory, "https://schema.org/MerchantReturnNotPermitted");
    assert.equal(p.aggregateRating, undefined);
    assert.equal(p.review, undefined);
    const crumbs = blocks.find((b) => b["@type"] === "BreadcrumbList").itemListElement;
    assert.deepEqual(crumbs.map((c: any) => c.position), [1, 2, 3]);
    assert.equal(crumbs[2].item, p.offers.url);
  });
}

console.log("\n=== 3. focused reports (server-rendered, still noindex, no new claims) ===");
const FocusedReportSeoSchema = load("components/focused-reports/FocusedReportSeoSchema.tsx", {
  ...runtime,
  "@/lib/seo/articleSchema": { SITE_URL: SITE },
  "@/lib/reportProductSeo": seoHelpers,
}).default;
const focusedSlugs = listFocusedReportHumanSlugs();
check("63 focused products", () => assert.equal(focusedSlugs.length, 63));
for (const slug of focusedSlugs) {
  const config = getFocusedReportConfigBySlug(slug)!;
  for (const locale of ["en", "hi"] as const) {
    check(`${slug} [${locale}]: one Product, unchanged fields, no availability/image claims`, () => {
      const blocks = jsonLdScripts(FocusedReportSeoSchema({ config, title: config.title[locale], locale }));
      const products = blocks.filter((b) => b["@type"] === "Product");
      assert.equal(products.length, 1);
      const p = products[0];
      assert.equal(p.name, config.title[locale]);
      assert.equal(p.offers.price, config.priceRupees);
      assert.equal(p.offers.priceCurrency, "INR");
      assert.equal(p.offers.url, `${SITE}${locale === "hi" ? "/hi" : ""}/reports/focused/${slug}`);
      assert.equal(p.offers.availability, undefined);
      assert.equal(p.image, undefined);
      assert.equal(blocks.filter((b) => b["@type"] === "BreadcrumbList").length, 1);
    });
  }
}
check("focused routes keep noindex in metadata (hub and product)", () => {
  assert.ok(/robots: \{ index: false, follow: true \}/.test(fs.readFileSync("app/[locale]/reports/focused/[slug]/page.tsx", "utf8")));
  assert.ok(/robots: \{ index: false, follow: true \}/.test(fs.readFileSync("app/[locale]/reports/focused/page.tsx", "utf8")));
});

console.log("\n=== 4. ₹199 relationship report page (EN + HI) ===");
const rel = reportsData.find((r) => r.slug === RELATIONSHIP_REPORT_SLUG)!;
const loveModule = load("app/[locale]/love/report/relationship_future_report/page.tsx", {
  ...runtime,
  "./RelationshipFutureReportForm": { default: "RelationshipFutureReportForm" },
  next: {},
  "@/app/data/reportsData": { reportsData },
  "@/lib/seo/articleSchema": { SITE_URL: SITE },
  "@/lib/reportProductSeo": seoHelpers,
});
async function relationshipChecks() {
for (const locale of ["en", "hi"] as const) {
  const prefix = locale === "hi" ? "/hi" : "";
  const meta = await loveModule.generateMetadata({ params: { locale } });
  check(`[${locale}] metadata: self-canonical, reciprocal hreflang, x-default, indexable`, () => {
    assert.equal(meta.alternates.canonical, `${SITE}${prefix}${RELATIONSHIP_REPORT_PATH}`);
    assert.deepEqual(meta.alternates.languages, {
      en: `${SITE}${RELATIONSHIP_REPORT_PATH}`,
      hi: `${SITE}/hi${RELATIONSHIP_REPORT_PATH}`,
      "x-default": `${SITE}${RELATIONSHIP_REPORT_PATH}`,
    });
    assert.equal(meta.robots, undefined, "no robots override");
  });
  check(`[${locale}] page: H1, visible ₹199, Product + Breadcrumb JSON-LD, checkout form kept`, () => {
    const tree = loveModule.default({ params: { locale } });
    const blocks = jsonLdScripts(tree);
    const products = blocks.filter((b) => b["@type"] === "Product");
    assert.equal(products.length, 1);
    const p = products[0];
    assert.equal(rel.price, 199);
    assert.equal(p.offers.price, 199);
    assert.equal(p.offers.priceCurrency, "INR");
    assert.equal(p.offers.url, `${SITE}${prefix}${RELATIONSHIP_REPORT_PATH}`);
    assert.deepEqual(p.image, [`${SITE}${rel.image}`]);
    assert.ok(fs.existsSync(`public${rel.image}`));
    assert.equal(p.offers.shippingDetails, undefined);
    assert.equal(p.offers.availability, undefined, "no availability claim (unresolved item)");
    const crumbs = blocks.find((b) => b["@type"] === "BreadcrumbList").itemListElement;
    assert.equal(crumbs[2].item, p.offers.url);
    const text = JSON.stringify(tree);
    assert.ok(text.includes(p.name), "H1 shows the Product name");
    assert.ok(/"\s*₹",199/.test(text), "₹199 visible in the server-rendered markup");
    assert.ok(text.includes("RelationshipFutureReportForm"), "checkout form still rendered");
  });
}
}
relationshipChecks().then(() => {
  console.log(`\nTOTAL: ${passed} passed, 0 failed`);
}).catch((e) => { console.error("FAIL:", e); process.exit(1); });
