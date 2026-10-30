/** F12-P2.1 -- topic-specific SEO content for Focused Reports.
 * Guards the content tier (app/data/focused-report-content): completeness and
 * Hindi localisation, SEO metadata, grounding in the backend's own report
 * definitions, truthful claims and AI disclosure, real internal links,
 * distinctness from the generic template, and that indexing is unchanged
 * (every focused page stays noindex and out of the sitemap).
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/focusedReportContent.test.ts
 *   node .ts-test-out/lib/focusedReportContent.test.js
 * (then remove .ts-test-out/ -- build output, never committed.)
 * When the backend checkout sits next to this repo, the grounding facts are
 * cross-checked against it; otherwise those checks are reported as skipped.
 */
import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import { intentQuestions } from "../app/data/intentCatalog";
import {
  FOCUSED_REPORTS_CONFIG,
  getFocusedReportConfigBySlug,
  listFocusedReportHumanSlugs,
  questionKeyToHumanSlug,
  type FocusedReportConfig,
} from "../app/data/focusedReportsConfig";
import { FOCUSED_REPORT_SEO_CONTENT, REPORT_SECTIONS, AI_DISCLOSURE, type FocusedReportSeoContent } from "../app/data/focused-report-content";

const repo = process.cwd();
let passed = 0;
let skipped = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}
const read = (file: string) => fs.readFileSync(path.join(repo, file), "utf8");
const DEVANAGARI = /[ऀ-ॿ]/;
// F12-P2.1 pilots + the F12-P2.2 batch (exactly these; anything else stays on the generic template).
const PILOT_KEYS = [
  "new_job_timing", "marriage_delay_reason", "going_abroad_timing",
  "promotion_timing", "career_growth_delay_reason", "job_change_now", "debt_pressure_easing",
  "business_start_timing", "study_abroad", "foreign_settlement_timing", "property_purchase_timing",
];
const ordinal = (n: number) => `${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"}`;
const housePhrase = (houses: number[]) => `${houses.slice(0, -1).map(ordinal).join(", ")} and ${ordinal(houses[houses.length - 1])} houses`;
const contents = Object.values(FOCUSED_REPORT_SEO_CONTENT);
const configs = listFocusedReportHumanSlugs().map((slug) => getFocusedReportConfigBySlug(slug)!);

/** Every visible string of a content entry, per language. */
function visibleText(c: FocusedReportSeoContent, lang: "en" | "hi"): string[] {
  return [
    c.seoTitle[lang], c.metaDescription[lang], c.h1[lang], ...c.intro[lang], ...c.analyzes[lang],
    c.readingGuide.heading[lang], ...c.readingGuide.points[lang], c.differentiation[lang],
    ...c.internalLinks.map((l) => l.label[lang]), ...c.benefits[lang],
    ...Object.values(c.sections).map((s) => s[lang]),
    ...c.faqs.flatMap((f) => [f.question[lang], f.answer[lang]]),
  ];
}
function configText(c: FocusedReportConfig, lang: "en" | "hi"): string {
  const parts = [c.metaDescription[lang], ...c.benefits[lang], ...Object.values(c.sections).map((s) => s[lang]), ...c.faqs.flatMap((f) => [f.question[lang], f.answer[lang]])];
  if (c.seo) parts.push(...visibleText(c.seo, lang));
  return parts.join(" ");
}
const shingles = (text: string, n = 5) => {
  const w = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean);
  const s = new Set<string>();
  for (let i = 0; i + n <= w.length; i++) s.add(w.slice(i, i + n).join(" "));
  return s;
};
const jaccard = (a: Set<string>, b: Set<string>) => { let i = 0; for (const x of a) if (b.has(x)) i++; return i / (a.size + b.size - i || 1); };

console.log("\n=== tiers ===");
check("exactly the 11 approved topics have SEO content, each a real catalog question", () => {
  assert.deepEqual(Object.keys(FOCUSED_REPORT_SEO_CONTENT).sort(), [...PILOT_KEYS].sort());
  for (const key of PILOT_KEYS) assert.ok(intentQuestions.some((q) => q.questionKey === key), key);
});
check("the resolver serves content-tier configs for the 11 topics; bespoke (2) unchanged, the other 50 stay generic", () => {
  assert.deepEqual(Object.keys(FOCUSED_REPORTS_CONFIG).sort(), ["major-kundali-obstacles", "major-kundali-strengths"]);
  assert.equal(configs.length, 63);
  assert.deepEqual(configs.filter((c) => c.seo).map((c) => c.questionKey).sort(), [...PILOT_KEYS].sort());
  assert.equal(configs.filter((c) => !c.seo && !FOCUSED_REPORTS_CONFIG[c.humanSlug]).length, 50);
  for (const c of configs.filter((x) => x.seo)) assert.equal(c.seo!.questionKey, c.questionKey);
});
check("content-tier configs keep the authoritative product title, category and ₹51 price", () => {
  const titles = JSON.parse(read("app/data/focusedReportTitles.json"));
  for (const c of configs.filter((x) => x.seo)) {
    const q = intentQuestions.find((x) => x.questionKey === c.questionKey)!;
    assert.deepEqual(c.title, titles[c.questionKey]);
    assert.equal(c.category, q.category);
    assert.equal(c.priceRupees, 51);
  }
});

console.log("\n=== completeness and Hindi localisation ===");
check("every field is filled in both languages, with >=2 intro paragraphs, >=3 factors, >=3 guide points, >=3 FAQs, >=2 links", () => {
  for (const c of contents) {
    for (const lang of ["en", "hi"] as const) {
      for (const text of visibleText(c, lang)) assert.ok(text.trim().length > 0, `${c.questionKey} empty ${lang} string`);
      assert.ok(c.intro[lang].length >= 2 && c.analyzes[lang].length >= 3 && c.readingGuide.points[lang].length >= 3, c.questionKey);
      assert.ok(c.benefits[lang].length >= 3, c.questionKey);
      assert.equal(c.intro.en.length, c.intro.hi.length);
      assert.equal(c.analyzes.en.length, c.analyzes.hi.length);
      assert.equal(c.readingGuide.points.en.length, c.readingGuide.points.hi.length);
    }
    assert.ok(c.faqs.length >= 3, `${c.questionKey} faqs`);
    assert.ok(c.internalLinks.length >= 2, `${c.questionKey} links`);
  }
});
check("Hindi copy is Devanagari throughout, and English copy contains no Devanagari", () => {
  for (const c of contents) {
    for (const text of visibleText(c, "hi")) assert.match(text, DEVANAGARI, `${c.questionKey}: ${text.slice(0, 40)}`);
    for (const text of visibleText(c, "en")) assert.doesNotMatch(text, DEVANAGARI, `${c.questionKey}: ${text.slice(0, 40)}`);
  }
});
check("'what it tells you' quotes the catalog's own question verbatim in both languages", () => {
  for (const c of contents) {
    const q = intentQuestions.find((x) => x.questionKey === c.questionKey)!;
    assert.ok(c.sections.whatItTellsYou.en.includes(q.question.en), c.questionKey);
    assert.ok(c.sections.whatItTellsYou.hi.includes(q.question.hi), c.questionKey);
  }
});

console.log("\n=== SEO metadata ===");
check("SEO titles: <= 60 characters (EN), branded, distinct from the H1 and from every other focused title", () => {
  for (const c of contents) {
    assert.ok(c.seoTitle.en.length <= 60, `${c.questionKey}: ${c.seoTitle.en.length}`);
    assert.ok(c.seoTitle.en.endsWith("| Jyotishasha") && c.seoTitle.hi.endsWith("| ज्योतिष आशा"), c.questionKey);
    assert.notEqual(c.seoTitle.en, c.h1.en);
  }
  const all = configs.map((c) => (c.seo ? c.seo.seoTitle.en : c.title.en));
  assert.equal(new Set(all).size, all.length, "duplicate focused page title");
});
check("meta descriptions: 120-160 characters (EN), mention ₹51, unique across all 63 focused pages", () => {
  for (const c of contents) {
    assert.ok(c.metaDescription.en.length >= 120 && c.metaDescription.en.length <= 160, `${c.questionKey}: ${c.metaDescription.en.length}`);
    assert.ok(c.metaDescription.en.includes("₹51") && c.metaDescription.hi.includes("₹51"), c.questionKey);
  }
  for (const lang of ["en", "hi"] as const) {
    const all = configs.map((c) => c.metaDescription[lang]);
    assert.equal(new Set(all).size, all.length, `duplicate ${lang} meta description`);
  }
});
check("the route uses the SEO title for <title>, the topic H1 for the H1/Product name, and the short product title in the breadcrumb", () => {
  const page = read("app/[locale]/reports/focused/[slug]/page.tsx");
  assert.ok(page.includes("const title = config.seo?.seoTitle[locale] ?? config.title[locale];"));
  assert.ok(page.includes("const title = config.seo?.h1[locale] ?? config.title[locale];"));
  assert.ok(page.includes("{ name: config.title[locale], path:"));
  assert.ok(page.includes("<FocusedReportGuide config={config} locale={locale} />"));
});
check("FAQ structured data and the visible FAQ come from the same config.faqs (no markup-only questions)", () => {
  assert.ok(read("components/focused-reports/FocusedReportSeoSchema.tsx").includes("mainEntity: config.faqs.map("));
  assert.ok(read("components/focused-reports/FocusedReportDetails.tsx").includes("const faqs = config.faqs;"));
});

console.log("\n=== truthful claims and AI disclosure ===");
check("no guarantees, accuracy claims, credentials or human-authorship claims", () => {
  for (const c of contents) {
    for (const lang of ["en", "hi"] as const) {
      const text = visibleText(c, lang).join(" \n ");
      for (const banned of [/100\s?%/, /accurate prediction/i, /\bexpert\b/i, /certified/i, /hand-?written/i, /our astrologers?/i, /सटीक भविष्यवाणी/]) {
        assert.doesNotMatch(text, banned, `${c.questionKey} ${lang}: ${banned}`);
      }
    }
    for (const sentence of visibleText(c, "en").join(" ").split(/(?<=[.?!])\s+/)) {
      if (/guarantee/i.test(sentence)) assert.match(sentence, /\bnot\b|\bno\b|never/i, `${c.questionKey}: unnegated guarantee: ${sentence}`);
    }
  }
});
check("remedies=False topics never offer remedies themselves (they may only point to the separate report that has them)", () => {
  for (const c of contents) {
    assert.equal(c.grounding.remedies, false);
    for (const sentence of visibleText(c, "en").join(" ").split(/(?<=[.?!])\s+/)) {
      // A question ("Does this report suggest remedies?") is answered by the following sentence.
      if (/remed/i.test(sentence) && !sentence.endsWith("?")) assert.match(sentence, /does not|\bNo\b|rather than|Delay in Marriage/, `${c.questionKey}: ${sentence}`);
    }
  }
});
check("AI-assisted writing is disclosed truthfully on every content-tier page, in both languages", () => {
  assert.match(AI_DISCLOSURE.body.en, /AI language model/);
  assert.match(AI_DISCLOSURE.body.en, /not written or reviewed by an astrologer/);
  assert.match(AI_DISCLOSURE.body.hi, /AI/);
  const guide = read("components/focused-reports/FocusedReportGuide.tsx");
  assert.ok(guide.includes("AI_DISCLOSURE.heading[locale]") && guide.includes("AI_DISCLOSURE.body[locale]"));
});

console.log("\n=== grounding in the backend's own report definitions ===");
check("'what you receive' lists exactly the PDF sections of the report's archetype", () => {
  for (const c of contents) {
    for (const lang of ["en", "hi"] as const) {
      for (const heading of REPORT_SECTIONS[c.grounding.archetype][lang]) {
        assert.ok(c.sections.whatYouReceive[lang].includes(heading), `${c.questionKey} ${lang}: ${heading}`);
      }
    }
  }
});
check("horizon, houses and transits stated in the copy match the content's grounding", () => {
  for (const c of contents) {
    const en = visibleText(c, "en").join(" ");
    assert.ok(en.includes(c.grounding.horizonMonths === 60 ? "five years" : "12 months"), c.questionKey);
    for (const planet of c.grounding.transits) assert.ok(en.includes(planet), `${c.questionKey}: ${planet}`);
    for (const planet of ["Jupiter", "Saturn", "Rahu", "Ketu", "Mars", "Venus"]) {
      if (!c.grounding.transits.includes(planet) && planet !== "Mars") assert.ok(!en.includes(planet), `${c.questionKey}: unsupported ${planet}`);
    }
    if (c.grounding.houses) assert.ok(en.includes(housePhrase(c.grounding.houses)), `${c.questionKey}: expected "${housePhrase(c.grounding.houses)}"`);
    else assert.doesNotMatch(en, /\b\d+(st|nd|rd|th) house/, `${c.questionKey}: house numbers not defined by the backend`);
  }
});
const BACKEND = path.join(repo, "..", "..", "Python", "Jyotishasha_Backend-main", "modules", "focused_reports");
if (fs.existsSync(BACKEND)) {
  const be = (f: string) => fs.readFileSync(path.join(BACKEND, f), "utf8");
  check("backend cross-check: PDF section headings match master_contract.py", () => {
    const contract = be("master_contract.py");
    for (const arch of ["TIMING", "DIAGNOSTIC", "DIRECTION"] as const) {
      for (let i = 0; i < 6; i++) assert.ok(contract.includes(`("${REPORT_SECTIONS[arch].en[i]}", "${REPORT_SECTIONS[arch].hi[i]}")`), `${arch} ${i}`);
    }
  });
  check("backend cross-check: horizons and house sets match the *_keys.py / *_evidence.py definitions for every content topic", () => {
    assert.match(be("marriage_keys.py"), /"marriage_delay_reason": 12,/);
    const foreign = be("foreign_keys.py");
    for (const [key, months, houses] of [["going_abroad_timing", 60, "3, 9, 12"], ["study_abroad", 12, "4, 5, 9, 12"], ["foreign_settlement_timing", 60, "4, 9, 12"]] as const) {
      assert.ok(foreign.includes(`"${key}": ${months},`) && foreign.includes(`"${key}": (${houses}),`), key);
    }
    const property = be("property_keys.py");
    assert.ok(property.includes('"property_purchase_timing": 60,') && property.includes('"property_purchase_timing": (2, 4, 11),'));
    // Career keys: 12 months unless the spec needs the multi-year dasha_sequence (none of these four do).
    for (const key of ["new_job_timing", "promotion_timing", "career_growth_delay_reason", "job_change_now"]) assert.ok(be("career_keys.py").includes(`"${key}"`), key);
    assert.match(be("career_evidence.py"), /months = 60 if "dasha_sequence" in required else 12/);
    // Money/business keys: 12 months unless listed in MULTI_YEAR_KEYS.
    const money = be("money_business_keys.py");
    const multiYear = (money.match(/MULTI_YEAR_KEYS = \(([^)]*)\)/) || [])[1] || "";
    for (const key of ["debt_pressure_easing", "business_start_timing"]) assert.ok(money.includes(`"${key}"`) && !multiYear.includes(key), key);
    assert.match(be("money_business_evidence.py"), /months = 60 if question_key in MULTI_YEAR_KEYS else 12/);
    // Promotion houses are named in its own prompt spec; transit planets per evidence module.
    assert.ok(be("prompt_specs.py").includes("2nd/6th/10th/11th houses and their lords"));
    assert.match(be("property_evidence.py"), /TRANSIT_PLANETS = \("Jupiter", "Saturn"\)/);
    assert.match(be("foreign_evidence.py"), /TRANSIT_PLANETS = \("Jupiter", "Saturn", "Rahu"\)/);
  });
} else {
  skipped += 2;
  console.log("SKIP: backend checkout not found beside this repo -- grounding cross-checks skipped");
}

console.log("\n=== internal links ===");
check("every internal link points to a real page (and its /hi version exists when used)", () => {
  const reportSlugs = new Set([...read("app/data/reportsData.ts").matchAll(/slug:\s*"([a-z_]+)"/g)].map((m) => m[1]));
  const toolSlugs = new Set([...read("app/data/toolsData.ts").matchAll(/slug:\s*"([a-z-]+)"/g)].map((m) => m[1]));
  for (const c of contents) {
    for (const link of c.internalLinks) {
      const [, section, slug] = link.path.split("/").filter(Boolean).length === 3
        ? ["", "focused", link.path.split("/")[3]]
        : ["", link.path.split("/")[1], link.path.split("/")[2]];
      if (link.path.startsWith("/reports/focused/")) assert.ok(getFocusedReportConfigBySlug(slug), link.path);
      else if (section === "reports") { assert.ok(reportSlugs.has(slug), link.path); assert.equal(link.localized, false, `${link.path} has no /hi page`); }
      else if (section === "tools") assert.ok(toolSlugs.has(slug), link.path);
      else if (section === "marriage-astrology" || section === "financial-astrology") assert.ok(fs.existsSync(path.join(repo, "lib", "domains", section, "topics", `${slug}.ts`)), link.path);
      else assert.fail(`unrecognised link target ${link.path}`);
      assert.notEqual(slug, questionKeyToHumanSlug(c.questionKey), `${c.questionKey} links to itself`);
    }
  }
});

console.log("\n=== distinct from the generic template ===");
check("each pilot's copy shares < 15% of 5-word phrases with any other focused page (EN and HI)", () => {
  for (const lang of ["en", "hi"] as const) {
    const sets = configs.map((c) => ({ key: c.questionKey, s: shingles(configText(c, lang)) }));
    for (const pilot of sets.filter((x) => PILOT_KEYS.includes(x.key))) {
      for (const other of sets) {
        if (other.key === pilot.key) continue;
        const j = jaccard(pilot.s, other.s);
        assert.ok(j < 0.15, `${lang} ${pilot.key} vs ${other.key}: ${j.toFixed(3)}`);
      }
    }
  }
});

console.log("\n=== indexing unchanged ===");
check("every focused page and the hub stay noindex, follow; no focused URL is in the sitemap", () => {
  assert.ok(read("app/[locale]/reports/focused/[slug]/page.tsx").includes("robots: { index: false, follow: true },"));
  assert.ok(read("app/[locale]/reports/focused/page.tsx").includes("robots: { index: false, follow: true },"));
  assert.ok(read("app/[locale]/reports/focused/example-preview/page.tsx").includes("robots: { index: false, follow: true },"));
  assert.doesNotMatch(read("app/sitemap.ts"), /reports\/focused/);
  for (const dir of ["app/data/focused-report-content", "components/focused-reports"]) {
    for (const f of fs.readdirSync(path.join(repo, dir))) assert.doesNotMatch(read(`${dir}/${f}`), /robots\s*:|index:\s*true/, `${dir}/${f}`);
  }
});

console.log(`TOTAL: ${passed} passed, 0 failed${skipped ? `, ${skipped} skipped` : ""}`);
