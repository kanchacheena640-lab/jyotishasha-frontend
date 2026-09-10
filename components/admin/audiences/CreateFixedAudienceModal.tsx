"use client";

import { useEffect, useRef, useState } from "react";
import { SavedAudience, createFixedAudience } from "@/lib/admin/audiencesApi";
import { audienceButton } from "./AudienceEditor";

const input = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900";

/**
 * Saved Audience V2 -- "Create Audience from Selected" (Admin Users
 * checkboxes -> explicit FIXED audience). Deliberately much simpler
 * than AudienceEditor: no criteria/filters, no live network preview
 * before saving (the count is exactly selectedUserIds.length -- there
 * is nothing dynamic to resolve yet), and audience_type is always
 * "fixed". A one-user selection is the intended production-canary flow
 * (task's own explicit example): select exactly one row -> save ->
 * Composer preview resolves Matched: 1.
 */
export default function CreateFixedAudienceModal({ selectedUserIds, onClose, onSaved }: {
  selectedUserIds: number[]; onClose: () => void; onSaved: (audience: SavedAudience) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { dialog.current?.showModal(); }, []);

  async function save() {
    if (!name.trim() || busy || !selectedUserIds.length) return;
    setBusy(true); setError("");
    try {
      const saved = await createFixedAudience(name.trim(), description, selectedUserIds);
      onSaved(saved);
    } catch (e) { setError(e instanceof Error ? e.message : "Save failed."); setBusy(false); }
  }

  return <dialog ref={dialog} aria-labelledby="fixed-audience-editor-title" onCancel={e => { e.preventDefault(); if (!busy) onClose(); }} className="w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white p-0 text-gray-900 shadow-xl backdrop:bg-black/40">
    <div className="flex items-center justify-between border-b p-4">
      <h2 id="fixed-audience-editor-title" className="font-semibold">Create Audience from Selected</h2>
      <button aria-label="Close" disabled={busy} onClick={onClose} className={audienceButton}>×</button>
    </div>
    <div className="space-y-4 p-4">
      <p className="text-sm font-medium text-gray-700">Selected users: {selectedUserIds.length}</p>
      <p className="text-xs text-gray-500">
        This creates a FIXED audience — an explicit, immutable list of exactly these users. It will never
        expand as user attributes change, and can never resolve as All Users.
      </p>
      <label className="block text-sm">Audience Name *
        <input autoFocus required maxLength={200} disabled={busy} className={input} value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label className="block text-sm">Description
        <textarea disabled={busy} className={input} rows={2} value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    </div>
    <div className="flex justify-end gap-2 border-t p-4">
      <button disabled={busy} className={audienceButton} onClick={onClose}>Cancel</button>
      <button
        className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
        disabled={busy || !name.trim() || !selectedUserIds.length}
        onClick={save}
      >{busy ? "Saving…" : "Save Fixed Audience"}</button>
    </div>
  </dialog>;
}
