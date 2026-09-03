"use client";

/**
 * Task 8 S10 -- the persistent, discoverable entry point to change a
 * previously-made consent decision, wired into Footer.tsx (the site's
 * existing legal-links location) alongside Privacy Policy/Terms/Refund
 * Policy. Reopens the same ConsentPreferences panel the banner itself
 * uses -- no separate settings UI to maintain.
 */

import { useConsent } from "@/context/ConsentContext";

export default function CookieSettingsLink() {
  const { openPreferences } = useConsent();

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
