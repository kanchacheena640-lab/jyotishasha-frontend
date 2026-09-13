import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/adminSession";

// Admin Analytics A1 (Access Layer). Same session + bridge pattern as
// Admin Notifications/Audiences/Users (lib/admin/notificationsProxy.ts,
// audiencesProxy.ts). Never imported by a client component.
//
// Backend: routes/routes_analytics.py (Phase 6B) -- 6 fixed,
// read-only /admin/api/analytics/<domain> endpoints, GET only, each
// taking start/end (required) and platform (optional) query params.
// This proxy forwards the query string as-is and adds nothing of its
// own -- the backend is the single place start/end/platform are
// parsed and validated (InvalidAnalyticsWindow/InvalidPlatformFilter
// -> 400, forwarded through unchanged below).
const ALLOWED_SUFFIX = /^\/(overview|engagement|asknow|reports|subscriptions|notifications)$/;

export async function proxyAnalytics(req: NextRequest, suffix: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return NextResponse.json({ error: "server_misconfiguration" }, { status: 500 });
  if (!isValidAdminSession(req.cookies.get(ADMIN_SESSION_COOKIE)?.value, password)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const secret = process.env.ADMIN_BRIDGE_SECRET;
  const base = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!secret || !base) return NextResponse.json({ error: "server_misconfiguration" }, { status: 500 });
  if (!ALLOWED_SUFFIX.test(suffix)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/admin/api/analytics${suffix}${req.nextUrl.search}`, {
      method: "GET", cache: "no-store", redirect: "error",
      headers: { "X-Admin-Bridge-Key": secret, "Content-Type": "application/json" },
    });
    const text = await response.text();
    // A backend 4xx/5xx is forwarded with its own status and body
    // unchanged -- never rewritten into a fake 200 with empty/zeroed
    // data. A malformed (non-JSON) backend body is still forwarded
    // as-is with the backend's own status code; this proxy does not
    // attempt to parse or reinterpret the body, only relay it.
    return new NextResponse(text, { status: response.status, headers: { "Content-Type": response.headers.get("Content-Type") || "application/json", "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 502 });
  }
}
