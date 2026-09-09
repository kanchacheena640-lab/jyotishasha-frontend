"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { audienceRequest, AudiencesResponse, SavedAudience } from "@/lib/admin/audiencesApi";
import { audienceButton } from "../audiences/AudienceEditor";
import {
  APP_DEEP_LINK_LABELS, APP_DEEP_LINK_TARGETS, AppDeepLinkTarget, CampaignAction, CampaignDraft,
  ExecutionDetail, NONE_ACTION, NotificationApiError, RecipientPreview, urlLooksApproved,
  createCampaign, getCampaign, getExecution, previewRecipients, updateCampaign,
} from "@/lib/admin/notificationsApi";
import SendNowPanel from "./SendNowPanel";
import SchedulePanel from "./SchedulePanel";

const TITLE_LIMIT = 200;
const BODY_LIMIT = 500;

function isAudienceAllUsers(audience: SavedAudience | undefined): boolean {
  return !!audience && Object.keys(audience.criteria?.filters ?? {}).length === 0;
}

export default function CampaignComposer({ id }: { id?: string }) {
  const router = useRouter();
  const isEdit = !!id;

  const [audiences, setAudiences] = useState<SavedAudience[] | null>(null);
  const [audiencesError, setAudiencesError] = useState("");

  const [loading, setLoading] = useState(isEdit);
  const [loadError, setLoadError] = useState("");
  const [existing, setExisting] = useState<CampaignDraft | null>(null);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [savedAudienceId, setSavedAudienceId] = useState<number | "">("");
  const [action, setAction] = useState<CampaignAction>(NONE_ACTION);
  const [webUrl, setWebUrl] = useState("");

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveErrorCode, setSaveErrorCode] = useState<string | undefined>();
  const [notice, setNotice] = useState("");

  const [preview, setPreview] = useState<RecipientPreview | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState("");
  const previewToken = useRef(0);

  const [execution, setExecution] = useState<ExecutionDetail | null>(null);
  const [executionError, setExecutionError] = useState("");

  useEffect(() => {
    let cancelled = false;
    audienceRequest<AudiencesResponse>("?is_active=true")
      .then(data => { if (!cancelled) setAudiences(data.audiences); })
      .catch(e => { if (!cancelled) setAudiencesError(e instanceof Error ? e.message : "Could not load audiences."); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!isEdit || !id) return;
    let cancelled = false; setLoading(true); setLoadError("");
    getCampaign(id)
      .then(data => {
        if (cancelled) return;
        setExisting(data); setTitle(data.title); setBody(data.body);
        setSavedAudienceId(data.saved_audience_id); setAction(data.action);
        if (data.action.type === "WEB_URL") setWebUrl(data.action.parameters.url);
        setLoading(false);
      })
      .catch(e => { if (!cancelled) { setLoadError(e instanceof Error ? e.message : "Could not load campaign."); setLoading(false); } });
    return () => { cancelled = true; };
  }, [id, isEdit]);

  // Live preview -- re-resolved whenever the selected audience or (for an
  // existing draft) its revision changes. Never a persisted member list;
  // freshness_seconds/generated_at come straight from the backend. Only
  // meaningful while the campaign is still an editable DRAFT -- once an
  // execution exists the approved definition is frozen and this preview
  // is no longer the relevant recipient signal (execution status is).
  const isDraftState = !existing || existing.state === "DRAFT";
  useEffect(() => {
    if (!savedAudienceId || !isDraftState) { setPreview(null); setPreviewError(""); return; }
    const token = ++previewToken.current;
    setPreviewLoading(true); setPreviewError("");
    const request = isEdit && existing ? { campaign_id: existing.id, revision: existing.revision } : { saved_audience_id: savedAudienceId };
    previewRecipients(request)
      .then(result => { if (previewToken.current === token) { setPreview(result); setPreviewLoading(false); } })
      .catch(e => { if (previewToken.current === token) { setPreviewError(e instanceof Error ? e.message : "Preview unavailable."); setPreviewLoading(false); } });
  }, [savedAudienceId, isEdit, existing?.id, existing?.revision, isDraftState]);

  // Execution status -- fetched once a draft has one (state != DRAFT).
  useEffect(() => {
    if (!existing?.execution_id) { setExecution(null); return; }
    let cancelled = false;
    getExecution(existing.execution_id)
      .then(data => { if (!cancelled) setExecution(data); })
      .catch(e => { if (!cancelled) setExecutionError(e instanceof Error ? e.message : "Could not load execution status."); });
    return () => { cancelled = true; };
  }, [existing?.execution_id]);

  const selectedAudience = audiences?.find(a => a.id === savedAudienceId);
  const allUsersSelected = isAudienceAllUsers(selectedAudience);

  function updateAction(next: Partial<CampaignAction> & { type: CampaignAction["type"] }) {
    if (next.type === "NONE") setAction(NONE_ACTION);
    else if (next.type === "APP_DEEP_LINK") setAction({ type: "APP_DEEP_LINK", target: (next as { target: AppDeepLinkTarget }).target ?? "ASK_NOW", parameters: {} });
    else setAction({ type: "WEB_URL", target: "HTTPS_URL", parameters: { url: webUrl } });
  }

  async function handleSave() {
    if (saving) return;
    setSaving(true); setSaveError(""); setSaveErrorCode(undefined); setNotice("");
    const finalAction: CampaignAction = action.type === "WEB_URL" ? { type: "WEB_URL", target: "HTTPS_URL", parameters: { url: webUrl } } : action;
    const payload = {
      title, body, audience_mode: "SAVED_AUDIENCE" as const,
      saved_audience_id: typeof savedAudienceId === "number" ? savedAudienceId : 0,
      action: finalAction,
      ...(isEdit && existing ? { revision: existing.revision } : {}),
    };
    try {
      const result = isEdit && id ? await updateCampaign(id, payload) : await createCampaign(payload);
      setExisting(result); setNotice("Draft saved.");
      if (!isEdit) router.replace(`/admin/notifications/${result.id}`);
    } catch (e) {
      if (e instanceof NotificationApiError) { setSaveError(e.message); setSaveErrorCode(e.code); }
      else setSaveError("Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function handleExecutionCreated(next: ExecutionDetail) {
    setExecution(next);
    if (id) getCampaign(id).then(setExisting).catch(() => {});
  }

  if (loading) return <p className="text-sm text-gray-500">Loading campaign…</p>;
  if (loadError) return <p role="alert" className="text-sm text-red-700">{loadError}</p>;

  // Once a campaign leaves DRAFT, editing is over -- state is
  // authority, not the UI (N4.25): show a read-only summary plus the
  // execution status/drift-reconfirm panel, never the editable form.
  if (existing && existing.state !== "DRAFT") {
    return <div className="max-w-2xl space-y-5 text-gray-900">
      <Link href="/admin/notifications" className="text-sm text-indigo-600 hover:underline">← Campaigns</Link>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{existing.title}</h1>
        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">{existing.state}</span>
      </div>
      <p className="whitespace-pre-wrap text-sm text-gray-700">{existing.body}</p>
      <dl className="text-sm text-gray-600">
        <div><dt className="inline font-medium">Audience: </dt><dd className="inline">{existing.audience_name ?? `#${existing.saved_audience_id}`}</dd></div>
      </dl>
      {executionError && <p role="alert" className="text-sm text-red-700">{executionError}</p>}
      {execution ? (
        <SendNowPanel campaign={existing} preview={null} action={existing.action} webUrl={existing.action.type === "WEB_URL" ? existing.action.parameters.url : ""} execution={execution} onExecutionCreated={handleExecutionCreated} />
      ) : <p className="text-sm text-gray-500">Loading execution status…</p>}
    </div>;
  }

  const titleTooLong = title.length > TITLE_LIMIT;
  const bodyTooLong = body.length > BODY_LIMIT;
  const webUrlInvalid = action.type === "WEB_URL" && webUrl.trim() !== "" && !urlLooksApproved(webUrl);
  const canSave = title.trim().length > 0 && !titleTooLong && body.trim().length > 0 && !bodyTooLong &&
    !!savedAudienceId && (action.type !== "WEB_URL" || (webUrl.trim().length > 0 && !webUrlInvalid));

  return <div className="max-w-2xl space-y-5 text-gray-900">
    <Link href="/admin/notifications" className="text-sm text-indigo-600 hover:underline">← Campaigns</Link>
    <h1 className="text-xl font-semibold">{isEdit ? "Edit Campaign Draft" : "Create Campaign Draft"}</h1>
    {existing && <p className="text-xs text-gray-500">Draft #{existing.id.slice(0, 8)} · revision {existing.revision}{existing.audience_status !== "active" && <span className="text-amber-700"> · audience is {existing.audience_status}</span>}{existing.audience_definition_changed && <span className="text-amber-700"> · audience definition changed since this draft was last saved</span>}</p>}
    {notice && <p role="status" className="text-sm text-green-700">{notice}</p>}

    <div className="space-y-1">
      <label className="text-sm font-medium" htmlFor="campaign-title">Title</label>
      <input id="campaign-title" className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm" value={title} onChange={e => setTitle(e.target.value)} maxLength={TITLE_LIMIT + 20} />
      <p className={`text-xs ${titleTooLong ? "text-red-700" : "text-gray-500"}`}>{title.length}/{TITLE_LIMIT}</p>
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium" htmlFor="campaign-body">Body</label>
      <textarea id="campaign-body" className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm" rows={4} value={body} onChange={e => setBody(e.target.value)} maxLength={BODY_LIMIT + 20} />
      <p className={`text-xs ${bodyTooLong ? "text-red-700" : "text-gray-500"}`}>{body.length}/{BODY_LIMIT}. Hindi/Unicode content is fully supported.</p>
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium" htmlFor="campaign-audience">Audience (SavedAudience)</label>
      {audiencesError ? <p role="alert" className="text-sm text-red-700">{audiencesError}</p> : audiences === null ? <p className="text-sm text-gray-500">Loading audiences…</p> : !audiences.length ? <p className="text-sm text-gray-500">No active SavedAudiences. Create one on the Audiences page first.</p> : (
        <select id="campaign-audience" className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm" value={savedAudienceId} onChange={e => setSavedAudienceId(e.target.value ? Number(e.target.value) : "")}>
          <option value="">Select an audience…</option>
          {audiences.map(a => <option key={a.id} value={a.id}>{a.name}{isAudienceAllUsers(a) ? " (All Users)" : ""}</option>)}
        </select>
      )}
      {allUsersSelected && (
        <p role="alert" className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          ⚠️ This audience has no filters — it targets <strong>All Users</strong>. Sending (not part of this draft stage) will require a typed “SEND TO ALL USERS” confirmation.
        </p>
      )}
    </div>

    <div className="space-y-2">
      <span className="text-sm font-medium">Action on tap</span>
      <div className="flex flex-wrap gap-2">
        {(["NONE", "APP_DEEP_LINK", "WEB_URL"] as const).map(kind => (
          <button key={kind} type="button" onClick={() => updateAction({ type: kind } as CampaignAction)}
            className={`rounded-lg border px-3 py-1.5 text-sm ${action.type === kind ? "border-indigo-600 bg-indigo-600 text-white" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
            {kind === "NONE" ? "None" : kind === "APP_DEEP_LINK" ? "App destination" : "Web URL"}
          </button>
        ))}
      </div>
      {action.type === "APP_DEEP_LINK" && (
        <select className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm" value={action.target} onChange={e => updateAction({ type: "APP_DEEP_LINK", target: e.target.value as AppDeepLinkTarget })}>
          {APP_DEEP_LINK_TARGETS.map(t => <option key={t} value={t}>{APP_DEEP_LINK_LABELS[t]}</option>)}
        </select>
      )}
      {action.type === "WEB_URL" && (
        <div className="space-y-1">
          <input className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm" placeholder="https://jyotishasha.com/…" value={webUrl} onChange={e => setWebUrl(e.target.value)} />
          {webUrlInvalid && <p role="alert" className="text-xs text-red-700">Only jyotishasha.com, www.jyotishasha.com, or the approved Jyotishasha YouTube channel are allowed. HTTPS only, no lookalike domains.</p>}
          <p className="text-xs text-gray-500">UTM attribution is added automatically at send time — do not include it here.</p>
        </div>
      )}
    </div>

    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-medium">Recipient preview</span>
        {preview && <span className="text-xs text-gray-500">as of {new Date(preview.generated_at).toLocaleTimeString()}</span>}
      </div>
      {!savedAudienceId ? <p className="text-sm text-gray-500">Select an audience to see a live preview.</p> :
        previewLoading ? <p className="text-sm text-gray-500">Resolving recipients…</p> :
        previewError ? <p role="alert" className="text-sm text-red-700">{previewError}</p> :
        preview && preview.status === "BLOCKED" ? (
          <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
            🚫 Blocked: this audience matches {preview.matched_user_count?.toLocaleString()} users, above the {preview.absolute_ceiling?.toLocaleString()} safety ceiling. This cannot be sent until reviewed.
          </p>
        ) : preview && preview.status === "READY" ? (
          <div className="space-y-2 text-sm">
            <div className="flex flex-wrap gap-4">
              <span>Matched: <strong>{preview.matched_user_count}</strong></span>
              <span>Eligible: <strong>{preview.eligible_recipient_count}</strong></span>
              <span>Excluded: <strong>{preview.excluded_recipient_count}</strong></span>
            </div>
            {preview.large_audience && (
              <p role="alert" className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-amber-800">
                ⚠️ Large audience (≥1,000). A typed campaign-name confirmation will be required to send.
              </p>
            )}
            <details className="text-xs text-gray-600">
              <summary className="cursor-pointer select-none">Exclusion breakdown</summary>
              <ul className="mt-1 space-y-0.5">
                {Object.entries(preview.exclusion_counts).map(([reason, count]) => <li key={reason}>{reason.replaceAll("_", " ")}: {count}</li>)}
              </ul>
            </details>
          </div>
        ) : null}
    </div>

    {saveError && <p role="alert" className="text-sm text-red-700">{saveError}{saveErrorCode === "stale_revision" && " Reload this draft to see the latest version."}</p>}
    <div className="flex flex-wrap gap-2">
      <button className={audienceButton + " bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"} disabled={!canSave || saving} onClick={handleSave}>
        {saving ? "Saving…" : isEdit ? "Save Draft" : "Create Draft"}
      </button>
      <Link href="/admin/notifications" className={audienceButton}>Cancel</Link>
      {isEdit && existing && (
        <>
          <SendNowPanel campaign={existing} preview={preview} action={action.type === "WEB_URL" ? { ...action, parameters: { url: webUrl } } : action} webUrl={webUrl} execution={null} onExecutionCreated={handleExecutionCreated} />
          <SchedulePanel campaign={existing} preview={preview} action={action.type === "WEB_URL" ? { ...action, parameters: { url: webUrl } } : action} webUrl={webUrl} execution={null} onExecutionCreated={handleExecutionCreated} />
        </>
      )}
    </div>
    {isEdit && !existing && <p className="text-xs text-gray-500">Save this draft to enable Send Now or Schedule.</p>}
  </div>;
}
