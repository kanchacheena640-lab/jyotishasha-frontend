/**
 * lib/financialGuideSchema.test.ts
 *
 * Financial Astrology guides -- JSON-LD. Every registered guide, EN + HI, is rendered IN-PROCESS through the
 * real route and every application/ld+json block is JSON.parse'd:
 *   - exactly BreadcrumbList + Article + FAQPage, one of each, no duplicates;
 *   - FAQPage equals, item for item and in order, the FAQ the SAME render shows in server HTML (<details>),
 *     and the topic source data;
 *   - Article: no empty / null / undefined value anywhere; author = the canonical Jyotishasha Organization
 *     (identical to the publisher); mainEntityOfPage = { WebPage, @id: canonical URL }; dates are the topic's
 *     own committed metadata (valid ISO dates), never invented; headline / description / url / publisher /
 *     @context unchanged versus the shared builder;
 *   - BreadcrumbList unchanged versus the shared builder;
 *   - Financial-scoped builders only: the route does not use the Marriage helpers, and the shared seo.ts
 *     builder gains no author / FAQ logic.
 *
 * Run (repo convention):
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/financialGuideSchema.test.ts
 *   node .ts-test-out/financialGuideSchema.test.js
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports -- test-only module loader */
import * as fs from "fs";
import * as path from "path";

let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

const ts = require("typescript");
const NodeModule: any = require("module");
const originalResolve = NodeModule._resolveFilename;
NodeModule._resolveFilename = function (request: string, parent: any, ...rest: any[]) {
  let mapped = request.startsWith("@/") ? path.join(root, request.slice(2)) : request;
  // As in marriageClusterSnapshot.test.ts: a .ts module wins over a same-named .json sibling.
  const abs = mapped.startsWith(".") && parent?.filename ? path.resolve(path.dirname(parent.filename), mapped) : mapped;
  if (path.isAbsolute(abs) && !path.extname(abs) && fs.existsSync(`${abs}.ts`) && fs.existsSync(`${abs}.json`)) mapped = `${abs}.ts`;
  return originalResolve.call(this, mapped, parent, ...rest);
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
  if (ok) { passed++; } else { failed++; console.log(`  FAIL: ${label}`); }
}

const SITE = "https://www.jyotishasha.com";
const resolver = load("lib/authority-engine/resolver");
const seo = load("lib/authority-engine/seo");
const routeMod = load("app/[locale]/financial-astrology/[slug]/page.tsx");
const domain = resolver.getAuthorityDomain("financial-astrology");
const slugs: string[] = resolver.getAllTopicSlugs(domain);

const ENT: Record<string, string> = { "&amp;": "&", "&#x27;": "'", "&quot;": '"', "&lt;": "<", "&gt;": ">", "&nbsp;": " " };
const decode = (s: string) => s.replace(/&(?:amp|#x27|quot|lt|gt|nbsp);/g, (e) => ENT[e]);
const enc = (s: string) => s.replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;");
const pick = (o: any, l: string, f: string) => (l === "hi" && o[`${f}_hi`] ? o[`${f}_hi`] : o[f] ?? "");
const ldBlocks = (html: string): any[] =>
  [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
function visibleFaq(html: string, title: string): { q: string; a: string }[] {
  const start = html.indexOf(`>${enc(title)}</h2>`);
  if (start < 0) return [];
  const block = html.slice(start, html.indexOf("</section>", start));
  return [...block.matchAll(/<details\b[^>]*>\s*<summary\b[^>]*>\s*<span>([\s\S]*?)<\/span>[\s\S]*?<\/summary>(?:\s*<div\b[^>]*>([\s\S]*?)<\/div>)?\s*<\/details>/g)]
    .map((m) => ({ q: decode(m[1]).trim(), a: decode(m[2] ?? "").trim() }));
}
/** Paths of every empty / null / undefined value in a JSON value. */
function emptyPaths(v: any, p = "$"): string[] {
  if (v === null || v === undefined) return [p];
  if (typeof v === "string") return v.trim() === "" ? [p] : [];
  if (Array.isArray(v)) return v.length === 0 ? [p] : v.flatMap((x, i) => emptyPaths(x, `${p}[${i}]`));
  if (typeof v === "object") { const ks = Object.keys(v); return ks.length === 0 ? [p] : ks.flatMap((k) => emptyPaths(v[k], `${p}.${k}`)); }
  return [];
}
const ISO = /^\d{4}-\d{2}-\d{2}(T[\d:.]+(Z|[+-]\d{2}:\d{2})?)?$/;

console.log(`=== Financial guide JSON-LD: ${slugs.length} guides, EN + HI ===`);
let faqItems = 0;
(async () => {
  for (const slug of slugs) {
    const topic = domain.topics[slug];
    const faqSection = topic.sections.find((s: any) => s.layout === "faq");
    for (const locale of ["en", "hi"] as const) {
      const where = `${locale}/${slug}`;
      const html: string = renderToStaticMarkup(React.createElement(routeMod.default, { params: { locale, slug } }));
      const blocks = ldBlocks(html);
      const types = blocks.map((b) => b["@type"]);
      check(`${where}: JSON-LD = BreadcrumbList + Article + FAQPage (${JSON.stringify(types)})`,
        JSON.stringify([...types].sort()) === JSON.stringify(["Article", "BreadcrumbList", "FAQPage"]));

      // FAQPage == visible FAQ == source.
      const faq = blocks.find((b) => b["@type"] === "FAQPage");
      const fromSchema = (faq?.mainEntity ?? []).map((e: any) => ({ q: e.name, a: e.acceptedAnswer?.text }));
      const visible = visibleFaq(html, pick(faqSection, locale, "title"));
      const source = faqSection.items.map((it: any) => ({ q: pick(it, locale, "label").trim(), a: it.body ? pick(it, locale, "body").trim() : "" }))
        .filter((x: any) => x.q && x.a);
      faqItems += fromSchema.length;
      check(`${where}: FAQPage has questions (${fromSchema.length})`, fromSchema.length > 0);
      check(`${where}: FAQPage == visible FAQ, item for item, in order`, JSON.stringify(fromSchema) === JSON.stringify(visible));
      check(`${where}: FAQPage == topic source data`, JSON.stringify(fromSchema) === JSON.stringify(source));
      check(`${where}: FAQPage entries are Question/Answer`, (faq?.mainEntity ?? []).every((e: any) => e["@type"] === "Question" && e.acceptedAnswer?.["@type"] === "Answer"));

      // Article.
      const art = blocks.find((b) => b["@type"] === "Article");
      const base = seo.buildAuthorityArticleSchema(domain, topic, locale);
      const md: any = await routeMod.generateMetadata({ params: { locale, slug } });
      const canonical = md.alternates?.canonical;
      check(`${where}: Article has no empty/null/undefined value (${JSON.stringify(emptyPaths(art))})`, art && emptyPaths(art).length === 0);
      check(`${where}: author = canonical Jyotishasha Organization = publisher`,
        JSON.stringify(art?.author) === JSON.stringify({ "@type": "Organization", name: "Jyotishasha", url: SITE }) &&
        JSON.stringify(art?.author) === JSON.stringify(art?.publisher));
      check(`${where}: mainEntityOfPage = WebPage @ canonical URL (${canonical})`,
        art?.mainEntityOfPage?.["@type"] === "WebPage" && art?.mainEntityOfPage?.["@id"] === canonical && canonical === art?.url &&
        canonical === `${SITE}${locale === "hi" ? "/hi" : ""}/financial-astrology/${slug}`);
      for (const k of ["@context", "headline", "description", "url", "publisher"]) {
        check(`${where}: Article ${k} unchanged vs shared builder`, JSON.stringify(art?.[k]) === JSON.stringify(base[k]));
      }
      for (const k of ["datePublished", "dateModified"]) {
        const own = base[k];
        if (typeof own === "string" && own.trim()) check(`${where}: ${k} = topic metadata (${own}), valid ISO date`, art?.[k] === own && ISO.test(own));
        else check(`${where}: ${k} omitted (topic has none)`, !(k in (art ?? {})));
      }
      check(`${where}: Article key set is exactly the expected one`,
        JSON.stringify(Object.keys(art ?? {}).sort()) === JSON.stringify(
          ["@context", "@type", "headline", "description", "url", "mainEntityOfPage", "author", "publisher",
            ...["datePublished", "dateModified"].filter((k) => typeof base[k] === "string" && base[k].trim())].sort()));

      // BreadcrumbList = shared builder with the final Home URL ('/hi', never the redirecting '/hi/'),
      // and its Home item equals the visible breadcrumb's Home link.
      const bc = blocks.find((b) => b["@type"] === "BreadcrumbList");
      check(`${where}: BreadcrumbList = shared builder with authorityHomeUrl(locale)`,
        JSON.stringify(bc) === JSON.stringify(seo.buildAuthorityBreadcrumbSchema(domain, topic, locale, seo.authorityHomeUrl(locale))));
      const main = html.slice(html.lastIndexOf("<main"));
      const navBlock = (main.match(/<nav[^>]*aria-label="[^"]*"[^>]*>([\s\S]*?)<\/nav>/) || [])[1] || "";
      const visibleHome = (navBlock.match(/href="([^"]+)"/) || [])[1];
      const homeItem = bc?.itemListElement?.[0]?.item;
      check(`${where}: visible Home (${visibleHome}) = BreadcrumbList Home (${homeItem}), final URL`,
        visibleHome === (locale === "hi" ? "/hi" : "/") && homeItem === `${SITE}${locale === "hi" ? "/hi" : "/"}`);
    }
  }

  const routeSrc = src("app/[locale]/financial-astrology/[slug]/page.tsx");
  check("route uses the Financial builders, not the Marriage helpers",
    routeSrc.includes("buildFinancialArticleSchema(domain, topic!, locale)") && routeSrc.includes("buildFinancialFaqPageSchema(topic!, locale)") &&
    !/buildMarriage|marriage-astrology/.test(routeSrc));
  const schemaSrc = src("lib/domains/financial-astrology/_schema.ts").replace(/\/\/.*$/gm, "");
  check("Financial builders use no clock / filesystem / git as a date source", !/Date\.now|new Date|statSync|mtime|execSync|child_process/.test(schemaSrc));
  check("Financial builders reuse the shared builders unchanged (no Marriage import)",
    schemaSrc.includes("buildAuthorityArticleSchema(domain, topic, locale)") && schemaSrc.includes("buildFAQPageSchema(items)") && !/marriage/i.test(schemaSrc));
  check("shared seo.ts gains no author / FAQ logic", !/\bauthor\s*:|FAQPage|Date\.now|new Date/.test(src("lib/authority-engine/seo.ts")));

  console.log(`\nchecked ${slugs.length} guides x 2 locales, ${faqItems} FAQPage questions`);
  console.log(`RESULT: ${passed} passed, ${failed} failed`);
  if (failed) process.exit(1);
})();
