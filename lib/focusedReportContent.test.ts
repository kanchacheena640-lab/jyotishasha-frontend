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
  // F12-P2.5 batch
  "exam_preparation_period", "higher_education_timing", "salary_growth_timing", "income_increase_timing",
  "own_home_timing", "relocation_timing",
  // F12-P2.6 batch
  "career_improvement_timing", "next_strong_career_period", "work_recognition_timing",
  "financial_improvement_timing", "financial_pressure_easing", "business_growth_timing",
  // F12-P2.7 batch
  "best_career_years", "job_search_start_timing", "job_gap_easing",
  "money_growth_periods", "business_expansion_timing", "business_slowdown_easing",
  // F12-P2.8 batch
  "best_business_periods", "new_venture_partnership_timing", "strongest_marriage_periods",
  "marriage_chances_timing", "marriage_delay_easing", "marriage_talks_current_period",
  // F12-P2.9 batch
  "relationship_to_marriage_window", "relationship_lead_to_marriage", "long_term_compatibility",
  "kundali_match_for_marriage", "right_time_to_consider_marriage", "relationship_strengths_risks",
  // F12-P2.12 batch
  "conflict_areas", "emotional_communication_fit", "strengthen_relationship", "relationship_care_periods",
  "foreign_work_timing", "foreign_plans_delay_reason", "study_strong_period", "study_progress_improvement",
  "property_current_period", "property_strongest_period",
  // F12-P2.13 batch (final)
  "best_period_to_switch", "property_delay_reason", "major_turning_points", "next_life_change_period",
  "important_years_ahead", "current_phase_meaning", "areas_needing_attention", "natural_strengths",
  "life_direction", "focus_to_use_strengths",
];
/** How each backend horizon must be stated in the copy. */
const HORIZON_PHRASE: Record<number, string> = { 12: "12 months", 36: "three years", 60: "five years" };
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
check("exactly the 61 approved topics have SEO content, each a real catalog question", () => {
  assert.deepEqual(Object.keys(FOCUSED_REPORT_SEO_CONTENT).sort(), [...PILOT_KEYS].sort());
  for (const key of PILOT_KEYS) assert.ok(intentQuestions.some((q) => q.questionKey === key), key);
});
check("the resolver serves content-tier configs for the 61 topics; bespoke (2) unchanged, none stay generic", () => {
  assert.deepEqual(Object.keys(FOCUSED_REPORTS_CONFIG).sort(), ["major-kundali-obstacles", "major-kundali-strengths"]);
  assert.equal(configs.length, 63);
  assert.deepEqual(configs.filter((c) => c.seo).map((c) => c.questionKey).sort(), [...PILOT_KEYS].sort());
  assert.equal(configs.filter((c) => !c.seo && !FOCUSED_REPORTS_CONFIG[c.humanSlug]).length, 0);
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

check("63/63: every catalog question resolves to a custom page (content tier or bespoke), zero generic fallbacks", () => {
  assert.equal(intentQuestions.length, 63);
  for (const q of intentQuestions) {
    const c = getFocusedReportConfigBySlug(questionKeyToHumanSlug(q.questionKey))!;
    assert.ok(c.seo || FOCUSED_REPORTS_CONFIG[c.humanSlug], `${q.questionKey} is still generic`);
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
      // master_contract.py omits "Current Timing Context" when no dated support exists (horizon null),
      // so such a page must list the other headings and say that one is left out.
      const untimed = c.grounding.archetype === "DIRECTION" && c.grounding.horizonMonths === null;
      for (const [i, heading] of REPORT_SECTIONS[c.grounding.archetype][lang].entries()) {
        if (untimed && i === 3) assert.ok(c.sections.whatYouReceive[lang].includes(heading) && /omitted|नहीं होता/.test(c.sections.whatYouReceive[lang]), `${c.questionKey} ${lang}: must say ${heading} is omitted`);
        else assert.ok(c.sections.whatYouReceive[lang].includes(heading), `${c.questionKey} ${lang}: ${heading}`);
      }
    }
  }
});
check("horizon, houses and transits stated in the copy match the content's grounding", () => {
  for (const c of contents) {
    const en = visibleText(c, "en").join(" ");
    const months = c.grounding.horizonMonths;
    // No timing evidence (dual compatibility overviews): the copy must not claim any horizon.
    if (months === null) for (const phrase of Object.values(HORIZON_PHRASE)) assert.ok(!en.includes(phrase), `${c.questionKey}: no timing, but says "${phrase}"`);
    else assert.ok(HORIZON_PHRASE[months] && en.includes(HORIZON_PHRASE[months]), `${c.questionKey}: horizon ${months}`);
    for (const planet of c.grounding.transits) assert.ok(en.includes(planet), `${c.questionKey}: ${planet}`);
    for (const planet of ["Jupiter", "Saturn", "Rahu", "Ketu", "Mars", "Venus"]) {
      // A planet may be named only if the backend reads it as a transit or as a listed natal placement.
      if (!c.grounding.transits.includes(planet) && !(c.grounding.natalPlanets ?? []).includes(planet) && planet !== "Mars") assert.ok(!en.includes(planet), `${c.questionKey}: unsupported ${planet}`);
    }
    if (c.grounding.houses) assert.ok(en.includes(housePhrase(c.grounding.houses)), `${c.questionKey}: expected "${housePhrase(c.grounding.houses)}"`);
    else assert.doesNotMatch(en, /\b\d+(st|nd|rd|th) house/, `${c.questionKey}: house numbers not defined by the backend`);
  }
});
const BACKEND = path.join(repo, "..", "..", "Python", "Jyotishasha_Backend-main", "modules", "focused_reports");
// Ashtakoot component names as the backend keys them (relationship_keys.py ALL_KOOTAS).
const KOOTA_NAMES: Record<string, string> = { varna: "Varna", vashya: "Vashya", tara: "Tara", yoni: "Yoni", graha_maitri: "Graha Maitri", gana: "Gana", bhakoot: "Bhakoot", nadi: "Nadi" };
check("person mode is stated honestly: single-chart pages never claim a partner reading; two-chart pages say both charts are used and the dual checkout sends the partner", () => {
  assert.ok(read("components/focused-reports/FocusedDualReportCheckout.tsx").includes("partner: {"), "dual checkout sends a partner payload");
  for (const c of contents) {
    const en = visibleText(c, "en").join(" ");
    const q = intentQuestions.find((x) => x.questionKey === c.questionKey)!;
    if (q.personMode === "dual") {
      assert.match(en, /both (of your |people's )?(birth )?charts|both charts|both sets of birth details|both people's birth details/i, `${c.questionKey}: dual page must say both charts are read`);
      // Only the Ashtakoot components the backend selects for this key may be named.
      const selected = (fs.existsSync(BACKEND) ? fs.readFileSync(path.join(BACKEND, "relationship_keys.py"), "utf8") : "").match(new RegExp(`"${c.questionKey}": \\(\\([^)]*\\), (\\([^)]*\\)|ALL_KOOTAS)\\)`));
      if (selected) {
        const keys = selected[1] === "ALL_KOOTAS" ? Object.keys(KOOTA_NAMES) : [...selected[1].matchAll(/"([a-z_]+)"/g)].map((m) => m[1]);
        for (const [key, name] of Object.entries(KOOTA_NAMES)) {
          const named = new RegExp(`\\b${name}\\b`).test(en);
          assert.equal(named, keys.includes(key), `${c.questionKey}: koota ${name} ${keys.includes(key) ? "missing" : "not selected by the backend"}`);
        }
      }
    } else {
      // A single-chart page may point to the two-chart reports, but never describes matching itself.
      assert.doesNotMatch(en, /koota|Ashtakoot/i, `${c.questionKey}: single-chart page describes kundali matching`);
      if (q.lens === "own_relationship") assert.match(en, /partner's chart is not used|does not read your partner/, `${c.questionKey}: must say the partner's chart is not read`);
    }
  }
});
if (fs.existsSync(BACKEND)) {
  const be = (f: string) => fs.readFileSync(path.join(BACKEND, f), "utf8");
  check("backend cross-check: PDF section headings match master_contract.py", () => {
    const contract = be("master_contract.py");
    for (const arch of ["TIMING", "DIAGNOSTIC", "DIRECTION", "COMPATIBILITY"] as const) {
      for (let i = 0; i < REPORT_SECTIONS[arch].en.length; i++) assert.ok(contract.includes(`("${REPORT_SECTIONS[arch].en[i]}", "${REPORT_SECTIONS[arch].hi[i]}")`), `${arch} ${i}`);
    }
  });
  check("backend cross-check: horizons and house sets match the *_keys.py / *_evidence.py definitions for every content topic", () => {
    assert.match(be("marriage_keys.py"), /"marriage_delay_reason": 12,/);
    for (const [key, months] of [["strongest_marriage_periods", 60], ["marriage_chances_timing", 60], ["marriage_delay_easing", 60], ["marriage_talks_current_period", 12]] as const) assert.ok(be("marriage_keys.py").includes(`"${key}": ${months},`), key);
    assert.ok(be("marriage_evidence.py").includes('selected_planets=("Jupiter", "Saturn")'), "marriage transits are Jupiter/Saturn");
    assert.ok(be("marriage_keys.py").includes('"relationship_to_marriage_window": 60,'), "relationship_to_marriage_window is a single-person 60-month marriage key");
    // Dual relationship keys: the exact house set per key, 12 months only for RELATIONSHIP_TIMING_KEYS, Jupiter/Saturn for both people.
    const rel = be("relationship_keys.py");
    const timingKeys = (rel.match(/RELATIONSHIP_TIMING_KEYS = frozenset\(\(([^)]*)\)/) || [])[1] || "";
    for (const c of contents.filter((x) => intentQuestions.find((q) => q.questionKey === x.questionKey)!.personMode === "dual")) {
      assert.ok(c.grounding.houses && rel.includes(`"${c.questionKey}": ((${c.grounding.houses.join(", ")}),`), `${c.questionKey}: houses`);
      assert.equal(c.grounding.horizonMonths, timingKeys.includes(`"${c.questionKey}"`) ? 12 : null, `${c.questionKey}: horizon`);
    }
    assert.ok(be("relationship_evidence.py").includes('selected_planets=("Jupiter", "Saturn")'), "relationship transits are Jupiter/Saturn");
    const foreign = be("foreign_keys.py");
    for (const [key, months, houses] of [["going_abroad_timing", 60, "3, 9, 12"], ["study_abroad", 12, "4, 5, 9, 12"], ["foreign_settlement_timing", 60, "4, 9, 12"], ["relocation_timing", 60, "3, 4, 12"], ["foreign_work_timing", 60, "3, 6, 9, 10, 12"], ["foreign_plans_delay_reason", 12, "3, 4, 9, 12"]] as const) {
      assert.ok(foreign.includes(`"${key}": ${months},`) && foreign.includes(`"${key}": (${houses}),`), key);
    }
    const property = be("property_keys.py");
    for (const [key, months, houses] of [["property_purchase_timing", 60, "2, 4, 11"], ["own_home_timing", 60, "2, 4, 11, 12"], ["property_current_period", 12, "2, 4, 11"], ["property_strongest_period", 60, "2, 4, 11"], ["property_delay_reason", 12, "2, 4, 6, 11"]] as const) {
      assert.ok(property.includes(`"${key}": ${months},`) && property.includes(`"${key}": (${houses}),`), key);
    }
    const education = be("education_keys.py");
    for (const [key, months, houses] of [["exam_preparation_period", 12, "3, 4, 5, 6"], ["higher_education_timing", 36, "4, 5, 9, 11"], ["study_strong_period", 12, "4, 5, 9"], ["study_progress_improvement", 12, "3, 4, 5, 6, 9"]] as const) {
      assert.ok(education.includes(`"${key}": ${months},`) && education.includes(`"${key}": (${houses}),`), key);
    }
    assert.match(be("education_evidence.py"), /TRANSIT_PLANETS = \("Jupiter", "Saturn"\)/);
    // Career keys: 12 months unless the spec needs the multi-year dasha_sequence (only best_career_years does).
    for (const key of ["new_job_timing", "promotion_timing", "career_growth_delay_reason", "job_change_now", "salary_growth_timing", "career_improvement_timing", "next_strong_career_period", "work_recognition_timing", "job_search_start_timing", "job_gap_easing", "best_career_years", "best_period_to_switch"]) assert.ok(be("career_keys.py").includes(`"${key}"`), key);
    // Life keys: horizon (None = natal only), base house set, natal planets and transits exactly as life_keys.py defines them.
    const life = be("life_keys.py");
    const lifeNatal = ((life.match(/LIFE_NATAL_PLANETS = \(([^)]*)\)/) || [])[1] || "").match(/[A-Z][a-z]+/g) || [];
    for (const c of contents.filter((x) => life.includes(`"${x.questionKey}": (`))) {
      assert.ok(life.includes(`"${c.questionKey}": ${c.grounding.horizonMonths ?? "None"},`), `${c.questionKey}: life horizon`);
      assert.ok(c.grounding.houses && life.includes(`"${c.questionKey}": (${c.grounding.houses.join(", ")}),`), `${c.questionKey}: life houses`);
      assert.deepEqual(c.grounding.natalPlanets, lifeNatal, `${c.questionKey}: natal planets`);
      assert.deepEqual(c.grounding.transits, c.grounding.horizonMonths === null ? [] : ["Jupiter", "Saturn"], `${c.questionKey}: life transits`);
    }
    assert.match(life, /LIFE_TRANSIT_PLANETS_DEFAULT = \("Jupiter", "Saturn"\)/);
    assert.ok(be("prompt_specs.py").includes('key == "best_career_years" or key in MULTI_YEAR_KEYS'), "best_career_years uses the multi-year dasha_sequence");
    assert.match(be("career_evidence.py"), /months = 60 if "dasha_sequence" in required else 12/);
    // Money/business keys: 12 months unless listed in MULTI_YEAR_KEYS.
    const money = be("money_business_keys.py");
    const multiYear = (money.match(/MULTI_YEAR_KEYS = \(([^)]*)\)/) || [])[1] || "";
    for (const key of ["debt_pressure_easing", "business_start_timing", "income_increase_timing", "financial_improvement_timing", "financial_pressure_easing", "business_growth_timing", "business_expansion_timing", "business_slowdown_easing", "new_venture_partnership_timing"]) assert.ok(money.includes(`"${key}"`) && !multiYear.includes(key), key);
    for (const key of ["money_growth_periods", "best_business_periods"]) assert.ok(multiYear.includes(`"${key}"`), `${key} is multi-year`);
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
