// Standalone test convention used by lib/*.test.ts; compile with tsc, then run with Node.
import { strict as assert } from "node:assert";
import test from "node:test";
import {
  RevenueApiError,
  computeDateRange,
  isValidCustomRange,
  formatRupees,
  getRevenueSummary,
  getRevenueOrders,
  ALL_SOURCES,
  SOURCE_LABELS,
  PLATFORM_LABELS,
} from "./revenueApi";

function setFetch(impl: typeof fetch) {
  (globalThis as unknown as { fetch: typeof fetch }).fetch = impl;
}

function mockFetchOnce(status: number, body: unknown) {
  const calls: { url: string; init?: RequestInit }[] = [];
  setFetch(async (url, init) => {
    calls.push({ url: String(url), init });
    return { ok: status >= 200 && status < 300, status, json: async () => body } as Response;
  });
  return calls;
}

function todayParts(): { y: number; m: number; d: number } {
  const t = new Date();
  return { y: t.getFullYear(), m: t.getMonth() + 1, d: t.getDate() };
}
function pad(n: number): string {
  return String(n).padStart(2, "0");
}

// --- computeDateRange (calendar-day presets, never charts/spend math) --

test("computeDateRange('today') is a single-day range equal to the local calendar date", () => {
  const { y, m, d } = todayParts();
  const expected = `${y}-${pad(m)}-${pad(d)}`;
  const r = computeDateRange("today");
  assert.equal(r.start, expected);
  assert.equal(r.end, expected);
});

test("computeDateRange('7d') spans exactly 7 calendar days inclusive (start..today)", () => {
  const r = computeDateRange("7d");
  const days = (new Date(`${r.end}T00:00:00`).getTime() - new Date(`${r.start}T00:00:00`).getTime()) / (24 * 60 * 60 * 1000);
  assert.equal(days, 6); // 7 inclusive days = 6 days apart
  const { y, m, d } = todayParts();
  assert.equal(r.end, `${y}-${pad(m)}-${pad(d)}`);
});

test("computeDateRange('30d') spans exactly 30 calendar days inclusive", () => {
  const r = computeDateRange("30d");
  const days = (new Date(`${r.end}T00:00:00`).getTime() - new Date(`${r.start}T00:00:00`).getTime()) / (24 * 60 * 60 * 1000);
  assert.equal(days, 29);
});

test("computeDateRange('this_month') starts on the 1st of the current local month and ends today", () => {
  const r = computeDateRange("this_month");
  const { y, m, d } = todayParts();
  assert.equal(r.start, `${y}-${pad(m)}-01`);
  assert.equal(r.end, `${y}-${pad(m)}-${pad(d)}`);
});

test("computeDateRange('custom') with both dates returns them verbatim", () => {
  const r = computeDateRange("custom", "2026-01-05", "2026-01-20");
  assert.deepEqual(r, { start: "2026-01-05", end: "2026-01-20" });
});

test("computeDateRange('custom') with no dates yet never throws (defaults to a real, well-formed range)", () => {
  const r = computeDateRange("custom");
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(r.start) && /^\d{4}-\d{2}-\d{2}$/.test(r.end));
});

// --- isValidCustomRange (gates the Apply button -- an invalid range must never be submittable) --

test("isValidCustomRange rejects missing, malformed, and inverted ranges", () => {
  assert.equal(isValidCustomRange("", ""), false);
  assert.equal(isValidCustomRange("2026-01-10", ""), false);
  assert.equal(isValidCustomRange("2026/01/10", "2026-01-20"), false);
  assert.equal(isValidCustomRange("2026-01-20", "2026-01-10"), false); // end before start
});

test("isValidCustomRange accepts a well-formed range, including a same-day range", () => {
  assert.equal(isValidCustomRange("2026-01-10", "2026-01-20"), true);
  assert.equal(isValidCustomRange("2026-01-10", "2026-01-10"), true);
});

// --- ₹ formatting -------------------------------------------------------

test("formatRupees uses the ₹ symbol and Indian digit grouping", () => {
  assert.equal(formatRupees(51), "₹51");
  assert.equal(formatRupees(1530), "₹1,530");
  assert.equal(formatRupees(12750), "₹12,750");
  assert.equal(formatRupees(0), "₹0");
});

// --- query construction (platform/date/pagination reach the BFF exactly, nothing recomputed) --

test("getRevenueSummary sends platform/start/end to the BFF proxy path", async () => {
  const calls = mockFetchOnce(200, { kpis: {}, sources: [], metadata: {}, filters: {} });
  await getRevenueSummary("web", { start: "2026-01-01", end: "2026-01-31" });
  assert.equal(calls.length, 1);
  const url = new URL(calls[0].url, "https://x");
  assert.equal(url.pathname, "/api/admin/revenue/summary");
  assert.equal(url.searchParams.get("platform"), "web");
  assert.equal(url.searchParams.get("start"), "2026-01-01");
  assert.equal(url.searchParams.get("end"), "2026-01-31");
});

test("getRevenueOrders sends platform/start/end/page/per_page to the BFF proxy path", async () => {
  const calls = mockFetchOnce(200, { orders: [], pagination: {}, filters: {} });
  await getRevenueOrders("app", { start: "2026-01-01", end: "2026-01-31" }, 3, 25);
  const url = new URL(calls[0].url, "https://x");
  assert.equal(url.pathname, "/api/admin/revenue/orders");
  assert.equal(url.searchParams.get("platform"), "app");
  assert.equal(url.searchParams.get("page"), "3");
  assert.equal(url.searchParams.get("per_page"), "25");
});

// --- error handling: a failed request must never be swallowed into a fake empty/zeroed result --

test("a non-2xx response throws RevenueApiError carrying the backend's own message, never a fabricated success", async () => {
  mockFetchOnce(400, { error: "invalid_filter", message: "platform must be one of ('all', 'web', 'app')." });
  await assert.rejects(
    () => getRevenueSummary("all", { start: "x", end: "y" }),
    (err: unknown) => err instanceof RevenueApiError && err.status === 400 && err.message === "platform must be one of ('all', 'web', 'app')." && err.code === "invalid_filter",
  );
});

test("a network failure (fetch throws) propagates as a rejection, never a silent zero result", async () => {
  setFetch(async () => { throw new Error("network down"); });
  await assert.rejects(() => getRevenueOrders("all", { start: "2026-01-01", end: "2026-01-02" }, 1, 25));
});

// --- display-label mapping: presentation only, always all 4 sources, never reclassification --

test("ALL_SOURCES lists exactly the 4 backend source buckets, always in the same fixed order", () => {
  assert.deepEqual(ALL_SOURCES, ["google_ads", "meta_ads", "organic_direct", "other_unknown"]);
});

test("SOURCE_LABELS maps every backend source key to its exact required display label", () => {
  assert.equal(SOURCE_LABELS.google_ads, "Google Ads");
  assert.equal(SOURCE_LABELS.meta_ads, "Meta Ads");
  assert.equal(SOURCE_LABELS.organic_direct, "Organic / Direct");
  assert.equal(SOURCE_LABELS.other_unknown, "Other / Unknown");
});

test("PLATFORM_LABELS maps every backend platform value to its exact required display label", () => {
  assert.equal(PLATFORM_LABELS.web, "Web");
  assert.equal(PLATFORM_LABELS.app, "App");
  assert.equal(PLATFORM_LABELS.unknown, "Unknown");
});
