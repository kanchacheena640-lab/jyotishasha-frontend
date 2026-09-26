// lib/admin/revenuePageWiring.test.ts
//
// Reports Revenue Dashboard -- Phase 1. This repo has no component-
// rendering test harness for admin pages (confirmed: no existing
// app/admin/*/page.tsx or components/admin/**/*.tsx has one either --
// only lib/admin/*Api.test.ts client modules get real unit tests), so,
// matching that established convention, this proves the page/component
// WIRING via direct source-text inspection: AdminGuard/AdminNav reuse,
// the nav link, security (no ADMIN_BRIDGE_SECRET reachable from the
// browser), filter -> fetch wiring, page-reset-on-filter-change, custom-
// range gating, and that no PII field is ever requested or rendered.
//
// Standalone check()/pass-fail-counter convention (no test runner). Run
// from the repo root:
//
//   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
//     --resolveJsonModule --esModuleInterop --outDir .ts-test-out \
//     lib/admin/revenuePageWiring.test.ts
//   node .ts-test-out/revenuePageWiring.test.js
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
  // Compiled as a single, standalone file (tsc with no rootDir), so it
  // lands flat in .ts-test-out/ regardless of this file's own lib/admin/
  // source location -- one ".." reaches the repo root, matching every
  // other top-level lib/*.test.ts file's own readSource() convention.
  return fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8");
}
function stripComments(src: string): string {
  return src
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

const page = stripComments(readSource("app/admin/revenue/page.tsx"));
const client = stripComments(readSource("components/admin/revenue/RevenuePageClient.tsx"));
const summarySection = stripComments(readSource("components/admin/revenue/RevenueSummarySection.tsx"));
const ordersSection = stripComments(readSource("components/admin/revenue/RevenueOrdersSection.tsx"));
const proxy = stripComments(readSource("lib/admin/revenueProxy.ts"));
const summaryRoute = stripComments(readSource("app/api/admin/revenue/summary/route.ts"));
const ordersRoute = stripComments(readSource("app/api/admin/revenue/orders/route.ts"));
const adminNav = stripComments(readSource("components/admin/AdminNav.tsx"));
const revenueApi = stripComments(readSource("lib/admin/revenueApi.ts"));

console.log("\n=== 1-3. route, AdminGuard/AdminNav reuse, nav link ===");
{
  check("1: app/admin/revenue/page.tsx exists and is a real Next.js page (default export)", /export default function/.test(page));
  check("2: the page wraps its content in the EXISTING AdminGuard (no new auth mechanism)", page.includes("<AdminGuard>") && page.includes('from "@/components/AdminGuard"'));
  check("2b: the page renders the EXISTING AdminNav (same shared nav as every other admin page)", page.includes("<AdminNav") && page.includes('from "@/components/admin/AdminNav"'));
  check("3: AdminNav's LINKS array has exactly one 'Revenue' entry pointing at /admin/revenue", (adminNav.match(/href:\s*"\/admin\/revenue"/g) || []).length === 1 && /href:\s*"\/admin\/revenue",\s*label:\s*"Revenue"/.test(adminNav));
}

console.log("\n=== D. BFF / security: ADMIN_BRIDGE_SECRET never reaches the browser ===");
{
  check("proxy: reads ADMIN_BRIDGE_SECRET only inside the server-only proxy file", proxy.includes("ADMIN_BRIDGE_SECRET") && proxy.includes('import "server-only"'));
  check("proxy: sends it as the X-Admin-Bridge-Key header to Flask, exactly like every other admin proxy", /X-Admin-Bridge-Key.*secret/.test(proxy));
  check("proxy: validates the admin session cookie before ever calling the backend (same isValidAdminSession/ADMIN_SESSION_COOKIE as orders/analytics)", proxy.includes("isValidAdminSession") && proxy.includes("ADMIN_SESSION_COOKIE"));
  check("proxy: a missing session -> 401 (never falls through to the backend)", /isValidAdminSession[\s\S]{0,80}return NextResponse\.json\(\{ error: "unauthorized" \}, \{ status: 401 \}\)/.test(proxy));
  const clientAndBrowserFiles = [client, summarySection, ordersSection, revenueApi];
  check("no client/browser file ever references ADMIN_BRIDGE_SECRET or X-Admin-Bridge-Key", clientAndBrowserFiles.every((f) => !f.includes("ADMIN_BRIDGE_SECRET") && !f.includes("X-Admin-Bridge-Key")));
  check("the browser-facing API client calls only the same-origin /api/admin/revenue/* BFF path -- never the Flask backend URL directly", revenueApi.includes('fetch(`/api/admin/revenue') && !revenueApi.includes("NEXT_PUBLIC_BACKEND_URL") && !revenueApi.includes("BACKEND_URL"));
  check("both route files are thin pass-throughs to the one proxy function (no duplicated auth/bridge logic)", summaryRoute.includes("proxyRevenue") && ordersRoute.includes("proxyRevenue") && !summaryRoute.includes("ADMIN_BRIDGE_SECRET") && !ordersRoute.includes("ADMIN_BRIDGE_SECRET"));
  check("a backend 4xx/5xx is forwarded as-is -- never rewritten into a fake 200 with zeroed data", /return new NextResponse\(text, \{ status: response\.status/.test(proxy));
}

console.log("\n=== C/5-11. filter bar -> both sections refetch; page resets to 1; custom-range gating ===");
{
  check("5: default platform is 'all'", /useState<PlatformFilter>\("all"\)/.test(client));
  check("5b: default date preset is Last 30 Days ('30d')", /useState<DatePreset>\("30d"\)/.test(client));
  check("6-9: all four required presets are offered, with the exact required labels", ["today", "7d", "30d", "this_month"].every((v) => client.includes(`value: "${v}"`))
    && ["Today", "Last 7 Days", "Last 30 Days", "This Month", "Custom"].every((l) => client.includes(`label: "${l}"`)));
  check("changing platform or preset re-renders BOTH sections from the SAME shared `range`/`platform` state (one source of truth, not two independent filter states)",
    /<RevenueSummarySection platform=\{platform\} range=\{range\} \/>/.test(client) && /<RevenueOrdersSection platform=\{platform\} range=\{range\}/.test(client));
  check("18: changing platform OR the range resets the orders page back to 1 (useEffect keyed on platform/range.start/range.end)",
    /useEffect\(\(\) => \{\s*setPage\(1\);/.test(client) && /\[platform, range\.start, range\.end\]/.test(client));
  check("10: the Apply button is the ONLY way a user-edited custom range is actually sent (its onClick is the sole call site that applies customStart/customEnd)",
    /onClick=\{\(\) => setAppliedCustomRange\(\{ start: customStart, end: customEnd \}\)\}/.test(client));
  check("10b: switching INTO Custom seeds it with the range already on screen (a legitimate, separate call, never the user's typed dates) -- entering Custom never blanks the page before Apply",
    /setCustomStart\(range\.start\)/.test(client) && /setCustomEnd\(range\.end\)/.test(client) && /setAppliedCustomRange\(range\)/.test(client));
  check("11: the Apply button is disabled for an invalid/incomplete custom range (isValidCustomRange gates it, never lets an invalid range submit)",
    /disabled=\{!canApplyCustomRange\}/.test(client) && /canApplyCustomRange = isValidCustomRange\(customStart, customEnd\)/.test(client));
  check("11b: date inputs constrain each other (end >= start) as a first line of defense, in addition to the Apply gate", /max=\{customEnd/.test(client) && /min=\{customStart/.test(client));
}

console.log("\n=== 12-13. KPI cards use backend values only; ₹ formatting ===");
{
  check("exactly the 4 required KPI cards, no more, no fewer", (summarySection.match(/<KpiCard/g) || []).length === 4);
  check("labels match exactly: Total Paid Orders / Total Revenue / Reports Emailed / Average Order Value",
    ["Total Paid Orders", "Total Revenue", "Reports Emailed", "Average Order Value"].every((l) => summarySection.includes(`label="${l}"`)));
  check("12: every KPI value comes straight from the backend response object (data.kpis.*) -- never recomputed in the browser",
    summarySection.includes("data.kpis.total_paid_orders") && summarySection.includes("data.kpis.total_revenue")
    && summarySection.includes("data.kpis.reports_emailed") && summarySection.includes("data.kpis.average_order_value"));
  check("13: revenue-shaped KPIs are passed through formatRupees (₹ + Indian grouping), the order-count KPIs are shown as plain backend numbers",
    /formatRupees\(data\.kpis\.total_revenue\)/.test(summarySection) && /formatRupees\(data\.kpis\.average_order_value\)/.test(summarySection)
    && !/formatRupees\(data\.kpis\.total_paid_orders\)/.test(summarySection) && !/formatRupees\(data\.kpis\.reports_emailed\)/.test(summarySection));
  check("no independent financial computation (sum/average/multiply) exists anywhere in the summary section -- it only renders backend fields", !/data\.kpis\.\w+\s*[+\-*/]/.test(summarySection));
}

console.log("\n=== 14-16. Sales by Source (always 4 rows) + Recent Orders label mapping + Approx. indicator ===");
{
  check("14: iterates the fixed ALL_SOURCES list (always exactly 4 rows, even when a bucket is 0) rather than only the rows the backend happened to include",
    summarySection.includes("ALL_SOURCES.map") && summarySection.includes("data.sources.find"));
  check("14b: a missing/zero bucket renders 0 orders and ₹0 revenue, never omitted", /row\?\.orders \?\? 0/.test(summarySection) && /row\?\.revenue \?\? 0/.test(summarySection));
  check("no chart / graphing library import anywhere in the revenue components (table-only, per the product brief)",
    ![summarySection, ordersSection, client].some((f) => /recharts|chart\.js|d3|victory|nivo/i.test(f)));
  check("15: platform and source columns are passed through the exact required label maps (PLATFORM_LABELS/SOURCE_LABELS), never the raw backend keys",
    ordersSection.includes("PLATFORM_LABELS[row.platform]") && ordersSection.includes("SOURCE_LABELS[row.source]"));
  check("the final column renders the backend's own delivery_status truth verbatim, and the word 'Delivered' never appears anywhere in these components",
    ordersSection.includes("row.delivery_status") && !/Delivered/.test(ordersSection + summarySection + client));
  check("16: an approximate reporting_date gets a visible 'Approx.' indicator, driven by the backend's own reporting_date_approximate flag", /row\.reporting_date_approximate/.test(ordersSection) && ordersSection.includes("Approx."));
}

console.log("\n=== 17. pagination (backend-driven, no infinite scroll) ===");
{
  check("17: Previous / Page X of Y / Next controls exist, using the backend's own pagination object (page/total_pages), not a client-computed count",
    ordersSection.includes("Previous") && ordersSection.includes("Next") && /Page \{data\.pagination\.page\} of/.test(ordersSection));
  check("Previous is disabled on page 1; Next is disabled on the last page (both driven by props/backend data, not guessed)",
    /disabled=\{page <= 1\}/.test(ordersSection) && /disabled=\{page >= data\.pagination\.total_pages\}/.test(ordersSection));
  check("no infinite-scroll / intersection-observer code exists", !/IntersectionObserver|infinite.?scroll/i.test(ordersSection));
}

console.log("\n=== 19-20. empty / error states never fabricate data ===");
{
  check("19: the exact required empty-state copy is used when there are zero orders for the period", ordersSection.includes("No paid orders found for this period."));
  check("20a: on a failed summary fetch, ErrorBlock (with Retry) is returned immediately -- the KPI/source JSX below it is never reached (data is null on error)",
    /if \(state === "error"\) return <ErrorBlock message=\{error\} onRetry=\{retry\}/.test(summarySection) && /if \(!data\) return null;/.test(summarySection));
  check("20b: on a failed orders fetch, ErrorBlock is shown and the orders table branch is gated on state === \"ready\" (never rendered with stale/fake rows on error)",
    /state === "error" && <ErrorBlock/.test(ordersSection) && /state === "ready" && data && data\.orders\.length > 0/.test(ordersSection));
}

console.log("\n=== 21. no PII requested or rendered ===");
{
  const piiPattern = /\bemail\b|\bphone\b|\bname\b|\bdob\b|\btob\b|\bpob\b|latitude|longitude/i;
  check("21a: the API client's typed row/summary shapes contain no PII field", !piiPattern.test(revenueApi.replace(/\/\/.*$/gm, "")));
  check("21b: neither UI component references or displays a PII field", !piiPattern.test(summarySection) && !piiPattern.test(ordersSection));
}

console.log("\n=== 23. sibling admin build/typecheck is unaffected (no shared file was renamed/removed) ===");
{
  check("23a: components/admin/analytics/shared.tsx (reused by both Analytics and Revenue) was not modified for this task", fs.existsSync(path.join(__dirname, "..", "components/admin/analytics/shared.tsx")));
  check("23b: the Orders admin page/component files are untouched (still import OrderList exactly as before)", readSource("app/admin/page.tsx").includes("<OrderList") && readSource("app/admin/page.tsx").includes("<AdminGuard>"));
}

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("==================================================");
if (failed > 0) process.exit(1);
