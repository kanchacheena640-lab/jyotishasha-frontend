/**
 * lib/marriageFaqSchema.test.ts
 *
 * MC-06 -- FAQPage JSON-LD on Marriage Astrology topic pages. Every registered topic (from the real
 * registry), EN + HI, is rendered IN-PROCESS through the real route; every application/ld+json block
 * is JSON.parse'd. The FAQPage must match, item for item and in order, the FAQ that the SAME render
 * shows in server HTML (parsed from the FAQ section's <details>), and equal the topic source data.
 * Article / BreadcrumbList must be unchanged versus the committed MC-02 baseline; the hub and the
 * financial-astrology domain must emit no FAQPage.
 *
 * Run (repo convention):
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/marriageFaqSchema.test.ts
 *   node .ts-test-out/marriageFaqSchema.test.js
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires -- test-only module loader */
import * as fs from "fs";
import * as path from "path";

let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

const ts = require("typescript");
const NodeModule: any = require("module");
const originalResolve = NodeModule._resolveFilename;
NodeModule._resolveFilename = function (request: string, parent: any, ...rest: any[]) {
  return originalResolve.call(this, request.startsWith("@/") ? path.join(root, request.slice(2)) : request, parent, ...rest);
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
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}

const resolver = load("lib/authority-engine/resolver");
const { loc } = load("lib/authority-engine/i18n");
const marriageRoute = load("app/[locale]/marriage-astrology/[slug]/page.tsx").default;
const hubRoute = load("app/[locale]/marriage-astrology/page.tsx").default;
const financialRoute = load("app/[locale]/financial-astrology/[slug]/page.tsx").default;
const domain = resolver.getAuthorityDomain("marriage-astrology");
const slugs: string[] = resolver.getAllTopicSlugs(domain);
const baseline = JSON.parse(src("lib/fixtures/marriage-cluster-baseline.json"));

const ENT: Record<string, string> = { "&amp;": "&", "&#x27;": "'", "&quot;": '"', "&lt;": "<", "&gt;": ">", "&nbsp;": " " };
const decode = (s: string) => s.replace(/&(?:amp|#x27|quot|lt|gt|nbsp);/g, (e) => ENT[e]);
const ldBlocks = (html: string): any[] =>
  [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
/** Visible FAQ from server HTML: the <details> of the section whose <h2> is the FAQ section title. */
function visibleFaq(html: string, title: string): { q: string; a: string }[] {
  const start = html.indexOf(`>${title.replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;")}</h2>`);
  if (start < 0) return [];
  const block = html.slice(start, html.indexOf("</section>", start));
  return [...block.matchAll(/<details\b[^>]*>\s*<summary\b[^>]*>\s*<span>([\s\S]*?)<\/span>[\s\S]*?<\/summary>(?:\s*<div\b[^>]*>([\s\S]*?)<\/div>)?\s*<\/details>/g)]
    .map((m) => ({ q: decode(m[1]).trim(), a: decode(m[2] ?? "").trim() }));
}

console.log(`=== 1. FAQPage on all ${slugs.length} registered topics, EN + HI ===`);
const counts: string[] = [];
for (const slug of slugs) {
  const topic = domain.topics[slug];
  const faqSection = topic.sections.find((s: any) => s.layout === "faq");
  for (const locale of ["en", "hi"]) {
    const t = (c: string) => `[${slug}][${locale}] ${c}`;
    const html = renderToStaticMarkup(React.createElement(marriageRoute, { params: { locale, slug } }));
    let blocks: any[] = [];
    let parsed = true;
    try { blocks = ldBlocks(html); } catch { parsed = false; }
    check(t("every application/ld+json block is valid JSON"), parsed && blocks.length > 0);
    const faqs = blocks.filter((b) => b["@type"] === "FAQPage");
    check(t(`exactly one FAQPage (found ${faqs.length})`), faqs.length === 1);
    const fp = faqs[0] ?? {};
    const ents: any[] = Array.isArray(fp.mainEntity) ? fp.mainEntity : [];
    check(t("@context https://schema.org, @type FAQPage, mainEntity array"), fp["@context"] === "https://schema.org" && Array.isArray(fp.mainEntity));
    const source = (faqSection?.items ?? []).map((i: any) => ({ q: loc(i, "label", locale), a: loc(i, "body", locale) }));
    const visible = visibleFaq(html, loc(faqSection, "title", locale));
    counts.push(`${slug}|${locale}=${ents.length}`);
    check(t(`mainEntity count ${ents.length} == source FAQ count ${source.length} == visible FAQ count ${visible.length}`),
      ents.length > 0 && ents.length === source.length && ents.length === visible.length);
    check(t("every entity is Question with an Answer, no empty / null / undefined text"),
      ents.every((e) => e["@type"] === "Question" && e.acceptedAnswer?.["@type"] === "Answer" &&
        typeof e.name === "string" && e.name.trim().length > 0 && typeof e.acceptedAnswer.text === "string" && e.acceptedAnswer.text.trim().length > 0));
    const qMismatch = ents.map((e, i) => (e.name === source[i]?.q && e.name === visible[i]?.q ? null : i)).filter((x) => x !== null);
    check(t(`questions equal source AND visible questions, same order (mismatch at: ${JSON.stringify(qMismatch)})`), qMismatch.length === 0);
    const aMismatch = ents.map((e, i) => (e.acceptedAnswer?.text === source[i]?.a && e.acceptedAnswer?.text === visible[i]?.a ? null : i)).filter((x) => x !== null);
    check(t(`answers equal source AND visible answers, untruncated (mismatch at: ${JSON.stringify(aMismatch)})`), aMismatch.length === 0);
    check(t("no duplicate questions"), new Set(ents.map((e) => e.name)).size === ents.length);
    check(t("no markup, price, rating or review injected"),
      !/<[a-z]/i.test(JSON.stringify(fp)) && !/"(offers|price|aggregateRating|review|ratingValue)"/.test(JSON.stringify(fp)) && !/₹/.test(JSON.stringify(fp)));
    const key = `${slug}|${locale}`;
    // Compare the non-FAQPage objects only, so this holds both before and after the baseline records FAQPage.
    const before = (baseline.pages[key]?.schema?.objects ?? []).filter((b: any) => b["@type"] !== "FAQPage");
    const now = blocks.filter((b) => b["@type"] !== "FAQPage");
    check(t("Article + BreadcrumbList unchanged vs the committed baseline (FAQPage is the only addition)"),
      JSON.stringify(before.map((b: any) => b["@type"])) === '["BreadcrumbList","Article"]' && JSON.stringify(now) === JSON.stringify(before));
    check(t("schema order: BreadcrumbList, Article, FAQPage"), JSON.stringify(blocks.map((b) => b["@type"])) === '["BreadcrumbList","Article","FAQPage"]');
  }
}
console.log(`  INFO: FAQPage question counts -- ${counts.join(", ")}`);

console.log("\n=== 2. Scope ===");
for (const locale of ["en", "hi"]) {
  const hub = ldBlocks(renderToStaticMarkup(React.createElement(hubRoute, { params: { locale } })));
  check(`hub [${locale}] emits no FAQPage (unchanged: ${hub.length} JSON-LD blocks)`, !hub.some((b) => b["@type"] === "FAQPage") && hub.length === (baseline.pages[`hub|${locale}`]?.schema?.types?.length ?? 0));
}
const fin = resolver.getAuthorityDomain("financial-astrology");
for (const finSlug of resolver.getAllTopicSlugs(fin)) {
  const types = ldBlocks(renderToStaticMarkup(React.createElement(financialRoute, { params: { locale: "en", slug: finSlug } }))).map((b) => b["@type"]);
  check(`financial-astrology '${finSlug}' still emits only BreadcrumbList + Article`, JSON.stringify(types) === '["BreadcrumbList","Article"]');
}
check("helper reuses the shared buildFAQPageSchema unchanged and the same loc() as the visible FAQ",
  src("lib/domains/marriage-astrology/faqSchema.ts").includes("buildFAQPageSchema(items)") &&
  src("lib/domains/marriage-astrology/faqSchema.ts").includes("loc(item, 'label', locale)") &&
  src("components/authority-engine/sections/StaticFaqSection.tsx").includes("loc(item, 'label', locale)"));
check("shared seo.ts / articleSchema.ts untouched by MC-06 (no FAQ logic added there)",
  !/FAQPage|buildMarriageFaq/.test(src("lib/authority-engine/seo.ts")));
check("financial route does not use the marriage FAQ helper", !/buildMarriageFaqPageSchema|FAQPage/.test(src("app/[locale]/financial-astrology/[slug]/page.tsx")));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
