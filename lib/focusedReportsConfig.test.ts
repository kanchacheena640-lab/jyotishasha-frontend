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
import { getIntentQuestion, getIntent, intentQuestions } from "../app/data/intentCatalog";
import {
  FOCUSED_REPORTS_CONFIG,
  getFocusedReportConfigBySlug,
  getFocusedReportCatalogEntry,
  listFocusedReportHumanSlugs,
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

console.log("\n=== pilot-only exclusivity ===");
check("exactly the 2 approved pilot slugs exist -- none of the other 61 real question_keys", () => {
  assert.deepEqual(Object.keys(FOCUSED_REPORTS_CONFIG).sort(), [...PILOT_SLUGS].sort());
  assert.deepEqual(listFocusedReportHumanSlugs().sort(), [...PILOT_SLUGS].sort());
});
check("no real question_key or intent_slug was ever used as the public humanSlug", () => {
  const allKeysAndSlugs = new Set(intentQuestions.map((q) => q.questionKey));
  for (const humanSlug of listFocusedReportHumanSlugs()) {
    assert.ok(!allKeysAndSlugs.has(humanSlug), `${humanSlug} looks like a raw question_key, not a cosmetic slug`);
  }
});
check("a real question_key from the other 61 questions is never resolvable as a pilot slug", () => {
  for (const q of intentQuestions) {
    if (PILOT_KEYS.includes(q.questionKey)) continue;
    assert.equal(getFocusedReportConfigBySlug(q.questionKey), undefined, q.questionKey);
  }
  assert.equal(getFocusedReportConfigBySlug("not-a-real-slug"), undefined);
  assert.equal(getFocusedReportConfigBySlug(""), undefined);
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

console.log("\n=== ₹51 pricing, everywhere ===");
check("both pilot configs price at exactly Rs 51 -- no other price anywhere in this config", () => {
  for (const humanSlug of PILOT_SLUGS) {
    assert.equal(FOCUSED_REPORTS_CONFIG[humanSlug].priceRupees, 51);
  }
  assert.ok(!Object.values(FOCUSED_REPORTS_CONFIG).some((c) => (c as any).priceRupees !== 51));
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

console.log("\n=== route: pilot-only static params, correct canonical + hreflang (no old /reports/[slug]-style gap) ===");
check("generateStaticParams is driven by listFocusedReportHumanSlugs(), not a hardcoded/wider list", () => {
  const src = read("app/[locale]/reports/focused/[slug]/page.tsx");
  assert.ok(/generateStaticParams[\s\S]{0,120}listFocusedReportHumanSlugs\(\)/.test(src));
});
check("metadata sets canonical + en/hi/x-default alternates and robots noindex (pilot not yet offered to Google)", () => {
  const src = read("app/[locale]/reports/focused/[slug]/page.tsx");
  assert.ok(/alternates:\s*{/.test(src));
  assert.ok(/canonical/.test(src));
  assert.ok(/en:\s*`\$\{SITE_URL\}\$\{path\}`/.test(src), "expected an EN alternate distinct from the HI one (the old /reports/[slug] hreflang gap must not repeat)");
  assert.ok(/hi:\s*`\$\{SITE_URL\}\/hi\$\{path\}`/.test(src), "expected a real, distinct HI URL, not a client-side toggle");
  assert.ok(/"x-default":\s*`\$\{SITE_URL\}\$\{path\}`/.test(src));
  assert.ok(/robots:\s*{\s*index:\s*false,\s*follow:\s*true\s*}/.test(src));
});
check("the canonical/hreflang URLs this route would emit are correct for both pilot slugs (computed the same way page.tsx does)", () => {
  for (const humanSlug of PILOT_SLUGS) {
    const p = `/reports/focused/${humanSlug}`;
    const en = `${SITE_URL}${p}`;
    const hi = `${SITE_URL}/hi${p}`;
    assert.equal(en, `https://www.jyotishasha.com/reports/focused/${humanSlug}`);
    assert.equal(hi, `https://www.jyotishasha.com/hi/reports/focused/${humanSlug}`);
    assert.notEqual(en, hi);
  }
});
check("unknown slugs are not in generateStaticParams and getFocusedReportConfigBySlug returns undefined for them (route calls notFound())", () => {
  const src = read("app/[locale]/reports/focused/[slug]/page.tsx");
  assert.ok(/if \(!config\) notFound\(\);/.test(src));
  assert.equal(getFocusedReportConfigBySlug("major-kundali-obstacles-2"), undefined);
  assert.equal(getFocusedReportConfigBySlug("major_kundali_obstacles"), undefined, "underscored raw key must not also work as a slug");
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
check("the /en/ duplicate-URL redirect no longer treats /en/reports/focused/* as outside the locale architecture", () => {
  const src = read("middleware.js");
  assert.ok(
    /!pathname\.startsWith\(['"]\/en\/reports\/focused\/['"]\)/.test(src),
    "expected the isOutsideLocaleArchitecture check to stop excluding /en/reports/focused/* from the redirect-to-bare rule",
  );
});
// This suite has no HTTP client / running dev server available to it, so
// the actual live behavior these two source-level invariants produce --
// bare /reports/focused/* = 200 (canonical), /en/reports/focused/* = 301
// to bare, /hi/reports/focused/* = 200, unrelated /reports/[slug] and
// general /en/* behavior unchanged -- was verified by hand against a
// running dev server as part of P0.5 and is documented in that report,
// not re-derived here.

console.log("\n=== pilot discovery stays controlled (no premature sitewide exposure) ===");
check("sitemap generation is untouched by this task -- pilot pages are not being added to it yet", () => {
  const sitemapCandidates = ["app/sitemap.ts", "app/sitemap.xml.ts", "app/sitemap/route.ts"];
  for (const candidate of sitemapCandidates) {
    if (fs.existsSync(path.join(repo, candidate))) {
      assert.ok(!read(candidate).includes("focusedReportsConfig"), `${candidate} must not reference the pilot config yet`);
    }
  }
});

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, 0 failed`);
console.log("==================================================");
