// lib/toolsAnalytics.test.ts

/**
 * Task 13B regression tests for app/[locale]/tools/[toolId]/ToolDynamicPage.tsx
 * -- the single shared pipeline behind all 27 toolsData.ts interactive
 * calculators (Task 13A's own finding). Neither this file nor React
 * components in general are unit-testable via direct rendering in this
 * repo (no component-rendering harness -- confirmed repeatedly across
 * every earlier task), so, matching lib/websiteEvents.test.ts's own
 * established "Strategy 2" (direct source-text inspection via
 * fs.readFileSync), this file proves the exact placement/semantics
 * invariants Task 13B requires by reading the real, committed source
 * and asserting structural facts about it.
 *
 * Same standalone check()/pass-fail-counter convention as every other
 * lib/*.test.ts file in this repo (no test runner installed).
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/toolsAnalytics.test.ts
 *   node .ts-test-out/toolsAnalytics.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */

import * as fs from "fs";
import * as path from "path";

let passed = 0;
let failed = 0;

function check(label: string, condition: boolean) {
  if (condition) {
    passed += 1;
    console.log(`  PASS: ${label}`);
  } else {
    failed += 1;
    console.log(`  FAIL: ${label}`);
  }
}

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8");
}

const TOOL_DYNAMIC_PAGE_PATH = "app/[locale]/tools/[toolId]/ToolDynamicPage.tsx";
const src = readSource(TOOL_DYNAMIC_PAGE_PATH);

console.log("\n=== ToolDynamicPage.tsx -- shared pipeline for all 27 toolsData tools ===");

// 1. imports the existing, established WebsiteEvents facade -- no new
// analytics helper/framework introduced.
check("1: imports WebsiteEvents from the existing lib/websiteEvents facade (no second analytics framework)",
  src.includes('import { WebsiteEvents } from') && src.includes('@/lib/websiteEvents'));

// 2/3. cta_click fires exactly once, and BEFORE the try block (i.e.
// before the API call), regardless of eventual success/failure.
const handleSubmitBody = src.slice(src.indexOf("const handleSubmit"), src.indexOf("return (", src.indexOf("const handleSubmit")));
const ctaClickOccurrences = (handleSubmitBody.match(/WebsiteEvents\.ctaClick\(/g) || []).length;
check("2: WebsiteEvents.ctaClick is called exactly once in handleSubmit", ctaClickOccurrences === 1);
check("3: ctaClick fires BEFORE the try block (before the API call), not gated on success",
  handleSubmitBody.indexOf("WebsiteEvents.ctaClick(") < handleSubmitBody.indexOf("try {"));

// 4/5/6. feature_used fires exactly once, INSIDE the try block, AFTER
// the success state (setResult/setSubmitted) is committed, and never
// inside the catch block.
const tryBlockStart = handleSubmitBody.indexOf("try {");
const catchBlockStart = handleSubmitBody.indexOf("} catch");
const tryBlock = handleSubmitBody.slice(tryBlockStart, catchBlockStart);
const catchBlock = handleSubmitBody.slice(catchBlockStart);
const featureUsedOccurrences = (handleSubmitBody.match(/WebsiteEvents\.featureUsed\(/g) || []).length;
check("4: WebsiteEvents.featureUsed is called exactly once in handleSubmit", featureUsedOccurrences === 1);
check("5: featureUsed is inside the try block (success path only)", tryBlock.includes("WebsiteEvents.featureUsed("));
check("5b: featureUsed fires AFTER setResult(parsed) and setSubmitted(true) -- only after the success state is actually committed",
  tryBlock.indexOf("setResult(parsed)") < tryBlock.indexOf("WebsiteEvents.featureUsed(")
  && tryBlock.indexOf("setSubmitted(true)") < tryBlock.indexOf("WebsiteEvents.featureUsed("));
check("6: featureUsed NEVER appears in the catch block (a failed calculation produces no feature_used)",
  !catchBlock.includes("WebsiteEvents.featureUsed"));

// 7. Stable, safe, toolId-derived identifiers -- never user-entered
// form data (name/dob/tob/place/lat/lng/gender never referenced inside
// either WebsiteEvents.* call's own argument list).
const ctaClickCallMatch = handleSubmitBody.match(/WebsiteEvents\.ctaClick\(([^)]*)\)/);
const featureUsedCallMatch = handleSubmitBody.match(/WebsiteEvents\.featureUsed\(([^)]*)\)/);
check("7: ctaClick's own arguments reference only `toolId` (a static route slug), never `formData`/`requestData`",
  !!ctaClickCallMatch && ctaClickCallMatch[1].includes("toolId") && !ctaClickCallMatch[1].includes("formData") && !ctaClickCallMatch[1].includes("requestData"));
check("7b: featureUsed's own arguments reference only `toolId`, never `data`/`kundaliData`/`result`/`parsed`",
  !!featureUsedCallMatch && featureUsedCallMatch[1].includes("toolId")
  && !["data", "kundaliData", "result", "parsed"].some((t) => (featureUsedCallMatch as RegExpMatchArray)[1].includes(t)));

// 8. No birth-data/PII field name appears anywhere near either call
// (a broader sweep across the whole handleSubmit body's own two call
// sites, not just their immediate argument lists).
const piiTerms = ["dob", "tob", "pob", "latitude", "longitude", "name", "gender", "email", "phone"];
check("8: no birth-data/PII field name appears inside either WebsiteEvents.* call's own arguments",
  !piiTerms.some((t) => (ctaClickCallMatch?.[1] || "").toLowerCase().includes(t) || (featureUsedCallMatch?.[1] || "").toLowerCase().includes(t)));

// 9. page_path is never manually constructed here -- relies entirely on
// WebsiteEvents' own existing, automatic Task 9A page_path attachment.
check("9: no manual page_path/pagePath construction in this file (reuses the existing automatic WebsiteEvents wrapper)",
  !src.includes("page_path:") && !src.includes("pagePath"));

// 10. Both identifiers are namespaced under the tools family, distinct
// from Free Kundali's own dedicated-route identifiers
// ("kundali_form_generate" / "kundali_generate") -- avoids conflating
// the two independent execution paths under one identity.
check("10: cta_id uses a tools-namespaced template (`tools_${toolId}_generate`), distinct from Free Kundali's own 'kundali_form_generate'",
  src.includes("`tools_${toolId}_generate`"));
check("10b: feature_name uses a tools-namespaced template (`tool_${toolId}_generate`), distinct from Free Kundali's own 'kundali_generate'",
  src.includes("`tool_${toolId}_generate`"));

// 11. Analytics failure isolation: WebsiteEvents.* calls are never
// wrapped in their own try/catch here -- they rely on the existing,
// already-proven never-throws guarantee (Task 2C/9A) rather than a
// second defensive layer, exactly like every other WebsiteEvents call
// site in this codebase (FreeKundaliClient.tsx, ReportsPageClient.tsx).
check("11: WebsiteEvents calls are not individually wrapped in their own try/catch (rely on the existing never-throws guarantee, matching every other call site)",
  !/try\s*\{\s*WebsiteEvents\./.test(src));

// 12. Business logic untouched -- the actual calculation/result flow
// (fetchFullKundali/fetchLifeTool/parseToolResponse/setKundaliData/
// setResult/setSubmitted) is structurally unchanged, still present and
// still the ONLY thing gating whether the success branch is reached.
check("12: fetchFullKundali/fetchLifeTool/parseToolResponse calls are all still present and unchanged in shape",
  src.includes("await fetchFullKundali(requestData)") && src.includes("fetchLifeTool(requestData)") && src.includes("await parseToolResponse(data, toolId, currentLang)"));
check("12b: LIFE_TOOL_IDS branching logic is unchanged (still exactly 6 life tools)",
  src.includes("['career-path', 'marriage-path', 'foreign-travel', 'government-job', 'business-path', 'love-life']"));

console.log("\n=== Scope discipline: kundali-prompt untouched, no other tool files touched ===");

// 13. kundali-prompt remains a residual, explicitly-deferred gap (Task
// 13A P3, orphaned/unlinked) -- Task 13B deliberately does not touch
// it (separate, standalone pipeline; see Task 13B's own final report).
const kundaliPromptSrc = readSource("app/[locale]/tools/kundali-prompt/page.tsx");
check("13: kundali-prompt/page.tsx remains untouched -- no WebsiteEvents reference (explicitly deferred, not this task's scope)",
  !kundaliPromptSrc.includes("WebsiteEvents"));

// 14. ToolInputForm.tsx / ToolResultSection.tsx are untouched -- the
// narrowest correct shared implementation point (ToolDynamicPage.tsx's
// own handleSubmit) was used instead of touching either of these.
const toolInputFormSrc = readSource("components/ToolInputForm.tsx");
const toolResultSectionSrc = readSource("components/ToolResultSection.tsx");
check("14: ToolInputForm.tsx has no WebsiteEvents reference (instrumentation lives in ToolDynamicPage.tsx only)",
  !toolInputFormSrc.includes("WebsiteEvents"));
check("14b: ToolResultSection.tsx has no WebsiteEvents reference either", !toolResultSectionSrc.includes("WebsiteEvents"));

// 15. No functional "Buy Now"/upsell activation was introduced --
// ToolResultSection.tsx's own onClick count is unchanged from Task
// 13A's own audit finding (exactly 1 -- the unrelated setSelectedPlanet
// UI toggle).
const onClickCount = (toolResultSectionSrc.match(/onClick=/g) || []).length;
check("15: ToolResultSection.tsx still has exactly 1 onClick handler (the pre-existing, unrelated setSelectedPlanet toggle) -- no Buy Now activation introduced",
  onClickCount === 1 && toolResultSectionSrc.includes("setSelectedPlanet"));

// 16. No page_view / GA4-only concept was added to activity_events
// anywhere in this file.
check("16: no page_view reference anywhere in ToolDynamicPage.tsx", !src.includes("page_view"));

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("==================================================");
if (failed > 0) process.exit(1);
