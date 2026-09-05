"use client";

/**
 * Task 8 -- React state layer over lib/consent.ts, matching this
 * repo's own existing context/LanguageContext.tsx convention exactly
 * (plain createContext/useContext, no external state library).
 *
 * Reads stored consent once on mount (client-only -- localStorage isn't
 * available during SSR); `checked` distinguishes "still checking
 * storage" from "checked, no decision found yet" so ConsentBanner never
 * flashes for a returning visitor who already has a stored choice (the
 * REAL Google Consent Mode default was already applied correctly by
 * app/layout.tsx's own beforeInteractive script before this component
 * ever mounts -- this state is purely about the banner's own
 * visibility, not consent correctness).
 */

import { createContext, useContext, useEffect, useState } from "react";
import {
  ConsentChoice,
  ConsentState,
  isIndiaConsentBypassActive,
  pushConsentUpdate,
  readStoredConsent,
  writeConsent,
} from "@/lib/consent";

interface ConsentContextValue {
  /** null until a real decision has been made (or restored from storage). */
  consent: ConsentState | null;
  /** true once consent has been decided (fresh choice or restored). */
  hasChosen: boolean;
  /** true once the initial storage read has completed -- gates whether
   * the banner is safe to show/hide without a flash. */
  checked: boolean;
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

  useEffect(() => {
    if (typeof window === "undefined") {
      setChecked(true);
      return;
    }
    // TEMPORARY diagnostic (Sep 2026 GA4 investigation): India traffic
    // (per middleware.js's Vercel-geolocation cookie) skips the
    // denied-by-default state and banner entirely -- an in-memory-only
    // "fully granted" value that is never written to localStorage, so a
    // real consent decision is unaffected once this bypass is removed.
    // See lib/consent.ts's isIndiaConsentBypassActive for the full note.
    if (isIndiaConsentBypassActive(document.cookie)) {
      setConsent({
        version: 1,
        analytics: true,
        advertising: true,
        updatedAt: new Date().toISOString(),
      });
      setChecked(true);
      return;
    }
    try {
      const stored = readStoredConsent(window.localStorage);
      if (stored) setConsent(stored);
    } catch {
      // Storage unavailable -- treat as "no decision yet"; the banner
      // will show, and applyChoice() below already tolerates a failing
      // write the same way.
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
