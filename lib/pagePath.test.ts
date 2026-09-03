// lib/pagePath.test.ts

/**
 * Task 9A regression tests for lib/pagePath.ts -- the centralized
 * page_path normalizer/accessor that resolves Task 9's own documented
 * PAGE-ACTION ATTRIBUTION GAP.
 *
 * Same standalone check()/pass-fail-counter convention as this repo's
 * other lib/*.test.ts files (no test runner installed).
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/pagePath.ts lib/pagePath.test.ts
 *   node .ts-test-out/pagePath.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */

import { normalizePagePath, getCurrentPagePath } from "./pagePath";

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

type MutableGlobal = Record<string, unknown>;
function setGlobal(key: string, value: unknown): void {
  (globalThis as unknown as MutableGlobal)[key] = value;
}
function getGlobal(key: string): unknown {
  return (globalThis as unknown as MutableGlobal)[key];
}

// ===========================================================================
// 1/2. Real routes preserved exactly
// ===========================================================================
console.log("\n=== 1/2. Real routes preserved ===");
check("1: /en/free-kundali preserved", normalizePagePath("/en/free-kundali") === "/en/free-kundali");
check("2: /hi/reports preserved", normalizePagePath("/hi/reports") === "/hi/reports");
check("2b: /reports/career-report preserved", normalizePagePath("/reports/career-report") === "/reports/career-report");
check(
  "2c: /free-kundali/free-birthchart-result/ (trailing slash) preserved verbatim",
  normalizePagePath("/free-kundali/free-birthchart-result/") === "/free-kundali/free-birthchart-result/"
);

// ===========================================================================
// 3. Query stripped
// ===========================================================================
console.log("\n=== 3. Query stripped ===");
check(
  "3: query string is stripped, not rejected, when the rest of the pathname is otherwise safe",
  normalizePagePath("/free-kundali?utm_source=fb&rid=abc123") === "/free-kundali"
);
check("3b: rid never survives into the normalized value", !(normalizePagePath("/free-kundali?rid=abc123") || "").includes("rid"));

// ===========================================================================
// 4. Fragment stripped
// ===========================================================================
console.log("\n=== 4. Fragment stripped ===");
check("4: fragment is stripped", normalizePagePath("/reports#pricing") === "/reports");
check("4b: query and fragment both stripped together", normalizePagePath("/reports?x=1#pricing") === "/reports");

// ===========================================================================
// 5. External full URL rejected
// ===========================================================================
console.log("\n=== 5. External full URL rejected ===");
check("5: absolute http:// URL rejected (undefined, not extracted)", normalizePagePath("http://evil.com/x") === undefined);
check("5b: absolute https:// URL rejected", normalizePagePath("https://www.jyotishasha.com/free-kundali") === undefined);
check("5c: protocol-relative '//host' URL rejected", normalizePagePath("//evil.com/x") === undefined);

// ===========================================================================
// 6. Duplicate slash behavior
// ===========================================================================
console.log("\n=== 6. Duplicate slash behavior ===");
check("6: internal duplicate slashes collapsed to one", normalizePagePath("/free-kundali//result") === "/free-kundali/result");
check("6b: triple duplicate slashes also collapsed", normalizePagePath("/a///b") === "/a/b");

// ===========================================================================
// 7. Root path
// ===========================================================================
console.log("\n=== 7. Root path ===");
check("7: root '/' works", normalizePagePath("/") === "/");

// ===========================================================================
// 8. Trailing slash behavior
// ===========================================================================
console.log("\n=== 8. Trailing slash behavior ===");
check("8: trailing slash preserved when present (no forced normalization)", normalizePagePath("/reports/") === "/reports/");
check("8b: no trailing slash preserved when absent", normalizePagePath("/reports") === "/reports");

// ===========================================================================
// 9. Oversized pathname omitted
// ===========================================================================
console.log("\n=== 9. Oversized pathname omitted ===");
const oversized = "/" + "a".repeat(300);
check("9: oversized pathname (>256 chars) omitted, not truncated", normalizePagePath(oversized) === undefined);

// ===========================================================================
// 10. SSR / no-window safety
// ===========================================================================
console.log("\n=== 10. SSR / no-window safety ===");
{
  const originalWindow = getGlobal("window");
  setGlobal("window", undefined);
  check("10: getCurrentPagePath() returns undefined when window is unavailable", getCurrentPagePath() === undefined);
  setGlobal("window", originalWindow);
}

// ===========================================================================
// Additional structural guards
// ===========================================================================
console.log("\n=== Additional structural guards ===");
check("missing/empty input -> undefined", normalizePagePath("") === undefined && normalizePagePath(null) === undefined && normalizePagePath(undefined) === undefined);
check("value not starting with '/' -> undefined", normalizePagePath("free-kundali") === undefined);
check("never returns a fallback like '/unknown'", normalizePagePath("") !== "/unknown" && normalizePagePath(null) !== "/unknown");

{
  const originalWindow = getGlobal("window");
  setGlobal("window", { location: { pathname: "/hi/panchang" } });
  check("getCurrentPagePath() reads window.location.pathname when window is present", getCurrentPagePath() === "/hi/panchang");
  setGlobal("window", originalWindow);
}

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("==================================================");
if (failed > 0) process.exit(1);
