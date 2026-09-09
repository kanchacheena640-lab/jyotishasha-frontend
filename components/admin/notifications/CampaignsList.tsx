"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CampaignsResponse, CampaignSummary, listCampaigns } from "@/lib/admin/notificationsApi";
import { audienceButton } from "../audiences/AudienceEditor";
import { audienceDate } from "../audiences/AudiencesList";

const ACTION_LABELS: Record<string, string> = { NONE: "None", APP_DEEP_LINK: "App", WEB_URL: "Web" };

export default function CampaignsList() {
  const [data, setData] = useState<CampaignsResponse | null>(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false; setData(null); setError("");
    listCampaigns(page, 20, search || undefined)
      .then(result => { if (!cancelled) setData(result); })
      .catch(e => { if (!cancelled) setError(e instanceof Error ? e.message : "Could not load campaigns."); });
    return () => { cancelled = true; };
  }, [page, search, retry]);

  const rows = data?.campaigns ?? null;
  const pagination = data?.pagination;

  return <div className="space-y-4 text-gray-900">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-xl font-semibold">Notification Campaigns</h1>
      <Link className={audienceButton + " bg-indigo-600 text-white hover:bg-indigo-700"} href="/admin/notifications/new">
        Create Campaign
      </Link>
    </div>
    <p className="text-xs text-gray-500">
      Every campaign starts as a DRAFT here. Open one to preview recipients, then Send Now or Schedule from the composer.
    </p>
    <input
      className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
      placeholder="Search by title…"
      value={search}
      onChange={e => { setSearch(e.target.value); setPage(1); }}
    />
    {error ? (
      <p role="alert" className="text-sm text-red-700">
        {error} <button className={audienceButton} onClick={() => setRetry(x => x + 1)}>Retry</button>
      </p>
    ) : rows === null ? (
      <p className="text-sm text-gray-500">Loading campaigns…</p>
    ) : !rows.length ? (
      <p className="text-sm text-gray-500">No campaign drafts yet. Create one to get started.</p>
    ) : (
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500">
            <tr>{["Title", "State", "Action", "Audience ID", "Updated", "View"].map(h => <th className="px-3 py-2" key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row: CampaignSummary) => (
              <tr key={row.id} className="border-t border-gray-100">
                <td className="max-w-xs break-words px-3 py-2 font-medium">{row.title}</td>
                <td className="px-3 py-2"><span className="rounded bg-amber-50 px-2 py-0.5 text-xs text-amber-700">{row.state}</span></td>
                <td className="px-3 py-2">{row.action_type ? ACTION_LABELS[row.action_type] ?? row.action_type : "—"}</td>
                <td className="px-3 py-2 text-gray-600">#{row.saved_audience_id}</td>
                <td className="px-3 py-2">{audienceDate(row.updated_at)}</td>
                <td className="px-3 py-2"><Link className="text-indigo-600 hover:underline" href={`/admin/notifications/${row.id}`}>Edit</Link></td>
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
