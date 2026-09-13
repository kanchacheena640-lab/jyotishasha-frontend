"use client";

import { AnalyticsWindow, PlatformFilter, getSubscriptions } from "@/lib/admin/analyticsApi";
import { ErrorBlock, KpiCard, KpiGrid, LimitationsNote, LoadingBlock, RankingTable, SectionPanel, useAnalyticsSection } from "./shared";

export default function AnalyticsSubscriptionsSection({ window, platform }: { window: AnalyticsWindow; platform: PlatformFilter }) {
  const { data, state, error, retry } = useAnalyticsSection(() => getSubscriptions(window, platform), [window.start, window.end, platform]);

  return (
    <SectionPanel title="Subscriptions">
      {state === "loading" && <LoadingBlock rows={3} />}
      {state === "error" && <ErrorBlock message={error} onRetry={retry} />}
      {state === "ready" && data && (
        <div className="space-y-3">
          <KpiGrid>
            <KpiCard label="Discovery Views" value={data.discovery_views} />
            <KpiCard label="Trials Started" value={data.trial_started} />
            <KpiCard label="Subscriptions Started" value={data.subscription_started} />
            <KpiCard label="Renewed" value={data.subscription_renewed} />
          </KpiGrid>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 sm:grid-cols-4">
            <span>Trials expired: <strong>{data.trial_expired.toLocaleString()}</strong></span>
            <span>Grace period: <strong>{data.subscription_grace_entered.toLocaleString()}</strong></span>
            <span>Expired: <strong>{data.subscription_expired.toLocaleString()}</strong></span>
            <span>Cancelled: <strong>{data.subscription_cancelled.toLocaleString()}</strong></span>
            <span>Refunded: <strong>{data.subscription_refunded.toLocaleString()}</strong></span>
          </div>
          {Object.keys(data.discovery_by_placement).length > 0 && (
            <div>
              <p className="mb-1 text-xs font-medium text-gray-600">Discovery by placement</p>
              <RankingTable rows={data.discovery_by_placement} labelHeader="Placement" limit={10} />
            </div>
          )}
          <LimitationsNote limitations={data.limitations} />
        </div>
      )}
    </SectionPanel>
  );
}
