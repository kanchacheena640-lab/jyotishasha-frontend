// app/api/admin/users/asknow-concerns/route.ts
//
// U5B -- BFF bridge for U5A's real Ask Now concern-category discovery
// endpoint. Same pattern/security posture as app/api/admin/users/route.ts
// -- see that file's own comments for the full rationale. Zero business
// logic here: Flask (via modules/services/asknow_category_service.py::
// get_active_category_names()) remains the sole authority on which
// categories are currently active. This route never validates/caches/
// hardcodes the category list -- it only forwards the request and
// relays Flask's response (including a genuine 503
// {"error": "asknow_concern_unavailable"}) back to the browser.

import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/adminSession";

function backendUrl(): string {
  return process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "";
}

function requireAdminSession(req: NextRequest): NextResponse | null {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: "server_misconfiguration" }, { status: 500 });
  }
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidAdminSession(token, adminPassword)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(req: NextRequest) {
  const denied = requireAdminSession(req);
  if (denied) return denied;

  const bridgeSecret = process.env.ADMIN_BRIDGE_SECRET;
  if (!bridgeSecret) {
    return NextResponse.json(
      {
        error: "server_misconfiguration",
        message: "ADMIN_BRIDGE_SECRET is not configured on this server.",
      },
      { status: 500 },
    );
  }

  const base = backendUrl();
  if (!base) {
    return NextResponse.json({ error: "backend_not_configured" }, { status: 500 });
  }

  try {
    const res = await fetch(`${base}/admin/api/users/asknow-concerns`, {
      headers: { "X-Admin-Bridge-Key": bridgeSecret },
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 502 });
  }
}
