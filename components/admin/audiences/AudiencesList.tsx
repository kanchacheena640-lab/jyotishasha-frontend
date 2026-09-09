"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AudiencesResponse, SavedAudience, audienceRequest } from "@/lib/admin/audiencesApi";
import { audienceButton } from "./AudienceEditor";

export function audienceDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(/(?:Z|[+-]\d\d:\d\d)$/.test(value) ? value : `${value}Z`);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString();
}
export default function AudiencesList() {
  const [rows, setRows] = useState<SavedAudience[] | null>(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let cancelled = false; setRows(null); setError("");
    audienceRequest<AudiencesResponse>().then(data => { if (!cancelled) setRows(data.audiences); }).catch(e => { if (!cancelled) setError(e instanceof Error ? e.message : "Could not load audiences."); });
    return () => { cancelled = true; };
  }, [retry]);
  return <div className="space-y-4 text-gray-900">
    <div className="flex items-center justify-between"><h1 className="text-xl font-semibold">Audiences</h1><Link className={audienceButton} href="/admin/users">Create from Users filters</Link></div>
    {error ? <p role="alert" className="text-sm text-red-700">{error} <button className={audienceButton} onClick={() => setRetry(x => x + 1)}>Retry</button></p> : rows === null ? <p className="text-sm text-gray-500">Loading audiences…</p> : !rows.length ? <p className="text-sm text-gray-500">No saved audiences. Apply filters on Users, then choose Save Audience.</p> :
      <div className="overflow-x-auto rounded-lg border border-gray-200"><table className="w-full text-left text-sm"><thead className="bg-gray-50 text-xs text-gray-500"><tr>{["Audience", "Description", "Status", "Created", "Updated", "Action"].map(h => <th className="px-3 py-2" key={h}>{h}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.id} className="border-t border-gray-100"><td className="px-3 py-2 font-medium">{row.name}</td><td className="max-w-xs break-words px-3 py-2 text-gray-600">{row.description || "—"}</td><td className="px-3 py-2">{row.is_active ? "Active" : "Inactive"}</td><td className="px-3 py-2">{audienceDate(row.created_at)}</td><td className="px-3 py-2">{audienceDate(row.updated_at)}</td><td className="px-3 py-2"><Link className="text-indigo-600 hover:underline" href={`/admin/audiences/${row.id}`}>View</Link></td></tr>)}</tbody></table></div>}
  </div>;
}
