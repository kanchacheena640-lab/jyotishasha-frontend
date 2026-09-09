"use client";
import { useEffect, useState } from "react";
import { audienceButton } from "../audiences/AudienceEditor";
import {
  ALL_USERS_PHRASE, CampaignAction, CampaignDraft, ExecutionDetail, NotificationApiError,
  RecipientPreview, isLargeAudience, sendNow, stableIdempotencyKey,
} from "@/lib/admin/notificationsApi";
import ExecutionStatusPanel from "./ExecutionStatusPanel";

export default function SendNowPanel({
  campaign, preview, action, webUrl, execution, onExecutionCreated,
}: {
  campaign: CampaignDraft; preview: RecipientPreview | null; action: CampaignAction; webUrl: string;
  execution: ExecutionDetail | null; onExecutionCreated: (e: ExecutionDetail) => void;
}) {
  const [open, setOpen] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [ack, setAck] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState<string | undefined>();

  useEffect(() => { if (open) { setPhrase(""); setAck(false); setError(""); setErrorCode(undefined); } }, [open]);

  if (execution) return <ExecutionStatusPanel execution={execution} onUpdated={onExecutionCreated} />;
  if (campaign.state !== "DRAFT") return null;

  const previewReady = preview && preview.status === "READY";
  const previewAgeSeconds = preview ? (Date.now() - new Date(preview.generated_at).getTime()) / 1000 : Infinity;
  const previewFresh = previewReady && previewAgeSeconds <= 15 * 60;
  const isAllUsers = !!preview?.is_all_users;
  const large = previewReady && isLargeAudience(preview!.matched_user_count ?? 0, preview!.eligible_recipient_count ?? 0);
  const phraseCorrect = phrase === ALL_USERS_PHRASE;
  const canConfirm = previewFresh && (!isAllUsers || phraseCorrect) && (!large || ack) && !sending;

  async function handleConfirm() {
    if (!canConfirm || !preview) return;
    setSending(true); setError(""); setErrorCode(undefined);
    try {
      const result = await sendNow(campaign.id, {
        revision: campaign.revision,
        idempotency_key: stableIdempotencyKey(campaign.id, campaign.revision),
        baseline: { generated_at: preview.generated_at, matched_user_count: preview.matched_user_count ?? 0, eligible_recipient_count: preview.eligible_recipient_count ?? 0 },
        ...(isAllUsers ? { confirmation_phrase: phrase } : {}),
        ...(large ? { large_audience_acknowledged: true } : {}),
      });
      setOpen(false);
      onExecutionCreated(result);
    } catch (e) {
      if (e instanceof NotificationApiError) { setError(e.message); setErrorCode(e.code); }
      else setError("Send Now failed.");
    } finally {
      setSending(false);
    }
  }

  return <div className="space-y-2">
    <button
      type="button"
      className={audienceButton + " bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"}
      disabled={!preview || preview.status !== "READY"}
      onClick={() => setOpen(true)}
    >
      Send Now
    </button>

    {open && (
      <div role="dialog" aria-modal="true" aria-labelledby="send-now-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-lg space-y-4 rounded-xl bg-white p-5 text-gray-900 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 id="send-now-title" className="text-lg font-semibold">Confirm Send Now</h2>
            <button aria-label="Close" className={audienceButton} onClick={() => setOpen(false)} disabled={sending}>×</button>
          </div>

          <dl className="space-y-1 text-sm">
            <div><dt className="inline font-medium">Title: </dt><dd className="inline">{campaign.title}</dd></div>
            <div><dt className="inline font-medium">Audience: </dt><dd className="inline">{campaign.audience_name ?? `#${campaign.saved_audience_id}`}</dd></div>
            <div><dt className="inline font-medium">Action: </dt><dd className="inline">{action.type === "NONE" ? "None" : action.type === "APP_DEEP_LINK" ? `App: ${action.target}` : `Web: ${webUrl}`}</dd></div>
            {preview && <div className="flex flex-wrap gap-4 pt-1">
              <span>Matched: <strong>{preview.matched_user_count}</strong></span>
              <span>Eligible: <strong>{preview.eligible_recipient_count}</strong></span>
              <span>Excluded: <strong>{preview.excluded_recipient_count}</strong></span>
            </div>}
            <div className="text-xs text-gray-500">Preview generated {Math.round(previewAgeSeconds)}s ago{!previewFresh && " — stale, refresh the preview before sending"}</div>
          </dl>

          {!previewFresh && (
            <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
              This preview is more than 15 minutes old (or unavailable). Close this dialog and let the preview refresh before sending.
            </p>
          )}

          {isAllUsers && (
            <div className="space-y-1">
              <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
                ⚠️ This sends to <strong>All Users</strong>. Type <strong>{ALL_USERS_PHRASE}</strong> to confirm.
              </p>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                placeholder={ALL_USERS_PHRASE}
                value={phrase}
                onChange={e => setPhrase(e.target.value)}
                aria-label="Type SEND TO ALL USERS to confirm"
              />
            </div>
          )}

          {large && (
            <label className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
              <input type="checkbox" className="mt-0.5" checked={ack} onChange={e => setAck(e.target.checked)} />
              <span>I acknowledge this is a large audience (≥1,000 recipients) and want to proceed.</span>
            </label>
          )}

          {error && <p role="alert" className="text-sm text-red-700">{error}{errorCode === "stale_revision" && " Reload this draft."}{errorCode === "preview_stale" && " Refresh the preview."}</p>}

          <div className="flex gap-2">
            <button className={audienceButton + " bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"} disabled={!canConfirm} onClick={handleConfirm}>
              {sending ? "Sending…" : "Confirm Send Now"}
            </button>
            <button className={audienceButton} disabled={sending} onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )}
  </div>;
}
