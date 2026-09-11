// Standalone test convention used by lib/*.test.ts; compile with tsc, then run with Node.
//
// Regression guard for the "Saved Audience Delete 404" production bug:
// vercel.json carried a stale, UNRESTRICTED "/api/(.*)" rewrite straight
// to the Flask backend (Flask's own routes live at /admin/api/*, not
// /api/admin/* -- so any request that reached Flask via this rule hit
// Werkzeug's raw "URL not found" 404 page, never a JSON response from
// either Flask or the Next.js BFF). next.config.js's own equivalent
// rewrite was narrowed to exclude /api/admin/* years ago (the "Users
// Module U2" fix) -- vercel.json was never updated to match, and Vercel
// evidently gives this platform-level rewrite priority over Next.js's
// own App Router DYNAMIC segment routes ([id]/route.ts) for admin sub-
// paths, even though exact/static /api/admin/* paths were unaffected
// (resolved by Next.js's own routing first). This is exactly the kind
// of drift no local `next start`/`next build` test can catch, since
// vercel.json is interpreted by Vercel's platform only -- this test
// instead validates the COMPILED regex behavior directly, the same way
// the drift was diagnosed, so a future edit to either file's rewrite
// pattern is caught before it reaches production.
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
// Next.js bundles its own path-to-regexp copy; Vercel's own rewrite
// engine documents using the identical library/syntax for `source`
// patterns, so testing against Next's copy validates both files'
// rewrite behavior with the actual matching semantics that apply in
// production.
const { pathToRegexp } = require("next/dist/compiled/path-to-regexp");

const ADMIN_PATHS = [
  "/api/admin/audiences", "/api/admin/audiences/123",
  "/api/admin/audiences/123/preview", "/api/admin/audiences/preview",
  "/api/admin/orders", "/api/admin/orders/123", "/api/admin/orders/123/resend",
  "/api/admin/users", "/api/admin/users/123", "/api/admin/users/asknow-concerns",
  "/api/admin/notifications", "/api/admin/notifications/123",
  "/api/admin/auth", "/api/admin/app-version",
];
const PUBLIC_API_PATHS = [
  "/api/full-kundali", "/api/panchang", "/api/some-other-public-endpoint",
];

function assertRewriteExcludesAdmin(source: string, label: string) {
  const re = pathToRegexp(source);
  for (const p of ADMIN_PATHS) {
    assert.equal(re.test(p), false, `${label}: ${p} must NOT match the backend-proxy rewrite (would bypass the Admin BFF and hit Flask's raw URL space, which has no /api/admin/* routes)`);
  }
  for (const p of PUBLIC_API_PATHS) {
    assert.equal(re.test(p), true, `${label}: ${p} SHOULD match the backend-proxy rewrite (legacy direct-to-Flask public endpoints must keep working)`);
  }
}

const vercelConfig = JSON.parse(readFileSync("vercel.json", "utf8"));
assert.equal(vercelConfig.rewrites.length, 1, "vercel.json should have exactly one API rewrite rule");
assertRewriteExcludesAdmin(vercelConfig.rewrites[0].source, "vercel.json rewrites[0]");
assert.equal(vercelConfig.headers[0].source, vercelConfig.rewrites[0].source, "vercel.json's CORS headers rule must use the SAME excluded pattern as its rewrite -- admin BFF responses must never carry a wildcard Access-Control-Allow-Origin header");

const nextConfigSource = readFileSync("next.config.js", "utf8");
const nextConfigMatch = /source:\s*['"]([^'"]+)['"]/.exec(nextConfigSource);
assert(nextConfigMatch, "next.config.js must have a rewrite source pattern");
assertRewriteExcludesAdmin(nextConfigMatch![1], "next.config.js rewrite");

console.log("PASS: both next.config.js's and vercel.json's backend-proxy rewrites correctly exclude every /api/admin/* path (so the Admin BFF, never Flask's raw /api/* namespace, always serves them) while still proxying legitimate public /api/* endpoints straight to Flask.");
