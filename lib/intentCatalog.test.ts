/**
 * Intent-Based Micro Reports -- bilingual question catalog foundation (data only, nothing routed or wired).
 *
 * Proves the frontend catalog (app/data/intentCatalog.json + intentCatalog.ts) is internally consistent, is
 * SEPARATE from the frozen 25-report catalog, costs Rs 51, keeps the selected question when it is mapped to its core
 * intent, and is not referenced by any route/component yet. (The backend has a drift test that fails if this JSON
 * stops matching its authoritative catalog.)
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule --esModuleInterop \
 *     --outDir .ts-test-out lib/intentCatalog.test.ts
 *   node .ts-test-out/lib/intentCatalog.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */
import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import {
  INTENT_REPORT_CURRENCY,
  INTENT_REPORT_PRICE_RUPEES,
  getIntent,
  getIntentQuestion,
  getQuestionsByCategory,
  getQuestionsByIntent,
  intentCategories,
  intentDefinitions,
  intentQuestions,
  localized,
  normalizeIntentLanguage,
  questionRequiresPartner,
  resolveIntentSelection,
} from "../app/data/intentCatalog";

const repo = process.cwd();
let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}
const read = (file: string) => fs.readFileSync(path.join(repo, file), "utf8");
const normalize = (text: string) =>
  text.normalize("NFC").toLowerCase().replace(/[\p{P}\p{S}]/gu, " ").replace(/\s+/g, " ").trim();
const DEVANAGARI = /[ऀ-ॿ]/;

console.log("\n=== shape and counts ===");
check("14 core intents, 63 customer questions, 8 categories", () => {
  assert.equal(intentDefinitions.length, 14);
  assert.equal(intentQuestions.length, 63);
  assert.equal(intentCategories.length, 8);
});
check("12 SINGLE and 2 DUAL intents; 54 SINGLE and 9 DUAL questions", () => {
  assert.equal(intentDefinitions.filter((i) => i.personMode === "single").length, 12);
  assert.equal(intentDefinitions.filter((i) => i.personMode === "dual").length, 2);
  assert.equal(intentQuestions.filter((q) => q.personMode === "single").length, 54);
  assert.equal(intentQuestions.filter((q) => q.personMode === "dual").length, 9);
});
check("questions per category", () => {
  const expected: Record<string, number> = {
    career: 12, money_business: 11, marriage: 6, relationship: 9, foreign: 6, education: 4, property: 5, life: 10,
  };
  for (const [category, count] of Object.entries(expected)) {
    assert.equal(getQuestionsByCategory(category as never).length, count, category);
  }
  assert.equal(Object.values(expected).reduce((a, b) => a + b, 0), intentQuestions.length);
});

console.log("\n=== uniqueness, references, bilingual content ===");
check("intent slugs and question keys are unique lower_snake_case", () => {
  const slugs = intentDefinitions.map((i) => i.intentSlug);
  const keys = intentQuestions.map((q) => q.questionKey);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.equal(new Set(keys).size, keys.length);
  for (const id of [...slugs, ...keys]) assert.match(id, /^[a-z][a-z0-9_]*$/);
  assert.equal(keys.filter((k) => slugs.includes(k)).length, 0, "a question key never equals an intent slug");
});
check("every question references a valid intent; category and person mode agree with that intent", () => {
  const categoryIds = intentCategories.map((c) => c.categoryId);
  for (const q of intentQuestions) {
    const intent = getIntent(q.intentSlug);
    assert.ok(intent, `${q.questionKey} -> unknown intent ${q.intentSlug}`);
    assert.equal(q.category, intent!.category, q.questionKey);
    assert.equal(q.personMode, intent!.personMode, q.questionKey);
    assert.ok(categoryIds.includes(q.category), q.questionKey);
  }
});
check("no orphan intent and no empty category", () => {
  for (const intent of intentDefinitions) assert.ok(getQuestionsByIntent(intent.intentSlug).length > 0, intent.intentSlug);
  for (const category of intentCategories) assert.ok(getQuestionsByCategory(category.categoryId).length > 0, category.categoryId);
});
check("SINGLE questions never map to DUAL intents; DUAL questions need both people", () => {
  for (const q of intentQuestions) {
    const intent = getIntent(q.intentSlug)!;
    if (q.personMode === "single") assert.equal(intent.personMode, "single", q.questionKey);
    if (q.personMode === "dual") {
      assert.equal(intent.personMode, "dual", q.questionKey);
      assert.equal(questionRequiresPartner(q), true, q.questionKey);
    } else {
      assert.equal(questionRequiresPartner(q), false, q.questionKey);
    }
  }
  assert.ok(intentQuestions.filter((q) => q.personMode === "dual").every((q) => q.category === "relationship"));
});
check("every question, intent and category is bilingual (Hindi in Devanagari, different from English)", () => {
  for (const q of intentQuestions) {
    assert.ok(q.question.en.trim().length > 8 && q.question.hi.trim().length > 8, q.questionKey);
    assert.match(q.question.hi, DEVANAGARI, q.questionKey);
    assert.notEqual(q.question.en, q.question.hi, q.questionKey);
  }
  for (const i of intentDefinitions) {
    assert.ok(i.canonicalQuestion.en.trim() && DEVANAGARI.test(i.canonicalQuestion.hi), i.intentSlug);
  }
  for (const c of intentCategories) assert.ok(c.label.en.trim() && DEVANAGARI.test(c.label.hi), c.categoryId);
});
check("no duplicate normalized English or Hindi question wording", () => {
  const en = intentQuestions.map((q) => normalize(q.question.en));
  const hi = intentQuestions.map((q) => normalize(q.question.hi));
  assert.equal(new Set(en).size, en.length);
  assert.equal(new Set(hi).size, hi.length);
});
check("wording asks for no mind reading, cheating detection, medical, fertility, investment, legal or guaranteed outcome", () => {
  const banned = [
    /cheat|betray|unfaithful|affair|crush|thinks? of me|loves? me|pregnan|fertil|conceive|disease|illness|cancer/i,
    /invest|stock|lottery|profit guarantee|guarantee|surely|definitely|court case|win the case|selected in|pass the exam|exam result/i,
    /धोखा|बेवफ़ा|गर्भ|प्रेग्नेंसी|बीमारी|निवेश|लॉटरी|गारंटी|केस जीत|पास हो/,
  ];
  for (const q of intentQuestions) {
    for (const pattern of banned) {
      assert.ok(!pattern.test(q.question.en), `${q.questionKey} (en) matches ${pattern}`);
      assert.ok(!pattern.test(q.question.hi), `${q.questionKey} (hi) matches ${pattern}`);
    }
  }
});

console.log("\n=== price, readiness, and separation from the 25 frozen reports ===");
check("every focused intent report costs Rs 51 (no other price anywhere in the catalog data)", () => {
  assert.equal(INTENT_REPORT_PRICE_RUPEES, 51);
  assert.equal(INTENT_REPORT_CURRENCY, "INR");
  assert.equal(read("app/data/intentCatalog.json").match(/"price[a-z_]*"/g)?.length, 1, "only the single catalog-level price");
  for (const q of intentQuestions) assert.equal(resolveIntentSelection(q.questionKey)!.priceRupees, 51);
});
check("no intent is active or purchasable yet; no intent or question is held/conditional", () => {
  assert.ok(intentDefinitions.every((i) => i.activation === "inactive"));
  // life_direction_and_strengths was conditional_not_ready/held_conditional before its
  // evidence collector, handler, PromptSpec and dispatcher registration existed; all 63
  // catalog keys are now implemented, so no intent or question is held anymore (backend
  // modules/intents/intent_registry.py + question_catalog.py, exported into this JSON).
  const conditional = intentDefinitions.filter((i) => i.readiness === "conditional_not_ready");
  assert.deepEqual(conditional, []);
  assert.ok(intentDefinitions.every((i) => i.readiness === "contract_draft"));
  const held = intentQuestions.filter((q) => q.status === "held_conditional");
  assert.deepEqual(held, []);
  assert.ok(intentQuestions.every((q) => q.status === "wording_ready"));
});
check("the existing 25-report catalog is unchanged and shares no slug with the intent catalog", () => {
  assert.equal(reportsData.length, 25);
  assert.equal(reportsData.filter((r) => r.price === 51).length, 24);
  assert.equal(reportsData.find((r) => r.slug === "relationship_future_report")!.price, 199);
  const reportSlugs = new Set(reportsData.map((r) => r.slug));
  for (const i of intentDefinitions) assert.ok(!reportSlugs.has(i.intentSlug), i.intentSlug);
  for (const q of intentQuestions) assert.ok(!reportSlugs.has(q.questionKey), q.questionKey);
  for (const i of intentDefinitions) assert.ok(i.upsellSlug === null || reportSlugs.has(i.upsellSlug), `upsell ${i.upsellSlug}`);
});
check("the catalog is wired only through the approved P0.4 focused-reports entry points, nowhere else", () => {
  const importers: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(path.join(repo, dir), { withFileTypes: true })) {
      const rel = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!["node_modules", ".next", ".git", ".ts-test-out", ".claude"].includes(entry.name) && !entry.name.startsWith(".next")) walk(rel);
      } else if (
        /\.(ts|tsx)$/.test(entry.name) &&
        !/intentCatalog/.test(entry.name) &&
        !/\.test\.tsx?$/.test(entry.name) && // test files are expected to exercise the catalog; not production wiring
        /intentCatalog/.test(read(rel))
      ) {
        importers.push(rel.replace(/\\/g, "/"));
      }
    }
  };
  for (const dir of ["app", "components", "hooks", "lib"]) walk(dir);
  // P0.4 wired the catalog through the frontend config layer and the one
  // dynamic product route; P0.7 (all 63 routable + the hub) adds exactly
  // one more approved importer, the hub page itself (it groups all 63 by
  // category, so it needs intentCategories/intentQuestions directly).
  // Everything else -- the old 25-report catalog, every other route/
  // component/hook -- must stay untouched; any other importer showing up
  // here is unapproved wiring, not progress.
  const approved = new Set([
    "app/data/focusedReportsConfig.ts",
    "app/[locale]/reports/focused/[slug]/page.tsx",
    "app/[locale]/reports/focused/page.tsx",
  ]);
  const unexpected = importers.filter((f) => !approved.has(f));
  assert.deepEqual(unexpected, []);
  assert.ok(importers.includes("app/data/focusedReportsConfig.ts"));
  assert.ok(!read("app/data/reportsData.ts").includes("intentCatalog"));
});

console.log("\n=== the selected question survives mapping to its core intent ===");
check("promotion_timing -> career_growth_timing keeps the exact question in both languages", () => {
  const selection = resolveIntentSelection("promotion_timing")!;
  assert.equal(selection.intentSlug, "career_growth_timing");
  assert.equal(selection.questionKey, "promotion_timing");
  assert.equal(selection.displayQuestion.en, "Is this a good time for my promotion?");
  assert.equal(selection.displayQuestion.hi, "क्या यह समय मेरे प्रमोशन के लिए अच्छा है?");
  assert.equal(selection.requiresPartner, false);
  assert.equal(selection.priceRupees, 51);
});
check("every question resolves without losing its key, wording, answer mode or lens", () => {
  for (const q of intentQuestions) {
    const selection = resolveIntentSelection(q.questionKey)!;
    assert.equal(selection.questionKey, q.questionKey);
    assert.equal(selection.intentSlug, q.intentSlug);
    assert.deepEqual(selection.displayQuestion, q.question);
    assert.equal(selection.answerMode, q.answerMode);
    assert.equal(selection.lens, q.lens);
    assert.equal(selection.requiresPartner, q.personMode === "dual");
  }
});
check("several questions share one core intent, and different questions stay distinguishable", () => {
  const career = getQuestionsByIntent("career_growth_timing");
  assert.ok(career.length >= 5);
  assert.equal(new Set(career.map((q) => q.questionKey)).size, career.length);
  assert.ok(intentQuestions.length > intentDefinitions.length * 4);
});
check("dual selections require a partner; an unknown key resolves to nothing", () => {
  assert.equal(resolveIntentSelection("relationship_lead_to_marriage")!.requiresPartner, true);
  assert.equal(resolveIntentSelection("relationship_lead_to_marriage")!.intentSlug, "relationship_marriage_potential");
  assert.equal(resolveIntentSelection("not_a_question"), undefined);
  assert.equal(getIntentQuestion("not_a_question"), undefined);
  assert.equal(getIntent("not_an_intent"), undefined);
});
check("language helper: hi / hi-IN -> Hindi, everything else -> English", () => {
  const q = getIntentQuestion("promotion_timing")!;
  assert.equal(normalizeIntentLanguage("hi"), "hi");
  assert.equal(normalizeIntentLanguage("HI-IN"), "hi");
  assert.equal(normalizeIntentLanguage("en"), "en");
  assert.equal(normalizeIntentLanguage(undefined), "en");
  assert.equal(localized(q.question, "hi-IN"), "क्या यह समय मेरे प्रमोशन के लिए अच्छा है?");
  assert.equal(localized(q.question, "fr"), "Is this a good time for my promotion?");
});

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, 0 failed`);
console.log("==================================================");
