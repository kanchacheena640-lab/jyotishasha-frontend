// lib/geo.test.ts

/**
 * Geo-Aware Consent v1, Phase 2A regression tests for lib/geo.ts.
 *
 * Same standalone check()/pass-fail-counter convention as every other
 * lib/*.test.ts file in this repo (no test runner installed).
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/geo.ts lib/geo.test.ts
 *   node .ts-test-out/geo.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */

import {
  EUROPE_CONSENT_COUNTRY_CODES,
  US_PRIVACY_COUNTRY_CODE,
  normalizeCountryCode,
  resolveConsentGeoPolicy,
} from "./geo";

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

// ===========================================================================
// 1. Explicit country -> policy contract (Phase 2A's own required cases)
// ===========================================================================
console.log("\n=== 1. explicit country -> policy contract ===");
{
  const cases: Array<[string, ReturnType<typeof resolveConsentGeoPolicy>]> = [
    ["IN", "NORMAL"],
    ["US", "US_PRIVACY"],
    ["DE", "EUROPE_CONSENT"],
    ["FR", "EUROPE_CONSENT"],
    ["GB", "EUROPE_CONSENT"],
    ["CH", "EUROPE_CONSENT"],
    ["AU", "NORMAL"],
    ["AE", "NORMAL"],
    ["NP", "NORMAL"],
  ];
  for (const [code, expected] of cases) {
    check(`1: ${code} -> ${expected}`, resolveConsentGeoPolicy(code) === expected);
  }
}

// ===========================================================================
// 2. Case-insensitive / whitespace-tolerant input normalization
// ===========================================================================
console.log("\n=== 2. input normalization ===");
{
  check("2: lowercase 'in' -> NORMAL", resolveConsentGeoPolicy("in") === "NORMAL");
  check("2: lowercase 'us' -> US_PRIVACY", resolveConsentGeoPolicy("us") === "US_PRIVACY");
  check("2: lowercase 'de' -> EUROPE_CONSENT", resolveConsentGeoPolicy("de") === "EUROPE_CONSENT");
  check("2: mixed case 'De' -> EUROPE_CONSENT", resolveConsentGeoPolicy("De") === "EUROPE_CONSENT");
  check("2: mixed case 'Us' -> US_PRIVACY", resolveConsentGeoPolicy("Us") === "US_PRIVACY");
  check("2: surrounding whitespace ' US ' -> US_PRIVACY", resolveConsentGeoPolicy(" US ") === "US_PRIVACY");
  check("2: surrounding whitespace ' de ' -> EUROPE_CONSENT", resolveConsentGeoPolicy(" de ") === "EUROPE_CONSENT");
}

// ===========================================================================
// 3. Missing / invalid / unknown -> SAFE_FALLBACK
// ===========================================================================
console.log("\n=== 3. missing/invalid/unknown -> SAFE_FALLBACK ===");
{
  check("3: null -> SAFE_FALLBACK", resolveConsentGeoPolicy(null) === "SAFE_FALLBACK");
  check("3: undefined -> SAFE_FALLBACK", resolveConsentGeoPolicy(undefined) === "SAFE_FALLBACK");
  check("3: empty string -> SAFE_FALLBACK", resolveConsentGeoPolicy("") === "SAFE_FALLBACK");
  check("3: whitespace-only -> SAFE_FALLBACK", resolveConsentGeoPolicy("   ") === "SAFE_FALLBACK");
  check("3: 3-letter code 'USA' -> SAFE_FALLBACK", resolveConsentGeoPolicy("USA") === "SAFE_FALLBACK");
  check("3: 1-letter code 'U' -> SAFE_FALLBACK", resolveConsentGeoPolicy("U") === "SAFE_FALLBACK");
  check("3: numeric-looking '12' -> SAFE_FALLBACK", resolveConsentGeoPolicy("12") === "SAFE_FALLBACK");
  check("3: mixed alnum 'U1' -> SAFE_FALLBACK", resolveConsentGeoPolicy("U1") === "SAFE_FALLBACK");
  check("3: non-string input (number) -> SAFE_FALLBACK", resolveConsentGeoPolicy(42 as unknown as string) === "SAFE_FALLBACK");
}

// ===========================================================================
// 4. normalizeCountryCode() -- pure unit tests, independent of the resolver
// ===========================================================================
console.log("\n=== 4. normalizeCountryCode() ===");
{
  check("4: 'de' -> 'DE'", normalizeCountryCode("de") === "DE");
  check("4: ' US ' -> 'US'", normalizeCountryCode(" US ") === "US");
  check("4: null -> null", normalizeCountryCode(null) === null);
  check("4: undefined -> null", normalizeCountryCode(undefined) === null);
  check("4: '' -> null", normalizeCountryCode("") === null);
  check("4: 'USA' -> null", normalizeCountryCode("USA") === null);
}

// ===========================================================================
// 5. Regulatory grouping integrity -- exact EEA + UK + Switzerland set,
//    no accidental duplicates
// ===========================================================================
console.log("\n=== 5. EUROPE_CONSENT_COUNTRY_CODES integrity ===");
{
  const codes = EUROPE_CONSENT_COUNTRY_CODES;
  const asSet = new Set(codes);
  check("5: no duplicate codes in the list", asSet.size === codes.length);
  check("5: exactly 32 codes (EU-27 + IS/LI/NO + GB + CH)", codes.length === 32);

  const expected = [
    "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
    "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
    "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
  ];
  const expectedSet = new Set(expected);
  check("5: contains exactly the intended set (no missing, no extra)",
    expected.every((c) => asSet.has(c)) &&
    codes.every((c) => expectedSet.has(c)));

  check("5: does NOT include the US (US has its own dedicated policy)", !asSet.has("US"));
  check("5: does NOT include India", !asSet.has("IN"));
  check("5: every code is uppercase, 2 letters", codes.every((c) => /^[A-Z]{2}$/.test(c)));
}

// ===========================================================================
// 6. US_PRIVACY_COUNTRY_CODE sanity
// ===========================================================================
console.log("\n=== 6. US_PRIVACY_COUNTRY_CODE ===");
{
  check("6: US_PRIVACY_COUNTRY_CODE is 'US'", US_PRIVACY_COUNTRY_CODE === "US");
  check("6: US is not also listed in the Europe group", !EUROPE_CONSENT_COUNTRY_CODES.includes(US_PRIVACY_COUNTRY_CODE));
}

// ===========================================================================
// 7. Determinism / purity -- repeated calls with the same input agree
// ===========================================================================
console.log("\n=== 7. determinism ===");
{
  const a = resolveConsentGeoPolicy("fr");
  const b = resolveConsentGeoPolicy("fr");
  check("7: repeated calls with the same input return the same result", a === b);

  const before = [...EUROPE_CONSENT_COUNTRY_CODES];
  resolveConsentGeoPolicy("DE");
  resolveConsentGeoPolicy("US");
  resolveConsentGeoPolicy(null);
  check("7: resolving never mutates the exported country list",
    JSON.stringify(before) === JSON.stringify(EUROPE_CONSENT_COUNTRY_CODES));
}

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("==================================================");
if (failed > 0) process.exit(1);
