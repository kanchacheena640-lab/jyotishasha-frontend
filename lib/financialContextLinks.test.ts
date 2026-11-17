/**
 * lib/financialContextLinks.test.ts
 *
 * Financial Astrology -- contextual links between guides (lib/domains/financial-astrology/_contextLinks.ts).
 * Renders every registered guide (EN + HI) in-process through the real route and checks:
 *   - job-vs-business carries exactly one contextual link, to the Business Astrology guide, localized
 *     (/hi on Hindi pages), placed right after its "business-readiness" section;
 *   - no other guide renders a contextual link;
 *   - every configured entry points at a registered guide and an existing source section.
 *
 * Run (repo convention):
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/financialContextLinks.test.ts
 *   node .ts-test-out/financialContextLinks.test.js
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports -- test-only module loader */
import * as fs from "fs";
import * as path from "path";

let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);

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
const { FINANCIAL_CONTEXT_LINKS } = load("lib/domains/financial-astrology/_contextLinks");
const domain = resolver.getAuthorityDomain("financial-astrology");
const slugs: string[] = resolver.getAllTopicSlugs(domain);
const enc = (s: string) => s.replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pick = (o: any, l: string, f: string) => (l === "hi" && o[`${f}_hi`] ? o[`${f}_hi`] : o[f] ?? "");
const mainOf = (html: string) => html.slice(html.indexOf("<main"), html.lastIndexOf("</main>") + 7);

console.log("=== config ===");
check("only job-vs-business has contextual links", JSON.stringify(Object.keys(FINANCIAL_CONTEXT_LINKS)) === JSON.stringify(["job-vs-business"]));
for (const [source, entries] of Object.entries(FINANCIAL_CONTEXT_LINKS) as [string, any[]][]) {
  check(`${source}: is a registered guide`, slugs.includes(source));
  for (const e of entries) {
    check(`${source} -> ${e.target}: target is a registered guide`, slugs.includes(e.target));
    check(`${source}: section '${e.afterSectionId}' exists`, domain.topics[source]?.sections.some((s: any) => s.id === e.afterSectionId));
    check(`${source} -> ${e.target}: EN and HI copy present`, [e.lead, e.lead_hi, e.label, e.label_hi].every((x: string) => typeof x === "string" && x.trim().length > 0));
  }
}

console.log("=== rendered guides ===");
for (const slug of slugs) {
  for (const locale of ["en", "hi"] as const) {
    const where = `${locale}/${slug}`;
    const main = mainOf(renderToStaticMarkup(React.createElement(route, { params: { locale, slug } })));
    const blocks = main.match(/<p[^>]*data-financial-context-link=""[^>]*>[\s\S]*?<\/p>/g) || [];
    if (slug !== "job-vs-business") {
      check(`${where}: no contextual link`, blocks.length === 0);
      continue;
    }
    const lp = locale === "hi" ? "/hi" : "";
    const href = `${lp}/financial-astrology/business-astrology`;
    check(`${where}: exactly one contextual link`, blocks.length === 1);
    check(`${where}: links ${href}`, blocks.length === 1 && (blocks[0].match(/href="([^"]+)"/g) || []).join() === `href="${href}"`);
    const entry = FINANCIAL_CONTEXT_LINKS["job-vs-business"][0];
    check(`${where}: localized lead and label`, blocks.length === 1 && blocks[0].includes(enc(pick(entry, locale, "lead"))) && blocks[0].includes(enc(pick(entry, locale, "label"))));
    // Placement: after the business-readiness section's heading, before the next section's heading.
    const sections = domain.topics[slug].sections;
    const i = sections.findIndex((s: any) => s.id === "business-readiness");
    const here = main.indexOf(`>${enc(pick(sections[i], locale, "title"))}</h2>`);
    const next = main.indexOf(`>${enc(pick(sections[i + 1], locale, "title"))}</h2>`);
    const at = main.indexOf("data-financial-context-link");
    check(`${where}: placed after '${sections[i].id}' and before '${sections[i + 1].id}'`, here > 0 && at > here && at < next);
  }
}

console.log(`\nchecked ${slugs.length} guides x 2 locales`);
console.log(`RESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
