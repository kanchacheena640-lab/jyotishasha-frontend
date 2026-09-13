import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/adminSession";

// Admin Analytics A1 (Access Layer). Same session + bridge pattern as
// Admin Notifications/Audiences/Users (lib/admin/notificationsProxy.ts,
// audiencesProxy.ts). Never imported by a client component.
//
// Backend: routes/routes_website_analytics.py (Task 12) -- a
// SEPARATE, metric_id-keyed API from routes_analytics.py/
// analyticsProxy.ts (that file's own docstring: "Neither file imports
// or calls into the other"). This proxy mirrors that separation
// deliberately rather than merging the two families into one file.
//
//   GET  /admin/api/website-analytics/metrics/<metric_id>
//        (period/start/end/dimension/limit query params)
//   POST /admin/api/website-analytics/metrics/batch
//        (body-carried {period, start?, end?, metrics: [...]})
//
// metric_id itself is never validated here -- an unknown id is the
// backend's own 404 unknown_metric, forwarded unchanged; this proxy
// only bounds the URL SHAPE (a single path segment, or literally
// "batch"), never the metric catalog.
const METRIC_ID_SUFFIX = /^\/metrics\/[A-Za-z0-9_]+$/;
const BATCH_SUFFIX = "/metrics/batch";

export async function proxyWebsiteAnalyticsMetric(req: NextRequest, metricId: string) {
  return proxyWebsiteAnalytics(req, `/metrics/${metricId}`, "GET");
}

export async function proxyWebsiteAnalyticsBatch(req: NextRequest) {
  return proxyWebsiteAnalytics(req, BATCH_SUFFIX, "POST");
}

async function proxyWebsiteAnalytics(req: NextRequest, suffix: string, method: "GET" | "POST") {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return NextResponse.json({ error: "server_misconfiguration" }, { status: 500 });
  if (!isValidAdminSession(req.cookies.get(ADMIN_SESSION_COOKIE)?.value, password)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const secret = process.env.ADMIN_BRIDGE_SECRET;
  const base = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!secret || !base) return NextResponse.json({ error: "server_misconfiguration" }, { status: 500 });
  const validSuffix = suffix === BATCH_SUFFIX ? method === "POST" : METRIC_ID_SUFFIX.test(suffix) && method === "GET";
  if (!validSuffix) return NextResponse.json({ error: "not_found" }, { status: 404 });

  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/admin/api/website-analytics${suffix}${method === "GET" ? req.nextUrl.search : ""}`, {
      method, cache: "no-store", redirect: "error",
      headers: { "X-Admin-Bridge-Key": secret, "Content-Type": "application/json" },
      body: method === "POST" ? await req.text() : undefined,
    });
    const text = await response.text();
    // Same relay discipline as analyticsProxy.ts: a backend 4xx/5xx
    // (including the 501 not_implemented / 400 unsupported_dimension /
    // 404 unknown_metric this API can return) is forwarded with its
    // own status and body unchanged -- never rewritten into a fake
    // success or a zeroed-out metric.
    return new NextResponse(text, { status: response.status, headers: { "Content-Type": response.headers.get("Content-Type") || "application/json", "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 502 });
  }
}
