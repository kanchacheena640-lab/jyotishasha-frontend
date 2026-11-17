/**
 * lib/financialHub.test.ts
 *
 * Financial Astrology hub guard (docs/seo/JYOTISHASHA_HUB_STANDARD.md). Renders the real hub route
 * (EN + HI) in-process with react-dom/server (same test-only loader as marriageClusterSnapshot.test.ts)
 * and checks section order, headings, every guide exactly once, breadcrumb + BreadcrumbList parity,
 * schema policy, catalog-backed names/prices, localized links, metadata limits, accessibility markup
 * and that the hub ships no client JavaScript of its own.
 *
 * Run (repo convention):
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/financialHub.test.ts
 *   node .ts-test-out/financialHub.test.js
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
const routeMod = load("app/[locale]/financial-astrology/page.tsx");
const { financialAstrologyHub: hub } = load("lib/domains/financial-astrology/_hub");
const { reportsData } = load("app/data/reportsData");
const { toolsData } = load("app/data/toolsData");
const focusedCfg = load("app/data/focusedReportsConfig");
const domain = resolver.getAuthorityDomain("financial-astrology");
const guides: string[] = resolver.getAllTopicSlugs(domain);

const ENT: Record<string, string> = { "&amp;": "&", "&#x27;": "'", "&quot;": '"', "&lt;": "<", "&gt;": ">", "&nbsp;": " " };
const decode = (s: string) => s.replace(/&(?:amp|#x27|quot|lt|gt|nbsp);/g, (e) => ENT[e]);
const text = (h: string) => decode(h.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const pick = (o: any, l: string, f: string) => (l === "hi" && o[`${f}_hi`] ? o[`${f}_hi`] : o[f]);
const sectionOf = (main: string, id: string) => {
  const s = main.indexOf(`aria-labelledby="${id}"`);
  if (s < 0) return "";
  const start = main.lastIndexOf("<section", s);
  return main.slice(start, main.indexOf("</section>", s) + 10);
};

// ---- Config-level guards ----------------------------------------------------------------------
const topicSlugs: string[] = hub.topics.map((t: any) => t.slug);
check("section 4 lists every registered guide", guides.every((g) => topicSlugs.includes(g)));
check("section 4 lists only registered guides, no duplicates",
  topicSlugs.every((s) => guides.includes(s)) && new Set(topicSlugs).size === topicSlugs.length);
check("every guide's group exists", hub.topics.every((t: any) => hub.topicGroups.some((g: any) => g.id === t.group)));
check("every group lists at least one guide", hub.topicGroups.every((g: any) => hub.topics.some((t: any) => t.group === g.id)));
// The planned "Wealth, Savings & Business" group holds exactly the three money guides, in this order.
check("'wealth' group = dhan-yoga, financial-stability, business-astrology",
  JSON.stringify(hub.topics.filter((t: any) => t.group === "wealth").map((t: any) => t.slug)) ===
    JSON.stringify(["dhan-yoga", "financial-stability", "business-astrology"]));
const intentSlugs: string[] = hub.intents.map((i: any) => i.slug);
check("question cards point only to registered guides, no duplicates",
  intentSlugs.length > 0 && intentSlugs.every((s) => guides.includes(s)) && new Set(intentSlugs).size === intentSlugs.length);
check("tool cards point only to existing tool pages", hub.tools.every((t: any) => toolsData.some((x: any) => `/tools/${x.slug}` === t.href)));
const reportSlugs = [hub.reports.featured.slug, ...hub.reports.more.map((r: any) => r.slug)];
check("report cards are real catalog products", reportSlugs.every((s) => reportsData.some((r: any) => r.slug === s)));
check("focused keys are real catalog questions",
  hub.reports.focusedKeys.every((k: string) => Boolean(focusedCfg.getFocusedReportConfigBySlug(focusedCfg.questionKeyToHumanSlug(k)))));
const hubSrc = src("lib/domains/financial-astrology/_hub.ts");
check("hub config types no prices", !/₹|\bprice\b\s*:/.test(hubSrc));
check("basics links point at existing guides or tools",
  hub.basics.items.every((it: any) => it.links.every((l: any) =>
    (l.href.startsWith("/financial-astrology/") && guides.includes(l.href.split("/").pop())) ||
    toolsData.some((x: any) => `/tools/${x.slug}` === l.href))));
// Copy accuracy: tools and standard reports promise no forecast/timing/transit.
const NO_TIMING = /transit|gochar|गोचर|month|महीन|year|वर्ष|window|forecast|timeline|predict|भविष्य|guarantee|गारंटी|₹/i;
for (const t of hub.tools) for (const l of ["en", "hi"]) check(`tool ${t.href} [${l}] benefit makes no timing promise`, !NO_TIMING.test(pick(t, l, "benefit")));
for (const r of [hub.reports.featured, ...hub.reports.more]) for (const l of ["en", "hi"]) check(`report ${r.slug} [${l}] description makes no timing promise`, !NO_TIMING.test(pick(r, l, "description")));

// ---- Metadata ---------------------------------------------------------------------------------
(async () => {
  for (const locale of ["en", "hi"] as const) {
    const md: any = await routeMod.generateMetadata({ params: { locale } });
    const lp = locale === "hi" ? "/hi" : "";
    check(`[${locale}] title = hub seoTitle, ≤ 60 chars (${md.title?.length})`, md.title === pick(hub, locale, "seoTitle") && md.title.length <= 60);
    check(`[${locale}] description = hub metaDescription, ≤ 160 chars (${md.description?.length})`, md.description === pick(hub, locale, "metaDescription") && md.description.length <= 160);
    check(`[${locale}] Open Graph title/description match`, md.openGraph?.title === md.title && md.openGraph?.description === md.description);
    check(`[${locale}] no "birth chart tool" claim`, !/birth chart tool|जन्म कुंडली टूल/i.test(`${md.title} ${md.description}`));
    check(`[${locale}] canonical self`, md.alternates?.canonical === `${SITE}${lp}/financial-astrology`);
    const langs = md.alternates?.languages ?? {};
    check(`[${locale}] hreflang en/hi/x-default`, langs.en === `${SITE}/financial-astrology` && langs.hi === `${SITE}/hi/financial-astrology` && langs["x-default"] === `${SITE}/financial-astrology`);
    check(`[${locale}] no robots directive`, md.robots === undefined);
  }

  // ---- Rendered HTML ---------------------------------------------------------------------------
  for (const locale of ["en", "hi"] as const) {
    const lp = locale === "hi" ? "/hi" : "";
    const html: string = renderToStaticMarkup(React.createElement(routeMod.default, { params: { locale } }));
    const main = html.slice(html.indexOf("<main"), html.lastIndexOf("</main>") + 7);
    const where = `[${locale}]`;

    check(`${where} main lang ${locale === "hi" ? '="hi"' : "absent"}`, locale === "hi" ? /^<main lang="hi"/.test(main) : !/^<main lang=/.test(main));
    const h1s = main.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g) || [];
    check(`${where} exactly one H1 = hub h1`, h1s.length === 1 && text(h1s[0]) === pick(hub, locale, "h1"));
    const order = ["<nav", 'id="hub-intents"', 'id="hub-tools"', 'id="hub-reports"', 'id="hub-topics"', 'id="hub-basics"'].map((m) => main.indexOf(m));
    check(`${where} section order breadcrumb > questions > tools > reports > guides > explainer (${order})`, order.every((v, i) => v >= 0 && (i === 0 || v > order[i - 1])));
    const h2s = (main.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g) || []).map(text);
    check(`${where} five H2 sections (${h2s.length})`, h2s.length === 5);
    check(`${where} no H2 repeats the H1`, !h2s.includes(pick(hub, locale, "h1")));
    const headingLevels = (main.match(/<h([1-6])\b/g) || []).map((h) => Number(h[2]));
    check(`${where} no skipped heading levels`, headingLevels.every((lv, i) => i === 0 || lv <= headingLevels[i - 1] + 1));

    // Guides: each exactly once in section 4; every guide link localized.
    const topicsSec = sectionOf(main, "hub-topics");
    for (const g of guides) {
      const n = (topicsSec.match(new RegExp(`href="${lp}/financial-astrology/${g}"`, "g")) || []).length;
      check(`${where} guide ${g} appears exactly once in section 4 (${n})`, n === 1);
    }
    const guideLinks = main.match(/href="[^"]*\/financial-astrology\/[^"]+"/g) || [];
    check(`${where} all guide links localized`, guideLinks.every((h) => (locale === "hi" ? h.startsWith('href="/hi/') : !h.startsWith('href="/hi/'))));

    // Breadcrumb: visible == JSON-LD.
    const nav = main.slice(main.indexOf("<nav"), main.indexOf("</nav>") + 6);
    const homeHref = (nav.match(/<a[^>]*href="([^"]+)"/) || [])[1];
    check(`${where} breadcrumb Home links to the final URL`, homeHref === (locale === "hi" ? "/hi" : "/"));
    check(`${where} current crumb is plain text with aria-current="page"`, /<span aria-current="page"[^>]*>([^<]+)<\/span>/.test(nav) && !/<a[^>]*aria-current/.test(nav));
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    check(`${where} exactly one JSON-LD block, BreadcrumbList only`, ld.length === 1 && ld[0]["@type"] === "BreadcrumbList");
    const items = ld[0]?.itemListElement ?? [];
    const visible = [text((nav.match(/<a[^>]*>([\s\S]*?)<\/a>/) || [])[1] || ""), text((nav.match(/aria-current="page"[^>]*>([\s\S]*?)<\/span>/) || [])[1] || "")];
    check(`${where} BreadcrumbList names = visible crumbs (${JSON.stringify(items.map((i: any) => i.name))} vs ${JSON.stringify(visible)})`,
      items.length === 2 && items[0].name === visible[0] && items[1].name === visible[1]);
    check(`${where} BreadcrumbList URLs = final URLs`,
      items[0]?.item === `${SITE}${locale === "hi" ? "/hi" : "/"}` && items[1]?.item === `${SITE}${lp}/financial-astrology`);

    // Tools: localized hrefs.
    const toolsSec = sectionOf(main, "hub-tools");
    for (const t of hub.tools) check(`${where} tool ${t.href} linked once, localized`, (toolsSec.match(new RegExp(`href="${lp}${t.href}"`, "g")) || []).length === 1);

    // Reports: catalog names + prices, English-only notice on Hindi.
    const repSec = sectionOf(main, "hub-reports");
    for (const slug of reportSlugs) {
      const r = reportsData.find((x: any) => x.slug === slug);
      const card = (repSec.match(new RegExp(`<a[^>]*href="/reports/${slug}"[^>]*>([\\s\\S]*?)</a>`)) || [])[1] || "";
      check(`${where} report ${slug}: catalog name, ₹${r.price} (=₹99)`, text(card).includes(r.title[locale]) && text(card).includes(`₹${r.price}`) && r.price === 99);
      check(`${where} report ${slug}: English-only notice ${locale === "hi" ? "shown" : "absent"}`,
        locale === "hi" ? text(card).includes("यह पेज अंग्रेज़ी में है") : !text(card).includes("यह पेज अंग्रेज़ी में है"));
    }
    check(`${where} featured badge is the Financial label`, text(repSec).includes(pick(hub.reports, locale, "featuredLabel")) && !/marriage|विवाह/i.test(text(repSec)));
    for (const k of hub.reports.focusedKeys) {
      const cfg = focusedCfg.getFocusedReportConfigBySlug(focusedCfg.questionKeyToHumanSlug(k));
      const card = (repSec.match(new RegExp(`<a[^>]*href="${lp}/reports/focused/${cfg.humanSlug}"[^>]*>([\\s\\S]*?)</a>`)) || [])[1] || "";
      const q = focusedCfg.getFocusedReportCatalogEntry(cfg).question.question[locale];
      check(`${where} focused ${k}: catalog question + ₹${cfg.priceRupees} (=₹51)`, text(card).includes(text(q)) && text(card).includes(`₹${cfg.priceRupees}`) && cfg.priceRupees === 51);
    }

    // Accessibility markup.
    const anchors = main.match(/<a\b[^>]*>/g) || [];
    check(`${where} every link has a visible focus style (${anchors.filter((a) => !/focus-visible:ring-2/.test(a)).length} without)`, anchors.every((a) => /focus-visible:ring-2/.test(a)));
    const icons = [hub.icon, ...hub.intents.map((i: any) => i.icon), ...hub.tools.map((t: any) => t.icon), ...hub.topicGroups.map((g: any) => g.icon), ...hub.basics.items.map((i: any) => i.icon)];
    const iconOutsideHidden = icons.filter((ic) => {
      const total = main.split(ic).length - 1;
      const hidden = (main.match(new RegExp(`aria-hidden="true"[^>]*>${ic.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<`, "g")) || []).length;
      return total !== hidden;
    });
    check(`${where} decorative icons are aria-hidden (${JSON.stringify(iconOutsideHidden)})`, iconOutsideHidden.length === 0);
    check(`${where} no text truncation classes`, !/line-clamp|truncate/.test(main));
  }

  // ---- Server-rendered, no client JavaScript of its own --------------------------------------------
  for (const f of ["app/[locale]/financial-astrology/page.tsx", "components/authority-engine/IntentHubRenderer.tsx", "lib/domains/financial-astrology/_hub.ts"]) {
    check(`${f} is not a client module and has no event handlers`, !/['"]use client['"]/.test(src(f)) && !/onClick|onChange|useState|useEffect/.test(src(f)));
  }
  check("hub route renders IntentHubRenderer, not AuthorityHubRenderer",
    /IntentHubRenderer/.test(src("app/[locale]/financial-astrology/page.tsx")) && !/AuthorityHubRenderer/.test(src("app/[locale]/financial-astrology/page.tsx")));

  console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
  if (failed) process.exit(1);
})();
