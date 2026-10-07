/**
 * lib/marriageClusterGuards.test.ts
 *
 * MC-01 -- Marriage Astrology cluster SEO / regression guards.
 *
 * Cluster-wide contracts for EVERY topic registered in the marriage-astrology
 * authority domain (discovered from the real registry, never a hard-coded slug
 * list), plus light hub guards. Page-specific landing contracts stay in the
 * per-page tests (marriageTiming / loveMarriage / arrangedMarriage /
 * delayedMarriage Landing.test.ts); this file does NOT force identical page
 * structure -- section/H2/CTA/FAQ/word counts, tools, report cards and video
 * all remain search-intent dependent.
 *
 * Runtime modules (registry, adapter, SEO metadata, landing configs, hub,
 * reports, tools) are loaded from SOURCE through a test-only TypeScript loader
 * that maps the `@/` path alias, so the guards exercise the real production
 * code paths. No network, no backend, no OpenAI, no payments.
 *
 * Standalone, repo convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/marriageClusterGuards.test.ts
 *   node .ts-test-out/lib/marriageClusterGuards.test.js
 * (then remove .ts-test-out/ -- build output, never committed.)
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-var-requires -- test-only module loader */
import * as fs from "fs";
import * as path from "path";

let passed = 0;
let failed = 0;
const failures: string[] = [];
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); }
  else { failed++; failures.push(label); console.log(`  FAIL: ${label}`); }
}

// ---- repo root + test-only TypeScript source loader (maps `@/`) -------------------------------
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
const load = (rel: string): any => require(path.join(root, rel));

const DOMAIN_SLUG = "marriage-astrology";
const BASE_PATH = "/marriage-astrology";
const TOPICS_DIR = "lib/domains/marriage-astrology/topics";

const resolver = load("lib/authority-engine/resolver");
const seo = load("lib/authority-engine/seo");
const { SITE_URL } = load("lib/seo/articleSchema");
const { DOMAIN_MANIFEST, authorityRegistry } = load("lib/authority-engine/registry");
const { marriageTopicLandings } = load("lib/domains/marriage-astrology/_landing");
const { marriageAstrologyHub } = load("lib/domains/marriage-astrology/_hub");
const { reportsData } = load("app/data/reportsData");
const { toolsData } = load("app/data/toolsData");
const { toolContentMap } = load("app/data/toolContent/index");

const domain = resolver.getAuthorityDomain(DOMAIN_SLUG);
const slugs: string[] = resolver.getAllTopicSlugs(domain);
const reportSlugs = new Set<string>(reportsData.map((r: any) => r.slug));
const toolSlugs = new Set<string>(toolsData.map((t: any) => t.slug));
const lp = (locale: "en" | "hi") => (locale === "hi" ? "/hi" : "");

// Raw domain-topic data (pre-adapter), keyed by identity.slug, discovered from the topics directory.
const rawBySlug = new Map<string, any>();
const rawFileBySlug = new Map<string, string>();
for (const file of fs.readdirSync(path.join(root, TOPICS_DIR)).filter((f) => f.endsWith(".ts")).sort()) {
  const mod = load(`${TOPICS_DIR}/${file}`);
  for (const value of Object.values(mod)) {
    const slug = (value as any)?.identity?.slug;
    if (typeof slug === "string") { rawBySlug.set(slug, value); rawFileBySlug.set(slug, file); }
  }
}

// ==============================================================================================
// TEMPORARY ALLOWLISTS -- existing known gaps at MC-01 (HEAD 7bd95df). Each list may only SHRINK:
// a stale entry (the gap has been fixed) FAILS, so the entry must be deleted in the same change.
// Both lists must be empty -- and these constants removed -- at Marriage Cluster closeout (MC-18).
// ==============================================================================================

/** Topics still missing a Hindi meta description (seo.metaDescription_hi). Remove each as it is migrated. */
const HINDI_META_GAP_ALLOWLIST: readonly string[] = [
  "marriage-prediction",   // MC-10
  "early-marriage",        // MC-10
  "second-marriage",       // MC-12
  "divorce-possibility",   // MC-09
];

/**
 * Pages whose landing report card and bottom report CTA currently offer the SAME report
 * (the framework shows it twice). Known architecture today; de-duplicated in MC-08.
 */
const DUPLICATE_REPORT_CTA_ALLOWLIST: Readonly<Record<string, string>> = {
  "marriage-timing":  "marriage_report",
  "love-marriage":    "love_marriage_report",
  "arranged-marriage": "marriage_report",
  "delayed-marriage": "delay_in_marriage_report",
};

/**
 * CTAs present in topic data but never rendered, because the adapter only renders 'tool' / 'report'
 * types ('topic' / 'page' / 'external' are dropped). Known at MC-01; resolved when the page adopts
 * the framework (e.g. converted into a contextual/related-question link in MC-10).
 */
const DROPPED_CTA_ALLOWLIST: Readonly<Record<string, readonly string[]>> = {
  "marriage-prediction": ["cta-compatibility"],   // type 'topic' -> /marriage-astrology/compatibility, never rendered
};

/**
 * FAQ preservation floor: the FAQ item count each page had at MC-01. Adding FAQs is always fine
 * (raise the floor in the same change); dropping below the floor needs a deliberate edit here.
 * Topics registered after MC-01 have no floor and need at least one FAQ.
 */
const FAQ_COUNT_FLOOR: Readonly<Record<string, number>> = {
  "marriage-prediction": 8, "marriage-timing": 11, "love-marriage": 8, "arranged-marriage": 8,
  "delayed-marriage": 9, "early-marriage": 10, "second-marriage": 10, "divorce-possibility": 10,
  "spouse-nature": 10, "married-life": 10, "compatibility": 10, "intercaste-marriage": 10,
};

/**
 * Does an internal path resolve to an existing Next.js app route (under app/[locale]/ or app/)?
 * A dynamic segment ([x]) only counts when the literal value appears in that route directory's own
 * source/data (e.g. the slug map backing /panchang/muhurat/[slug]).
 */
function resolvesToAppRoute(href: string): boolean {
  const segments = href.split("/").filter(Boolean);
  const walk = (dir: string, i: number): boolean => {
    const abs = path.join(root, dir);
    if (!fs.existsSync(abs)) return false;
    if (i === segments.length) return fs.existsSync(path.join(abs, "page.tsx")) || fs.existsSync(path.join(abs, "page.ts"));
    if (fs.existsSync(path.join(abs, segments[i])) && walk(`${dir}/${segments[i]}`, i + 1)) return true;
    const dynamic = fs.readdirSync(abs, { withFileTypes: true }).filter((e) => e.isDirectory() && /^\[[^.\]]+\]$/.test(e.name));
    return dynamic.some((d) => {
      const dataFiles = fs.readdirSync(abs).filter((f) => /\.(ts|tsx)$/.test(f));
      const valueKnown = dataFiles.some((f) => fs.readFileSync(path.join(abs, f), "utf8").includes(segments[i]));
      return valueKnown && walk(`${dir}/${d.name}`, i + 1);
    });
  };
  return walk("app/[locale]", 0) || walk("app", 0);
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const nonEmpty = (v: unknown) => typeof v === "string" && v.trim().length > 0;

// ---- 1. Topic discovery ----------------------------------------------------------------------
console.log("=== 1. Topic discovery (registry is the source of truth) ===");
check(`registry resolves the ${DOMAIN_SLUG} domain with basePath ${BASE_PATH}`, domain?.slug === DOMAIN_SLUG && domain?.basePath === BASE_PATH);
check(`registry has topics (found ${slugs.length})`, slugs.length > 0);
check(`registry slugs are unique`, new Set(slugs).size === slugs.length);
const unregisteredFiles = [...rawBySlug.keys()].filter((s) => !slugs.includes(s));
const registeredWithoutFile = slugs.filter((s) => !rawBySlug.has(s));
check(`every topic file is registered (unregistered: ${JSON.stringify(unregisteredFiles)})`, unregisteredFiles.length === 0);
check(`every registered topic has a topic file (missing: ${JSON.stringify(registeredWithoutFile)})`, registeredWithoutFile.length === 0);
const fileNameMismatch = [...rawFileBySlug.entries()].filter(([s, f]) => f !== `${s}.ts`).map(([s]) => s);
check(`topic file name equals its identity.slug (mismatch: ${JSON.stringify(fileNameMismatch)})`, fileNameMismatch.length === 0);
const params = resolver.getAuthorityStaticParams(domain);
check(`static params render every topic in en + hi (${params.length} = 2 x ${slugs.length})`,
  params.length === slugs.length * 2 && slugs.every((s) => ["en", "hi"].every((l) => params.some((p: any) => p.slug === s && p.locale === l))));

// ---- 2. Per-topic contracts --------------------------------------------------------------------
for (const slug of slugs) {
  const topic = domain.topics[slug];
  const raw = rawBySlug.get(slug);
  const landing = marriageTopicLandings[slug];
  const t = (contract: string) => `[${slug}] ${contract}`;
  console.log(`\n=== 2. ${slug} ===`);

  // A. Page identity
  check(t("A slug is a valid kebab-case slug and matches the engine topic"), SLUG_RE.test(slug) && topic?.slug === slug);
  check(t("A canonical path in topic data is /marriage-astrology/<slug>"), raw?.routing?.canonicalPath === `${BASE_PATH}/${slug}`);
  check(t("A H1 source (identity.title -> engine title) is non-empty in EN and HI"), nonEmpty(topic?.title) && nonEmpty(topic?.title_hi));
  check(t("A EN meta description and hero subtitle are non-empty"), nonEmpty(topic?.metaDescription) && nonEmpty(topic?.subtitle));
  check(t("A has content sections"), Array.isArray(topic?.sections) && topic.sections.length > 0);

  // B. FAQ (data presence only -- rendering mode is not constrained here)
  const faqSections = (topic?.sections ?? []).filter((s: any) => s.layout === "faq");
  check(t(`B exactly one FAQ section (found ${faqSections.length}) -- FAQ schema and the beforeFaq slot assume one`), faqSections.length === 1);
  const faqItems: any[] = faqSections[0]?.items ?? [];
  const badFaq = faqItems.filter((i) => !nonEmpty(i.label) || !nonEmpty(i.body)).map((i) => i.id);
  check(t(`B every FAQ item has a non-empty EN question and answer (bad: ${JSON.stringify(badFaq)})`), faqItems.length > 0 && badFaq.length === 0);
  check(t("B FAQ item ids are unique"), new Set(faqItems.map((i) => i.id)).size === faqItems.length);
  const floor = FAQ_COUNT_FLOOR[slug] ?? 1;
  check(t(`B FAQ count ${faqItems.length} >= preservation floor ${floor}`), faqItems.length >= floor);

  // C. CTA validity
  const rawCtas: any[] = raw?.content?.ctas ?? [];
  const ctas: any[] = topic?.ctas ?? [];
  // The adapter only renders 'tool' / 'report' CTAs and silently drops other types.
  const droppedIds = rawCtas.filter((c) => c.type !== "tool" && c.type !== "report").map((c) => c.id);
  const allowedDropped = DROPPED_CTA_ALLOWLIST[slug] ?? [];
  const unexpectedDropped = droppedIds.filter((id) => !allowedDropped.includes(id));
  check(t(`C no new CTA silently dropped by the adapter (dropped: ${JSON.stringify(droppedIds)}, allowlisted: ${JSON.stringify(allowedDropped)})`),
    unexpectedDropped.length === 0 && rawCtas.length - droppedIds.length === ctas.length);
  for (const id of allowedDropped) {
    check(t(`C allowlisted dropped CTA '${id}' still present -- delete the stale allowlist entry once resolved`), droppedIds.includes(id));
  }
  for (const cta of ctas) {
    if (cta.type === "report") {
      check(t(`C report CTA '${cta.slug}' is a catalogue report (/reports/${cta.slug})`), reportSlugs.has(cta.slug));
    } else if (cta.type === "tool") {
      check(t(`C tool CTA '${cta.slug}' exists in toolsData and the /tools/[toolId] route map`), toolSlugs.has(cta.slug) && cta.slug in toolContentMap);
    } else {
      check(t(`C CTA type '${cta.type}' is renderable (tool | report)`), false);
    }
    check(t(`C CTA '${cta.slug}' has a non-empty EN label`), nonEmpty(cta.label));
  }
  for (const link of topic?.crossDomainLinks ?? []) {
    // CrossDomainLinks renders href = `${localePath}/${[domainSlug, topicSlug].filter(Boolean).join('/')}`.
    const href = `/${[link.domainSlug, link.topicSlug].filter(Boolean).join("/")}`;
    const isAuthority = (DOMAIN_MANIFEST as readonly string[]).includes(link.domainSlug);
    const ok = isAuthority ? !!authorityRegistry[link.domainSlug]?.topics?.[link.topicSlug] : resolvesToAppRoute(href);
    check(t(`C cross-domain link ${href} resolves to ${isAuthority ? "a registered authority topic" : "an existing app route"}`), ok);
  }
  if (landing) {
    if (landing.offer) {
      check(t(`C landing offer report '${landing.offer.reportSlug}' is a catalogue report`), reportSlugs.has(landing.offer.reportSlug));
    }
    if (landing.primaryAction) {
      // /tools/<slug> is served by the dynamic /tools/[toolId] route: validate it exactly like a bottom tool CTA.
      const tool = /^\/tools\/([a-z0-9-]+)$/.exec(landing.primaryAction.href)?.[1];
      check(t(`C landing primary action '${landing.primaryAction.href}' resolves to an existing app route${tool ? " (toolsData + /tools/[toolId] route map)" : ""}`),
        tool ? toolSlugs.has(tool) && tool in toolContentMap : resolvesToAppRoute(landing.primaryAction.href));
    }
    check(t("C landing has a conversion unit (report card or primary action)"), !!(landing.offer || landing.primaryAction));
    if (landing.inlineTool) {
      const sectionIds = (topic?.sections ?? []).map((s: any) => s.id);
      check(t(`C inline unit '${landing.inlineTool.kind}' is placed after an existing content section ('${landing.inlineTool.afterSectionId}')`), sectionIds.includes(landing.inlineTool.afterSectionId));
      check(t(`C inline unit report '${landing.inlineTool.reportSlug}' is a catalogue report`), reportSlugs.has(landing.inlineTool.reportSlug));
    }
    const ctxTargets = [...landing.contextLinks.topicSlugs, landing.contextLinks.overviewSlug];
    const badCtx = ctxTargets.filter((s: string) => s === slug || !slugs.includes(s));
    check(t(`C landing context links point at other registered topics (bad: ${JSON.stringify(badCtx)})`), badCtx.length === 0);
  }

  // D. Report CTA duplication (landing card + bottom report CTAs)
  const offered = [
    ...(landing?.offer ? [landing.offer.reportSlug] : []),
    ...(landing?.inlineTool?.kind === "contextual-report" ? [landing.inlineTool.reportSlug] : []),
    ...ctas.filter((c) => c.type === "report").map((c) => c.slug),
  ];
  const dupes = [...new Set(offered.filter((s, i) => offered.indexOf(s) !== i))];
  const allowedDupe = DUPLICATE_REPORT_CTA_ALLOWLIST[slug];
  const unexpectedDupes = dupes.filter((s) => s !== allowedDupe);
  check(t(`D no new duplicate paid-report CTA (duplicates: ${JSON.stringify(dupes)}, allowlisted: ${JSON.stringify(allowedDupe ?? null)})`), unexpectedDupes.length === 0);
  if (allowedDupe) {
    check(t(`D allowlisted duplicate '${allowedDupe}' still present -- delete the stale allowlist entry once de-duplicated (MC-08)`), dupes.includes(allowedDupe));
  }

  // E. Hindi meta description (temporary allowlist for known gaps)
  const hasHiMeta = nonEmpty(topic?.metaDescription_hi);
  if (HINDI_META_GAP_ALLOWLIST.includes(slug)) {
    check(t("E Hindi meta description still missing (allowlisted gap) -- delete the stale allowlist entry once added"), !hasHiMeta);
  } else {
    check(t("E Hindi meta description is present"), hasHiMeta);
  }

  // F. Indexability contract (production indexes every registered topic)
  for (const locale of ["en", "hi"] as const) {
    const md: any = seo.generateAuthorityTopicMetadata(domain, topic, locale);
    const canonical = `${SITE_URL}${lp(locale)}${BASE_PATH}/${slug}`;
    check(t(`F [${locale}] generated metadata carries no robots directive (indexable)`), md && !("robots" in md));
    check(t(`F [${locale}] self canonical ${canonical}`), md?.alternates?.canonical === canonical);
    check(t(`F [${locale}] hreflang en / hi / x-default`),
      md?.alternates?.languages?.en === `${SITE_URL}${BASE_PATH}/${slug}` &&
      md?.alternates?.languages?.hi === `${SITE_URL}/hi${BASE_PATH}/${slug}` &&
      md?.alternates?.languages?.["x-default"] === `${SITE_URL}${BASE_PATH}/${slug}`);
  }
  const leakedKeys = ["robots", "isIndexable", "status", "visibility", "publishing"].filter((k) => k in (topic ?? {}));
  check(t(`F adapted engine topic carries no dormant indexability fields (leaked: ${JSON.stringify(leakedKeys)})`), leakedKeys.length === 0);
}

// ---- 3. Allowlist hygiene ------------------------------------------------------------------------
console.log("\n=== 3. Allowlist hygiene ===");
const strayHi = HINDI_META_GAP_ALLOWLIST.filter((s) => !slugs.includes(s));
const strayDup = Object.keys(DUPLICATE_REPORT_CTA_ALLOWLIST).filter((s) => !slugs.includes(s));
const strayFloor = Object.keys(FAQ_COUNT_FLOOR).filter((s) => !slugs.includes(s));
const strayDropped = Object.keys(DROPPED_CTA_ALLOWLIST).filter((s) => !slugs.includes(s));
check(`dropped-CTA allowlist only names registered topics (stray: ${JSON.stringify(strayDropped)})`, strayDropped.length === 0);
check(`Hindi-meta allowlist only names registered topics (stray: ${JSON.stringify(strayHi)})`, strayHi.length === 0);
check(`duplicate-report allowlist only names registered topics (stray: ${JSON.stringify(strayDup)})`, strayDup.length === 0);
check(`FAQ floor only names registered topics (stray: ${JSON.stringify(strayFloor)})`, strayFloor.length === 0);
check(`Hindi-meta allowlist has no duplicates`, new Set(HINDI_META_GAP_ALLOWLIST).size === HINDI_META_GAP_ALLOWLIST.length);
console.log(`  INFO: temporary allowlists -- Hindi meta gaps: ${HINDI_META_GAP_ALLOWLIST.length}, duplicate report CTAs: ${Object.keys(DUPLICATE_REPORT_CTA_ALLOWLIST).length}, dropped CTAs: ${Object.values(DROPPED_CTA_ALLOWLIST).flat().length} (all must reach 0 by MC-18)`);

// ---- 4. Indexability contract: source-level guards (single consolidated guard) ---------------------
console.log("\n=== 4. Indexability contract (source) ===");
const DORMANT = /\.robots\b|\bisIndexable\b|\.publishing\b|\.visibility\b|identity\.status\b/;
const engineFiles = [
  "lib/domains/_shared/domain-topic-adapter.ts",
  "lib/authority-engine/seo.ts",
  "lib/authority-engine/resolver.ts",
  "lib/authority-engine/registry.ts",
  "lib/domains/marriage-astrology/_index.ts",
  "app/[locale]/marriage-astrology/[slug]/page.tsx",
  "app/[locale]/marriage-astrology/page.tsx",
];
for (const file of engineFiles) {
  check(`${file} never reads dormant robots / isIndexable / status / visibility / publishing fields`, !DORMANT.test(src(file)));
}
const route = src("app/[locale]/marriage-astrology/[slug]/page.tsx");
check("topic route metadata is exactly generateAuthorityTopicMetadata(domain, topic, locale) (no robots override)",
  route.includes("return generateAuthorityTopicMetadata(domain, topic, locale)") && !/\brobots\b/.test(route));
check("topic route only 404s unknown slugs (no draft/status gate)", !/status|draft|isIndexable|publishing/.test(route));
const sitemap = src("app/sitemap.ts");
const sitemapMarriage = sitemap.slice(sitemap.indexOf("MARRIAGE ASTROLOGY (authority cluster)"), sitemap.indexOf("MISC TOOL / UTILITY PAGES"));
check("sitemap lists every registered marriage topic (getAllTopicSlugs, unfiltered) in en + hi",
  sitemapMarriage.includes('getAuthorityDomain("marriage-astrology")') && sitemapMarriage.includes("getAllTopicSlugs(marriageDomain)") &&
  sitemapMarriage.includes("${baseUrl}${marriageDomain.basePath}/${slug}") && sitemapMarriage.includes("${baseUrl}/hi${marriageDomain.basePath}/${slug}") &&
  !/\.filter\(|isIndexable|robots|status/.test(sitemapMarriage));

// ---- 5. Single H1 source on topic pages ----------------------------------------------------------
console.log("\n=== 5. Single H1 source ===");
const engineComponents: string[] = [];
(function walk(dir: string) {
  for (const e of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`;
    if (e.isDirectory()) walk(rel); else if (/\.tsx$/.test(e.name)) engineComponents.push(rel);
  }
})("components/authority-engine");
const h1Files = engineComponents.filter((f) => /<h1\b/.test(src(f))).map((f) => path.basename(f)).sort();
check(`only TopicHero (topic pages) and the hub heroes render an <h1> (found: ${JSON.stringify(h1Files)})`,
  JSON.stringify(h1Files) === JSON.stringify(["HubHero.tsx", "IntentHubRenderer.tsx", "TopicHero.tsx"]));
check("TopicHero renders exactly one <h1>, from the topic title", (src("components/authority-engine/TopicHero.tsx").match(/<h1\b/g) || []).length === 1 &&
  /<h1[^>]*>\s*\{loc\(topic, 'title', locale\)\}/.test(src("components/authority-engine/TopicHero.tsx")));
const detail = src("components/authority-engine/AuthorityDetailRenderer.tsx");
check("the topic detail renderer uses TopicHero and never a hub hero", detail.includes("<TopicHero") && !/HubHero|IntentHubRenderer/.test(detail));

// ---- 6. Hub (light guards; rendered H1/heading snapshot belongs to MC-02) ---------------------------
console.log("\n=== 6. Hub /marriage-astrology ===");
for (const locale of ["en", "hi"] as const) {
  const md: any = seo.generateAuthorityHubMetadata(domain, locale);
  check(`hub [${locale}] metadata carries no robots directive and a self canonical`,
    md && !("robots" in md) && md.alternates?.canonical === `${SITE_URL}${lp(locale)}${BASE_PATH}`);
  check(`hub [${locale}] has a non-empty title and meta description`,
    nonEmpty(locale === "hi" ? domain.hubTitle_hi || domain.hubTitle : domain.hubTitle) &&
    nonEmpty(locale === "hi" ? domain.hubMetaDescription_hi || domain.hubMetaDescription : domain.hubMetaDescription));
}
for (const list of ["intents", "topics"] as const) {
  const hubSlugs: string[] = (marriageAstrologyHub[list] ?? []).map((x: any) => x.slug);
  const bad = hubSlugs.filter((s) => !slugs.includes(s));
  check(`hub ${list} link only to registered topics (bad: ${JSON.stringify(bad)})`, hubSlugs.length > 0 && bad.length === 0);
  check(`hub ${list} have no duplicate slugs`, new Set(hubSlugs).size === hubSlugs.length);
}

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) {
  console.log("\nFailed contracts:");
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
