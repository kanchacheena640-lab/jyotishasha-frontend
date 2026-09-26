"use client";

import { PlatformFilter, RevenueDateRange, RevenueOrderRow, formatRupees, getRevenueOrders, PLATFORM_LABELS, SOURCE_LABELS } from "@/lib/admin/revenueApi";
import { EmptyNote, ErrorBlock, LoadingBlock, SectionPanel, useAnalyticsSection } from "@/components/admin/analytics/shared";

// Reports Revenue Dashboard -- Phase 1. Recent Paid Orders, PAID orders
// only, backend-paginated (no infinite scroll). Every value shown --
// platform, source, delivery_status -- is the backend's own label,
// mapped to display text ONLY (never reclassified). No customer PII is
// requested from or rendered by this component; the backend's
// /admin/api/revenue/orders response never includes name/email/phone.
function formatReportingDate(row: RevenueOrderRow): { text: string; title?: string } {
  if (!row.reporting_date) return { text: "—" };
  const d = new Date(row.reporting_date);
  const text = Number.isNaN(d.getTime())
    ? row.reporting_date
    : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  if (row.reporting_date_approximate) {
    return { text: `${text} (Approx.)`, title: "Exact payment timestamp unavailable for this order -- date shown is the order's own creation date." };
  }
  return { text };
}

export default function RevenueOrdersSection({ platform, range, page, perPage, onPageChange }: {
  platform: PlatformFilter;
  range: RevenueDateRange;
  page: number;
  perPage: number;
  onPageChange: (page: number) => void;
}) {
  const { data, state, error, retry } = useAnalyticsSection(
    () => getRevenueOrders(platform, range, page, perPage),
    [platform, range.start, range.end, page, perPage],
  );

  return (
    <SectionPanel title="Recent Paid Orders">
      {state === "loading" && <LoadingBlock rows={4} />}
      {state === "error" && <ErrorBlock message={error} onRetry={retry} />}
      {state === "ready" && data && data.orders.length === 0 && (
        <EmptyNote>No paid orders found for this period.</EmptyNote>
      )}
      {state === "ready" && data && data.orders.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-3 py-2">Order ID</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-3 py-2">Date</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-3 py-2">Platform</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-3 py-2">Report</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-3 py-2">Amount</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-3 py-2">Source</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-3 py-2">Delivery Status</th>
                </tr>
              </thead>
              <tbody>
                {data.orders.map((row) => {
                  const dateDisplay = formatReportingDate(row);
                  return (
                    <tr key={row.order_id} className="border-t border-gray-100">
                      <td className="px-3 py-2 text-gray-800">{row.order_id}</td>
                      <td className="px-3 py-2 text-gray-800" title={dateDisplay.title}>{dateDisplay.text}</td>
                      <td className="px-3 py-2 text-gray-800">{PLATFORM_LABELS[row.platform]}</td>
                      <td className="px-3 py-2 text-gray-800">{row.report_name}</td>
                      <td className="px-3 py-2 text-gray-800">{row.amount_valid ? formatRupees(row.amount ?? 0) : "—"}</td>
                      <td className="px-3 py-2 text-gray-800">{SOURCE_LABELS[row.source]}</td>
                      <td className="px-3 py-2 text-gray-800">{row.delivery_status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <button
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              Previous
            </button>
            <span className="text-gray-500">
              Page {data.pagination.page} of {Math.max(data.pagination.total_pages, 1)}
            </span>
            <button
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={page >= data.pagination.total_pages}
              onClick={() => onPageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </SectionPanel>
  );
}
