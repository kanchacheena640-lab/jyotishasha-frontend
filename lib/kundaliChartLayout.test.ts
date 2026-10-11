/**
 * North Indian chart planet-label spacing (lib/kundaliChartLayout.ts, used by components/KundaliChartNorth.tsx).
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule --esModuleInterop \
 *     --jsx react-jsx --outDir .ts-test-out lib/kundaliChartLayout.test.ts
 *   node .ts-test-out/lib/kundaliChartLayout.test.js
 */
import * as fs from "fs";
import * as path from "path";
import {
  HOUSE_POLYGONS, LABEL_FONT_SIZES, LINE_MARGIN, NUMBER_GAP, RASHI_NUMBER_POS,
  boxClearance, boxGap, labelBox, layoutHouseLabels, polygonEdges, rashiNumberBox,
} from "./kundaliChartLayout";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean, extra?: unknown) {
  if (ok) { passed += 1; console.log(`  PASS: ${label}`); } else { failed += 1; console.log(`  FAIL: ${label}${extra !== undefined ? "  " + JSON.stringify(extra) : ""}`); }
}
const ROOT = (() => {
  let dir = __dirname;
  while (!fs.existsSync(path.join(dir, "package.json")) && path.dirname(dir) !== dir) dir = path.dirname(dir);
  return dir;
})();
const EPS = 1e-6;

console.log("1. Geometry");
for (let h = 1; h <= 12; h++) {
  const edges = polygonEdges(HOUSE_POLYGONS[h]);
  // The number keeps its original position; its real glyphs ("12" at 14px: ~15.6 x 10) must stay off the lines.
  // (rashiNumberBox is deliberately larger: it is the area planet labels keep clear of.)
  const p = RASHI_NUMBER_POS[h];
  const glyph = { x0: p.x - 7.8, y0: p.y - 5.1, x1: p.x + 7.8, y1: p.y + 5.1 };
  check(`house ${h}: rashi number glyphs sit inside the house, at least 3px off the lines`, boxClearance(glyph, edges) >= 3, boxClearance(glyph, edges));
}
// The 12 regions tile the square exactly (sum of areas = 400 x 400).
const area = (p: { x: number; y: number }[]) => Math.abs(p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a.x * b.y - b.x * a.y; }, 0)) / 2;
check("12 house polygons tile the 400x400 square", Math.abs(Object.values(HOUSE_POLYGONS).reduce((s, p) => s + area(p), 0) - 160000) < EPS);

console.log("2. Every house, 0-9 planets: inside its own area, clear of lines, number and each other");
const fonts: Record<number, number[]> = {};
for (let h = 1; h <= 12; h++) {
  const edges = polygonEdges(HOUSE_POLYGONS[h]);
  const num = rashiNumberBox(h);
  fonts[h] = [];
  for (let n = 0; n <= 9; n++) {
    const { fontSize: f, slots } = layoutHouseLabels(h, n);
    fonts[h].push(n ? f : 0);
    const boxes = slots.map((s) => labelBox(s, f));
    const problems: string[] = [];
    if (slots.length !== n) problems.push(`slots ${slots.length}`);
    if (n && f < LABEL_FONT_SIZES[LABEL_FONT_SIZES.length - 1]) problems.push(`font ${f}`);
    boxes.forEach((b, i) => {
      const c = boxClearance(b, edges);
      if (c < LINE_MARGIN - EPS) problems.push(`label ${i} line clearance ${c.toFixed(2)}`);
      const g = boxGap(b, num);
      if (g < NUMBER_GAP - EPS) problems.push(`label ${i} number gap ${g.toFixed(2)}`);
      for (let j = i + 1; j < boxes.length; j++) {
        const gg = boxGap(b, boxes[j]);
        if (gg < 2 - EPS) problems.push(`labels ${i}/${j} gap ${gg.toFixed(2)}`);
      }
      // Never reaches another house's number either.
      for (let o = 1; o <= 12; o++) if (o !== h && boxGap(b, rashiNumberBox(o)) < NUMBER_GAP - EPS) problems.push(`label ${i} hits number of house ${o}`);
    });
    const again = layoutHouseLabels(h, n);
    if (JSON.stringify(again) !== JSON.stringify({ fontSize: f, slots })) problems.push("not deterministic");
    check(`house ${h}, ${n} planet(s)${n ? ` @ ${f}px` : ""}`, problems.length === 0, problems);
  }
}

console.log("3. Full chart: all nine grahas spread across houses, no label touches any other label or number");
{
  // A realistic spread plus worst cases: every house filled at once (pairs) to check neighbours never collide.
  const all: Array<{ b: ReturnType<typeof labelBox>; h: number }> = [];
  for (let h = 1; h <= 12; h++) {
    const { fontSize: f, slots } = layoutHouseLabels(h, 9);
    slots.forEach((s) => all.push({ b: labelBox(s, f), h }));
  }
  let worst = Infinity;
  for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) if (all[i].h !== all[j].h) worst = Math.min(worst, boxGap(all[i].b, all[j].b));
  check("9 planets in every house simultaneously: labels of different houses never overlap", worst > 0, worst);
}

console.log("4. Wiring");
const src = fs.readFileSync(path.join(ROOT, "components/KundaliChartNorth.tsx"), "utf8");
check("chart uses the layout module for every house", src.includes("layoutHouseLabels(house, hp.length)") && src.includes("RASHI_NUMBER_POS"));
check("one <text> per planet (no comma-joined line that can run across lines)", !src.includes('hp.join(", ")'));
check("rashi number stays the first text in each house group (transit page styling relies on it)",
  src.indexOf("{rashi}") > 0 && src.indexOf("{rashi}") < src.indexOf("{abbr}"));
check("chart lines unchanged", ["x2={BASE} y2={BASE}", "x1={BASE} y1=\"0\" x2=\"0\" y2={BASE}", "x1={CENTER} y1=\"0\" x2=\"0\" y2={CENTER}",
  "x1=\"0\" y1={CENTER} x2={CENTER} y2={BASE}", "x1={CENTER} y1={BASE} x2={BASE} y2={CENTER}", "x1={BASE} y1={CENTER} x2={CENTER} y2=\"0\""].every((l) => src.includes(l)));
check("rashi numbers keep their original positions", RASHI_NUMBER_POS[1].y === 155 && RASHI_NUMBER_POS[4].x === 160 && RASHI_NUMBER_POS[9].x === 330 && RASHI_NUMBER_POS[12].y === 80);

console.log("\nFont size per house for 1..9 planets:");
for (let h = 1; h <= 12; h++) console.log(`  house ${String(h).padStart(2)}: ${fonts[h].slice(1).join(" ")}`);
console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
