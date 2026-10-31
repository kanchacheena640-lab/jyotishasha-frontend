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
import { CHECKOUT_COPY } from "./checkoutUx";
import * as realReviews from "./reportReviews";
import { getReportDisplayName, serializeJsonLd, RELATIONSHIP_REPORT_PATH, RELATIONSHIP_REPORT_SLUG, getReportProductPath } from "./reportProductSeo";

const SITE = "https://www.jyotishasha.com";
let passed = 0;
// Checks are queued and run in order at the end so async server components
// (which fetch availability/reviews) can be awaited.
const queue: Array<{ label?: string; header?: string; test?: () => void | Promise<void> }> = [];
function check(label: string, test: () => void | Promise<void>) {
  queue.push({ label, test });
}
function section(header: string) {
  queue.push({ header });
}
async function runQueue() {
  for (const item of queue) {
    if (item.header) { console.log(item.header); continue; }
    await item.test!();
    passed++;
    console.log(`PASS: ${item.label}`);
  }
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
// F10-P15: controllable stand-ins for the backend reads; the real pure helpers
// (offerAvailability, reviewSchemaFields) are used unchanged.
const reviewState: { active: boolean | null; summary: realReviews.ReviewSummary | null } = { active: null, summary: null };
const reviewsStub = {
  ...realReviews,
  fetchProductActive: async () => reviewState.active,
  fetchReviewSummary: async () => reviewState.summary,
};

section("=== 1. serializer ===");
check("serializeJsonLd escapes script-terminating and comment sequences but round-trips", () => {
  const value = { a: "</script><script>alert(1)</script>", b: "<!-- x -->", c: "a & b", d: "line\u2028sep" };
  const out = serializeJsonLd(value);
  assert.ok(!out.includes("</script") && !out.includes("<!--") && !out.includes("<"));
  assert.deepEqual(JSON.parse(out), value);
});

section("\n=== 2. standard reports (server-rendered Product + Breadcrumb) ===");
const ReportSeoSchema = load("components/reports/ReportSeoSchema.tsx", {
  ...runtime,
  "@/lib/seo/articleSchema": { SITE_URL: SITE },
  "@/lib/reportProductSeo": seoHelpers,
  "@/lib/reportReviews": reviewsStub,
}).default;
const standard = reportsData.filter((r) => r.slug !== RELATIONSHIP_REPORT_SLUG);
check("26 standard catalog products (25 /reports pages + the ₹199 love page)", () => {
  assert.equal(reportsData.length, 26);
  assert.equal(standard.length, 25);
});
for (const report of standard) {
  check(`${report.slug}: exactly one Product (BreadcrumbList now comes from ProductBreadcrumb), matching the visible page`, async () => {
    const seo = (reportSeoContent as any)[report.slug];
    const blocks = jsonLdScripts(await ReportSeoSchema({ report, seoContent: seo }));
    const products = blocks.filter((b) => b["@type"] === "Product");
    assert.equal(products.length, 1, "exactly one Product entity");
    assert.equal(blocks.filter((b) => b["@type"] === "BreadcrumbList").length, 0, "no second BreadcrumbList");
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
    assert.equal(p.offers.availability, undefined, "unknown registry state -> no availability claim");
    assert.equal(p.offers.shippingDetails, undefined, "no physical shipping claim");
    assert.equal(p.offers.hasMerchantReturnPolicy.returnPolicyCategory, "https://schema.org/MerchantReturnNotPermitted");
    assert.equal(p.aggregateRating, undefined);
    assert.equal(p.review, undefined);
  });
}

section("\n=== 3. focused reports (server-rendered, indexable since F12, no new claims) ===");
const FocusedReportSeoSchema = load("components/focused-reports/FocusedReportSeoSchema.tsx", {
  ...runtime,
  "@/lib/seo/articleSchema": { SITE_URL: SITE },
  "@/lib/reportProductSeo": seoHelpers,
  "@/lib/reportReviews": reviewsStub,
}).default;
const focusedSlugs = listFocusedReportHumanSlugs();
check("63 focused products", () => assert.equal(focusedSlugs.length, 63));
for (const slug of focusedSlugs) {
  const config = getFocusedReportConfigBySlug(slug)!;
  for (const locale of ["en", "hi"] as const) {
    check(`${slug} [${locale}]: one Product, unchanged fields, no availability/image claims`, async () => {
      const blocks = jsonLdScripts(await FocusedReportSeoSchema({ config, title: config.title[locale], locale }));
      const products = blocks.filter((b) => b["@type"] === "Product");
      assert.equal(products.length, 1);
      const p = products[0];
      assert.equal(p.name, config.title[locale]);
      assert.equal(p.offers.price, config.priceRupees);
      assert.equal(p.offers.priceCurrency, "INR");
      assert.equal(p.offers.url, `${SITE}${locale === "hi" ? "/hi" : ""}/reports/focused/${slug}`);
      assert.equal(p.offers.availability, undefined);
      assert.equal(p.image, undefined);
      assert.equal(blocks.filter((b) => b["@type"] === "BreadcrumbList").length, 0, "breadcrumb comes from ProductBreadcrumb");
    });
  }
}
check("focused product route is index, follow (F12 SEO launch); the hub keeps noindex, follow", () => {
  assert.ok(/robots: \{ index: true, follow: true \}/.test(fs.readFileSync("app/[locale]/reports/focused/[slug]/page.tsx", "utf8")));
  assert.ok(/robots: \{ index: false, follow: true \}/.test(fs.readFileSync("app/[locale]/reports/focused/page.tsx", "utf8")));
});

section("\n=== 4. ₹199 relationship report page (EN + HI) ===");
const rel = reportsData.find((r) => r.slug === RELATIONSHIP_REPORT_SLUG)!;
const loveModule = load("app/[locale]/love/report/relationship_future_report/page.tsx", {
  ...runtime,
  "./RelationshipFutureReportForm": { default: "RelationshipFutureReportForm" },
  "@/components/reports/ProductBreadcrumb": { default: "ProductBreadcrumb" },
  "@/components/reports/PurchasePolicyLinks": { default: "PurchasePolicyLinks" },
  "@/components/reports/ProductReviews": { default: "ProductReviews" },
  "@/lib/reportReviews": reviewsStub,
  next: {},
  "@/app/data/reportsData": { reportsData },
  "@/lib/seo/articleSchema": { SITE_URL: SITE },
  "@/lib/reportProductSeo": seoHelpers,
});
function findType(node: any, type: string): any {
  if (Array.isArray(node)) { for (const n of node) { const f = findType(n, type); if (f) return f; } return null; }
  if (!node || typeof node !== "object") return null;
  if (node.type === type) return node;
  return findType(node.props?.children, type);
}

section("\n=== 5. ProductBreadcrumb: visible trail and BreadcrumbList from ONE item list ===");
const ProductBreadcrumb = load("components/reports/ProductBreadcrumb.tsx", {
  ...runtime,
  "next/link": { default: "Link" },
  "@/lib/seo/articleSchema": { SITE_URL: SITE },
  "@/lib/reportProductSeo": seoHelpers,
}).default;
function textOfNode(n: any): string {
  if (n == null || n === false) return "";
  if (typeof n === "string" || typeof n === "number") return String(n);
  if (Array.isArray(n)) return n.map(textOfNode).join("");
  return textOfNode(n.props?.children);
}
for (const items of [
  [{ name: "Home", path: "" }, { name: "Reports", path: "/reports" }, { name: "Career Astrology Report", path: "/reports/career_report" }],
  [{ name: "होम", path: "/hi" }, { name: "रिपोर्ट्स", path: "/reports" }, { name: "फोकस्ड रिपोर्ट्स", path: "/hi/reports/focused" }, { name: "आपकी कुंडली", path: "/hi/reports/focused/major-kundali-obstacles" }],
]) {
  check(`ProductBreadcrumb ${items[0].name}: JSON-LD items == visible links, last item is the current page`, () => {
    const tree = ProductBreadcrumb({ items });
    const ld = jsonLdScripts(tree);
    assert.equal(ld.length, 1);
    assert.equal(ld[0]["@type"], "BreadcrumbList");
    assert.deepEqual(ld[0].itemListElement.map((e: any) => [e.position, e.name, e.item]), items.map((it, i) => [i + 1, it.name, `${SITE}${it.path}`]));
    const nav = findType(tree, "nav");
    assert.equal(nav.props["aria-label"], "Breadcrumb");
    const links: any[] = []; (function walk(n: any) { if (Array.isArray(n)) return n.forEach(walk); if (!n || typeof n !== "object") return; if (n.type === "Link") links.push(n); walk(n.props?.children); })(nav);
    assert.deepEqual(links.map((l) => [l.props.href, textOfNode(l.props.children)]), items.slice(0, -1).map((it) => [it.path || "/", it.name]));
    const current = findType(nav, "span");
    const spans: any[] = []; (function walk(n: any) { if (Array.isArray(n)) return n.forEach(walk); if (!n || typeof n !== "object") return; if (n.type === "span" && n.props["aria-current"] === "page") spans.push(n); walk(n.props?.children); })(nav);
    assert.equal(spans.length, 1); assert.equal(textOfNode(spans[0].props.children), items[items.length - 1].name);
    assert.ok(current);
  });
}

section("\n=== 6. PurchasePolicyLinks: only existing approved copy and pages ===");
const PurchasePolicyLinks = load("components/reports/PurchasePolicyLinks.tsx", {
  ...runtime,
  "@/lib/checkoutUx": { CHECKOUT_COPY, REFUND_POLICY_PATH: "/refund-policy", SUPPORT_WHATSAPP_URL: "https://wa.me/919118877495" },
}).default;
for (const lang of ["en", "hi"] as const) {
  check(`PurchasePolicyLinks [${lang}]: full line = secure payment, PDF by email, refund policy, WhatsApp; refund variant = refund link only`, () => {
    const full = PurchasePolicyLinks({ lang });
    const text = textOfNode(full);
    for (const k of ["securePayment", "pdfByEmail", "refundPolicy", "support"] as const) assert.ok(text.includes(CHECKOUT_COPY[k][lang]), k);
    const hrefs: string[] = []; (function walk(n: any) { if (Array.isArray(n)) return n.forEach(walk); if (!n || typeof n !== "object") return; if (n.type === "a") hrefs.push(n.props.href); walk(n.props?.children); })(full);
    assert.deepEqual(hrefs, ["/refund-policy", "https://wa.me/919118877495"]);
    const refundOnly = PurchasePolicyLinks({ lang, variant: "refund" });
    assert.equal(textOfNode(refundOnly).trim(), CHECKOUT_COPY.refundPolicy[lang]);
  });
}

section("\n=== 7. F10-P15: availability from the registry, ratings only from genuine published reviews ===");
const SAMPLE: realReviews.ReviewSummary = {
  product: "career_report", review_count: 3, average_rating: 3.7, distribution: { "1": 1, "2": 0, "3": 0, "4": 0, "5": 2 },
  reviews: [
    { id: 11, rating: 5, body: "Very useful timing analysis for my job change.", display_name: "Ravi S.", language: "en", date: "2026-11-02" },
    { id: 10, rating: 1, body: "Too generic for me, <b>not</b> worth it.", display_name: "Asha K.", language: "en", date: "2026-11-01" },
  ],
};
const career = standard.find((r) => r.slug === "career_report")!;
for (const [active, expected] of [[true, "https://schema.org/InStock"], [false, "https://schema.org/OutOfStock"], [null, undefined]] as const) {
  check(`registry active=${active} -> offers.availability ${expected ?? "(omitted)"} on standard, focused and ₹199 pages`, async () => {
    reviewState.active = active; reviewState.summary = null;
    const std = jsonLdScripts(ReportSeoSchema({ report: career, seoContent: (reportSeoContent as any).career_report, active }))[0];
    const cfg = getFocusedReportConfigBySlug(focusedSlugs[0])!;
    const foc = jsonLdScripts(FocusedReportSeoSchema({ config: cfg, title: cfg.title.en, locale: "en", active })).find((b) => b["@type"] === "Product");
    const love = jsonLdScripts(await loveModule.default({ params: { locale: "en" } })).find((b) => b["@type"] === "Product");
    for (const p of [std, foc, love]) assert.equal(p.offers.availability, expected);
    reviewState.active = null;
  });
}
check("no reviews / reviews service down -> no aggregateRating or review markup", async () => {
  for (const summary of [null, { ...SAMPLE, review_count: 0, average_rating: null, reviews: [] }]) {
    const p = jsonLdScripts(ReportSeoSchema({ report: career, seoContent: (reportSeoContent as any).career_report, reviews: summary as any }))[0];
    assert.equal(p.aggregateRating, undefined);
    assert.equal(p.review, undefined);
  }
  reviewState.summary = null;
});
check("published reviews -> aggregateRating/review exactly as returned (negative review included)", async () => {
  const p = jsonLdScripts(ReportSeoSchema({ report: career, seoContent: (reportSeoContent as any).career_report, reviews: SAMPLE }))[0];
  assert.deepEqual(p.aggregateRating, { "@type": "AggregateRating", ratingValue: 3.7, reviewCount: 3, bestRating: 5, worstRating: 1 });
  assert.equal(p.review.length, 2);
  assert.deepEqual(p.review.map((r: any) => [r.author.name, r.reviewRating.ratingValue, r.reviewBody, r.datePublished]),
    SAMPLE.reviews.map((r) => [r.display_name, r.rating, r.body, r.date]));
  reviewState.summary = null;
});
check("the Product JSON-LD with a review containing HTML still cannot break out of its <script>", async () => {
  const hostile = { ...SAMPLE, reviews: [{ ...SAMPLE.reviews[0], body: "</script><script>alert(1)</script>" }] };
  const [p] = jsonLdScripts(ReportSeoSchema({ report: career, seoContent: (reportSeoContent as any).career_report, reviews: hostile }));
  assert.equal(p.review[0].reviewBody, "</script><script>alert(1)</script>", "round-trips as data inside the escaped JSON");
});
const ProductReviews = load("components/reports/ProductReviews.tsx", { ...runtime }).default;
check("ProductReviews: service down renders nothing (no false 'no reviews' claim)", () => {
  assert.equal(ProductReviews({ summary: null, lang: "en" }), null);
});
check("ProductReviews: empty state says no reviews yet, verified buyers only", () => {
  const text = textOfNode(ProductReviews({ summary: { ...SAMPLE, review_count: 0, average_rating: null, reviews: [] }, lang: "en" }));
  assert.ok(text.includes("No reviews yet") && text.includes("bought and received"));
});
check("ProductReviews: visible average, count, names, ratings and bodies match the schema data; HTML stays text", () => {
  const tree = ProductReviews({ summary: SAMPLE, lang: "en" });
  const text = textOfNode(tree);
  assert.ok(text.includes("3.7") && text.includes("Based on 3 verified buyer reviews"));
  for (const r of SAMPLE.reviews) assert.ok(text.includes(r.display_name) && text.includes(r.body) && text.includes(r.date));
  const html: string[] = []; (function walk(n: any) { if (Array.isArray(n)) return n.forEach(walk); if (!n || typeof n !== "object") return; if (n.props?.dangerouslySetInnerHTML) html.push("x"); walk(n.props?.children); })(tree);
  assert.equal(html.length, 0, "review text is never injected as HTML");
});
check("ProductReviews: Hindi copy", () => {
  assert.ok(textOfNode(ProductReviews({ summary: SAMPLE, lang: "hi" })).includes("सत्यापित खरीदार"));
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
  check(`[${locale}] page: H1, visible ₹199, Product + Breadcrumb JSON-LD, checkout form kept`, async () => {
    const tree = await loveModule.default({ params: { locale } });
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
    const crumbEl = findType(tree, "ProductBreadcrumb");
    assert.ok(crumbEl, "visible breadcrumb rendered");
    assert.deepEqual(crumbEl.props.items.map((c: any) => c.path), [prefix, `${prefix}/love`, `${prefix}${RELATIONSHIP_REPORT_PATH}`]);
    assert.equal(crumbEl.props.items[2].name, p.name, "last crumb = H1/Product name");
    assert.equal(blocks.filter((b) => b["@type"] === "BreadcrumbList").length, 0, "no duplicate BreadcrumbList");
    const policy = findType(tree, "PurchasePolicyLinks");
    assert.ok(policy && policy.props.lang === locale && (policy.props.variant ?? "full") === "full", "purchase policy line after the form");
    const text = JSON.stringify(tree);
    assert.ok(text.includes(p.name), "H1 shows the Product name");
    assert.ok(/"\s*₹",199/.test(text), "₹199 visible in the server-rendered markup");
    assert.ok(text.includes("RelationshipFutureReportForm"), "checkout form still rendered");
  });
}
}
relationshipChecks().then(runQueue).then(() => {
  console.log(`\nTOTAL: ${passed} passed, 0 failed`);
}).catch((e) => { console.error("FAIL:", e); process.exit(1); });
