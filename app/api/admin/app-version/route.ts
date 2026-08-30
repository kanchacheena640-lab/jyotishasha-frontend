// app/api/admin/app-version/route.ts
//
// Server-side BFF bridge for the Admin App Version Policy control.
//
//   Browser
//     -> this route (gated by the EXISTING ADMIN_PASSWORD session,
//        same cookie AdminGuard/app/api/admin/auth already establishes)
//     -> Flask backend's app-version-policy endpoints
//
// This route holds zero version-policy business logic (no build-number
// comparisons, no min<=latest checks) -- Flask remains the sole
// authority on whether a policy value is valid. It only does two
// things: verify the caller already has a valid Next.js admin session,
// and relay the request/response to/from the backend unchanged.
//
// GET is a plain relay -- the backend's GET is already public/unauthed,
// so no extra credential is added for it.
//
// PATCH additionally attaches X-Admin-Bridge-Key, a narrow
// service-to-service secret (ADMIN_BRIDGE_SECRET) that exists ONLY on
// this server and the Flask server -- it is never sent to, or
// reachable from, the browser. See routes/routes_app_version.py's
// admin_or_bridge_required for the backend half of this contract; that
// decorator accepts this key ONLY on this one route, and still runs
// every existing validation (including the minimum<=latest invariant)
// before committing anything.

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

  const base = backendUrl();
  if (!base) {
    return NextResponse.json({ error: "backend_not_configured" }, { status: 500 });
  }

  try {
    const res = await fetch(`${base}/api/app/version-policy?platform=android`, {
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 502 });
  }
}

export async function PATCH(req: NextRequest) {
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

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_request_body" }, { status: 400 });
  }

  const base = backendUrl();
  if (!base) {
    return NextResponse.json({ error: "backend_not_configured" }, { status: 500 });
  }

  try {
    const res = await fetch(`${base}/admin/api/app-version-policy?platform=android`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Bridge-Key": bridgeSecret,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 502 });
  }
}
