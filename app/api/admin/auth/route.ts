import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest();
}

function sign(expiry: number, secret: string) {
  return crypto.createHmac("sha256", secret).update(String(expiry)).digest("hex");
}

function isValidSession(token: string | undefined, secret: string): boolean {
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
