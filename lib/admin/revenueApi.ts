// lib/admin/revenueApi.ts
//
// Reports Revenue Dashboard -- Phase 1. Typed client for the BFF proxy
// routes only (/api/admin/revenue/summary, /api/admin/revenue/orders).
// The browser never calls Flask directly and never sees
// ADMIN_BRIDGE_SECRET -- that stays inside lib/admin/revenueProxy.ts,
// mirroring lib/admin/analyticsProxy.ts / analyticsApi.ts's own split
// exactly.
//
// FRONTEND IS PRESENTATION ONLY: every field below is typed exactly as
// the backend's own response (modules/payments/revenue_dashboard_service.py)
// serializes it. Nothing is recomputed, reclassified, or reinterpreted
// here -- paid status, revenue, "Emailed", platform, source and the
// reporting date are all backend-authoritative.

export class RevenueApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export type PlatformFilter = "all" | "web" | "app";
export type DatePreset = "today" | "7d" | "30d" | "this_month" | "custom";

export interface RevenueDateRange {
  start: string; // YYYY-MM-DD, inclusive, matching the backend's own contract exactly
  end: string; // YYYY-MM-DD, inclusive
}

/** Calendar-day math only (no time-of-day) -- matches the backend's own
 * plain-date query contract. Uses the BROWSER's local calendar day
 * (getFullYear/getMonth/getDate, never toISOString().slice(0,10), which
 * would silently shift to the UTC calendar day). This dashboard is
 * India-facing and used by IST-based admins, so "today" in the admin's
 * own browser is the same calendar day the backend's own Asia/Kolkata
 * boundary logic (modules/payments/revenue_dashboard_service.py) uses
 * -- this is a reasonable, stated assumption, not a silent one. */
function toDateOnly(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(d: Date, days: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function computeDateRange(preset: DatePreset, customStart?: string, customEnd?: string): RevenueDateRange {
  const today = new Date();
  if (preset === "custom") {
    if (customStart && customEnd) return { start: customStart, end: customEnd };
    // No valid custom range yet -- callers gate submission on
    // isValidCustomRange() below; this fallback (today only) is never
    // actually sent while the Apply button stays disabled.
    return { start: toDateOnly(today), end: toDateOnly(today) };
  }
  if (preset === "today") return { start: toDateOnly(today), end: toDateOnly(today) };
  if (preset === "7d") return { start: toDateOnly(addDays(today, -6)), end: toDateOnly(today) };
  if (preset === "30d") return { start: toDateOnly(addDays(today, -29)), end: toDateOnly(today) };
  // this_month
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  return { start: toDateOnly(firstOfMonth), end: toDateOnly(today) };
}

/** A custom range may only be submitted when both dates are present,
 * well-formed, and end is not before start -- the backend itself
 * rejects a malformed/inverted range with a 400, but the UI must never
 * let the customer construct a request that always fails. */
export function isValidCustomRange(start: string, end: string): boolean {
  if (!start || !end) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end)) return false;
  return end >= start;
}

function buildQuery(platform: PlatformFilter, range: RevenueDateRange, extra?: Record<string, string | number>): string {
  const params = new URLSearchParams({ platform, start: range.start, end: range.end });
  if (extra) for (const [k, v] of Object.entries(extra)) params.set(k, String(v));
  return params.toString();
}

async function revenueGet<T>(path: string, qs: string): Promise<T> {
  const response = await fetch(`/api/admin/revenue${path}?${qs}`, { cache: "no-store" });
  const data = await response.json().catch(() => null);
  if (!response.ok || data === null || typeof data !== "object") {
    throw new RevenueApiError(
      (data && (data.message || data.error)) || `Request failed (${response.status}).`,
      response.status,
      data?.error,
    );
  }
  return data as T;
}

// -----------------------------------------------------------------
// Response shapes -- exactly as modules/payments/revenue_dashboard_service.py returns them.
// -----------------------------------------------------------------

export type RevenueSource = "google_ads" | "meta_ads" | "organic_direct" | "other_unknown";

export interface RevenueSourceBreakdown {
  source: RevenueSource;
  orders: number;
  revenue_paise: number;
  revenue: number;
}

export interface RevenueSummary {
  filters: { platform: PlatformFilter; start: string; end: string };
  kpis: {
    total_paid_orders: number;
    total_revenue_paise: number;
    total_revenue: number;
    reports_emailed: number;
    average_order_value_paise: number;
    average_order_value: number;
  };
  sources: RevenueSourceBreakdown[];
  metadata: {
    invalid_amount_orders: number;
    unknown_platform_orders: number;
    approximate_date_orders: number;
    reporting_date_source: string;
    timezone_assumption: string;
    delivered_terminology_note: string;
  };
}

export type OrderPlatform = "web" | "app" | "unknown";

export interface RevenueOrderRow {
  order_id: number;
  reporting_date: string | null;
  reporting_date_approximate: boolean;
  platform: OrderPlatform;
  report_slug: string;
  report_name: string;
  amount_paise: number | null;
  amount: number | null;
  amount_valid: boolean;
  source: RevenueSource;
  report_stage: string | null;
  email_status: string | null;
  delivery_status: string;
}

export interface RevenueOrdersPage {
  filters: { platform: PlatformFilter; start: string; end: string; page: number; per_page: number };
  pagination: { page: number; per_page: number; total: number; total_pages: number };
  orders: RevenueOrderRow[];
}

export function getRevenueSummary(platform: PlatformFilter, range: RevenueDateRange): Promise<RevenueSummary> {
  return revenueGet<RevenueSummary>("/summary", buildQuery(platform, range));
}

export function getRevenueOrders(platform: PlatformFilter, range: RevenueDateRange, page: number, perPage: number): Promise<RevenueOrdersPage> {
  return revenueGet<RevenueOrdersPage>("/orders", buildQuery(platform, range, { page, per_page: perPage }));
}

// -----------------------------------------------------------------
// Display-label mapping -- presentation only, never reclassification.
// -----------------------------------------------------------------

export const SOURCE_LABELS: Record<RevenueSource, string> = {
  google_ads: "Google Ads",
  meta_ads: "Meta Ads",
  organic_direct: "Organic / Direct",
  other_unknown: "Other / Unknown",
};

/** Fixed display order -- always all four, even when a bucket is 0,
 * per the product requirement ("always show all four rows"). */
export const ALL_SOURCES: RevenueSource[] = ["google_ads", "meta_ads", "organic_direct", "other_unknown"];

export const PLATFORM_LABELS: Record<OrderPlatform, string> = {
  web: "Web",
  app: "App",
  unknown: "Unknown",
};

/** ₹ with Indian digit grouping (₹51, ₹1,530, ₹12,750) -- rupees only,
 * paise are never shown in the UI. Never invents a value: `undefined`
 * renders as an em dash by the caller, never as ₹0. */
export function formatRupees(amount: number): string {
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}
