"use client";

/**
 * Admin Analytics A2 -- the founder-facing /admin/analytics page.
 *
 * Built entirely on the A1 BFF endpoints (/api/admin/analytics/*,
 * /api/admin/website-analytics/*) -- this component never calls Flask
 * directly and never touches ADMIN_BRIDGE_SECRET (that stays inside
 * the server-only proxy files). Every section fetches its own metric
 * domain and owns its own loading/error/retry state (shared.tsx's
 * useAnalyticsSection), so one domain's failure never blanks out the
 * rest of the page.
 *
 * Date range and platform are the ONE shared filter state the whole
 * page uses; changing either re-fetches every section consistently
 * (each section's own effect depends on window.start/end + platform).
 * There is no day-count keyword on the Phase 6B analytics/* contract
 * (only an arbitrary caller-supplied [start, end) window) -- 7d/30d/90d
 * are computed client-side once (lib/admin/analyticsApi.ts::
 * computeWindow) and reused verbatim for the Website Analytics batch
 * call via its own period="custom" form, so both API families stay in
 * lockstep from one control.
 */

import { useMemo, useState } from "react";
import { DatePreset, PlatformFilter, computeWindow } from "@/lib/admin/analyticsApi";
import { PageHeader } from "./shared";
import AnalyticsOverviewSection from "./AnalyticsOverviewSection";
import AnalyticsProductUsageSection from "./AnalyticsProductUsageSection";
import AnalyticsAskNowSection from "./AnalyticsAskNowSection";
import AnalyticsReportsSection from "./AnalyticsReportsSection";
import AnalyticsSubscriptionsSection from "./AnalyticsSubscriptionsSection";

const DATE_PRESETS: { value: DatePreset; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "custom", label: "Custom" },
];

const PLATFORM_OPTIONS: { value: PlatformFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "website", label: "Website" },
  { value: "app", label: "App" },
];

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function pillButton(active: boolean): string {
  return `px-3 py-1.5 rounded-lg text-sm font-medium transition ${active ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100 border border-gray-200"}`;
}

export default function AnalyticsPageClient() {
  const [preset, setPreset] = useState<DatePreset>("30d");
  const [customStart, setCustomStart] = useState<string>(todayIso());
  const [customEnd, setCustomEnd] = useState<string>(todayIso());
  const [platform, setPlatform] = useState<PlatformFilter>("all");

  // Recomputed only when an input actually changes -- a "custom" preset
  // with an incomplete/invalid range (end <= start) falls back to the
  // last valid 30d window rather than sending AnalyticsWindow's own
  // rejection (InvalidAnalyticsWindow: start must be strictly before
  // end) to the backend on every keystroke.
  const window = useMemo(() => {
    if (preset === "custom") {
      if (!customStart || !customEnd || customEnd < customStart) return computeWindow("30d");
      return computeWindow("custom", customStart, customEnd);
    }
    return computeWindow(preset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, customStart, customEnd]);

  return (
    <div>
      <PageHeader
        title="Analytics"
        helper="Product activity across the website and app -- first-party data only. Website page views/sessions live in GA4 and are not duplicated here."
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1">
          {DATE_PRESETS.map((p) => (
            <button key={p.value} className={pillButton(preset === p.value)} onClick={() => setPreset(p.value)}>
              {p.label}
            </button>
          ))}
          {preset === "custom" && (
            <span className="ml-2 flex items-center gap-2">
              <input type="date" className="border border-gray-200 rounded px-2 py-1.5 text-sm text-black" value={customStart} max={customEnd} onChange={(e) => setCustomStart(e.target.value)} />
              <span className="text-gray-400">to</span>
              <input type="date" className="border border-gray-200 rounded px-2 py-1.5 text-sm text-black" value={customEnd} min={customStart} max={todayIso()} onChange={(e) => setCustomEnd(e.target.value)} />
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <span className="mr-1 text-xs text-gray-500">Platform:</span>
          {PLATFORM_OPTIONS.map((p) => (
            <button key={p.value} className={pillButton(platform === p.value)} onClick={() => setPlatform(p.value)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <AnalyticsOverviewSection window={window} platform={platform} />
        <AnalyticsProductUsageSection window={window} platform={platform} />
        <AnalyticsAskNowSection window={window} platform={platform} />
        <AnalyticsReportsSection window={window} platform={platform} />
        <AnalyticsSubscriptionsSection window={window} platform={platform} />
      </div>
    </div>
  );
}
