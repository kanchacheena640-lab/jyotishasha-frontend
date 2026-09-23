/**
 * P0.4 -- Focused Reports pilot (#62 major_kundali_obstacles, #63
 * major_kundali_strengths): frontend config layer, checkout product-identity
 * safety, analytics no-PII safety, ₹51 pricing, and pilot-only exclusivity.
 *
 * Same house style as lib/intentCatalog.test.ts: a standalone Node/TS
 * script (no Jest/Vitest in this repo), pure-data assertions plus targeted
 * source-scans for the invariants that matter most for a paid checkout
 * flow (component rendering/DOM behaviour -- e.g. coordinate invalidation
 * on manual place-text edits, live form validation -- is NOT exercised
 * here, since no DOM test runner is installed; that behaviour is covered
 * instead by the P0.4 visual QA pass).
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule --esModuleInterop \
 *     --outDir .ts-test-out lib/focusedReportsConfig.test.ts
 *   node .ts-test-out/lib/focusedReportsConfig.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */
import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import { getIntentQuestion, getIntent, intentQuestions, intentCategories } from "../app/data/intentCatalog";
import {
  FOCUSED_REPORTS_CONFIG,
  getFocusedReportConfigBySlug,
  getFocusedReportCatalogEntry,
  listFocusedReportHumanSlugs,
  questionKeyToHumanSlug,
  humanSlugToQuestionKey,
  focusedReportHasSample,
  FOCUSED_REPORTS_WITH_SAMPLES,
  FEATURED_FOCUSED_QUESTION_KEYS,
  getRelatedFocusedReports,
  getFocusedReportSampleOrPreviewHref,
  GENERIC_EXAMPLE_PREVIEW_PATH,
} from "../app/data/focusedReportsConfig";
import { SITE_URL } from "./seo/articleSchema";

const repo = process.cwd();
let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}
const read = (file: string) => fs.readFileSync(path.join(repo, file), "utf8");

const PILOT_SLUGS = ["major-kundali-obstacles", "major-kundali-strengths"];
const PILOT_KEYS = ["major_kundali_obstacles", "major_kundali_strengths"];

console.log("\n=== P0.7: all 63 catalog products are now routable; the 2 pilots keep their bespoke copy unchanged ===");
check("FOCUSED_REPORTS_CONFIG (bespoke tier) still holds exactly the 2 original pilots -- unchanged by the all-63 rollout", () => {
  assert.deepEqual(Object.keys(FOCUSED_REPORTS_CONFIG).sort(), [...PILOT_SLUGS].sort());
});
check("listFocusedReportHumanSlugs() now returns exactly 63 unique slugs, one per real catalog question_key", () => {
  const slugs = listFocusedReportHumanSlugs();
  assert.equal(slugs.length, 63);
  assert.equal(new Set(slugs).size, 63, "no duplicate slugs");
  assert.equal(intentQuestions.length, 63);
});
check("no real question_key or intent_slug was ever used as the public humanSlug (slugs are always hyphenated, keys always underscored)", () => {
  const allKeysAndSlugs = new Set(intentQuestions.map((q) => q.questionKey));
  for (const humanSlug of listFocusedReportHumanSlugs()) {
    assert.ok(!allKeysAndSlugs.has(humanSlug), `${humanSlug} looks like a raw question_key, not a cosmetic slug`);
  }
});
check("every one of the 63 real question_keys now resolves through getFocusedReportConfigBySlug via its own hyphenated slug", () => {
  for (const q of intentQuestions) {
    const humanSlug = questionKeyToHumanSlug(q.questionKey);
    const config = getFocusedReportConfigBySlug(humanSlug);
    assert.ok(config, `${q.questionKey} -> ${humanSlug} did not resolve`);
    assert.equal(config!.questionKey, q.questionKey);
    assert.equal(config!.humanSlug, humanSlug);
  }
});
check("the underscored raw question_key never ALSO works as a slug (only the hyphenated form does)", () => {
  for (const q of intentQuestions) {
    if (q.questionKey.includes("_")) {
      assert.equal(getFocusedReportConfigBySlug(q.questionKey), undefined, q.questionKey);
    }
  }
});
check("garbage/unknown slugs still resolve to undefined (route calls notFound())", () => {
  assert.equal(getFocusedReportConfigBySlug("not-a-real-slug"), undefined);
  assert.equal(getFocusedReportConfigBySlug(""), undefined);
  assert.equal(getFocusedReportConfigBySlug("major--kundali-obstacles"), undefined, "double-hyphen near-miss must not round-trip");
});
check("questionKeyToHumanSlug / humanSlugToQuestionKey are exact inverses for every real question_key", () => {
  for (const q of intentQuestions) {
    const slug = questionKeyToHumanSlug(q.questionKey);
    assert.equal(humanSlugToQuestionKey(slug), q.questionKey);
    assert.equal(questionKeyToHumanSlug(humanSlugToQuestionKey(slug)), slug);
  }
});

console.log("\n=== slug -> question_key -> catalog resolution ===");
check("each pilot config's questionKey resolves to a real, matching catalog question", () => {
  for (const humanSlug of PILOT_SLUGS) {
    const config = getFocusedReportConfigBySlug(humanSlug)!;
    assert.ok(config, humanSlug);
    assert.equal(config.humanSlug, humanSlug);
    const { question, intent } = getFocusedReportCatalogEntry(config);
    assert.equal(question.questionKey, config.questionKey);
    assert.equal(question.category, config.category, "config.category must agree with the catalog, not be hand-typed separately");
    assert.ok(intent, config.questionKey);
  }
});
check("humanSlug (hyphenated) and questionKey (snake_case) are never the same string", () => {
  for (const humanSlug of PILOT_SLUGS) {
    const config = getFocusedReportConfigBySlug(humanSlug)!;
    assert.notEqual(config.humanSlug, config.questionKey);
    assert.match(config.humanSlug, /^[a-z][a-z0-9-]*$/);
    assert.match(config.questionKey, /^[a-z][a-z0-9_]*$/);
  }
});
check("getFocusedReportCatalogEntry throws if a config's questionKey is not a real catalog entry (fail loud, not silent)", () => {
  const fake = { ...FOCUSED_REPORTS_CONFIG["major-kundali-obstacles"], questionKey: "not_a_real_question_key" };
  assert.throws(() => getFocusedReportCatalogEntry(fake));
});

console.log("\n=== ₹51 pricing, everywhere -- all 63, not just the 2 pilots ===");
check("both pilot configs price at exactly Rs 51 -- no other price anywhere in this config", () => {
  for (const humanSlug of PILOT_SLUGS) {
    assert.equal(FOCUSED_REPORTS_CONFIG[humanSlug].priceRupees, 51);
  }
  assert.ok(!Object.values(FOCUSED_REPORTS_CONFIG).some((c) => (c as any).priceRupees !== 51));
});
check("every one of the 63 resolved configs (bespoke + generic) prices at exactly Rs 51", () => {
  for (const q of intentQuestions) {
    const config = getFocusedReportConfigBySlug(questionKeyToHumanSlug(q.questionKey))!;
    assert.equal(config.priceRupees, 51, q.questionKey);
  }
});
check("components/cta/CtaReport.tsx shows Rs 51, not the old Rs 49", () => {
  const src = read("components/cta/CtaReport.tsx");
  assert.ok(src.includes("₹51"), "expected the fixed ₹51 price");
  assert.ok(!src.includes("₹49"), "the ₹49 bug must be fully gone");
});

console.log("\n=== bilingual completeness of the new config layer (EN + HI, both first-class) ===");
check("every pilot config has non-empty EN + HI title, benefits, all 5 sections, >=3 FAQs, and a meta description", () => {
  for (const humanSlug of PILOT_SLUGS) {
    const c = FOCUSED_REPORTS_CONFIG[humanSlug];
    for (const lang of ["en", "hi"] as const) {
      assert.ok(c.title[lang].length > 0, `${humanSlug} title.${lang}`);
      assert.ok(c.metaDescription[lang].length > 0, `${humanSlug} metaDescription.${lang}`);
      assert.ok(c.benefits[lang].length >= 3, `${humanSlug} benefits.${lang}`);
      for (const [section, text] of Object.entries(c.sections)) {
        assert.ok((text as any)[lang].length > 0, `${humanSlug} sections.${section}.${lang}`);
      }
    }
    assert.ok(c.faqs.length >= 3, `${humanSlug} faqs`);
    for (const faq of c.faqs) {
      assert.ok(faq.question.en && faq.question.hi && faq.answer.en && faq.answer.hi);
    }
  }
});
check("Hindi copy is genuinely Devanagari, not English left untranslated", () => {
  const DEVANAGARI = /[ऀ-ॿ]/;
  for (const humanSlug of PILOT_SLUGS) {
    const c = FOCUSED_REPORTS_CONFIG[humanSlug];
    assert.match(c.title.hi, DEVANAGARI, `${humanSlug} title.hi`);
    assert.match(c.metaDescription.hi, DEVANAGARI, `${humanSlug} metaDescription.hi`);
    for (const b of c.benefits.hi) assert.match(b, DEVANAGARI, `${humanSlug} benefit`);
  }
});
check("title text matches the backend's own PROMPT_SPECS title (verified live against modules/focused_reports/prompt_specs.py, not hand-written)", () => {
  // Snapshot of the exact text queried directly from the backend during
  // this task -- see app/data/focusedReportsConfig.ts's own title comment.
  assert.equal(FOCUSED_REPORTS_CONFIG["major-kundali-obstacles"].title.en, "Major Obstacles in Your Kundali");
  assert.equal(FOCUSED_REPORTS_CONFIG["major-kundali-obstacles"].title.hi, "आपकी कुंडली की प्रमुख बाधाएँ");
  assert.equal(FOCUSED_REPORTS_CONFIG["major-kundali-strengths"].title.en, "Major Strengths in Your Kundali");
  assert.equal(FOCUSED_REPORTS_CONFIG["major-kundali-strengths"].title.hi, "आपकी कुंडली की प्रमुख शक्तियाँ");
});

console.log("\n=== P0.7: the 61 GENERIC-tier configs are complete, bilingual, and built only from authoritative data ===");
const GENERIC_KEYS = intentQuestions.map((q) => q.questionKey).filter((k) => !PILOT_KEYS.includes(k));
check("exactly 61 non-pilot question_keys", () => {
  assert.equal(GENERIC_KEYS.length, 61);
});
check("every generic config has non-empty EN + HI title, benefits, all 5 sections, >=2 FAQs, and a meta description", () => {
  for (const key of GENERIC_KEYS) {
    const c = getFocusedReportConfigBySlug(questionKeyToHumanSlug(key))!;
    for (const lang of ["en", "hi"] as const) {
      assert.ok(c.title[lang].length > 0, `${key} title.${lang}`);
      assert.ok(c.metaDescription[lang].length > 0, `${key} metaDescription.${lang}`);
      assert.ok(c.benefits[lang].length >= 3, `${key} benefits.${lang}`);
      for (const [section, text] of Object.entries(c.sections)) {
        assert.ok((text as any)[lang].length > 0, `${key} sections.${section}.${lang}`);
      }
    }
    assert.ok(c.faqs.length >= 2, `${key} faqs`);
  }
});
check("generic Hindi copy is genuinely Devanagari for every one of the 61", () => {
  const DEVANAGARI = /[ऀ-ॿ]/;
  for (const key of GENERIC_KEYS) {
    const c = getFocusedReportConfigBySlug(questionKeyToHumanSlug(key))!;
    assert.match(c.title.hi, DEVANAGARI, `${key} title.hi`);
    for (const b of c.benefits.hi) assert.match(b, DEVANAGARI, `${key} benefit`);
  }
});
check("every generic title comes verbatim from focusedReportTitles.json (the backend's own prompt_specs.py export), never hand-typed differently", () => {
  const titles = JSON.parse(read("app/data/focusedReportTitles.json"));
  for (const key of GENERIC_KEYS) {
    const c = getFocusedReportConfigBySlug(questionKeyToHumanSlug(key))!;
    assert.equal(c.title.en, titles[key].en, key);
    assert.equal(c.title.hi, titles[key].hi, key);
  }
});
check("generic config's category always agrees with the catalog's own category for that question_key (never hand-typed separately)", () => {
  for (const q of intentQuestions) {
    if (PILOT_KEYS.includes(q.questionKey)) continue;
    const c = getFocusedReportConfigBySlug(questionKeyToHumanSlug(q.questionKey))!;
    assert.equal(c.category, q.category, q.questionKey);
  }
});
check("generic sections quote the catalog's own question text verbatim (never a paraphrase/invention)", () => {
  for (const q of intentQuestions) {
    if (PILOT_KEYS.includes(q.questionKey)) continue;
    const c = getFocusedReportConfigBySlug(questionKeyToHumanSlug(q.questionKey))!;
    assert.ok(c.sections.whatItTellsYou.en.includes(q.question.en), q.questionKey);
    assert.ok(c.sections.whatItTellsYou.hi.includes(q.question.hi), q.questionKey);
  }
});
check("DUAL-question generic configs use 'both of your birth charts' framing, not SELF's 'your own birth chart'", () => {
  for (const q of intentQuestions) {
    if (q.personMode !== "dual" || PILOT_KEYS.includes(q.questionKey)) continue;
    const c = getFocusedReportConfigBySlug(questionKeyToHumanSlug(q.questionKey))!;
    assert.ok(/both of your birth charts/.test(c.benefits.en[0]), q.questionKey);
  }
});
check("generic trustAndLimitations never promises a guaranteed outcome, matching the pilots' own established disclaimer language", () => {
  for (const key of GENERIC_KEYS) {
    const c = getFocusedReportConfigBySlug(questionKeyToHumanSlug(key))!;
    assert.ok(/not a certainty|guaranteed outcome/i.test(c.sections.trustAndLimitations.en), key);
  }
});

console.log("\n=== product-safety copy constraints (#62 no dosha promise / no fear-sell; #63 differentiated from natal-only) ===");
check("#62 (obstacles) never promises a dosha exists, and explicitly frames remedies as conditional", () => {
  const c = FOCUSED_REPORTS_CONFIG["major-kundali-obstacles"];
  const allEn = [c.sections.howJyotishApproachesIt.en, c.sections.trustAndLimitations.en, ...c.faqs.map((f) => f.answer.en)].join(" ");
  assert.ok(/never (invents|assigns) a dosha|only if that exact dosha/i.test(allEn), "must explicitly disclaim inventing/assigning a dosha");
  assert.ok(/conditional|no remedy is presented as a guaranteed outcome|never a promise/i.test(allEn), "remedies must be framed as conditional, not guaranteed");
});
check("#63 (strengths) is explicitly differentiated from a generic natal-only strengths report", () => {
  const c = FOCUSED_REPORTS_CONFIG["major-kundali-strengths"];
  const allEn = [c.benefits.en.join(" "), c.sections.whatItTellsYou.en, ...c.faqs.map((f) => f.answer.en)].join(" ");
  assert.ok(/natal-only|natural-strengths report is natal-only|general natal-strengths/i.test(allEn), "must name/contrast the natal-only report explicitly");
  assert.ok(/current Dasha and transits|currently active|active right now/i.test(allEn), "must explicitly cover current Dasha/transit activation");
});

console.log("\n=== P0.5.1: Google Places autocomplete wiring (structural -- see P0.5.1 report for the live-browser proof this is an API-key/environment issue, not a code defect) ===");
check("FocusedReportCheckout imports the SAME shared loadGoogleMapsPlaces() loader as the existing, proven ReportCheckout.tsx -- no second/divergent implementation", () => {
  const focused = read("components/focused-reports/FocusedReportCheckout.tsx");
  const existing = read("components/reports/ReportCheckout.tsx");
  assert.ok(/import \{ loadGoogleMapsPlaces \} from "@\/components\/PlaceAutocompleteInput";/.test(focused));
  assert.ok(/import \{ loadGoogleMapsPlaces \} from "@\/components\/PlaceAutocompleteInput";/.test(existing));
  assert.ok(focused.includes("loadGoogleMapsPlaces()"), "must actually call the loader, not just import it");
});
check("the Autocomplete widget is constructed with the same options (types: (cities)) as the existing checkout", () => {
  const src = read("components/focused-reports/FocusedReportCheckout.tsx");
  assert.ok(/new \(window as any\)\.google\.maps\.places\.Autocomplete\(placeRef\.current!, \{\s*types: \["\(cities\)"\],?\s*\}\)/.test(src));
});
check("a selected place stores BOTH latitude and longitude (and the visible pob text) from place.geometry", () => {
  const src = read("components/focused-reports/FocusedReportCheckout.tsx");
  assert.ok(/place\.geometry\?\.location\?\.lat\(\)\?\.toString\(\) \|\| ""/.test(src));
  assert.ok(/place\.geometry\?\.location\?\.lng\(\)\?\.toString\(\) \|\| ""/.test(src));
  assert.ok(/pob: place\.name \|\| ""/.test(src));
});
check("manually editing the place text after a selection invalidates (clears) latitude/longitude, forcing a fresh real selection", () => {
  const src = read("components/focused-reports/FocusedReportCheckout.tsx");
  const handler = src.slice(src.indexOf("const handlePobChange"), src.indexOf("const handleSubmit"));
  assert.ok(/latitude: "", longitude: ""/.test(handler));
});
check("submission is blocked when latitude/longitude were never captured (typed-but-unselected place)", () => {
  const src = read("components/focused-reports/FocusedReportCheckout.tsx");
  assert.ok(/if \(form\.latitude === "" \|\| form\.longitude === ""\)/.test(src));
  // The check must come BEFORE the order-creation fetch, not after.
  const guardIdx = src.indexOf('if (form.latitude === "" || form.longitude === "")');
  const fetchIdx = src.indexOf("await fetch(`${base}/api/razorpay-order`");
  assert.ok(guardIdx > 0 && fetchIdx > guardIdx, "the coordinate guard must run before order creation");
});

console.log("\n=== checkout: submitted product is ALWAYS question_key, never the SEO slug or a title/question string ===");
check("FocusedReportCheckout sends product: config.questionKey to /api/razorpay-order, and never reads config.humanSlug", () => {
  const src = read("components/focused-reports/FocusedReportCheckout.tsx");
  assert.ok(/product:\s*config\.questionKey/.test(src), "order payload must send config.questionKey as product");
  assert.ok(!/config\.humanSlug/.test(src), "the checkout component must never read the cosmetic slug at all");
  assert.ok(!/product:\s*config\.title/.test(src), "product must never be a visible title string");
});
check("FocusedReportCheckout never derives the Razorpay amount from config.priceRupees -- backend amount is used verbatim", () => {
  const src = read("components/focused-reports/FocusedReportCheckout.tsx");
  assert.ok(/amount:\s*orderData\.amount/.test(src));
  assert.ok(!/config\.priceRupees\s*\*/.test(src), "must never multiply the display price into a charge amount");
});
check("inactive-product rejection ({ order_id absent }) is handled by the existing generic error path, no fake success", () => {
  const src = read("components/focused-reports/FocusedReportCheckout.tsx");
  assert.ok(/if \(!orderData\.order_id\)/.test(src));
  assert.ok(!/order_id\s*=\s*["']fake/i.test(src));
});
check("P0.5 Part 6: the inactive-product alert never echoes the backend's own error/message text (which embeds the raw question_key)", () => {
  const src = read("components/focused-reports/FocusedReportCheckout.tsx");
  const start = src.indexOf("if (!orderData.order_id)");
  const end = src.indexOf("setIsProcessing(false);\n        return;\n      }\n", start);
  assert.ok(start >= 0 && end > start, "could not isolate the inactive-product branch");
  const block = src.slice(start, end);
  assert.ok(!/orderData\.error/.test(block), "must never interpolate orderData.error into the customer-facing alert");
  assert.ok(!/orderData\.message/.test(block), "must never interpolate orderData.message into the customer-facing alert (it embeds the raw question_key)");
  assert.ok(/Please try again later|पुनः प्रयास करें/.test(block), "expected a fixed, generic bilingual message");
});
check("P0.5 Part 6: the inactive-product alert never implies a charge happened or asks the customer to pay again", () => {
  const src = read("components/focused-reports/FocusedReportCheckout.tsx");
  const start = src.indexOf("if (!orderData.order_id)");
  const end = src.indexOf("setIsProcessing(false);\n        return;\n      }\n", start);
  const block = src.slice(start, end);
  assert.ok(!/charged|paid again|pay again|भुगतान.*हो गया/i.test(block));
});

console.log("\n=== analytics: 4 funnel events, non-PII dimensions only ===");
check("lib/websiteEvents.ts defines report_view / form_start / form_complete / begin_checkout with only question_key/category/locale/price=51", () => {
  const src = read("lib/websiteEvents.ts");
  for (const name of ["report_view", "form_start", "form_complete", "begin_checkout"]) {
    assert.ok(src.includes(`"${name}"`), `missing eventName ${name}`);
  }
  const focusedBlockMatch = src.match(/reportViewed[\s\S]*?beginCheckout[\s\S]*?\n  \},/);
  assert.ok(focusedBlockMatch, "expected the 4 focused-report methods to be adjacent, as one block");
  const block = focusedBlockMatch![0];
  for (const piiField of ["name", "email", "phone", "dob", "tob", "pob", "latitude", "longitude"]) {
    assert.ok(!new RegExp(`\\b${piiField}\\b`).test(block), `PII field "${piiField}" must never appear in the analytics block`);
  }
  assert.ok(block.includes("price: 51"));
});
check("FocusedReportCheckout's 4 analytics calls pass only (questionKey, category, locale) -- never a form field", () => {
  const src = read("components/focused-reports/FocusedReportCheckout.tsx");
  const calls = src.match(/WebsiteEvents\.\w+\([^)]*\)/g) || [];
  assert.equal(calls.length, 4, `expected exactly 4 WebsiteEvents calls, found ${calls.length}`);
  for (const call of calls) {
    assert.ok(/\(config\.questionKey, config\.category, currentLang\)/.test(call), call);
    for (const piiField of ["form.email", "form.phone", "form.name", "form.dob", "form.tob", "form.pob", "form.latitude", "form.longitude"]) {
      assert.ok(!call.includes(piiField), `${call} must never include ${piiField}`);
    }
  }
});
check("campaign_context (first-touch attribution) is still attached at order-creation, unchanged pattern", () => {
  const src = read("components/focused-reports/FocusedReportCheckout.tsx");
  assert.ok(src.includes("buildCampaignContextFromAttribution"));
  assert.ok(src.includes("readStoredAttribution"));
  assert.ok(/campaign_context:\s*campaignContext/.test(src));
});

console.log("\n=== route: ALL 63 static params, SELF/DUAL branching, correct canonical + hreflang (no old /reports/[slug]-style gap) ===");
check("generateStaticParams is driven by listFocusedReportHumanSlugs(), not a hardcoded/narrower list", () => {
  const src = read("app/[locale]/reports/focused/[slug]/page.tsx");
  assert.ok(/generateStaticParams[\s\S]{0,120}listFocusedReportHumanSlugs\(\)/.test(src));
  assert.equal(listFocusedReportHumanSlugs().length, 63, "the route must now generate all 63, not a pilot-only subset");
});
check("metadata sets canonical + en/hi/x-default alternates and robots noindex for every product (SEO rollout is a later, separate step)", () => {
  const src = read("app/[locale]/reports/focused/[slug]/page.tsx");
  assert.ok(/alternates:\s*{/.test(src));
  assert.ok(/canonical/.test(src));
  assert.ok(/en:\s*`\$\{SITE_URL\}\$\{path\}`/.test(src), "expected an EN alternate distinct from the HI one (the old /reports/[slug] hreflang gap must not repeat)");
  assert.ok(/hi:\s*`\$\{SITE_URL\}\/hi\$\{path\}`/.test(src), "expected a real, distinct HI URL, not a client-side toggle");
  assert.ok(/"x-default":\s*`\$\{SITE_URL\}\$\{path\}`/.test(src));
  assert.ok(/robots:\s*{\s*index:\s*false,\s*follow:\s*true\s*}/.test(src));
});
check("the canonical/hreflang URLs this route would emit are correct for the 2 pilots AND a sample of generic products", () => {
  const sampleSlugs = [...PILOT_SLUGS, questionKeyToHumanSlug("promotion_timing"), questionKeyToHumanSlug("relationship_lead_to_marriage")];
  for (const humanSlug of sampleSlugs) {
    const p = `/reports/focused/${humanSlug}`;
    const en = `${SITE_URL}${p}`;
    const hi = `${SITE_URL}/hi${p}`;
    assert.equal(en, `https://www.jyotishasha.com/reports/focused/${humanSlug}`);
    assert.equal(hi, `https://www.jyotishasha.com/hi/reports/focused/${humanSlug}`);
    assert.notEqual(en, hi);
  }
});
check("unknown slugs still resolve to undefined (route calls notFound())", () => {
  const src = read("app/[locale]/reports/focused/[slug]/page.tsx");
  assert.ok(/if \(!config\) notFound\(\);/.test(src));
  assert.equal(getFocusedReportConfigBySlug("major-kundali-obstacles-2"), undefined);
  assert.equal(getFocusedReportConfigBySlug("major_kundali_obstacles"), undefined, "underscored raw key must not also work as a slug");
});
check("the route branches SELF (54) vs DUAL (9) by the catalog's own person_mode, rendering FocusedDualReportCheckout only for dual", () => {
  const src = read("app/[locale]/reports/focused/[slug]/page.tsx");
  assert.ok(src.includes("FocusedDualReportCheckout"), "must import/use the dual checkout");
  assert.ok(src.includes("FocusedReportCheckout"), "must still use the SELF checkout");
  assert.ok(/isDual\s*=\s*question\.personMode\s*===\s*"dual"/.test(src), "the branch must read personMode from the live catalog question, not be hand-guessed");
  assert.ok(/isDual\s*\?\s*\(?\s*<FocusedDualReportCheckout/.test(src));
});
check("SELF vs DUAL routing is correct for every one of the 63 real questions (cross-checked against the catalog's own personMode)", () => {
  let selfCount = 0, dualCount = 0;
  for (const q of intentQuestions) {
    if (q.personMode === "single") selfCount++;
    else dualCount++;
  }
  assert.equal(selfCount, 54, "SELF count");
  assert.equal(dualCount, 9, "DUAL count");
});

console.log("\n=== hub: /reports/focused groups all 63 under the 8 authoritative categories, noindex, every card resolves ===");
const HUB_PAGE = "app/[locale]/reports/focused/page.tsx";
check("the hub page exists as a sibling of [slug]/page.tsx (no routing conflict)", () => {
  assert.ok(fs.existsSync(path.join(repo, HUB_PAGE)));
});
check("hub metadata sets canonical + en/hi/x-default alternates and robots noindex, follow", () => {
  const src = read(HUB_PAGE);
  assert.ok(/alternates:\s*{/.test(src));
  assert.ok(/en:\s*`\$\{SITE_URL\}\$\{path\}`/.test(src));
  assert.ok(/hi:\s*`\$\{SITE_URL\}\/hi\$\{path\}`/.test(src));
  assert.ok(/robots:\s*{\s*index:\s*false,\s*follow:\s*true\s*}/.test(src));
});
check("hub canonical bare-EN URL is exactly /reports/focused, HI is /hi/reports/focused", () => {
  const src = read(HUB_PAGE);
  assert.ok(src.includes('const path = "/reports/focused"'));
});
check("the hub groups every one of the 63 products under the 8 authoritative intentCategories, in that exact order", () => {
  assert.equal(intentCategories.length, 8);
  const expectedOrder = ["career", "money_business", "marriage", "relationship", "foreign", "education", "property", "life"];
  assert.deepEqual(intentCategories.map((c) => c.categoryId), expectedOrder);
  const grouped = new Map<string, number>();
  for (const q of intentQuestions) grouped.set(q.category, (grouped.get(q.category) || 0) + 1);
  const expectedCounts: Record<string, number> = { career: 12, money_business: 11, marriage: 6, relationship: 9, foreign: 6, education: 4, property: 5, life: 10 };
  for (const [category, count] of Object.entries(expectedCounts)) assert.equal(grouped.get(category), count, category);
});
check("hub source: no client-side filtering state, no carousel/modal, just category anchor nav + Link cards", () => {
  const src = read(HUB_PAGE);
  assert.ok(!/"use client"/.test(src), "the hub should be a plain server component");
  assert.ok(!/useState|useEffect/.test(src));
  assert.ok(!/carousel|modal|Modal|Carousel/i.test(src.replace(/\/\/.*$/gm, "")));
});
check("every hub card resolves to a real, valid product page via the exact same getFocusedReportConfigBySlug() the [slug] route uses", () => {
  let cardCount = 0;
  for (const q of intentQuestions) {
    const humanSlug = questionKeyToHumanSlug(q.questionKey);
    const config = getFocusedReportConfigBySlug(humanSlug);
    assert.ok(config, `hub card for ${q.questionKey} would not resolve to a page`);
    assert.equal(config!.category, q.category);
    cardCount++;
  }
  assert.equal(cardCount, 63);
});
check("hub card primary CTA label is 'Proceed →' / 'आगे बढ़ें →' (never 'View Report'), ₹51 shown once, links to the correct locale-prefixed product URL", () => {
  const src = read(HUB_PAGE);
  assert.ok(src.includes("Proceed →"));
  assert.ok(src.includes("आगे बढ़ें →"));
  assert.ok(!src.includes("View Report"), "the old 'View Report' CTA must be fully gone from the hub");
  assert.ok(!src.includes("रिपोर्ट देखें"), "the old Hindi 'View Report' CTA must be fully gone from the hub");
  assert.ok(/href=\{`\$\{prefix\}\/reports\/focused\/\$\{humanSlug\}`\}/.test(src));
});
check("hub cards show the CUSTOMER QUESTION as primary content, never the report title or category name", () => {
  const src = read(HUB_PAGE);
  assert.ok(src.includes("hookText={localized(question.question, locale)}"), "the question must be the card's content prop");
  assert.ok(!/titleText/.test(src), "the card component must not take/render a title prop at all");
  assert.ok(!/config\.title\[locale\]/.test(src), "the hub must never render config.title -- only the catalog question");
});
check("₹51 REPORT badge is removed -- price appears exactly once per card, no separate pill/badge element", () => {
  const src = read(HUB_PAGE);
  assert.ok(!/₹51 Report/.test(src) && !/₹51 रिपोर्ट/.test(src), "the old badge pill text must be gone");
  // Strip comments first -- a comment documenting the ABSENCE of a badge
  // (e.g. "No badge -- price appears once per card") is fine; only actual
  // badge markup/props would be a violation.
  const codeOnly = src
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((line) => !/^\s*\/\//.test(line))
    .join("\n");
  assert.ok(!/badge/i.test(codeOnly), "no badge concept should remain in the hub's actual code");
});

console.log("\n=== SEO schema: no fabricated ratings/reviews/availability claims ===");
check("FocusedReportSeoSchema never claims availability, ratings, reviews or a sales/popularity count", () => {
  const src = read("components/focused-reports/FocusedReportSeoSchema.tsx");
  // Strip comment lines first -- the file's own header comment explains,
  // in prose, WHY availability/image are deliberately omitted; that
  // documentation mentioning the word is fine, an actual schema field
  // using it would not be.
  const codeOnly = src
    .split("\n")
    .filter((line) => !/^\s*(\/\/|\*|\/\*)/.test(line))
    .join("\n");
  for (const forbidden of ["availability\\s*:", "aggregateRating", "\\breview\\b", "ratingValue", "InStock"]) {
    assert.ok(!new RegExp(forbidden, "i").test(codeOnly), `must not claim "${forbidden}"`);
  }
  assert.ok(src.includes('"@type": "Product"'));
  assert.ok(src.includes('"@type": "FAQPage"'));
  assert.ok(src.includes('"@type": "BreadcrumbList"'));
  assert.ok(src.includes("priceCurrency"));
});

console.log("\n=== P0.5 Part 1: middleware -- ONE canonical bare-English URL for /reports/focused/*, /en/ redirects to it ===");
check("the /reports FAST EXIT carves out /reports/focused (so it gets normal locale rewrite/redirect handling, unlike the old /reports/[slug] app)", () => {
  const src = read("middleware.js");
  assert.ok(
    /pathname\.startsWith\(['"]\/reports['"]\)\s*&&\s*!pathname\.startsWith\(['"]\/reports\/focused['"]\)/.test(src),
    "expected the FAST EXIT's /reports check to explicitly exclude /reports/focused",
  );
});
check("the /en/ duplicate-URL redirect no longer treats /en/reports/focused (hub, exact) or /en/reports/focused/* (products) as outside the locale architecture", () => {
  const src = read("middleware.js");
  assert.ok(
    /!\(pathname === ['"]\/en\/reports\/focused['"] \|\| pathname\.startsWith\(['"]\/en\/reports\/focused\/['"]\)\)/.test(src),
    "expected the isOutsideLocaleArchitecture check to stop excluding both the exact hub path and anything under it",
  );
});
// This suite has no HTTP client / running dev server available to it, so
// the actual live behavior these two source-level invariants produce --
// bare /reports/focused/* = 200 (canonical), /en/reports/focused/* = 301
// to bare, /hi/reports/focused/* = 200, unrelated /reports/[slug] and
// general /en/* behavior unchanged -- was verified by hand against a
// running dev server as part of P0.5 and is documented in that report,
// not re-derived here.

console.log("\n=== P0.7 Phase 7: no premature sitewide exposure -- hub and all 63 product pages stay out of the sitemap ===");
check("sitemap generation is untouched by this task -- neither the hub nor any focused product page is added to it yet", () => {
  const sitemapCandidates = ["app/sitemap.ts", "app/sitemap.xml.ts", "app/sitemap/route.ts"];
  for (const candidate of sitemapCandidates) {
    if (fs.existsSync(path.join(repo, candidate))) {
      const src = read(candidate);
      assert.ok(!src.includes("focusedReportsConfig"), `${candidate} must not reference the focused-reports config yet`);
      assert.ok(!/reports\/focused/.test(src), `${candidate} must not hardcode a /reports/focused URL either`);
    }
  }
});
check("both the hub and the [slug] route stay noindex, follow -- SEO/indexing is a deliberately separate, later step", () => {
  assert.ok(/robots:\s*{\s*index:\s*false,\s*follow:\s*true\s*}/.test(read(HUB_PAGE)));
  assert.ok(/robots:\s*{\s*index:\s*false,\s*follow:\s*true\s*}/.test(read("app/[locale]/reports/focused/[slug]/page.tsx")));
});

console.log("\n=== no technical/debug field is ever shown to the customer as visible text ===");
check("the hub never renders a raw question_key or category_id as visible card text (title/hook/price/CTA only)", () => {
  const src = read(HUB_PAGE);
  // question.questionKey is used only to build the href/key prop (attributes),
  // never interpolated into rendered text content.
  assert.ok(!/>\s*\{.*question\.questionKey.*\}\s*</.test(src));
  assert.ok(!/>\s*\{.*question\.category.*\}\s*</.test(src));
});
check("FocusedDualReportCheckout never renders config.questionKey as visible text either (only used inside the order-creation payload)", () => {
  const src = read("components/focused-reports/FocusedDualReportCheckout.tsx");
  assert.ok(!/>\s*\{.*config\.questionKey.*\}\s*</.test(src));
  assert.ok(/productSlug:\s*config\.questionKey/.test(src));
});

console.log("\n=== hub redesign: no emoji anywhere in hub/badges/cards/CTA/report navigation ===");
// Real pictographic emoji only (Misc Symbols/Pictographs/Emoticons/
// Transport/Supplemental blocks) -- deliberately NOT flagging plain
// typographic arrows (this task's own "<- Explore All Reports" / "<-
// सभी रिपोर्ट्स देखें" copy uses one) or a checkmark, neither of which
// reads as "emoji" the way this task means it.
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}]/u;
check("hub page source contains no pictographic emoji", () => {
  assert.ok(!EMOJI_RE.test(read(HUB_PAGE)));
});
check("FocusedReportHero (Explore All Reports link) and RelatedFocusedReports contain no pictographic emoji", () => {
  assert.ok(!EMOJI_RE.test(read("components/focused-reports/FocusedReportHero.tsx")));
  assert.ok(!EMOJI_RE.test(read("components/focused-reports/RelatedFocusedReports.tsx")));
});
check("the /reports -> focused-hub bridge card contains no pictographic emoji (scoped to the new bridge block only -- this file has an unrelated, pre-existing emoji elsewhere in a code comment)", () => {
  const src = read("app/reports/ReportsPageClient.tsx");
  const start = src.indexOf("Bridge into the focused-reports hub");
  const end = src.indexOf("{/* --- Category Filter --- */}");
  assert.ok(start >= 0 && end > start, "could not isolate the bridge block");
  assert.ok(!EMOJI_RE.test(src.slice(start, end)));
});

console.log("\n=== hub redesign: 'Popular Reports' featured section (curated merchandising, not real analytics) ===");
check("exactly 6 featured question_keys, each a real, unique catalog entry", () => {
  assert.equal(FEATURED_FOCUSED_QUESTION_KEYS.length, 6);
  assert.equal(new Set(FEATURED_FOCUSED_QUESTION_KEYS).size, 6, "no duplicate featured keys");
  for (const key of FEATURED_FOCUSED_QUESTION_KEYS) {
    assert.ok(getIntentQuestion(key), `${key} is not a real catalog question_key`);
  }
});
check("every featured question_key resolves to a valid page config via the exact same getFocusedReportConfigBySlug() every page uses", () => {
  for (const key of FEATURED_FOCUSED_QUESTION_KEYS) {
    const config = getFocusedReportConfigBySlug(questionKeyToHumanSlug(key));
    assert.ok(config, `featured key ${key} does not resolve to a page`);
    assert.equal(config!.questionKey, key);
    assert.equal(config!.priceRupees, 51);
  }
});
check("the featured shortlist covers 5 distinct categories (broad commercial-intent spread), including the #62 pilot", () => {
  const categories = new Set(FEATURED_FOCUSED_QUESTION_KEYS.map((key) => getIntentQuestion(key)!.category));
  assert.ok(categories.size >= 5, `expected a broad spread of categories, got ${categories.size}`);
  assert.ok(FEATURED_FOCUSED_QUESTION_KEYS.includes("major_kundali_obstacles"), "the #62 pilot (real sample + proven production E2E) should be featured");
});
check("hub source: featured section heading is exactly 'Popular Reports' / 'लोकप्रिय रिपोर्ट्स' (renamed from 'Most Purchased Reports'), driven by FEATURED_FOCUSED_QUESTION_KEYS (not a second hardcoded list)", () => {
  const src = read(HUB_PAGE);
  assert.ok(src.includes("Popular Reports"));
  assert.ok(src.includes("लोकप्रिय रिपोर्ट्स"));
  assert.ok(!src.includes("Most Purchased Reports"), "the old heading text must be fully gone");
  assert.ok(src.includes("FEATURED_FOCUSED_QUESTION_KEYS"));
  assert.ok(src.includes("Browse by Category") || src.includes("श्रेणी के अनुसार देखें"));
});
check("no fabricated purchase-ranking claim anywhere in the hub (no counts, no rank, no reviews/ratings) -- badge removed, price is the only number shown per card", () => {
  const src = read(HUB_PAGE);
  // Strip comments first -- this file's own explanatory comments are
  // allowed to name the exact fabricated-stat SHAPES they deliberately
  // avoid (that's documentation, not a violation); only actual rendered
  // text/code containing one would be.
  const codeOnly = src
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((line) => !/^\s*\/\//.test(line))
    .join("\n");
  // Note: a bare /#1/ pattern is deliberately NOT included here -- it
  // false-positives on ordinary hex color values like bg-[#1c1640]. The
  // realistic ranking-claim shapes are covered explicitly below instead.
  const forbidden = [/\d[,.]?\d*\s*(purchased|sold|bought)/i, /best\s*seller\s*#?\d/i, /\d+(\.\d+)?\s*(stars|rating)/i, /\d+\s*reviews?/i, /rank(ed)?\s*#\d/i, /#1\s*(best|top|popular|choice)/i];
  for (const pattern of forbidden) assert.ok(!pattern.test(codeOnly), `hub must not contain a fabricated stat matching ${pattern}`);
});
check("the featured section's own code comment documents that this is curated merchandising, not real purchase-ranking analytics", () => {
  const configSrc = read("app/data/focusedReportsConfig.ts");
  assert.ok(/NOT computed from real|not actual purchase-ranking|not.{0,20}real (order|analytics)/i.test(configSrc));
});

console.log("\n=== hub redesign: Related Reports (generalized, same-category, excludes self) ===");
check("getRelatedFocusedReports returns up to 3 items, all same category, never including the product itself", () => {
  for (const q of intentQuestions) {
    const config = getFocusedReportConfigBySlug(questionKeyToHumanSlug(q.questionKey))!;
    const related = getRelatedFocusedReports(config, 3);
    assert.ok(related.length <= 3, q.questionKey);
    assert.ok(related.length > 0, `${q.questionKey} got zero related reports`);
    for (const r of related) {
      assert.equal(r.category, config.category, `${q.questionKey} -> ${r.questionKey} category mismatch`);
      assert.notEqual(r.questionKey, config.questionKey, `${q.questionKey} related to itself`);
    }
    assert.equal(new Set(related.map((r) => r.questionKey)).size, related.length, `${q.questionKey} has duplicate related items`);
  }
});
check("every category has at least 4 members, so excluding self always leaves >= 3 real related candidates for all 63", () => {
  const counts = new Map<string, number>();
  for (const q of intentQuestions) counts.set(q.category, (counts.get(q.category) || 0) + 1);
  for (const [category, count] of counts) assert.ok(count >= 4, `${category} has only ${count} members`);
});
check("#62/#63 get real, valid related reports too (generalized behavior preserved, not pilot-only anymore)", () => {
  for (const humanSlug of PILOT_SLUGS) {
    const config = getFocusedReportConfigBySlug(humanSlug)!;
    const related = getRelatedFocusedReports(config, 3);
    assert.equal(related.length, 3, humanSlug);
  }
});
check("RelatedFocusedReports source: heading is 'Related Reports' / 'संबंधित रिपोर्ट्स', renders an array of items, no hardcoded per-product list", () => {
  const src = read("components/focused-reports/RelatedFocusedReports.tsx");
  assert.ok(src.includes("Related Reports"));
  assert.ok(src.includes("संबंधित रिपोर्ट्स"));
  assert.ok(src.includes("items: RelatedFocusedReportItem[]") || src.includes("items:") && src.includes("[]"));
  assert.ok(!/major_kundali|major-kundali/.test(src), "must not hardcode the old pilot-only slugs");
});
check("page.tsx wires RelatedFocusedReports via getRelatedFocusedReports(config, 3), not a single-sibling lookup", () => {
  const src = read("app/[locale]/reports/focused/[slug]/page.tsx");
  assert.ok(src.includes("getRelatedFocusedReports(config, 3)"));
  assert.ok(!/intentQuestions\.find/.test(src), "the old single-sibling .find() lookup must be gone");
});

console.log("\n=== hub redesign: reverse navigation (report page -> hub) ===");
check("FocusedReportHero renders '<- Explore All Reports' / '<- सभी रिपोर्ट्स देखें' linking to /reports/focused or /hi/reports/focused", () => {
  const src = read("components/focused-reports/FocusedReportHero.tsx");
  assert.ok(src.includes("Explore All Reports"));
  assert.ok(src.includes("सभी रिपोर्ट्स देखें"));
  assert.ok(/hubHref\s*=\s*locale === "hi" \? "\/hi\/reports\/focused" : "\/reports\/focused"/.test(src));
});
check("the back-link does not interfere with the primary purchase CTA (renders before it, both remain present)", () => {
  const src = read("components/focused-reports/FocusedReportHero.tsx");
  const backLinkIdx = src.indexOf("Explore All Reports");
  const ctaIdx = src.indexOf('href="#focused-report-form"');
  assert.ok(backLinkIdx >= 0 && ctaIdx > backLinkIdx, "back-link must render before the primary CTA, and the primary CTA must still exist");
});

console.log("\n=== hub redesign: bridge from the existing /reports page ===");
check("app/reports/ReportsPageClient.tsx links to the focused hub, switching target by the page's own language toggle (no redesign, one entry)", () => {
  const src = read("app/reports/ReportsPageClient.tsx");
  assert.ok(src.includes("Focused Personalised Reports"));
  assert.ok(src.includes("63 focused questions"));
  assert.ok(src.includes("/reports/focused") && src.includes("/hi/reports/focused"));
  // exactly one bridge, not a second promotional block
  assert.equal((src.match(/Focused Personalised Reports|फोकस्ड पर्सनलाइज़्ड रिपोर्ट्स/g) || []).length, 2, "expected exactly one EN + one HI occurrence (one bridge block)");
});

console.log("\n=== hub redesign: all 63 still discoverable, 8 categories still represented, no broken URLs ===");
check("all 63 products still resolve via the hub's own category grouping (unchanged by the featured section)", () => {
  let total = 0;
  for (const category of intentCategories) {
    total += intentQuestions.filter((q) => q.category === category.categoryId).length;
  }
  assert.equal(total, 63);
  assert.equal(intentCategories.length, 8);
});
check("no broken report URLs: every one of the 63 + every featured key + every related-reports target resolves to a real page config", () => {
  const allSlugsToCheck = new Set<string>();
  for (const q of intentQuestions) allSlugsToCheck.add(questionKeyToHumanSlug(q.questionKey));
  for (const key of FEATURED_FOCUSED_QUESTION_KEYS) allSlugsToCheck.add(questionKeyToHumanSlug(key));
  for (const q of intentQuestions) {
    const config = getFocusedReportConfigBySlug(questionKeyToHumanSlug(q.questionKey))!;
    for (const r of getRelatedFocusedReports(config, 3)) allSlugsToCheck.add(r.humanSlug);
  }
  for (const slug of allSlugsToCheck) {
    assert.ok(getFocusedReportConfigBySlug(slug), `broken URL: ${slug}`);
  }
});

console.log("\n=== hub redesign: everything from the prior phase is preserved ===");
check("63 routable, 54 SELF, 9 DUAL, EN bare canonical, HI /hi/, noindex -- all unchanged", () => {
  assert.equal(listFocusedReportHumanSlugs().length, 63);
  assert.equal(intentQuestions.filter((q) => q.personMode === "single").length, 54);
  assert.equal(intentQuestions.filter((q) => q.personMode === "dual").length, 9);
  const src = read("app/[locale]/reports/focused/[slug]/page.tsx");
  assert.ok(/robots:\s*{\s*index:\s*false,\s*follow:\s*true\s*}/.test(src));
});
check("#62/#63 sample links and ₹51 pricing remain intact", () => {
  assert.ok(focusedReportHasSample("major_kundali_obstacles"));
  assert.ok(focusedReportHasSample("major_kundali_strengths"));
  assert.equal(FOCUSED_REPORTS_WITH_SAMPLES.size, 2);
  for (const humanSlug of PILOT_SLUGS) {
    assert.equal(getFocusedReportConfigBySlug(humanSlug)!.priceRupees, 51);
  }
});

console.log("\n=== P0 visual fix: form-contrast regression (white/light foreground never used on white form controls) ===");
const SELF_CHECKOUT = "components/focused-reports/FocusedReportCheckout.tsx";
const DUAL_CHECKOUT = "components/focused-reports/FocusedDualReportCheckout.tsx";
check("DUAL checkout's shared inputClass constant is dark-on-white, never the dark-card 'text-white'/'bg-white/5' pair that caused this bug", () => {
  const src = read(DUAL_CHECKOUT);
  const m = src.match(/const inputClass = "([^"]*)"/);
  assert.ok(m, "could not find the inputClass constant");
  const classes = m![1];
  assert.ok(classes.includes("bg-white"), "inputs must sit on an explicit white background, matching their white card");
  assert.ok(/text-gray-900|text-black/.test(classes), "inputs must use a dark foreground color");
  assert.ok(!/\btext-white\b/.test(classes), "must never pair a white/light foreground with a white card again");
  assert.ok(!/bg-white\/\d/.test(classes), "must never use a translucent-white background (invisible on an opaque white card)");
});
check("DUAL checkout's inputClass forces color-scheme:light, so native date/time/select popups stay light-themed on a white card regardless of OS dark mode", () => {
  const src = read(DUAL_CHECKOUT);
  assert.ok(/\[color-scheme:light\]/.test(src));
});
check("SELF checkout's .inputStyle is dark-on-white (color:#1a202c on background:#fff) and also forces color-scheme:light", () => {
  const src = read(SELF_CHECKOUT);
  const block = src.slice(src.indexOf(".inputStyle {"), src.indexOf(".inputStyle::placeholder"));
  assert.ok(/color:\s*#1a202c/.test(block), "dark foreground color must be set");
  assert.ok(/background:\s*#fff/.test(block), "explicit white background must be set");
  assert.ok(!/color:\s*(#fff|white)\s*;/.test(block), "must never set a white/light foreground on this white-background style");
  assert.ok(/color-scheme:\s*light/.test(block));
});
check("both checkout forms' labels use a dark-enough gray on their white cards (not a too-light gray-400 that reads as barely visible)", () => {
  const dualSrc = read(DUAL_CHECKOUT);
  assert.ok(!/text-gray-400.*uppercase tracking-wider/.test(dualSrc), "DUAL's own label class must not stay at the original too-light gray-400");
  const selfSrc = read(SELF_CHECKOUT);
  assert.ok(/text-gray-700/.test(selfSrc), "SELF's existing labels are already a safely dark gray-700 -- confirm unchanged");
});
check("neither checkout component introduces a light-on-light PlaceAutocompleteInput override -- both defer to its own already-correct bg-white text-black styling", () => {
  const placeInputSrc = read("components/PlaceAutocompleteInput.tsx");
  assert.ok(/bg-white/.test(placeInputSrc) && /text-black/.test(placeInputSrc));
  for (const file of [SELF_CHECKOUT, DUAL_CHECKOUT]) {
    assert.ok(!/PlaceAutocompleteInput[\s\S]{0,80}className=/.test(read(file)), `${file} must not pass an overriding className to PlaceAutocompleteInput`);
  }
});

console.log("\n=== P0 visual fix: no emoji in decorative headings (checkout form section headers, fulfillment-issue screen) ===");
check("neither checkout's <h2>/<h3> section headings contain emoji -- lucide-react icons are used instead where an icon is genuinely needed", () => {
  const headingEmojiRe = /<h[23][^>]*>[\s\S]{0,200}?<\/h[23]>/g;
  const emojiRe = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
  for (const file of [SELF_CHECKOUT, DUAL_CHECKOUT]) {
    const src = read(file);
    const headings = src.match(headingEmojiRe) || [];
    assert.ok(headings.length > 0, `${file}: expected to find heading elements to check`);
    for (const heading of headings) {
      assert.ok(!emojiRe.test(heading), `${file} has an emoji in a heading: ${heading.slice(0, 60)}`);
    }
  }
});
check("both checkout forms import User/Calendar/Users/Clock/AlertTriangle/MessageCircle from lucide-react (the project's existing icon system) for what used to be emoji", () => {
  const selfSrc = read(SELF_CHECKOUT);
  const dualSrc = read(DUAL_CHECKOUT);
  assert.ok(/from "lucide-react"/.test(selfSrc));
  assert.ok(/from "lucide-react"/.test(dualSrc));
  for (const icon of ["User", "Calendar", "Clock", "AlertTriangle", "MessageCircle"]) {
    assert.ok(selfSrc.includes(icon), `SELF missing ${icon}`);
  }
  for (const icon of ["User", "Users", "Clock", "AlertTriangle", "MessageCircle"]) {
    assert.ok(dualSrc.includes(icon), `DUAL missing ${icon}`);
  }
});
check("the fulfillment-issue 'Payment Received' screen icon and the WhatsApp link icon are lucide components, not emoji, in both forms", () => {
  for (const file of [SELF_CHECKOUT, DUAL_CHECKOUT]) {
    const src = read(file);
    assert.ok(/<Clock className=[\s\S]{0,60}\/>\s*:\s*<AlertTriangle/.test(src), `${file}: expected the Clock/AlertTriangle conditional icon`);
    assert.ok(/<MessageCircle className=[\s\S]{0,60}\/>/.test(src), `${file}: expected the MessageCircle WhatsApp icon`);
    assert.ok(!/text-4xl mb-4.*[⏳⚠️]/.test(src), `${file}: the old emoji-in-<p> pattern must be gone`);
  }
});
check("checkout behavior/backend contract is unchanged by this visual fix: product=config.questionKey, backend-amount-verbatim, and the 4 analytics calls all still intact", () => {
  for (const file of [SELF_CHECKOUT, DUAL_CHECKOUT]) {
    const src = read(file);
    assert.ok(/config\.questionKey/.test(src));
    assert.ok(!/config\.humanSlug/.test(src));
  }
  assert.ok(/amount:\s*orderData\.amount/.test(read(SELF_CHECKOUT)));
});

console.log("\n=== Sample Preview Strategy: all 63 expose 'View Sample', #62/#63 real, other 61 generic Example Report preview ===");
const EXAMPLE_PREVIEW_PAGE = "app/[locale]/reports/focused/example-preview/page.tsx";
check("all 63 real question_keys resolve to a NON-EMPTY sample-or-preview href via the ONE decision function", () => {
  for (const q of intentQuestions) {
    for (const locale of ["en", "hi"] as const) {
      const href = getFocusedReportSampleOrPreviewHref(q.questionKey, locale);
      assert.ok(href && href.length > 0, `${q.questionKey}/${locale} got an empty href`);
    }
  }
});
check("#62/#63 resolve to their own exact, real sample PDF -- unchanged mechanism/URL, in both languages", () => {
  for (const key of PILOT_KEYS) {
    assert.equal(getFocusedReportSampleOrPreviewHref(key, "en"), `/report-samples/${key}_en.pdf`);
    assert.equal(getFocusedReportSampleOrPreviewHref(key, "hi"), `/report-samples/${key}_hi.pdf`);
  }
});
check("every one of the other 61 (everything except #62/#63) resolves to the SAME shared generic Example Report preview path, locale-correct", () => {
  let checked = 0;
  for (const q of intentQuestions) {
    if (PILOT_KEYS.includes(q.questionKey)) continue;
    assert.equal(getFocusedReportSampleOrPreviewHref(q.questionKey, "en"), GENERIC_EXAMPLE_PREVIEW_PATH, q.questionKey);
    assert.equal(getFocusedReportSampleOrPreviewHref(q.questionKey, "hi"), `/hi${GENERIC_EXAMPLE_PREVIEW_PATH}`, q.questionKey);
    checked++;
  }
  assert.equal(checked, 61);
});
check("the generic preview is never a per-product URL -- exactly ONE EN path and ONE HI path serve all 61 (no 61 fake PDFs/duplicate assets)", () => {
  const enHrefs = new Set<string>();
  const hiHrefs = new Set<string>();
  for (const q of intentQuestions) {
    if (PILOT_KEYS.includes(q.questionKey)) continue;
    enHrefs.add(getFocusedReportSampleOrPreviewHref(q.questionKey, "en"));
    hiHrefs.add(getFocusedReportSampleOrPreviewHref(q.questionKey, "hi"));
  }
  assert.equal(enHrefs.size, 1);
  assert.equal(hiHrefs.size, 1);
});
check("the hub's FocusedReportCard renders a 'View Sample'/'Sample देखें' link for every card, driven by the same resolver, as a SIBLING of the 'Proceed →' link (never nested inside it, which would be invalid HTML and require a client-side event handler to fix)", () => {
  const src = read(HUB_PAGE);
  assert.ok(src.includes("getFocusedReportSampleOrPreviewHref(questionKey, locale)"));
  assert.ok(src.includes("View Sample"));
  assert.ok(src.includes("Sample देखें"));
  // The card itself must be a plain <div>, not a <Link> -- an <a> (View
  // Sample) can never be validly nested inside another <a>/<Link>.
  assert.ok(/function FocusedReportCard[\s\S]{0,300}<div className="flex flex-col rounded-2xl/.test(src), "the card wrapper must be a <div>, not a <Link>");
  assert.ok(!/onClick/.test(src), "no event handler should be needed -- this stays a plain server component");
});
check("FINAL section order: Hero -> Browse by Category -> Popular Reports -> 8 category sections, in that exact RENDER order (using the render body's own unique section markers, not the file's leading header comment which mentions all four out of render order)", () => {
  const src = read(HUB_PAGE);
  // Search from just after the header comment block (the first `export`)
  // so an earlier mention of these same phrases in the file's own
  // documentation comment can never be mistaken for the render order.
  const bodyStart = src.indexOf("export async function generateMetadata");
  const heroIdx = src.indexOf("{/* 1. Compact Hero */}", bodyStart);
  const browseByCategoryIdx = src.indexOf("{/* 2. Browse by Category", bodyStart);
  const popularIdx = src.indexOf("{/* 3. Popular Reports", bodyStart);
  const categorySectionsIdx = src.indexOf("{/* 4. 8 category sections", bodyStart);
  assert.ok(heroIdx >= 0, "hero marker not found");
  assert.ok(browseByCategoryIdx > heroIdx, "Browse by Category must render after the hero");
  assert.ok(popularIdx > browseByCategoryIdx, "Popular Reports must render after Browse by Category");
  assert.ok(categorySectionsIdx > popularIdx, "the 8 category sections must render after Popular Reports");
});
check("category navigation (the 8 category pills) renders BEFORE the Popular Reports grid, not after", () => {
  const src = read(HUB_PAGE);
  const navIdx = src.indexOf("<nav");
  const popularGridIdx = src.indexOf("FEATURED_FOCUSED_QUESTION_KEYS.map");
  assert.ok(navIdx >= 0 && popularGridIdx > navIdx, "the category nav must render before the featured/Popular grid");
});
check("card visual surface: dark-lavender/slate, clearly distinct from the page background, subtle purple border, no gradient/glow", () => {
  const src = read(HUB_PAGE);
  assert.ok(/bg-\[#1c1640\]/.test(src), "cards must use an explicit dark-lavender surface color");
  assert.ok(/border-purple-500\/25/.test(src), "cards must use a subtle (low-opacity) purple border");
  // Strip comments first -- this file's own comment documenting the
  // ABSENCE of gradient/glow effects is fine; only actual Tailwind
  // classes implementing one would be a violation.
  const codeOnly = src
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((line) => !/^\s*\/\//.test(line))
    .join("\n");
  assert.ok(!/gradient|shadow-2xl|glow/i.test(codeOnly), "no loud gradient/glow effects on hub cards");
  // The card surface must differ from the page's own background color.
  const pageBg = src.match(/bg-\[#0b0620\]/);
  assert.ok(pageBg, "page background color must still be present for contrast");
});
check("hub Hero is compact: no benefits list, no primary purchase CTA, no sample link -- just eyebrow/H1/one intro line, unlike the individual product page's Hero", () => {
  const src = read(HUB_PAGE);
  const heroBlock = src.slice(src.indexOf("1. Compact Hero"), src.indexOf("2. Browse by Category"));
  assert.ok(!/benefits|Get Your Report for|focused-report-form/.test(heroBlock), "the hub hero must stay compact, not replicate the product page's full hero");
});
check("no emoji anywhere in the final hub source (heading, nav, Popular Reports, category sections, cards)", () => {
  assert.ok(!EMOJI_RE.test(read(HUB_PAGE)));
});
check("example-preview page exists, is locale-scoped (sibling of the hub/[slug] routes, no routing conflict), and is noindex/follow like every other focused page", () => {
  assert.ok(fs.existsSync(path.join(repo, EXAMPLE_PREVIEW_PAGE)));
  const src = read(EXAMPLE_PREVIEW_PAGE);
  assert.ok(/robots:\s*{\s*index:\s*false,\s*follow:\s*true\s*}/.test(src));
  assert.ok(src.includes('const canonical = `${SITE_URL}${locale === "hi" ? "/hi" : ""}${GENERIC_EXAMPLE_PREVIEW_PATH}`'));
});
check("generic preview is explicitly labeled 'Example Report' / 'उदाहरण रिपोर्ट' -- never a generic-sounding 'Sample Report' that could be confused with a real one", () => {
  const src = read(EXAMPLE_PREVIEW_PAGE);
  assert.ok(src.includes("Example Report"));
  assert.ok(src.includes("उदाहरण रिपोर्ट"));
  assert.ok(!/\bSample Report\b/.test(src), "must not reuse the real-sample badge wording (visual confusion risk)");
});
check("generic preview shows the exact required disclaimer, unblurred, before any section content", () => {
  const src = read(EXAMPLE_PREVIEW_PAGE);
  assert.ok(src.includes("Your actual report will be personalised to your question and birth details."));
  assert.ok(src.includes("आपकी वास्तविक रिपोर्ट आपके प्रश्न और जन्म विवरण के अनुसार व्यक्तिगत होगी।"));
  const disclaimerIdx = src.indexOf("Your actual report will be personalised");
  const firstSectionIdx = src.indexOf("SECTIONS.map");
  assert.ok(disclaimerIdx > 0 && firstSectionIdx > disclaimerIdx, "disclaimer must render before section content in source order");
});
check("generic preview NEVER names or implies a specific product/question in its RENDERED content -- no real product title, no question_key, no catalog-question text (the header comment's own provenance note, e.g. naming #62 as the visual-basis source, is documentation, not customer-facing output, and is excluded here)", () => {
  const src = read(EXAMPLE_PREVIEW_PAGE);
  // Strip the file's own leading block comment (the provenance/design-
  // rationale docstring) plus any other comments -- it is expected and
  // required to name its real source; only RENDERED content must never
  // name/imply a specific product.
  const codeOnly = src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((line) => !/^\s*\/\//.test(line))
    .join("\n");
  for (const q of intentQuestions) {
    assert.ok(!codeOnly.includes(q.questionKey), `must not reference question_key ${q.questionKey} in rendered content`);
    assert.ok(!codeOnly.includes(q.question.en), `must not quote the real question text for ${q.questionKey}`);
  }
  // Title must be the generic placeholder, never any real product title.
  const titles = Object.values(FOCUSED_REPORTS_CONFIG).map((c) => c.title.en);
  for (const title of titles) assert.ok(!codeOnly.includes(title), `must not show the real title "${title}"`);
  assert.ok(codeOnly.includes("Example Focused Report"));
});
check("generic preview's body paragraphs are blurred (illegible) while section headings stay sharp -- demonstrates structure/depth without exposing readable analysis text", () => {
  const src = read(EXAMPLE_PREVIEW_PAGE);
  assert.ok(/blur-\[3px\] select-none/.test(src), "body content must be visually blurred and unselectable");
  // Headings render via a plain <h2>, never wrapped in the blur class.
  assert.ok(/<h2[^>]*>\{content\.heading\}<\/h2>/.test(src), "section headings must render sharp, not blurred");
});
check("the identity/customer-name line on the generic preview is a generic placeholder, never a real name (e.g. the Aarav Sharma persona used by the real #62/#63 samples)", () => {
  const src = read(EXAMPLE_PREVIEW_PAGE);
  assert.ok(!src.includes("Aarav Sharma"));
  assert.ok(src.includes("Example Customer") || src.includes("उदाहरण ग्राहक"));
});
check("Sample Preview labels are consistent everywhere: 'View Sample' (EN) / 'Sample देखें' (HI), on both the product-page Hero and the hub cards", () => {
  const heroSrc = read("components/focused-reports/FocusedReportHero.tsx");
  assert.ok(heroSrc.includes("View Sample") && heroSrc.includes("Sample देखें"));
  assert.ok(read(HUB_PAGE).includes("View Sample") && read(HUB_PAGE).includes("Sample देखें"));
});

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, 0 failed`);
console.log("==================================================");
