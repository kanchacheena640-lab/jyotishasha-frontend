/**
 * P0 broken-link fixes: transit house-page CTAs, the Ketu ascendant CTA, and the app-download CTAs on the
 * daily-horoscope sign pages and the blogs hub. Same house style as lib/reportSamples.test.ts: a standalone
 * Node/TS script with pure-data assertions, targeted source scans, and the real AppDownloadLink executed in an
 * isolated context.
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule --esModuleInterop \
 *     --jsx react-jsx --outDir .ts-test-out lib/transitCtaLinks.test.ts
 *   node .ts-test-out/lib/transitCtaLinks.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */
/* eslint-disable @typescript-eslint/no-explicit-any -- test helpers walk untyped React element trees */
import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";
import * as ts from "typescript";
import {
  sunConfig, moonConfig, marsConfig, mercuryConfig, jupiterConfig, venusConfig, saturnConfig, rahuConfig, ketuConfig,
  type HousePlanetConfig,
} from "./transit/planetConfig";
import { reportsData } from "../app/data/reportsData";
import { buildAppDownloadPlayStoreUrl } from "./playStoreAttribution";
import { buildAppDownloadCtaLocation } from "./websiteEvents";

const repo = process.cwd();
let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}
const read = (file: string) => fs.readFileSync(path.join(repo, file), "utf8");
function walkFiles(dir: string): string[] {
  return fs.readdirSync(path.join(repo, dir), { withFileTypes: true }).flatMap((e) => {
    const rel = `${dir}/${e.name}`;
    return e.isDirectory() ? walkFiles(rel) : /\.(tsx?|jsx?)$/.test(e.name) ? [rel] : [];
  });
}

const PLAY_STORE_BASE = "https://play.google.com/store/apps/details?id=com.jyotishasha.app";
const PLANETS = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "rahu", "ketu"];
const CONFIGS: Record<string, HousePlanetConfig> = {
  sun: sunConfig, moon: moonConfig, mars: marsConfig, mercury: mercuryConfig, jupiter: jupiterConfig,
  venus: venusConfig, saturn: saturnConfig, rahu: rahuConfig, ketu: ketuConfig,
};
const TRANSIT_FILES = [
  ...walkFiles("components/transit"),
  ...walkFiles("lib/transit"),
  ...PLANETS.flatMap((p) => walkFiles(`app/[locale]/${p}-transit`)),
];
const HOUSE_TEMPLATE = "components/transit/HouseTransitPage.tsx";
const HOROSCOPE_SIGN_PAGE = "app/[locale]/daily-horoscope/[sign]/page.tsx";
const BLOGS_PAGE = "app/[locale]/blogs/page.tsx";
const APP_LINK = "components/AppDownloadLink.tsx";

console.log("\n=== A. no remaining broken routes ===");
check(`no transit file references /personalized-transit-report (${TRANSIT_FILES.length} files scanned)`, () => {
  const hits = TRANSIT_FILES.filter((f) => read(f).includes("personalized-transit-report"));
  assert.deepEqual(hits, []);
});
check("no /app-download in transit, daily-horoscope sign page or blogs page", () => {
  const hits = [...TRANSIT_FILES, HOROSCOPE_SIGN_PAGE, BLOGS_PAGE].filter((f) => read(f).includes("app-download"));
  assert.deepEqual(hits, []);
});

console.log("\n=== B. primary CTA: only an existing, matching paid report ===");
const REPORT_SLUGS = new Set(reportsData.map((r) => r.slug));
check("Saturn primary CTA -> /reports/saturn_transit_report (an existing report)", () => {
  assert.equal(saturnConfig.ctaBtnPrimaryHref, "/reports/saturn_transit_report");
  assert.ok(REPORT_SLUGS.has("saturn_transit_report"));
});
check("Jupiter primary CTA -> /reports/jupiter_transit_report (an existing report)", () => {
  assert.equal(jupiterConfig.ctaBtnPrimaryHref, "/reports/jupiter_transit_report");
  assert.ok(REPORT_SLUGS.has("jupiter_transit_report"));
});
check("the other 7 planets have NO primary CTA target (no matching product -> no button, no substitute)", () => {
  for (const p of ["sun", "moon", "mars", "mercury", "venus", "rahu", "ketu"]) {
    assert.equal(CONFIGS[p].ctaBtnPrimaryHref, undefined, p);
  }
});
check("existing primary CTA labels are unchanged", () => {
  assert.equal(saturnConfig.ctaBtnPrimaryEn, "Get My Karmic Audit Report →");
  assert.equal(jupiterConfig.ctaBtnPrimaryEn, "Get My Fortune Report →");
});
check("house template renders the primary button only when ctaBtnPrimaryHref is set, using it verbatim (no locale prefix, no query)", () => {
  const src = read(HOUSE_TEMPLATE);
  assert.ok(/\{config\.ctaBtnPrimaryHref && \(\s*<Link href=\{config\.ctaBtnPrimaryHref\}/.test(src));
  assert.ok(!/\?planet=/.test(src));
});

console.log("\n=== C. secondary CTA ===");
check("8 planets use the app (Play Store) secondary CTA; Jupiter keeps its methodology link", () => {
  for (const p of PLANETS.filter((x) => x !== "jupiter")) assert.equal(CONFIGS[p].ctaBtnSecondaryHref, "app", p);
  const jupiter = jupiterConfig.ctaBtnSecondaryHref;
  assert.equal(typeof jupiter, "function");
  if (typeof jupiter === "function") {
    assert.equal(jupiter(false), "/astrology-methodology");
    assert.equal(jupiter(true), "/hi/astrology-methodology");
  }
});
check("existing secondary labels are unchanged (e.g. Ketu 'Get Daily Transit Alerts')", () => {
  assert.equal(ketuConfig.ctaBtnSecondaryEn, "Get Daily Transit Alerts");
  assert.equal(saturnConfig.ctaBtnSecondaryEn, "Daily Shani Remedies");
});
check("house template routes the 'app' secondary CTA through AppDownloadLink with transit attribution", () => {
  const src = read(HOUSE_TEMPLATE);
  assert.ok(src.includes('config.ctaBtnSecondaryHref === "app" ? ('));
  assert.ok(/<AppDownloadLink\s+utm=\{\{ source: "transit_house", medium: "secondary_cta", campaign: config\.slug \}\}/.test(src));
});

console.log("\n=== D. Ketu ascendant page ===");
check("the broken 'Unlock Your Karma Map' CTA is removed from the Ketu ascendant page", () => {
  const src = read("app/[locale]/ketu-transit/[ascendant]/page.tsx");
  assert.ok(!src.includes("Unlock Your Karma Map") && !src.includes("कर्म नक्शा खोलें"));
});

console.log("\n=== E. app CTAs on the daily-horoscope sign page and blogs hub ===");
for (const [file, source, medium] of [
  [HOROSCOPE_SIGN_PAGE, "daily_horoscope", "sidebar_cta"],
  [BLOGS_PAGE, "blogs_hub", "final_cta"],
] as const) {
  check(`${file}: app CTA uses AppDownloadLink (utm ${source}/${medium}), labels unchanged`, () => {
    const src = read(file);
    assert.ok(src.includes('import AppDownloadLink from "@/components/AppDownloadLink"'));
    assert.ok(src.includes(`utm={{ source: "${source}", medium: "${medium}"`));
  });
}
check("labels preserved on both pages", () => {
  assert.ok(read(HOROSCOPE_SIGN_PAGE).includes('{isHi ? "📱 ऐप डाउनलोड करें" : "📱 Download App"}'));
  assert.ok(read(BLOGS_PAGE).includes('{isHi ? "अभी डाउनलोड करें" : "Download App Now"}'));
});

console.log("\n=== F. AppDownloadLink: canonical Play Store mechanism + app_download_intent (executed) ===");
function loadAppDownloadLink(events: any[]) {
  const code = ts.transpileModule(read(APP_LINK), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports: Record<string, any> = {};
  const deps: Record<string, unknown> = {
    "react/jsx-runtime": { jsx: (type: any, props: any) => ({ type, props }), jsxs: (type: any, props: any) => ({ type, props }) },
    "@/lib/websiteEvents": {
      buildAppDownloadCtaLocation, // the REAL helper
      WebsiteEvents: { appDownloadIntent: (loc: string) => events.push(["app_download_intent", loc]) },
    },
    "@/lib/playStoreAttribution": { buildAppDownloadPlayStoreUrl }, // the REAL helper
    "@/lib/marketingMeasurementBridge": { pushMarketingMeasurementEvent: (e: any) => events.push(["gtm", e.name, e.ctaLocation]) },
  };
  vm.runInNewContext(code, {
    exports,
    require: (name: string) => {
      assert.ok(name in deps, `Unexpected dependency: ${name}`);
      return deps[name];
    },
    fetch: () => { throw new Error("an app link must never make a network request at render time"); },
  });
  return exports.default;
}
const TRANSIT_UTM = { source: "transit_house", medium: "secondary_cta", campaign: "saturn-transit" };
check("renders an external Play Store <a> built by buildAppDownloadPlayStoreUrl (utm + referrer), new tab", () => {
  const events: any[] = [];
  const el = loadAppDownloadLink(events)({ utm: TRANSIT_UTM, className: "btn", children: "Daily Shani Remedies" });
  assert.equal(el.type, "a");
  const expected = buildAppDownloadPlayStoreUrl(PLAY_STORE_BASE, TRANSIT_UTM, {
    defaultMedium: "content_cta", defaultCampaign: "app_download", ctaLocationFallback: "app_download_link",
  });
  assert.equal(el.props.href, expected);
  const url = new URL(el.props.href);
  assert.equal(url.origin + url.pathname, "https://play.google.com/store/apps/details");
  assert.equal(url.searchParams.get("id"), "com.jyotishasha.app");
  assert.equal(url.searchParams.get("utm_source"), "transit_house");
  assert.ok(url.searchParams.get("referrer"), "Play install-referrer parameter must be present");
  assert.equal(el.props.target, "_blank");
  assert.equal(el.props.rel, "noopener noreferrer");
  assert.equal(el.props.className, "btn");
  assert.equal(el.props.children, "Daily Shani Remedies");
  assert.equal(events.length, 0, "no analytics at render time");
});
check("click fires app_download_intent(cta_location = <source>_<medium>) and the secondary GTM signal, nothing blocks navigation", () => {
  const events: any[] = [];
  const el = loadAppDownloadLink(events)({ utm: TRANSIT_UTM, children: "x" });
  el.props.onClick();
  assert.deepEqual(events, [
    ["app_download_intent", "transit_house_secondary_cta"],
    ["gtm", "jyotishasha_app_download_intent", "transit_house_secondary_cta"],
  ]);
  assert.ok(!read(APP_LINK).includes("preventDefault"));
});
check("EN/HI: the Play Store destination is locale-independent (same URL for both)", () => {
  const Link = loadAppDownloadLink([]);
  const en = Link({ utm: { source: "daily_horoscope", medium: "sidebar_cta", campaign: "aries" }, children: "Download App" });
  const hi = Link({ utm: { source: "daily_horoscope", medium: "sidebar_cta", campaign: "aries" }, children: "ऐप डाउनलोड करें" });
  assert.equal(en.props.href, hi.props.href);
  assert.ok(!/\/hi\/|\/en\//.test(en.props.href));
});

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, 0 failed`);
console.log("==================================================");
