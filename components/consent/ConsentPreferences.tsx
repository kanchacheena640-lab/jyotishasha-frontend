"use client";

/**
 * Task 8 -- the "Manage Preferences" panel: Necessary (always on,
 * disabled), Analytics, Advertising, each independently controllable.
 * Opened either from ConsentBanner's own "Manage Preferences" button
 * (first visit) or from CookieSettingsLink (Footer, any time after --
 * Task 8 S10's required discoverable withdrawal entry point).
 *
 * No pre-checked advertising, no dark patterns -- both toggles default
 * to their CURRENT stored state (or off, for a first-time visitor who
 * opened preferences directly instead of using Accept All/Reject).
 *
 * Geo-Aware Consent v1 Phase 2C: also gated on bannerEligible, as a
 * defense-in-depth twin to CookieSettingsLink's own gate -- even if
 * some future code path ever called openPreferences() for a
 * non-SAFE_FALLBACK visitor, this panel still refuses to render rather
 * than letting a Jyotishasha consent update compete with Google's
 * certified CMP (EUROPE_CONSENT) or appear where no gate is needed
 * (NORMAL/US_PRIVACY).
 */

import { useState } from "react";
import { useConsent } from "@/context/ConsentContext";

export default function ConsentPreferences() {
  const { consent, isPreferencesOpen, bannerEligible, closePreferences, setPreferences } = useConsent();

  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [advertising, setAdvertising] = useState(consent?.advertising ?? false);

  if (!isPreferencesOpen || !bannerEligible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-preferences-title"
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/60 p-4"
    >
      <div className="w-full max-w-md rounded-2xl bg-[#0f0c29] border border-purple-500/30 p-6 text-white shadow-2xl">
        <h2 id="consent-preferences-title" className="text-xl font-bold mb-2">
          Privacy Preferences
        </h2>
        <p className="text-gray-300 text-sm mb-5">
          Choose which optional cookies and similar technologies Jyotishasha may use.
          Necessary technology is always on because the site cannot function without it.
        </p>

        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
            <div>
              <p className="font-semibold">Necessary</p>
              <p className="text-gray-400 text-xs mt-1">
                Required for core site functionality (e.g. remembering your Kundali
                result, keeping the site working). Cannot be turned off.
              </p>
            </div>
            <input type="checkbox" checked disabled aria-label="Necessary (always on)" className="mt-1 h-5 w-5 accent-purple-500 opacity-60" />
          </div>

          <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
            <div>
              <p className="font-semibold">Analytics</p>
              <p className="text-gray-400 text-xs mt-1">
                Helps us understand how the site is used, so we can improve it.
              </p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              aria-label="Analytics"
              className="mt-1 h-5 w-5 accent-purple-500"
            />
          </div>

          <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
            <div>
              <p className="font-semibold">Advertising</p>
              <p className="text-gray-400 text-xs mt-1">
                Used for measuring and improving future marketing campaigns.
              </p>
            </div>
            <input
              type="checkbox"
              checked={advertising}
              onChange={(e) => setAdvertising(e.target.checked)}
              aria-label="Advertising"
              className="mt-1 h-5 w-5 accent-purple-500"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setPreferences({ analytics, advertising })}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Save Preferences
          </button>
          <button
            onClick={closePreferences}
            className="flex-1 border border-white/20 hover:bg-white/5 text-white font-semibold py-3 rounded-xl transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
