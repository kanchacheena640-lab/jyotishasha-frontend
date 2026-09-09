// app/api/admin/orders/route.ts
//
// Admin Orders BFF Auth Fix -- server-side BFF bridge for the Admin
// Orders list, mirroring app/api/admin/app-version/route.ts and
// app/api/admin/users/route.ts's exact pattern:
//
//   Browser
//     -> this route (gated by the EXISTING ADMIN_PASSWORD session,
//        same cookie AdminGuard/app/api/admin/auth already establishes)
//     -> Flask backend's /admin/api/orders
//
// This replaces OrderList.tsx's previous direct browser -> production
// Flask fetch (no Authorization header, no BFF) -- that call was always
// rejected by Flask's own admin_required check (401 {"msg": "Missing
// Authorization Header"}), which OrderList.tsx then handed unchecked to
// orders.map(), crashing the Admin Dashboard. This route holds zero
// business logic of its own; Flask remains the sole authority on order
// data.
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
    const res = await fetch(`${base}/admin/api/orders`, {
      headers: { "X-Admin-Bridge-Key": bridgeSecret },
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 502 });
  }
}
