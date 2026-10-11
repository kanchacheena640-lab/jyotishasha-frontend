/**
 * Planet-label layout for the North Indian chart (components/KundaliChartNorth.tsx).
 *
 * Pure geometry, no DOM: every house is the exact polygon drawn by the chart's lines (400x400 viewBox). Each
 * house has a reserved rashi-number box (the number keeps its existing position) and a planet area: labels
 * are placed in rows that keep a minimum gap from every chart line, from the number box and from each other.
 * The font only shrinks when a house cannot hold its planets at the normal size.
 */

export type Point = { x: number; y: number };
export type Box = { x0: number; y0: number; x1: number; y1: number };
export type LabelSlot = { x: number; y: number };
export type HouseLabelLayout = { fontSize: number; slots: LabelSlot[] };

export const CHART_BASE = 400;
const C = CHART_BASE / 2;

/** Exact house regions formed by the outer square, both diagonals and the inner diamond. */
export const HOUSE_POLYGONS: Record<number, Point[]> = {
  1: [{ x: 200, y: 0 }, { x: 300, y: 100 }, { x: 200, y: 200 }, { x: 100, y: 100 }],
  2: [{ x: 0, y: 0 }, { x: 200, y: 0 }, { x: 100, y: 100 }],
  3: [{ x: 0, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 200 }],
  4: [{ x: 0, y: 200 }, { x: 100, y: 100 }, { x: 200, y: 200 }, { x: 100, y: 300 }],
  5: [{ x: 0, y: 200 }, { x: 100, y: 300 }, { x: 0, y: 400 }],
  6: [{ x: 0, y: 400 }, { x: 100, y: 300 }, { x: 200, y: 400 }],
  7: [{ x: 200, y: 200 }, { x: 300, y: 300 }, { x: 200, y: 400 }, { x: 100, y: 300 }],
  8: [{ x: 200, y: 400 }, { x: 300, y: 300 }, { x: 400, y: 400 }],
  9: [{ x: 400, y: 400 }, { x: 300, y: 300 }, { x: 400, y: 200 }],
  10: [{ x: 400, y: 200 }, { x: 300, y: 100 }, { x: 200, y: 200 }, { x: 300, y: 300 }],
  11: [{ x: 400, y: 200 }, { x: 300, y: 100 }, { x: 400, y: 0 }],
  12: [{ x: 400, y: 0 }, { x: 300, y: 100 }, { x: 200, y: 0 }],
};

/** Rashi-number positions (unchanged from the original chart). */
export const RASHI_NUMBER_POS: Record<number, Point> = {
  1: { x: C, y: 155 },
  2: { x: C - 100, y: 80 },
  3: { x: C - 130, y: C - 95 },
  4: { x: C - 40, y: C },
  5: { x: C - 130, y: C + 95 },
  6: { x: C - 100, y: C + 120 },
  7: { x: C, y: C + 50 },
  8: { x: C + 100, y: C + 120 },
  9: { x: C + 130, y: C + 95 },
  10: { x: C + 40, y: C },
  11: { x: C + 130, y: C - 95 },
  12: { x: C + 100, y: 80 },
};

export const RASHI_FONT_SIZE = 14;
export const LABEL_FONT_SIZES = [12, 11, 10, 9, 8, 7];
/** Minimum perpendicular distance between a label and any chart line. */
export const LINE_MARGIN = 5;
/** Minimum distance between a label and the rashi number. */
export const NUMBER_GAP = 5;

// Conservative text extents (bold, upper-case, two letters; never measured in the DOM, so SSR-safe).
export const labelWidth = (f: number) => 1.65 * f;
export const labelHalfHeight = (f: number) => 0.6 * f;
export const labelGapX = (f: number) => Math.max(3, 0.4 * f);
export const labelGapY = (f: number) => Math.max(2, 0.25 * f);

/** Box reserved for the rashi number (sized for two digits). */
export function rashiNumberBox(house: number): Box {
  const p = RASHI_NUMBER_POS[house];
  const hw = 2 * 0.6 * RASHI_FONT_SIZE / 2 + 1;
  const hh = 0.6 * RASHI_FONT_SIZE;
  return { x0: p.x - hw, y0: p.y - hh, x1: p.x + hw, y1: p.y + hh };
}

export function labelBox(slot: LabelSlot, f: number): Box {
  const hw = labelWidth(f) / 2;
  const hh = labelHalfHeight(f);
  return { x0: slot.x - hw, y0: slot.y - hh, x1: slot.x + hw, y1: slot.y + hh };
}

type Edge = { nx: number; ny: number; c: number }; // inward unit normal: nx*x + ny*y + c = distance inside

export function polygonEdges(poly: Point[]): Edge[] {
  const cx = poly.reduce((s, p) => s + p.x, 0) / poly.length;
  const cy = poly.reduce((s, p) => s + p.y, 0) / poly.length;
  return poly.map((a, i) => {
    const b = poly[(i + 1) % poly.length];
    let nx = -(b.y - a.y);
    let ny = b.x - a.x;
    const len = Math.hypot(nx, ny);
    nx /= len; ny /= len;
    let c = -(nx * a.x + ny * a.y);
    if (nx * cx + ny * cy + c < 0) { nx = -nx; ny = -ny; c = -c; }
    return { nx, ny, c };
  });
}

/** Smallest distance from any corner of the box to the polygon's lines (negative = outside). */
export function boxClearance(box: Box, edges: Edge[]): number {
  let min = Infinity;
  for (const e of edges)
    for (const x of [box.x0, box.x1])
      for (const y of [box.y0, box.y1]) min = Math.min(min, e.nx * x + e.ny * y + e.c);
  return min;
}

export function boxGap(a: Box, b: Box): number {
  const dx = Math.max(b.x0 - a.x1, a.x0 - b.x1, 0);
  const dy = Math.max(b.y0 - a.y1, a.y0 - b.y1, 0);
  if (dx === 0 && dy === 0) return -1; // overlapping
  return Math.hypot(dx, dy);
}

/** Horizontal ranges where a label box spanning [y0, y1] keeps its margins from the lines and the number. */
function rowSegments(edges: Edge[], num: Box, y0: number, y1: number): Array<[number, number]> {
  let L = -Infinity;
  let R = Infinity;
  for (const e of edges) {
    for (const y of [y0, y1]) {
      const rest = LINE_MARGIN - e.c - e.ny * y;
      if (Math.abs(e.nx) < 1e-9) { if (rest > 1e-9) return []; continue; }
      if (e.nx > 0) L = Math.max(L, rest / e.nx);
      else R = Math.min(R, rest / e.nx);
    }
  }
  if (!(R > L)) return [];
  const touchesNumber = y1 > num.y0 - NUMBER_GAP && y0 < num.y1 + NUMBER_GAP;
  if (!touchesNumber) return [[L, R]];
  const out: Array<[number, number]> = [];
  if (num.x0 - NUMBER_GAP > L) out.push([L, Math.min(R, num.x0 - NUMBER_GAP)]);
  if (num.x1 + NUMBER_GAP < R) out.push([Math.max(L, num.x1 + NUMBER_GAP), R]);
  return out.filter(([a, b]) => b > a);
}

const fitCount = (width: number, f: number) => Math.max(0, Math.floor((width + labelGapX(f)) / (labelWidth(f) + labelGapX(f))));

function placeRow(segs: Array<[number, number]>, count: number, y: number, f: number): LabelSlot[] {
  const slots: LabelSlot[] = [];
  let left = count;
  // Widest segment first, so a row only spills to the other side of the number when it has to.
  for (const [a, b] of [...segs].sort((p, q) => (q[1] - q[0]) - (p[1] - p[0]))) {
    const n = Math.min(left, fitCount(b - a, f));
    if (n <= 0) continue;
    const total = n * labelWidth(f) + (n - 1) * labelGapX(f);
    let x = (a + b) / 2 - total / 2 + labelWidth(f) / 2;
    for (let i = 0; i < n; i++, x += labelWidth(f) + labelGapX(f)) slots.push({ x, y });
    left -= n;
    if (!left) break;
  }
  return slots;
}

function tryLayout(house: number, count: number, f: number): LabelSlot[] | null {
  const poly = HOUSE_POLYGONS[house];
  const edges = polygonEdges(poly);
  const num = rashiNumberBox(house);
  const cx = poly.reduce((s, p) => s + p.x, 0) / poly.length;
  const cy = poly.reduce((s, p) => s + p.y, 0) / poly.length;
  const minY = Math.min(...poly.map((p) => p.y));
  const maxY = Math.max(...poly.map((p) => p.y));
  const hh = labelHalfHeight(f);
  const pitch = 2 * hh + labelGapY(f);

  for (let rows = 1; rows <= count; rows++) {
    let best: { slots: LabelSlot[]; score: number } | null = null;
    for (let top = minY; top + rows * pitch - labelGapY(f) <= maxY; top += 1) {
      const rowInfo = [];
      let capacity = 0;
      for (let i = 0; i < rows; i++) {
        const yc = top + hh + i * pitch;
        const segs = rowSegments(edges, num, yc - hh, yc + hh);
        const cap = segs.reduce((s, [a, b]) => s + fitCount(b - a, f), 0);
        rowInfo.push({ yc, segs, cap });
        capacity += cap;
      }
      if (capacity < count || rowInfo.some((r) => r.cap === 0)) continue;
      // Balanced counts per row, within each row's capacity.
      const per = rowInfo.map(() => 0);
      let left = count;
      for (let i = 0; i < rows; i++) { per[i] = Math.min(rowInfo[i].cap, Math.ceil(left / (rows - i))); left -= per[i]; }
      for (let i = 0; i < rows && left > 0; i++) { const add = Math.min(left, rowInfo[i].cap - per[i]); per[i] += add; left -= add; }
      if (per.some((n) => n === 0)) continue;
      const slots = rowInfo.flatMap((r, i) => placeRow(r.segs, per[i], r.yc, f));
      if (slots.length !== count) continue;
      const mx = slots.reduce((s, p) => s + p.x, 0) / count;
      const my = slots.reduce((s, p) => s + p.y, 0) / count;
      const score = Math.hypot(mx - cx, my - cy);
      if (!best || score < best.score) best = { slots, score };
    }
    if (best) return best.slots;
  }
  return null;
}

const cache = new Map<string, HouseLabelLayout>();

/** Label positions for `count` planets in `house` (1..12). Same result for the same house and count. */
export function layoutHouseLabels(house: number, count: number): HouseLabelLayout {
  if (count <= 0 || !HOUSE_POLYGONS[house]) return { fontSize: LABEL_FONT_SIZES[0], slots: [] };
  const key = `${house}:${count}`;
  const hit = cache.get(key);
  if (hit) return hit;
  let result: HouseLabelLayout | null = null;
  for (const f of LABEL_FONT_SIZES) {
    const slots = tryLayout(house, count, f);
    if (slots) { result = { fontSize: f, slots }; break; }
  }
  if (!result) {
    // Beyond what a house can hold (more than the nine grahas, e.g. natal + transit): smallest size, plain grid
    // around the house centre. Never throws; may crowd.
    const f = LABEL_FONT_SIZES[LABEL_FONT_SIZES.length - 1];
    const poly = HOUSE_POLYGONS[house];
    const cx = poly.reduce((s, p) => s + p.x, 0) / poly.length;
    const cy = poly.reduce((s, p) => s + p.y, 0) / poly.length;
    const perRow = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / perRow);
    const stepX = labelWidth(f) + labelGapX(f);
    const stepY = 2 * labelHalfHeight(f) + labelGapY(f);
    const slots: LabelSlot[] = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(i / perRow);
      const inRow = Math.min(perRow, count - r * perRow);
      slots.push({ x: cx + ((i % perRow) - (inRow - 1) / 2) * stepX, y: cy + (r - (rows - 1) / 2) * stepY });
    }
    result = { fontSize: f, slots };
  }
  cache.set(key, result);
  return result;
}
