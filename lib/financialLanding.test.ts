/**
 * lib/financialLanding.test.ts
 *
 * Financial Astrology -- opt-in guide landing (lib/domains/financial-astrology/_landing.ts), Marriage guide
 * pattern. Renders every registered guide (EN + HI) in-process through the real route and checks:
 *   - best-career: title/H1 and meta description as approved; a visible "Short answer" right under the hero
 *     (before the first content section) naming the 10th house and lord, the nakshatra, the Atmakaraka and
 *     the Dasha, and saying the chart guarantees no single job; a related-guides block before the FAQ that
 *     links only guides the page did not already link, localized;
 *   - no other guide renders a short answer or related-guides block;
 *   - every configured related slug is a registered guide.
 *
 * Run (repo convention):
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/financialLanding.test.ts
 *   node .ts-test-out/financialLanding.test.js
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
const routeMod = load("app/[locale]/financial-astrology/[slug]/page.tsx");
const { FINANCIAL_TOPIC_LANDINGS } = load("lib/domains/financial-astrology/_landing");
const domain = resolver.getAuthorityDomain("financial-astrology");
const slugs: string[] = resolver.getAllTopicSlugs(domain);
const ENT: Record<string, string> = { "&amp;": "&", "&#x27;": "'", "&quot;": '"', "&lt;": "<", "&gt;": ">", "&nbsp;": " " };
const decode = (s: string) => s.replace(/&(?:amp|#x27|quot|lt|gt|nbsp);/g, (e) => ENT[e]);
const text = (html: string) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const mainOf = (html: string) => html.slice(html.indexOf("<main"), html.lastIndexOf("</main>") + 7);

const TITLE = "Which Career Is Best for Me According to My Birth Chart?";
const DESCRIPTION = "Find career direction in your birth chart with Vedic astrology. Learn how the 10th house, its lord, nakshatra, Atmakaraka and Dasha are read together.";
const FACTORS = {
  en: [/10th house/, /lord/, /nakshatra/, /Atmakaraka/, /Dasha/, /does not guarantee/],
  hi: [/दशम भाव/, /स्वामी/, /नक्षत्र/, /आत्मकारक/, /दशा/, /गारंटी नहीं/],
};

console.log("=== config ===");
check("only best-career has a landing", JSON.stringify(Object.keys(FINANCIAL_TOPIC_LANDINGS)) === JSON.stringify(["best-career"]));
for (const [slug, l] of Object.entries(FINANCIAL_TOPIC_LANDINGS) as [string, any][]) {
  check(`${slug}: registered guide`, slugs.includes(slug));
  for (const s of l.relatedGuides?.topicSlugs ?? []) check(`${slug}: related '${s}' is a registered sibling`, slugs.includes(s) && s !== slug);
}

console.log("=== best-career metadata (the route's generateMetadata uses this shared builder) ===");
const seo = load("lib/authority-engine/seo");
const topic = domain.topics["best-career"];
const mdEn = seo.generateAuthorityTopicMetadata(domain, topic, "en");
check(`EN title = approved (${mdEn.title.length} chars <= 60)`, mdEn.title === TITLE && mdEn.title.length <= 60);
check(`EN description = approved (${mdEn.description.length} chars <= 160)`, mdEn.description === DESCRIPTION && mdEn.description.length <= 160);
check("EN Open Graph title/description match", mdEn.openGraph?.title === TITLE && mdEn.openGraph?.description === DESCRIPTION);

console.log("=== rendered guides ===");
for (const slug of slugs) {
  for (const locale of ["en", "hi"] as const) {
    const where = `${locale}/${slug}`;
    const main = mainOf(renderToStaticMarkup(React.createElement(routeMod.default, { params: { locale, slug } })));
    const shortAnswers = (main.match(/data-financial-short-answer=""/g) || []).length;
    const relatedBlocks = (main.match(/data-financial-related-guides=""/g) || []).length;
    if (slug !== "best-career") {
      check(`${where}: no landing units`, shortAnswers === 0 && relatedBlocks === 0);
      continue;
    }
    const lp = locale === "hi" ? "/hi" : "";
    const h1s = main.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g) || [];
    check(`${where}: one H1`, h1s.length === 1);
    if (locale === "en") check(`${where}: H1 = approved title`, text(h1s[0] ?? "") === TITLE);
    // Short answer: exactly once, before the first content section's heading.
    check(`${where}: one short answer`, shortAnswers === 1);
    const sa = main.indexOf("data-financial-short-answer");
    const firstSection = main.indexOf(`>${decode(locale === "hi" ? topic.sections[0].title_hi : topic.sections[0].title).replace(/&/g, "&amp;")}</h2>`);
    check(`${where}: short answer sits before the first content section`, sa > 0 && firstSection > sa);
    // Visible text of the box: from the end of its opening tag to its closing </section>.
    const saText = text(main.slice(main.indexOf(">", sa) + 1, main.indexOf("</section>", sa)));
    check(`${where}: short answer label visible`, saText.startsWith(locale === "hi" ? "संक्षिप्त उत्तर" : "Short answer"));
    for (const re of FACTORS[locale]) check(`${where}: short answer mentions ${re}`, re.test(saText));
    // Related guides: once, before the FAQ, localized, only links the page did not otherwise have.
    check(`${where}: one related-guides block`, relatedBlocks === 1);
    const rg = main.indexOf("data-financial-related-guides");
    const faqTitle = locale === "hi" ? topic.sections.find((s: any) => s.layout === "faq").title_hi : topic.sections.find((s: any) => s.layout === "faq").title;
    check(`${where}: related guides sit before the FAQ`, rg > 0 && rg < main.indexOf(`>${faqTitle}</h2>`));
    const block = main.slice(rg, main.indexOf("</section>", rg));
    const hrefs = [...block.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    check(`${where}: related links ${JSON.stringify(hrefs)}`, JSON.stringify(hrefs) === JSON.stringify([`${lp}/financial-astrology/government-job`, `${lp}/financial-astrology/career-growth`]));
    const elsewhere = [...main.replace(block, "").matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    check(`${where}: related links are new to the page`, hrefs.every((h) => !elsewhere.includes(h)));
    check(`${where}: existing links kept (breadcrumb, CTAs, related topics)`,
      [lp || "/", `${lp}/financial-astrology`, "/reports/career_report", `${lp}/tools/career-path`,
        `${lp}/financial-astrology/new-job-chances`, `${lp}/financial-astrology/job-vs-business`, `${lp}/financial-astrology/job-change-prediction`]
        .every((h) => elsewhere.includes(h)));
  }
}

console.log(`\nchecked ${slugs.length} guides x 2 locales`);
console.log(`RESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
