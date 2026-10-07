/**
 * lib/marriageClusterSnapshot.test.ts
 *
 * MC-02 -- Marriage Astrology cluster SEO / content snapshot baseline.
 *
 * Renders every registered marriage-astrology topic page plus the hub, in EN and HI, IN-PROCESS
 * through the real route modules (generateMetadata + the page component, rendered with
 * react-dom/server), extracts SEMANTIC facts (metadata, headings, FAQ, links, JSON-LD, server-
 * visible content presence, word count) and compares them with the approved baseline in
 * lib/fixtures/marriage-cluster-baseline.json. No dev server, network, backend, OpenAI or payment.
 *
 * Interpretation guide: docs/marriage-cluster/MC-02_SNAPSHOT_BASELINE.md
 *
 * Run (repo convention):
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/marriageClusterSnapshot.test.ts
 *   node .ts-test-out/marriageClusterSnapshot.test.js
 * (then remove .ts-test-out/ -- build output, never committed.)
 *
 * Modes (environment variables):
 *   MC_SNAPSHOT_MODE=strict    (default) any difference from the baseline fails.
 *   MC_SNAPSHOT_MODE=additive  only regressions fail: removed items, decreased counts, changed non-empty
 *                              values. Additions / increases / previously-empty values being filled are
 *                              listed but pass (gate for additive batches such as MC-05).
 *   MC_SNAPSHOT_UPDATE=1       rewrite the baseline JSON and the Search Console URL template from the
 *                              current render. Only after the printed diff has been reviewed/approved.
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires -- test-only module loader */
import * as fs from "fs";
import * as path from "path";

// ---- repo root + test-only TypeScript source loader (maps `@/`, stubs CSS modules) -------------------
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

const ts = require("typescript");
const NodeModule: any = require("module");
const originalResolve = NodeModule._resolveFilename;
NodeModule._resolveFilename = function (request: string, parent: any, ...rest: any[]) {
  const mapped = request.startsWith("@/") ? path.join(root, request.slice(2)) : request;
  return originalResolve.call(this, mapped, parent, ...rest);
};
for (const ext of [".ts", ".tsx"]) {
  NodeModule._extensions[ext] = (m: any, filename: string) => {
    const out = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      fileName: filename,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    m._compile(out, filename);
  };
}
// CSS modules only contribute class names, which the snapshot deliberately ignores.
NodeModule._extensions[".css"] = (m: any) => {
  m.exports = new Proxy({}, { get: (_t: any, key: any) => (key === "__esModule" ? false : String(key)) });
};
const load = (rel: string): any => require(path.join(root, rel));

const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

const BASELINE_FILE = "lib/fixtures/marriage-cluster-baseline.json";
const GSC_TEMPLATE_FILE = "docs/marriage-cluster/gsc-baseline-template.csv";
const SITE = "https://www.jyotishasha.com";
const MODE = (process.env.MC_SNAPSHOT_MODE || "strict").toLowerCase();
const UPDATE = process.env.MC_SNAPSHOT_UPDATE === "1";
const LOCALES = ["en", "hi"] as const;
type Locale = (typeof LOCALES)[number];

const resolver = load("lib/authority-engine/resolver");
const topicRoute = load("app/[locale]/marriage-astrology/[slug]/page.tsx");
const hubRoute = load("app/[locale]/marriage-astrology/page.tsx");
const domain = resolver.getAuthorityDomain("marriage-astrology");
const slugs: string[] = resolver.getAllTopicSlugs(domain);

// ---- deterministic text helpers ----------------------------------------------------------------------
const ENTITIES: Record<string, string> = { "&amp;": "&", "&#x27;": "'", "&#39;": "'", "&quot;": '"', "&lt;": "<", "&gt;": ">", "&nbsp;": " " };
const decode = (s: string) => s.replace(/&(?:amp|#x27|#39|quot|lt|gt|nbsp);/g, (e) => ENTITIES[e]);
const norm = (s: string) => decode(s).replace(/\s+/g, " ").trim();
/** Server-text method: <main> only, drop <script>/<style>, tags -> space, decode entities, split on whitespace. */
const serverText = (html: string) => norm(html.replace(/<script\b[\s\S]*?<\/script>/g, " ").replace(/<style\b[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " "));
const headings = (html: string, level: number) =>
  [...html.matchAll(new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)</h${level}>`, "g"))].map((m) => serverText(m[1]));
const mainOf = (html: string) => {
  const start = html.indexOf("<main");
  const end = html.lastIndexOf("</main>");
  return start >= 0 && end > start ? html.slice(start, end + 7) : html;
};
const uniqSorted = (xs: string[]) => [...new Set(xs)].sort();
const pick = (o: any, l: Locale, field: string) => (l === "hi" && o?.[`${field}_hi`] ? o[`${field}_hi`] : o?.[field] ?? "");

// ---- snapshot extraction ---------------------------------------------------------------------------------
function seoFacts(md: any) {
  return {
    title: typeof md?.title === "string" ? md.title : md?.title?.default ?? null,
    description: md?.description ?? null,
    keywords: md?.keywords ?? [],
    canonical: md?.alternates?.canonical ?? null,
    alternates: md?.alternates?.languages ?? null,
    robots: md?.robots ?? null,
    openGraph: md?.openGraph ? { type: md.openGraph.type ?? null, url: md.openGraph.url ?? null, title: md.openGraph.title ?? null } : null,
  };
}

function linkFacts(main: string) {
  const hrefs = [...main.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((m) => decode(m[1]));
  const internal = uniqSorted(hrefs.filter((h) => h.startsWith("/")));
  const strip = (h: string) => h.replace(/^\/hi(?=\/)/, "");
  return {
    internal,
    reports: internal.filter((h) => strip(h).startsWith("/reports/")),
    samples: internal.filter((h) => strip(h).startsWith("/report-samples/")),
    tools: internal.filter((h) => strip(h).startsWith("/tools/")),
    marriageTopics: internal.filter((h) => strip(h).startsWith("/marriage-astrology/")),
    external: uniqSorted(hrefs.filter((h) => /^https?:\/\//.test(h)).map((h) => new URL(h).host)),
    embeds: uniqSorted([...main.matchAll(/<iframe\b[^>]*\bsrc="([^"]+)"/g)].map((m) => new URL(decode(m[1]), SITE).host)),
  };
}

function schemaFacts(html: string) {
  const objs = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  return { types: objs.map((o) => o["@type"]), objects: objs };
}

function topicContentFacts(topic: any, locale: Locale, text: string) {
  const has = (s: string) => !!s && text.includes(norm(s));
  const sections = topic.sections.map((s: any) => {
    const withBody = s.items.filter((i: any) => pick(i, locale, "body"));
    return {
      id: s.id,
      layout: s.layout,
      title: pick(s, locale, "title"),
      titleInServer: has(pick(s, locale, "title")),
      items: s.items.length,
      labelsInServer: s.items.filter((i: any) => has(pick(i, locale, "label"))).length,
      bodies: withBody.length,
      bodiesInServer: withBody.filter((i: any) => has(pick(i, locale, "body"))).length,
    };
  });
  const faqSection = topic.sections.find((s: any) => s.layout === "faq");
  const faqItems: any[] = faqSection?.items ?? [];
  return {
    sections,
    faq: {
      count: faqItems.length,
      questions: faqItems.map((i) => pick(i, locale, "label")),
      questionsInServer: faqItems.filter((i) => has(pick(i, locale, "label"))).length,
      answersInServer: faqItems.filter((i) => has(pick(i, locale, "body"))).length,
    },
  };
}

async function snapshotTopic(slug: string, locale: Locale) {
  const params = { locale, slug };
  const md = await topicRoute.generateMetadata({ params });
  const html = renderToStaticMarkup(React.createElement(topicRoute.default, { params }));
  const main = mainOf(html);
  const text = serverText(main);
  const content = topicContentFacts(domain.topics[slug], locale, text);
  const links = linkFacts(main);
  const schema = schemaFacts(html);
  const seo = seoFacts(md);
  const collapsed = content.sections.filter((s: any) => s.layout === "accordion" || s.layout === "faq");
  return {
    key: `${slug}|${locale}`,
    type: "topic",
    locale,
    path: `${locale === "hi" ? "/hi" : ""}/marriage-astrology/${slug}`,
    seo,
    headings: { h1: headings(main, 1), h2: headings(main, 2), h3: headings(main, 3) },
    faq: content.faq,
    sections: content.sections,
    links,
    schema,
    server: { wordCount: text.split(" ").filter(Boolean).length, detailsElements: (main.match(/<details\b/g) || []).length },
    // Derived, human-readable facts about the CURRENT state (known defects are recorded, not fixed).
    facts: {
      hindiMetaFallsBackToEnglish: locale === "hi" ? seo.description === domain.topics[slug].metaDescription : null,
      faqPageSchema: schema.types.includes("FAQPage"),
      faqAnswersInServer: `${content.faq.answersInServer}/${content.faq.count}`,
      collapsedBodiesInServer: `${collapsed.reduce((n: number, s: any) => n + s.bodiesInServer, 0)}/${collapsed.reduce((n: number, s: any) => n + s.bodies, 0)}`,
      reportDestinationsRepeated: links.reports.length < (main.match(/href="(?:\/hi)?\/reports\//g) || []).length,
    },
  };
}

async function snapshotHub(locale: Locale) {
  const params = { locale };
  const md = await hubRoute.generateMetadata({ params });
  const html = renderToStaticMarkup(React.createElement(hubRoute.default, { params }));
  const main = mainOf(html);
  const text = serverText(main);
  return {
    key: `hub|${locale}`,
    type: "hub",
    locale,
    path: `${locale === "hi" ? "/hi" : ""}/marriage-astrology`,
    seo: seoFacts(md),
    headings: { h1: headings(main, 1), h2: headings(main, 2), h3: headings(main, 3) },
    links: linkFacts(main),
    schema: schemaFacts(html),
    server: { wordCount: text.split(" ").filter(Boolean).length, detailsElements: (main.match(/<details\b/g) || []).length },
  };
}

// ---- semantic diff ---------------------------------------------------------------------------------------
type Finding = { page: string; kind: "REMOVED" | "ADDED" | "CHANGED" | "DECREASED" | "INCREASED" | "FILLED"; what: string };

function diff(page: string, before: any, after: any, at: string, out: Finding[]) {
  if (JSON.stringify(before) === JSON.stringify(after)) return;
  if (Array.isArray(before) && Array.isArray(after) && [...before, ...after].every((x) => typeof x !== "object" || x === null)) {
    const b = before.map(String), a = after.map(String);
    for (const x of b.filter((x) => !a.includes(x))) out.push({ page, kind: "REMOVED", what: `${at}: "${x}"` });
    for (const x of a.filter((x) => !b.includes(x))) out.push({ page, kind: "ADDED", what: `${at}: "${x}"` });
    if (b.length === a.length && b.every((x) => a.includes(x))) out.push({ page, kind: "CHANGED", what: `${at}: order changed` });
    return;
  }
  if (Array.isArray(before) && Array.isArray(after)) {
    const keyOf = (x: any, i: number) => (x && typeof x === "object" && "id" in x ? `#${x.id}` : x && x["@type"] ? `@${x["@type"]}` : `[${i}]`);
    const bk = before.map(keyOf), ak = after.map(keyOf);
    before.forEach((x: any, i: number) => { if (!ak.includes(bk[i])) out.push({ page, kind: "REMOVED", what: `${at}${bk[i]}` }); });
    after.forEach((x: any, i: number) => {
      const j = bk.indexOf(ak[i]);
      if (j < 0) out.push({ page, kind: "ADDED", what: `${at}${ak[i]}` });
      else diff(page, before[j], x, `${at}${ak[i]}`, out);
    });
    return;
  }
  if (before && after && typeof before === "object" && typeof after === "object") {
    for (const k of uniqSorted([...Object.keys(before), ...Object.keys(after)])) diff(page, before[k], after[k], at ? `${at}.${k}` : k, out);
    return;
  }
  if (typeof before === "number" && typeof after === "number") {
    out.push({ page, kind: after < before ? "DECREASED" : "INCREASED", what: `${at}: ${before} -> ${after}` });
    return;
  }
  const empty = (v: any) => v === null || v === undefined || v === "" || v === false;
  if (empty(before) && !empty(after)) out.push({ page, kind: "FILLED", what: `${at}: ${JSON.stringify(before)} -> ${JSON.stringify(after)}` });
  else out.push({ page, kind: "CHANGED", what: `${at}: ${JSON.stringify(before)} -> ${JSON.stringify(after)}` });
}

// ---- main ------------------------------------------------------------------------------------------------
async function main() {
  const pages: any[] = [];
  for (const slug of slugs) for (const locale of LOCALES) pages.push(await snapshotTopic(slug, locale));
  for (const locale of LOCALES) pages.push(await snapshotHub(locale));

  // Documented assumptions behind "route metadata == real <head>": no layout adds robots or a title template.
  const layoutsClean = ["app/layout.tsx", "app/[locale]/layout.tsx"].every((f) => !/\brobots\b|template\s*:/.test(src(f)));

  const current = {
    _about: "MC-02 semantic SEO/content baseline for the Marriage Astrology cluster. Generated by lib/marriageClusterSnapshot.test.ts (MC_SNAPSHOT_UPDATE=1). See docs/marriage-cluster/MC-02_SNAPSHOT_BASELINE.md.",
    serverTextMethod: "In-process render of the route component (react-dom/server renderToStaticMarkup); text of <main> only; <script>/<style> removed; tags replaced by spaces; HTML entities decoded; whitespace-split token count.",
    pageCount: pages.length,
    pages: Object.fromEntries(pages.map((p) => [p.key, p])),
  };

  if (UPDATE) {
    fs.mkdirSync(path.join(root, path.dirname(BASELINE_FILE)), { recursive: true });
    fs.writeFileSync(path.join(root, BASELINE_FILE), JSON.stringify(current, null, 2) + "\n", "utf8");
    fs.mkdirSync(path.join(root, path.dirname(GSC_TEMPLATE_FILE)), { recursive: true });
    const rows = ["url,page_type,slug,locale,date_range_start,date_range_end,clicks,impressions,ctr,avg_position,top_queries,captured_by,captured_at"];
    for (const p of pages) rows.push(`${SITE}${p.path},${p.type},${p.key.split("|")[0]},${p.locale},,,,,,,,,`);
    fs.writeFileSync(path.join(root, GSC_TEMPLATE_FILE), rows.join("\n") + "\n", "utf8");
    console.log(`UPDATED ${BASELINE_FILE} (${pages.length} pages) and ${GSC_TEMPLATE_FILE}. Review the git diff before committing.`);
    return;
  }

  let passed = 0;
  let failedCount = 0;
  const check = (label: string, ok: boolean) => {
    if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failedCount++; console.log(`  FAIL: ${label}`); }
  };

  console.log(`=== MC-02 snapshot (${MODE} mode) ===`);
  check("layouts add no robots directive or title template (route metadata is the real <head>)", layoutsClean);
  const baselinePath = path.join(root, BASELINE_FILE);
  check(`baseline exists: ${BASELINE_FILE}`, fs.existsSync(baselinePath));
  if (!fs.existsSync(baselinePath)) { console.log(`\nRESULT: ${passed} passed, ${failedCount} failed`); process.exit(1); }
  const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));

  const missing = Object.keys(baseline.pages).filter((k) => !(k in current.pages));
  const extra = Object.keys(current.pages).filter((k) => !(k in baseline.pages));
  check(`every baseline page still renders (missing: ${JSON.stringify(missing)})`, missing.length === 0);
  check(`every rendered page is in the baseline (new: ${JSON.stringify(extra)} -- add via MC_SNAPSHOT_UPDATE=1 after review)`, extra.length === 0);

  const gscRows = fs.existsSync(path.join(root, GSC_TEMPLATE_FILE)) ? src(GSC_TEMPLATE_FILE).trim().split(/\r?\n/).slice(1).map((r) => r.split(",")[0]) : [];
  const expectedUrls = pages.map((p) => `${SITE}${p.path}`);
  check(`Search Console template lists exactly the ${expectedUrls.length} cluster URLs`, JSON.stringify(gscRows) === JSON.stringify(expectedUrls));

  const regressionKinds = new Set(["REMOVED", "DECREASED", "CHANGED"]);
  for (const key of Object.keys(current.pages).filter((k) => k in baseline.pages)) {
    const findings: Finding[] = [];
    diff(key, baseline.pages[key], current.pages[key], "", findings);
    const blocking = MODE === "additive" ? findings.filter((f) => regressionKinds.has(f.kind)) : findings;
    for (const f of findings) console.log(`    ${blocking.includes(f) ? "x" : "+"} [${key.replace("|", "][")}] ${f.kind} ${f.what}`);
    check(`[${key.replace("|", "][")}] matches baseline${findings.length ? ` (${findings.length} difference(s), ${blocking.length} blocking)` : ""}`, blocking.length === 0);
  }

  console.log(`\nRESULT: ${passed} passed, ${failedCount} failed`);
  if (failedCount) {
    console.log(MODE === "strict"
      ? "Intentional change? Review the differences above, then regenerate with MC_SNAPSHOT_UPDATE=1 in the same change."
      : "Additive mode: only REMOVED / DECREASED / CHANGED findings block.");
    process.exit(1);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
