"use client";

import {
  AnalyticsWindow, PlatformFilter, findMetric, getEngagement, websiteAnalyticsBatch,
} from "@/lib/admin/analyticsApi";
import {
  EmptyNote, ErrorBlock, KpiCard, KpiGrid, LoadingBlock, RankingTable, SectionPanel, UnavailableNote, WebsiteIdentityNote,
  identityMetricValue, useAnalyticsSection,
} from "./shared";

// Website-only marketing signals (Task 9 S11/S12 -- app_download_intent
// has no platform dimension to filter by; it can only ever come from
// the website). Not requested at all when the founder has filtered to
// "App" -- these numbers are structurally irrelevant to that view, not
// hidden data.
const WEBSITE_METRICS = [
  { metric_id: "app_download_intents_total" },
  { metric_id: "app_download_intents_by_cta_location", dimension: "cta_location", limit: 10 },
];

export default function AnalyticsProductUsageSection({ window, platform }: { window: AnalyticsWindow; platform: PlatformFilter }) {
  const engagement = useAnalyticsSection(() => getEngagement(window, platform), [window.start, window.end, platform]);
  const showWebsiteSignals = platform !== "app";
  const website = useAnalyticsSection(
    () => (showWebsiteSignals ? websiteAnalyticsBatch(window, WEBSITE_METRICS) : Promise.resolve(null)),
    [window.start, window.end, showWebsiteSignals],
  );

  return (
    <SectionPanel title="Product Usage" note="&ldquo;CTA&rdquo; = a call-to-action click (a button/link tap that leads somewhere); &ldquo;Feature&rdquo; = a specific tool or in-app action being used.">
      {engagement.state === "loading" && <LoadingBlock rows={3} />}
      {engagement.state === "error" && <ErrorBlock message={engagement.error} onRetry={engagement.retry} />}
      {engagement.state === "ready" && engagement.data && (
        <div className="space-y-3">
          <KpiGrid>
            <KpiCard label="CTA Clicks" value={engagement.data.cta_clicks_total} />
            <KpiCard label="Unique CTA Users" value={identityMetricValue(platform, engagement.data.cta_unique_users)} />
            <KpiCard label="Feature Uses" value={engagement.data.feature_usage_total} />
            <KpiCard label="Unique Feature Users" value={identityMetricValue(platform, engagement.data.feature_unique_users)} />
          </KpiGrid>
          <WebsiteIdentityNote platform={platform} />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-medium text-gray-600">Top tools &amp; features used</p>
              <RankingTable rows={engagement.data.feature_usage_by_feature_name} labelHeader="Feature" limit={10} />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-gray-600">Top CTAs (calls to action)</p>
              <RankingTable rows={engagement.data.cta_clicks_by_cta_id} labelHeader="CTA" limit={10} />
            </div>
          </div>
        </div>
      )}

      {showWebsiteSignals && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Website: app download intent</p>
          {website.state === "loading" && <LoadingBlock rows={2} />}
          {website.state === "error" && <ErrorBlock message={website.error} onRetry={website.retry} />}
          {website.state === "ready" && website.data && (() => {
            const total = findMetric(website.data, "app_download_intents_total");
            const byLocation = findMetric(website.data, "app_download_intents_by_cta_location");
            const totalValue = total && !total.error && total.status === "READY" && total.data && "value" in total.data ? total.data.value : null;
            const byLocationRows = byLocation && !byLocation.error && byLocation.status === "READY" && byLocation.data && "rows" in byLocation.data
              ? Object.fromEntries(byLocation.data.rows.map((r) => [r.dimension_value ?? "Unknown", r.count]))
              : null;
            if (totalValue === null && !byLocationRows) return <UnavailableNote reason={total?.reason || total?.message} />;
            return (
              <div className="space-y-2">
                <KpiGrid>
                  <KpiCard label="Play Store Click-throughs" value={totalValue ?? undefined} hint="From website CTAs (never on impression)" />
                </KpiGrid>
                {byLocationRows && Object.keys(byLocationRows).length > 0 ? (
                  <RankingTable rows={byLocationRows} labelHeader="Placement" limit={10} />
                ) : (
                  <EmptyNote>No app download clicks recorded yet.</EmptyNote>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </SectionPanel>
  );
}
