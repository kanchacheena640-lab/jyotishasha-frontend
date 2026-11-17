/**
 * lib/financialGuideSsr.test.ts
 *
 * Financial Astrology guides -- FAQ answers and accordion bodies in the initial server HTML, as native
 * <details>/<summary> (collapsed by default, keyboard accessible without JS), the same pattern as the
 * Marriage cluster (MC-05). Every registered guide, EN + HI, is rendered IN-PROCESS through the real
 * route with react-dom/server. Checks, per page:
 *   - every FAQ / accordion item's question and answer appear in server HTML, in order, exactly once,
 *     equal to the topic source data (no invented, dropped or truncated content);
 *   - no client accordion (aria-expanded toggles) remains for those sections;
 *   - the route opts in through the shared renderer's existing `ssrFaq` slot (renderer unchanged);
 *   - the guide's <main> carries lang="hi" on Hindi pages and no lang on English pages (the shared root
 *     <html> is always "en"), via the renderer's opt-in `markContentLang`.
 *
 * Run (repo convention):
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/financialGuideSsr.test.ts
 *   node .ts-test-out/financialGuideSsr.test.js
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

const resolver = load("lib/authority-engine/resolver");
const route = load("app/[locale]/financial-astrology/[slug]/page.tsx").default;
const domain = resolver.getAuthorityDomain("financial-astrology");
const slugs: string[] = resolver.getAllTopicSlugs(domain);

const ENT: Record<string, string> = { "&amp;": "&", "&#x27;": "'", "&quot;": '"', "&lt;": "<", "&gt;": ">", "&nbsp;": " " };
const decode = (s: string) => s.replace(/&(?:amp|#x27|quot|lt|gt|nbsp);/g, (e) => ENT[e]);
const enc = (s: string) => s.replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pick = (o: any, l: string, f: string) => (l === "hi" && o[`${f}_hi`] ? o[`${f}_hi`] : o[f] ?? "");
const mainOf = (html: string) => html.slice(html.indexOf("<main"), html.lastIndexOf("</main>") + 7);
/** <details> items of the section whose <h2> is the given title. */
function detailsOf(html: string, title: string): { q: string; a: string }[] | null {
  const start = html.indexOf(`>${enc(title)}</h2>`);
  if (start < 0) return null;
  const block = html.slice(start, html.indexOf("</section>", start));
  return [...block.matchAll(/<details\b[^>]*>\s*<summary\b[^>]*>\s*<span>([\s\S]*?)<\/span>[\s\S]*?<\/summary>(?:\s*<div\b[^>]*>([\s\S]*?)<\/div>)?\s*<\/details>/g)]
    .map((m) => ({ q: decode(m[1]).trim(), a: decode(m[2] ?? "").trim() }));
}

console.log(`=== Financial guide SSR FAQ: ${slugs.length} guides, EN + HI ===`);
let items = 0;
for (const slug of slugs) {
  const topic = domain.topics[slug];
  const collapsible = topic.sections.filter((s: any) => s.layout === "faq" || s.layout === "accordion");
  check(`${slug}: has an FAQ section`, topic.sections.some((s: any) => s.layout === "faq"));
  for (const locale of ["en", "hi"] as const) {
    const where = `${locale}/${slug}`;
    const main = mainOf(renderToStaticMarkup(React.createElement(route, { params: { locale, slug } })));
    check(`${where}: <main> lang ${locale === "hi" ? '="hi"' : "absent"}`,
      locale === "hi" ? /^<main lang="hi"/.test(main) : !/^<main[^>]*\slang=/.test(main));
    let expectedDetails = 0;
    for (const section of collapsible) {
      const visible = detailsOf(main, pick(section, locale, "title"));
      const source = section.items.map((it: any) => ({ q: pick(it, locale, "label").trim(), a: it.body ? pick(it, locale, "body").trim() : "" }));
      expectedDetails += source.length;
      items += source.length;
      check(`${where} [${section.layout} '${section.id}']: rendered as <details> in server HTML`, visible !== null && visible.length > 0);
      check(`${where} [${section.layout} '${section.id}']: questions + answers equal the source, in order (${visible?.length}/${source.length})`,
        JSON.stringify(visible) === JSON.stringify(source));
      for (const it of source) {
        if (it.a) check(`${where}: answer present exactly once in server HTML ("${it.q.slice(0, 40)}")`, main.split(enc(it.a)).length - 1 === 1);
      }
    }
    check(`${where}: <details> count = FAQ + accordion items (${(main.match(/<details\b/g) || []).length}/${expectedDetails})`,
      (main.match(/<details\b/g) || []).length === expectedDetails);
    // Attribute names only (quoted values such as the Tailwind `open:` variant class are stripped first).
    const detailsTags = (main.match(/<details\b[^>]*>/g) || []).map((t) => t.replace(/="[^"]*"/g, ""));
    check(`${where}: details collapsed by default (no open attribute)`, detailsTags.every((t) => !/\sopen(?=[\s>=])/.test(t)));
    check(`${where}: no client accordion toggles left (aria-expanded)`, !/aria-expanded=/.test(main));
  }
}

const routeSrc = src("app/[locale]/financial-astrology/[slug]/page.tsx");
check("financial route opts in through the existing ssrFaq slot", /^\s*ssrFaq\s*$/m.test(routeSrc));
check("shared renderer unchanged: ssrFaq optional, swaps only faq/accordion to StaticFaqSection",
  /ssrFaq\?: boolean/.test(src("components/authority-engine/AuthorityDetailRenderer.tsx")) &&
  src("components/authority-engine/AuthorityDetailRenderer.tsx").includes("ssrFaq && (section.layout === 'faq' || section.layout === 'accordion')"));

console.log(`\nchecked ${slugs.length} guides x 2 locales, ${items} FAQ/accordion items`);
console.log(`RESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
