import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import { execFileSync } from "child_process";
import { formatCalendarDob } from "./formatCalendarDob";

const repo = process.cwd();
const checkout = fs.readFileSync(path.join(repo, "components/reports/ReportCheckout.tsx"), "utf8");
const relationship = fs.readFileSync(path.join(repo, "app/[locale]/love/report/relationship_future_report/RelationshipFutureReportForm.tsx"), "utf8");
const freeTool = fs.readFileSync(path.join(repo, "components/ToolInputForm.tsx"), "utf8");
const helper = path.join(__dirname, "formatCalendarDob.js");

function check(label: string, test: () => void) {
  test();
  console.log(`PASS: ${label}`);
}

for (const [zone, input, expected] of [
  ["Asia/Kolkata", "1990-11-03", "1990-11-03"],
  ["Asia/Kolkata", "1990-01-01", "1990-01-01"],
  ["UTC", "1990-11-03", "1990-11-03"],
  ["America/Los_Angeles", "1990-11-03", "1990-11-03"],
] as const) {
  check(`${zone}: ${input} stays ${expected}`, () => {
    const actual = execFileSync(process.execPath, ["-e",
      `const {formatCalendarDob}=require(${JSON.stringify(helper)}); process.stdout.write(formatCalendarDob(new Date(${JSON.stringify(input + "T00:00:00")})));`,
    ], { env: { ...process.env, TZ: zone }, encoding: "utf8" });
    assert.strictEqual(actual, expected);
  });
}

check("standard checkout stores formatted DOB and sends that state in order request", () => {
  assert.match(checkout, /const formatted = formatCalendarDob\(date\);\s*setForm\(prev => \(\{ \.\.\.prev, dob: formatted \}\)\)/);
  assert.match(checkout, /fetch\(`\$\{base\}\/api\/razorpay-order`[\s\S]*?body: JSON\.stringify\(\{[\s\S]*?dob: form\.dob,/);
  assert.strictEqual(JSON.parse(JSON.stringify({ dob: formatCalendarDob(new Date(1990, 10, 3)) })).dob, "1990-11-03");
  assert.doesNotMatch(checkout, /date\.toISOString\(\)\.split\(['"]T['"]\)\[0\]/);
});

check("relationship primary and partner DOB still use native date values", () => {
  assert.match(relationship, /value=\{form\.boy\.dob\} onChange=\{\(e\) => update\("boy", "dob", e\.target\.value\)\}/);
  assert.match(relationship, /value=\{form\.girl\.dob\} onChange=\{\(e\) => update\("girl", "dob", e\.target\.value\)\}/);
  assert.match(relationship, /dob: form\.boy\.dob,/);
  assert.match(relationship, /dob: form\.girl\.dob,/);
});

check("free Kundali retains its local-calendar conversion", () => {
  assert.match(freeTool, /Date\.UTC\(d\.getFullYear\(\), d\.getMonth\(\), d\.getDate\(\)\)/);
  assert.match(freeTool, /onChange=\{\(date: Date \| null\) => setDob\(date \? toISODate\(date\) : ''\)\}/);
});
