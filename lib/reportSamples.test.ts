/**
 * Paid-report SAMPLE integration (Q5.2): the 50 static sample PDFs, the shared URL helper, the two secondary
 * "View Sample Report" CTAs and the noindex header. A sample click must stay completely independent of the
 * order / payment / backend flow -- the real components are executed here in an isolated context whose global
 * fetch throws, so any request made while rendering would fail this test.
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/reportSamples.test.ts
 *   node .ts-test-out/lib/reportSamples.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */
/* eslint-disable @typescript-eslint/no-explicit-any -- test helpers walk untyped React element trees */
import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";
import * as ts from "typescript";
import { reportsData } from "../app/data/reportsData";
import * as samples from "./reportSamples";

const repo = process.cwd();
let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}
const read = (file: string) => fs.readFileSync(path.join(repo, file), "utf8");

const REPORT_CONTENT = "components/reports/ReportContent.tsx";
const REPORT_CHECKOUT = "components/reports/ReportCheckout.tsx";
const RELATIONSHIP_FORM = "app/[locale]/love/report/relationship_future_report/RelationshipFutureReportForm.tsx";
const EN_LABEL = "View Sample Report";
const HI_LABEL = "सैंपल रिपोर्ट देखें";

// ---- 1. the URL helper --------------------------------------------------------------------------------------
check("career_report + en -> /report-samples/career_report_en.pdf", () =>
  assert.equal(samples.getReportSampleUrl("career_report", "en"), "/report-samples/career_report_en.pdf"));
check("career_report + hi -> /report-samples/career_report_hi.pdf", () =>
  assert.equal(samples.getReportSampleUrl("career_report", "hi"), "/report-samples/career_report_hi.pdf"));
for (const [input, expected] of [
  ["hi", "hi"], ["hi-IN", "hi"], ["HI", "hi"], ["hi_IN", "hi"], ["en", "en"], ["en-US", "en"],
  ["fr", "en"], ["", "en"], [undefined, "en"], [null, "en"],
] as const) {
  check(`language ${JSON.stringify(input)} normalises to ${expected}`, () =>
    assert.equal(samples.normalizeSampleLanguage(input), expected));
}
check("labels: English and Hindi", () => {
  assert.equal(samples.getReportSampleLabel("en"), EN_LABEL);
  assert.equal(samples.getReportSampleLabel(undefined), EN_LABEL);
  assert.equal(samples.getReportSampleLabel("hi"), HI_LABEL);
  assert.equal(samples.getReportSampleLabel("hi-IN"), HI_LABEL);
});
check("the helper is tiny and has no product table, network or analytics", () => {
  const source = read("lib/reportSamples.ts");
  assert.ok(!/fetch\(|axios|XMLHttpRequest|WebsiteEvents|ctaClick|window\./.test(source));
  assert.ok(!/career_report|relationship_future_report/.test(source.replace(/\/\*[\s\S]*?\*\//, "")));
});

// ---- 2. the 50 static files ---------------------------------------------------------------------------------
const sampleDir = path.join(repo, "public/report-samples");
check("exactly 50 files, every one a valid PDF named <slug>_<en|hi>.pdf", () => {
  const files = fs.readdirSync(sampleDir);
  assert.equal(files.length, 50);
  for (const f of files) {
    assert.match(f, /^[a-z_]+_(en|hi)\.pdf$/);
    assert.equal(fs.readFileSync(path.join(sampleDir, f)).subarray(0, 5).toString("latin1"), "%PDF-");
  }
});
check("every catalog slug (25) has both an EN and a HI sample at the helper's exact URL", () => {
  assert.equal(reportsData.length, 25);
  for (const report of reportsData) {
    for (const language of ["en", "hi"]) {
      const url = samples.getReportSampleUrl(report.slug, language);
      assert.ok(fs.existsSync(path.join(repo, "public", url)), `missing ${url}`);
    }
  }
});
check("24 standard EN + 24 standard HI + relationship EN + HI", () => {
  const files = fs.readdirSync(sampleDir);
  const standard = files.filter(f => !f.startsWith("relationship_future_report_"));
  assert.equal(standard.filter(f => f.endsWith("_en.pdf")).length, 24);
  assert.equal(standard.filter(f => f.endsWith("_hi.pdf")).length, 24);
  assert.ok(files.includes("relationship_future_report_en.pdf") && files.includes("relationship_future_report_hi.pdf"));
});

// ---- helpers to execute the REAL components in an isolated context -----------------------------------------------
function load(file: string, dependencies: Record<string, unknown>) {
  const code = ts.transpileModule(read(file), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports: Record<string, any> = {};
  vm.runInNewContext(code, {
    exports,
    require: (name: string) => {
      assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
      return dependencies[name];
    },
    fetch: () => { throw new Error("A sample CTA must never make a network/backend request"); },
  });
  return exports;
}
const jsxRuntime = {
  jsx: (type: any, props: any) => ({ type, props }),
  jsxs: (type: any, props: any) => ({ type, props }),
};
function walk(node: any, visit: (element: any) => void): void {
  if (Array.isArray(node)) { node.forEach(n => walk(n, visit)); return; }
  if (node && typeof node === "object" && "props" in node) { visit(node); walk(node.props.children, visit); }
}
function textOf(node: any): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return textOf(node.props?.children);
}
function anchors(tree: any): any[] {
  const found: any[] = [];
  walk(tree, el => { if (el.type === "a") found.push(el); });
  return found;
}
function assertSecondarySampleAnchor(a: any, expectedHref: string, expectedLabel: string) {
  assert.equal(a.props.href, expectedHref);
  assert.equal(a.props.target, "_blank");
  assert.equal(a.props.rel, "noopener noreferrer");
  assert.ok(!("download" in a.props), "must not force a download");
  assert.equal(textOf(a.props.children).replace("↗", "").trim(), expectedLabel);
  // secondary: an outline/text style, never a filled primary purchase button
  assert.ok(!/(^|\s)bg-purple-\d+/.test(a.props.className), "sample link must not be a filled purple button");
  assert.match(a.props.className, /\bborder\b/);
}

// ---- 3. standard report CTA (ReportContent) -------------------------------------------------------------------
const seo = { seoTitle: { en: "Career Report | Jyotishasha", hi: "करियर रिपोर्ट | ज्योतिषाशा" }, reportSections: { en: ["Section A"], hi: ["खंड ए"] } };
function renderReportContent(slug: string, language: string) {
  const { default: ReportContent } = load(REPORT_CONTENT, {
    "react/jsx-runtime": jsxRuntime,
    "react-i18next": { useTranslation: () => ({ i18n: { language } }) },
    "@/lib/reportSamples": samples,
  });
  const report = { slug, title: { en: "Career Report", hi: "करियर रिपोर्ट" }, fullDescription: { en: "d", hi: "d" }, price: 51 };
  return ReportContent({ report, seo });
}
for (const [language, lang, label] of [["en", "en", EN_LABEL], ["hi", "hi", HI_LABEL], ["hi-IN", "hi", HI_LABEL], ["fr", "en", EN_LABEL]] as const) {
  check(`standard page language ${language}: exactly one sample link -> career_report_${lang}.pdf`, () => {
    const found = anchors(renderReportContent("career_report", language));
    assert.equal(found.length, 1);
    assertSecondarySampleAnchor(found[0], `/report-samples/career_report_${lang}.pdf`, label);
  });
}
check("the standard link follows the report slug for all 24 standard products", () => {
  for (const report of reportsData.filter(r => r.slug !== "relationship_future_report")) {
    assert.equal(anchors(renderReportContent(report.slug, "en"))[0].props.href, `/report-samples/${report.slug}_en.pdf`);
    assert.equal(anchors(renderReportContent(report.slug, "hi"))[0].props.href, `/report-samples/${report.slug}_hi.pdf`);
  }
});
check("standard CTA sits after Price/Format/Language/Delivery and before 'This Report Covers'", () => {
  for (const [language, delivery, covers] of [["en", "Delivery:", "This Report Covers"], ["hi", "डिलीवरी:", "इस रिपोर्ट में शामिल है"]] as const) {
    const children: any[] = renderReportContent("career_report", language).props.children;
    const at = (test: (c: any) => boolean) => children.findIndex(test);
    const meta = at(c => textOf(c).includes(delivery));
    const cta = at(c => anchors(c).length === 1);
    const cover = at(c => textOf(c).includes(covers));
    assert.ok(meta >= 0 && cta > meta && cover > cta, `order meta=${meta} cta=${cta} covers=${cover}`);
  }
});
check("ReportContent source: helper + page i18n language, plain anchor, no Link, no download", () => {
  const source = read(REPORT_CONTENT);
  assert.ok(source.includes('from "@/lib/reportSamples"'));
  assert.match(source, /i18n\.language\?\.startsWith\("hi"\)/);
  assert.ok(source.includes("getReportSampleUrl(report.slug, lang)"));
  assert.ok(!/next\/link/.test(source) && !/<Link\b/.test(source));
  assert.ok(!/\bdownload\b/.test(source));
  assert.ok(source.includes('target="_blank"') && source.includes('rel="noopener noreferrer"'));
});
check("the purchase flow is not wired to samples: ReportCheckout has no sample reference", () => {
  const checkout = read(REPORT_CHECKOUT);
  assert.ok(!/report-samples|reportSamples|getReportSample|sample/i.test(checkout));
  assert.ok(checkout.includes("/api/razorpay-order") && checkout.includes("language: currentLang"));
});

// ---- 4. relationship CTA (RelationshipFutureReportForm) ---------------------------------------------------------------
function renderRelationship(locale: string) {
  const { default: Form } = load(RELATIONSHIP_FORM, {
    "react/jsx-runtime": jsxRuntime,
    // mounted (the only useState(false)) is true so the real hero renders; effects are not run
    react: { useState: (init: unknown) => [init === false ? true : init, () => undefined], useEffect: () => undefined },
    "@/components/PlaceAutocompleteInput": { default: "PlaceAutocompleteInput" },
    "@/hooks/useReportPurchase": { useReportPurchase: () => ({ purchase: () => { throw new Error("purchase must not run"); }, isProcessing: false }) },
    "@/lib/reportSamples": samples,
    // pure validation helpers the form now imports (no React/network/payment code)
    "@/lib/relationshipPlaceValidation": load("lib/relationshipPlaceValidation.ts", {}),
  });
  return Form({ locale });
}
for (const [locale, lang, label] of [["en", "en", EN_LABEL], ["hi", "hi", HI_LABEL], ["fr", "en", EN_LABEL]] as const) {
  check(`relationship locale ${locale}: one sample link -> relationship_future_report_${lang}.pdf`, () => {
    const found = anchors(renderRelationship(locale));
    assert.equal(found.length, 1);
    assertSecondarySampleAnchor(found[0], `/report-samples/relationship_future_report_${lang}.pdf`, label);
  });
}
check("relationship CTA is inside the hero card, after the description and before the email field", () => {
  const children: any[] = renderRelationship("en").props.children;
  const heroChildren: any[] = children[0].props.children;
  assert.equal(anchors(children[0]).length, 1);
  assert.equal(anchors(children[1]).length + anchors(children[2]).length + anchors(children[3]).length, 0);
  assert.ok(textOf(children[1]).includes("Email"), "children[1] is still the email block");
  const description = heroChildren.findIndex(c => c && c.type === "p");
  const cta = heroChildren.findIndex(c => anchors(c).length === 1);
  assert.ok(description >= 0 && cta > description);
});
check("relationship source: plain anchor, no Link, no download, payment + form untouched", () => {
  const source = read(RELATIONSHIP_FORM);
  assert.ok(source.includes('from "@/lib/reportSamples"'));
  assert.ok(!/next\/link/.test(source) && !/\bdownload\b/.test(source) && !/ReportCheckout/.test(source));
  assert.ok(source.includes('productSlug: "relationship_future_report"'));
  assert.ok(source.includes("Pay ₹199 & Generate Report") && source.includes("₹199 भुगतान करें और रिपोर्ट प्राप्त करें"));
  assert.ok(source.includes("useReportPurchase") && source.includes("partner: {"));
});

// ---- 5. noindex header --------------------------------------------------------------------------------------------------
check("vercel.json: /report-samples/:path* -> X-Robots-Tag: noindex, nofollow (and nothing broader)", () => {
  const config = JSON.parse(read("vercel.json"));
  const rules = (config.headers as any[]).filter(h => h.headers.some((x: any) => x.key === "X-Robots-Tag"));
  assert.equal(rules.length, 1);
  assert.equal(rules[0].source, "/report-samples/:path*");
  assert.deepEqual(rules[0].headers, [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]);
  assert.ok(!/reports|love/.test(rules[0].source.replace("report-samples", "")));
});
check("vercel.json: existing /api rewrite and CORS headers are preserved", () => {
  const config = JSON.parse(read("vercel.json"));
  assert.equal(config.rewrites.length, 1);
  assert.equal(config.rewrites[0].destination, "https://jyotishasha-backend.onrender.com/api/:path");
  const api = (config.headers as any[]).find(h => h.source.startsWith("/api/"));
  assert.deepEqual(api.headers.map((h: any) => h.key),
    ["Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers"]);
});
check("robots.txt and sitemap.ts do not mention the samples (kept out of both)", () => {
  assert.ok(!/report-samples/.test(read("public/robots.txt")));
  assert.ok(!/report-samples|reportSamples/.test(read("app/sitemap.ts")));
});

console.log(`TOTAL: ${passed} passed, 0 failed`);
