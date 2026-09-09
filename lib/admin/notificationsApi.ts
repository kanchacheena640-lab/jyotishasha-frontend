// NOTIFICATIONS N3 -- Admin Campaign Composer client API.
//
// Registry constants below MUST mirror notifications/campaign_service.py
// exactly (APP_TARGETS, WEBSITE_HOSTS, YOUTUBE_URL) -- N1 Section 14/25:
// "Backend validates the same registry the client understands." Backend
// remains the authority; these are a client-side mirror for form
// controls, never a bypass -- every save/preview is re-validated server-side.

export const APP_DEEP_LINK_TARGETS = ["ASK_NOW", "KUNDALI", "REPORTS", "SUBSCRIPTION", "PROFILE", "DASHBOARD"] as const;
export type AppDeepLinkTarget = (typeof APP_DEEP_LINK_TARGETS)[number];
export const APP_DEEP_LINK_LABELS: Record<AppDeepLinkTarget, string> = {
  ASK_NOW: "Ask Now", KUNDALI: "Kundali", REPORTS: "Reports",
  SUBSCRIPTION: "Subscription", PROFILE: "Profile", DASHBOARD: "Dashboard",
};
export const WEBSITE_HOSTS = ["jyotishasha.com", "www.jyotishasha.com"] as const;
// Evidence: components/Footer.tsx's own official social link -- not guessed.
export const APPROVED_YOUTUBE_URL = "https://www.youtube.com/@jyotishasha";

export type CampaignAction =
  | { type: "NONE"; target: null; parameters: Record<string, never> }
  | { type: "APP_DEEP_LINK"; target: AppDeepLinkTarget; parameters: Record<string, never> }
  | { type: "WEB_URL"; target: "HTTPS_URL"; parameters: { url: string } };

export const NONE_ACTION: CampaignAction = { type: "NONE", target: null, parameters: {} };

// Client-side mirror of campaign_service.py::valid_url()'s host/scheme
// gate, for immediate form feedback only -- the backend re-validates
// every save/preview and is the sole authority (malformed percent-
// encoding, userinfo, ports and reserved-UTM handling are backend-only
// checks not duplicated here).
export function urlLooksApproved(url: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") return false;
  if (url.trim().replace(/\/$/, "") === APPROVED_YOUTUBE_URL) return true;
  return (WEBSITE_HOSTS as readonly string[]).includes(parsed.hostname.toLowerCase());
}

export function actionLabel(action: CampaignAction): string {
  if (action.type === "NONE") return "No destination (opens Notification Detail)";
  if (action.type === "APP_DEEP_LINK") return `App: ${APP_DEEP_LINK_LABELS[action.target]}`;
  return `Web: ${action.parameters.url}`;
}

// N4 established DRAFT/PROCESSING/COMPLETED/PARTIAL/FAILED. N5 adds
// SCHEDULED (a DRAFT scheduled for a future UTC time) and CANCELLED.
export type CampaignState = "DRAFT" | "SCHEDULED" | "PROCESSING" | "COMPLETED" | "PARTIAL" | "FAILED" | "CANCELLED";

export interface CampaignSummary {
  id: string; state: CampaignState; revision: number; title: string;
  audience_mode: "SAVED_AUDIENCE"; saved_audience_id: number;
  action_type: CampaignAction["type"] | null;
  created_at: string; updated_at: string;
}
export interface CampaignPagination { page: number; page_size: number; total_count: number; total_pages: number }
export interface CampaignsResponse { campaigns: CampaignSummary[]; pagination: CampaignPagination }

export interface CampaignDraft {
  id: string; state: CampaignState; hold_reason: string | null; revision: number; title: string; body: string;
  audience_mode: "SAVED_AUDIENCE"; saved_audience_id: number;
  audience_name: string | null; audience_status: "active" | "inactive" | "missing" | "invalid";
  draft_criteria: unknown; criteria_version: number; draft_criteria_hash: string;
  audience_definition_changed: boolean; definition_status: "UNAPPROVED_DRAFT" | "APPROVED";
  execution_id: string | null;
  action: CampaignAction; action_registry_version: number;
  attribution: { utm_source: string; utm_medium: string; utm_campaign: string };
  created_at: string; updated_at: string; created_by: number | null; updated_by: number | null;
}

export interface CampaignDraftInput {
  title: string; body: string; audience_mode: "SAVED_AUDIENCE"; saved_audience_id: number;
  action: CampaignAction; revision?: number; refresh_audience?: boolean;
}

export interface RecipientPreview {
  campaign_id: string | null; revision: number | null; saved_audience_id: number;
  generated_at: string; freshness_seconds: number;
  status: "READY" | "BLOCKED";
  matched_user_count: number | null; eligible_recipient_count: number | null;
  excluded_recipient_count: number | null; exclusion_counts: Record<string, number>;
  is_all_users: boolean | null; large_audience: boolean;
  safety_ceiling_exceeded?: boolean; absolute_ceiling?: number; error?: string;
  policy_version?: string;
}

export class NotificationApiError extends Error {
  code?: string; status: number;
  constructor(message: string, status: number, code?: string) { super(message); this.status = status; this.code = code; }
}

export async function notificationRequest<T>(path = "", method = "GET", body?: unknown): Promise<T> {
  const response = await fetch(`/api/admin/notifications${path}`, {
    method, cache: "no-store", headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || data === null) throw new NotificationApiError(data?.message || data?.error || `Request failed (${response.status}).`, response.status, data?.error);
  return data as T;
}

export const listCampaigns = (page = 1, pageSize = 20, search?: string) =>
  notificationRequest<CampaignsResponse>(`?page=${page}&page_size=${pageSize}${search ? `&search=${encodeURIComponent(search)}` : ""}`);
export const getCampaign = (id: string) => notificationRequest<CampaignDraft>(`/${id}`);
export const createCampaign = (draft: CampaignDraftInput) => notificationRequest<CampaignDraft>("", "POST", draft);
export const updateCampaign = (id: string, draft: CampaignDraftInput) => notificationRequest<CampaignDraft>(`/${id}`, "PATCH", draft);
export const previewRecipients = (request: { saved_audience_id?: number; campaign_id?: string; revision?: number }) =>
  notificationRequest<RecipientPreview>("/preview", "POST", request);

// ---------------- N4: Send Now execution ----------------

export const ALL_USERS_PHRASE = "SEND TO ALL USERS";
export const LARGE_AUDIENCE_THRESHOLD = 1000;

// N5 adds SCHEDULED (not yet due), EXPIRED and BLOCKED (both absolute,
// non-reconfirmable terminal-without-send outcomes) alongside N4's own
// RESOLVING/PAUSED/FROZEN/SENDING/COMPLETED/PARTIAL/FAILED, plus
// CANCELLED (pre-freeze cancellation).
export type ExecutionState =
  | "SCHEDULED" | "RESOLVING" | "PAUSED" | "FROZEN" | "SENDING"
  | "COMPLETED" | "PARTIAL" | "FAILED" | "EXPIRED" | "BLOCKED" | "CANCELLED";
export type DeliveryStatus = "PENDING" | "ACCEPTED" | "FAILED_RETRYABLE" | "FAILED_PERMANENT" | "UNKNOWN" | "SUPPRESSED";

export interface ExecutionDetail {
  id: string; campaign_id: string; state: ExecutionState; hold_reason: string | null;
  approved_saved_audience_id: number;
  baseline: { generated_at: string; matched_user_count: number; eligible_recipient_count: number; recorded_at: string };
  resolved: {
    matched_user_count: number | null; eligible_recipient_count: number | null;
    excluded_recipient_count: number | null; exclusion_counts: Record<string, number> | null;
  };
  all_users_confirmed: boolean; large_audience_acknowledged: boolean;
  target_count: number;
  delivery_counts: Record<DeliveryStatus, number>;
  scheduled_for: string | null; expires_at: string | null; dispatch_started_at: string | null;
  frozen_at: string | null; started_at: string | null; completed_at: string | null;
  created_at: string; updated_at: string;
}

export interface SendNowRequest {
  revision: number;
  idempotency_key: string;
  baseline: { generated_at: string; matched_user_count: number; eligible_recipient_count: number };
  confirmation_phrase?: string;
  large_audience_acknowledged?: boolean;
}

export const sendNow = (campaignId: string, request: SendNowRequest) =>
  notificationRequest<ExecutionDetail>(`/${campaignId}/send-now`, "POST", request);
export const reconfirmExecution = (executionId: string) =>
  notificationRequest<ExecutionDetail>(`/executions/${executionId}/reconfirm`, "POST", {});
export const getExecution = (executionId: string) =>
  notificationRequest<ExecutionDetail>(`/executions/${executionId}`);

/** Stable per-draft idempotency key (N4.5/N4.23): generated once and
 * reused across every retry of the SAME Send Now user action for this
 * campaign+revision, so a network retry or double click never mints a
 * new key -- persisted in sessionStorage only (tab-scoped, cleared on
 * close), never sent anywhere but this one request. A different
 * campaign or a newer revision (edited draft) gets its own fresh key. */
export function stableIdempotencyKey(campaignId: string, revision: number): string {
  const storageKey = `n4-send-now-key:${campaignId}:${revision}`;
  try {
    const existing = window.sessionStorage.getItem(storageKey);
    if (existing) return existing;
    const fresh = `${campaignId}-${revision}-${crypto.randomUUID()}`;
    window.sessionStorage.setItem(storageKey, fresh);
    return fresh;
  } catch {
    // sessionStorage unavailable (private mode, SSR) -- a fresh key per
    // call is still safe (never a duplicate EXECUTION, only a possible
    // idempotency_conflict on a genuine double-submit in that rare case).
    return `${campaignId}-${revision}-${crypto.randomUUID()}`;
  }
}

export function isLargeAudience(matched: number, eligible: number): boolean {
  return Math.max(matched, eligible) >= LARGE_AUDIENCE_THRESHOLD;
}

// ---------------- N6: History / Monitoring / Metrics (read-only) ----------------

export interface HistoryRow {
  id: string; title: string; state: CampaignState; hold_reason: string | null;
  saved_audience_id: number;
  execution_id: string | null; execution_state: ExecutionState | null;
  scheduled_for: string | null; target_count: number | null;
  created_at: string; updated_at: string; created_by: number | null;
}
export interface HistoryResponse { campaigns: HistoryRow[]; pagination: CampaignPagination }

/** Every field's exact numerator/denominator is documented in
 * notifications/campaign_metrics_service.py's own module docstring --
 * mirrored here only as a type, never re-derived client-side. A rate is
 * the literal string "UNKNOWN" (never a fabricated 0%) when its
 * denominator is 0. ACCEPTED must never be rendered as "Delivered"
 * anywhere this type is consumed (N1's explicit prohibition). */
export interface CampaignMetrics {
  target_count: number;
  delivery_counts: Record<DeliveryStatus, number>;
  notification_opened_count: number;
  destination_opened_count: number;
  open_rate: number | "UNKNOWN";
  destination_rate: number | "UNKNOWN";
  conversion_count: number;
  conversion_rate: number | "UNKNOWN";
}

export interface CampaignMonitorDetail extends ExecutionDetail {
  campaign: { id: string; title: string; body: string; state: CampaignState; created_by: number | null };
  metrics: CampaignMetrics;
}

export interface DeliveryRow {
  id: string; user_id: number; app_user_id: number; status: DeliveryStatus;
  suppression_reason: string | null; attempt_count: number;
  next_attempt_at: string | null; first_attempted_at: string | null;
  last_attempted_at: string | null; accepted_at: string | null;
}
export interface DeliveriesResponse { deliveries: DeliveryRow[]; pagination: CampaignPagination }

export interface AttemptRow {
  attempt_number: number; started_at: string; finished_at: string | null;
  outcome: "ACCEPTED" | "FAILED_RETRYABLE" | "FAILED_PERMANENT" | "UNKNOWN" | null;
  provider: string; error_code: string | null; error_class: string | null;
}
export interface AttemptsResponse { delivery_id: string; status: DeliveryStatus; attempts: AttemptRow[] }

export const listHistory = (params: {
  page?: number; page_size?: number; state?: CampaignState; search?: string;
  date_from?: string; date_to?: string;
} = {}) => {
  const q = new URLSearchParams();
  if (params.page) q.set("page", String(params.page));
  if (params.page_size) q.set("page_size", String(params.page_size));
  if (params.state) q.set("state", params.state);
  if (params.search) q.set("search", params.search);
  if (params.date_from) q.set("date_from", params.date_from);
  if (params.date_to) q.set("date_to", params.date_to);
  const qs = q.toString();
  return notificationRequest<HistoryResponse>(`/history${qs ? `?${qs}` : ""}`);
};

export const getCampaignMonitor = (campaignId: string) =>
  notificationRequest<CampaignMonitorDetail>(`/${campaignId}/monitor`);

export const listDeliveries = (executionId: string, page = 1, pageSize = 20, status?: DeliveryStatus) =>
  notificationRequest<DeliveriesResponse>(
    `/executions/${executionId}/deliveries?page=${page}&page_size=${pageSize}${status ? `&status=${status}` : ""}`);

export const listAttempts = (deliveryId: string) =>
  notificationRequest<AttemptsResponse>(`/deliveries/${deliveryId}/attempts`);

// ---------------- N5: Schedule / reschedule / cancel ----------------

export interface ScheduleRequest {
  revision: number;
  idempotency_key: string;
  scheduled_for: string; // UTC ISO-8601
  expires_at?: string; // UTC ISO-8601; omitted -> backend defaults to scheduled_for + 24h
  preview_generated_at: string; // freshness proof only -- never a count source (N5.8)
  confirmation_phrase?: string;
  large_audience_acknowledged?: boolean;
}

export const scheduleCampaign = (campaignId: string, request: ScheduleRequest) =>
  notificationRequest<ExecutionDetail>(`/${campaignId}/schedule`, "POST", request);
export const rescheduleExecution = (executionId: string, scheduledFor: string, expiresAt?: string) =>
  notificationRequest<ExecutionDetail>(`/executions/${executionId}/reschedule`, "POST",
    expiresAt ? { scheduled_for: scheduledFor, expires_at: expiresAt } : { scheduled_for: scheduledFor });
export const cancelExecution = (executionId: string) =>
  notificationRequest<ExecutionDetail>(`/executions/${executionId}/cancel`, "POST", {});

/** Same stable-key convention as stableIdempotencyKey(), scoped
 * separately so a Schedule action and a Send Now action on the same
 * campaign+revision never share (or fight over) one key. */
export function stableScheduleIdempotencyKey(campaignId: string, revision: number): string {
  const storageKey = `n5-schedule-key:${campaignId}:${revision}`;
  try {
    const existing = window.sessionStorage.getItem(storageKey);
    if (existing) return existing;
    const fresh = `${campaignId}-${revision}-${crypto.randomUUID()}`;
    window.sessionStorage.setItem(storageKey, fresh);
    return fresh;
  } catch {
    return `${campaignId}-${revision}-${crypto.randomUUID()}`;
  }
}
