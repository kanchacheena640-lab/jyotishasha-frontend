import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/adminSession";

// Reports Revenue Dashboard -- Phase 1. Same session + bridge pattern as
// every other Admin BFF proxy (lib/admin/analyticsProxy.ts,
// notificationsProxy.ts, audiencesProxy.ts): validate the admin session
// cookie, then forward to Flask with the server-only X-Admin-Bridge-Key
// header -- never sent to, logged by, or reachable from the browser.
//
// Backend: routes/routes_revenue.py -- GET /admin/api/revenue/summary
// and /admin/api/revenue/orders, both read-only, both gated by the
// existing admin_or_bridge_required. This proxy forwards the query
// string as-is and adds nothing of its own; the backend is the sole
// place platform/start/end/page/per_page are parsed and validated
// (InvalidRevenueFilter -> 400, forwarded through unchanged below).
const ALLOWED_SUFFIX = /^\/(summary|orders)$/;

export async function proxyRevenue(req: NextRequest, suffix: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return NextResponse.json({ error: "server_misconfiguration" }, { status: 500 });
  if (!isValidAdminSession(req.cookies.get(ADMIN_SESSION_COOKIE)?.value, password)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const secret = process.env.ADMIN_BRIDGE_SECRET;
  const base = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!secret || !base) return NextResponse.json({ error: "server_misconfiguration" }, { status: 500 });
  if (!ALLOWED_SUFFIX.test(suffix)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/admin/api/revenue${suffix}${req.nextUrl.search}`, {
      method: "GET", cache: "no-store", redirect: "error",
      headers: { "X-Admin-Bridge-Key": secret, "Content-Type": "application/json" },
    });
    const text = await response.text();
    // A backend 4xx/5xx is forwarded with its own status and body
    // unchanged -- never rewritten into a fake 200 with empty/zeroed
    // data (the dashboard must never fabricate metrics on failure).
    return new NextResponse(text, { status: response.status, headers: { "Content-Type": response.headers.get("Content-Type") || "application/json", "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 502 });
  }
}
