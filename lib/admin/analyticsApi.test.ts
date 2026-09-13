// Standalone test convention used by lib/*.test.ts; compile with tsc, then run with Node.
import { strict as assert } from "node:assert";
import test from "node:test";
import {
  AnalyticsApiError,
  computeWindow,
  findMetric,
  getOverview,
  getAskNow,
  websiteAnalyticsBatch,
  WebsiteMetricResult,
} from "./analyticsApi";

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

// --- computeWindow ---------------------------------------------------

test("computeWindow('7d') spans exactly 7 days, ending near now", () => {
  const before = Date.now();
  const w = computeWindow("7d");
  const spanMs = new Date(w.end).getTime() - new Date(w.start).getTime();
  assert.equal(spanMs, 7 * 24 * 60 * 60 * 1000);
  assert.ok(new Date(w.end).getTime() >= before);
});

test("computeWindow('30d') and ('90d') span the right number of days", () => {
  const w30 = computeWindow("30d");
  assert.equal(new Date(w30.end).getTime() - new Date(w30.start).getTime(), 30 * 24 * 60 * 60 * 1000);
  const w90 = computeWindow("90d");
  assert.equal(new Date(w90.end).getTime() - new Date(w90.start).getTime(), 90 * 24 * 60 * 60 * 1000);
});

test("computeWindow('custom') uses the exact supplied calendar days, end exclusive (+1 day)", () => {
  const w = computeWindow("custom", "2026-01-01", "2026-01-03");
  assert.equal(w.start, "2026-01-01T00:00:00.000Z");
  // end is exclusive -- the day AFTER 2026-01-03, so the whole of
  // 2026-01-03 is still included in the [start, end) window.
  assert.equal(w.end, "2026-01-04T00:00:00.000Z");
});

test("computeWindow('custom') without start/end falls back sanely (never throws)", () => {
  const w = computeWindow("custom");
  assert.ok(new Date(w.start).getTime() < new Date(w.end).getTime());
});

// --- query construction ----------------------------------------------

test("getOverview sends start/end and omits platform for 'all'", async () => {
  const calls = mockFetchOnce(200, { data: { total_events: 1 } });
  await getOverview({ start: "2026-01-01T00:00:00.000Z", end: "2026-01-02T00:00:00.000Z" }, "all");
  assert.equal(calls.length, 1);
  const url = new URL(calls[0].url, "https://x");
  assert.equal(url.pathname, "/api/admin/analytics/overview");
  assert.equal(url.searchParams.get("start"), "2026-01-01T00:00:00.000Z");
  assert.equal(url.searchParams.get("end"), "2026-01-02T00:00:00.000Z");
  assert.equal(url.searchParams.has("platform"), false);
});

test("getOverview maps 'website' and 'app' platform filters to the backend's real values", async () => {
  const calls = mockFetchOnce(200, { data: {} });
  await getOverview({ start: "2026-01-01T00:00:00.000Z", end: "2026-01-02T00:00:00.000Z" }, "website");
  assert.equal(new URL(calls[0].url, "https://x").searchParams.get("platform"), "website");

  const calls2 = mockFetchOnce(200, { data: {} });
  await getAskNow({ start: "2026-01-01T00:00:00.000Z", end: "2026-01-02T00:00:00.000Z" }, "app");
  // "App" maps to the one real ALLOWED_PLATFORMS value this product has
  // (analytics_contract.py) -- never a fabricated aggregate "app" the
  // backend does not accept.
  assert.equal(new URL(calls2[0].url, "https://x").searchParams.get("platform"), "app_android");
});

// --- error / malformed-response handling ------------------------------

test("a non-2xx response throws AnalyticsApiError carrying the backend's own message", async () => {
  mockFetchOnce(400, { error: "invalid_analytics_window", message: "start is required" });
  await assert.rejects(
    () => getOverview({ start: "x", end: "y" }, "all"),
    (err: unknown) => err instanceof AnalyticsApiError && err.status === 400 && err.message === "start is required" && err.code === "invalid_analytics_window",
  );
});

test("a malformed 200 response (no 'data' key) throws rather than returning undefined silently", async () => {
  mockFetchOnce(200, { unexpected: true });
  await assert.rejects(() => getOverview({ start: "x", end: "y" }, "all"), AnalyticsApiError);
});

test("a non-JSON response body throws a controlled AnalyticsApiError, never an unhandled parse crash", async () => {
  setFetch(async () => ({
    ok: false,
    status: 502,
    json: async () => { throw new Error("not json"); },
  } as unknown as Response));
  await assert.rejects(() => getOverview({ start: "x", end: "y" }, "all"), AnalyticsApiError);
});

// --- website analytics batch -------------------------------------------

test("websiteAnalyticsBatch posts period=custom with the shared window and the given metrics", async () => {
  const calls = mockFetchOnce(200, { period: "custom", start: "s", end: "e", results: [] });
  await websiteAnalyticsBatch(
    { start: "2026-01-01T00:00:00.000Z", end: "2026-01-02T00:00:00.000Z" },
    [{ metric_id: "cta_clicks_total" }],
  );
  assert.equal(calls.length, 1);
  assert.equal(calls[0].init?.method, "POST");
  const body = JSON.parse(calls[0].init?.body as string);
  assert.deepEqual(body, {
    period: "custom",
    start: "2026-01-01T00:00:00.000Z",
    end: "2026-01-02T00:00:00.000Z",
    metrics: [{ metric_id: "cta_clicks_total" }],
  });
});

test("websiteAnalyticsBatch throws when 'results' is missing/malformed", async () => {
  mockFetchOnce(200, { period: "custom" });
  await assert.rejects(
    () => websiteAnalyticsBatch({ start: "s", end: "e" }, [{ metric_id: "cta_clicks_total" }]),
    AnalyticsApiError,
  );
});

test("findMetric returns undefined for a metric_id absent from the batch (never a fake result)", () => {
  const results: WebsiteMetricResult[] = [{ metric_id: "cta_clicks_total", status: "READY", data: { value: 5 } }];
  assert.equal(findMetric(results, "app_download_intents_total"), undefined);
  const found = findMetric(results, "cta_clicks_total");
  assert.ok(found?.data && "value" in found.data);
  assert.equal(found?.data && "value" in found.data ? found.data.value : null, 5);
});
