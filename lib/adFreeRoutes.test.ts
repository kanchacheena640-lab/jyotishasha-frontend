/** F10-P21T: AdSense must never load on the private review page, while the
 * rest of the site keeps its ads. Runs the real isAdFreeRoute() from
 * components/ConditionalAdSense.tsx (transpiled, React/Next stubbed).
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/adFreeRoutes.test.ts
 *   node .ts-test-out/adFreeRoutes.test.js
 * (then remove .ts-test-out/ -- build output, never committed.)
 */
import * as fs from "fs";
import * as vm from "vm";
import * as assert from "assert";
import * as ts from "typescript";

let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}

const source = fs.readFileSync("components/ConditionalAdSense.tsx", "utf8");
const code = ts.transpileModule(`${source}\nexport { isAdFreeRoute, AD_FREE_PREFIXES };`, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const mod: Record<string, any> = {};
vm.runInNewContext(code, {
  exports: mod,
  require: (name: string) => {
    if (name === "next/navigation") return { usePathname: () => "/" };
    if (name === "react") return { useEffect: () => undefined, useRef: (v: unknown) => ({ current: v }) };
    throw new Error(`Unexpected dependency: ${name}`);
  },
});
const isAdFreeRoute: (pathname: string) => boolean = mod.isAdFreeRoute;
// ConditionalAdSense decides from usePathname(), which never includes the
// query string or the fragment -- model that with URL.pathname.
const pathOf = (url: string) => new URL(url, "https://www.jyotishasha.com").pathname;

check("/review is ad-free with no token, a query token or a fragment token (EN and HI)", () => {
  for (const url of ["/review", "/review/", "/review?token=abc", "/review#t=abc.def", "/hi/review", "/hi/review#t=abc.def"]) {
    assert.equal(isAdFreeRoute(pathOf(url)), true, url);
  }
});
check("ads still load on unrelated pages (no over-broad prefix match)", () => {
  for (const url of ["/", "/hi", "/blog", "/panchang", "/reviews-of-astrologers", "/reviewer", "/hi/horoscope"]) {
    assert.equal(isAdFreeRoute(pathOf(url)), false, url);
  }
});
check("existing exclusions are unchanged; /review is the only addition", () => {
  assert.deepEqual(mod.AD_FREE_PREFIXES, [
    "/reports", "/love/report/relationship_future_report", "/processing", "/thank-you",
    "/privacy-policy", "/refund-policy", "/terms", "/account-deletion", "/review",
  ]);
});

console.log(`TOTAL: ${passed} passed, 0 failed`);
