"use client";
import { useEffect, useState } from "react";
import { audienceButton } from "../audiences/AudienceEditor";
import {
  ALL_USERS_PHRASE, CampaignAction, CampaignDraft, ExecutionDetail, NotificationApiError,
  RecipientPreview, isLargeAudience, scheduleCampaign, stableScheduleIdempotencyKey,
} from "@/lib/admin/notificationsApi";
import { formatIst, formatUtc, istInputToUtcIso } from "@/lib/admin/scheduleTimezone";

function defaultLocalValue(): string {
  const in2h = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${in2h.getFullYear()}-${pad(in2h.getMonth() + 1)}-${pad(in2h.getDate())}T${pad(in2h.getHours())}:${pad(in2h.getMinutes())}`;
}

export default function SchedulePanel({
  campaign, preview, action, webUrl, execution, onExecutionCreated,
}: {
  campaign: CampaignDraft; preview: RecipientPreview | null; action: CampaignAction; webUrl: string;
  execution: ExecutionDetail | null; onExecutionCreated: (e: ExecutionDetail) => void;
}) {
  const [open, setOpen] = useState(false);
  const [localValue, setLocalValue] = useState(defaultLocalValue());
  const [phrase, setPhrase] = useState("");
  const [ack, setAck] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState<string | undefined>();

  useEffect(() => { if (open) { setPhrase(""); setAck(false); setError(""); setErrorCode(undefined); setLocalValue(defaultLocalValue()); } }, [open]);

  // Once an execution exists (SCHEDULED or otherwise), the composer
  // renders ExecutionStatusPanel via SendNowPanel; this button/modal
  // has nothing further to do.
  if (execution || campaign.state !== "DRAFT") return null;

  const previewReady = preview && preview.status === "READY";
  const previewAgeSeconds = preview ? (Date.now() - new Date(preview.generated_at).getTime()) / 1000 : Infinity;
  const previewFresh = previewReady && previewAgeSeconds <= 15 * 60;
  const isAllUsers = !!preview?.is_all_users;
  const large = previewReady && isLargeAudience(preview!.matched_user_count ?? 0, preview!.eligible_recipient_count ?? 0);
  const phraseCorrect = phrase === ALL_USERS_PHRASE;
  const scheduledUtc = istInputToUtcIso(localValue);
  const scheduledValid = !!scheduledUtc && new Date(scheduledUtc).getTime() > Date.now() + 60_000;
  const canConfirm = previewFresh && scheduledValid && (!isAllUsers || phraseCorrect) && (!large || ack) && !saving;

  async function handleConfirm() {
    if (!canConfirm || !preview || !scheduledUtc) return;
    setSaving(true); setError(""); setErrorCode(undefined);
    try {
      const result = await scheduleCampaign(campaign.id, {
        revision: campaign.revision,
        idempotency_key: stableScheduleIdempotencyKey(campaign.id, campaign.revision),
        scheduled_for: scheduledUtc,
        preview_generated_at: preview.generated_at,
        ...(isAllUsers ? { confirmation_phrase: phrase } : {}),
        ...(large ? { large_audience_acknowledged: true } : {}),
      });
      setOpen(false);
      onExecutionCreated(result);
    } catch (e) {
      if (e instanceof NotificationApiError) { setError(e.message); setErrorCode(e.code); }
      else setError("Schedule failed.");
    } finally {
      setSaving(false);
    }
  }

  return <div className="space-y-2">
    <button
      type="button"
      className={audienceButton + " bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"}
      disabled={!preview || preview.status !== "READY"}
      onClick={() => setOpen(true)}
    >
      Schedule
    </button>

    {open && (
      <div role="dialog" aria-modal="true" aria-labelledby="schedule-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-lg space-y-4 rounded-xl bg-white p-5 text-gray-900 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 id="schedule-title" className="text-lg font-semibold">Schedule Campaign</h2>
            <button aria-label="Close" className={audienceButton} onClick={() => setOpen(false)} disabled={saving}>×</button>
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
            <div className="text-xs text-gray-500">Preview generated {Math.round(previewAgeSeconds)}s ago{!previewFresh && " — stale, refresh the preview before scheduling"}</div>
          </dl>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="schedule-datetime">Send at (IST)</label>
            <input id="schedule-datetime" type="datetime-local" className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
              value={localValue} onChange={e => setLocalValue(e.target.value)} />
            {scheduledUtc ? (
              <p className="text-xs text-gray-600">
                {formatIst(scheduledUtc)} — <strong>{formatUtc(scheduledUtc)}</strong>
                {!scheduledValid && <span className="text-red-700"> · must be at least a minute in the future</span>}
              </p>
            ) : (
              <p className="text-xs text-red-700">Enter a valid date/time.</p>
            )}
            <p className="text-xs text-gray-500">Membership is resolved live at send time, not now. Expiry defaults to 24 hours after this time.</p>
          </div>

          {!previewFresh && (
            <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
              This preview is more than 15 minutes old (or unavailable). Close this dialog and let the preview refresh before scheduling.
            </p>
          )}

          {isAllUsers && (
            <div className="space-y-1">
              <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
                ⚠️ This schedules a send to <strong>All Users</strong>. Type <strong>{ALL_USERS_PHRASE}</strong> to confirm.
              </p>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                placeholder={ALL_USERS_PHRASE}
                value={phrase}
                onChange={e => setPhrase(e.target.value)}
                aria-label="Type SEND TO ALL USERS to confirm scheduling"
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
            <button className={audienceButton + " bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"} disabled={!canConfirm} onClick={handleConfirm}>
              {saving ? "Scheduling…" : "Confirm Schedule"}
            </button>
            <button className={audienceButton} disabled={saving} onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )}
  </div>;
}
