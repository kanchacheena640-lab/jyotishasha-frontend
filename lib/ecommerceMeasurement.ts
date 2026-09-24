// lib/ecommerceMeasurement.ts

/**
 * Reports Ads P0.2 -- GA4-compatible ecommerce events for the focused
 * reports: `view_item`, `begin_checkout`, and the backend-CONFIRMED
 * `purchase`. All three are pushed to window.dataLayer; which
 * destinations (GA4, Google Ads, later Meta) consume them is a GTM
 * console matter.
 *
 * THE FINANCIAL RULE
 *   `purchase` is pushed ONLY from a purchase_measurement object that the
 *   backend returned in the very response that proves the payment
 *   verified and the internal Order PAID (POST /webhook -- see
 *   modules/payments/purchase_measurement.py). Nothing in this file
 *   verifies a payment, and value / currency / item are never rebuilt
 *   from frontend constants: they are copied from the backend object.
 *   A Razorpay window opening, checkout start, a redirect, a success
 *   screen or a thank-you URL can never produce a purchase.
 *   view_item / begin_checkout are browser FUNNEL events (their price is
 *   the catalog display price), never financial authority.
 *
 * WHY THE PURCHASE FIRES BEFORE NAVIGATION (not on the thank-you page)
 *   The thank-you page is a static page with no order reference; making
 *   it measure would need either a URL a visitor could forge (fake
 *   revenue) or an unauthenticated order-lookup endpoint. Instead the
 *   checkout pushes the event from the verified /webhook response and
 *   only THEN navigates. trackBackendVerifiedPurchase() waits for GTM's
 *   own `eventCallback` (tags dispatched) before calling `onDone`, with a
 *   hard timeout, and calls it immediately when GTM is not loaded (ad
 *   blocker) so a customer is never delayed by analytics. Residual risk:
 *   a customer who closes the tab between paying and the /webhook
 *   response is not measured in the browser (backend reconciliation is a
 *   later phase); the Order and report are unaffected.
 *
 * DEDUPE
 *   Identity = transaction_id. An in-memory marker stops duplicates within
 *   the page load (re-renders, a duplicate Razorpay callback, a repeated
 *   backend response). A first-party localStorage marker
 *   `purchase_measured:<transaction_id>` additionally stops later loads
 *   (refresh, back/forward, new tab) -- but it is written ONLY when a loaded
 *   GTM is there to consume the event, is withdrawn if GTM never calls back,
 *   and both markers are undone if the dataLayer push itself throws. So a
 *   purchase that was never handed to a consumer can never be permanently
 *   recorded as "measured". What cannot be known from the browser is
 *   whether GTM's tags actually reached GA4 / Ads (network delivery); that
 *   residual is covered by GA4 / Ads de-duplicating on transaction_id and by
 *   later backend reconciliation. The backend's own payment dedupe stays
 *   authoritative for money.
 *
 * CONSENT
 *   dataLayer.push stays unconditional, exactly like
 *   lib/marketingMeasurementBridge.ts: Google Consent Mode's own signals
 *   (bootstrapped per geo policy in app/layout.tsx) decide what GTM tags
 *   do with it. No second consent system, and this module imports nothing
 *   from consent.
 *
 * PII: the purchase object is rebuilt from an allowlist of ten backend
 * fields; extras are dropped. No name/email/phone/birth data, payment ids,
 * click ids or UTMs ever enter an event. (Reports Ads P0.2 supersedes the
 * earlier "no browser-side purchase" rule of Task 6/7 -- but only in this
 * module, and only for backend-confirmed focused purchases.)
 */

export interface PurchaseMeasurement {
  transaction_id: string;
  value: number;
  currency: string;
  item_id: string;
  item_name?: string;
  item_category: string;
  product_family: string;
  report_type: string;
  payment_provider: string;
  source_platform: string;
}

export interface EcommerceItem {
  item_id: string;
  item_name?: string;
  item_category: string;
  price: number;
  quantity: 1;
}

export interface DataLayerLike {
  push: (value: unknown) => unknown;
}

export interface MeasuredStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem?(key: string): void;
}

export const PURCHASE_MEASURED_KEY_PREFIX = "purchase_measured:";
export const DEFAULT_EVENT_TIMEOUT_MS = 1500;

const TX_RE = /^ord_\d{1,12}$/;
const ITEM_ID_RE = /^[a-z0-9_]{1,100}$/;
const SLUG_RE = /^[a-z_]{1,50}$/;
const PROVIDER_RE = /^[A-Za-z_]{1,30}$/;
const CURRENCY_RE = /^[A-Z]{3}$/;

/** Strict allowlist parse of the backend's purchase_measurement. Returns
 * null for anything malformed -- and never carries unknown keys through. */
export function parsePurchaseMeasurement(raw: unknown): PurchaseMeasurement | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const str = (v: unknown, re: RegExp): string | null => (typeof v === "string" && re.test(v) ? v : null);

  const transaction_id = str(o.transaction_id, TX_RE);
  const currency = str(o.currency, CURRENCY_RE);
  const item_id = str(o.item_id, ITEM_ID_RE);
  const item_category = str(o.item_category, SLUG_RE);
  const product_family = str(o.product_family, SLUG_RE);
  const report_type = str(o.report_type, SLUG_RE);
  const payment_provider = str(o.payment_provider, PROVIDER_RE);
  const source_platform = str(o.source_platform, SLUG_RE);
  const value = o.value;
  if (!transaction_id || !currency || !item_id || !item_category || !product_family || !report_type || !payment_provider || !source_platform) return null;
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0 || value > 1_000_000) return null;

  const measurement: PurchaseMeasurement = {
    transaction_id, value, currency, item_id, item_category, product_family, report_type, payment_provider, source_platform,
  };
  if (typeof o.item_name === "string" && o.item_name.trim() && o.item_name.length <= 200) measurement.item_name = o.item_name.trim();
  return measurement;
}

function itemFrom(base: { item_id: string; item_name?: string; item_category: string }, price: number): EcommerceItem {
  const item: EcommerceItem = { item_id: base.item_id, item_category: base.item_category, price, quantity: 1 };
  if (base.item_name) item.item_name = base.item_name;
  return item;
}

/** GA4 dataLayer shape for `purchase` -- every value copied from the backend object. */
export function buildPurchaseEvent(m: PurchaseMeasurement): Record<string, unknown> {
  return {
    event: "purchase",
    ecommerce: {
      transaction_id: m.transaction_id,
      value: m.value,
      currency: m.currency,
      items: [itemFrom(m, m.value)],
    },
    product_family: m.product_family,
    report_type: m.report_type,
    payment_provider: m.payment_provider,
    source_platform: m.source_platform,
  };
}

// ---------------------------------------------------------------------
// Once-per-transaction protection
// ---------------------------------------------------------------------
const memoryMeasured = new Set<string>();

function isMeasured(storage: MeasuredStorageLike | null, transactionId: string): boolean {
  if (memoryMeasured.has(transactionId)) return true;
  try {
    return !!storage && storage.getItem(PURCHASE_MEASURED_KEY_PREFIX + transactionId) !== null;
  } catch {
    return false;
  }
}

/** The in-memory marker always guards THIS page load against duplicates. The
 * persistent localStorage marker (which also blocks later loads) is written
 * only when `persist` is true -- i.e. only when a loaded GTM is there to
 * consume the event -- so a purchase that had no consumer at all can never
 * be permanently recorded as "measured". */
function markMeasured(storage: MeasuredStorageLike | null, transactionId: string, persist: boolean): void {
  memoryMeasured.add(transactionId);
  if (!persist) return;
  try {
    storage?.setItem(PURCHASE_MEASURED_KEY_PREFIX + transactionId, new Date().toISOString());
  } catch {
    // blocked/full storage: the in-memory marker still covers this page load.
  }
}

function removePersistentMarker(storage: MeasuredStorageLike | null, transactionId: string): void {
  try {
    storage?.removeItem?.(PURCHASE_MEASURED_KEY_PREFIX + transactionId);
  } catch {
    // nothing more can be done; never throws into product code.
  }
}

/** Test-only: forget in-memory markers (simulates a fresh page load). */
export function resetMeasuredMemoryForTest(): void {
  memoryMeasured.clear();
}

export interface PushPurchaseOptions {
  storage?: MeasuredStorageLike | null;
  dataLayer: DataLayerLike;
  /** true only when GTM is loaded (a real consumer exists and can call
   * eventCallback). Also decides whether the PERSISTENT dedupe marker is
   * written: with no GTM only the in-page marker is set. */
  waitForTags?: boolean;
  timeoutMs?: number;
  /** Called exactly once when it is safe to navigate. */
  onDone?: () => void;
}

/**
 * Pushes `purchase` at most once per transaction_id. Returns true only when
 * an event was pushed. `onDone` is ALWAYS called exactly once (immediately
 * for invalid / already-measured / no-GTM cases).
 */
export function pushPurchaseOnce(raw: unknown, options: PushPurchaseOptions): boolean {
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    try { options.onDone?.(); } catch { /* navigation callback must never throw into product code */ }
  };

  const storage = options.storage ?? null;
  let transactionId: string | null = null;
  let pushCompleted = false;

  try {
    const measurement = parsePurchaseMeasurement(raw);
    if (!measurement) { finish(); return false; }

    transactionId = measurement.transaction_id;
    if (isMeasured(storage, transactionId)) { finish(); return false; }

    // GTM loaded = a real consumer exists for this event. Without one
    // (blocked / failed to load) only the in-page marker is set.
    const gtmPresent = options.waitForTags === true;
    // Marked and pushed in ONE synchronous block (no await / timer between),
    // so "marked but never pushed" can only happen if the push itself throws
    // -- handled in the catch below.
    markMeasured(storage, transactionId, gtmPresent);

    const timeoutMs = options.timeoutMs ?? DEFAULT_EVENT_TIMEOUT_MS;
    const waitForCallback = gtmPresent && !!options.onDone;
    let calledBack = false;
    options.dataLayer.push({ ecommerce: null }); // GA4: clear the previous ecommerce object
    const event: Record<string, unknown> = buildPurchaseEvent(measurement);
    if (waitForCallback) {
      event.eventCallback = () => { calledBack = true; finish(); };
      event.eventTimeout = timeoutMs;
    }
    options.dataLayer.push(event);
    pushCompleted = true;

    if (waitForCallback) {
      // GTM invokes eventCallback when its tags have run (or its own
      // eventTimeout elapsed). If it never calls back at all, GTM is present
      // but not processing: release navigation, and withdraw the PERSISTENT
      // marker so a later re-delivery of this verified transaction can still
      // be measured (the in-page marker stays, so this load cannot double
      // fire; GA4 / Ads also de-duplicate on transaction_id).
      const id = transactionId;
      setTimeout(() => {
        if (!calledBack) removePersistentMarker(storage, id);
        finish();
      }, timeoutMs + 250);
    } else {
      finish();
    }
    return true;
  } catch {
    // The event never made it into the dataLayer (e.g. a hijacked push threw):
    // never leave a false "measured" state behind.
    if (transactionId && !pushCompleted) {
      memoryMeasured.delete(transactionId);
      removePersistentMarker(storage, transactionId);
    }
    finish();
    return false;
  }
}

// ---------------------------------------------------------------------
// view_item / begin_checkout (funnel events, not financial authority)
// ---------------------------------------------------------------------
export interface FunnelItemInput {
  questionKey: string;
  itemName?: string;
  category: string;
  /** catalog display price in major units (₹51 -> 51) */
  price: number;
  currency?: string;
  reportType: "self" | "dual";
}

export const FOCUSED_PRODUCT_FAMILY = "focused_report";

function buildFunnelEvent(eventName: "view_item" | "begin_checkout", input: FunnelItemInput): Record<string, unknown> {
  const currency = input.currency ?? "INR";
  return {
    event: eventName,
    ecommerce: {
      currency,
      value: input.price,
      items: [itemFrom({ item_id: input.questionKey, item_name: input.itemName, item_category: input.category }, input.price)],
    },
    product_family: FOCUSED_PRODUCT_FAMILY,
    report_type: input.reportType,
  };
}

export function buildViewItemEvent(input: FunnelItemInput): Record<string, unknown> {
  return buildFunnelEvent("view_item", input);
}

export function buildBeginCheckoutEvent(input: FunnelItemInput): Record<string, unknown> {
  return buildFunnelEvent("begin_checkout", input);
}

function pushFunnel(event: Record<string, unknown>, dataLayer: DataLayerLike): void {
  try {
    dataLayer.push({ ecommerce: null });
    dataLayer.push(event);
  } catch {
    // Analytics must never throw into product code.
  }
}

// ---------------------------------------------------------------------
// Browser wrappers (the only DOM-touching code). None ever throws.
// ---------------------------------------------------------------------
function browserDataLayer(): DataLayerLike | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { dataLayer?: unknown[] };
  if (!Array.isArray(w.dataLayer)) w.dataLayer = [];
  return w.dataLayer as unknown as DataLayerLike;
}

function gtmIsLoaded(): boolean {
  return typeof window !== "undefined" && typeof (window as unknown as { google_tag_manager?: unknown }).google_tag_manager === "object";
}

export function pushViewItem(input: FunnelItemInput): void {
  const dl = browserDataLayer();
  if (dl) pushFunnel(buildViewItemEvent(input), dl);
}

export function pushBeginCheckout(input: FunnelItemInput): void {
  const dl = browserDataLayer();
  if (dl) pushFunnel(buildBeginCheckoutEvent(input), dl);
}

/**
 * Called by the checkouts with the backend's `purchase_measurement`,
 * taken from the verified /webhook response. `onDone` (e.g. the
 * thank-you navigation) is always called exactly once.
 */
export function trackBackendVerifiedPurchase(raw: unknown, onDone?: () => void): boolean {
  try {
    const dl = browserDataLayer();
    if (!dl) { onDone?.(); return false; }
    let storage: MeasuredStorageLike | null = null;
    try { storage = window.localStorage; } catch { storage = null; }
    return pushPurchaseOnce(raw, { storage, dataLayer: dl, waitForTags: gtmIsLoaded(), onDone });
  } catch {
    try { onDone?.(); } catch { /* never throws */ }
    return false;
  }
}
