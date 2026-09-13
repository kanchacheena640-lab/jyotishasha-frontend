"use client";

import { AnalyticsWindow, PlatformFilter, getOverview } from "@/lib/admin/analyticsApi";
import { ErrorBlock, KpiCard, KpiGrid, LoadingBlock, SectionPanel, useAnalyticsSection } from "./shared";

export default function AnalyticsOverviewSection({ window, platform }: { window: AnalyticsWindow; platform: PlatformFilter }) {
  const { data, state, error, retry } = useAnalyticsSection(() => getOverview(window, platform), [window.start, window.end, platform]);

  return (
    <SectionPanel title="Overview">
      {state === "loading" && <LoadingBlock rows={2} />}
      {state === "error" && <ErrorBlock message={error} onRetry={retry} />}
      {state === "ready" && data && (
        <div className="space-y-3">
          <KpiGrid>
            <KpiCard label="Total Activity" value={data.total_events} hint="All recorded events" />
            <KpiCard label="Unique Users" value={data.unique_users} />
            <KpiCard label="App Sessions" value={data.app_sessions} />
            <KpiCard label="New Signups" value={data.new_signups} />
          </KpiGrid>
          <KpiGrid>
            <KpiCard label="Logins" value={data.interactive_logins} />
            <KpiCard label="Daily Active Users" value={data.dau} hint="Last 24h of range" />
            <KpiCard label="Weekly Active Users" value={data.wau} hint="Last 7d of range" />
            <KpiCard label="Monthly Active Users" value={data.mau} hint="Last 30d of range" />
          </KpiGrid>
        </div>
      )}
    </SectionPanel>
  );
}
