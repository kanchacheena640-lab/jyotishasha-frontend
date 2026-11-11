/**
 * GSC Soft 404 fix for /panchang/pradosh (EN + HI): the URL answers a genuine 404 through its own static route, the
 * "Pradosh Vrat" links point at the Trayodashi tithi page that covers Pradosh Vrat, and general /panchang/[date]
 * parsing is unchanged. Source-level, no network.
 * Run: node_modules/.bin/tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule \
 *        --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/pradoshSoft404.test.ts && node <compiled pradoshSoft404.test.js>
 */
import * as fs from "fs";
import * as path from "path";
import { resolveDate } from "./panchang/resolveDate";
import { tithiSeoContent } from "../app/data/tithiSeoContent";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

const route = src("app/[locale]/panchang/pradosh/page.tsx");
const events = src("components/panchang/ImportantEvents.tsx");
const dateRoute = src("app/[locale]/panchang/[date]/page.tsx");

check("dedicated /panchang/pradosh route answers notFound() (static segment wins over [date])",
  /import \{ notFound \} from "next\/navigation";/.test(route) && /notFound\(\);/.test(route) &&
  !/PanchangClient|resolveDate/.test(route.split("\n").filter((l) => !/^\s*\/\//.test(l)).join("\n")));
check("no link to /panchang/pradosh remains", !events.includes("/panchang/pradosh"));
check("EN and HI Pradosh links point at /panchang/tithi/trayodashi (with the locale prefix)",
  events.includes('{ title: "Pradosh Vrat", href: `${prefix}/panchang/tithi/trayodashi` }') &&
  events.includes('{ title: "प्रदोष व्रत", href: `${prefix}/panchang/tithi/trayodashi` }'));
const tray = JSON.stringify((tithiSeoContent as Record<string, unknown>).trayodashi ?? "");
check("the Trayodashi page exists and covers Pradosh Vrat in EN and HI", tray.includes("Pradosh Vrat") && tray.includes("प्रदोष व्रत"));
check("other Important Events links unchanged",
  events.includes("`${prefix}/ekadashi`") && events.includes("`${prefix}/panchang/amavasya`") && events.includes("`${prefix}/panchang/purnima`"));
check("[date] route and resolveDate unchanged in behaviour",
  dateRoute.includes("const resolvedDate = resolveDate(date);") && resolveDate("2026-11-11") === "2026-11-11" &&
  resolveDate("11-11-2026") === "2026-11-11" && /^\d{4}-\d{2}-\d{2}$/.test(resolveDate("today")));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
