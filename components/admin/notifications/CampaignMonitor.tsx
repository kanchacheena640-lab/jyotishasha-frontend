"use client";
import { Fragment, useEffect, useState } from "react";
import {
  AttemptsResponse, CampaignMonitorDetail, DeliveriesResponse, DeliveryStatus,
  getCampaignMonitor, listAttempts, listDeliveries,
} from "@/lib/admin/notificationsApi";
import { audienceButton } from "../audiences/AudienceEditor";
import { formatIst, formatUtc } from "@/lib/admin/scheduleTimezone";

const DELIVERY_LABELS: Record<DeliveryStatus, string> = {
  PENDING: "Pending", ACCEPTED: "Accepted by push provider", FAILED_RETRYABLE: "Failed (will retry)",
  FAILED_PERMANENT: "Failed", UNKNOWN: "Unknown (no confirmed outcome)", SUPPRESSED: "Suppressed",
};

function Rate({ value, label }: { value: number | "UNKNOWN"; label: string }) {
  return <span>{label}: <strong>{value === "UNKNOWN" ? "UNKNOWN / NOT AVAILABLE" : `${(value * 100).toFixed(1)}%`}</strong></span>;
}

function AttemptsPanel({ deliveryId }: { deliveryId: string }) {
  const [data, setData] = useState<AttemptsResponse | null>(null);
  useEffect(() => { listAttempts(deliveryId).then(setData).catch(() => setData(null)); }, [deliveryId]);
  if (!data) return <p className="text-xs text-gray-500">Loading attempts…</p>;
  if (!data.attempts.length) return <p className="text-xs text-gray-500">No attempts recorded yet.</p>;
  return <div className="overflow-x-auto"><table className="w-full min-w-[520px] whitespace-nowrap text-left text-xs">
    <thead className="text-gray-500"><tr>{["#", "Started", "Outcome", "Provider", "Error code"].map(h => <th className="px-2 py-1" key={h}>{h}</th>)}</tr></thead>
    <tbody>
      {data.attempts.map(a => (
        <tr key={a.attempt_number} className="border-t border-gray-100">
          <td className="px-2 py-1">{a.attempt_number}</td>
          <td className="px-2 py-1">{formatUtc(a.started_at)}</td>
          <td className="px-2 py-1">{a.outcome ?? "ATTEMPTING"}</td>
          <td className="px-2 py-1">{a.provider}</td>
          <td className="px-2 py-1 text-gray-600">{a.error_code ?? "—"}</td>
        </tr>
      ))}
    </tbody>
  </table></div>;
}

function DeliveriesPanel({ executionId }: { executionId: string }) {
  const [data, setData] = useState<DeliveriesResponse | null>(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<DeliveryStatus | "">("");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false; setData(null);
    listDeliveries(executionId, page, 20, status || undefined).then(r => { if (!cancelled) setData(r); });
    return () => { cancelled = true; };
  }, [executionId, page, status]);

  return <div className="space-y-2">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h3 className="text-sm font-semibold">Deliveries</h3>
      <select className="rounded-lg border border-gray-300 px-2 py-1 text-xs" value={status}
        onChange={e => { setStatus(e.target.value as DeliveryStatus | ""); setPage(1); }} aria-label="Filter deliveries by status">
        <option value="">All statuses</option>
        {(Object.keys(DELIVERY_LABELS) as DeliveryStatus[]).map(s => <option key={s} value={s}>{DELIVERY_LABELS[s]}</option>)}
      </select>
    </div>
    {!data ? <p className="text-xs text-gray-500">Loading deliveries…</p> : !data.deliveries.length ? (
      <p className="text-xs text-gray-500">No deliveries match this filter.</p>
    ) : (
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[640px] whitespace-nowrap text-left text-xs">
          <thead className="bg-gray-50 text-gray-500"><tr>{["User ID", "Status", "Attempts", "Last attempted", "Accepted at", ""].map(h => <th className="px-2 py-1" key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {data.deliveries.map(d => (
              <Fragment key={d.id}>
                <tr className="border-t border-gray-100">
                  <td className="px-2 py-1">{d.user_id}</td>
                  <td className="px-2 py-1">{DELIVERY_LABELS[d.status]}{d.suppression_reason ? ` (${d.suppression_reason})` : ""}</td>
                  <td className="px-2 py-1">{d.attempt_count}</td>
                  <td className="px-2 py-1">{d.last_attempted_at ? formatUtc(d.last_attempted_at) : "—"}</td>
                  <td className="px-2 py-1">{d.accepted_at ? formatUtc(d.accepted_at) : "—"}</td>
                  <td className="px-2 py-1">
                    {d.attempt_count > 0 && (
                      <button className="text-indigo-600 hover:underline" onClick={() => setExpanded(x => x === d.id ? null : d.id)}>
                        {expanded === d.id ? "Hide" : "Attempts"}
                      </button>
                    )}
                  </td>
                </tr>
                {expanded === d.id && (
                  <tr><td colSpan={6} className="bg-gray-50 px-2 py-2"><AttemptsPanel deliveryId={d.id} /></td></tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {data && data.pagination.total_pages > 1 && (
      <div className="flex items-center gap-2 text-xs">
        <button className={audienceButton} disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {data.pagination.page} of {data.pagination.total_pages}</span>
        <button className={audienceButton} disabled={page >= data.pagination.total_pages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    )}
  </div>;
}

export default function CampaignMonitor({ campaignId }: { campaignId: string }) {
  const [detail, setDetail] = useState<CampaignMonitorDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    getCampaignMonitor(campaignId)
      .then(d => { if (!cancelled) setDetail(d); })
      .catch(e => { if (!cancelled) setError(e instanceof Error ? e.message : "Could not load campaign."); });
    return () => { cancelled = true; };
  }, [campaignId]);

  if (error) return <p role="alert" className="text-sm text-red-700">{error}</p>;
  if (!detail) return <p className="text-sm text-gray-500">Loading…</p>;

  const m = detail.metrics;

  return <div className="space-y-4 text-gray-900">
    <div>
      <h1 className="text-xl font-semibold">{detail.campaign.title}</h1>
      <p className="text-xs text-gray-500">Campaign {detail.campaign.state} · Execution {detail.state}{detail.hold_reason ? ` (${detail.hold_reason})` : ""}</p>
    </div>

    <div className="grid grid-cols-2 gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm sm:grid-cols-3">
      <span>Targets: <strong>{m.target_count}</strong></span>
      {(Object.keys(DELIVERY_LABELS) as DeliveryStatus[]).map(s => (
        <span key={s}>{DELIVERY_LABELS[s]}: <strong>{m.delivery_counts[s] ?? 0}</strong></span>
      ))}
    </div>
    <p className="text-xs text-gray-500">&ldquo;Accepted by push provider&rdquo; confirms the provider accepted the request -- it is not proof the message reached the device.</p>

    <div className="grid grid-cols-1 gap-2 rounded-lg border border-gray-200 p-3 text-sm sm:grid-cols-2">
      <span>Notification opened: <strong>{m.notification_opened_count}</strong></span>
      <span>Destination opened: <strong>{m.destination_opened_count}</strong></span>
      <Rate value={m.open_rate} label="Open rate (opened / accepted)" />
      <Rate value={m.destination_rate} label="Destination rate (destination / opened)" />
      <span>Conversions (24h last-click, Report/Ask Now/Subscription purchases only): <strong>{m.conversion_count}</strong></span>
      <Rate value={m.conversion_rate} label="Conversion rate (conversions / accepted)" />
    </div>

    <p className="text-xs text-gray-500">
      {detail.scheduled_for && <>Scheduled: {formatIst(detail.scheduled_for)} · </>}
      Frozen: {detail.frozen_at ? formatUtc(detail.frozen_at) : "—"} · Started: {detail.started_at ? formatUtc(detail.started_at) : "—"} · Completed: {detail.completed_at ? formatUtc(detail.completed_at) : "—"}
    </p>

    <DeliveriesPanel executionId={detail.id} />
  </div>;
}
