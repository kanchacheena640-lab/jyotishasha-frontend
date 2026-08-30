import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  ADMIN_SESSION_COOKIE as SESSION_COOKIE,
  ADMIN_SESSION_TTL_MS as SESSION_TTL_MS,
  signAdminSession,
  isValidAdminSession as isValidSession,
} from "@/lib/adminSession";

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest();
}

function sign(expiry: number, secret: string) {
  return signAdminSession(expiry, secret);
}

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ success: false, error: "Server misconfiguration" }, { status: 500 });
  }

  let password: string;
  try {
    const body = await req.json();
    password = String(body?.password ?? "");
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const isMatch = crypto.timingSafeEqual(sha256(password), sha256(adminPassword));
  if (!isMatch) {
    return NextResponse.json({ success: false, error: "Incorrect password" }, { status: 401 });
  }

  const expiry = Date.now() + SESSION_TTL_MS;
  const token = `${expiry}.${sign(expiry, adminPassword)}`;

  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
  return res;
}

export async function GET(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ authenticated: false });
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return NextResponse.json({ authenticated: isValidSession(token, adminPassword) });
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
