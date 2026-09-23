// app/data/intentCatalog.ts

/**
 * Intent-Based Micro Reports -- bilingual customer-question catalog (foundation phase).
 *
 * The data is `intentCatalog.json`, an exact export of the backend's authoritative catalog
 * (Jyotishasha_Backend/modules/intents/question_catalog.py::export_catalog). The backend has a drift test, so
 * this file is never edited by hand for wording -- change the backend catalog and re-export.
 *
 * Deliberately SEPARATE from `reportsData.ts`: that file is the frozen 25-report catalog (pinned by tests and by
 * the 50 sample PDFs). Nothing here is routed, rendered or wired to checkout yet. The eventual UI is
 * Category -> many customer questions -> the selected intent's form, driven by this data plus ONE shared dynamic
 * route -- never one hand-written page per question.
 *
 * Every focused report costs Rs 51. Many questions map to the same core intent; the selected question is never
 * lost: `resolveIntentSelection()` returns BOTH the core `intentSlug` and the exact `questionKey` /
 * `displayQuestion` the customer picked, so the report can answer that exact framing.
 */
import catalogData from "./intentCatalog.json";

export type IntentLanguage = "en" | "hi";
export type PersonMode = "single" | "dual";
export type IntentCategoryId =
  | "career" | "money_business" | "marriage" | "relationship" | "foreign" | "education" | "property" | "life";

export interface LocalizedText { en: string; hi: string; }

export interface IntentCategory {
  categoryId: IntentCategoryId;
  label: LocalizedText;
}

export interface IntentDefinition {
  intentSlug: string;
  category: IntentCategoryId;
  personMode: PersonMode;
  canonicalQuestion: LocalizedText;
  readiness: string;   // "contract_draft" | "conditional_not_ready"
  activation: string;  // "inactive" for every intent in the foundation phase -- nothing is purchasable yet
  upsellSlug: string | null;
}

export interface IntentQuestion {
  questionKey: string;
  intentSlug: string;
  category: IntentCategoryId;
  personMode: PersonMode;
  question: LocalizedText;
  answerMode: string;
  lens: string;
  status: string;      // "wording_ready" | "held_conditional"
}

/** What a later checkout carries: the core intent AND the exact purchased question. */
export interface IntentSelection {
  intentSlug: string;
  questionKey: string;
  category: IntentCategoryId;
  personMode: PersonMode;
  requiresPartner: boolean;
  displayQuestion: LocalizedText;
  answerMode: string;
  lens: string;
  priceRupees: number;
}

interface RawCatalog {
  price_rupees: number;
  currency: string;
  categories: { category_id: string; label_en: string; label_hi: string }[];
  intents: {
    intent_slug: string; category: string; person_mode: string; canonical_question_en: string;
    canonical_question_hi: string; readiness: string; activation: string; upsell_slug: string | null;
  }[];
  questions: {
    question_key: string; intent_slug: string; category: string; person_mode: string; question_en: string;
    question_hi: string; answer_mode: string; lens: string; status: string;
  }[];
}

const raw = catalogData as unknown as RawCatalog;

/** Every focused intent report costs Rs 51 (the existing reports51 strategy is reused later; no new price/product). */
export const INTENT_REPORT_PRICE_RUPEES: number = raw.price_rupees;
export const INTENT_REPORT_CURRENCY: string = raw.currency;

export const intentCategories: IntentCategory[] = raw.categories.map((c) => ({
  categoryId: c.category_id as IntentCategoryId,
  label: { en: c.label_en, hi: c.label_hi },
}));

export const intentDefinitions: IntentDefinition[] = raw.intents.map((i) => ({
  intentSlug: i.intent_slug,
  category: i.category as IntentCategoryId,
  personMode: i.person_mode as PersonMode,
  canonicalQuestion: { en: i.canonical_question_en, hi: i.canonical_question_hi },
  readiness: i.readiness,
  activation: i.activation,
  upsellSlug: i.upsell_slug,
}));

export const intentQuestions: IntentQuestion[] = raw.questions.map((q) => ({
  questionKey: q.question_key,
  intentSlug: q.intent_slug,
  category: q.category as IntentCategoryId,
  personMode: q.person_mode as PersonMode,
  question: { en: q.question_en, hi: q.question_hi },
  answerMode: q.answer_mode,
  lens: q.lens,
  status: q.status,
}));

/** 'hi' for Hindi (incl. 'hi-IN'), otherwise English -- the same rule as the rest of the site. */
export function normalizeIntentLanguage(language: string | null | undefined): IntentLanguage {
  return String(language ?? "").trim().toLowerCase().startsWith("hi") ? "hi" : "en";
}

export function localized(text: LocalizedText, language: string | null | undefined): string {
  return text[normalizeIntentLanguage(language)];
}

export function getIntent(intentSlug: string): IntentDefinition | undefined {
  return intentDefinitions.find((i) => i.intentSlug === intentSlug);
}

export function getIntentQuestion(questionKey: string): IntentQuestion | undefined {
  return intentQuestions.find((q) => q.questionKey === questionKey);
}

export function getQuestionsByCategory(category: IntentCategoryId): IntentQuestion[] {
  return intentQuestions.filter((q) => q.category === category);
}

export function getQuestionsByIntent(intentSlug: string): IntentQuestion[] {
  return intentQuestions.filter((q) => q.intentSlug === intentSlug);
}

/** Two-person questions need BOTH people's complete birth details (place selected from suggestions for each). */
export function questionRequiresPartner(question: IntentQuestion): boolean {
  return question.personMode === "dual";
}

/** Map a customer question to its core intent WITHOUT losing the question. Undefined for an unknown key. */
export function resolveIntentSelection(questionKey: string): IntentSelection | undefined {
  const question = getIntentQuestion(questionKey);
  const intent = question && getIntent(question.intentSlug);
  if (!question || !intent) return undefined;
  return {
    intentSlug: intent.intentSlug,
    questionKey: question.questionKey,
    category: intent.category,
    personMode: intent.personMode,
    requiresPartner: intent.personMode === "dual",
    displayQuestion: question.question,
    answerMode: question.answerMode,
    lens: question.lens,
    priceRupees: INTENT_REPORT_PRICE_RUPEES,
  };
}
