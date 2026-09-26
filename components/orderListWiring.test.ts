// components/orderListWiring.test.ts
//
// Admin Orders P0 fixes -- this repo has no component-rendering test
// harness for admin pages (see lib/admin/revenuePageWiring.test.ts's own
// header comment, the established precedent this file follows exactly),
// so this proves the OrderList.tsx / download-route WIRING via direct
// source-text inspection: place-autocomplete invariant reuse, the
// Download BFF route (never NEXT_PUBLIC_BACKEND_URL direct), the
// Resend guard, and that ADMIN_BRIDGE_SECRET never reaches a
// client/browser file.
//
// Standalone check()/pass-fail-counter convention (no test runner). Run
// from the repo root:
//
//   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
//     --outDir .ts-test-out components/orderListWiring.test.ts
//   node .ts-test-out/orderListWiring.test.js
//
// (then remove .ts-test-out/ -- build output, never committed.)

import * as fs from "fs";
import * as path from "path";

let passed = 0;
let failed = 0;
function check(label: string, condition: boolean) {
  if (condition) { passed += 1; console.log(`  PASS: ${label}`); }
  else { failed += 1; console.log(`  FAIL: ${label}`); }
}

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8");
}
function stripComments(src: string): string {
  return src.replace(/\{\/\*[\s\S]*?\*\/\}/g, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

const orderList = stripComments(readSource("components/OrderList.tsx"));
const helpers = stripComments(readSource("components/orderListHelpers.ts"));
const downloadRoute = stripComments(readSource("app/api/admin/orders/[id]/download/route.ts"));
const editRoute = stripComments(readSource("app/api/admin/orders/[id]/route.ts"));
const resendRoute = stripComments(readSource("app/api/admin/orders/[id]/resend/route.ts"));
const adminOrdersPy = stripComments(readSource("../Jyotishasha_Backend/routes/admin_orders.py").replace(/#.*$/gm, ""));

console.log("\n=== 1. Place autocomplete: the shared, tested invariant is reused, not reimplemented ===");
{
  check("OrderList imports the shared PlaceAutocompleteInput component", orderList.includes('import PlaceAutocompleteInput from "./PlaceAutocompleteInput"'));
  check("OrderList imports applyPlaceSelection/applyPobEdit from the SAME lib/relationshipPlaceValidation.ts the customer relationship form uses -- no duplicated invariant logic", /from "@\/lib\/relationshipPlaceValidation"/.test(orderList) && orderList.includes("applyPlaceSelection") && orderList.includes("applyPobEdit"));
  check("no raw latitude/longitude <input> fields remain -- coordinates are no longer independently editable", !/placeholder="Latitude"/.test(orderList) && !/placeholder="Longitude"/.test(orderList));
  check("a manual retype goes through applyPobEdit (invalidates any prior selection), never a raw setState of pob alone", /onChange=\{\(value\) => setPlaceState\(\(prev\) => applyPobEdit\(prev, value\)\)\}/.test(orderList));
  check("a genuine autocomplete pick goes through applyPlaceSelection and updates pob+lat+lng atomically in one call", /onPlaceSelected=\{\(place\) => \{\s*setPlaceState\(\(prev\) => applyPlaceSelection\(prev, place\)\)/.test(orderList));
  check("the existing order's place is trusted as already-resolved on open (placeSelected: true) -- an untouched place can still be saved", /placeSelected: true,?\s*\}\);/.test(orderList) && orderList.includes("function openEdit"));
  check("Save is disabled until the place is resolved (placeState.placeSelected)", /disabled=\{!placeState\.placeSelected\}/.test(orderList));
  check("DOB/TOB editing is preserved unchanged (still plain date/time inputs bound to formData)", /type="date"[\s\S]{0,120}formData\.dob/.test(orderList) && /type="time"[\s\S]{0,120}formData\.tob/.test(orderList));
  check("NULL coordinate preservation fix: latitude/longitude are OMITTED from the payload entirely unless a fresh selection resolved them (never a client-side re-send of NULL/\"\"/existing coordinates in any representation)",
    /if \(placeFreshlySelected\) \{\s*payload\.latitude = String\(placeState\.lat\);\s*payload\.longitude = String\(placeState\.lng\);\s*\}/.test(orderList));
  check("the base payload object itself has no latitude/longitude keys at all -- they are only ever added conditionally, never defaulted from any client-held 'original' value", !/latitude:\s*placeFreshlySelected/.test(orderList) && !/initialPlace/.test(orderList));
  check("the payload always still includes dob/tob/pob unconditionally (only coordinates are conditional)", /const payload:[\s\S]{0,200}dob: formData\.dob,\s*tob: formData\.tob,\s*pob: placeState\.pob,/.test(orderList));
}

console.log("\n=== 2. Download: routed through the authenticated BFF, never the raw backend URL ===");
{
  check("OrderList no longer references NEXT_PUBLIC_BACKEND_URL anywhere (the old direct, unauthenticated link is gone)", !orderList.includes("NEXT_PUBLIC_BACKEND_URL"));
  check("the Download link points at the new same-origin BFF route", /href=\{`\/api\/admin\/orders\/\$\{order\.id\}\/download`\}/.test(orderList));
  check("Download is shown only when deliveryStatus() says a PDF currently exists (kind === 'download')", /status\.kind === "download"/.test(orderList));
  check("download route file exists at the expected BFF path", fs.existsSync(path.join(__dirname, "..", "app/api/admin/orders/[id]/download/route.ts")));
  check("the download route validates the admin session BEFORE calling the backend (same isValidAdminSession/ADMIN_SESSION_COOKIE as edit/resend)", downloadRoute.includes("isValidAdminSession") && downloadRoute.includes("ADMIN_SESSION_COOKIE") && /requireAdminSession[\s\S]{0,400}return NextResponse\.json\(\{ error: "unauthorized" \}, \{ status: 401 \}\)/.test(downloadRoute));
  check("a missing session short-circuits before any fetch to the backend (denied-check runs first in GET)", /export async function GET[\s\S]{0,150}const denied = requireAdminSession\(req\);\s*if \(denied\) return denied;/.test(downloadRoute));
  check("the bridge secret is read from server-side env only and sent as X-Admin-Bridge-Key, exactly like edit/resend", downloadRoute.includes("process.env.ADMIN_BRIDGE_SECRET") && /X-Admin-Bridge-Key.*bridgeSecret/.test(downloadRoute));
  check("it calls Flask's admin_download endpoint, never anything client-supplied as a path", /\/admin\/download\/\$\{encodeURIComponent\(params\.id\)\}/.test(downloadRoute));
  check("a non-ok backend response is forwarded as JSON with the backend's own status -- never rewritten into a fake PDF", /if \(!res\.ok\) \{[\s\S]{0,200}return NextResponse\.json\(data, \{ status: res\.status \}\);/.test(downloadRoute));
  check("a successful response streams the actual bytes (arrayBuffer) with the backend's Content-Type/Content-Disposition forwarded, not re-guessed from scratch", downloadRoute.includes("res.arrayBuffer()") && downloadRoute.includes('res.headers.get("Content-Type")') && downloadRoute.includes('res.headers.get("Content-Disposition")'));
  check("it never regenerates a report -- no dispatcher/reconciliation/generation call anywhere in this route", !/ReconciliationService|dispatch|regenerate|generate_and_send/i.test(downloadRoute));
  check("ADMIN_BRIDGE_SECRET is never referenced by any client/browser-facing file (OrderList.tsx or the helper module)", !orderList.includes("ADMIN_BRIDGE_SECRET") && !helpers.includes("ADMIN_BRIDGE_SECRET"));
}

console.log("\n=== 3. Status UX: deliveryStatus() drives the label, no hardcoded 'Not ready' left ===");
{
  check("OrderList imports deliveryStatus/canResend from the new pure helper module", orderList.includes('from "./orderListHelpers"') && orderList.includes("deliveryStatus") && orderList.includes("canResend"));
  check("the old blanket 'Not ready' string is gone from OrderList.tsx", !orderList.includes("Not ready"));
  check("the non-download branch renders the backend-state-driven status label, not a hardcoded string", /\{status\.label\}/.test(orderList));
  check("the word 'Delivered' is never used anywhere in OrderList.tsx or the helper module (Revenue Dashboard terminology: Emailed / email status)", !/Delivered/.test(orderList + helpers));
  check("the helper module distinguishes all four required states (generating/failed/emailed_no_pdf/download) plus a safe fallback", ["generating", "failed", "emailed_no_pdf", "download", "not_available"].every((k) => helpers.includes(`"${k}"`)));
}

console.log("\n=== 4. Resend guard: only Ready + FAILED is actionable ===");
{
  check("canResend() is the exact backend precondition (report_stage==Ready AND email_status==FAILED)", /report_stage === "Ready" && order\.email_status === "FAILED"/.test(helpers));
  check("the Resend button's disabled prop is driven by canResend(order), computed once per row", /const resendEnabled = canResend\(order\)/.test(orderList) && /disabled=\{!resendEnabled\}/.test(orderList));
  check("ReconciliationService.retry_delivery's backend logic itself is untouched by this task (resend_order() still calls it exactly as before)", resendRoute.includes("proxyRevenue") === false && resendRoute.includes("/admin/api/resend/"));
}

console.log("\n=== 5. Backend: admin_orders.py exposes what the modal needs and validates a changed place ===");
{
  check("get_all_orders() now returns dob/tob/pob/latitude/longitude/email_status (previously the modal always opened blank)", ["dob", "tob", "pob", "latitude", "longitude", "email_status"].every((f) => new RegExp(`"${f}":\\s*o\\.${f}`).test(adminOrdersPy)));
  check("update_order() rejects a CHANGED pob that lacks a valid, non-(0,0) lat/long pair, with a 400 and a clear message", /new_pob != order\.pob/.test(adminOrdersPy) && /invalid_place/.test(adminOrdersPy) && /lat_val == 0 and lng_val == 0/.test(adminOrdersPy));
  check("an UNCHANGED pob (or a request that omits pob) is never blocked by the new guard", /if new_pob is not None and new_pob != order\.pob/.test(adminOrdersPy));
  check("the endpoint's allowed-field contract is otherwise untouched (still exactly dob/tob/pob/latitude/longitude)", /order\.dob = data\.get\("dob", order\.dob\)/.test(adminOrdersPy) && !/order\.\w+ = data\.get\("(?!dob|tob|pob|latitude|longitude)/.test(adminOrdersPy));
  check("no payment/status field is ever touched by update_order()", !/order\.(status|payment_status|amount_paise) = /.test(adminOrdersPy));
  check("the edit BFF route itself is untouched by this task (still the same thin PUT pass-through)", editRoute.includes("/admin/api/order/") && editRoute.includes("X-Admin-Bridge-Key"));
}

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("==================================================");
if (failed > 0) process.exit(1);
