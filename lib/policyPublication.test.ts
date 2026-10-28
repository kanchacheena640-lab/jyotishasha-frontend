/** F10-P18: policy effective dates come only from the hand-entered
 * publication record in lib/policyPublication.ts, never from the build date,
 * and a policy's text cannot change without that record being updated.
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/policyPublication.test.ts
 *   node .ts-test-out/policyPublication.test.js
 * (then remove .ts-test-out/ -- build output, never committed.)
 * When git and origin/main are available it also reports, without failing,
 * each policy whose text differs from production but has no effective date
 * recorded yet -- a release blocker for that text.
 */
import * as fs from "fs";
import * as vm from "vm";
import * as crypto from "crypto";
import * as assert from "assert";
import * as ts from "typescript";
import { execFileSync } from "child_process";
import { POLICY_FILES, POLICY_PUBLICATION, formatEffectiveDate, type PolicyKey } from "./policyPublication";

let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}

/** Same normalisation for the working tree and origin/main: drop the
 * effective-date lines, collapse whitespace (CRLF/LF neutral). */
function fingerprintOf(source: string): string {
  const text = source.split(/\r?\n/).filter((line) => !line.includes("PolicyEffectiveDate")).join(" ").replace(/\s+/g, " ").trim();
  return crypto.createHash("sha256").update(text, "utf8").digest("hex");
}
/** Shared legal blocks rendered inside a policy are part of its text: a page
 * that renders <GrievanceOfficer /> also covers that component and its data. */
const SHARED_BLOCKS: Array<{ tag: string; files: string[] }> = [
  { tag: "<GrievanceOfficer", files: ["components/legal/GrievanceOfficer.tsx", "lib/legalContacts.ts"] },
];
function policySource(file: string, readFile: (p: string) => string): string {
  const page = readFile(file);
  return [page, ...SHARED_BLOCKS.filter((b) => page.includes(b.tag)).flatMap((b) => b.files.map(readFile))].join("\n");
}
const readWorking = (p: string) => fs.readFileSync(p, "utf8");
const keys = Object.keys(POLICY_FILES) as PolicyKey[];
const todayIst = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);

check("each policy page renders <PolicyEffectiveDate> directly under its H1", () => {
  for (const key of keys) {
    const src = fs.readFileSync(POLICY_FILES[key], "utf8");
    assert.ok(new RegExp(`</h1>\\s*<PolicyEffectiveDate policy="${key}" />`).test(src), `${key}: date slot missing or misplaced`);
  }
});
check("no date is derived from the build: the component and record never read the clock or git", () => {
  for (const file of ["lib/policyPublication.ts", "components/legal/PolicyEffectiveDate.tsx"]) {
    const src = fs.readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");
    assert.ok(!/new Date\(\)|Date\.now|process\.env|execSync|child_process|mtime/.test(src), `${file} must not use build-time dates`);
  }
});
check("recorded dates are real calendar dates and not in the future (IST)", () => {
  for (const key of keys) {
    const { effectiveDate } = POLICY_PUBLICATION[key];
    if (effectiveDate === null) continue;
    assert.ok(formatEffectiveDate(effectiveDate), `${key}: ${effectiveDate} is not a valid YYYY-MM-DD date`);
    assert.ok(effectiveDate <= todayIst, `${key}: ${effectiveDate} is after today (${todayIst}) -- record the actual publication date`);
  }
});
check("formatEffectiveDate: valid ISO dates only", () => {
  assert.equal(formatEffectiveDate("2026-10-25"), "25 October 2026");
  assert.equal(formatEffectiveDate("2027-01-05"), "5 January 2027");
  for (const bad of [null, "", "2026-02-30", "2026-13-01", "25-10-2026", "2026-10-25T00:00:00Z"]) assert.equal(formatEffectiveDate(bad), null, String(bad));
});
check("shared legal blocks count as policy text (editing GrievanceOfficer changes the fingerprint)", () => {
  const original = policySource(POLICY_FILES.privacy, readWorking);
  const altered = policySource(POLICY_FILES.privacy, (p) => (p.endsWith("GrievanceOfficer.tsx") ? readWorking(p).replace("48 hours", "72 hours") : readWorking(p)));
  assert.notEqual(fingerprintOf(original), fingerprintOf(altered));
});
check("policy text has not changed since its publication record was updated (fingerprints match)", () => {
  const stale = keys.filter((key) => fingerprintOf(policySource(POLICY_FILES[key], readWorking)) !== POLICY_PUBLICATION[key].fingerprint);
  for (const key of stale) console.log(`  ${key}: fingerprint should be "${fingerprintOf(policySource(POLICY_FILES[key], readWorking))}"`);
  assert.deepEqual(stale, [], "policy text changed: update fingerprint AND set effectiveDate to the real publication date (lib/policyPublication.ts)");
});

// Render the real component with a stubbed record.
const componentCode = ts.transpileModule(fs.readFileSync("components/legal/PolicyEffectiveDate.tsx", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
function renderWith(effectiveDate: string | null) {
  const exports: Record<string, any> = {};
  vm.runInNewContext(componentCode, {
    exports,
    require: (name: string) => {
      if (name === "react/jsx-runtime") return { jsx: (type: any, props: any) => ({ type, props }), jsxs: (type: any, props: any) => ({ type, props }) };
      if (name === "@/lib/policyPublication") return { POLICY_PUBLICATION: { privacy: { effectiveDate, fingerprint: "x" } }, formatEffectiveDate };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return exports.default({ policy: "privacy" });
}
check("component: no recorded date -> renders nothing", () => {
  assert.equal(renderWith(null), null);
});
check("component: recorded date -> 'Effective date: 25 October 2026'", () => {
  const node = renderWith("2026-10-25");
  assert.equal(node.type, "p");
  assert.deepEqual(node.props.children, ["Effective date: ", "25 October 2026"]);
});

// Release readiness (informational): compare with production's text.
try {
  for (const key of keys) {
    const readProd = (p: string) => {
      try { return execFileSync("git", ["show", `origin/main:${p}`], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }); } catch { return ""; }
    };
    if (!readProd(POLICY_FILES[key])) throw new Error("origin/main unavailable");
    const changed = fingerprintOf(policySource(POLICY_FILES[key], readProd)) !== POLICY_PUBLICATION[key].fingerprint;
    const date = POLICY_PUBLICATION[key].effectiveDate;
    console.log(changed && date === null
      ? `RELEASE BLOCKER: ${key} text differs from origin/main but no effectiveDate is recorded`
      : `release check: ${key} ${changed ? `changed, effective ${date}` : "unchanged from origin/main"}`);
  }
} catch {
  console.log("release check skipped: origin/main not available");
}
console.log(`TOTAL: ${passed} passed, 0 failed`);
