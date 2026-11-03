# Jyotishasha Article Standard (editorial template)

Reference standard for Jyotishasha topic articles (guides under a subject hub). Companion to
`docs/seo/JYOTISHASHA_HUB_STANDARD.md`: hubs route visitors; articles answer one question in depth.

Reference implementation: the Marriage Timing article (`/marriage-astrology/marriage-timing`,
`/hi/marriage-astrology/marriage-timing`), opt-in via `theme: 'editorial'` in
`lib/domains/marriage-astrology/_landing.ts`.

| Piece | File |
|---|---|
| Route wiring (editorial branch) | `app/[locale]/marriage-astrology/[slug]/page.tsx` |
| Page shell (`theme`, `related`, `breadcrumbHomeHref`) | `components/authority-engine/AuthorityDetailRenderer.tsx` |
| Title (one H1) | `components/authority-engine/TopicHero.tsx` (`variant="editorial"`) |
| Breadcrumb | `components/authority-engine/AuthorityBreadcrumb.tsx` (`variant="editorial"`, `homeHref`) |
| Hero row (answer + tool + report), video, related guides | `components/authority-engine/editorial/EditorialArticle.tsx` |
| Article grid, section styling (cards, checklists, FAQ, headings) | `components/authority-engine/editorial/editorial.module.css` |
| Config types (`theme`, `video.articleSectionId`) | `lib/authority-engine/landing-types.ts` |

This document describes conventions. It does not authorise converting other articles; each topic is moved
to the template in its own approved change (one config flag + its snapshot entries).

---

## 1. Opt-in and scope

- The template is enabled per topic with `theme: 'editorial'` on a **report-led** landing config
  (direct answer + offer). Without the flag a topic renders the default (dark) layout exactly as before.
- English and Hindi share one config, so both languages switch together.
- The shared section components are not edited for the theme. `editorial.module.css` restyles their
  existing markup under `.editorial` (the same pattern as `landing.module.css`), so pages without the
  flag, including Financial Astrology, are unaffected.
- Template components render no `<h1>` (guard: only `TopicHero`, `HubHero`, `IntentHubRenderer`).

## 2. Article structure (ordered by search intent, then user action)

| # | Block | Source | Notes |
|---|---|---|---|
| 1 | Breadcrumb `Home › Subject › Article` | `AuthorityBreadcrumb` | `<ol>`, current page `aria-current="page"`, Home = final URL (`/`, `/hi`) |
| 1 | H1 + one-line intro | topic `title` / `subtitle` | No card around the title |
| 1 | Direct answer | landing `directAnswer` | Answers the search intent in 2–4 sentences |
| 2 | **Free tool** CTA (prominent, navy card) | topic `ctas` (type `tool`) | Immediately after the answer; a link to the existing tool page, never an embedded copy of its form |
| 3 | Compact report CTA | landing `offer` | Price from the catalog, existing tracked button + sample viewer |
| 4 | Article sections (H2, cards/checklists as H3/labels) | topic `sections` | Content unchanged; reading column |
| 4 | Video, in the section it explains | landing `video` + `articleSectionId` | Existing tap-to-load facade; phones/tablets inline after that section, desktop in a sticky side column beside the sections (same DOM node, placed by CSS grid) |
| 5 | FAQ | topic FAQ section | Server-rendered `<details>`; FAQPage mirrors it exactly |
| 5 | Related guides (one block) | context links + related topics + overview + cross-domain links | Replaces the separate context-links, related-topics and explore-more blocks |

Rules:
- One H1. The two action cards and the article sections are H2; cards, checklist labels and related-guide
  cards are H3 or labels inside them.
- Each call to action appears once (no end-of-page CtaBlocks, no repeated report links).
- Every link is a crawlable `<a href>` to an existing route; no link is lost when blocks are consolidated.
- Prices and product names come from `app/data/reportsData.ts`; CTA labels use the `{price}` placeholder.

## 3. Visual language (shared with the hub)

- Ivory page `#FBF8F2`, white cards, line `#E8DDC9`, panel `#F5EEDF`.
- Text: navy `#1B2A4A` (headings, labels), body `#45516A`, muted `#5B667D`.
- Accents: terracotta `#A8461F` (links, primary button), gold `#C9A227` (offer border, checklist dots).
- Contrast: every text pair ≥ 4.5:1 (lowest used: muted on white, 5.8:1).
- Width: the outer container matches the hub (`max-w-6xl`, `px-4 md:px-6`). Breadcrumb, title, the
  hero row (answer + action cards) and related guides use it fully; article sections and the FAQ sit in a
  `46rem` (736 px) reading column, with the video's side column beside it on desktop (≥ 1024 px).
- Hero row on desktop: answer `46rem` | action cards stacked; tablet: answer, then full-width tool banner
  (text left, button right) and report card; phones: answer, tool card, report card.
- Type: body 16–17 px; headings 24/28 px (H2), 30/40 px (H1); balanced heading wrap.
- Hindi: the article `<main>` carries `lang="hi"`; Devanagari body line-height 1.85.

## 4. Accessibility and mobile

- Tap targets ≥ 44 × 44 px (breadcrumb links, inline links, buttons, cards, FAQ summaries).
- Visible focus ring on every interactive element.
- Decorative icons `aria-hidden`; the video facade button has a descriptive `aria-label`.
- Verified at 390, 768 and 1366 px: no horizontal overflow, no clipped text.
- Site-wide fixed layers (header, WhatsApp, app bar, cookie banner, Auto Ads) are out of the template's scope.

## 5. SEO

- URLs, canonical (self), hreflang (`en`/`hi`/`x-default`), title and meta description are unchanged by
  the template.
- Structured data: `BreadcrumbList` (matches the visible breadcrumb, Home = final URL), `Article`
  (marriage builder; no empty dates, Organization author) and `FAQPage` (only when FAQs are visible, same
  questions and answers). No `VideoObject`: an article is not a video watch page, and Google says not to
  rely on user actions to load a video, so markup would not make it eligible for video features.
- Content is not rewritten or padded for the template; consolidation removes only duplicated CTA copy and
  redundant block headings.

## 6. Validation checklist

- [ ] `tsc --noEmit -p .`, ESLint on changed files, `next build` (exit 0)
- [ ] Marriage suites (guards, SSR, snapshot, Article/FAQ schema, landing, YouTube Shorts) pass
- [ ] Snapshot: only the converted topic's EN/HI entries change (plus any approved cluster-wide fix)
- [ ] Rendered HTML (EN + HI): 200, one H1, section order as in §2, FAQ count = FAQPage count
- [ ] BreadcrumbList = visible breadcrumb; no breadcrumb URL redirects
- [ ] All internal links 200; tool link and report link (with sample) each present once, right after the answer
- [ ] Analytics ids unchanged: `reportCtaId`, `sampleCtaId`, `screenName`, video `playFeatureName`
- [ ] 390 / 768 / 1366 px: no overflow, tap targets ≥ 44 px, focus styles, contrast ≥ 4.5:1
- [ ] Pages without the flag (other topics, Financial Astrology) render byte-identical `<main>` HTML apart
      from build hashes and any approved cluster-wide fix (e.g. the Hindi Home crumb `…/hi` in
      BreadcrumbList for all Marriage topics)
