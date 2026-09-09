"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CampaignState, HistoryResponse, HistoryRow, listHistory } from "@/lib/admin/notificationsApi";
import { audienceButton } from "../audiences/AudienceEditor";
import { audienceDate } from "../audiences/AudiencesList";

const STATES: (CampaignState | "")[] = ["", "DRAFT", "SCHEDULED", "PROCESSING", "COMPLETED", "PARTIAL", "FAILED", "CANCELLED"];

const STATE_STYLE: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-700", SCHEDULED: "bg-indigo-100 text-indigo-800",
  PROCESSING: "bg-amber-100 text-amber-800", COMPLETED: "bg-green-100 text-green-800",
  PARTIAL: "bg-amber-100 text-amber-900", FAILED: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-200 text-gray-700",
};

export default function HistoryList() {
  const [data, setData] = useState<HistoryResponse | null>(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [state, setState] = useState<CampaignState | "">("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false; setData(null); setError("");
    listHistory({ page, page_size: 20, search: search || undefined, state: state || undefined })
      .then(result => { if (!cancelled) setData(result); })
      .catch(e => { if (!cancelled) setError(e instanceof Error ? e.message : "Could not load campaign history."); });
    return () => { cancelled = true; };
  }, [page, search, state, retry]);

  const rows = data?.campaigns ?? null;
  const pagination = data?.pagination;

  return <div className="space-y-4 text-gray-900">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-xl font-semibold">Campaign History</h1>
    </div>
    <p className="text-xs text-gray-500">
      Every campaign in every state -- Draft-only campaigns have nothing to monitor yet. &ldquo;Accepted&rdquo; below always
      means the push provider accepted the request, never that it reached a device.
    </p>
    <div className="flex flex-wrap gap-3">
      <input
        className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
        placeholder="Search by title…"
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
      />
      <select
        className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
        value={state}
        onChange={e => { setState(e.target.value as CampaignState | ""); setPage(1); }}
        aria-label="Filter by state"
      >
        {STATES.map(s => <option key={s || "ALL"} value={s}>{s || "All states"}</option>)}
      </select>
    </div>
    {error ? (
      <p role="alert" className="text-sm text-red-700">
        {error} <button className={audienceButton} onClick={() => setRetry(x => x + 1)}>Retry</button>
      </p>
    ) : rows === null ? (
      <p className="text-sm text-gray-500">Loading campaign history…</p>
    ) : !rows.length ? (
      <p className="text-sm text-gray-500">No campaigns match this filter.</p>
    ) : (
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500">
            <tr>{["Title", "State", "Execution", "Targets", "Scheduled for", "Updated", "View"].map(h => <th className="px-3 py-2" key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row: HistoryRow) => (
              <tr key={row.id} className="border-t border-gray-100">
                <td className="max-w-xs break-words px-3 py-2 font-medium">{row.title}</td>
                <td className="px-3 py-2"><span className={`rounded px-2 py-0.5 text-xs ${STATE_STYLE[row.state] ?? "bg-gray-100 text-gray-700"}`}>{row.state}</span></td>
                <td className="px-3 py-2 text-gray-600">{row.execution_state ?? "—"}</td>
                <td className="px-3 py-2 text-gray-600">{row.target_count ?? "—"}</td>
                <td className="px-3 py-2 text-gray-600">{row.scheduled_for ? audienceDate(row.scheduled_for) : "—"}</td>
                <td className="px-3 py-2">{audienceDate(row.updated_at)}</td>
                <td className="px-3 py-2">
                  {row.execution_id
                    ? <Link className="text-indigo-600 hover:underline" href={`/admin/notifications/history/${row.id}`}>Monitor</Link>
                    : <span className="text-gray-400">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {pagination && pagination.total_pages > 1 && (
      <div className="flex items-center gap-3 text-sm">
        <button className={audienceButton} disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span className="text-gray-600">Page {pagination.page} of {pagination.total_pages} ({pagination.total_count} total)</span>
        <button className={audienceButton} disabled={page >= pagination.total_pages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    )}
  </div>;
}
