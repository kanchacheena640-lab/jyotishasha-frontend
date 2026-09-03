// lib/pagePath.ts

/**
 * Task 9A -- the ONE centralized helper that derives/normalizes the
 * `page_path` property WebsiteEvents.ts attaches to the relevant
 * website producer events (cta_click, feature_used,
 * app_download_intent, report_discovery_viewed). Implements the
 * minimal contract extension Task 9's own PAGE_ACTION_ATTRIBUTION_GAP
 * finding proposed (modules/activity_events/website_metrics_contract.py,
 * backend).
 *
 * page_path means EXACTLY: the normalized website route/pathname on
 * which the action actually occurred, read at CALL TIME -- never
 * cached, never captured once at application startup. SPA navigation
 * changes the route without a full reload, so a stale/global capture
 * would misattribute every action after the very first page view of
 * the session; getCurrentPagePath() below always re-reads the live
 * `window.location.pathname` at the moment it is called.
 *
 * page_path never means: landing page (Task 2C's own `landingPage` --
 * see lib/analyticsAttribution.ts, captured ONCE per session and
 * frozen thereafter), referrer, full URL, query string, URL fragment,
 * CTA location, screen_name, or campaign landing path. Deliberately a
 * SEPARATE module from analyticsAttribution.ts's own
 * normalizeLandingPage() -- the two functions look superficially
 * similar (both strip query/fragment) but answer different questions
 * and must never be merged or made to delegate to one another.
 */

// Same repository-wide bounded-string-value convention as
// lib/analyticsAttribution.ts's own MAX_ATTRIBUTION_VALUE_LENGTH, which
// itself mirrors the backend's modules/activity_events/
// ingestion_validation.MAX_STRING_VALUE_LENGTH. Kept as an independent
// constant (not imported) -- frontend and backend are separate deploy
// units -- but the value is intentionally identical.
const MAX_PAGE_PATH_LENGTH = 256;

// Pathname characters only -- letters, digits, hyphen, underscore, dot,
// slash. No query ('?'), no fragment ('#'), no scheme/host punctuation
// (':', '@'), no whitespace. Intentionally the same safe charset the
// backend's own validate_page_path() enforces (modules/activity_events/
// ingestion_validation.py) -- kept in sync by design (both sides of
// this contract were written together in this task), not by import.
const SAFE_PAGE_PATH_RE = /^\/[A-Za-z0-9\-_./]*$/;

/**
 * Pure. Returns the normalized, safe page_path, or undefined if the
 * input is missing, malformed, or unsafe -- NEVER a fallback value
 * like "/unknown" and NEVER the session's landing page. Trailing-slash
 * behavior: preserved exactly as given, no normalization -- Next.js's
 * own usePathname()/window.location.pathname already return a
 * consistently-shaped value per route, and forcing one convention here
 * risks disagreeing with the real route shape (over-normalizing a
 * meaningful Next.js route).
 */
export function normalizePagePath(rawPathname: string | null | undefined): string | undefined {
  if (!rawPathname || typeof rawPathname !== "string") return undefined;

  // Reject outright rather than extract-and-accept -- a well-behaved
  // caller always passes a bare pathname (usePathname()/
  // window.location.pathname never include a scheme); this is a
  // defensive backstop against a future caller accidentally passing a
  // full href, not the normal path.
  if (rawPathname.includes("://")) return undefined;

  // Strip query/fragment defensively -- window.location.pathname never
  // includes either, but a future caller could accidentally pass
  // something built from window.location.href instead.
  const stripped = rawPathname.split("?")[0].split("#")[0];

  if (!stripped.startsWith("/")) return undefined;

  // Protocol-relative URL ("//evil.com/x") -- browsers resolve a
  // leading "//" as an external host, not a same-site absolute path.
  // Not caught by the "://" check above, so checked explicitly.
  if (stripped.startsWith("//")) return undefined;

  if (stripped.length > MAX_PAGE_PATH_LENGTH) return undefined;

  // Collapse internal duplicate slashes ("/a//b" -> "/a/b") without
  // disturbing the single required leading slash already checked above.
  const normalized = "/" + stripped.slice(1).replace(/\/{2,}/g, "/");

  if (!SAFE_PAGE_PATH_RE.test(normalized)) return undefined;

  return normalized;
}

/**
 * The SSR-safe, call-time accessor every WebsiteEvents producer method
 * uses. Returns undefined -- never "/unknown", never the landing page
 * -- when `window` is unavailable (SSR) or the current pathname does
 * not pass normalizePagePath()'s own safety contract. Never throws.
 */
export function getCurrentPagePath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return normalizePagePath(window.location?.pathname);
  } catch {
    return undefined;
  }
}
