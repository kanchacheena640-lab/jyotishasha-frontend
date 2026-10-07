# MC-02 — Marriage Cluster snapshot baseline

Pre-change, machine-readable SEO/content baseline for the Marriage Astrology cluster, recorded
at frontend `26262db` before any Framework v1 page change (MC-03 onwards).

| File | Purpose |
|---|---|
| `lib/marriageClusterSnapshot.test.ts` | Renders every page, extracts semantic facts, compares with the baseline |
| `lib/fixtures/marriage-cluster-baseline.json` | The approved baseline (26 pages) |
| `docs/marriage-cluster/gsc-baseline-template.csv` | Search Console URL list to fill in by hand |

MC-01 (`lib/marriageClusterGuards.test.ts`) is the **contract** layer: rules every page must satisfy.
MC-02 is the **before-state** record: what each page looks like now, so later batches can prove they
added content without removing or changing anything unintentionally.

## Coverage

All topics registered in the `marriage-astrology` authority domain (discovered from the registry,
currently 12) plus the `/marriage-astrology` hub, each in EN and HI: **26 pages**. A topic added to
the registry later shows up as a new, unbaselined page and fails the test until it is reviewed and
added.

## How a page is captured

Pages are rendered **in-process** through the real route modules:
`app/[locale]/marriage-astrology/[slug]/page.tsx` and `app/[locale]/marriage-astrology/page.tsx`
(`generateMetadata` plus the page component, rendered with `react-dom/server`). No dev server,
network, backend, OpenAI or payment is involved.

This rendering was checked once against a live `next dev` render of `/marriage-astrology/spouse-nature`:
the text of `<main>` was **word-for-word identical** in EN (1,933 words) and HI (2,142 words). The only
difference is the site layout (navigation/footer), which the snapshot excludes on purpose. No layout
defines `robots` or a title template (asserted by the test), so the route metadata is the real `<head>`.

## Snapshot format (per page, key `<slug>|<locale>` or `hub|<locale>`)

| Field | Content |
|---|---|
| `type`, `locale`, `path` | `topic`/`hub`, `en`/`hi`, site path |
| `seo` | title, description, keywords, canonical, hreflang alternates, robots (`null` = none emitted), Open Graph type/url/title |
| `headings` | H1, H2, H3 texts in page order |
| `faq` | count, question texts, how many questions and answers appear in server HTML (topics only) |
| `sections` | per content section: id, layout, title, item count, labels in server HTML, bodies, bodies in server HTML (topics only) |
| `links` | unique internal links inside `<main>`, grouped as reports / report samples / tools / marriage topics; external hosts; iframe hosts |
| `schema` | JSON-LD `@type` list and the full JSON-LD objects (stable, no timestamps) |
| `server` | word count of `<main>` and the number of server-rendered `<details>` elements |
| `facts` | derived, readable flags: Hindi meta falls back to English, FAQPage schema present, FAQ answers in server HTML, collapsed bodies in server HTML, a report destination linked more than once |

**Deliberately excluded:** class names, whitespace/markup structure, build hashes, timestamps, the site
navigation and footer, and the prose of section bodies. Content loss is detected through the per-item
"in server HTML" counts and the word count, not by storing body text.

## Server-text counting method

Take the rendered page, keep only `<main>…</main>`, remove `<script>` and `<style>`, replace every
tag with a space, decode HTML entities, collapse whitespace, and count whitespace-separated tokens.
A body/label/question is "in server HTML" when its exact (whitespace-normalised) text occurs in that
server text.

## Current state recorded (known defects are baseline facts, not failures)

| Page | Words EN / HI | FAQ answers in server HTML | Collapsed bodies in server HTML | Report CTA(s) | Tool | Hindi meta |
|---|---|---|---|---|---|---|
| marriage-prediction | 1,693 / 1,432 | 0 / 8 | 0 / 8 | marriage_report | marriage-path | falls back to English |
| marriage-timing | 1,744 / 1,637 | 11 / 11 | 11 / 11 | marriage_report (card + bottom) | marriage-path | present |
| love-marriage | 2,516 / 2,476 | 8 / 8 | 8 / 8 | love_marriage_report (card + bottom) | love-life | present |
| arranged-marriage | 3,802 / 4,210 | 8 / 8 | 23 / 23 | marriage_report (card + bottom) | marriage-path | present |
| delayed-marriage | 2,801 / 3,106 | 9 / 9 | 9 / 9 | delay_in_marriage_report (card + bottom) | marriage-path | present |
| early-marriage | 2,027 / 1,654 | 0 / 10 | 0 / 10 | marriage_report | marriage-path | falls back to English |
| second-marriage | 1,204 / 1,305 | 0 / 10 | 0 / 15 | second_marriage_report | marriage-path | falls back to English |
| divorce-possibility | 1,617 / 1,453 | 0 / 10 | 0 / 27 | divorce_possibility_report | none | falls back to English |
| spouse-nature | 1,933 / 2,142 | 0 / 10 | 0 / 27 | marriage_report | marriage-path | falls back to English |
| married-life | 1,895 / 1,773 | 0 / 10 | 0 / 29 | problem_in_marriage_report | none | falls back to English |
| compatibility | 1,603 / 1,551 | 0 / 10 | 0 / 39 | relationship_future_report | mangal-dosh | falls back to English |
| intercaste-marriage | 1,754 / 1,988 | 0 / 10 | 0 / 25 | love_marriage_report | marriage-path | falls back to English |
| hub | 328 / 348 | – | – | – | – | present |

"Collapsed bodies" counts the item bodies of `accordion` and `faq` sections. The four pages with a
landing overlay (`ssrFaq: true`) already render them as `<details>`; the other eight render only the
labels/questions on the server.

Other preserved facts:

- No page emits FAQPage schema. Topic pages emit `BreadcrumbList` + `Article`; the hub emits no JSON-LD.
- Article schema has empty `datePublished` / `dateModified` and no author.
- No page emits a robots directive (every page is indexable).
- marriage-prediction's `topic`-type CTA ("Check Marriage Compatibility") is dropped by the adapter and never rendered.
- The four overlay pages link the same report twice (card + bottom CTA).
- `/reports/spouse_nature_report` is not linked from any marriage page.

## Using the baseline

```
npx tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/marriageClusterSnapshot.test.ts
node .ts-test-out/marriageClusterSnapshot.test.js                                # strict (default)
MC_SNAPSHOT_MODE=additive node .ts-test-out/marriageClusterSnapshot.test.js      # additive gate
MC_SNAPSHOT_UPDATE=1 node .ts-test-out/marriageClusterSnapshot.test.js           # regenerate after approval
```

Differences are listed per page, for example:

```
x [spouse-nature][en] REMOVED headings.h2: "Planet-wise Analysis of Spouse Nature"
x [compatibility][hi] DECREASED faq.count: 10 -> 9
+ [marriage-timing][en] INCREASED server.wordCount: 1694 -> 1744
```

- **strict** (default): any difference fails. Used to confirm a change touched only the pages it meant to.
- **additive**: only `REMOVED`, `DECREASED` and `CHANGED` (a non-empty value replaced) fail; `ADDED`,
  `INCREASED` and `FILLED` (an empty value filled in) are listed and pass. This is the gate for additive
  batches such as MC-05 (server-render collapsed content).
- **Updating**: after an approved batch, regenerate with `MC_SNAPSHOT_UPDATE=1` in the same change and
  review the JSON diff; it shows exactly what the batch changed on every page.

Generation is deterministic: two consecutive regenerations produce byte-identical files.

## Search Console baseline

No Search Console data is available to the repository, so none is recorded or estimated here.
`gsc-baseline-template.csv` lists the 26 exact production URLs (generated from the registry; the test
fails if it drifts). Before MC-03, record for each URL over the last 28 days: clicks, impressions, CTR,
average position, and the top queries, plus who captured it and when.
