"use client";

import { PlatformFilter, RevenueDateRange, formatRupees, getRevenueSummary, ALL_SOURCES, SOURCE_LABELS } from "@/lib/admin/revenueApi";
import { ErrorBlock, KpiCard, KpiGrid, LoadingBlock, SectionPanel, useAnalyticsSection } from "@/components/admin/analytics/shared";

// Reports Revenue Dashboard -- Phase 1. Presentation only: every KPI and
// source row below is rendered exactly as the backend computed it
// (modules/payments/revenue_dashboard_service.py) -- paid status,
// revenue, "Emailed", and source classification are never recalculated
// or reclassified here. On a failed fetch this renders ErrorBlock only
// -- it never falls back to a fabricated 0/empty summary.
export default function RevenueSummarySection({ platform, range }: { platform: PlatformFilter; range: RevenueDateRange }) {
  const { data, state, error, retry } = useAnalyticsSection(() => getRevenueSummary(platform, range), [platform, range.start, range.end]);

  if (state === "loading") return <LoadingBlock rows={2} />;
  if (state === "error") return <ErrorBlock message={error} onRetry={retry} />;
  if (!data) return null;

  return (
    <div className="space-y-4">
      <KpiGrid>
        <KpiCard label="Total Paid Orders" value={data.kpis.total_paid_orders} />
        <KpiCard label="Total Revenue" value={formatRupees(data.kpis.total_revenue)} />
        <KpiCard label="Reports Emailed" value={data.kpis.reports_emailed} />
        <KpiCard label="Average Order Value" value={formatRupees(data.kpis.average_order_value)} />
      </KpiGrid>

      {/* Metadata is never turned into extra KPI cards -- per the product
          requirement, only invalid_amount_orders gets a small note;
          unknown_platform_orders and timezone_assumption are deliberately
          never surfaced here (unknown platform already shows as "Unknown"
          in the table itself; the timezone assumption is an internal/API
          concern, not dashboard UI). */}
      {data.metadata.invalid_amount_orders > 0 && (
        <p className="text-xs text-amber-700">Some historical paid orders have incomplete amount data.</p>
      )}

      <SectionPanel title="Sales by Source">
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-3 py-2">Source</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-3 py-2">Paid Orders</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-3 py-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {ALL_SOURCES.map((sourceKey) => {
                const row = data.sources.find((s) => s.source === sourceKey);
                return (
                  <tr key={sourceKey} className="border-t border-gray-100">
                    <td className="px-3 py-2 text-gray-800">{SOURCE_LABELS[sourceKey]}</td>
                    <td className="px-3 py-2 text-gray-800">{(row?.orders ?? 0).toLocaleString()}</td>
                    <td className="px-3 py-2 text-gray-800">{formatRupees(row?.revenue ?? 0)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionPanel>
    </div>
  );
}
