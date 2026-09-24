/**
 * Relationship Future Report (Rs199): both birth places must be genuinely SELECTED from the autocomplete before any
 * order/payment request can start (Q5.8 hardening).
 *
 * Defect: a customer could type a place without picking a suggestion; latitude/longitude then stayed at the form's
 * 0/0 defaults and the form still proceeded to POST /api/razorpay-order, producing a paid report for the wrong
 * coordinates.
 *
 * Two layers are tested here:
 *   1. the pure helpers (lib/relationshipPlaceValidation.ts) -- selection state, dirty-input invalidation,
 *      coordinate validation;
 *   2. the REAL RelationshipFutureReportForm and the REAL useReportPurchase hook, executed in an isolated context
 *      with a tiny useState/useEffect shim, driven exactly like the browser drives them (the autocomplete component
 *      calls onPlaceSelected(place) and then onChange(place.name)). `fetch` is a spy: nothing touches the network,
 *      Razorpay, the backend or any payment code.
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/relationshipPlaceValidation.ts lib/relationshipPlaceValidation.test.ts
 *   node .ts-test-out/relationshipPlaceValidation.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */
/* eslint-disable @typescript-eslint/no-explicit-any -- the test drives untyped React element trees */
import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";
import * as ts from "typescript";
import {
  applyPlaceSelection,
  applyPobEdit,
  isResolvedPlace,
  isValidCoordinatePair,
  relationshipPlaceError,
  restoreStoredPlace,
} from "./relationshipPlaceValidation";

const repo = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(repo, file), "utf8");
let passed = 0;
async function check(label: string, test: () => void | Promise<void>) {
  await test();
  passed++;
  console.log(`PASS: ${label}`);
}

const blank = { pob: "", lat: 0, lng: 0, placeSelected: false };
const lucknow = { name: "Lucknow, Uttar Pradesh, India", lat: 26.8467, lng: 80.9462 };
const newYork = { name: "New York, NY, USA", lat: 40.7128, lng: -74.006 };

// ---- 1. pure helpers ---------------------------------------------------------------------------------------------
async function helperTests() {
  console.log("\n=== helpers: CASE 1/2/3 typed-only blocks, selected passes ===");
  await check("CASE 1/2: typed text alone (no selection) is never resolved -- even with coordinates present", () => {
    assert.equal(isResolvedPlace({ pob: "Lucknow", lat: 0, lng: 0, placeSelected: false }), false);
    assert.equal(isResolvedPlace({ pob: "Lucknow", lat: 26.8, lng: 80.9, placeSelected: false }), false);
    assert.equal(isResolvedPlace(null), false);
    assert.equal(isResolvedPlace(undefined), false);
  });
  await check("CASE 3: a real selection (name + coordinates + placeSelected) is resolved", () => {
    const p = applyPlaceSelection(blank, lucknow);
    assert.deepEqual(p, { pob: lucknow.name, lat: lucknow.lat, lng: lucknow.lng, placeSelected: true });
    assert.equal(isResolvedPlace(p), true);
  });
  await check("blank selected text is never resolved", () => {
    assert.equal(isResolvedPlace({ pob: "   ", lat: 26.8, lng: 80.9, placeSelected: true }), false);
    assert.equal(isResolvedPlace({ pob: "", lat: 26.8, lng: 80.9, placeSelected: true }), false);
  });

  console.log("\n=== helpers: CASE 4/5 editing a selected place invalidates it immediately ===");
  await check("CASE 4/5: any manual edit drops the selection AND its coordinates", () => {
    const selected = applyPlaceSelection(blank, lucknow);
    const edited = applyPobEdit(selected, lucknow.name + "x");
    assert.equal(edited.placeSelected, false);
    assert.equal(edited.lat, 0);
    assert.equal(edited.lng, 0);
    assert.equal(edited.pob, lucknow.name + "x");
    assert.equal(isResolvedPlace(edited), false);
  });
  await check("deleting one character / clearing the field invalidates", () => {
    const selected = applyPlaceSelection(blank, lucknow);
    assert.equal(isResolvedPlace(applyPobEdit(selected, lucknow.name.slice(0, -1))), false);
    assert.equal(isResolvedPlace(applyPobEdit(selected, "")), false);
  });
  await check("re-typing the identical text after an edit does NOT resurrect the old selection", () => {
    const edited = applyPobEdit(applyPlaceSelection(blank, lucknow), lucknow.name + "x");
    const retyped = applyPobEdit(edited, lucknow.name);
    assert.equal(isResolvedPlace(retyped), false);
    assert.equal(retyped.lat, 0);
  });
  await check("the autocomplete's own echo onChange(selectedName) right after onPlaceSelected is NOT an edit", () => {
    const selected = applyPlaceSelection(blank, lucknow);
    const echoed = applyPobEdit(selected, lucknow.name);
    assert.equal(echoed, selected);
    assert.equal(isResolvedPlace(echoed), true);
  });
  await check("a new selection replaces the previous one", () => {
    const second = applyPlaceSelection(applyPlaceSelection(blank, lucknow), newYork);
    assert.equal(second.pob, newYork.name);
    assert.equal(second.lat, newYork.lat);
    assert.equal(second.lng, newYork.lng);
    assert.equal(isResolvedPlace(second), true);
  });

  console.log("\n=== helpers: CASE 6/7/8 coordinate validation ===");
  await check("CASE 6: one coordinate equal to 0 is legitimate (lat 0 / lng 30, lat 30 / lng 0, negative zero)", () => {
    assert.equal(isValidCoordinatePair(0, 30), true);
    assert.equal(isValidCoordinatePair(30, 0), true);
    assert.equal(isValidCoordinatePair(-0, 30), true);
    assert.equal(isResolvedPlace({ pob: "Somewhere", lat: 0, lng: 30, placeSelected: true }), true);
    assert.equal(isResolvedPlace({ pob: "Somewhere", lat: 30, lng: 0, placeSelected: true }), true);
    const viaSelection = applyPlaceSelection(blank, { name: "Equator place", lat: 0, lng: 30 });
    assert.equal(isResolvedPlace(viaSelection), true);
  });
  await check("CASE 7: (0,0) is never proof of a resolved place -- with or without a selection flag", () => {
    assert.equal(isResolvedPlace({ pob: "Lucknow", lat: 0, lng: 0, placeSelected: false }), false);
    assert.equal(isResolvedPlace({ pob: "Lucknow", lat: 0, lng: 0, placeSelected: true }), false);
    assert.equal(isResolvedPlace({ pob: "Lucknow", lat: -0, lng: 0, placeSelected: true }), false);
    assert.equal(isResolvedPlace(applyPlaceSelection(blank, { name: "Lucknow", lat: 0, lng: 0 })), false);
  });
  await check("CASE 8: out-of-range / non-finite / non-numeric coordinates are invalid", () => {
    for (const [lat, lng] of [
      [91, 10], [-91, 10], [10, 181], [10, -181], [NaN, 10], [10, NaN], [Infinity, 10], [10, -Infinity],
      ["26.8", "80.9"], [null, null], [undefined, undefined], [26.8, undefined], [{}, []],
    ] as any[]) {
      assert.equal(isValidCoordinatePair(lat, lng), false, `${String(lat)}, ${String(lng)}`);
      assert.equal(isResolvedPlace({ pob: "X", lat, lng, placeSelected: true }), false);
      assert.equal(isResolvedPlace(applyPlaceSelection(blank, { name: "X", lat, lng })), false);
    }
    assert.equal(isValidCoordinatePair(90, 180), true);
    assert.equal(isValidCoordinatePair(-90, -180), true);
  });
  await check("a selection with a blank name stays unresolved", () => {
    assert.equal(isResolvedPlace(applyPlaceSelection(blank, { name: "  ", lat: 26.8, lng: 80.9 })), false);
  });

  console.log("\n=== helpers: stored love-match place (sessionStorage prefill) ===");
  await check("a usable stored place is resolved; a missing/0,0/out-of-range one is not", () => {
    assert.equal(isResolvedPlace(restoreStoredPlace({ pob: "Lucknow", lat: 26.8, lng: 80.9 })), true);
    assert.equal(isResolvedPlace(restoreStoredPlace({ pob: "Lucknow", latitude: 26.8, longitude: 80.9 })), true);
    assert.equal(isResolvedPlace(restoreStoredPlace({ pob: "Lucknow", lat: 0, lng: 30 })), true);
    assert.equal(isResolvedPlace(restoreStoredPlace({ pob: "Lucknow", lat: 0, lng: 0 })), false);
    assert.equal(isResolvedPlace(restoreStoredPlace({ pob: "Lucknow" })), false);
    assert.equal(isResolvedPlace(restoreStoredPlace({ pob: "", lat: 26.8, lng: 80.9 })), false);
    assert.equal(isResolvedPlace(restoreStoredPlace({ pob: "Lucknow", lat: "26.8", lng: "80.9" })), false);
    assert.equal(isResolvedPlace(restoreStoredPlace({ pob: "Lucknow", lat: 999, lng: 80.9 })), false);
    assert.equal(isResolvedPlace(restoreStoredPlace(undefined)), false);
    assert.equal(isResolvedPlace(restoreStoredPlace(null)), false);
  });
  await check("an unusable stored place keeps its text but zeroes coordinates", () => {
    assert.deepEqual(restoreStoredPlace({ pob: "Lucknow", lat: 999, lng: 80.9 }), { pob: "Lucknow", lat: 0, lng: 0, placeSelected: false });
  });

  console.log("\n=== helpers: validation messages ===");
  const ok = applyPlaceSelection(blank, lucknow);
  const ok2 = applyPlaceSelection(blank, newYork);
  await check("both resolved -> no error (EN and HI)", () => {
    assert.equal(relationshipPlaceError(ok, ok2, false), null);
    assert.equal(relationshipPlaceError(ok, ok2, true), null);
  });
  await check("primary unresolved -> primary message, checked first (also when both are unresolved)", () => {
    assert.equal(relationshipPlaceError(blank, ok2, false), "Please select your birth place from the suggestions.");
    assert.equal(relationshipPlaceError(blank, blank, false), "Please select your birth place from the suggestions.");
    assert.equal(relationshipPlaceError(blank, ok2, true), "कृपया सुझावों में से अपना जन्म स्थान चुनें।");
  });
  await check("partner unresolved -> partner message", () => {
    assert.equal(relationshipPlaceError(ok, blank, false), "Please select your partner's birth place from the suggestions.");
    assert.equal(relationshipPlaceError(ok, blank, true), "कृपया सुझावों में से अपने साथी का जन्म स्थान चुनें।");
  });
}

// ---- 2. the REAL form + the REAL purchase hook in an isolated context ---------------------------------------------
function loadModule(file: string, dependencies: Record<string, unknown>, globals: Record<string, unknown> = {}) {
  const code = ts.transpileModule(read(file), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports: Record<string, any> = {};
  vm.runInNewContext(code, {
    exports,
    require: (name: string) => {
      assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
      return dependencies[name];
    },
    ...globals,
  });
  return exports;
}
function walk(node: any, visit: (element: any) => void): void {
  if (Array.isArray(node)) { node.forEach((n) => walk(n, visit)); return; }
  if (node && typeof node === "object" && "props" in node) { visit(node); walk(node.props.children, visit); }
}
function findAll(tree: any, predicate: (element: any) => boolean): any[] {
  const found: any[] = [];
  walk(tree, (element) => { if (predicate(element)) found.push(element); });
  return found;
}

interface Harness {
  places: any[]; // [primary, partner] PlaceAutocompleteInput elements
  render: () => void;
  selectPlace: (index: 0 | 1, place: { name: string; lat: number; lng: number }) => void;
  typePlace: (index: 0 | 1, value: string) => void;
  fillOtherFields: () => void;
  submit: () => Promise<void>;
  alerts: string[];
  fetchCalls: { url: string; body: any }[];
}

function mount(locale: string, storedLovePayload?: unknown): Harness {
  const alerts: string[] = [];
  const fetchCalls: { url: string; body: any }[] = [];
  const store: any[] = [];
  let cursor = 0;
  let effectRan = false;
  const react = {
    useState: (init: unknown) => {
      const slot = cursor++;
      if (!(slot in store)) store[slot] = init;
      return [store[slot], (value: any) => { store[slot] = typeof value === "function" ? value(store[slot]) : value; }];
    },
    useEffect: (effect: () => void) => { if (!effectRan) { effectRan = true; effect(); } },
    // Reports Ads P0.2A: the form keeps its once-per-mount funnel guards in refs.
    useRef: (init: unknown) => {
      const slot = cursor++;
      if (!(slot in store)) store[slot] = { current: init };
      return store[slot];
    },
    useCallback: (fn: unknown) => fn,
  };
  const jsxRuntime = { jsx: (type: any, props: any) => ({ type, props }), jsxs: (type: any, props: any) => ({ type, props }) };
  const globals = {
    alert: (message: string) => { alerts.push(message); },
    sessionStorage: { getItem: (key: string) => (key === "love_payload" && storedLovePayload ? JSON.stringify(storedLovePayload) : null) },
    process: { env: {} },
    window: { Razorpay: function Razorpay() { throw new Error("Razorpay checkout must never open in this test"); }, sessionStorage: {} },
    // the ONLY network primitive available: records the call, answers "no order created" so the flow ends immediately
    fetch: async (url: string, init: any) => {
      fetchCalls.push({ url, body: init && init.body ? JSON.parse(init.body) : undefined });
      return { json: async () => ({ error: "test: no order" }), ok: false };
    },
  };
  const hook = loadModule("hooks/useReportPurchase.ts", {
    react,
    "@/lib/analyticsAttribution": { buildCampaignContextFromAttribution: () => undefined, readStoredAttribution: () => undefined },
    // Reports Ads P0.1: the hook now also imports the ad-attribution snapshot builder.
    "@/lib/adAttribution": { getBrowserOrderAttribution: () => undefined },
    // Reports Ads P0.2: the hook now also imports the verified-purchase tracker.
    "@/lib/ecommerceMeasurement": { trackBackendVerifiedPurchase: (_raw: unknown, done?: () => void) => { if (done) done(); return false; } },
  }, globals);
  const Form = loadModule("app/[locale]/love/report/relationship_future_report/RelationshipFutureReportForm.tsx", {
    "react/jsx-runtime": jsxRuntime,
    react,
    "@/components/PlaceAutocompleteInput": { default: "PlaceAutocompleteInput" },
    "@/hooks/useReportPurchase": hook,
    // Reports Ads P0.2A: the form now reads its catalog entry and pushes GA4 funnel events.
    "@/app/data/reportsData": { reportsData: [{ slug: "relationship_future_report", price: 199, title: { en: "Relationship Future Report" }, category: { en: "Love" } }] },
    "@/lib/ecommerceMeasurement": { pushViewItem() {}, pushBeginCheckout() {}, ORIGINAL_PRODUCT_FAMILY: "original_report" },
    "@/lib/reportSamples": { getReportSampleLabel: () => "sample", getReportSampleUrl: () => "/report-samples/x.pdf" },
    "@/lib/relationshipPlaceValidation": loadModule("lib/relationshipPlaceValidation.ts", {}),
  }, globals).default;

  let tree: any = null;
  const render = () => { cursor = 0; tree = Form({ locale }); };
  render(); // first pass: mounted=false, effects run (prefill, setMounted(true))
  render(); // second pass: the real form
  const places = () => findAll(tree, (e) => e.type === "PlaceAutocompleteInput");
  const harness: Harness = {
    get places() { return places(); },
    render,
    // exactly what components/PlaceAutocompleteInput.tsx does on place_changed
    selectPlace(index, place) { const el = places()[index]; el.props.onPlaceSelected(place); el.props.onChange(place.name); render(); },
    typePlace(index, value) { places()[index].props.onChange(value); render(); },
    fillOtherFields() {
      const inputs = findAll(tree, (e) => e.type === "input");
      inputs[0].props.onChange({ target: { value: "customer@example.com" } });
      const fill: [number, string][] = [[1, "Primary Person"], [2, "1990-06-15"], [3, "14:30"], [4, "Partner Person"], [5, "1992-02-03"], [6, "08:15"]];
      for (const [i, value] of fill) inputs[i].props.onChange({ target: { value } });
      render();
    },
    async submit() {
      const button = findAll(tree, (e) => e.type === "button" && typeof e.props.onClick === "function")[0];
      await button.props.onClick();
      render();
    },
    alerts,
    fetchCalls,
  };
  return harness;
}
const ORDER_URL = "https://jyotishasha-backend.onrender.com/api/razorpay-order";
const primaryMessage = (hi: boolean) => (hi ? "कृपया सुझावों में से अपना जन्म स्थान चुनें।" : "Please select your birth place from the suggestions.");
const partnerMessage = (hi: boolean) => (hi ? "कृपया सुझावों में से अपने साथी का जन्म स्थान चुनें।" : "Please select your partner's birth place from the suggestions.");

async function formTests() {
  for (const [locale, hi] of [["en", false], ["hi", true]] as const) {
    console.log(`\n=== real form + real purchase hook: /${locale === "en" ? "" : locale + "/"}love/report/relationship_future_report ===`);

    await check(`[${locale}] CASE 1: primary typed, not selected (partner selected) -> BLOCKED, message shown, no order request`, async () => {
      const h = mount(locale);
      h.fillOtherFields();
      h.typePlace(0, "Lucknow");
      h.selectPlace(1, newYork);
      await h.submit();
      assert.deepEqual(h.alerts, [primaryMessage(hi)]);
      assert.equal(h.fetchCalls.length, 0);
    });
    await check(`[${locale}] CASE 2: partner typed, not selected (primary selected) -> BLOCKED with the PARTNER message, no order request`, async () => {
      const h = mount(locale);
      h.fillOtherFields();
      h.selectPlace(0, lucknow);
      h.typePlace(1, "New York");
      await h.submit();
      assert.deepEqual(h.alerts, [partnerMessage(hi)]);
      assert.equal(h.fetchCalls.length, 0);
    });
    await check(`[${locale}] neither place touched (0,0 defaults) -> BLOCKED, no order request`, async () => {
      const h = mount(locale);
      h.fillOtherFields();
      await h.submit();
      assert.deepEqual(h.alerts, [primaryMessage(hi)]);
      assert.equal(h.fetchCalls.length, 0);
    });
    await check(`[${locale}] CASE 3: both places selected (autocomplete order: onPlaceSelected then onChange) -> order request IS made, with the right coordinates`, async () => {
      const h = mount(locale);
      h.fillOtherFields();
      h.selectPlace(0, lucknow);
      h.selectPlace(1, newYork);
      await h.submit();
      assert.ok(!h.alerts.includes(primaryMessage(hi)) && !h.alerts.includes(partnerMessage(hi)), "no place validation alert");
      assert.equal(h.fetchCalls.length, 1);
      assert.equal(h.fetchCalls[0].url, ORDER_URL);
      const body = h.fetchCalls[0].body;
      assert.equal(body.product, "relationship_future_report");
      assert.equal(body.language, locale);
      assert.equal(body.pob, lucknow.name);
      assert.equal(body.latitude, lucknow.lat);
      assert.equal(body.longitude, lucknow.lng);
      assert.equal(body.partner.pob, newYork.name);
      assert.equal(body.partner.latitude, newYork.lat);
      assert.equal(body.partner.longitude, newYork.lng);
      assert.equal(body.partner.name, "Partner Person");
    });
    await check(`[${locale}] CASE 4: primary selected, then edited -> stale selection invalid -> BLOCKED, no order request`, async () => {
      const h = mount(locale);
      h.fillOtherFields();
      h.selectPlace(0, lucknow);
      h.selectPlace(1, newYork);
      h.typePlace(0, lucknow.name + " ");
      await h.submit();
      assert.deepEqual(h.alerts, [primaryMessage(hi)]);
      assert.equal(h.fetchCalls.length, 0);
    });
    await check(`[${locale}] CASE 5: partner selected, then edited -> stale selection invalid -> BLOCKED, no order request`, async () => {
      const h = mount(locale);
      h.fillOtherFields();
      h.selectPlace(0, lucknow);
      h.selectPlace(1, newYork);
      h.typePlace(1, "New Yor");
      await h.submit();
      assert.deepEqual(h.alerts, [partnerMessage(hi)]);
      assert.equal(h.fetchCalls.length, 0);
    });
    await check(`[${locale}] editing then re-selecting recovers: the flow proceeds again (order request made with the NEW coordinates)`, async () => {
      const h = mount(locale);
      h.fillOtherFields();
      h.selectPlace(0, lucknow);
      h.selectPlace(1, newYork);
      h.typePlace(0, "Luck");
      await h.submit();
      assert.equal(h.fetchCalls.length, 0);
      h.selectPlace(0, { name: "Delhi, India", lat: 28.6139, lng: 77.209 });
      await h.submit();
      assert.equal(h.fetchCalls.length, 1);
      assert.equal(h.fetchCalls[0].body.latitude, 28.6139);
    });
    await check(`[${locale}] CASE 6: a legitimate place with lat 0 (or lng 0) is accepted -- request is made`, async () => {
      const h = mount(locale);
      h.fillOtherFields();
      h.selectPlace(0, { name: "Equator place", lat: 0, lng: 30 });
      h.selectPlace(1, { name: "Meridian place", lat: 30, lng: 0 });
      await h.submit();
      assert.equal(h.fetchCalls.length, 1);
      assert.equal(h.fetchCalls[0].body.latitude, 0);
      assert.equal(h.fetchCalls[0].body.longitude, 30);
      assert.equal(h.fetchCalls[0].body.partner.latitude, 30);
      assert.equal(h.fetchCalls[0].body.partner.longitude, 0);
    });
    await check(`[${locale}] CASE 7: a selection that resolved to (0,0) is NOT accepted -> BLOCKED, no order request`, async () => {
      const h = mount(locale);
      h.fillOtherFields();
      h.selectPlace(0, { name: "Null Island", lat: 0, lng: 0 });
      h.selectPlace(1, newYork);
      await h.submit();
      assert.deepEqual(h.alerts, [primaryMessage(hi)]);
      assert.equal(h.fetchCalls.length, 0);
    });
    await check(`[${locale}] CASE 8: out-of-range / non-finite coordinates from a "selection" -> BLOCKED, no order request`, async () => {
      for (const bad of [{ lat: 95, lng: 10 }, { lat: 10, lng: 200 }, { lat: NaN, lng: 10 }, { lat: 10, lng: Infinity }]) {
        const h = mount(locale);
        h.fillOtherFields();
        h.selectPlace(0, { name: "Bad place", ...bad });
        h.selectPlace(1, newYork);
        await h.submit();
        assert.deepEqual(h.alerts, [primaryMessage(hi)]);
        assert.equal(h.fetchCalls.length, 0);
      }
    });
    await check(`[${locale}] free love-match prefill (sessionStorage): usable stored places pass; editing one still invalidates it`, async () => {
      const stored = {
        user: { name: "Stored A", dob: "1990-06-15", tob: "14:30", pob: lucknow.name, lat: lucknow.lat, lng: lucknow.lng },
        partner: { name: "Stored B", dob: "1992-02-03", tob: "08:15", pob: newYork.name, lat: newYork.lat, lng: newYork.lng },
      };
      const ok = mount(locale, stored);
      ok.fillOtherFields();
      await ok.submit();
      assert.equal(ok.fetchCalls.length, 1);
      assert.equal(ok.fetchCalls[0].body.latitude, lucknow.lat);
      const edited = mount(locale, stored);
      edited.fillOtherFields();
      edited.typePlace(1, newYork.name.slice(0, -1));
      await edited.submit();
      assert.deepEqual(edited.alerts, [partnerMessage(hi)]);
      assert.equal(edited.fetchCalls.length, 0);
    });
    await check(`[${locale}] prefill with unusable coordinates (0,0 / missing) is not trusted -> BLOCKED`, async () => {
      const stored = {
        user: { name: "Stored A", pob: "Lucknow", lat: 0, lng: 0 },
        partner: { name: "Stored B", pob: "New York" },
      };
      const h = mount(locale, stored);
      h.fillOtherFields();
      await h.submit();
      assert.deepEqual(h.alerts, [primaryMessage(hi)]);
      assert.equal(h.fetchCalls.length, 0);
    });
  }
}

// ---- 3. source-level guarantees -----------------------------------------------------------------------------------
async function sourceTests() {
  console.log("\n=== source: the guard sits BEFORE the payment path; nothing else changed ===");
  const form = read("app/[locale]/love/report/relationship_future_report/RelationshipFutureReportForm.tsx");
  await check("the place check runs before the only purchase() call and before the order payload is built", () => {
    const guard = form.indexOf("relationshipPlaceError(form.boy, form.girl, isHi)");
    const payload = form.indexOf("const orderPayload");
    const purchase = form.indexOf("await purchase(");
    assert.ok(guard > 0 && payload > guard && purchase > payload);
    assert.equal(form.split("purchase(").length - 1, 1, "exactly one purchase( call");
    assert.ok(form.slice(guard, payload).includes("return;"), "invalid places return before any order payload/payment");
  });
  await check("both PlaceAutocompleteInput fields use the selection/edit handlers (no raw lat/lng writes remain)", () => {
    assert.ok(form.includes('onChange={(v) => editPob("boy", v)}') && form.includes('onPlaceSelected={(p) => selectPlace("boy", p)}'));
    assert.ok(form.includes('onChange={(v) => editPob("girl", v)}') && form.includes('onPlaceSelected={(p) => selectPlace("girl", p)}'));
    assert.ok(!/update\("(boy|girl)", "(lat|lng)"/.test(form));
  });
  await check("price, product slug, redirect and payload shape are untouched", () => {
    assert.ok(form.includes('productSlug: "relationship_future_report"'));
    assert.ok(form.includes("Pay ₹199 & Generate Report") && form.includes("₹199 भुगतान करें और रिपोर्ट प्राप्त करें"));
    assert.ok(form.includes("redirectTo: `/${locale}/thank-you`"));
    for (const line of ["latitude: form.boy.lat,", "longitude: form.boy.lng,", "latitude: form.girl.lat,", "longitude: form.girl.lng,", "language: form.language,"]) {
      assert.ok(form.includes(line), line);
    }
    assert.ok(!form.includes("28.6139"), "no default-coordinate fallback");
  });
  await check("the shared autocomplete component, the purchase hook and the backend URL logic are not touched by this fix", () => {
    const hook = read("hooks/useReportPurchase.ts");
    assert.ok(hook.includes("/api/razorpay-order") && hook.includes("DEFAULT_BACKEND_URL"));
    const helper = read("lib/relationshipPlaceValidation.ts");
    const code = helper.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
    assert.ok(!/fetch\(|razorpay|XMLHttpRequest|localStorage|sessionStorage|import /i.test(code), "helper is pure (no network/storage/imports)");
  });
}

(async () => {
  await helperTests();
  await formTests();
  await sourceTests();
  console.log("\n==================================================");
  console.log(`RESULT: ${passed} passed, 0 failed`);
  console.log("==================================================");
})().catch((error) => {
  console.error("FAIL:", error && error.message ? error.message : error);
  process.exit(1);
});
