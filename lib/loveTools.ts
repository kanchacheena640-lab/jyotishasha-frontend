// lib/loveTools.ts
// Free love match: the two NON-essential results (Truth-or-Dare, Marriage potential), loaded after the main
// match result so the score is shown without waiting for them.
//
// Why: the backend runs one request at a time, so firing all three calls together made the visitor wait for
// the sum of all three. The main /api/love/report response alone carries the score, verdict and Mangal Dosh.
//
// Contract (sessionStorage "love_tools"):
//   { key, pending: true }                                  -- main result shown, these two still loading
//   { key, truth_or_dare, marriage_potential }              -- loaded (either part may be null if its call failed)
//   { key, failed: true }                                   -- neither could be loaded
// `key` = loveMatchKey(love_payload): a late answer for an older match can never overwrite a newer one.
// Sessions saved before this change ({ truth_or_dare, marriage_potential } without key) are still read.

import { loveMatchKey } from "./loveMatchForm";

export const LOVE_TOOLS_STORAGE_KEY = "love_tools";
export const LOVE_BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "https://jyotishasha-backend.onrender.com";

export type LoveToolsState =
  | { status: "pending" }
  | { status: "failed" }
  | { status: "ready"; truthOrDare: any; marriagePotential: any };

type LovePayload = Parameters<typeof loveMatchKey>[0];

// One in-flight load per match per page session: the form starts it, the result/detail pages reuse it.
const inflight = new Map<string, Promise<LoveToolsState>>();

const unwrap = (x: any) => (x && typeof x === "object" && x.data ? x.data : x);

export function pendingToolsRecord(key: string): string {
  return JSON.stringify({ key, pending: true });
}

/** What sessionStorage says for this match -- null when nothing (or another match's data) is stored. */
export function readLoveTools(raw: string | null, key: string): LoveToolsState | null {
  if (!raw) return null;
  let rec: any;
  try {
    rec = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!rec || typeof rec !== "object") return null;
  if ("key" in rec && rec.key !== key) return null;
  if (rec.pending) return { status: "pending" };
  if (rec.failed) return { status: "failed" };
  if (!("truth_or_dare" in rec) && !("marriage_potential" in rec)) return null;
  return { status: "ready", truthOrDare: unwrap(rec.truth_or_dare) ?? null, marriagePotential: unwrap(rec.marriage_potential) ?? null };
}

function currentPayloadKey(): string | null {
  try {
    const p = JSON.parse(sessionStorage.getItem("love_payload") || "null");
    return p ? loveMatchKey(p) : null;
  } catch {
    return null;
  }
}

async function fetchJson(url: string, payload: LovePayload): Promise<any | null> {
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!res.ok) return null;
    return unwrap(await res.json());
  } catch {
    return null;
  }
}

/**
 * Truth-or-Dare + Marriage potential for this match: from sessionStorage if already loaded, otherwise the
 * load already in flight on this page session, otherwise a new load (e.g. after a page reload). Never throws.
 */
export function loadLoveTools(payload: LovePayload, backend: string = LOVE_BACKEND): Promise<LoveToolsState> {
  const key = loveMatchKey(payload);
  let stored: LoveToolsState | null = null;
  try {
    stored = readLoveTools(sessionStorage.getItem(LOVE_TOOLS_STORAGE_KEY), key);
  } catch {
    stored = null;
  }
  if (stored && stored.status !== "pending") return Promise.resolve(stored);
  const running = inflight.get(key);
  if (running) return running;

  const job = (async (): Promise<LoveToolsState> => {
    const [truth, marriage] = await Promise.all([
      fetchJson(`${backend}/api/love/truth-or-dare`, payload),
      fetchJson(`${backend}/api/love/love-marriage-probability`, payload),
    ]);
    const state: LoveToolsState = truth || marriage
      ? { status: "ready", truthOrDare: truth, marriagePotential: marriage }
      : { status: "failed" };
    try {
      // Only if the visitor is still on this match (a newer match must never be overwritten).
      if (currentPayloadKey() === key) {
        sessionStorage.setItem(LOVE_TOOLS_STORAGE_KEY, JSON.stringify(
          state.status === "ready" ? { key, truth_or_dare: truth, marriage_potential: marriage } : { key, failed: true },
        ));
      }
    } catch {
      // storage unavailable: the resolved state is still returned to the page
    }
    return state;
  })();
  inflight.set(key, job);
  return job;
}
