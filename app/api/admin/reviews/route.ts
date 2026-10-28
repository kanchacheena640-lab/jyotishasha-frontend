// app/api/admin/reviews/route.ts
//
// F10-P15 -- server-side BFF bridge for review moderation (same contract as
// app/api/admin/app-version): requires the existing Next.js admin session,
// then relays to Flask with X-Admin-Bridge-Key (ADMIN_BRIDGE_SECRET, never
// sent to the browser). No moderation logic lives here -- Flask decides.
//   GET  ?status=PENDING|PUBLISHED|REJECTED  -> GET  /api/admin/reviews
//   GET  ?order_id=N (any status; privacy requests) -> GET /api/admin/reviews?order_id=N
//   POST {id, action, reason?}               -> POST /api/admin/reviews/<id>/moderate
//        (action: publish | reject | delete -- delete removes the review on a buyer's request)

import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/adminSession";
import { REVIEWS_CACHE_TAG } from "@/lib/reportReviews";

const STATUSES = new Set(["PENDING", "PUBLISHED", "REJECTED"]);

function backendUrl(): string {
  return process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "";
}

function guard(req: NextRequest): { error: NextResponse } | { base: string; key: string } {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return { error: NextResponse.json({ error: "server_misconfiguration" }, { status: 500 }) };
  if (!isValidAdminSession(req.cookies.get(ADMIN_SESSION_COOKIE)?.value, adminPassword)) {
    return { error: NextResponse.json({ error: "unauthorized" }, { status: 401 }) };
  }
  const base = backendUrl();
  const key = process.env.ADMIN_BRIDGE_SECRET;
  if (!base || !key) return { error: NextResponse.json({ error: "backend_not_configured" }, { status: 500 }) };
  return { base, key };
}

async function relay(url: string, init: RequestInit): Promise<NextResponse> {
  try {
    const res = await fetch(url, { ...init, cache: "no-store" });
    const data = await res.json().catch(() => ({ error: "bad_backend_response" }));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 502 });
  }
}

export async function GET(req: NextRequest) {
  const g = guard(req);
  if ("error" in g) return g.error;
  const orderId = req.nextUrl.searchParams.get("order_id");
  if (orderId !== null) {
    if (!/^\d{1,12}$/.test(orderId)) return NextResponse.json({ error: "invalid_order_id" }, { status: 400 });
    return relay(`${g.base}/api/admin/reviews?order_id=${orderId}`, { headers: { "X-Admin-Bridge-Key": g.key } });
  }
  const status = req.nextUrl.searchParams.get("status") || "PENDING";
  if (!STATUSES.has(status)) return NextResponse.json({ error: "invalid_status" }, { status: 400 });
  return relay(`${g.base}/api/admin/reviews?status=${status}`, { headers: { "X-Admin-Bridge-Key": g.key } });
}

export async function POST(req: NextRequest) {
  const g = guard(req);
  if ("error" in g) return g.error;
  const body = await req.json().catch(() => null);
  const id = Number(body?.id);
  if (!Number.isInteger(id) || id < 1) return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  const res = await relay(`${g.base}/api/admin/reviews/${id}/moderate`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Admin-Bridge-Key": g.key },
    body: JSON.stringify({ action: body?.action, reason: body?.reason }),
  });
  // Publish/reject/delete change what product pages may show: drop the cached
  // review summaries so the next view re-reads them from Flask.
  if (res.ok) revalidateTag(REVIEWS_CACHE_TAG);
  return res;
}
