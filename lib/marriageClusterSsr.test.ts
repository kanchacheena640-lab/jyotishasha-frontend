/**
 * lib/marriageClusterSsr.test.ts
 *
 * MC-05 -- every registered Marriage Astrology topic puts its FAQ answers and accordion bodies in
 * the initial server HTML, exactly once, as native <details> (collapsed by default, keyboard
 * accessible without JS). Rendered IN-PROCESS through the real routes with react-dom/server (same
 * test-only loader as the MC-02 snapshot). Also proves the change is scoped to the marriage route:
 * the financial-astrology route still renders its accordions with the client component.
 *
 * Run (repo convention):
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/marriageClusterSsr.test.ts
 *   node .ts-test-out/marriageClusterSsr.test.js
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
const marriageRoute = load("app/[locale]/marriage-astrology/[slug]/page.tsx").default;
const financialRoute = load("app/[locale]/financial-astrology/[slug]/page.tsx").default;
const { marriageTopicLandings } = load("lib/domains/marriage-astrology/_landing");
const domain = resolver.getAuthorityDomain("marriage-astrology");
const slugs: string[] = resolver.getAllTopicSlugs(domain);

const ENT: Record<string, string> = { "&amp;": "&", "&#x27;": "'", "&quot;": '"', "&lt;": "<", "&gt;": ">", "&nbsp;": " " };
const decode = (s: string) => s.replace(/&(?:amp|#x27|quot|lt|gt|nbsp);/g, (e) => ENT[e]);
const norm = (s: string) => decode(s).replace(/\s+/g, " ").trim();
const visibleText = (html: string) => norm(html.replace(/<script\b[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " "));
const mainOf = (html: string) => html.slice(html.indexOf("<main"), html.lastIndexOf("</main>") + 7);
const pick = (o: any, l: string, f: string) => (l === "hi" && o[`${f}_hi`] ? o[`${f}_hi`] : o[f] ?? "");
const count = (hay: string, needle: string) => { let c = 0; let i = -1; const n = norm(needle); while ((i = hay.indexOf(n, i + 1)) >= 0) c++; return c; };

console.log(`=== 1. All ${slugs.length} registered marriage topics, EN + HI ===`);
check("registry has topics", slugs.length > 0);
for (const slug of slugs) {
  const topic = domain.topics[slug];
  const collapsed = topic.sections.filter((s: any) => s.layout === "faq" || s.layout === "accordion");
  const collapsedItems = collapsed.flatMap((s: any) => s.items);
  const faq = topic.sections.find((s: any) => s.layout === "faq");
  for (const locale of ["en", "hi"]) {
    const t = (c: string) => `[${slug}][${locale}] ${c}`;
    const html = renderToStaticMarkup(React.createElement(marriageRoute, { params: { locale, slug } }));
    const main = mainOf(html);
    const text = visibleText(main);
    const faqBadAns = (faq?.items ?? []).filter((i: any) => pick(i, locale, "body") && count(text, pick(i, locale, "body")) !== 1).map((i: any) => i.id);
    check(t(`every FAQ answer is in server HTML exactly once (${(faq?.items ?? []).length} answers; bad: ${JSON.stringify(faqBadAns)})`), faqBadAns.length === 0);
    const bodyBad = collapsedItems.filter((i: any) => pick(i, locale, "body") && count(text, pick(i, locale, "body")) !== 1).map((i: any) => i.id);
    check(t(`every collapsed (accordion + FAQ) body is in server HTML exactly once (bad: ${JSON.stringify(bodyBad)})`), bodyBad.length === 0);
    const labelBad = collapsedItems.filter((i: any) => count(text, pick(i, locale, "label")) < 1).map((i: any) => i.id);
    check(t(`every collapsed label / FAQ question is still server-visible (bad: ${JSON.stringify(labelBad)})`), labelBad.length === 0);
    const details = (main.match(/<details\b/g) || []).length;
    // Attribute-level checks only: tags with their class/style values blanked (Tailwind classes such as
    // `open:bg-…` and body words such as "hidden" must not count).
    const tags = [...main.matchAll(/<[a-z][^>]*>/g)].map((m) => m[0].replace(/\s(class|aria-label)="[^"]*"/g, ""));
    check(t(`one native <details> per collapsed item (${details} = ${collapsedItems.length}), all collapsed by default`),
      details === collapsedItems.length && !tags.some((tag) => /^<details\b/.test(tag) && /\sopen(=|\s|>)/.test(tag)));
    check(t("no client accordion buttons remain for collapsed sections (no aria-expanded toggles)"), !/aria-expanded=/.test(main));
    check(t("no hidden SEO clones (no hidden attribute / display:none style in <main>)"),
      !tags.some((tag) => /\shidden(=|\s|>)/.test(tag) || /style="[^"]*display:\s*none/.test(tag)));
    const ids = [...main.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    check(t("no duplicate element ids"), new Set(ids).size === ids.length);
    const h2 = [...main.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].length;
    check(t("section headings unchanged in count (one H2 per content section is still rendered)"),
      topic.sections.every((s: any) => count(text, pick(s, locale, "title")) >= 1) && h2 >= topic.sections.length);
    if (marriageTopicLandings[slug]) {
      const unitOk = marriageTopicLandings[slug].offer
        ? main.includes('aria-labelledby="topic-landing-offer"')
        : main.includes('aria-labelledby="topic-landing-primary-action"');
      check(t("landing overlay still renders (short answer + its report card or primary action)"), unitOk && /Short answer|संक्षिप्त उत्तर/.test(text));
    }
    if (slug === "spouse-nature") {
      check(t("spouse-nature keeps exactly 27 <details> and the Lagna tool"), details === 27 && /<select\b/.test(main) && main.includes("lagna-finder"));
    }
  }
}

console.log("\n=== 2. Scope: marriage route only ===");
const route = src("app/[locale]/marriage-astrology/[slug]/page.tsx");
check("marriage route turns ssrFaq on for every topic (a landing config may still set its own)",
  route.includes("ssrFaq={landing?.ssrFaq ?? true}") && !route.includes("ssrFaq: landing.ssrFaq") && !/^\s*ssrFaq\s*$/m.test(route));
check("shared renderer unchanged: ssrFaq stays optional and only swaps faq/accordion to StaticFaqSection",
  /ssrFaq\?: boolean/.test(src("components/authority-engine/AuthorityDetailRenderer.tsx")) &&
  src("components/authority-engine/AuthorityDetailRenderer.tsx").includes("ssrFaq && (section.layout === 'faq' || section.layout === 'accordion')"));
check("financial route does not opt in", !/ssrFaq/.test(src("app/[locale]/financial-astrology/[slug]/page.tsx")));
const fin = resolver.getAuthorityDomain("financial-astrology");
const finSlug = resolver.getAllTopicSlugs(fin).find((s: string) => fin.topics[s].sections.some((x: any) => x.layout === "accordion" || x.layout === "faq"));
if (finSlug) {
  const finMain = mainOf(renderToStaticMarkup(React.createElement(financialRoute, { params: { locale: "en", slug: finSlug } })));
  check(`financial topic '${finSlug}' still renders its collapsed sections with the client accordion (no <details>)`,
    !/<details\b/.test(finMain) && /aria-expanded=/.test(finMain));
}

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
