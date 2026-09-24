// lib/originalReportsMeasurement.test.ts

/**
 * Reports Ads P0.2A -- the original 25 paid reports (24 standard at 51 +
 * relationship_future_report at 199) now use the SAME commerce measurement as
 * the 63 focused reports, giving 88 / 88 paid web reports measured.
 *
 * Proves, from the real catalog data and real source: the four approved
 * family / report-type combinations, funnel events for all 88 products, the
 * checkout / form wiring (attribution, view_item, ref-guarded begin_checkout,
 * purchase only after the backend-verified 2xx), GTM loads exactly once across
 * both route trees with the existing consent ordering, no PII, EN/HI paths.
 * The backend half (PAID-only canonical object for all 88 registry products,
 * INR 51 / 199, unpaid / failed never measured) is proven in the backend
 * repo's test_reports_ads_p02a_original_reports_measurement.py.
 *
 * Standalone check()/pass-fail-counter convention. Run from the repo root:
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out \
 *     lib/originalReportsMeasurement.test.ts
 *   node .ts-test-out/lib/originalReportsMeasurement.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */

import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { getFocusedReportConfigBySlug, listFocusedReportHumanSlugs } from "../app/data/focusedReportsConfig";
import { getIntentQuestion } from "../app/data/intentCatalog";
import {
  ORIGINAL_PRODUCT_FAMILY,
  FOCUSED_PRODUCT_FAMILY,
  buildBeginCheckoutEvent,
  buildPurchaseEvent,
  buildViewItemEvent,
  parsePurchaseMeasurement,
  pushPurchaseOnce,
  resetMeasuredMemoryForTest,
  type MeasuredStorageLike,
} from "./ecommerceMeasurement";

let passed = 0;
let failed = 0;

function check(label: string, condition: boolean) {
  if (condition) { passed += 1; console.log(`  PASS: ${label}`); }
  else { failed += 1; console.log(`  FAIL: ${label}`); }
}

function repoRoot(): string {
  // works both from lib/ (ts-node style) and from the compiled .ts-test-out/lib/ output
  let dir = __dirname;
  for (let i = 0; i < 4; i++) {
    if (fs.existsSync(path.join(dir, "package.json"))) return dir;
    dir = path.join(dir, "..");
  }
  throw new Error("repo root not found");
}
const ROOT = repoRoot();
const readSource = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");
function stripComments(src: string): string {
  return src
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

class MemStorage implements MeasuredStorageLike {
  data: Record<string, string> = {};
  getItem(k: string) { return k in this.data ? this.data[k] : null; }
  setItem(k: string, v: string) { this.data[k] = v; }
  removeItem(k: string) { delete this.data[k]; }
}
class FakeDataLayer {
  entries: any[] = [];
  push(v: unknown) { this.entries.push(v); }
  events(n: string) { return this.entries.filter((e) => e && e.event === n); }
}

// The backend's trusted ORIGINAL_REPORT_CATEGORIES (modules/payments/purchase_measurement.py),
// frozen here. The backend test proves its table equals exactly the 25 registry products; this test
// proves the FRONTEND catalog categories equal it, so funnel events and purchases agree.
const BACKEND_CATEGORIES: Record<string, string> = {
  sadhesati_report: "transit", jupiter_transit_report: "transit", saturn_transit_report: "transit",
  financial_report: "finance", financial_stability_report: "finance", startup_suggestion_report: "finance", property_report: "finance",
  love_relationship_report: "love", love_disappointment_report: "love", relationship_future_report: "love",
  marriage_report: "marriage", love_marriage_report: "marriage", delay_in_marriage_report: "marriage", problem_in_marriage_report: "marriage", second_marriage_report: "marriage",
  government_job_report: "self", foreign_travel_report: "self", business_report: "self", career_report: "self", gemstone_consultation: "self",
  children_parenting_report: "self", lifestyle_analysis_report: "self", mood_mental_health_report: "self", divorce_possibility_report: "self", legal_disputes_report: "self",
};
const RELATIONSHIP = "relationship_future_report";
const GA4_ITEM_KEYS = ["item_id", "item_category", "price", "quantity", "item_name"];

function funnelInputFor(report: (typeof reportsData)[number]) {
  return {
    questionKey: report.slug, itemName: report.title.en, category: report.category.en.toLowerCase(), price: report.price,
    reportType: (report.slug === RELATIONSHIP ? "relationship" : "standard") as "relationship" | "standard", productFamily: ORIGINAL_PRODUCT_FAMILY,
  };
}

async function main() {
  console.log("\n=== 1. approved naming and the 25 original products ===");
  {
    check("1a: the catalog holds exactly 25 original products (24 standard + relationship_future_report)",
      reportsData.length === 25 && reportsData.filter((r) => r.slug !== RELATIONSHIP).length === 24 && reportsData.some((r) => r.slug === RELATIONSHIP));
    check("1b: prices -- 24 standard at 51, relationship_future_report at 199", reportsData.every((r) => (r.slug === RELATIONSHIP ? r.price === 199 : r.price === 51)));
    check("1c: approved families -- focused_report vs original_report", FOCUSED_PRODUCT_FAMILY === "focused_report" && ORIGINAL_PRODUCT_FAMILY === "original_report");
    check("1d: catalog slugs equal the backend's 25 mapped products exactly", new Set(reportsData.map((r) => r.slug)).size === 25 && reportsData.every((r) => r.slug in BACKEND_CATEGORIES) && Object.keys(BACKEND_CATEGORIES).length === 25);
    check("1e: frontend category (lower-cased catalog category.en) == the backend trusted category for ALL 25 (funnel and purchase agree)",
      reportsData.every((r) => r.category.en.toLowerCase() === BACKEND_CATEGORIES[r.slug]));
    check("1f: every category is from the approved vocabulary; none is the 'other' fallback",
      Object.values(BACKEND_CATEGORIES).every((c) => ["transit", "finance", "love", "marriage", "self"].includes(c)));

    // optional cross-check against the sibling backend checkout when present (never required)
    const sibling = path.join(ROOT, "..", "Jyotishasha_Backend", "modules", "payments", "purchase_measurement.py");
    if (fs.existsSync(sibling)) {
      const src = fs.readFileSync(sibling, "utf8");
      const block = src.slice(src.indexOf("ORIGINAL_REPORT_CATEGORIES = {"), src.indexOf("UNMAPPED_ORIGINAL_CATEGORY"));
      const pairs = [...block.matchAll(/"([a-z_]+)":\s*"([a-z]+)"/g)].map((m) => [m[1], m[2]] as const);
      check("1g: the sibling backend's ORIGINAL_REPORT_CATEGORIES equals this test's frozen table", pairs.length === 25 && pairs.every(([k, v]) => BACKEND_CATEGORIES[k] === v));
    } else {
      console.log("  SKIP: 1g sibling backend checkout not present (backend test covers its own table)");
    }
  }

  console.log("\n=== 2. funnel events for all 25 originals (view_item + begin_checkout) ===");
  {
    let ok = 0;
    for (const r of reportsData) {
      const input = funnelInputFor(r);
      const v = buildViewItemEvent(input) as any; const b = buildBeginCheckoutEvent(input) as any;
      const item = v.ecommerce.items[0];
      const good =
        v.event === "view_item" && b.event === "begin_checkout" && v.product_family === "original_report" && b.product_family === "original_report"
        && v.report_type === (r.slug === RELATIONSHIP ? "relationship" : "standard") && b.report_type === v.report_type
        && v.ecommerce.currency === "INR" && v.ecommerce.value === r.price && item.price === r.price && item.quantity === 1
        && item.item_id === r.slug && item.item_name === r.title.en && item.item_category === BACKEND_CATEGORIES[r.slug]
        && Object.keys(item).every((k) => GA4_ITEM_KEYS.includes(k)) && !("transaction_id" in v.ecommerce)
        && JSON.stringify(v.ecommerce) === JSON.stringify(b.ecommerce);
      if (good) ok += 1;
    }
    check("2a: all 25 originals produce correct GA4 view_item and begin_checkout (51 for 24, 199 for relationship, INR, English title, mapped category)", ok === 25);
    const rel = buildViewItemEvent(funnelInputFor(reportsData.find((r) => r.slug === RELATIONSHIP)!)) as any;
    check("2b: relationship_future_report -> original_report / relationship, value 199", rel.product_family === "original_report" && rel.report_type === "relationship" && rel.ecommerce.value === 199);
    const std = buildViewItemEvent(funnelInputFor(reportsData.find((r) => r.slug === "career_report")!)) as any;
    check("2c: a standard report -> original_report / standard, value 51", std.product_family === "original_report" && std.report_type === "standard" && std.ecommerce.value === 51);
    check("2d: catalog EN/HI -- every original has non-empty Hindi AND English title/category (the funnel item_name uses the English title in both languages)",
      reportsData.every((r) => r.title.en && r.title.hi && r.category.en && r.category.hi));
  }

  console.log("\n=== 3. the 63 focused reports are unchanged ===");
  {
    const slugs = listFocusedReportHumanSlugs();
    check("3a: 63 focused reports still routable", slugs.length === 63);
    let self = 0; let dual = 0; let good = 0;
    for (const slug of slugs) {
      const cfg = getFocusedReportConfigBySlug(slug)!;
      const mode = getIntentQuestion(cfg.questionKey)!.personMode;
      const reportType = mode === "dual" ? "dual" : "self";
      if (reportType === "self") self += 1; else dual += 1;
      // exactly what the focused checkouts pass (no productFamily -> the focused default)
      const v = buildViewItemEvent({ questionKey: cfg.questionKey, itemName: cfg.title.en, category: cfg.category, price: cfg.priceRupees, reportType }) as any;
      if (v.product_family === "focused_report" && v.report_type === reportType && v.ecommerce.value === 51 && v.ecommerce.items[0].item_id === cfg.questionKey) good += 1;
    }
    check("3b: 54 SELF + 9 DUAL, every one still emits family focused_report with its own report type and value 51", self === 54 && dual === 9 && good === 63);
    const selfSrc = stripComments(readSource("components/focused-reports/FocusedReportCheckout.tsx"));
    const dualSrc = stripComments(readSource("components/focused-reports/FocusedDualReportCheckout.tsx"));
    check("3c: the focused checkouts never pass a productFamily override and keep reportType self / dual",
      !selfSrc.includes("productFamily") && !dualSrc.includes("productFamily") && /reportType: "self"/.test(selfSrc) && /reportType: "dual"/.test(dualSrc));
    check("3d: focused checkout wiring for the purchase is untouched (2 tracked calls after the non-2xx guard in SELF)",
      (selfSrc.match(/trackBackendVerifiedPurchase\(/g) || []).length === 2 && selfSrc.indexOf("if (!webhookRes.ok)") < selfSrc.indexOf("trackBackendVerifiedPurchase("));
  }

  console.log("\n=== 4. FINAL COVERAGE: 88 / 88 ===");
  {
    const ids = new Set<string>();
    listFocusedReportHumanSlugs().forEach((s) => ids.add(getFocusedReportConfigBySlug(s)!.questionKey));
    reportsData.forEach((r) => ids.add(r.slug));
    let measurable = 0;
    for (const id of ids) {
      const original = reportsData.find((r) => r.slug === id);
      const family = original ? "original_report" : "focused_report";
      const reportType = original ? (id === RELATIONSHIP ? "relationship" : "standard") : (getIntentQuestion(id)!.personMode === "dual" ? "dual" : "self");
      const value = original ? original.price : 51;
      const category = original ? BACKEND_CATEGORIES[id] : getIntentQuestion(id)!.category;
      const measurement = { transaction_id: "ord_1", value, currency: "INR", item_id: id, item_name: "Report", item_category: category, product_family: family, report_type: reportType, payment_provider: "RAZORPAY", source_platform: "web" };
      const parsed = parsePurchaseMeasurement(measurement);
      const dl = new FakeDataLayer();
      resetMeasuredMemoryForTest();
      const fired = parsed !== null && pushPurchaseOnce(measurement, { storage: new MemStorage(), dataLayer: dl, waitForTags: true });
      const purchase = dl.events("purchase")[0];
      if (fired && purchase && purchase.ecommerce.value === value && purchase.ecommerce.items[0].item_id === id && purchase.product_family === family && purchase.report_type === reportType) measurable += 1;
    }
    resetMeasuredMemoryForTest();
    console.log(`  COVERAGE (frontend): ${measurable}/${ids.size} products have a valid parse -> GA4 purchase event path (54 SELF + 9 DUAL + 24 standard + 1 relationship)`);
    check("4a: 63 focused + 25 original = 88 distinct products, all with a valid purchase-event path", ids.size === 88 && measurable === 88);
    check("4b: canonical values -- purchases parse for 51 (87 products) and 199 (relationship_future_report), currency INR",
      parsePurchaseMeasurement({ transaction_id: "ord_9", value: 199, currency: "INR", item_id: RELATIONSHIP, item_name: "Relationship Future Report", item_category: "love", product_family: "original_report", report_type: "relationship", payment_provider: "RAZORPAY", source_platform: "web" })?.value === 199);
    const dl = new FakeDataLayer(); resetMeasuredMemoryForTest();
    pushPurchaseOnce({ transaction_id: "ord_77", value: 199, currency: "INR", item_id: RELATIONSHIP, item_name: "Relationship Future Report", item_category: "love", product_family: "original_report", report_type: "relationship", payment_provider: "RAZORPAY", source_platform: "web", email: "a@b.com", name: "Asha", dob: "1994-01-26", gclid: "G1" }, { storage: new MemStorage(), dataLayer: dl, waitForTags: true });
    const blob = JSON.stringify(dl.entries);
    check("4c: the relationship purchase event is correct and carries NO PII / click ids", dl.events("purchase").length === 1 && (dl.events("purchase")[0].ecommerce.value === 199) && !/a@b\.com|Asha|1994-01-26|G1|email|gclid/.test(blob));
    const std = buildPurchaseEvent(parsePurchaseMeasurement({ transaction_id: "ord_78", value: 51, currency: "INR", item_id: "career_report", item_name: "Career Report", item_category: "self", product_family: "original_report", report_type: "standard", payment_provider: "RAZORPAY", source_platform: "web" })!) as any;
    check("4d: a standard purchase event is INR 51 with original_report / standard", std.ecommerce.value === 51 && std.ecommerce.currency === "INR" && std.product_family === "original_report" && std.report_type === "standard");
    resetMeasuredMemoryForTest();
    const s2 = new MemStorage(); const d2 = new FakeDataLayer();
    const a = pushPurchaseOnce({ transaction_id: "ord_5", value: 51, currency: "INR", item_id: "career_report", item_category: "self", product_family: "original_report", report_type: "standard", payment_provider: "RAZORPAY", source_platform: "web" }, { storage: s2, dataLayer: d2, waitForTags: true });
    const b = pushPurchaseOnce({ transaction_id: "ord_5", value: 51, currency: "INR", item_id: "career_report", item_category: "self", product_family: "original_report", report_type: "standard", payment_provider: "RAZORPAY", source_platform: "web" }, { storage: s2, dataLayer: d2, waitForTags: true });
    check("4e: original purchases use the same once-per-transaction dedupe (duplicate callback -> one event)", a === true && b === false && d2.events("purchase").length === 1);
    resetMeasuredMemoryForTest();
  }

  console.log("\n=== 5. original standard ReportCheckout wiring ===");
  {
    const raw = readSource("components/reports/ReportCheckout.tsx");
    const src = stripComments(raw);
    check("5a: attribution -- imports the P0.1 snapshot builder and sends it as optional 'attribution' next to the unchanged campaign_context",
      src.includes('from "@/lib/adAttribution"') && src.includes("getBrowserOrderAttribution()")
      && src.includes("...(orderAttribution ? { attribution: orderAttribution } : {})") && src.includes("...(campaignContext ? { campaign_context: campaignContext } : {})"));
    check("5b: attribution is built once at order creation and NOT resent at /webhook", !/\/webhook[\s\S]{0,700}?\}\)/.exec(src)?.[0].includes("attribution"));
    check("5c: view_item -- once per mount, ref-guarded, from a mount effect",
      /viewItemSentRef\.current\) return;\s*viewItemSentRef\.current = true;\s*pushViewItem\(funnelItem\)/.test(src) && (src.match(/pushViewItem\(/g) || []).length === 1);
    check("5d: begin_checkout -- ref-guarded, exactly one call, AFTER the SDK check and BEFORE the order-creation request",
      /!beginCheckoutSentRef\.current\) \{\s*beginCheckoutSentRef\.current = true;\s*pushBeginCheckout\(funnelItem\)/.test(src) && (src.match(/pushBeginCheckout\(/g) || []).length === 1
      && src.indexOf("Failed to load Razorpay SDK") < src.indexOf("pushBeginCheckout(funnelItem)") && src.indexOf("pushBeginCheckout(funnelItem)") < src.indexOf("/api/razorpay-order"));
    const okIdx = src.indexOf("if (!webhookRes.ok)");
    const calls = [...src.matchAll(/trackBackendVerifiedPurchase\(/g)].map((m) => m.index as number);
    check("5e: purchase -- exactly 2 tracked calls (delayed + success), both AFTER the non-2xx guard; never at handler entry",
      okIdx > 0 && calls.length === 2 && calls.every((i) => i > okIdx)
      && !/handler: async function \(response: any\) \{\s*paymentConfirmedRef\.current = true;\s*setIsProcessing\(true\);\s*trackBackend/.test(src));
    check("5f: the purchase object is taken from the backend response (webhookData.purchase_measurement) -- never built from price / reportsData",
      (src.match(/webhookData\?\.purchase_measurement/g) || []).length === 2 && !/trackBackendVerifiedPurchase\([^)]*(price|currentReport|51|199)/.test(src));
    check("5g: delayed-success handling and thank-you navigation preserved (delayed shows the support screen; success navigates inside onDone)",
      /payment_confirmed_processing_delayed"\) \{\s*\/\/[\s\S]*?trackBackendVerifiedPurchase\(webhookData\?\.purchase_measurement\);\s*setFulfillmentIssue\(\{[\s\S]*?kind: "processing_delayed"/.test(raw.replace(/\r\n/g, "\n"))
      && /trackBackendVerifiedPurchase\(webhookData\?\.purchase_measurement, \(\) => \{\s*window\.location\.href = `\/\$\{currentLang\}\/thank-you`;/.test(src));
    check("5h: catalog funnel item -- slug id, English title, lower-cased category, standard / original_report; no PII source",
      /questionKey: currentReport\.slug, itemName: currentReport\.title\.en, category: currentReport\.category\.en\.toLowerCase\(\)/.test(src)
      && /reportType: "standard", productFamily: ORIGINAL_PRODUCT_FAMILY/.test(src));
    check("5i: no raw dataLayer / gtag / fbq / pixel code in the checkout (measurement only through lib/ecommerceMeasurement)", !/dataLayer|gtag\(|fbq\(|connect\.facebook/.test(src));
  }

  console.log("\n=== 6. relationship_future_report form ===");
  {
    const raw = readSource("app/[locale]/love/report/relationship_future_report/RelationshipFutureReportForm.tsx");
    const src = stripComments(raw);
    const hook = stripComments(readSource("hooks/useReportPurchase.ts"));
    check("6a: view_item -- ref-guarded mount effect declared BEFORE the early `return null` (stable hook order), exactly one call",
      /viewItemSentRef\.current = true;\s*pushViewItem\(funnelItem\)/.test(src) && (src.match(/pushViewItem\(/g) || []).length === 1
      && src.indexOf("pushViewItem(funnelItem)") < src.indexOf("if (!mounted) return null;"));
    check("6b: begin_checkout -- ref-guarded, one call, after email + both-place validation and before purchase()",
      /!beginCheckoutSentRef\.current\) \{\s*beginCheckoutSentRef\.current = true;\s*pushBeginCheckout\(funnelItem\)/.test(src) && (src.match(/pushBeginCheckout\(/g) || []).length === 1
      && src.indexOf("relationshipPlaceError(form.boy, form.girl, isHi)") < src.indexOf("pushBeginCheckout(funnelItem)") && src.indexOf("pushBeginCheckout(funnelItem)") < src.indexOf("await purchase("));
    check("6c: purchase handling is NOT duplicated in the form -- it stays inside the shared hook (2 tracked calls, after the non-2xx guard)",
      !src.includes("trackBackendVerifiedPurchase") && (hook.match(/trackBackendVerifiedPurchase\(/g) || []).length === 2 && hook.indexOf("if (!webhookRes.ok)") < hook.indexOf("trackBackendVerifiedPurchase("));
    check("6d: the P0.1 attribution path is unchanged (still via the hook)", hook.includes("attribution: orderAttribution") && src.includes('productSlug: "relationship_future_report"'));
    check("6e: catalog item -- relationship / original_report, value from the catalog entry (199), English title, lower-cased category",
      /reportType: "relationship", productFamily: ORIGINAL_PRODUCT_FAMILY/.test(src) && /catalogEntry\.title\.en/.test(src) && /catalogEntry\.category\.en\.toLowerCase\(\)/.test(src)
      && reportsData.find((r) => r.slug === RELATIONSHIP)!.price === 199);
    check("6f: EN / HI -- the form is locale-driven (thank-you redirect uses the locale) and both language pages exist under [locale]",
      raw.includes("redirectTo: `/${locale}/thank-you`") && fs.existsSync(path.join(ROOT, "app/[locale]/love/report/relationship_future_report/page.tsx")));
    check("6g: /reports/relationship_future_report stays a plain client redirect (no analytics there; view_item fires on the locale page)",
      stripComments(readSource("components/reports/RelationshipReportRedirect.tsx")).indexOf("pushViewItem") === -1 && readSource("app/reports/[slug]/page.tsx").includes("RelationshipReportRedirect"));
  }

  console.log("\n=== 7. GTM loads exactly once (existing container, existing consent ordering) ===");
  {
    const reportsLayout = readSource("app/reports/layout.tsx");
    const localeLayout = readSource("app/[locale]/layout.tsx");
    const rootLayout = readSource("app/layout.tsx");
    const rl = stripComments(reportsLayout);
    check("7a: the /reports layout loads the EXISTING container GTM-WLP7T2DP and no other GTM container id",
      rl.includes("GTM-WLP7T2DP") && (rl.match(/GTM-[A-Z0-9]+/g) || []).every((id) => id === "GTM-WLP7T2DP"));
    check("7b: same Script id as the [locale] layout ('gtm-script') so Next.js runs it once per document across both trees; afterInteractive like the locale tree",
      /id="gtm-script"/.test(reportsLayout) && /id="gtm-script"/.test(localeLayout) && /strategy="afterInteractive"/.test(reportsLayout) && (reportsLayout.match(/<Script\b/g) || []).length === 1);
    check("7c: the snippet self-checks for an already-injected gtm.js tag for this container before loading (no double load)",
      /if \(d\.querySelector\('script\[src\*="googletagmanager\.com\/gtm\.js\?id='\+i\+'"\]'\)\) return;/.test(reportsLayout));
    check("7d: consent ordering unchanged -- the root layout still owns the beforeInteractive consent-default script and loads no gtm.js itself",
      /id="consent-default"/.test(rootLayout) && /strategy="beforeInteractive"/.test(rootLayout) && !rootLayout.includes("gtm.js") && !stripComments(reportsLayout).includes("consent"));
    function walk(dir: string, out: string[] = []): string[] {
      for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
        const rel = `${dir}/${e.name}`;
        if (e.isDirectory()) { if (e.name !== "node_modules" && !e.name.startsWith(".")) walk(rel, out); }
        else if (/\.(tsx|ts)$/.test(e.name)) out.push(rel);
      }
      return out;
    }
    const loaders = [...walk("app"), ...walk("components")].filter((f) => stripComments(readSource(f)).includes("googletagmanager.com/gtm.js"));
    check("7e: exactly TWO gtm.js loaders exist in the whole app -- the [locale] layout and the /reports layout (separate trees, never both rendered)",
      loaders.length === 2 && loaders.includes("app/[locale]/layout.tsx") && loaders.includes("app/reports/layout.tsx"));
    check("7f: the [locale] GTM loader is byte-for-byte the original (no regression to the focused / relationship pages)",
      localeLayout.includes("j.src='https://www.googletagmanager.com/gtm.js?id=GTM-WLP7T2DP'+dl;") && localeLayout.includes("(window,document,'script','dataLayer','GTM-WLP7T2DP')"));
  }

  console.log("\n=== 8. privacy / scope ===");
  {
    const files = ["components/reports/ReportCheckout.tsx", "app/[locale]/love/report/relationship_future_report/RelationshipFutureReportForm.tsx", "lib/ecommerceMeasurement.ts"];
    check("8a: no Meta / pixel / gtag code was added by P0.2A", files.every((f) => !/fbq\(|gtag\(|connect\.facebook|Meta ?Pixel/i.test(stripComments(readSource(f)))));
    const lib = stripComments(readSource("lib/ecommerceMeasurement.ts"));
    check("8b: ecommerceMeasurement still imports nothing from consent and adds no second consent system", !/from "\.\/consent"|ConsentContext|useConsent/.test(lib));
    const item = buildViewItemEvent(funnelInputFor(reportsData[0]));
    check("8c: funnel events carry no PII keys", !/email|phone|dob|latitude|longitude|pob|partner/i.test(JSON.stringify(item).replace(/item_name/g, "")));
    check("8d: Google Play, server-side GA4 and P1 ledger work are untouched (no server / play code in the measurement module)", !/measurement protocol|google.?play|api\/collect/i.test(lib));
  }

  console.log("\n==================================================");
  console.log(`RESULT: ${passed} passed, ${failed} failed`);
  console.log("==================================================");
  if (failed > 0) process.exit(1);
}

main();
