/**
 * Child Birth Muhurat SEO P1:
 *   FIX 1 -- the evergreen page's Title/H1 are distinct from the current month's page (Child Birth only);
 *   FIX 2 -- Article + BreadcrumbList JSON-LD are plain <script type="application/ld+json"> in server HTML
 *            for Child Birth; every other topic keeps next/script.
 * Monthly Titles/H1s, month rollover and other topics are asserted unchanged.
 * Run: node_modules/.bin/tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule \
 *        --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/childBirthMuhuratSeo.test.ts && node <compiled test>
 */
import * as fs from "fs";
import * as path from "path";
import { evergreenHeadings, localizedMonthName, SSR_JSONLD_MUHURAT_SLUGS } from "./muhuratSeo";
import { muhurthTopics } from "../app/[locale]/panchang/muhurat/muhurth_topics";
import { getTargetYear } from "./months";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8").replace(/\r\n/g, "\n");

const CB = "child-birth-muhurat";
const topics = Object.keys(muhurthTopics);

console.log("=== FIX 1: evergreen Title/H1 ===");
for (const isHi of [false, true]) {
  const l = isHi ? "hi" : "en";
  const e = evergreenHeadings(CB, isHi);
  check(`[${l}] Child Birth has evergreen headings`, e !== null);
  if (!e) continue;
  const months = Array.from({ length: 12 }, (_, i) => localizedMonthName(i + 1, isHi));
  check(`[${l}] Title <= 60 chars (${e.title.length})`, e.title.length <= 60);
  check(`[${l}] Title/H1 name no month`, months.every((m) => !e.title.includes(m) && !e.h1.includes(m)));
  check(`[${l}] Title/H1 name no year`, !/\b20\d\d\b/.test(e.title) && !/\b20\d\d\b/.test(e.h1));
  const t = muhurthTopics[CB] as { title: string; title_hi?: string };
  const base = isHi ? (t.title_hi || t.title) : t.title;
  const clean = base.split(" – ")[0];
  for (let m = 1; m <= 12; m++) {
    const month = localizedMonthName(m, isHi);
    const year = 2026;
    const monthlyTitle = `${base} – ${month} ${year}`;
    const monthlyH1 = isHi ? `${clean} – ${month} ${year}` : `${clean} Dates: ${month} ${year}`;
    if (e.title === monthlyTitle || e.h1 === monthlyH1) check(`[${l}] distinct from ${month} page`, false);
  }
  check(`[${l}] evergreen Title and H1 differ from every monthly Title/H1 format`, true);
}
check("only Child Birth has evergreen headings (every other topic -> null)",
  topics.filter((s) => s !== CB).every((s) => evergreenHeadings(s, false) === null && evergreenHeadings(s, true) === null));

const evergreenRoute = src("app/[locale]/panchang/muhurat/[slug]/page.tsx");
const monthlyRoute = src("app/[locale]/panchang/muhurat/[slug]/[period]/page.tsx");
const hero = src("components/muhurat/DynamicHero.tsx");
check("evergreen route: Title from evergreenHeadings, existing '<topic> – <Month> <Year>' kept as fallback",
  evergreenRoute.includes("const evergreen = evergreenHeadings(params.slug, isHi);") &&
  evergreenRoute.includes("? `${topic.title_hi} – ${month} ${year}`") && evergreenRoute.includes(": `${topic.title} – ${month} ${year}`;"));
check("evergreen route: H1 override passed only via evergreenHeadings", evergreenRoute.includes("heading={evergreenHeadings(slug, isHi)?.h1}"));
check("monthly route Title/H1 untouched (no evergreen override)", !/evergreenHeadings|heading=/.test(monthlyRoute) &&
  monthlyRoute.includes("? `${topic.title_hi || topic.title} – ${month} ${year}`") && monthlyRoute.includes(": `${topic.title} – ${month} ${year}`;"));
check("DynamicHero default H1 unchanged when no heading is given",
  hero.includes("{heading ?? (isHi ? `${cleanTitle} – ${month} ${year}` : `${cleanTitle} Dates: ${month} ${year}`)}"));

console.log("\n=== FIX 2: server-rendered JSON-LD ===");
check("plain-<script> JSON-LD enabled for Child Birth only", JSON.stringify([...SSR_JSONLD_MUHURAT_SLUGS]) === JSON.stringify([CB]));
for (const [name, route] of [["evergreen", evergreenRoute], ["monthly", monthlyRoute]] as const) {
  check(`${name}: plain <script> article + breadcrumb under SSR_JSONLD_MUHURAT_SLUGS`,
    route.includes("{SSR_JSONLD_MUHURAT_SLUGS.has(slug) ? (") &&
    /<script\s+id="muhurat-article-schema"\s+type="application\/ld\+json"/.test(route) &&
    /<script\s+id="muhurat-breadcrumb-schema"\s+type="application\/ld\+json"/.test(route));
  check(`${name}: next/script kept for every other topic`,
    /<Script\s+id="muhurat-article-schema"/.test(route) && /<Script\s+id="muhurat-breadcrumb-schema"/.test(route));
  check(`${name}: both variants serialize the same objects`,
    (route.match(/__html: JSON\.stringify\(jsonLd\)/g) || []).length === 2 &&
    (route.match(/__html: JSON\.stringify\(breadcrumbLd\)/g) || []).length === 2);
}

console.log("\n=== Month rollover unchanged ===");
const nov16 = new Date("2026-11-16T06:00:00Z");
check("Nov 16 2026: October -> 2027, November -> 2026, December -> 2026",
  getTargetYear(10, nov16) === 2027 && getTargetYear(11, nov16) === 2026 && getTargetYear(12, nov16) === 2026);

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
