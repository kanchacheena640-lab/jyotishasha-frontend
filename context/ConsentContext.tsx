"use client";

/**
 * Task 8 / Geo-Aware Consent v1 Phase 2B -- React state layer over
 * lib/consent.ts, matching this repo's own existing
 * context/LanguageContext.tsx convention exactly (plain
 * createContext/useContext, no external state library).
 *
 * Reads the geo policy cookie and (where relevant) stored consent once
 * on mount (client-only -- localStorage/cookies aren't meaningfully
 * read during SSR); `checked` distinguishes "still checking" from
 * "checked, no decision found yet" so ConsentBanner never flashes for a
 * returning visitor who already has a stored choice.
 *
 * POLICY-DRIVEN BEHAVIOR (replaces the removed India-only diagnostic
 * bypass, commit aa12e67 -- see lib/geo.ts for the full policy
 * classification and app/layout.tsx for the matching bootstrap-script
 * behavior, which independently implements the same per-policy rules
 * for the REAL Google Consent Mode default; this context only controls
 * the Jyotishasha custom banner/preferences UI, never Consent Mode
 * itself):
 *
 *   NORMAL / US_PRIVACY -- no Jyotishasha consent gate is relevant.
 *     A genuinely stored prior decision (if the visitor ever explicitly
 *     used Cookie Settings) is still restored -- never fabricated --
 *     but bannerEligible is false, so the banner never auto-appears.
 *
 *   EUROPE_CONSENT -- Google's certified Privacy & Messaging CMP is the
 *     sole consent authority for this region. This deliberately never
 *     reads localStorage for this policy, so a stale Jyotishasha-only
 *     decision can never become authoritative here; bannerEligible is
 *     false so the Jyotishasha banner never competes with Google's CMP.
 *
 *   SAFE_FALLBACK -- the original, full custom banner/storage/update
 *     mechanism (Task 8's own foundation), completely unchanged:
 *     bannerEligible is true, a real stored decision is restored.
 */

import { createContext, useContext, useEffect, useState } from "react";
import {
  ConsentChoice,
  ConsentState,
  readConsentGeoPolicyCookie,
  pushConsentUpdate,
  readStoredConsent,
  writeConsent,
} from "@/lib/consent";
import type { ConsentGeoPolicy } from "@/lib/geo";

interface ConsentContextValue {
  /** null until a real decision has been made (or restored from storage). */
  consent: ConsentState | null;
  /** true once consent has been decided (fresh choice or restored). */
  hasChosen: boolean;
  /** true once the initial policy/storage read has completed -- gates
   * whether the banner is safe to show/hide without a flash. */
  checked: boolean;
  /** This visitor's resolved geo consent policy (lib/geo.ts). */
  policy: ConsentGeoPolicy;
  /** Whether the Jyotishasha custom banner is even a valid consent
   * surface for this visitor -- false for NORMAL/US_PRIVACY (no gate
   * needed) and EUROPE_CONSENT (Google's CMP is authoritative there);
   * true only for SAFE_FALLBACK. See this file's own module docstring. */
  bannerEligible: boolean;
  isPreferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  setPreferences: (choice: ConsentChoice) => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [checked, setChecked] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [policy, setPolicy] = useState<ConsentGeoPolicy>("SAFE_FALLBACK");

  useEffect(() => {
    if (typeof window === "undefined") {
      setChecked(true);
      return;
    }

    const resolvedPolicy = readConsentGeoPolicyCookie(document.cookie);
    setPolicy(resolvedPolicy);

    // EUROPE_CONSENT: Google's certified Privacy & Messaging CMP is the
    // sole consent authority for this region -- deliberately never
    // reads localStorage here, so a stale/local Jyotishasha-only
    // decision can never become authoritative for a European visitor.
    if (resolvedPolicy === "EUROPE_CONSENT") {
      setChecked(true);
      return;
    }

    // NORMAL / US_PRIVACY / SAFE_FALLBACK: restore a REAL prior decision
    // if one exists (never fabricated) -- this is the same restoration
    // this app has always done. Only bannerEligible (derived below)
    // actually differs per policy; a genuine explicit choice, however
    // it was made, is always honored.
    try {
      const stored = readStoredConsent(window.localStorage);
      if (stored) setConsent(stored);
    } catch {
      // Storage unavailable -- treat as "no decision yet"; the banner
      // will show (SAFE_FALLBACK only), and applyChoice() below already
      // tolerates a failing write the same way.
    } finally {
      setChecked(true);
    }
    // Deliberately mount-once -- matches this codebase's own established
    // once-per-mount init pattern (e.g. components/analytics/WebsiteAnalyticsInit.tsx).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyChoice = (choice: ConsentChoice) => {
    let next: ConsentState;
    if (typeof window !== "undefined") {
      next = writeConsent(window.localStorage, choice);
    } else {
      next = { version: 1, ...choice, updatedAt: new Date().toISOString() };
    }
    setConsent(next);
    setIsPreferencesOpen(false);
    // Fire-and-forget, decoupled from the state update above -- a
    // failure here (e.g. dataLayer unavailable) never prevents the
    // user's own choice from being recorded/reflected in the UI.
    pushConsentUpdate(choice);
  };

  const value: ConsentContextValue = {
    consent,
    hasChosen: consent !== null,
    checked,
    policy,
    bannerEligible: policy === "SAFE_FALLBACK",
    isPreferencesOpen,
    openPreferences: () => setIsPreferencesOpen(true),
    closePreferences: () => setIsPreferencesOpen(false),
    acceptAll: () => applyChoice({ analytics: true, advertising: true }),
    rejectNonEssential: () => applyChoice({ analytics: false, advertising: false }),
    setPreferences: (choice: ConsentChoice) => applyChoice(choice),
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
