// lib/freeKundaliSession.test.ts

/**
 * Task 2A.1 regression tests for lib/freeKundaliSession.ts.
 *
 * This repository has no test runner installed (no jest/vitest/RTL in
 * package.json, no test script). Rather than pull in a new framework
 * for one focused fix, this follows the same "standalone script with a
 * check()/pass-fail counter" convention already used throughout the
 * sibling Jyotishasha_Backend repo's own test_*.py files -- just in
 * TypeScript, exercising the pure, framework-free functions in
 * freeKundaliSession.ts directly (no DOM/jsdom/React renderer needed).
 *
 * Run with (from the repo root, no new dependencies required --
 * `typescript` is already a devDependency):
 *
 *   npx tsc --module commonjs --target es2020 --strict \
 *     --outDir .ts-test-out lib/freeKundaliSession.ts lib/freeKundaliSession.test.ts
 *   node .ts-test-out/lib/freeKundaliSession.test.js
 *
 * (then remove .ts-test-out/ -- it is build output, not source, and is
 * never committed.)
 */

import {
  FreeKundaliPayload,
  FreeKundaliStorageLike,
  buildFreeKundaliResultPath,
  buildFreeKundaliStorageKey,
  buildFullKundaliApiPayload,
  generateFreeKundaliRid,
  isValidFreeKundaliPayload,
  isValidRid,
  parseFreeKundaliPayload,
  resolveFreeKundaliPayload,
  serializeFreeKundaliPayload,
} from "./freeKundaliSession";

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

/** Simple in-memory Storage-like stand-in for window.sessionStorage. */
class FakeStorage implements FreeKundaliStorageLike {
  private store = new Map<string, string>();
  setItem(key: string, value: string) {
    this.store.set(key, value);
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
}

const SAMPLE_PAYLOAD: FreeKundaliPayload = {
  name: "Test User",
  dob: "1990-05-15",
  tob: "14:30",
  place: "Mumbai, Maharashtra, India",
  lat: "19.076",
  lng: "72.8777",
  language: "en",
};

// ===========================================================================
// A. Submit with valid selected place -- storage key/rid/URL shape
// ===========================================================================
console.log("\n=== A. valid submit: storage + rid + URL shape ===");
{
  const rid1 = generateFreeKundaliRid();
  const rid2 = generateFreeKundaliRid();
  check("A1: generated rid is non-empty", rid1.length > 0);
  check("A2: two generated rids are unique", rid1 !== rid2);
  check("A3: generated rid passes isValidRid", isValidRid(rid1));

  const storage = new FakeStorage();
  const key = buildFreeKundaliStorageKey(rid1);
  storage.setItem(key, serializeFreeKundaliPayload(SAMPLE_PAYLOAD));

  const storedRaw = storage.getItem(key);
  check("A4: sessionStorage key is namespaced with the prefix", key.startsWith("jyotishasha:free-kundali:"));
  check("A5: stored payload round-trips via JSON", storedRaw !== null && JSON.parse(storedRaw).name === SAMPLE_PAYLOAD.name);

  const storedKeys = storedRaw ? Object.keys(JSON.parse(storedRaw)) : [];
  check(
    "A6: stored payload has exactly the 7 required keys, no gender",
    storedKeys.length === 7 && !storedKeys.includes("gender")
  );

  const path = buildFreeKundaliResultPath(false, rid1);
  check("A7: navigation URL contains rid=", path.includes(`rid=${rid1}`));
  const forbidden = ["name=", "dob=", "tob=", "place=", "lat=", "lng=", "gender="];
  check(
    "A8: navigation URL contains NONE of name/dob/tob/place/lat/lng/gender",
    forbidden.every((f) => !path.includes(f))
  );
  check("A9: navigation URL shape matches expected pattern", /^\/free-kundali\/free-birthchart-result\/\?rid=[A-Za-z0-9%-]+$/.test(path));
}

// ===========================================================================
// B. lat/lng missing -- preserved guard (documented, not independently
// unit-tested here: the guard clause in FreeKundaliClient.tsx's handleSubmit
// -- `if (!form.lat || !form.lng) { ...; return; }` -- is untouched byte-for-
// byte from the pre-fix version and runs BEFORE any rid/storage/navigation
// code, so no rid is ever generated and sessionStorage.setItem is never
// reached when lat/lng is missing. Verified by direct source inspection
// (see final report section 8) since this repo has no component-level
// test harness to exercise the actual form submit event.
// ===========================================================================
console.log("\n=== B. lat/lng missing: verified by source inspection, see final report ===");

// ===========================================================================
// C. Result page valid rid -- payload loads, API payload mapping correct
// ===========================================================================
console.log("\n=== C. valid rid: payload resolves + API payload mapping ===");
{
  const storage = new FakeStorage();
  const rid = generateFreeKundaliRid();
  storage.setItem(buildFreeKundaliStorageKey(rid), serializeFreeKundaliPayload(SAMPLE_PAYLOAD));

  const resolved = resolveFreeKundaliPayload(rid, storage);
  check("C1: resolveFreeKundaliPayload returns the stored payload", resolved !== null && resolved.name === SAMPLE_PAYLOAD.name);
  check("C2: resolved payload place matches exactly", resolved?.place === SAMPLE_PAYLOAD.place);

  const apiBody = resolved ? buildFullKundaliApiPayload(resolved) : null;
  check("C3: API payload renames place -> place_name", apiBody?.place_name === SAMPLE_PAYLOAD.place);
  check("C4: API payload parses lat to a float", apiBody?.lat === 19.076);
  check("C5: API payload parses lng to a float", apiBody?.lng === 72.8777);
  check("C6: API payload preserves fixed timezone/ayanamsa", apiBody?.timezone === "+05:30" && apiBody?.ayanamsa === "Lahiri");
  check("C7: API payload preserves name/dob/tob/language unchanged", apiBody?.name === SAMPLE_PAYLOAD.name && apiBody?.dob === SAMPLE_PAYLOAD.dob && apiBody?.tob === SAMPLE_PAYLOAD.tob && apiBody?.language === SAMPLE_PAYLOAD.language);
}

// ===========================================================================
// D. Missing/invalid rid -- backend must not be called
// ===========================================================================
console.log("\n=== D. missing/invalid rid ===");
{
  const storage = new FakeStorage();
  check("D1: null rid resolves to null", resolveFreeKundaliPayload(null, storage) === null);
  check("D2: undefined rid resolves to null", resolveFreeKundaliPayload(undefined, storage) === null);
  check("D3: empty-string rid resolves to null", resolveFreeKundaliPayload("", storage) === null);
  check("D4: rid with unsafe characters resolves to null", resolveFreeKundaliPayload("not a valid rid!", storage) === null);
  check("D5: too-short rid resolves to null", resolveFreeKundaliPayload("short", storage) === null);
  check("D6: isValidRid rejects a UUID-unsafe string directly", !isValidRid("<script>alert(1)</script>"));
}

// ===========================================================================
// E. Missing/malformed sessionStorage entry -- no crash, safe null
// ===========================================================================
console.log("\n=== E. missing/malformed storage entry ===");
{
  const storage = new FakeStorage();
  const rid = generateFreeKundaliRid();
  // No entry stored at all for this rid.
  check("E1: valid rid with no stored entry resolves to null", resolveFreeKundaliPayload(rid, storage) === null);

  check("E2: malformed JSON never throws, resolves to null", parseFreeKundaliPayload("{not valid json") === null);
  check("E3: valid JSON missing required fields resolves to null", parseFreeKundaliPayload(JSON.stringify({ name: "x" })) === null);
  check(
    "E4: valid JSON with an empty-string required field resolves to null",
    parseFreeKundaliPayload(JSON.stringify({ ...SAMPLE_PAYLOAD, name: "" })) === null
  );
  check("E5: isValidFreeKundaliPayload rejects a non-object", !isValidFreeKundaliPayload("just a string"));
  check("E6: isValidFreeKundaliPayload rejects null", !isValidFreeKundaliPayload(null));
}

// ===========================================================================
// F. Refresh semantics -- same rid resolves repeatedly, entry never deleted
// ===========================================================================
console.log("\n=== F. refresh semantics (repeated resolve, no deletion) ===");
{
  const storage = new FakeStorage();
  const rid = generateFreeKundaliRid();
  const key = buildFreeKundaliStorageKey(rid);
  storage.setItem(key, serializeFreeKundaliPayload(SAMPLE_PAYLOAD));

  const first = resolveFreeKundaliPayload(rid, storage);
  const second = resolveFreeKundaliPayload(rid, storage);
  check("F1: first resolve succeeds", first !== null);
  check("F2: second resolve (simulated refresh) also succeeds", second !== null);
  check("F3: both resolves return equal payload content", JSON.stringify(first) === JSON.stringify(second));
  check("F4: entry is still present in storage after two resolves", storage.getItem(key) !== null);
}

// ===========================================================================
// G. English and Hindi route construction
// ===========================================================================
console.log("\n=== G. English/Hindi route construction ===");
{
  const rid = generateFreeKundaliRid();
  const enPath = buildFreeKundaliResultPath(false, rid);
  const hiPath = buildFreeKundaliResultPath(true, rid);
  check("G1: English path has no locale prefix", enPath.startsWith("/free-kundali/free-birthchart-result/?rid="));
  check("G2: Hindi path is prefixed with /hi", hiPath.startsWith("/hi/free-kundali/free-birthchart-result/?rid="));
  check("G3: both carry the same rid", enPath.endsWith(`rid=${rid}`) && hiPath.endsWith(`rid=${rid}`));
}

// ===========================================================================
// H. Multi-request/multi-tab safety -- separate submissions, separate keys
// ===========================================================================
console.log("\n=== H. multi-request/multi-tab isolation ===");
{
  const storage = new FakeStorage();
  const rid1 = generateFreeKundaliRid();
  const rid2 = generateFreeKundaliRid();
  const payload1: FreeKundaliPayload = { ...SAMPLE_PAYLOAD, name: "User One" };
  const payload2: FreeKundaliPayload = { ...SAMPLE_PAYLOAD, name: "User Two" };

  storage.setItem(buildFreeKundaliStorageKey(rid1), serializeFreeKundaliPayload(payload1));
  storage.setItem(buildFreeKundaliStorageKey(rid2), serializeFreeKundaliPayload(payload2));

  check("H1: storage keys for two rids differ", buildFreeKundaliStorageKey(rid1) !== buildFreeKundaliStorageKey(rid2));
  const resolved1 = resolveFreeKundaliPayload(rid1, storage);
  const resolved2 = resolveFreeKundaliPayload(rid2, storage);
  check("H2: rid1 resolves to payload1, not payload2", resolved1?.name === "User One");
  check("H3: rid2 resolves to payload2, not payload1", resolved2?.name === "User Two");
}

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("==================================================");
if (failed > 0) process.exit(1);
