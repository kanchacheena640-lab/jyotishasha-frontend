// lib/geo.ts

/**
 * Geo-Aware Consent v1, Phase 2A -- the single, central geo->policy
 * classification. This is the ONE place that maps a country code to a
 * regulatory consent posture; nothing else in the codebase should ever
 * write its own `country === "XX"` check (Phase 1 audit finding: the
 * only country logic that existed before this file was the temporary
 * India-only string comparison introduced by commit aa12e67, which this
 * module does not touch or replace).
 *
 * Pure, deterministic, synchronous: no browser APIs (`window`/
 * `document`), no `fetch`, no I/O of any kind. Safe to import from
 * middleware.js (Vercel Edge Runtime) today, and, in a later phase,
 * from a pre-hydration bootstrap script.
 *
 * Source of country codes: Vercel's own edge-populated
 * `x-vercel-ip-country` request header (ISO 3166-1 alpha-2). This
 * module does NOT read that header itself and does not touch
 * `components/location/LocationProvider.tsx`'s separate ipapi.co
 * city-lookup at all -- callers (middleware.js) pass the
 * already-extracted country string in.
 *
 * SCOPE (Phase 2A only): this module has no effect on any current
 * Consent Mode command, banner, or ConsentContext behavior. It exists
 * so a later phase can consume ONE typed policy value instead of
 * re-deriving country logic per call site. Wiring this resolver's
 * output into the actual consent bootstrap/banner/ConsentContext is
 * explicitly out of scope here.
 */

export type ConsentGeoPolicy =
  | "NORMAL"
  | "US_PRIVACY"
  | "EUROPE_CONSENT"
  | "SAFE_FALLBACK";

/**
 * Regulatory country grouping -- EEA (EU-27 + Iceland/Liechtenstein/
 * Norway) + United Kingdom (GB) + Switzerland (CH), per Phase 2A's
 * explicit contract. Kept as a plain, explicit array (not built
 * directly as a Set) so a test can assert it contains exactly the
 * intended codes with no accidental duplicates -- resolveConsentGeoPolicy()
 * below derives a Set from this array once, for O(1) lookup.
 *
 * This is a POLICY/LEGAL grouping, not a fact baked into the resolver's
 * own logic -- if the regulatory scope ever changes (a country's EEA/EU
 * status changes, or the grouping is redefined), only this list needs
 * to change; resolveConsentGeoPolicy() itself never needs to be touched
 * (Phase 2A requirement 2: keep configuration separate from resolver
 * logic). This specific list should be periodically reviewed against
 * current EEA/UK/Switzerland membership -- it is not re-derived from
 * any external source at runtime.
 */
export const EUROPE_CONSENT_COUNTRY_CODES: readonly string[] = [
  // EU member states (27)
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
  // EEA members outside the EU (3)
  "IS", "LI", "NO",
  // United Kingdom
  "GB",
  // Switzerland (not EEA, included per Phase 2A's explicit instruction)
  "CH",
];

/**
 * The single country code with its own dedicated policy. Kept as a
 * named constant (rather than an inline string literal inside the
 * resolver) for the same "no scattered country checks" reason as the
 * Europe list above -- there is just one code in this group today.
 */
export const US_PRIVACY_COUNTRY_CODE = "US";

const EUROPE_CONSENT_COUNTRY_SET: ReadonlySet<string> = new Set(
  EUROPE_CONSENT_COUNTRY_CODES
);

/**
 * Normalizes a raw country-code input for policy lookup: trims
 * surrounding whitespace, uppercases, and validates it is exactly two
 * alphabetic characters (the ISO 3166-1 alpha-2 shape Vercel's
 * x-vercel-ip-country header uses). Returns null for anything that
 * doesn't satisfy that shape -- null, undefined, non-string, empty/
 * whitespace-only, wrong length, or containing non-letters. Never
 * throws.
 */
export function normalizeCountryCode(
  input: string | null | undefined
): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  if (trimmed.length !== 2) return null;
  const upper = trimmed.toUpperCase();
  if (!/^[A-Z]{2}$/.test(upper)) return null;
  return upper;
}

/**
 * The central geo policy resolver -- Phase 2A's own stated target
 * architecture:
 *
 *   x-vercel-ip-country -> Country Code -> resolveConsentGeoPolicy() -> Consent Policy
 *
 * Pure and deterministic: the same input always produces the same
 * output, with no side effects.
 *
 * - Missing/empty/malformed input -> SAFE_FALLBACK. Never guess, never
 *   default to a permissive policy for input that cannot be classified.
 * - US -> US_PRIVACY.
 * - Any code in EUROPE_CONSENT_COUNTRY_CODES -> EUROPE_CONSENT.
 * - Every other syntactically valid country code -- including India,
 *   which per Phase 2A's own contract has no special case of its own;
 *   it simply falls into the general "all other recognized countries"
 *   bucket, exactly like Australia, the UAE, or Nepal -- -> NORMAL.
 */
export function resolveConsentGeoPolicy(
  countryCode: string | null | undefined
): ConsentGeoPolicy {
  const normalized = normalizeCountryCode(countryCode);
  if (!normalized) return "SAFE_FALLBACK";
  if (normalized === US_PRIVACY_COUNTRY_CODE) return "US_PRIVACY";
  if (EUROPE_CONSENT_COUNTRY_SET.has(normalized)) return "EUROPE_CONSENT";
  return "NORMAL";
}
