// app/api/admin/orders/[id]/download/route.ts
//
// Admin Orders P0 fix -- authenticated BFF bridge for OrderList.tsx's
// Download action, mirroring app/api/admin/orders/[id]/route.ts (PUT)
// and .../resend/route.ts (POST)'s exact pattern:
//
//   Browser
//     -> this route (gated by the EXISTING ADMIN_PASSWORD session, same
//        cookie AdminGuard/app/api/admin/auth already establishes)
//     -> Flask backend's GET /admin/download/<id>
//
// Audit finding this replaces: OrderList.tsx previously linked the
// browser DIRECTLY at `${NEXT_PUBLIC_BACKEND_URL}${order.pdf_url}` with
// no Authorization header and no bridge key at all. Flask's
// admin_or_bridge_required (routes/routes_app_version.py) rejects that
// with 401 on every attempt (confirmed against production) -- Download
// was completely non-functional even when a PDF genuinely existed. This
// route holds zero business logic of its own: Flask remains the sole
// authority on whether a PDF exists, and this never regenerates one.
//
// ADMIN_BRIDGE_SECRET is read from process.env (server-side only) and
// attached as X-Admin-Bridge-Key -- never sent to, logged by, or
// reachable from the browser. The PDF bytes, status and content-type
// are streamed straight through; a backend 404/error is forwarded as
// JSON with its own status, never rewritten into a fake PDF response.

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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
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
    const res = await fetch(`${base}/admin/download/${encodeURIComponent(params.id)}`, {
      method: "GET",
      headers: { "X-Admin-Bridge-Key": bridgeSecret },
      cache: "no-store",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: "download_failed" }));
      return NextResponse.json(data, { status: res.status });
    }

    const bytes = await res.arrayBuffer();
    return new NextResponse(bytes, {
      status: 200,
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "application/pdf",
        "Content-Disposition": res.headers.get("Content-Disposition") || `attachment; filename="report-${params.id}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 502 });
  }
}
