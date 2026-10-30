// Focused-report render check (F12-P2.8, moved here in F12-P2.9 so it is version-controlled).
// Transpiles every registered content module from app/data/focused-report-content into a temp dir, then
// checks each EN/HI page on a running local server (`npx next build && npx next start -p 3126`) for SEO,
// pricing, checkout, sample, disclosure and link invariants; then checks generic regression pages, the
// hub and the sitemap. Read-only against the server; writes nothing into the repo.
// Usage: node scripts/focused-report-render-check.cjs   (FE_URL overrides http://localhost:3126)
/* eslint-disable @typescript-eslint/no-require-imports -- plain Node CommonJS script, like the other scripts/*.cjs checkers */
const fs = require("fs");
const os = require("os");
const path = require("path");
const ts = require("typescript");
const FE = process.env.FE_URL || "http://localhost:3126", SITE = "https://www.jyotishasha.com";
const repo = path.join(__dirname, "..");
const src = path.join(repo, "app", "data", "focused-report-content");
const out = fs.mkdtempSync(path.join(os.tmpdir(), "focused-content-"));
for (const f of fs.readdirSync(src).filter((x) => x.endsWith(".ts"))) {
  const js = ts.transpileModule(fs.readFileSync(path.join(src, f), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  fs.writeFileSync(path.join(out, f.replace(/\.ts$/, ".js")), js);
}
const { FOCUSED_REPORT_SEO_CONTENT, AI_DISCLOSURE } = require(path.join(out, "index.js"));
const personMode = Object.fromEntries(require(path.join(repo, "app", "data", "intentCatalog.json")).questions.map((q) => [q.question_key, q.person_mode]));
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/<!-- -->/g, "");
const text = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
let pass = 0, fail = 0; const failures = [];
const ok = (cond, label) => { if (cond) pass++; else { fail++; failures.push(label); } };
const status = new Map();
async function get(p) { const r = await fetch(FE + p, { redirect: "manual" }); return { status: r.status, html: await r.text() }; }
async function head(p) { if (!status.has(p)) { const r = await fetch(FE + p, { redirect: "manual" }); status.set(p, r.status); } return status.get(p); }
function jsonLd(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch { return null; } }).filter(Boolean);
  const flat = []; const walk = (x) => { if (Array.isArray(x)) x.forEach(walk); else if (x && typeof x === "object") { flat.push(x); if (x["@graph"]) walk(x["@graph"]); } }; walk(blocks); return flat;
}
const norm = (s) => s.replace(/\s+/g, " ").trim();
const count = (html, re) => (html.match(re) || []).length;
(async () => {
  for (const c of Object.values(FOCUSED_REPORT_SEO_CONTENT)) {
    const slug = c.questionKey.replace(/_/g, "-");
    for (const lang of ["en", "hi"]) {
      const p = `${lang === "hi" ? "/hi" : ""}/reports/focused/${slug}`; const L = `${lang} ${slug}`;
      const { status: st, html } = await get(p); const t = text(html);
      ok(st === 200, `${L}: status ${st}`);
      ok(norm(decode((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "")) === c.seoTitle[lang], `${L}: <title>`);
      ok(decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "") === c.metaDescription[lang], `${L}: meta description`);
      ok(norm(text((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || "")) === c.h1[lang], `${L}: h1`);
      ok(/<meta name="robots" content="noindex, follow"/.test(html), `${L}: noindex, follow`);
      ok(html.includes(`<link rel="canonical" href="${SITE}${p}"`), `${L}: canonical`);
      for (const hl of ["en", "hi", "x-default"]) ok(new RegExp(`hrefLang="${hl}"|hreflang="${hl}"`).test(html), `${L}: hreflang ${hl}`);
      const ld = jsonLd(html);
      const product = ld.find((x) => x["@type"] === "Product");
      const offers = product && [].concat(product.offers || []);
      ok(product && offers.some((o) => String(o.price) === "51" && o.priceCurrency === "INR"), `${L}: Product JSON-LD ₹51 INR`);
      ok(ld.some((x) => x["@type"] === "BreadcrumbList"), `${L}: BreadcrumbList JSON-LD`);
      ok(/₹\s?51\b/.test(t), `${L}: ₹51 shown`);
      // The checkouts render their inputs without a <form> element (submission is handled in JS).
      if (personMode[c.questionKey] === "dual") {
        // FocusedDualReportCheckout: one email, and a date + time of birth for each of the two people.
        ok(/type="email"/.test(html) && count(html, /type="date"/g) >= 2 && count(html, /type="time"/g) >= 2, `${L}: dual checkout fields (email, both people's date and time of birth)`);
      } else {
        ok(["name", "email", "phone", "tob", "pob"].every((n) => html.includes(`name="${n}"`)) && /type="email"/.test(html), `${L}: checkout fields (name, email, phone, birth time, place)`);
      }
      ok(html.includes(`/report-samples/${c.questionKey}_${lang}.pdf`), `${L}: own sample PDF`);
      ok(t.includes(AI_DISCLOSURE.heading[lang]) && t.includes(norm(AI_DISCLOSURE.body[lang]).slice(0, 60)), `${L}: AI disclosure`);
      ok(t.includes(c.differentiation[lang].slice(0, 60)), `${L}: differentiation`);
      ok(c.intro[lang].every((x) => t.includes(x.slice(0, 50))), `${L}: intro`);
      ok(c.analyzes[lang].every((x) => t.includes(x.slice(0, 40))), `${L}: analyzes list`);
      ok(c.faqs.length >= 4 && c.faqs.every((f) => t.includes(f.question[lang].slice(0, 40))), `${L}: ${c.faqs.length} FAQs rendered`);
      ok(t.includes(c.sections.whatYouReceive[lang].slice(0, 40)) && t.includes(c.sections.trustAndLimitations[lang].slice(0, 40)), `${L}: PDF scope + limitations`);
      for (const link of c.internalLinks) {
        const href = lang === "hi" && link.localized ? `/hi${link.path}` : link.path;
        ok(html.includes(`href="${href}"`), `${L}: link ${href} present`);
        ok((await head(href)) === 200, `${L}: link ${href} -> ${status.get(href)}`);
      }
    }
  }
  // Generic regression pages stay on the template, noindex; hub and sitemap unchanged in policy.
  for (const p of ["/reports/focused/best-period-to-switch", "/hi/reports/focused/conflict-areas", "/reports/focused/property-strongest-period", "/reports/focused/major-kundali-obstacles"]) {
    const { status: st, html } = await get(p);
    ok(st === 200 && /<meta name="robots" content="noindex, follow"/.test(html) && /₹\s?51\b/.test(text(html)), `regression ${p}`);
  }
  const hub = await get("/reports/focused"); ok(hub.status === 200, "hub 200");
  const sm = await get("/sitemap.xml"); ok(sm.status === 200 && !sm.html.includes("/reports/focused"), "sitemap has no focused URLs");
  fs.rmSync(out, { recursive: true, force: true });
  console.log(failures.slice(0, 40).join("\n"));
  console.log(`\nFOCUSED RENDER: ${pass} passed, ${fail} failed (${Object.keys(FOCUSED_REPORT_SEO_CONTENT).length} content topics x EN/HI)`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error("FAILED", e); process.exit(1); });
