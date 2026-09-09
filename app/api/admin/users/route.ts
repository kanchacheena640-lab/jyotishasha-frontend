// app/api/admin/users/route.ts
//
// Users Module U2 -- server-side BFF bridge for the real Admin Users
// list, mirroring app/api/admin/app-version/route.ts's exact pattern:
//
//   Browser
//     -> this route (gated by the EXISTING ADMIN_PASSWORD session,
//        same cookie AdminGuard/app/api/admin/auth already establishes)
//     -> Flask backend's /admin/api/users
//
// This route holds zero business logic of its own (no filter validation,
// no aggregation, no identity-bridge logic) -- Flask remains the sole
// authority on user data and the U2 business rules (active/paying/
// active_subscription definitions). It only does three things: verify
// the caller already has a valid Next.js admin session, forward every
// query parameter unchanged, and relay the response back.
//
// ADMIN_BRIDGE_SECRET is read from process.env (server-side only) and
// attached as X-Admin-Bridge-Key -- it is never sent to, logged by, or
// reachable from the browser. Never printed/logged anywhere in this file.

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

  // Preserve every query parameter exactly as received -- this route
  // never interprets/validates them, that is Flask's job.
  const search = req.nextUrl.search;

  try {
    const res = await fetch(`${base}/admin/api/users${search}`, {
      headers: { "X-Admin-Bridge-Key": bridgeSecret },
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 502 });
  }
}
