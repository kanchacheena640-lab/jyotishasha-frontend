// app/api/admin/orders/[id]/resend/route.ts
//
// Admin Orders BFF Completion -- server-side BFF bridge for OrderList.tsx's
// Resend action, mirroring app/api/admin/orders/route.ts (GET) and
// app/api/admin/orders/[id]/route.ts (PUT)'s exact pattern:
//
//   Browser
//     -> this route (gated by the EXISTING ADMIN_PASSWORD session, same
//        cookie AdminGuard/app/api/admin/auth already establishes)
//     -> Flask backend's POST /admin/api/resend/<id>
//
// This replaces OrderList.tsx's previous direct browser -> production
// Flask POST (no Authorization header, no BFF) -- Flask's admin_or_bridge_
// required now accepts this route's X-Admin-Bridge-Key, so the resend
// dispatch actually succeeds instead of being silently rejected. This
// route holds zero business logic of its own -- it never itself triggers
// report regeneration; Flask/Celery remain the sole authority on that.
//
// ADMIN_BRIDGE_SECRET is read from process.env (server-side only) and
// attached as X-Admin-Bridge-Key -- never sent to, logged by, or
// reachable from the browser.

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

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
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
    const res = await fetch(`${base}/admin/api/resend/${encodeURIComponent(params.id)}`, {
      method: "POST",
      headers: { "X-Admin-Bridge-Key": bridgeSecret },
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 502 });
  }
}
