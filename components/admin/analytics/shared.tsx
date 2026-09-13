"use client";

// Admin Analytics A2 -- small shared presentation pieces, styled to
// match the EXISTING Admin design system exactly (Users page's KPI
// card grid, CampaignMonitor.tsx's section-panel/funnel/rate idiom,
// UsersTable.tsx's table/th/td/skeleton/error/empty conventions). No
// new visual language is introduced.

import { ReactNode, useEffect, useState } from "react";
import { PlatformFilter } from "@/lib/admin/analyticsApi";

/** Each section fetches and owns its own loading/error/retry state --
 * matching CampaignMonitor.tsx's own per-panel (AttemptsPanel/
 * DeliveriesPanel) fetch idiom -- so one section's failure (e.g.
 * Subscriptions) never blanks out an unrelated, already-loaded section
 * (e.g. Overview). `fetcher` is intentionally NOT a dependency (a new
 * closure every render); only `deps` (window/platform) re-triggers a
 * fetch, matching the existing eslint-disable-exhaustive-deps
 * convention already used elsewhere in this Admin codebase (e.g.
 * UsersPageClient.tsx's own chips useMemo). */
export function useAnalyticsSection<T>(fetcher: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    fetcher()
      .then((d) => { if (!cancelled) { setData(d); setState("ready"); } })
      .catch((e) => { if (!cancelled) { setError(e instanceof Error ? e.message : "Couldn't load this data."); setState("error"); } });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  return { data, state, error, retry: () => setTick((t) => t + 1) };
}

export function PageHeader({ title, helper }: { title: string; helper?: string }) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {helper && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
}

export function KpiCard({ label, value, hint }: { label: string; value: number | string | undefined; hint?: string }) {
  return (
    <div className="border border-gray-200 rounded-xl bg-white p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-xl font-bold text-gray-900">
        {value === undefined ? "—" : typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {hint && <p className="mt-0.5 text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}

export function KpiGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{children}</div>;
}

/** "Sessions" = COUNT(DISTINCT session_id) -- the SAME query and value
 * regardless of platform (never changed here); only the LABEL adapts,
 * since session_id is genuinely populated by both the app (one id per
 * process lifetime) and the website (one id per browser tab/session,
 * lib/analyticsSession.ts) -- calling it "App Sessions" under a Website
 * filter was actively wrong, not just imprecise. Never called a "GA4
 * session" or implied equivalent to one -- this is a first-party,
 * differently-defined count. */
export function sessionsLabel(platform: PlatformFilter): string {
  if (platform === "website") return "Website Sessions";
  if (platform === "app") return "App Sessions";
  return "Sessions";
}

/** The backend has no concept of "not available" for these fields --
 * count_distinct_users()/DAU/WAU/MAU are real integers, always 0 when
 * genuinely 0. The distinction this makes is purely about what a real
 * backend 0 for anonymous website traffic actually MEANS: website
 * events never carry firebase_uid at all (anonymous_ingestion_service.py:
 * "performs NO identity resolution at all... firebase_uid ... always
 * literal None"), so this is not "0 people" but "identity not
 * measurable here" -- shown as text, never as a fabricated non-zero
 * number and never as a bare 0 that could be misread as real activity
 * being absent. */
export function identityMetricValue(platform: PlatformFilter, value: number): number | string {
  return platform === "website" ? "Not available" : value;
}

export const WEBSITE_IDENTITY_LIMITATION_NOTE =
  "Unique-user metrics require signed-in user identity and are not available for anonymous website activity.";

/** Rendered once per section that has identity-dependent cards --
 * never per card -- and only when Platform = Website (App/All keep
 * their real backend values with no limitation note at all). */
export function WebsiteIdentityNote({ platform }: { platform: PlatformFilter }) {
  if (platform !== "website") return null;
  return <p className="text-xs text-amber-700">{WEBSITE_IDENTITY_LIMITATION_NOTE}</p>;
}

export function SectionPanel({
  title, subtle = false, children, note,
}: { title: string; subtle?: boolean; children: ReactNode; note?: string }) {
  return (
    <div className={`rounded-lg border border-gray-200 p-3 text-sm ${subtle ? "bg-gray-50" : ""}`}>
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</h2>
      {children}
      {note && <p className="mt-2 text-xs text-gray-500">{note}</p>}
    </div>
  );
}

/** A rate the backend may legitimately return as `null` (denominator
 * was zero, analytics_contract.compute_rate()) -- never displayed as
 * 0% or omitted silently. Founder-facing wording, not the internal
 * "UNKNOWN" developer term. */
export function RateText({ label, value }: { label: string; value: number | null }) {
  return (
    <span>
      {label}: <strong>{value === null ? "Not enough data yet" : `${(value * 100).toFixed(1)}%`}</strong>
    </span>
  );
}

/** The backend's own `reason` text is written for a developer (event
 * names, "correlation_id", "session_id") -- accurate, but not what a
 * founder needs to read. This maps the few limitations this page
 * surfaces to the SAME underlying fact in plain business language.
 * The limitation itself is never hidden or weakened here: an entry not
 * yet mapped still renders the backend's own real `reason` verbatim
 * (never silently dropped), and the `metric` key/data this note is
 * describing is untouched -- only which sentence is displayed changes. */
const LIMITATION_FOUNDER_TEXT: Record<string, string> = {
  "asknow.attempt_linkage": "Ask Now metrics show overall activity and delivery rates; individual questions are not matched to specific answers.",
  "subscription.placement_attribution": "Subscription metrics show overall activity; exact visit-to-subscription attribution is not currently available.",
};

export function LimitationsNote({ limitations }: { limitations?: { metric: string; reason: string }[] }) {
  if (!limitations || limitations.length === 0) return null;
  return (
    <div className="mt-2 space-y-1">
      {limitations.map((l) => (
        <p key={l.metric} className="text-xs text-amber-700">{LIMITATION_FOUNDER_TEXT[l.metric] ?? l.reason}</p>
      ))}
    </div>
  );
}

/** A generic "here is why this isn't a number" note -- used for a
 * BLOCKED/GA4_EXTERNAL website metric, or a batch item that itself
 * errored. Renders the backend's own honest reason, never a fake 0. */
export function UnavailableNote({ reason }: { reason?: string }) {
  return <p className="text-xs text-gray-500">{reason || "Not available."}</p>;
}

export function LoadingBlock({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-100 rounded animate-pulse w-full" />
      ))}
    </div>
  );
}

export function ErrorBlock({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="py-2 text-center">
      <p role="alert" className="mb-2 text-sm text-red-600">{message}</p>
      <button onClick={onRetry} className="text-xs px-3 py-1.5 bg-gray-100 rounded hover:bg-gray-200">
        Retry
      </button>
    </div>
  );
}

export function EmptyNote({ children }: { children: ReactNode }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}

/** A simple "value ranked descending" table -- reused for every
 * dimension breakdown on this page (top features, top CTAs, discovery
 * by placement, etc.). No chart library; a scannable table is the
 * whole widget, per A2's own explicit UI guidance. */
export function RankingTable({
  rows, labelHeader = "Name", valueHeader = "Count", labelFor, limit = 10,
}: {
  rows: Record<string, number>;
  labelHeader?: string;
  valueHeader?: string;
  labelFor?: (key: string) => string;
  limit?: number;
}) {
  const entries = Object.entries(rows).sort((a, b) => b[1] - a[1]).slice(0, limit);
  if (entries.length === 0) return <EmptyNote>No activity recorded yet.</EmptyNote>;
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full min-w-[360px] border-collapse text-left text-xs">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 py-2 font-semibold text-gray-500 uppercase">{labelHeader}</th>
            <th className="px-3 py-2 font-semibold text-gray-500 uppercase">{valueHeader}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {entries.map(([key, value]) => (
            <tr key={key}>
              <td className="px-3 py-2 text-gray-800">{labelFor ? labelFor(key) : key}</td>
              <td className="px-3 py-2 text-gray-800">{value.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
