"use client";

import { useEffect, useRef, useState } from "react";
import { AudienceInput, SavedAudience, SavedAudienceCriteria, SavedAudiencePreview, appliedFiltersToCriteria, audienceRequest, criteriaSummary, criteriaToEditor, editedCriteria, previewCriteria } from "@/lib/admin/audiencesApi";
import UsersFilterPanel from "../users/UsersFilterPanel";

export const audienceButton = "rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50";
const input = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900";

// Saved Audience V2 -- criteria is null for a FIXED audience (explicit
// users.id membership, never rendered as filter chips here -- the
// member list/count itself is shown via the live preview, same as any
// DYNAMIC audience's member_count).
export function CriteriaSummary({ criteria }: { criteria: SavedAudienceCriteria | null }) {
  if (criteria === null) return <p className="text-sm font-medium text-gray-700">Fixed audience — explicit selected members</p>;
  const summary = criteriaSummary(criteria);
  return summary.length ? <ul className="flex flex-wrap gap-2 text-xs text-gray-600">{summary.map(item => <li key={item} className="rounded bg-gray-100 px-2 py-1">{item}</li>)}</ul> : <p className="text-sm font-medium text-gray-700">Audience: All Users</p>;
}

export default function AudienceEditor({ initialCriteria, audience, onClose, onSaved }: {
  initialCriteria: SavedAudienceCriteria | null; audience?: SavedAudience; onClose: () => void; onSaved: (audience: SavedAudience) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState(audience?.name ?? "");
  const [description, setDescription] = useState(audience?.description ?? "");
  const [criteria, setCriteria] = useState(initialCriteria);
  const [draft, setDraft] = useState<ReturnType<typeof criteriaToEditor> | null>(null);
  const [preview, setPreview] = useState<{ key: string; result: SavedAudiencePreview } | null>(null);
  const [previewError, setPreviewError] = useState("");
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [busy, setBusy] = useState(false);
  const key = JSON.stringify(criteria);
  const unchanged = key === JSON.stringify(initialCriteria);

  useEffect(() => { dialog.current?.showModal(); }, []);
  useEffect(() => {
    let cancelled = false;
    setPreview(null); setPreviewError("");
    // Metadata-only edits preserve historical criteria and use existing-audience validation.
    const request = audience && unchanged
      ? audienceRequest<SavedAudiencePreview>(`/${audience.id}/preview?page=1&page_size=5`)
      // Reached only for a DYNAMIC audience (new, or an edited criteria
      // draft applied) -- criteria is never null here in practice; the
      // Fixed path always takes the "unchanged" branch above.
      : criteria ? previewCriteria(criteria) : Promise.reject(new Error("This audience has no editable criteria to preview."));
    request.then(result => { if (!cancelled) setPreview({ key, result }); })
      .catch(e => { if (!cancelled) setPreviewError(e instanceof Error ? e.message : "Preview failed."); });
    return () => { cancelled = true; };
  }, [criteria, key, audience, unchanged, retry]);

  async function save() {
    if (!preview || preview.key !== key || draft || !name.trim() || busy) return;
    setBusy(true); setError("");
    const body: Partial<AudienceInput> = { name: name.trim(), description };
    if (!audience || !unchanged) body.criteria = criteria;
    try {
      const saved = await audienceRequest<SavedAudience>(audience ? `/${audience.id}` : "", audience ? "PATCH" : "POST", body);
      onSaved(saved);
    } catch (e) { setError(e instanceof Error ? e.message : "Save failed."); setBusy(false); }
  }

  return <dialog ref={dialog} aria-labelledby="audience-editor-title" onCancel={e => { e.preventDefault(); if (!busy) onClose(); }} className="w-[calc(100%-2rem)] max-w-3xl rounded-xl bg-white p-0 text-gray-900 shadow-xl backdrop:bg-black/40">
    <div className="flex items-center justify-between border-b p-4"><h2 id="audience-editor-title" className="font-semibold">{audience ? "Edit Audience" : "Save Audience"}</h2><button aria-label="Close" disabled={busy} onClick={onClose} className={audienceButton}>×</button></div>
    <div className="max-h-[70vh] overflow-y-auto space-y-4 p-4">
      <label className="block text-sm">Audience Name *<input autoFocus required maxLength={200} disabled={busy} className={input} value={name} onChange={e => setName(e.target.value)} /></label>
      <label className="block text-sm">Description<textarea disabled={busy} className={input} rows={2} value={description} onChange={e => setDescription(e.target.value)} /></label>
      <CriteriaSummary criteria={criteria} />
      <p className="text-xs text-gray-500">Members are resolved from these filters when previewed and may change over time.</p>
      {/* Saved Audience V2 -- a FIXED audience's criteria is always null
          (membership is immutable, explicit users.id rows, never an
          editable filter object) -- never offer "Edit criteria" for one. */}
      {audience && audience.audience_type !== "fixed" && criteria !== null && !draft && <button disabled={busy} className={audienceButton} onClick={() => { try { setDraft(criteriaToEditor(criteria)); setError(""); } catch (e) { setError(e instanceof Error ? e.message : "Cannot edit criteria."); } }}>Edit criteria</button>}
      {draft && <div className="space-y-4 border-t pt-3">
        <label className="block text-sm">Search<input className={input} value={draft.search} onChange={e => setDraft({ ...draft, search: e.target.value })} /></label>
        <UsersFilterPanel filters={draft.filters} onChange={filters => setDraft({ ...draft, filters })} booleanCriteria={draft.booleans} onBooleanCriteriaChange={booleans => setDraft({ ...draft, booleans })} />
        <div className="flex gap-2"><button className={audienceButton} onClick={() => { try {
          // draft only exists via "Edit criteria," which is hidden for a
          // FIXED audience (criteria === null) -- initialCriteria is
          // therefore guaranteed non-null whenever this handler runs.
          setCriteria(audience ? editedCriteria(draft.search, draft.filters, initialCriteria as SavedAudienceCriteria, draft.booleans) : appliedFiltersToCriteria(draft.search, draft.filters));
          setDraft(null); setError("");
        } catch (e) { setError(e instanceof Error ? e.message : "Invalid criteria."); } }}>Apply criteria & preview</button><button className={audienceButton} onClick={() => setDraft(null)}>Cancel criteria changes</button></div>
      </div>}
      <div aria-live="polite">
        {preview?.key === key ? <p className="text-sm font-medium">Current members: {preview.result.member_count}</p> : previewError ? <div role="alert" className="text-sm text-red-700">{previewError} <button className={audienceButton} onClick={() => setRetry(x => x + 1)}>Retry preview</button></div> : <p className="text-sm text-gray-500">Loading preview…</p>}
      </div>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    </div>
    <div className="flex justify-end gap-2 border-t p-4"><button disabled={busy} className={audienceButton} onClick={onClose}>Cancel</button><button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white disabled:opacity-50" disabled={busy || !!draft || !name.trim() || preview?.key !== key} onClick={save}>{busy ? "Saving…" : "Save Audience"}</button></div>
  </dialog>;
}
