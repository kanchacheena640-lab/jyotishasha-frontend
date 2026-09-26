"use client";

/**
 * Reports Revenue Dashboard -- Phase 1, the internal /admin/revenue page.
 *
 * Built entirely on the Phase-1 BFF endpoints (/api/admin/revenue/*) --
 * this component never calls Flask directly and never touches
 * ADMIN_BRIDGE_SECRET (that stays inside lib/admin/revenueProxy.ts).
 *
 * Platform + date range are the ONE shared filter state the whole page
 * uses; changing either re-fetches both the summary (KPIs + Sales by
 * Source) and the Recent Paid Orders table, and resets the orders page
 * back to 1 -- each section still owns its own loading/error/retry
 * state (components/admin/analytics/shared.tsx's useAnalyticsSection),
 * so one section's failure never blanks out the other.
 *
 * Deliberately minimal, per the product brief: no charts, no ad-spend/
 * ROAS/CPC/CPA, no funnel analytics -- four KPI cards, one source
 * table, one paginated orders table.
 */

import { useEffect, useMemo, useState } from "react";
import { DatePreset, PlatformFilter, RevenueDateRange, computeDateRange, isValidCustomRange } from "@/lib/admin/revenueApi";
import { PageHeader } from "@/components/admin/analytics/shared";
import RevenueSummarySection from "./RevenueSummarySection";
import RevenueOrdersSection from "./RevenueOrdersSection";

const DATE_PRESETS: { value: DatePreset; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "this_month", label: "This Month" },
  { value: "custom", label: "Custom" },
];

const PLATFORM_OPTIONS: { value: PlatformFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "app", label: "App" },
];

const ORDERS_PER_PAGE = 25;

function pillButton(active: boolean): string {
  return `px-3 py-1.5 rounded-lg text-sm font-medium transition ${active ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100 border border-gray-200"}`;
}

export default function RevenuePageClient() {
  const [preset, setPreset] = useState<DatePreset>("30d");
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  // The range actually sent to the API for preset="custom" -- only
  // updated by pressing Apply with a valid range, so a half-typed date
  // never triggers a request. Initialized once, the moment the admin
  // switches into Custom, to the range the page was already showing.
  const [appliedCustomRange, setAppliedCustomRange] = useState<RevenueDateRange | null>(null);
  const [page, setPage] = useState(1);

  const range: RevenueDateRange = useMemo(() => {
    if (preset === "custom") return appliedCustomRange ?? computeDateRange("30d");
    return computeDateRange(preset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, appliedCustomRange]);

  // Reset the orders page to 1 whenever the effective filters change --
  // never leave the table stuck on, say, page 4 of a now-different range.
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform, range.start, range.end]);

  function handlePresetChange(next: DatePreset) {
    if (next === "custom" && preset !== "custom") {
      // Seed the custom inputs with the range currently on screen, and
      // apply it immediately (a no-op range change) so switching to
      // Custom never blanks the page while the admin picks new dates.
      setCustomStart(range.start);
      setCustomEnd(range.end);
      setAppliedCustomRange(range);
    }
    setPreset(next);
  }

  const canApplyCustomRange = isValidCustomRange(customStart, customEnd);

  return (
    <div>
      <PageHeader title="Revenue" helper="Verified paid orders and revenue across Web and App -- backend-authoritative." />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1">
          {DATE_PRESETS.map((p) => (
            <button key={p.value} className={pillButton(preset === p.value)} onClick={() => handlePresetChange(p.value)}>
              {p.label}
            </button>
          ))}
          {preset === "custom" && (
            <span className="ml-2 flex flex-wrap items-center gap-2">
              <input
                type="date" className="border border-gray-200 rounded px-2 py-1.5 text-sm text-black"
                value={customStart} max={customEnd || undefined}
                onChange={(e) => setCustomStart(e.target.value)}
              />
              <span className="text-gray-400">to</span>
              <input
                type="date" className="border border-gray-200 rounded px-2 py-1.5 text-sm text-black"
                value={customEnd} min={customStart || undefined}
                onChange={(e) => setCustomEnd(e.target.value)}
              />
              <button
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!canApplyCustomRange}
                onClick={() => setAppliedCustomRange({ start: customStart, end: customEnd })}
              >
                Apply
              </button>
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
        <RevenueSummarySection platform={platform} range={range} />
        <RevenueOrdersSection platform={platform} range={range} page={page} perPage={ORDERS_PER_PAGE} onPageChange={setPage} />
      </div>
    </div>
  );
}
