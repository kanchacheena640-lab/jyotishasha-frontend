"use client";
import { useState } from "react";
import { audienceButton } from "../audiences/AudienceEditor";
import {
  DeliveryStatus, ExecutionDetail, NotificationApiError,
  cancelExecution, reconfirmExecution, rescheduleExecution,
} from "@/lib/admin/notificationsApi";
import { formatIst, formatUtc, istInputToUtcIso, utcIsoToIstInput } from "@/lib/admin/scheduleTimezone";

const DELIVERY_LABELS: Record<DeliveryStatus, string> = {
  PENDING: "Pending", ACCEPTED: "Accepted by push provider", FAILED_RETRYABLE: "Failed (will retry)",
  FAILED_PERMANENT: "Failed", UNKNOWN: "Unknown (no confirmed outcome)", SUPPRESSED: "Suppressed",
};

const STATE_STYLE: Record<string, string> = {
  SCHEDULED: "bg-indigo-100 text-indigo-800",
  PAUSED: "bg-amber-100 text-amber-800",
  COMPLETED: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
  EXPIRED: "bg-gray-200 text-gray-700",
  BLOCKED: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-200 text-gray-700",
};

const BLOCKED_REASON_LABELS: Record<string, string> = {
  SAFETY_CEILING_EXCEEDED: "Blocked — audience exceeds the 50,000 safety ceiling.",
  AUDIENCE_UNAVAILABLE: "Blocked — the approved audience is no longer available.",
  RESOLUTION_UNAVAILABLE: "Blocked — recipient resolution was unavailable at dispatch time.",
  ALL_USERS_NOT_CONFIRMED: "Blocked — All Users confirmation could not be verified.",
};

function RescheduleForm({ execution, onUpdated }: { execution: ExecutionDetail; onUpdated: (e: ExecutionDetail) => void }) {
  const [value, setValue] = useState(execution.scheduled_for ? utcIsoToIstInput(execution.scheduled_for) : "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    const utc = istInputToUtcIso(value);
    if (!utc) { setError("Enter a valid date/time."); return; }
    setBusy(true); setError("");
    try {
      const updated = await rescheduleExecution(execution.id, utc);
      onUpdated(updated);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reschedule failed.");
    } finally {
      setBusy(false);
    }
  }

  return <div className="space-y-1 rounded-lg border border-gray-200 p-3">
    <label className="text-xs font-medium text-gray-700" htmlFor="reschedule-input">New time (IST)</label>
    <div className="flex flex-wrap gap-2">
      <input id="reschedule-input" type="datetime-local" className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
        value={value} onChange={e => setValue(e.target.value)} />
      <button className={audienceButton} disabled={busy} onClick={submit}>{busy ? "Saving…" : "Reschedule"}</button>
    </div>
    {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
  </div>;
}

export default function ExecutionStatusPanel({ execution, onUpdated }: { execution: ExecutionDetail; onUpdated: (e: ExecutionDetail) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showReschedule, setShowReschedule] = useState(false);

  async function handleReconfirm() {
    if (busy) return;
    setBusy(true); setError("");
    try {
      onUpdated(await reconfirmExecution(execution.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reconfirm failed.");
    } finally {
      setBusy(false);
    }
  }

  async function handleCancel() {
    if (busy) return;
    if (execution.state === "FROZEN" &&
        !window.confirm("Cancel this campaign before it sends? This cannot be undone. No notification has been sent yet — every target will be released and the campaign will be marked Cancelled.")) {
      return;
    }
    setBusy(true); setError("");
    try {
      onUpdated(await cancelExecution(execution.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Cancel failed.");
    } finally {
      setBusy(false);
    }
  }

  const canCancelPrefreeze = execution.state === "SCHEDULED" || execution.state === "PAUSED";
  // P4.5 -- backend is the sole source of truth (it re-checks every
  // delivery under a row lock at cancel time); this is only a UX
  // pre-check so the button isn't shown for an execution that would
  // obviously be refused. started_at null + every counted delivery
  // still PENDING means "nothing has happened yet, as far as this
  // snapshot shows" -- a real race (a worker claiming a delivery
  // between this render and the click) is still safely caught server-side.
  const canCancelFrozenUnsent =
    execution.state === "FROZEN" && execution.started_at === null &&
    execution.delivery_counts.PENDING === execution.target_count;
  const canCancel = canCancelPrefreeze || canCancelFrozenUnsent;
  const canReschedule = execution.state === "SCHEDULED";

  return <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
    <div className="flex items-center justify-between">
      <span className="font-medium">Execution status</span>
      <span className={`rounded px-2 py-0.5 text-xs ${STATE_STYLE[execution.state] ?? "bg-blue-100 text-blue-800"}`}>
        {execution.state === "SCHEDULED" ? "SCHEDULED — not yet sent" : execution.state}
      </span>
    </div>

    {execution.state === "SCHEDULED" && (
      <div className="space-y-2 rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-indigo-900">
        <p className="font-medium">This campaign is scheduled — nothing has been sent yet.</p>
        <div className="text-xs">
          <div>Scheduled for: <strong>{formatIst(execution.scheduled_for)}</strong> ({formatUtc(execution.scheduled_for)})</div>
          <div>Expires: <strong>{formatIst(execution.expires_at)}</strong> ({formatUtc(execution.expires_at)})</div>
        </div>
        <div className="flex flex-wrap gap-2">
          {canReschedule && <button className={audienceButton} onClick={() => setShowReschedule(v => !v)}>{showReschedule ? "Hide reschedule" : "Reschedule"}</button>}
          {canCancel && <button className={audienceButton + " bg-red-600 text-white hover:bg-red-700"} disabled={busy} onClick={handleCancel}>Cancel schedule</button>}
        </div>
        {showReschedule && <RescheduleForm execution={execution} onUpdated={e => { onUpdated(e); setShowReschedule(false); }} />}
      </div>
    )}

    {execution.state === "PAUSED" && (
      <div role="alert" className="space-y-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-900">
        <p className="font-medium">⚠️ Paused — recipient count drifted since your last confirmation.</p>
        {execution.scheduled_for && (
          <div className="text-xs">
            Scheduled for: {formatIst(execution.scheduled_for)} ({formatUtc(execution.scheduled_for)})
            {execution.dispatch_started_at && <> · Actual processing started: {formatIst(execution.dispatch_started_at)}</>}
          </div>
        )}
        <div className="flex flex-wrap gap-4 text-xs">
          <span>Previously shown: <strong>{execution.baseline.matched_user_count}</strong> matched / <strong>{execution.baseline.eligible_recipient_count}</strong> eligible</span>
          <span>Now: <strong>{execution.resolved.matched_user_count}</strong> matched / <strong>{execution.resolved.eligible_recipient_count}</strong> eligible</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className={audienceButton + " bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50"} disabled={busy} onClick={handleReconfirm}>
            {busy ? "Reconfirming…" : "Reconfirm and continue"}
          </button>
          {canCancel && <button className={audienceButton} disabled={busy} onClick={handleCancel}>Cancel</button>}
        </div>
      </div>
    )}

    {execution.state === "EXPIRED" && (
      <p role="alert" className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-800">
        ⏱️ Expired before dispatch. This scheduled campaign was never sent — no recipients were contacted. Create a new campaign to try again.
      </p>
    )}

    {execution.state === "BLOCKED" && (
      <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-red-800">
        🚫 {BLOCKED_REASON_LABELS[execution.hold_reason ?? ""] ?? "Blocked before sending — no recipients were contacted."}
      </p>
    )}

    {execution.state === "CANCELLED" && (
      <p className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700">
        Cancelled before sending. No recipients were contacted.
      </p>
    )}

    {error && <p role="alert" className="text-xs text-red-700">{error}</p>}

    {execution.state !== "SCHEDULED" && execution.state !== "EXPIRED" && execution.state !== "BLOCKED" && execution.state !== "CANCELLED" && (
      <>
        <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
          <span>Targets: <strong>{execution.target_count}</strong></span>
          {(Object.keys(DELIVERY_LABELS) as DeliveryStatus[]).map(status => (
            <span key={status}>{DELIVERY_LABELS[status]}: <strong>{execution.delivery_counts[status] ?? 0}</strong></span>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          {execution.scheduled_for && <>Scheduled: {formatIst(execution.scheduled_for)} · </>}
          Frozen: {execution.frozen_at ? new Date(execution.frozen_at).toLocaleString() : "—"} · Started: {execution.started_at ? new Date(execution.started_at).toLocaleString() : "—"} · Completed: {execution.completed_at ? new Date(execution.completed_at).toLocaleString() : "—"}
        </p>
        <p className="text-xs text-gray-500">&ldquo;Accepted by push provider&rdquo; confirms the provider accepted the request — it is not proof the message reached the device.</p>
        {canCancelFrozenUnsent && (
          <button className={audienceButton + " bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"} disabled={busy} onClick={handleCancel}>
            {busy ? "Cancelling…" : "Cancel campaign"}
          </button>
        )}
      </>
    )}
  </div>;
}
