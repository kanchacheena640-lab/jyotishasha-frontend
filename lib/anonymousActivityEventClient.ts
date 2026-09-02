// lib/anonymousActivityEventClient.ts

/**
 * Task 2C -- reusable frontend client for Task 2B's
 * POST /api/activity-events/anonymous. No product component calls this
 * yet (Task 2C is infrastructure-only, S14) -- this is the seam a later
 * instrumentation task wires CTA/feature/download-intent/discovery
 * producers through.
 *
 * Split into two layers, matching this repo's own established
 * (Task 2A.1) pure-core / thin-I/O-wrapper pattern:
 *   buildAnonymousEventBody() -- pure, no I/O, fully unit-testable.
 *     Constructs the exact 6-field body Task 2B's endpoint accepts
 *     (event_name, event_version, occurred_at, session_id, properties,
 *     campaign_context) and NOTHING else -- by construction, not by a
 *     denylist, so there is no forbidden field (platform, environment,
 *     firebase_uid, profile_id, anonymous_id, event_id, recorded_at,
 *     correlation_id, dedupe_key, entity_type, entity_id,
 *     notification_context) a caller could ever cause to appear.
 *   sendAnonymousActivityEvent() -- the actual fetch wrapper. Analytics
 *     must never break product behavior (Task 2C S10): a short timeout
 *     via AbortController, no retry, no offline/backlog queue, and
 *     every failure mode (session unavailable, network failure,
 *     timeout, any non-2xx status, backend unavailable) is swallowed
 *     silently -- this function never throws and its return value
 *     carries no error a caller could mistakenly surface to the user.
 */

// Relative (not "@/lib/...") imports, deliberately -- same reasoning as
// Task 2A.1's lib/freeKundaliSession.ts: this keeps the module
// standalone-compilable (no path-alias config needed) for
// lib/analyticsFoundation.test.ts's own tsc-based test run, in addition
// to working identically in the real Next.js build.
import {
  buildCampaignContextFromAttribution,
  readStoredAttribution,
} from "./analyticsAttribution";
import { getOrCreateAnalyticsSessionId } from "./analyticsSession";

const ANONYMOUS_EVENT_ENDPOINT_PATH = "/api/activity-events/anonymous";

// Matches hooks/useReportPurchase.ts's own existing fallback
// convention for NEXT_PUBLIC_BACKEND_URL -- not a new hardcoded
// primary URL, just the same already-established "if the env var
// genuinely isn't set, fall back to the known backend" pattern this
// codebase already uses elsewhere for a client-side fetch.
const DEFAULT_BACKEND_URL = "https://jyotishasha-backend.onrender.com";

const DEFAULT_TIMEOUT_MS = 3000;

export interface AnonymousEventInput {
  eventName: string;
  eventVersion?: number;
  properties?: Record<string, string | number | boolean>;
}

/** The exact 6 keys Task 2B's endpoint accepts -- nothing more, nothing
 * less. Kept as a runtime-checkable list purely for this module's own
 * test suite to assert against (the real safety comes from the object
 * literal below only ever assigning these keys, not from this list). */
export const ANONYMOUS_EVENT_BODY_KEYS = [
  "event_name",
  "event_version",
  "occurred_at",
  "session_id",
  "properties",
  "campaign_context",
] as const;

export interface AnonymousEventBody {
  event_name: string;
  event_version: number;
  occurred_at: string;
  session_id: string;
  properties: Record<string, string | number | boolean>;
  campaign_context?: Record<string, string>;
}

/** Pure. Returns null if sessionId is unavailable (Task 2C S10: session
 * unavailable -> the caller must safely drop, never send a request with
 * no session_id -- Task 2B's endpoint requires it and would reject the
 * request anyway, but this function never even attempts the network
 * call for that case). occurred_at is always a timezone-aware UTC
 * ISO-8601 string (`Date.prototype.toISOString()` always emits one). */
export function buildAnonymousEventBody(
  input: AnonymousEventInput,
  deps: {
    sessionId: string | null;
    campaignContext?: Record<string, string>;
    now?: () => Date;
  }
): AnonymousEventBody | null {
  if (!deps.sessionId) return null;
  if (!input.eventName) return null;

  const now = deps.now ? deps.now() : new Date();

  const body: AnonymousEventBody = {
    event_name: input.eventName,
    event_version: input.eventVersion ?? 1,
    occurred_at: now.toISOString(),
    session_id: deps.sessionId,
    properties: input.properties ?? {},
  };
  if (deps.campaignContext && Object.keys(deps.campaignContext).length > 0) {
    body.campaign_context = deps.campaignContext;
  }
  return body;
}

/**
 * The actual network call. Never throws, never rejects in a way a
 * caller is expected to catch -- every failure path resolves normally.
 * No retry, no queue: a dropped event is simply gone, exactly per
 * Task 2C S10's explicit instruction.
 */
export async function sendAnonymousActivityEvent(
  input: AnonymousEventInput,
  overrides?: {
    sessionId?: string | null;
    campaignContext?: Record<string, string>;
    backendUrl?: string;
    fetchImpl?: typeof fetch;
    now?: () => Date;
    timeoutMs?: number;
  }
): Promise<void> {
  let sessionId: string | null;
  let campaignContext: Record<string, string> | undefined;

  if (overrides && "sessionId" in overrides) {
    sessionId = overrides.sessionId ?? null;
    campaignContext = overrides.campaignContext;
  } else {
    // Real, browser-backed lookup -- wrapped defensively even though
    // getOrCreateAnalyticsSessionId/readStoredAttribution never throw
    // themselves, so a future change to either can never turn analytics
    // into a product-breaking exception here.
    try {
      sessionId =
        typeof window !== "undefined"
          ? getOrCreateAnalyticsSessionId(window.sessionStorage)
          : null;
      campaignContext =
        overrides?.campaignContext ??
        (typeof window !== "undefined"
          ? buildCampaignContextFromAttribution(readStoredAttribution(window.sessionStorage))
          : undefined);
    } catch {
      sessionId = null;
      campaignContext = undefined;
    }
  }

  const body = buildAnonymousEventBody(input, {
    sessionId,
    campaignContext,
    now: overrides?.now,
  });
  if (!body) return;

  const backendUrl =
    overrides?.backendUrl ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? DEFAULT_BACKEND_URL;
  const fetchImpl = overrides?.fetchImpl ?? (typeof fetch !== "undefined" ? fetch : undefined);
  if (!fetchImpl) return;

  const controller = typeof AbortController !== "undefined" ? new AbortController() : undefined;
  const timeoutId = controller
    ? setTimeout(() => controller.abort(), overrides?.timeoutMs ?? DEFAULT_TIMEOUT_MS)
    : undefined;

  try {
    await fetchImpl(`${backendUrl}${ANONYMOUS_EVENT_ENDPOINT_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller?.signal,
    });
    // Response status is deliberately never inspected beyond this --
    // any non-2xx (400/413/429/503) is dropped exactly like a network
    // failure would be; there is no product-visible action for either,
    // and no retry is ever attempted.
  } catch {
    // Network failure, timeout/abort, or anything else the fetch call
    // itself can throw -- swallowed. Never a console.log of `body`
    // (which could echo caller-supplied `properties` values) or any
    // other payload content -- see Task 2C S10.
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  }
}
