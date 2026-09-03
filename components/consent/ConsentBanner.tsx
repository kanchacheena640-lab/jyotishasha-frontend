"use client";

/**
 * Task 8 -- the first-visit consent banner: Accept All / Reject
 * Non-Essential / Manage Preferences. Renders nothing until the initial
 * storage check has completed (`checked`, avoids a flash for returning
 * visitors who already decided) and nothing once a decision exists
 * (`hasChosen`). ConsentPreferences (the "Manage Preferences" panel)
 * is rendered separately/always-mounted so CookieSettingsLink (Footer)
 * can reopen it at any time after the banner itself is gone.
 *
 * No dark patterns: all three actions are equally sized and styled;
 * "Reject Non-Essential" is not visually de-emphasized relative to
 * "Accept All".
 */

import { useConsent } from "@/context/ConsentContext";
import ConsentPreferences from "./ConsentPreferences";

export default function ConsentBanner() {
  const { checked, hasChosen, acceptAll, rejectNonEssential, openPreferences } = useConsent();

  return (
    <>
      {checked && !hasChosen && (
        <div
          role="region"
          aria-label="Cookie and privacy consent"
          className="fixed bottom-0 left-0 right-0 z-[150] border-t border-purple-500/30 bg-[#0f0c29]/98 backdrop-blur-sm px-4 py-4 sm:px-6"
        >
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-gray-200 text-sm flex-1">
              We use necessary technology to run Jyotishasha, and optional analytics
              and advertising technology to understand and improve the site. You can
              change your choice anytime in Cookie Settings. See our{" "}
              <a href="/privacy-policy" className="underline hover:text-purple-300">
                Privacy Policy
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                onClick={rejectNonEssential}
                className="border border-white/20 hover:bg-white/5 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={openPreferences}
                className="border border-white/20 hover:bg-white/5 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
              >
                Manage Preferences
              </button>
              <button
                onClick={acceptAll}
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
      <ConsentPreferences />
    </>
  );
}
