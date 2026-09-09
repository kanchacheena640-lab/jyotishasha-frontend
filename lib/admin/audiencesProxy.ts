import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/adminSession";

// Same session and bridge as Admin Users. Never imported by a client component.
export async function proxyAudiences(req: NextRequest, suffix = "") {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return NextResponse.json({ error: "server_misconfiguration" }, { status: 500 });
  if (!isValidAdminSession(req.cookies.get(ADMIN_SESSION_COOKIE)?.value, password)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const secret = process.env.ADMIN_BRIDGE_SECRET;
  const base = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!secret || !base) return NextResponse.json({ error: "server_misconfiguration" }, { status: 500 });
  if (suffix && !/^\/\d+(\/preview)?$/.test(suffix) && suffix !== "/preview") return NextResponse.json({ error: "not_found" }, { status: 404 });
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/admin/api/audiences${suffix}${req.nextUrl.search}`, {
      method: req.method, cache: "no-store", redirect: "error",
      headers: { "X-Admin-Bridge-Key": secret, "Content-Type": "application/json" },
      body: req.method === "POST" || req.method === "PATCH" ? await req.text() : undefined,
    });
    return new NextResponse(await response.text(), { status: response.status, headers: { "Content-Type": response.headers.get("Content-Type") || "application/json", "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 502 });
  }
}
