// lib/playStoreAttribution.ts

/**
 * Task 5 -- constructs Google Play's official `referrer` query parameter
 * for the website's outbound Play Store links, so the campaign
 * attribution already present in the URL (utm_source/utm_medium/
 * utm_campaign, already sent today as plain query params) can ALSO
 * reach the installed Android app after install, via the Play Install
 * Referrer API.
 *
 * CRITICAL FACT THIS FILE EXISTS TO FIX (Task 5 forensic audit): plain
 * `?utm_source=...&utm_medium=...&utm_campaign=...` query parameters on
 * a play.google.com/store/apps/details URL are NOT automatically
 * forwarded to the installed app. Google Play only captures and later
 * exposes ONE specific parameter, literally named `referrer`, to the
 * app via the (Google-official) Play Install Referrer API
 * (`ReferrerDetails.installReferrer`) -- and only as a single opaque
 * string, which by Google's own documented convention is itself a
 * URL-encoded query string (e.g. "utm_source=x&utm_medium=y"). The
 * plain utm_* params already on this site's outbound links continue to
 * exist unchanged (they still feed Google Play Console's own
 * acquisition reports) -- this file ADDS the one additional `referrer`
 * parameter alongside them; it does not replace or alter them.
 *
 * Non-PII only: exactly utm_source/utm_medium/utm_campaign and an
 * optional, already-controlled cta_location -- never a website
 * session_id (Task 5 S4's explicit prohibition: it would create
 * unnecessary cross-surface persistent linkage and isn't needed for
 * campaign-level acquisition measurement), never any other identifier.
 *
 * Pure and framework-free, for the same testability reasons as every
 * other lib/*.ts file in this project (no test runner installed).
 */

import { buildAppDownloadCtaLocation } from "./websiteEvents";

export interface PlayStoreReferrerUtm {
  source: string;
  medium?: string;
  campaign?: string;
}

/**
 * Builds the INNER query-string value that becomes Google Play's
 * `referrer` parameter -- e.g. "utm_source=daily_panchang&utm_medium=
 * primary_cta&utm_campaign=hero&cta_location=daily_panchang_primary_cta".
 * Each field is independently `encodeURIComponent`-escaped so a value
 * can never break the query-string shape; the OUTER escaping (so this
 * whole string survives as a single `referrer=` value on the Play URL)
 * is left to the caller's own `URLSearchParams.set()`, which does that
 * correctly and is already how every existing utm_* param on these
 * URLs is set.
 *
 * Returns undefined only when there is truly nothing to attach (no utm
 * source and no cta_location) -- callers must omit the `referrer`
 * parameter entirely in that case, never send an empty one.
 */
export function buildPlayStoreReferrerValue(
  utm: PlayStoreReferrerUtm | undefined,
  ctaLocation?: string
): string | undefined {
  const parts: string[] = [];
  if (utm?.source) parts.push(`utm_source=${encodeURIComponent(utm.source)}`);
  if (utm?.medium) parts.push(`utm_medium=${encodeURIComponent(utm.medium)}`);
  if (utm?.campaign) parts.push(`utm_campaign=${encodeURIComponent(utm.campaign)}`);
  if (ctaLocation) parts.push(`cta_location=${encodeURIComponent(ctaLocation)}`);
  return parts.length > 0 ? parts.join("&") : undefined;
}

export interface AppDownloadPlayStoreUrlOptions {
  defaultMedium: string;
  defaultCampaign: string;
  ctaLocationFallback: string;
}

/**
 * The COMPLETE, pure, unit-testable URL-building logic shared by both
 * AppDownloadCTA.tsx and StickyAppDownloadCTA.tsx's `buildLink()` --
 * extracted here so it is independently testable end-to-end (existing
 * package id/utm_* behavior, encoding, the new referrer param, missing-
 * utm fallback) without needing a component-rendering harness this repo
 * doesn't have. Both components now call this directly.
 *
 * `base` is passed in (not hardcoded here) so the existing, unchanged
 * Play Store package-id URL each component already defines stays that
 * component's own single source of truth.
 */
export function buildAppDownloadPlayStoreUrl(
  base: string,
  utm: { source: string; medium?: string; campaign?: string } | undefined,
  options: AppDownloadPlayStoreUrlOptions
): string {
  if (!utm) return base;

  const url = new URL(base);
  const resolvedMedium = utm.medium || options.defaultMedium;
  const resolvedCampaign = utm.campaign || options.defaultCampaign;

  // Unchanged from before Task 5 -- still feed Google Play Console's
  // own acquisition reports, still exactly the existing behavior.
  url.searchParams.set("utm_source", utm.source);
  url.searchParams.set("utm_medium", resolvedMedium);
  url.searchParams.set("utm_campaign", resolvedCampaign);

  // Task 5 -- ADDS Google Play's one app-readable attribution channel
  // alongside the params above; never replaces them.
  const ctaLocation = buildAppDownloadCtaLocation(utm, options.ctaLocationFallback, options.defaultMedium);
  const referrerValue = buildPlayStoreReferrerValue(
    { source: utm.source, medium: resolvedMedium, campaign: resolvedCampaign },
    ctaLocation
  );
  if (referrerValue) url.searchParams.set("referrer", referrerValue);

  return url.toString();
}
