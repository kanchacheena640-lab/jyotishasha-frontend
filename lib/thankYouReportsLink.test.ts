/**
 * Paid-report success page: the "More Reports" CTA must point at an ACTUAL route (Q5.5A).
 *
 * Production bug: the success page linked to `/${locale}/reports` (/en/reports, /hi/reports), but the reports hub
 * lives at app/reports (NOT locale-prefixed); app/[locale]/reports does not exist, so both returned 404.
 *
 * The real ThankYouDetail component is executed in an isolated context (no network, no payment code available);
 * every internal link it renders is resolved against the repository's own app/ route tree.
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/thankYouReportsLink.test.ts
 *   node .ts-test-out/thankYouReportsLink.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */
/* eslint-disable @typescript-eslint/no-explicit-any -- test helpers walk untyped React element trees */
import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";
import * as ts from "typescript";

const repo = process.cwd();
let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}
const read = (file: string) => fs.readFileSync(path.join(repo, file), "utf8");
const exists = (file: string) => fs.existsSync(path.join(repo, file));

const THANK_YOU = "app/[locale]/thank-you/ThankYouDetail.tsx";

/** Does a public URL path have a real page? Mirrors the routing this site actually uses (see middleware.js):
 *  /reports and /reports/* are served by app/reports (outside [locale]); every other path is app/[locale]/...
 *  (an unprefixed path is rewritten to /en/...). */
function routeExists(publicPath: string): boolean {
  const clean = publicPath.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  if (clean === "/reports" || clean.startsWith("/reports/")) {
    return exists("app/reports/page.tsx") && (clean === "/reports" || exists("app/reports/[slug]/page.tsx"));
  }
  const parts = clean.split("/").filter(Boolean);
  const rest = parts[0] === "en" || parts[0] === "hi" ? parts.slice(1) : parts;
  return exists(["app", "[locale]", ...rest, "page.tsx"].join("/"));
}

function load(file: string, dependencies: Record<string, unknown>) {
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
    fetch: () => { throw new Error("The success page must never make a network/payment request"); },
  });
  return exports;
}
const jsxRuntime = {
  jsx: (type: any, props: any) => ({ type, props }),
  jsxs: (type: any, props: any) => ({ type, props }),
};
function walk(node: any, visit: (element: any) => void): void {
  if (Array.isArray(node)) { node.forEach(n => walk(n, visit)); return; }
  if (node && typeof node === "object" && "props" in node) { visit(node); walk(node.props.children, visit); }
}
function textOf(node: any): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return textOf(node.props?.children);
}
function render(locale: string) {
  const { default: ThankYouDetail } = load(THANK_YOU, { "react/jsx-runtime": jsxRuntime, "next/link": { default: "Link" } });
  const tree = ThankYouDetail({ locale });
  const links: { type: string; href: string; text: string; props: any }[] = [];
  let heading = "";
  let paragraph = "";
  walk(tree, el => {
    if (el.type === "Link" || el.type === "a") links.push({ type: el.type, href: el.props.href, text: textOf(el.props.children).trim(), props: el.props });
    if (el.type === "h1") heading = textOf(el).trim();
    if (el.type === "p" && /prepared|तैयार/.test(textOf(el))) paragraph = textOf(el).trim();
  });
  return { links, heading, paragraph };
}
const MORE = { en: "More Reports →", hi: "और रिपोर्ट्स देखें →" } as const;
const HOME = { en: "Back to Home", hi: "होम पेज" } as const;

// ---- 1. the route tree itself: what exists and what does not ----------------------------------------------------
check("the reports hub is app/reports (outside [locale]); there is NO app/[locale]/reports", () => {
  assert.ok(exists("app/reports/page.tsx"));
  assert.ok(!exists("app/[locale]/reports"), "a locale-prefixed reports route would change this test's premise");
});
check("route resolver: /reports exists; /en/reports and /hi/reports do not", () => {
  assert.equal(routeExists("/reports"), true);
  assert.equal(routeExists("/reports/career_report"), true);
  assert.equal(routeExists("/en/reports"), false);
  assert.equal(routeExists("/hi/reports"), false);
});
check("the success page itself exists for both purchase redirects (/en/thank-you, /hi/thank-you)", () => {
  assert.equal(routeExists("/en/thank-you"), true);
  assert.equal(routeExists("/hi/thank-you"), true);
});

// ---- 2. the More Reports destination ---------------------------------------------------------------------------
for (const [locale, lang] of [["en", "en"], ["hi", "hi"], ["fr", "en"]] as const) {
  check(`locale ${locale}: "${MORE[lang]}" -> /reports (an existing route), never /${locale}/reports`, () => {
    const { links } = render(locale);
    const more = links.filter(l => l.text === MORE[lang]);
    assert.equal(more.length, 1);
    assert.equal(more[0].href, "/reports");
    assert.ok(routeExists(more[0].href), "More Reports must not be a 404 target");
    assert.ok(!links.some(l => /^\/(en|hi)\/reports/.test(l.href)), "no locale-prefixed reports link may be generated");
  });
  check(`locale ${locale}: every internal link on the success page resolves to a real route`, () => {
    for (const l of render(locale).links.filter(x => x.href.startsWith("/"))) {
      assert.ok(routeExists(l.href), `${l.href} has no page`);
    }
  });
}
check("More Reports uses a Next Link (client navigation keeps the selected language for the /reports hub)", () => {
  assert.ok(render("en").links.find(l => l.text === MORE.en)!.type === "Link");
});

// ---- 3. everything else on the success page is unchanged ---------------------------------------------------------
for (const [locale, lang, title, subtext] of [
  ["en", "en", "🎉 Payment Successful!", "Thank you. Your report is being prepared and will be sent to your email shortly."],
  ["hi", "hi", "🎉 भुगतान सफल रहा!", "धन्यवाद। आपकी रिपोर्ट तैयार की जा रही है और जल्द ही आपके ईमेल पर भेज दी जाएगी।"],
] as const) {
  check(`${lang}: payment-success heading and message text are unchanged`, () => {
    const { heading, paragraph } = render(locale);
    assert.equal(heading, title);
    assert.equal(paragraph, subtext);
  });
  check(`${lang}: Back to Home is unchanged (/${locale})`, () => {
    const home = render(locale).links.filter(l => l.text === HOME[lang]);
    assert.equal(home.length, 1);
    assert.equal(home[0].href, `/${locale}`);
    assert.equal(home[0].type, "Link");
  });
  check(`${lang}: WhatsApp support is unchanged`, () => {
    const wa = render(locale).links.filter(l => /wa\.me/.test(l.href));
    assert.equal(wa.length, 1);
    assert.equal(wa[0].href, "https://wa.me/917007012255");
    assert.equal(wa[0].props.target, "_blank");
    assert.equal(wa[0].props.rel, "noopener noreferrer");
    assert.equal(wa[0].text, lang === "hi" ? "💬सहायता चाहिए? व्हाट्सएप पर चैट करें" : "💬Need help? Chat with us on WhatsApp");
  });
}
check("the success page renders exactly three links (More Reports, Back to Home, WhatsApp)", () => {
  assert.equal(render("en").links.length, 3);
  assert.equal(render("hi").links.length, 3);
});

// ---- 4. isolation from the payment flow ---------------------------------------------------------------------------
check("ThankYouDetail contains no payment / order / network code", () => {
  const source = read(THANK_YOU);
  assert.ok(!/razorpay|fetch\(|\/webhook|razorpay-order|window\.location|useReportPurchase|axios/i.test(source));
});
check("the purchase flows still redirect to the (existing) success page, unchanged", () => {
  assert.ok(read("components/reports/ReportCheckout.tsx").includes("window.location.href = `/${currentLang}/thank-you`"));
  assert.ok(read("app/[locale]/love/report/relationship_future_report/RelationshipFutureReportForm.tsx").includes("redirectTo: `/${locale}/thank-you`"));
});
check("no other source generates a locale-prefixed reports hub link (/en/reports, /hi/reports, /${x}/reports)", () => {
  const offenders: string[] = [];
  const scan = (dir: string) => {
    for (const entry of fs.readdirSync(path.join(repo, dir), { withFileTypes: true })) {
      const rel = `${dir}/${entry.name}`;
      if (entry.isDirectory()) { if (!["node_modules", ".next"].includes(entry.name)) scan(rel); continue; }
      if (!/\.(tsx?|jsx?)$/.test(entry.name) || /\.test\.ts$/.test(entry.name)) continue;
      // literal /en|/hi, or a template variable named like a locale (lang, currentLang, locale, lp) -- not absolute-URL bases
      if (/(?:\/(?:en|hi)|\$\{[A-Za-z_.]*(?:[Ll]ang|[Ll]ocale|lp)[A-Za-z_.]*\})\/reports(?![\w-])/.test(read(rel))) offenders.push(rel);
    }
  };
  ["app", "components"].forEach(scan);
  assert.deepEqual(offenders, []);
});

console.log(`TOTAL: ${passed} passed, 0 failed`);
