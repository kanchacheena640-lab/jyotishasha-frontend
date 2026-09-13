"use client";

import { AnalyticsWindow, PlatformFilter, findMetric, getReports, websiteAnalyticsBatch } from "@/lib/admin/analyticsApi";
import { ErrorBlock, KpiCard, KpiGrid, LoadingBlock, RankingTable, RateText, SectionPanel, useAnalyticsSection } from "./shared";

// report_purchase_intents_by_page = the SAME underlying signal as
// purchased_report.purchase_entry_clicks below (cta_click rows on the
// ONE catalog-entry CTA, report_catalog_buy_now), broken down by page
// instead of a flat total. Website-only (no platform param).
//
// This is a Task 11-only DISPATCH ALIAS (website_analytics_service.py),
// not a metric_id in the frozen website_metrics_contract.py catalog: it
// scopes the already-READY "cta_clicks_by_page" metric server-side
// (filtered to this one cta_id) rather than minting a new identity --
// its own handler docstring is explicit that the response's `metric_id`
// therefore comes back as "cta_clicks_by_page", never a fabricated
// "report_purchase_intents_by_page". Passing `dimension` here (instead
// of requesting this dedicated alias) is what the backend actually
// rejects with `unsupported_parameter` -- report_purchase_intent's own
// handler takes no dimension kwarg at all; the grouped-by-page view is
// only reachable through this separate, dimension-less metric_id.
const REPORT_INTENT_BY_PAGE_METRIC_ID = "report_purchase_intents_by_page";
const REPORT_INTENT_BY_PAGE_RETURNED_ID = "cta_clicks_by_page";

export default function AnalyticsReportsSection({ window, platform }: { window: AnalyticsWindow; platform: PlatformFilter }) {
  const reports = useAnalyticsSection(() => getReports(window, platform), [window.start, window.end, platform]);
  const showWebsiteIntent = platform !== "app";
  const website = useAnalyticsSection(
    () => (showWebsiteIntent ? websiteAnalyticsBatch(window, [{ metric_id: REPORT_INTENT_BY_PAGE_METRIC_ID, limit: 10 }]) : Promise.resolve(null)),
    [window.start, window.end, showWebsiteIntent],
  );

  if (reports.state === "loading") return <SectionPanel title="Reports"><LoadingBlock rows={4} /></SectionPanel>;
  if (reports.state === "error") return <SectionPanel title="Reports"><ErrorBlock message={reports.error} onRetry={reports.retry} /></SectionPanel>;
  if (!reports.data) return null;

  const { ai_report_engine: ai, purchased_report: purchased } = reports.data;

  const intentResult = website.state === "ready" && website.data ? findMetric(website.data, REPORT_INTENT_BY_PAGE_RETURNED_ID) : undefined;
  const intentRows = intentResult && !intentResult.error && intentResult.status === "READY" && intentResult.data && "rows" in intentResult.data
    ? Object.fromEntries(intentResult.data.rows.map((r) => [r.dimension_value ?? "Unknown page", r.count]))
    : null;

  return (
    <div className="space-y-3">
      {/* Two separate products, never merged into one funnel -- the AI
          Report Engine (subscription-gated) and the one-off Purchased
          Report (Order-based) are genuinely different journeys. */}
      <SectionPanel title="Reports — AI Report Engine (subscription-gated)">
        <div className="space-y-2">
          <KpiGrid>
            <KpiCard label="Discovery Views" value={ai.discovery_views} />
            <KpiCard label="Generation Started" value={ai.generation_started} />
            <KpiCard label="Generation Completed" value={ai.generation_completed} />
            <KpiCard label="Generation Failed" value={ai.generation_failed} />
          </KpiGrid>
          <RateText label="Completion rate" value={ai.completion_rate} />
          {Object.keys(ai.discovery_by_report_type).length > 0 && (
            <div>
              <p className="mb-1 mt-2 text-xs font-medium text-gray-600">By report type</p>
              <RankingTable rows={ai.discovery_by_report_type} labelHeader="Report type" limit={10} />
            </div>
          )}
        </div>
      </SectionPanel>

      <SectionPanel title="Reports — Purchased Report (one-off)" subtle>
        <div className="space-y-2">
          <KpiGrid>
            <KpiCard label="Purchase Entry Clicks" value={purchased.purchase_entry_clicks} />
            <KpiCard label="Payments Verified" value={purchased.payment_verified} />
            <KpiCard label="Generation Completed" value={purchased.generation_completed} />
            <KpiCard label="Generation Failed" value={purchased.generation_failed} />
          </KpiGrid>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <RateText label="Payment verification rate" value={purchased.verification_rate} />
            <RateText label="Generation completion rate" value={purchased.completion_rate} />
          </div>
          <p className="text-xs text-gray-500">
            Payments initiated: <strong>{purchased.payment_initiated.toLocaleString()}</strong> · Payments failed: <strong>{purchased.payment_failed.toLocaleString()}</strong>
          </p>
          {showWebsiteIntent && intentRows && Object.keys(intentRows).length > 0 && (
            <div>
              <p className="mb-1 mt-2 text-xs font-medium text-gray-600">Purchase intent by page (website)</p>
              <RankingTable rows={intentRows} labelHeader="Page" limit={10} />
            </div>
          )}
        </div>
      </SectionPanel>
    </div>
  );
}
