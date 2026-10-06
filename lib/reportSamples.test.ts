/**
 * Paid-report SAMPLE integration (Q5.2): the 52 static sample PDFs (50 original + spouse_nature_report EN/HI), the shared URL helper, the two secondary
 * "View Sample Report" CTAs and the noindex header. A sample click must stay completely independent of the
 * order / payment / backend flow -- the real components are executed here in an isolated context whose global
 * fetch throws, so any request made while rendering would fail this test.
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule --esModuleInterop \
 *     --outDir .ts-test-out lib/reportSamples.test.ts
 *   node .ts-test-out/lib/reportSamples.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */
/* eslint-disable @typescript-eslint/no-explicit-any -- test helpers walk untyped React element trees */
import * as assert from "assert";
import { execFileSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";
import * as ts from "typescript";
import { reportsData } from "../app/data/reportsData";
import { intentQuestions } from "../app/data/intentCatalog";
import * as samples from "./reportSamples";
import { focusedReportHasSample, getFocusedReportSampleOrPreviewHref, GENERIC_EXAMPLE_PREVIEW_PATH } from "../app/data/focusedReportsConfig";

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

// ---- 2. the 52 standard/relationship files + 126 focused files (63 questionKeys x EN/HI) ---------------------
const sampleDir = path.join(repo, "public/report-samples");
// The focused samples are keyed by the backend's own question_key: <questionKey>_<en|hi>.pdf. #62/#63 keep
// their original product-specific pilot files; the other 61 are a product-labelled SAMPLE REPORT cover over
// the shared demonstration body. The original 50 paid-report files are untouched.
const FOCUSED_QUESTION_KEYS = intentQuestions.map((q) => q.questionKey);
const FOCUSED_SAMPLE_FILES = FOCUSED_QUESTION_KEYS.flatMap((key) => [`${key}_en.pdf`, `${key}_hi.pdf`]);
const PAID_REPORT_SAMPLE_FILES = reportsData.flatMap((r) => [`${r.slug}_en.pdf`, `${r.slug}_hi.pdf`]);
check("exactly 178 files (the original 50 + spouse_nature_report EN/HI + 126 focused samples), every one a valid PDF named <slug>_<en|hi>.pdf", () => {
  const files = fs.readdirSync(sampleDir);
  assert.equal(files.length, 178);
  for (const f of files) {
    assert.match(f, /^[a-z_]+_(en|hi)\.pdf$/);
    assert.equal(fs.readFileSync(path.join(sampleDir, f)).subarray(0, 5).toString("latin1"), "%PDF-");
  }
});
check("the directory is exactly the 52 paid-report files + the 126 focused files -- nothing else, no overlap", () => {
  assert.equal(new Set(PAID_REPORT_SAMPLE_FILES).size, 52);
  assert.equal(new Set(FOCUSED_SAMPLE_FILES).size, 126);
  assert.ok(!FOCUSED_SAMPLE_FILES.some((f) => PAID_REPORT_SAMPLE_FILES.includes(f)), "a questionKey collides with a paid slug");
  assert.deepEqual(fs.readdirSync(sampleDir).sort(), [...PAID_REPORT_SAMPLE_FILES, ...FOCUSED_SAMPLE_FILES].sort());
});
check("all 63 catalog questionKeys have an EN and a HI sample: 126 complete 3-page PDFs (header, page count, %%EOF)", () => {
  assert.equal(FOCUSED_QUESTION_KEYS.length, 63);
  assert.equal(new Set(FOCUSED_QUESTION_KEYS).size, 63);
  for (const file of FOCUSED_SAMPLE_FILES) {
    const bytes = fs.readFileSync(path.join(sampleDir, file)).toString("latin1");
    assert.ok(bytes.startsWith("%PDF-"), `${file}: not a PDF`);
    assert.ok(/%%EOF\s*$/.test(bytes), `${file}: truncated (no %%EOF trailer)`);
    assert.equal((bytes.match(/\/Type\s*\/Page(?!s)\b/g) || []).length, 3, `${file}: expected 3 pages (cover + 2 body)`);
  }
});
check("every catalog slug (26) has both an EN and a HI sample at the helper's exact URL", () => {
  assert.equal(reportsData.length, 26);
  for (const report of reportsData) {
    for (const language of ["en", "hi"]) {
      const url = samples.getReportSampleUrl(report.slug, language);
      assert.ok(fs.existsSync(path.join(repo, "public", url)), `missing ${url}`);
    }
  }
});
check("25 standard EN + 25 standard HI (24 original + spouse_nature_report) + relationship EN + HI (unchanged by the focused-sample addition)", () => {
  const files = fs.readdirSync(sampleDir);
  const standard = files.filter(
    (f) => !f.startsWith("relationship_future_report_") && !FOCUSED_SAMPLE_FILES.includes(f),
  );
  assert.equal(standard.filter(f => f.endsWith("_en.pdf")).length, 25);
  assert.equal(standard.filter(f => f.endsWith("_hi.pdf")).length, 25);
  assert.ok(files.includes("spouse_nature_report_en.pdf") && files.includes("spouse_nature_report_hi.pdf"));
  assert.ok(files.includes("relationship_future_report_en.pdf") && files.includes("relationship_future_report_hi.pdf"));
});
check("the original 50 paid-report sample files are byte-for-byte unchanged in git (none modified or deleted)", () => {
  // Plain `git diff` against HEAD: any change to a tracked paid sample (edit, overwrite, delete) is listed.
  const changed = execFileSync("git", ["diff", "--name-only", "HEAD", "--", "public/report-samples"], { cwd: repo })
    .toString().split("\n").filter(Boolean).map((p: string) => path.basename(p));
  const touchedPaid = changed.filter((f: string) => PAID_REPORT_SAMPLE_FILES.includes(f));
  assert.deepEqual(touchedPaid, [], `paid sample files changed: ${touchedPaid.join(", ")}`);
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
check("the standard link follows the report slug for all 25 standard products", () => {
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
    react: { useState: (init: unknown) => [init === false ? true : init, () => undefined], useEffect: () => undefined, useRef: (init: unknown) => ({ current: init }) },
    "@/components/PlaceAutocompleteInput": { default: "PlaceAutocompleteInput" },
    "@/hooks/useReportPurchase": { useReportPurchase: () => ({ purchase: () => { throw new Error("purchase must not run"); }, isProcessing: false }) },
    "@/lib/reportSamples": samples,
    // Reports Ads P0.2A: the form now reads its catalog entry and pushes GA4 funnel events (effects are not run here).
    "@/app/data/reportsData": { reportsData: [{ slug: "relationship_future_report", price: 199, title: { en: "Relationship Future Report" }, category: { en: "Love" } }] },
    "@/lib/ecommerceMeasurement": { pushViewItem() {}, pushBeginCheckout() {}, ORIGINAL_PRODUCT_FAMILY: "original_report" },
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

// ---- 5. sample-or-preview CTA (FocusedReportHero, ALL 63) -----------------------------------------------------
// Every one of the 63 gets a "View Sample" action, and every one now opens
// its OWN sample PDF (<questionKey>_<locale>.pdf) -- resolved through the
// single function getFocusedReportSampleOrPreviewHref(), never a second/
// guessed implementation. No catalog product reaches the generic Example
// Report preview any more (that page/fallback is kept, retired separately).
const FOCUSED_HERO = "components/focused-reports/FocusedReportHero.tsx";
const SAMPLE_VIEWER = "components/focused-reports/FocusedSampleViewer.tsx";
const EN_FOCUSED_LABEL = "View Sample";
const HI_FOCUSED_LABEL = "Sample देखें";
// The REAL FocusedSampleViewer with React's hooks stubbed (no DOM here): it reflects the INITIAL render --
// modal closed -- unless `startOpen` forces the `open` state (its first useState, initial value false).
function loadSampleViewer(startOpen = false) {
  return load(SAMPLE_VIEWER, {
    "react/jsx-runtime": jsxRuntime,
    react: {
      useState: (init: unknown) => [startOpen && init === false ? true : init, () => undefined],
      useEffect: () => undefined,
      useRef: (init: unknown) => ({ current: init }),
      useCallback: (fn: unknown) => fn,
    },
  }).default;
}
// Expand function-component elements (the Hero's <FocusedSampleViewer/>) into what they render.
function expand(node: any): any {
  if (Array.isArray(node)) return node.map(expand);
  if (!node || typeof node !== "object" || !("props" in node)) return node;
  if (typeof node.type === "function") return expand(node.type(node.props));
  return { ...node, props: { ...node.props, children: expand(node.props.children) } };
}
function renderFocusedHero(questionKey: string, locale: "en" | "hi") {
  const { default: FocusedReportHero } = load(FOCUSED_HERO, {
    "react/jsx-runtime": jsxRuntime,
    "next/link": { default: "Link" },
    // The REAL implementation (not a duplicate/re-guessed one) -- see the
    // top-level import above.
    "@/app/data/focusedReportsConfig": { getFocusedReportSampleOrPreviewHref },
    "@/components/focused-reports/FocusedSampleViewer": { default: loadSampleViewer() },
  });
  const config = { questionKey, priceRupees: 51, benefits: { en: ["b1"], hi: ["b1"] } };
  return expand(FocusedReportHero({ config, title: "T", question: "Q", locale }));
}
function elementsOfType(tree: any, type: string): any[] {
  const found: any[] = [];
  walk(tree, (el) => { if (el.type === type) found.push(el); });
  return found;
}
check("all 63 x EN/HI: the rendered Hero has exactly one 'View Sample' link -> its own existing PDF (126 targets)", () => {
  const hrefs = new Set<string>();
  for (const questionKey of FOCUSED_QUESTION_KEYS) {
    for (const locale of ["en", "hi"] as const) {
      const found = anchors(renderFocusedHero(questionKey, locale));
      assert.equal(found.length, 1, `${questionKey}/${locale}`);
      const expected = `/report-samples/${questionKey}_${locale}.pdf`;
      assertSecondarySampleAnchor(found[0], expected, locale === "hi" ? HI_FOCUSED_LABEL : EN_FOCUSED_LABEL);
      assert.ok(fs.existsSync(path.join(repo, "public", expected)), `broken sample href ${expected}`);
      hrefs.add(expected);
    }
  }
  assert.equal(hrefs.size, 126, "every product/locale must have its own distinct sample file");
});
check("no focused product (Hero render, either locale) resolves to the generic example-preview", () => {
  for (const questionKey of FOCUSED_QUESTION_KEYS) {
    for (const locale of ["en", "hi"] as const) {
      const href: string = anchors(renderFocusedHero(questionKey, locale))[0].props.href;
      assert.ok(!href.includes(GENERIC_EXAMPLE_PREVIEW_PATH), `${questionKey}/${locale} -> ${href}`);
      assert.ok(focusedReportHasSample(questionKey), questionKey);
    }
  }
});
const codeOnly = (source: string) => source
  // Strip comments first (including multi-line JSX {/* ... */} blocks) -- explanatory comments may name
  // what was deliberately NOT built; only actual code would be a violation.
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .split("\n")
  .filter((line) => !/^\s*\/\//.test(line))
  .join("\n");
check("FocusedReportHero source: driven by config.questionKey (never humanSlug/title), sample UI delegated to FocusedSampleViewer, no download, no carousel", () => {
  const source = read(FOCUSED_HERO);
  assert.ok(source.includes("getFocusedReportSampleOrPreviewHref(config.questionKey, locale)"));
  assert.ok(source.includes("<FocusedSampleViewer") && source.includes("priceRupees={config.priceRupees}"));
  assert.ok(!/config\.humanSlug/.test(source));
  assert.ok(!/\bdownload\b/.test(source));
  assert.ok(!/"use client"/.test(source), "the Hero stays a server component; only the viewer is a client island");
  assert.ok(!/carousel|Carousel/.test(codeOnly(source)));
});

// ---- 5b. the on-page sample modal (FocusedSampleViewer) --------------------------------------------------------
check("modal closed (initial render): only the View Sample trigger link renders -- no iframe, so no PDF is downloaded per page view", () => {
  const Viewer = loadSampleViewer();
  const tree = Viewer({ href: "/report-samples/promotion_timing_en.pdf", locale: "en", priceRupees: 51, title: "T" });
  const found = anchors(tree);
  assert.equal(found.length, 1);
  assert.equal(found[0].props["aria-haspopup"], "dialog");
  assert.equal(typeof found[0].props.onClick, "function", "a plain click must be intercepted to open the modal");
  assert.equal(elementsOfType(tree, "iframe").length, 0);
  const dialogs = elementsOfType(tree, "dialog");
  assert.equal(dialogs.length, 1);
  assert.equal(dialogs[0].props["aria-modal"], "true");
  assert.ok(dialogs[0].props["aria-labelledby"]);
  assert.equal(typeof dialogs[0].props.onCancel, "function", "Escape (dialog cancel) must be handled");
});
for (const [locale, cta, close] of [
  ["en", "Get My Personalized Report — ₹51", "Close sample"],
  ["hi", "मेरी व्यक्तिगत रिपोर्ट प्राप्त करें — ₹51", "Sample बंद करें"],
] as const) {
  check(`modal open (${locale}): iframe shows exactly the given PDF, labelled dialog heading, accessible close, exact purchase CTA`, () => {
    const href = `/report-samples/relationship_lead_to_marriage_${locale}.pdf`;
    const tree = loadSampleViewer(true)({ href, locale, priceRupees: 51, title: "My Report" });
    const frames = elementsOfType(tree, "iframe");
    assert.equal(frames.length, 1);
    assert.equal(frames[0].props.src, href);
    assert.ok(frames[0].props.title);
    const dialog = elementsOfType(tree, "dialog")[0];
    const heading = elementsOfType(tree, "h2")[0];
    assert.equal(heading.props.id, dialog.props["aria-labelledby"]);
    assert.equal(textOf(heading.props.children), "My Report");
    const buttons = elementsOfType(tree, "button");
    assert.ok(buttons.some((b) => b.props["aria-label"] === close && b.props.autoFocus), "focused, labelled close button");
    assert.ok(buttons.some((b) => textOf(b.props.children) === cta), `CTA must read exactly: ${cta}`);
    // every link inside the modal still points at this product's own PDF only
    for (const a of anchors(tree)) assert.equal(a.props.href, href);
  });
}
check("the CTA price comes from the product config (priceRupees prop), never a hard-coded ₹51", () => {
  const tree = loadSampleViewer(true)({ href: "/report-samples/x_en.pdf", locale: "en", priceRupees: 77, title: "T" });
  assert.ok(elementsOfType(tree, "button").some((b) => textOf(b.props.children) === "Get My Personalized Report — ₹77"));
  assert.ok(!/₹51/.test(read(SAMPLE_VIEWER)));
});
check("FocusedSampleViewer source: native showModal dialog, Back closes via one same-URL history entry, X/Escape/CTA reuse it, scroll lock restored, focus restored", () => {
  const src = codeOnly(read(SAMPLE_VIEWER));
  assert.ok(src.includes('"use client"'));
  assert.ok(src.includes("dialog.showModal()") && src.includes("dialog.close()"));
  // exactly one pushState, with NO url argument (same URL: no hash/query, nothing for Next to navigate to)
  const pushes: string[] = src.match(/history\.pushState\(([^;]*)\);/g) || [];
  assert.equal(pushes.length, 1);
  const [push] = pushes;
  assert.ok(/pushState\(\{ \.\.\.\(window\.history\.state \?\? \{\}\), \[HISTORY_KEY\]: href \}, ""\)/.test(push), push);
  assert.ok(!/replaceState/.test(src));
  assert.ok(src.includes('addEventListener("popstate"') && src.includes('removeEventListener("popstate"'));
  assert.ok(src.includes("window.history.back()"), "closing while the modal entry is current must pop it, not push another");
  assert.ok(/event\.preventDefault\(\);[^\n]*\n\s*requestClose\(\)/.test(src), "Escape must go through requestClose");
  assert.ok(src.includes('root.style.overflow = "hidden"') && src.includes("root.style.overflow = previousOverflow"));
  assert.ok(src.includes("triggerRef.current?.focus("));
  assert.ok(/event\.metaKey \|\| event\.ctrlKey/.test(src), "modifier clicks keep native new-tab behaviour");
});
check("the modal's purchase CTA reuses the page's EXISTING checkout form -- no second checkout, no order/payment/network code", () => {
  const src = codeOnly(read(SAMPLE_VIEWER));
  assert.ok(src.includes('const PURCHASE_FORM_ID = "focused-report-form"'));
  for (const checkout of ["components/focused-reports/FocusedReportCheckout.tsx", "components/focused-reports/FocusedDualReportCheckout.tsx"]) {
    assert.ok(read(checkout).includes('id="focused-report-form"'), `${checkout} must still own the purchase form anchor`);
  }
  assert.ok(read(FOCUSED_HERO).includes('href="#focused-report-form"'), "the Hero's own purchase CTA targets the same form");
  assert.ok(!/fetch\(|axios|XMLHttpRequest|useReportPurchase|razorpay|\border\b|\bpayment\b/i.test(src.replace(/"focused-report-form"/g, "")));
  const imports = src.match(/^import .*$/gm) || [];
  assert.deepEqual(imports.map((l) => l.match(/from "([^"]+)"/)?.[1]).sort(), ["@/lib/authority-engine/types", "react", "react"]);
});
check("the retained fallback: a key with NO sample PDF (not in the catalog) still gets exactly one link, to the locale-correct generic preview -- never a guessed/broken per-product PDF", () => {
  for (const locale of ["en", "hi"] as const) {
    const found = anchors(renderFocusedHero("not_a_catalog_question", locale));
    assert.equal(found.length, 1, `fallback/${locale} must render exactly one sample/preview link`);
    const expectedHref = locale === "hi" ? `/hi${GENERIC_EXAMPLE_PREVIEW_PATH}` : GENERIC_EXAMPLE_PREVIEW_PATH;
    assertSecondarySampleAnchor(found[0], expectedHref, locale === "hi" ? HI_FOCUSED_LABEL : EN_FOCUSED_LABEL);
  }
});
check("the Hero always resolves through getFocusedReportSampleOrPreviewHref (never a second implementation) and never hides the link", () => {
  const source = read(FOCUSED_HERO);
  assert.ok(source.includes("getFocusedReportSampleOrPreviewHref(config.questionKey, locale)"));
  assert.ok(!/\{focusedReportHasSample/.test(source), "must not conditionally hide the link -- every product gets one");
});
check("all 63 EN focused sample PDFs visibly identify themselves as samples (literal SAMPLE REPORT bytes)", () => {
  // Node has no PDF text extraction here (no new dependency for this check), so this greps the raw PDF bytes.
  // The literal comes from the approved master's own reportlab-stamped "SAMPLE REPORT" banner on the body pages
  // (the WeasyPrint cover encodes its text as glyph IDs). The HI stamp is Devanagari, so HI is not grep-able;
  // the cover wording of all 126 was validated by the backend generator (qa_focused_cover_samples/manifest.json).
  for (const key of FOCUSED_QUESTION_KEYS) {
    const enText = fs.readFileSync(path.join(sampleDir, `${key}_en.pdf`)).toString("latin1");
    assert.ok(enText.includes("SAMPLE REPORT"), `${key}_en.pdf must contain the literal SAMPLE REPORT stamp`);
  }
});

// ---- 6. DUAL checkout contract (FocusedDualReportCheckout, the 9 focused_dual_v1 products) --------------------
const FOCUSED_DUAL_CHECKOUT = "components/focused-reports/FocusedDualReportCheckout.tsx";
function renderFocusedDualCheckout(questionKey: string, category: string, locale: "en" | "hi") {
  const { default: FocusedDualReportCheckout } = load(FOCUSED_DUAL_CHECKOUT, {
    "react/jsx-runtime": jsxRuntime,
    // Same technique as renderRelationship() above: React itself is
    // stubbed so useState/useEffect/useRef run without a real render
    // context, reflecting the component's INITIAL state only (no
    // interactivity exercised here -- see that function's own comment).
    react: {
      useState: (init: unknown) => [init, () => undefined],
      useEffect: () => undefined,
      useRef: (init: unknown) => ({ current: init }),
    },
    "@/components/PlaceAutocompleteInput": { default: "PlaceAutocompleteInput" },
    "@/hooks/useReportPurchase": {
      useReportPurchase: () => ({ purchase: () => { throw new Error("purchase must not run in this render-only test"); }, isProcessing: false }),
    },
    // The REAL, already-unit-tested pure validation module -- not re-mocked.
    "@/lib/relationshipPlaceValidation": load("lib/relationshipPlaceValidation.ts", {}),
    "@/lib/websiteEvents": { WebsiteEvents: { reportViewed() {}, formStarted() {}, formCompleted() {}, beginCheckout() {} } },
    // Reports Ads P0.2: the DUAL checkout now also imports the GA4 funnel pushers.
    "@/lib/ecommerceMeasurement": { pushViewItem() {}, pushBeginCheckout() {} },
    // P0 visual fix -- string-typed stand-ins (this harness never actually
    // renders DOM, see jsxRuntime above: type is just stored, never invoked).
    "lucide-react": { User: "User", Users: "Users", Clock: "Clock", AlertTriangle: "AlertTriangle", MessageCircle: "MessageCircle" },
  });
  const config = { questionKey, category, priceRupees: 51, title: { en: "T", hi: "टी" } };
  return FocusedDualReportCheckout({ config, locale });
}
check("DUAL checkout renders exactly 2 PlaceAutocompleteInput instances (primary + partner) and NO phone field for either person", () => {
  const tree = renderFocusedDualCheckout("relationship_lead_to_marriage", "relationship", "en");
  const placeInputs: any[] = [];
  walk(tree, (el) => { if (el.type === "PlaceAutocompleteInput") placeInputs.push(el); });
  assert.equal(placeInputs.length, 2, "expected exactly one place field per person");
  const allInputs: any[] = [];
  walk(tree, (el) => { if (el.type === "input") allInputs.push(el); });
  assert.ok(!allInputs.some((i) => i.props.type === "tel" || i.props.name === "phone"), "no phone input anywhere -- matches the proven relationship form's own contract");
  assert.ok(allInputs.some((i) => i.props.type === "email"), "an email field must exist (required by LOVE_PREMIUM_PRIMARY_REQUIRED_FIELDS)");
});
check("DUAL checkout's order payload exactly matches the backend's focused_dual_v1 contract: primary flat, partner nested, no phone/email for partner", () => {
  const source = read(FOCUSED_DUAL_CHECKOUT);
  assert.ok(/productSlug:\s*config\.questionKey/.test(source), "product must be config.questionKey, never humanSlug/title");
  assert.ok(!/config\.humanSlug/.test(source));
  for (const field of ["name: primary.name", "dob: primary.dob", "tob: primary.tob", "pob: primary.pob", "latitude: primary.lat", "longitude: primary.lng"]) {
    assert.ok(source.includes(field), field);
  }
  assert.ok(source.includes("email,"), "email must be sent (flat, primary only)");
  assert.ok(!/primary\.phone|partner\.phone/.test(source), "phone must never appear for either person");
  assert.ok(/partner:\s*\{/.test(source), "partner fields must be nested under `partner`");
  for (const field of ["name: partner.name", "dob: partner.dob", "tob: partner.tob", "pob: partner.pob", "latitude: partner.lat", "longitude: partner.lng"]) {
    assert.ok(source.includes(field), field);
  }
  assert.ok(!/partner\.email/.test(source), "partner must never have an email field, matching LOVE_PREMIUM_PARTNER_REQUIRED_FIELDS");
});
check("DUAL checkout's own header documents the exact backend contract it was built against (LOVE_PREMIUM_PRIMARY/PARTNER_REQUIRED_FIELDS, order_service.py) -- not guessed", () => {
  const source = read(FOCUSED_DUAL_CHECKOUT);
  assert.ok(source.includes("LOVE_PREMIUM_PRIMARY_REQUIRED_FIELDS"));
  assert.ok(source.includes("LOVE_PREMIUM_PARTNER_REQUIRED_FIELDS"));
  assert.ok(source.includes("order_service.py"));
});
check("DUAL checkout reuses lib/relationshipPlaceValidation.ts (applyPlaceSelection/applyPobEdit/relationshipPlaceError) -- no second/divergent place-validation implementation", () => {
  const source = read(FOCUSED_DUAL_CHECKOUT);
  assert.ok(source.includes('from "@/lib/relationshipPlaceValidation"'));
  assert.ok(source.includes("applyPlaceSelection") && source.includes("applyPobEdit") && source.includes("relationshipPlaceError"));
});
check("DUAL checkout reuses hooks/useReportPurchase.ts for the entire Razorpay/webhook flow -- no hand-rolled duplicate of that logic", () => {
  const source = read(FOCUSED_DUAL_CHECKOUT);
  assert.ok(source.includes('from "@/hooks/useReportPurchase"'));
  assert.ok(!/loadScript\(|checkout\.razorpay\.com/.test(source), "must not re-implement the SDK-loading logic FocusedReportCheckout.tsx has for SELF");
});
check("DUAL checkout's inactive-product handling never echoes the backend's raw error/message text (same P0.5 Part 6 fix as SELF)", () => {
  const source = read(FOCUSED_DUAL_CHECKOUT);
  const block = source.slice(source.indexOf("onOrderCreationError"), source.indexOf("onUnexpectedError"));
  assert.ok(!/backendMessage/.test(block.split("=>")[1] || ""), "the backendMessage argument must never be interpolated into the alert");
  assert.ok(/Please try again later|पुनः प्रयास करें/.test(block));
});
check("DUAL checkout fires exactly 4 analytics calls, all (config.questionKey, config.category, currentLang), never a form field", () => {
  const source = read(FOCUSED_DUAL_CHECKOUT);
  const calls = source.match(/WebsiteEvents\.\w+\([^)]*\)/g) || [];
  assert.equal(calls.length, 4, `expected exactly 4 WebsiteEvents calls, found ${calls.length}`);
  for (const call of calls) {
    assert.ok(/\(config\.questionKey, config\.category, currentLang\)/.test(call), call);
    for (const piiField of ["primary.name", "primary.dob", "partner.name", "partner.dob", "email"]) {
      assert.ok(!call.includes(piiField), `${call} must never include ${piiField}`);
    }
  }
});

// ---- 7. noindex header --------------------------------------------------------------------------------------------------
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
