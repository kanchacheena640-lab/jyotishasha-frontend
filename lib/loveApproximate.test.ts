/**
 * Free love-match result: approximate-score warning (Ashtakoot Phase 1B).
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule --esModuleInterop \
 *     --jsx react-jsx --outDir .ts-test-out lib/loveApproximate.test.ts
 *   node .ts-test-out/lib/loveApproximate.test.js
 */
import * as fs from "fs";
import * as path from "path";
import { LOVE_APPROXIMATE_COPY, loveScorePrecision } from "./loveApproximate";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean) {
  if (ok) { passed += 1; console.log(`  PASS: ${label}`); } else { failed += 1; console.log(`  FAIL: ${label}`); }
}

const ROOT = (() => {
  let dir = __dirname;
  while (!fs.existsSync(path.join(dir, "package.json")) && path.dirname(dir) !== dir) dir = path.dirname(dir);
  return dir;
})();

const full = { partner: { name: "SYNTHETIC Girl", dob: "1996-11-02", tob: "17:45" } };
const noTime = { partner: { name: "SYNTHETIC Girl", dob: "1996-11-02", tob: "" } };

console.log("1. Backend flags (actual /api/love/report contract)");
check("ashtakoot.approximate true -> approximate", loveScorePrecision({ ashtakoot: { approximate: true }, verdict: { approximate: true } }, full) === "approximate");
check("only verdict.approximate true -> approximate", loveScorePrecision({ ashtakoot: {}, verdict: { approximate: true } }, full) === "approximate");
check("both false -> precise (no warning)", loveScorePrecision({ ashtakoot: { approximate: false }, verdict: { approximate: false } }, full) === "precise");
check("backend false wins over a blank payload time (backend is authoritative)",
  loveScorePrecision({ ashtakoot: { approximate: false }, verdict: { approximate: false } }, noTime) === "precise");
check("truthy non-boolean values are not trusted", loveScorePrecision({ ashtakoot: { approximate: "yes" } }, full) === "unknown");

console.log("2. Older backend without the flags");
check("partner time blank -> approximate", loveScorePrecision({ ashtakoot: { total_score: 22.5 } }, noTime) === "approximate");
check("partner time whitespace -> approximate", loveScorePrecision({}, { partner: { tob: "  " } }) === "approximate");
check("partner time present -> unknown (no warning, no precision claim)", loveScorePrecision({ ashtakoot: { total_score: 30 } }, full) === "unknown");
check("no payload at all -> unknown", loveScorePrecision({}, null) === "unknown");
check("garbage summary/payload -> unknown, never throws", loveScorePrecision("x", 42) === "unknown" && loveScorePrecision(null, undefined) === "unknown");

console.log("3. Copy and wiring");
check("EN and HI copy present", LOVE_APPROXIMATE_COPY.en.badge.length > 0 && LOVE_APPROXIMATE_COPY.hi.badge.length > 0 &&
  /[ऀ-ॿ]/.test(LOVE_APPROXIMATE_COPY.hi.reason) && /estimate/.test(LOVE_APPROXIMATE_COPY.en.reason));
const tile = fs.readFileSync(path.join(ROOT, "app/[locale]/love/result/LoveResultSummaryDetail.tsx"), "utf8");
check("result summary reads both stored items and uses the helper",
  tile.includes('sessionStorage.getItem("love_payload")') && tile.includes("loveScorePrecision(summary, payload)"));
check("warning renders only for the approximate state", /precision === "approximate" && \(/.test(tile));
check("warning sits inside the score tile (before the Mangal Dosh tile)",
  tile.indexOf("LOVE_APPROXIMATE_COPY") > 0 && tile.indexOf('data-testid="love-score-approximate"') < tile.indexOf("2. Mangal Dosh Tile"));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
