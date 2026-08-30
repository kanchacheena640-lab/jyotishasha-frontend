// lib/adminSession.ts
//
// Shared session-cookie verification for the existing Next.js Admin
// Dashboard. Extracted (unchanged behavior) from app/api/admin/auth/route.ts
// so a second admin API route (app/api/admin/app-version/route.ts) can
// verify the same ADMIN_PASSWORD-derived session without duplicating the
// signing/verification logic. This is the ONLY admin auth mechanism this
// module knows about -- it has no relationship to the Flask backend's JWT
// scheme.

import crypto from "crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function sign(expiry: number, secret: string): string {
  return crypto.createHmac("sha256", secret).update(String(expiry)).digest("hex");
}

export function signAdminSession(expiry: number, secret: string): string {
  return sign(expiry, secret);
}

export function isValidAdminSession(token: string | undefined, secret: string): boolean {
  if (!token) return false;
  const dotIndex = token.indexOf(".");
  if (dotIndex === -1) return false;

  const expiry = Number(token.slice(0, dotIndex));
  const signature = token.slice(dotIndex + 1);
  if (!Number.isFinite(expiry) || Date.now() >= expiry) return false;

  const expected = sign(expiry, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}
