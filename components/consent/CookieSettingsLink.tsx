"use client";

/**
 * Task 8 S10 -- the persistent, discoverable entry point to change a
 * previously-made consent decision, wired into Footer.tsx (the site's
 * existing legal-links location) alongside Privacy Policy/Terms/Refund
 * Policy. Reopens the same ConsentPreferences panel the banner itself
 * uses -- no separate settings UI to maintain.
 *
 * Renders for every policy except EUROPE_CONSENT (preferencesAvailable).
 * For EUROPE_CONSENT, Google's certified Privacy & Messaging CMP is the
 * sole consent authority -- a Jyotishasha "Cookie Settings" link must
 * never offer a visitor an independent way to issue a conflicting consent
 * update or persist jyotishasha_consent_v1 as if it were authoritative.
 * NORMAL/US_PRIVACY visitors get it so they can review and withdraw
 * analytics/advertising (including the OpenAI Ads Pixel); their defaults
 * and the first-visit banner (still SAFE_FALLBACK only) are unchanged.
 * Footer.tsx itself is unchanged -- it always renders <CookieSettingsLink />;
 * this component decides its own visibility.
 */

import { useConsent } from "@/context/ConsentContext";

export default function CookieSettingsLink() {
  const { preferencesAvailable, openPreferences } = useConsent();

  if (!preferencesAvailable) return null;

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="text-gray-300 hover:text-white underline decoration-gray-500 hover:decoration-white transition text-left"
    >
      Cookie Settings
    </button>
  );
}
