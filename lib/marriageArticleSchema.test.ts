/**
 * lib/marriageArticleSchema.test.ts
 *
 * MC-07 -- Article JSON-LD integrity on Marriage Astrology topic pages. Every registered topic, EN + HI,
 * is rendered IN-PROCESS through the real route and every application/ld+json block is JSON.parse'd.
 *   * exactly one Article; no empty / null / undefined value anywhere in it;
 *   * dates only when the topic's own committed metadata has them (schemaSignals.datePublished /
 *     authority.lastUpdated), otherwise absent -- never invented;
 *   * author = the existing canonical Jyotishasha Organization, identical to the publisher;
 *   * headline / description / url / publisher / @context unchanged versus the committed baseline;
 *   * BreadcrumbList and FAQPage unchanged; hub unchanged; the shared builder (financial-astrology)
 *     untouched.
 *
 * Run (repo convention):
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/marriageArticleSchema.test.ts
 *   node .ts-test-out/marriageArticleSchema.test.js
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
const seo = load("lib/authority-engine/seo");
const { loc } = load("lib/authority-engine/i18n");
const { SITE_URL } = load("lib/seo/articleSchema");
const marriageRoute = load("app/[locale]/marriage-astrology/[slug]/page.tsx").default;
const hubRoute = load("app/[locale]/marriage-astrology/page.tsx").default;
const financialRoute = load("app/[locale]/financial-astrology/[slug]/page.tsx").default;
const domain = resolver.getAuthorityDomain("marriage-astrology");
const slugs: string[] = resolver.getAllTopicSlugs(domain);
const baseline = JSON.parse(src("lib/fixtures/marriage-cluster-baseline.json"));
const ORG = { "@type": "Organization", name: "Jyotishasha", url: SITE_URL };

// Raw committed date metadata per topic (the ONLY acceptable date source).
const rawDates = new Map<string, { published?: string; modified?: string }>();
for (const file of fs.readdirSync(path.join(root, "lib/domains/marriage-astrology/topics")).filter((f) => f.endsWith(".ts"))) {
  for (const v of Object.values(load(`lib/domains/marriage-astrology/topics/${file}`)) as any[]) {
    if (v?.identity?.slug) rawDates.set(v.identity.slug, { published: v.schemaSignals?.datePublished, modified: v.authority?.lastUpdated });
  }
}

const ldBlocks = (html: string): any[] =>
  [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const badValues = (o: any, at = "$"): string[] => {
  if (o === null || o === undefined) return [at];
  if (typeof o === "string") return o.trim() === "" ? [at] : [];
  if (Array.isArray(o)) return o.flatMap((x, i) => badValues(x, `${at}[${i}]`));
  if (typeof o === "object") return Object.entries(o).flatMap(([k, v]) => badValues(v, `${at}.${k}`));
  return [];
};
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

console.log(`=== 1. Article on all ${slugs.length} registered topics, EN + HI ===`);
const dated: string[] = [];
for (const slug of slugs) {
  const topic = domain.topics[slug];
  const raw = rawDates.get(slug) ?? {};
  for (const locale of ["en", "hi"] as const) {
    const t = (c: string) => `[${slug}][${locale}] ${c}`;
    const html = renderToStaticMarkup(React.createElement(marriageRoute, { params: { locale, slug } }));
    let blocks: any[] = [];
    let parsed = true;
    try { blocks = ldBlocks(html); } catch { parsed = false; }
    check(t("every JSON-LD block parses"), parsed);
    const articles = blocks.filter((b) => b["@type"] === "Article");
    check(t(`exactly one Article (found ${articles.length})`), articles.length === 1);
    const a = articles[0] ?? {};
    const bad = badValues(a);
    check(t(`no empty / null / undefined value anywhere in Article (bad: ${JSON.stringify(bad)})`), bad.length === 0);
    check(t("headline, description, url as before (title, meta description, self URL)"),
      a.headline === loc(topic, "title", locale) && a.description === loc(topic, "metaDescription", locale) &&
      a.url === `${SITE_URL}${locale === "hi" ? "/hi" : ""}/marriage-astrology/${slug}`);
    check(t("author = canonical Jyotishasha Organization, identical to publisher"),
      JSON.stringify(a.author) === JSON.stringify(ORG) && JSON.stringify(a.publisher) === JSON.stringify(ORG));
    // Dates: present only from committed metadata, valid ISO dates; otherwise absent.
    const pubOk = raw.published ? a.datePublished === raw.published && ISO_DATE.test(a.datePublished) : !("datePublished" in a);
    const modOk = raw.modified ? a.dateModified === raw.modified && ISO_DATE.test(a.dateModified) : !("dateModified" in a);
    check(t(`datePublished ${raw.published ? `= committed metadata ${raw.published}` : "absent (no committed metadata)"}`), pubOk);
    check(t(`dateModified ${raw.modified ? `= committed metadata ${raw.modified}` : "absent (no committed metadata)"}`), modOk);
    if (raw.published && locale === "en") dated.push(slug);
    check(t("Article fields are exactly the expected set, in the original order"),
      JSON.stringify(Object.keys(a)) === JSON.stringify(["@context", "@type", "headline", "description", "url",
        ...(raw.published ? ["datePublished"] : []), ...(raw.modified ? ["dateModified"] : []), "author", "publisher"]));
    // Versus the committed MC-06 baseline: only empty dates removed and author added.
    const key = `${slug}|${locale}`;
    const before = (baseline.pages[key]?.schema?.objects ?? []) as any[];
    const beforeArticle = before.find((b) => b["@type"] === "Article") ?? {};
    const expected: any = {};
    for (const [k, v] of Object.entries(beforeArticle)) {
      if ((k === "datePublished" || k === "dateModified") && v === "") continue;
      if (k === "publisher") expected.author = ORG;
      expected[k] = v;
    }
    check(t("Article == baseline Article minus empty dates plus author (nothing else changed)"), JSON.stringify(a) === JSON.stringify(expected));
    const others = (arr: any[]) => JSON.stringify(arr.filter((b) => b["@type"] !== "Article"));
    check(t("BreadcrumbList and FAQPage unchanged vs the committed baseline"), others(blocks) === others(before));
    check(t("schema order: BreadcrumbList, Article, FAQPage"), JSON.stringify(blocks.map((b) => b["@type"])) === '["BreadcrumbList","Article","FAQPage"]');
  }
}
console.log(`  INFO: topics with committed date metadata (dates kept): ${JSON.stringify(dated)}`);

console.log("\n=== 2. Scope + no fabrication ===");
for (const locale of ["en", "hi"]) {
  const hub = ldBlocks(renderToStaticMarkup(React.createElement(hubRoute, { params: { locale } })));
  check(`hub [${locale}] JSON-LD unchanged (${hub.length} blocks, as in baseline)`, JSON.stringify(hub) === JSON.stringify(baseline.pages[`hub|${locale}`]?.schema?.objects ?? []));
}
const fin = resolver.getAuthorityDomain("financial-astrology");
for (const finSlug of resolver.getAllTopicSlugs(fin)) {
  const art = ldBlocks(renderToStaticMarkup(React.createElement(financialRoute, { params: { locale: "en", slug: finSlug } }))).find((b) => b["@type"] === "Article");
  check(`financial-astrology '${finSlug}' Article is exactly the unchanged shared builder output (no author, dates as before)`,
    JSON.stringify(art) === JSON.stringify(seo.buildAuthorityArticleSchema(fin, fin.topics[finSlug], "en")) && !("author" in (art ?? {})));
}
const wrapper = src("lib/domains/marriage-astrology/articleSchema.ts");
const code = wrapper.replace(/\/\/.*$/gm, "");
check("wrapper uses no clock, filesystem or git as a date source", !/Date\.now|new Date|statSync|mtime|birthtime|execSync|child_process|git /.test(code) && !/from ['"]fs['"]/.test(code));
check("wrapper starts from the shared builder unchanged", code.includes("buildAuthorityArticleSchema(domain, topic, locale)"));
check("shared seo.ts builder has no author property / date fallback added", !/\bauthor\s*:|Date\.now|new Date/.test(src("lib/authority-engine/seo.ts")));
check("marriage route uses the wrapper; financial route still uses the shared builder",
  src("app/[locale]/marriage-astrology/[slug]/page.tsx").includes("buildMarriageArticleSchema(domain, topic!, locale)") &&
  !src("app/[locale]/marriage-astrology/[slug]/page.tsx").includes("buildAuthorityArticleSchema") &&
  src("app/[locale]/financial-astrology/[slug]/page.tsx").includes("buildAuthorityArticleSchema"));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
