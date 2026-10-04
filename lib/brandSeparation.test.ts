/**
 * lib/brandSeparation.test.ts
 *
 * Brand separation guard -- Jyotishasha and the separate sister brand
 * (needle below) are different products. Fails if the other brand's name appears (case-insensitive, byte-level,
 * so images/PDFs/fonts are covered too) anywhere in what ships on the
 * Jyotishasha website: app routes, components, lib, public assets and
 * root config/middleware. node_modules, .next and other tooling output
 * are deliberately out of scope.
 *
 * Run (repo convention for standalone tests):
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/brandSeparation.test.ts
 *   node .ts-test-out/brandSeparation.test.js
 */
import * as fs from "fs";
import * as path from "path";

// Built from parts so this guard file can never match itself.
const needle = ["staa", "rae"].join("");

const repo = path.resolve(__dirname, "..");
const root = fs.existsSync(path.join(repo, "app")) ? repo : path.resolve(repo, "..");

const shippedRoots = ["app", "components", "lib", "public", "middleware.ts", "next.config.js"];
const skipDirs = new Set(["node_modules", ".next", ".git", ".ts-test-out"]);

function walk(target: string, out: string[]): void {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    out.push(target);
    return;
  }
  for (const entry of fs.readdirSync(target)) {
    if (skipDirs.has(entry)) continue;
    walk(path.join(target, entry), out);
  }
}

const files: string[] = [];
for (const r of shippedRoots) walk(path.join(root, r), files);

const offenders = files.filter((f) => fs.readFileSync(f).toString("latin1").toLowerCase().includes(needle));

console.log(`Scanned ${files.length} shipped website files.`);
if (offenders.length > 0) {
  console.log(`  FAIL: other-brand reference found in:\n    ${offenders.map((f) => path.relative(root, f)).join("\n    ")}`);
  console.log("RESULT: 0 passed, 1 failed");
  process.exit(1);
}
console.log("  PASS: no other-brand references in shipped website files");
console.log("RESULT: 1 passed, 0 failed");
