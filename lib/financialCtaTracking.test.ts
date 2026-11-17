/**
 * lib/financialCtaTracking.test.ts
 *
 * Financial Astrology P1 -- guide CTA click tracking. Checks, for every registered guide x EN/HI:
 *   - every CTA card carries `cta_click` ids following the Marriage guide convention:
 *     screen_name `<topic>_topic`, cta_id `<topic>_<product>_cta` (product = report slug, focused question_key
 *     or tool slug, underscored);
 *   - ids are identical in EN and HI (the event's page_path carries the locale), unique per page and across
 *     the cluster, and never collide with Marriage guide ids;
 *   - the panel tracks through the existing TrackedLink / WebsiteEvents.ctaClick (no new event or schema);
 *   - the Financial hub stays untracked: no TrackedLink, ctaClick or client module.
 *
 * Run (repo convention):
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/financialCtaTracking.test.ts
 *   node .ts-test-out/financialCtaTracking.test.js
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
const load = (rel: string): any => require(path.join(root, rel));

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; } else { failed++; console.log(`  FAIL: ${label}`); }
}

const resolver = load("lib/authority-engine/resolver");
const { resolveFinancialCtas, FINANCIAL_CTA_PLAN } = load("lib/domains/financial-astrology/_ctas");
const domain = resolver.getAuthorityDomain("financial-astrology");
const slugs: string[] = resolver.getAllTopicSlugs(domain);
const u = (s: string) => s.replace(/-/g, "_");

const allIds = new Set<string>();
let cards = 0;
for (const slug of slugs) {
  const topic = domain.topics[slug];
  const en = resolveFinancialCtas(topic, "en");
  const hi = resolveFinancialCtas(topic, "hi");
  check(`${slug}: EN and HI carry the same ids`, JSON.stringify(en.map((c: any) => [c.ctaId, c.screenName])) === JSON.stringify(hi.map((c: any) => [c.ctaId, c.screenName])));
  const ids = en.map((c: any) => c.ctaId);
  check(`${slug}: ids unique on the page`, new Set(ids).size === ids.length);
  en.forEach((card: any, i: number) => {
    cards++;
    const item = FINANCIAL_CTA_PLAN[slug][i];
    const product = item.kind === "focused" ? item.questionKey : item.slug;
    check(`${slug}: screen_name ${card.screenName} = ${u(slug)}_topic`, card.screenName === `${u(slug)}_topic`);
    check(`${slug}: cta_id ${card.ctaId} = <topic>_<product>_cta`, card.ctaId === `${u(slug)}_${u(product)}_cta`);
    check(`${slug}: ${card.ctaId} is a fixed lowercase identifier`, /^[a-z0-9_]+$/.test(card.ctaId) && /^[a-z0-9_]+$/.test(card.screenName));
    check(`${slug}: ${card.ctaId} unique across the Financial cluster`, !allIds.has(card.ctaId));
    allIds.add(card.ctaId);
  });
}

// No collision with Marriage guide tracking ids / screen names.
const marriageLanding = src("lib/domains/marriage-astrology/_landing.ts");
const marriageIds = new Set([...marriageLanding.matchAll(/(?:ctaId|reportCtaId|sampleCtaId|screenName): *'([^']+)'/g)].map((m) => m[1]));
check(`no Financial id collides with a Marriage id (${marriageIds.size} Marriage ids)`, [...allIds].every((id) => !marriageIds.has(id)));
check("no Financial screen_name collides with a Marriage screen_name", slugs.every((s) => !marriageIds.has(`${u(s)}_topic`)));

// Existing mechanism only: TrackedLink -> WebsiteEvents.ctaClick (`cta_click`, {cta_id, screen_name}).
const panel = src("components/authority-engine/financial/FinancialCtaPanel.tsx");
check("panel tracks through the existing TrackedLink", /from '@\/components\/muhurat\/TrackedLink'/.test(panel) && /<TrackedLink[\s\S]*?ctaId=\{card\.ctaId\}[\s\S]*?screenName=\{card\.screenName\}/.test(panel));
check("panel is a server component (TrackedLink is the only client piece)", !/['"]use client['"]/.test(panel) && !/next\/link/.test(panel));
check("TrackedLink fires WebsiteEvents.ctaClick and never blocks navigation",
  /WebsiteEvents\.ctaClick\(ctaId, screenName\)/.test(src("components/muhurat/TrackedLink.tsx")) && !/preventDefault/.test(src("components/muhurat/TrackedLink.tsx")));
check("cta_click schema unchanged ({cta_id, screen_name})", /eventName: "cta_click",\s*properties: withPagePath\(\{ cta_id: ctaId, screen_name: screenName \}\)/.test(src("lib/websiteEvents.ts")));

// The hub stays untracked.
for (const f of ["app/[locale]/financial-astrology/page.tsx", "lib/domains/financial-astrology/_hub.ts", "components/authority-engine/IntentHubRenderer.tsx"]) {
  check(`${f} has no tracking or client code`, !/TrackedLink|ctaClick|WebsiteEvents|['"]use client['"]|onClick/.test(src(f)));
}
// Shared CtaBlock untouched by tracking.
check("shared CtaBlock carries no tracking", !/TrackedLink|ctaClick|WebsiteEvents/.test(src("components/authority-engine/CtaBlock.tsx")));

console.log(`\nchecked ${slugs.length} guides, ${cards} CTA cards, ${allIds.size} unique cta_ids`);
console.log(`RESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
