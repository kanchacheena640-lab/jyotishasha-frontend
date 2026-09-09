import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/adminSession";

// Same session and bridge as Admin Users/Audiences. Never imported by a
// client component. N3+N4+N5+N6 scope: DRAFT create/read/list/update,
// live preview, Send Now, Schedule/reschedule/cancel, and (N6) read-only
// history/monitor/deliveries/attempts. This allowlist forwards exactly
// the suffixes the Flask blueprint implements, and deliberately does
// NOT include any due-processing/claim trigger -- N5's scheduler is
// never reachable from the browser (see campaign_scheduler.py's own
// module docstring).
const ID = "[0-9a-fA-F-]{1,64}";
const ALLOWED_SUFFIX = new RegExp(
  `^(/${ID})?$|^/preview$|^/history$|^/${ID}/send-now$|^/${ID}/schedule$|^/${ID}/monitor$` +
  `|^/executions/${ID}(/reconfirm|/reschedule|/cancel|/deliveries)?$|^/deliveries/${ID}/attempts$`
);

export async function proxyNotifications(req: NextRequest, suffix = "") {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return NextResponse.json({ error: "server_misconfiguration" }, { status: 500 });
  if (!isValidAdminSession(req.cookies.get(ADMIN_SESSION_COOKIE)?.value, password)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const secret = process.env.ADMIN_BRIDGE_SECRET;
  const base = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!secret || !base) return NextResponse.json({ error: "server_misconfiguration" }, { status: 500 });
  if (!ALLOWED_SUFFIX.test(suffix)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/admin/api/notifications${suffix}${req.nextUrl.search}`, {
      method: req.method, cache: "no-store", redirect: "error",
      headers: { "X-Admin-Bridge-Key": secret, "Content-Type": "application/json" },
      body: req.method === "POST" || req.method === "PATCH" ? await req.text() : undefined,
    });
    return new NextResponse(await response.text(), { status: response.status, headers: { "Content-Type": response.headers.get("Content-Type") || "application/json", "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 502 });
  }
}
