// lib/admin/analyticsApi.ts
//
// Admin Analytics A2 -- typed client for the A1 BFF endpoints only
// (/api/admin/analytics/*, /api/admin/website-analytics/*). The browser
// never calls Flask directly; ADMIN_BRIDGE_SECRET is read only inside
// the server-only proxy files (lib/admin/analyticsProxy.ts,
// websiteAnalyticsProxy.ts) and never appears here.
//
// Field names below are typed EXACTLY as the backend's own frozen
// dataclasses (modules/activity_events/analytics_models.py,
// website_analytics_models.py) serialize them -- nothing renamed,
// nothing invented. A rate field that the backend can return as `null`
// (its own "denominator is zero" contract, analytics_contract.
// compute_rate()) is typed `number | null` here, never coerced to 0.

export class AnalyticsApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function analyticsGet<T>(path: string, qs: string): Promise<T> {
  const response = await fetch(`/api/admin/analytics${path}?${qs}`, { cache: "no-store" });
  const data = await response.json().catch(() => null);
  if (!response.ok || data === null || typeof data !== "object" || !("data" in data)) {
    throw new AnalyticsApiError(
      (data && (data.message || data.error)) || `Request failed (${response.status}).`,
      response.status,
      data?.error,
    );
  }
  return data.data as T;
}

// -----------------------------------------------------------------
// Window + platform -- one shared vocabulary the whole page uses to
// drive BOTH API families consistently (Phase 6B's own start/end
// window contract, and Website Analytics' period=custom&start&end
// form, Task 12 S4). No day-count math happens on the backend for
// analytics/*; it has no "7d"/"30d" keyword at all, only a
// caller-supplied [start, end) -- computed here, once.
// -----------------------------------------------------------------
export type DatePreset = "7d" | "30d" | "90d" | "custom";

export interface AnalyticsWindow {
  start: string; // ISO-8601, UTC
  end: string;
}

export function computeWindow(preset: DatePreset, customStart?: string, customEnd?: string): AnalyticsWindow {
  const end = new Date();
  if (preset === "custom" && customStart && customEnd) {
    // Date inputs are plain "YYYY-MM-DD" (local calendar day) -- the
    // end bound is exclusive (Phase 6B's own [start, end) contract), so
    // a same-day custom range still covers that whole day.
    const start = new Date(`${customStart}T00:00:00.000Z`);
    const endExclusive = new Date(`${customEnd}T00:00:00.000Z`);
    endExclusive.setUTCDate(endExclusive.getUTCDate() + 1);
    return { start: start.toISOString(), end: endExclusive.toISOString() };
  }
  const days = preset === "7d" ? 7 : preset === "30d" ? 30 : 90;
  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
  return { start: start.toISOString(), end: end.toISOString() };
}

// UI-level platform choice. The backend has no single "app" value
// (ALLOWED_PLATFORMS = app_android | app_ios | website | backend_internal,
// analytics_contract.py) -- this product has no iOS build at all today
// (routes_app_version.py's own _SUPPORTED_PLATFORMS = ("android",)), so
// "App" maps to the one real platform value that constitutes the app
// today; it is not a fabricated aggregate; app_ios simply is not asked
// for anywhere in this UI.
export type PlatformFilter = "all" | "website" | "app";

function backendPlatform(filter: PlatformFilter): string | undefined {
  if (filter === "website") return "website";
  if (filter === "app") return "app_android";
  return undefined;
}

function windowQs(window: AnalyticsWindow, platform: PlatformFilter): string {
  const params = new URLSearchParams({ start: window.start, end: window.end });
  const p = backendPlatform(platform);
  if (p) params.set("platform", p);
  return params.toString();
}

// -----------------------------------------------------------------
// Phase 6B cross-platform analytics (routes/routes_analytics.py)
// -----------------------------------------------------------------
export interface OverviewMetrics {
  total_events: number;
  unique_users: number;
  app_sessions: number;
  new_signups: number;
  interactive_logins: number;
  dau: number;
  wau: number;
  mau: number;
}

export interface EngagementMetrics {
  cta_clicks_total: number;
  cta_unique_users: number;
  cta_clicks_by_cta_id: Record<string, number>;
  cta_clicks_by_screen_name: Record<string, number>;
  feature_usage_total: number;
  feature_unique_users: number;
  feature_usage_by_feature_name: Record<string, number>;
}

export interface AnalyticsLimitation { metric: string; reason: string }

export interface AskNowMetrics {
  entry_views: number;
  questions_submitted: number;
  answers_delivered: number;
  answers_failed: number;
  delivery_rate: number | null;
  failure_rate: number | null;
  limitations: AnalyticsLimitation[];
}

export interface AiReportEngineMetrics {
  discovery_views: number;
  discovery_by_report_type: Record<string, number>;
  generation_started: number;
  generation_completed: number;
  generation_failed: number;
  completion_rate: number | null;
}

export interface PurchasedReportMetrics {
  purchase_entry_clicks: number;
  payment_initiated: number;
  payment_verified: number;
  payment_failed: number;
  generation_started: number;
  generation_completed: number;
  generation_failed: number;
  verification_rate: number | null;
  completion_rate: number | null;
}

export interface ReportMetrics {
  ai_report_engine: AiReportEngineMetrics;
  purchased_report: PurchasedReportMetrics;
}

export interface SubscriptionMetrics {
  discovery_views: number;
  discovery_by_placement: Record<string, number>;
  trial_started: number;
  trial_expired: number;
  subscription_started: number;
  subscription_renewed: number;
  subscription_grace_entered: number;
  subscription_expired: number;
  subscription_cancelled: number;
  subscription_refunded: number;
  limitations: AnalyticsLimitation[];
}

export const getOverview = (window: AnalyticsWindow, platform: PlatformFilter) =>
  analyticsGet<OverviewMetrics>("/overview", windowQs(window, platform));
export const getEngagement = (window: AnalyticsWindow, platform: PlatformFilter) =>
  analyticsGet<EngagementMetrics>("/engagement", windowQs(window, platform));
export const getAskNow = (window: AnalyticsWindow, platform: PlatformFilter) =>
  analyticsGet<AskNowMetrics>("/asknow", windowQs(window, platform));
export const getReports = (window: AnalyticsWindow, platform: PlatformFilter) =>
  analyticsGet<ReportMetrics>("/reports", windowQs(window, platform));
export const getSubscriptions = (window: AnalyticsWindow, platform: PlatformFilter) =>
  analyticsGet<SubscriptionMetrics>("/subscriptions", windowQs(window, platform));

// -----------------------------------------------------------------
// Website Analytics (Task 11/12, routes/routes_website_analytics.py)
// -- a SEPARATE, metric_id-keyed API, always website-scoped by its own
// query definition (no platform param exists on this API at all).
// Only READY metric_ids are ever requested here (Task 12 S5's own
// BLOCKED/GA4_EXTERNAL short-circuit means asking for one just returns
// {data: null}, but this client deliberately never asks in the first
// place -- see AnalyticsProductUsageSection/AnalyticsReportsSection).
// -----------------------------------------------------------------
export type MetricQualityStatus = "READY" | "PARTIAL" | "BLOCKED" | "GA4_EXTERNAL";

export interface WebsiteMetricValueData { value: number | null }
export interface WebsiteMetricGroupedRow { dimension_value: string | null; count: number }
export interface WebsiteMetricGroupedData {
  dimension: string;
  rows: WebsiteMetricGroupedRow[];
  unknown_count: number;
  total: number;
}

export interface WebsiteMetricResult {
  metric_id: string;
  status: MetricQualityStatus;
  data: WebsiteMetricValueData | WebsiteMetricGroupedData | null;
  limitations?: string[];
  reason?: string;
  // A malformed/erroring batch item (routes_website_analytics.py's own
  // per-entry error shape) -- checked explicitly by callers before
  // reading `data`, never silently treated as a 0/empty result.
  error?: string;
  message?: string;
}

export interface WebsiteMetricRequest {
  metric_id: string;
  dimension?: string;
  limit?: number;
}

export async function websiteAnalyticsBatch(
  window: AnalyticsWindow,
  metrics: WebsiteMetricRequest[],
): Promise<WebsiteMetricResult[]> {
  const response = await fetch("/api/admin/website-analytics/metrics/batch", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ period: "custom", start: window.start, end: window.end, metrics }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || data === null || !Array.isArray(data.results)) {
    throw new AnalyticsApiError(
      (data && (data.message || data.error)) || `Request failed (${response.status}).`,
      response.status,
      data?.error,
    );
  }
  return data.results as WebsiteMetricResult[];
}

/** Look up one metric's result from a batch response by metric_id --
 * undefined if the batch didn't include it (never a silent 0/null
 * substitution left to the caller to get wrong). */
export function findMetric(results: WebsiteMetricResult[], metricId: string): WebsiteMetricResult | undefined {
  return results.find((r) => r.metric_id === metricId);
}
