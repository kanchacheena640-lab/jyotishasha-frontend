"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SavedAudience, SavedAudiencePreview, audienceRequest } from "@/lib/admin/audiencesApi";
import AudienceEditor, { CriteriaSummary, audienceButton } from "./AudienceEditor";
import UsersTable, { UsersTableState } from "../users/UsersTable";
import { fetchAskNowConcernCategories } from "@/lib/admin/usersApi";

export default function AudienceDetail({ id }: { id: string }) {
  const [audience, setAudience] = useState<SavedAudience | null>(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<SavedAudiencePreview | null>(null);
  const [previewError, setPreviewError] = useState("");
  const [state, setState] = useState<UsersTableState>("loading");
  const [page, setPage] = useState(1);
  const [retry, setRetry] = useState(0);
  const [previewRetry, setPreviewRetry] = useState(0);
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[] | null>(null);
  useEffect(() => {
    let cancelled = false; setAudience(null); setError("");
    audienceRequest<SavedAudience>(`/${id}`).then(data => { if (!cancelled) setAudience(data); }).catch(e => { if (!cancelled) setError(e instanceof Error ? e.message : "Could not load audience."); });
    fetchAskNowConcernCategories().then(data => { if (!cancelled) setCategories(data); }).catch(() => { if (!cancelled) setCategories(null); });
    return () => { cancelled = true; };
  }, [id, retry]);
  useEffect(() => {
    let cancelled = false; setState("loading"); setPreview(null); setPreviewError(""); setSelected([]);
    audienceRequest<SavedAudiencePreview>(`/${id}/preview?page=${page}&page_size=20`).then(data => { if (!cancelled) { setPreview(data); setState("ready"); } }).catch(e => { if (!cancelled) { setPreviewError(e instanceof Error ? e.message : "Preview failed."); setState("error"); } });
    return () => { cancelled = true; };
  }, [id, page, previewRetry]);
  async function toggleActive() {
    if (!audience || busy) return;
    if (audience.is_active && !window.confirm(`Deactivate audience “${audience.name}”? It will remain available for preview and reactivation.`)) return;
    setBusy(true); setError("");
    try {
      const next = await audienceRequest<SavedAudience>(`/${id}`, audience.is_active ? "DELETE" : "PATCH", audience.is_active ? undefined : { is_active: true });
      setAudience(next); setNotice(next.is_active ? "Audience reactivated." : "Audience deactivated.");
    } catch (e) { setError(e instanceof Error ? e.message : "Update failed."); } finally { setBusy(false); }
  }
  const historical = audience?.criteria.filters.ask_now_concern?.filter(name => categories !== null && !categories.includes(name)) ?? [];
  return <div className="space-y-4 text-gray-900">
    <Link href="/admin/audiences" className="text-sm text-indigo-600 hover:underline">← Audiences</Link>
    {notice && <p role="status" className="text-sm text-green-700">{notice}</p>}
    {error && <p role="alert" className="text-sm text-red-700">{error} {!audience && <button className={audienceButton} onClick={() => setRetry(x => x + 1)}>Retry</button>}</p>}
    {!audience && !error && <p className="text-sm text-gray-500">Loading audience…</p>}
    {audience && <>
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-xl font-semibold">{audience.name}</h1><span className="text-xs text-gray-500">{audience.is_active ? "Active" : "Inactive — preview remains available"}</span></div><div className="flex gap-2"><button disabled={busy} className={audienceButton} onClick={() => setEditing(true)}>Edit Audience</button><button disabled={busy} className={audienceButton} onClick={toggleActive}>{busy ? "Updating…" : audience.is_active ? "Deactivate Audience" : "Reactivate Audience"}</button></div></div>
      {audience.description && <p className="text-sm text-gray-600 whitespace-pre-wrap">{audience.description}</p>}
      <CriteriaSummary criteria={audience.criteria} />
      {historical.length > 0 && <p className="text-xs text-amber-700">Retained historical/inactive Ask Now criteria: {historical.join(", ")}. Existing membership can still be previewed. Editing criteria requires backend validation.</p>}
      {categories === null && !!audience.criteria.filters.ask_now_concern?.length && <p className="text-xs text-gray-500">Category availability could not be confirmed. Stored concern criteria are retained.</p>}
      <div className="flex items-center justify-between"><p aria-live="polite" className="text-sm font-medium">{state === "ready" ? `Current members: ${preview?.member_count}` : state === "loading" ? "Loading current members…" : "Current member count unavailable"}</p><button className={audienceButton} onClick={() => setPreviewRetry(x => x + 1)}>Refresh preview</button></div>
      <UsersTable state={state} rows={preview?.users ?? []} page={page} pageSize={20} totalCount={preview?.pagination.total_count ?? 0} onPageChange={setPage} selectedIds={selected} onToggleSelect={id => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])} onToggleSelectAllOnPage={(ids, checked) => setSelected(checked ? ids : [])} onRetry={() => setPreviewRetry(x => x + 1)} errorMessage={previewError} />
      {editing && <AudienceEditor audience={audience} initialCriteria={audience.criteria} onClose={() => setEditing(false)} onSaved={saved => { setAudience(saved); setEditing(false); setPage(1); setPreviewRetry(x => x + 1); setNotice("Audience saved."); }} />}
    </>}
  </div>;
}
