USERS U8 FINAL REGRESSION & FREEZE REPORT

Automated verification completed locally on 2026-09-08. Users module technical recommendation: ready to freeze as USERS MODULE v1.0. This is not a deployment or a global frontend build approval. The user explicitly confirmed U6 visual acceptance and U7 visual verification in the U8 handover; no new U8 human spot-check is claimed.

1. **Worktree Safety** — Inspected both repositories before editing. Preserved legitimate U1-U7 work. SHA-256 comparisons of existing files found only the intended backend test correction and frontend QA-tool edits described below. No application implementation changed during U8. No reset, clean, restore, checkout, stash, rebase, commit, push, or deployment. No production access.

2. **Cleanup Audit** — Classified the U7 one-time source-rewriting helper as temporary and removed it. Retained repeatable browser scripts and phase reports. Removed the stale U7 file-hash baseline and full API-response dump. U7 QA no longer writes that unnecessary data dump. No broad cleanup of unrelated project files.

3. **Database Safety** — Before DB-dependent verification, executed `SELECT current_database()` and confirmed `jyotishasha_local`. Repeated this check in the backend regression launcher before each suite. Both `alembic_version` and the migration graph head are `9f2a5c7e1b83`. No migrations or schema modifications. A separate startup check completed normal app import with `SQLAlchemy.create_all` forbidden and schema-changing SQL rejected. Alembic remains the schema source of truth; startup does not create missing tables. Python and browser/Node QA guards blocked non-loopback traffic.

4. **Users List** — Verified real BFF data, eight unchanged columns (Checkbox, User, Age, Status, Customer, Subscription, Last Active, View), real page 2, search returning canonical user `970501`, and page reset on search. Controlled loading/error responses verified skeletons, error display, and retry recovery. A real unmatched search verified the empty state.

5. **Filters** — Exercised all 23 existing filter controls plus search: age bounds, status, signup bounds, customer type, buyer/subscription, Moon Sign, Lagna, Nakshatra, Pada, Yog, Dosh, Mahadasha, Antardasha, Sade Sati status/phase, four transit houses, and live Ask Now category. Verified no Users fetch from unapplied drafts, Close/X discards changes, reopen uses applied values, Apply serializes through the existing query builder, chips reflect applied values, chip removal updates the query and resets page 1, and Clear All restores the list. Combined criteria correctly produced an empty result rather than ignoring dimensions. The old mapping test's success message says “25 filters”; the actual current control count is 23 plus search, and all are covered. No filter implementation was duplicated.

6. **Static Astrology** — Admin Users and four U3 suites passed. Stored Moon Sign/Lagna/Nakshatra/Pada, Yog/Dosh, calculated-empty versus uncalculated states, snapshot consistency, birth-change invalidation, bootstrap/deletion behavior, and controlled backfill remain covered. U8 changed no astrology engine or persistence behavior.

7. **Dasha** — Backend Dasha API suite passed 43 assertions. Browser fixtures render the response's Mahadasha/Antardasha and safely show Not calculated where null. Users/audience parity passed for Saturn/Venus. Values remain backend-derived.

8. **Sade Sati** — Backend suite passed 51 assertions. Browser checks covered three active phases, inactive, and not-calculated fixtures. Active/phase audience parity passed. No status or phase is inferred in the frontend.

9. **Transit Intelligence** — Backend suite passed 88 assertions. Browser tests compared all nine planets' displayed rashi, house, degree, and motion against the exact response used by each page. Null house remains Not calculated. Jupiter/Saturn/Rahu/Ketu controls remain unchanged. IST formatter tests and controlled null/malformed responses never displayed Invalid Date.

10. **Ask Now Intelligence** — Backend suite passed 72 assertions. Verified buyer semantics, dynamic category options, concern history/summary, no-history and unavailable states, and historical/inactive criterion preservation. No classification, payment attribution, or category rules changed.

11. **Customer 360** — Existing U7 script passed against all 18 local fixtures. Header, Identity, Customer, static Birth Astrology, Ask Now, Current Astrology, and full-width transits remain intact. No obsolete Customer 360 U3/U4/U5 card. Controlled missing-data cases passed; page-overflow checks passed at 1440, 768, and 375 pixels. These are automated checks, not a new human visual approval.

12. **Saved Audiences** — Real browser → Next BFF → Flask → local PostgreSQL workflow passed: applied filters, preview, create, list, detail/member link, edited preview/save, zero members, deactivate, inactive preview, reactivate, and All Users save. Supplemental browser checks passed preview 503/save blocking/retry, historical criteria, explicit boolean controls, and page-2 pagination using a controlled response. List navigation made zero preview requests. The new persistent local QA audience is `9`, final state active with empty All Users criteria; existing audience `4` was preserved. No new user or category fixtures were needed for browser QA. Backend suites use and clean their own scoped fixtures.

13. **Filter ↔ Audience Parity** — Compared live Users list IDs/counts with direct audience preview using the existing `buildUsersQuery` and `appliedFiltersToCriteria`. All nine nonempty representative cases passed:

    | Case | Matching users at verification |
    | --- | ---: |
    | Paying customer | 1 |
    | Ask Now buyer | 1 |
    | Ask Now concern | 1 |
    | Moon Sign + Lagna | 1 |
    | Mahadasha + Antardasha | 1 |
    | Active Sade Sati + phase | 1 |
    | Saturn + Jupiter house | 2 |
    | Combined customer/static/Sade Sati/transit dimensions | 1 |
    | Empty filters / All Users | 18 |

    These are observed QA counts, not persisted membership. Existing backend parity tests also passed with controlled fixtures.

14. **Backend Tests** — Final result: **620 passed, 0 failed across 11 standalone suites**. Counts are the suites' own assertions, not pytest test-case counts.

    | Suite | Passed | Failed |
    | --- | ---: | ---: |
    | `test_saved_audience.py` | 80 | 0 |
    | `test_admin_users_api.py` | 136 | 0 |
    | `test_admin_asknow_concern.py` | 72 | 0 |
    | `test_admin_dasha_api.py` | 43 | 0 |
    | `test_admin_sade_sati.py` | 51 | 0 |
    | `test_admin_transit.py` | 88 | 0 |
    | `test_db_safety.py` | 15 | 0 |
    | `test_static_astrology_extractor.py` | 34 | 0 |
    | `test_static_astrology_persistence.py` | 42 | 0 |
    | `test_static_astrology_backfill.py` | 42 | 0 |
    | `test_static_astrology_bootstrap_and_deletion.py` | 17 | 0 |

    Initial run: 619 passed, 1 failed. The only failure was the persistence suite's obsolete `37fd90bfdfd5` head assertion. Updated it to the independently verified expected head `9f2a5c7e1b83`; rerunning that suite passed 42/0. No business logic, migration, or schema was changed to make it pass. Initial and final evidence remain in ignored `.u6b-u8-*` logs/JSON. The separate startup probe initially encountered Windows output encoding for the existing Firebase startup message; configuring the QA launcher's stdout as UTF-8 resolved it, without application edits.

15. **Frontend Tests** — TypeScript (`--noEmit --incremental false`) passed. Existing Saved Audience mapping tests and U7 transit formatter tests passed. Four browser suites passed: U8 Users/filter/parity checks, U7 Customer 360 checks, U6B real E2E, and U6B supplemental UI regressions. Both repositories' `git diff --check` passed. No Users table/navigation regression. App Version still reports the existing local `404 no_policy_configured`; its route/navigation works and no policy fixture was added.

16. **Build Status** — Fresh guarded `npm run build` compiled successfully, completed lint/type validation, and attempted all 823 static pages, then exited 1 for exactly 24 existing public-content prerender failures: two blogs pages, two Navratri index pages, 18 Navratri detail pages, and two Panchang/tithi pages. They require external content blocked by local-only QA. No Users/Admin route was listed as failing. Full evidence: `.u6b-u8-build.log`. An initial sandbox filesystem EPERM was resolved by running the same guarded build with approved escalation. Isolated QA output and a separate QA tsconfig preserved the real `tsconfig.json` and existing source. Global frontend build remains blocked; Users module verification passed.

17. **Security / BFF Check** — Users/Audiences client code calls same-origin `/api/admin/*`; no hardcoded production URLs or client astrology calculations were found. BFF routes retain session checks and server-side bridge credentials; Flask endpoints retain the shared admin/bridge decorator. Unauthenticated Users/detail/categories/audiences requests returned 401; backend auth suites covered bridge/JWT rejection and acceptance. Browser monitoring found no bridge header in client requests. The actual bridge credential was absent from all 153 generated browser JavaScript files. No auth bypass or Notification/WhatsApp integration was added.

18. **Performance Sanity** — Users list made no per-user detail API calls. Audiences list made no per-row previews. Existing backend preview test observed three SQL queries for page sizes 1, 20, and 100. Resolver source and transit tests retain request-scoped resolution rather than per-user ephemeris work. Customer 360 fetch effect remains keyed to user ID with cancellation, and the fixture workflow completed without request-loop symptoms. No optimization refactor.

19. **Files Changed During U8** — Backend: `test_static_astrology_persistence.py` (expected head/comment only). Frontend: `scripts/u7-qa.cjs` (stop unnecessary response dump), new `scripts/u8-backend-regression.py` (guarded suite/startup runner), new `scripts/u8-users-regression.cjs` (repeatable integration coverage), and this report. Removed ignored files listed below. No application component, API route, engine, audience implementation, shared configuration, or migration was edited.

20. **Temporary Artifacts Removed/Retained** — Exact disposition:

    | Artifact | Classification / disposition |
    | --- | --- |
    | `.u6b-u7-edit.py` | C: removed; one-shot source-rewriting agent helper, unsafe/useless to repeat. |
    | `.u6b-u7-baseline.json` | C: removed; stale U7 file-comparison output. |
    | `.u6b-u7-local-fixtures.json` | C: removed; unnecessary full API-response dump; U7 script no longer generates it. |
    | `.u6b-u8-backend-baseline.json`, `.u6b-u8-frontend-baseline.json` | C: removed after final comparison; conclusions recorded here. |
    | `scripts/u7-qa.cjs` | B: retained; repeatable read-only Customer 360 regression. |
    | `scripts/u6b-e2e.cjs`, `scripts/u6b-ui-regressions.cjs` | B: retained; repeatable real lifecycle and controlled failure/history/pagination coverage. |
    | `scripts/u6b-local-backend.py`, `scripts/u6b-local-network.cjs` | B: retained; local DB/network guards and isolated QA configuration. |
    | New `scripts/u8-*.py/cjs` | B: retained; repeatable final regression tooling. |
    | U6B and U7 reports | D: retained unchanged; historical implementation and QA documentation. U8 records subsequent user visual acceptance. |
    | `.u6b-qa-fixtures.json` | B: retained; tracks deliberately persisted audiences 4 and 9. |
    | `.u6b-resume-preload.cjs`, `.u6b-tsconfig.json` | B: retained ignored local QA configuration used by the running review setup; not application configuration. |
    | `.u6b-*.log`, `.u6b-u8-*-results.json`, U7 screenshots | D: retained ignored diagnostic/test evidence. |
    | `.u6b-test-out`, `.u6b-u7-test-out`, `.next-u6b-*` | Intentional ignored compiler/build caches; retained, not accidental production source. |

    No useful automated tests, reports, unrelated scratch files, or pre-existing project outputs were blindly deleted. No one-off agent source-editing script remains.

21. **Deferred Items** — Saved Audience → Push Notification activation, WhatsApp activation, reliable report-purchase attribution where identity linkage is absent, and broader Customer 360 changes remain future work. The separate disabled Upcoming Dasha Change filter shell remains unsupported and deferred; this is distinct from the obsolete Customer 360 card removed in U7. Global public-site build dependencies and the local Android version-policy seed remain unrelated. No deferred feature was implemented.

22. **Manual QA URLs** — Existing guarded localhost servers remain available for the final human spot-check:

    - Users: http://127.0.0.1:3000/admin/users
    - Audiences: http://127.0.0.1:3000/admin/audiences
    - U8-created All Users audience: http://127.0.0.1:3000/admin/audiences/9
    - Full birth astrology: http://127.0.0.1:3000/admin/users/970501
    - Populated current Dasha: http://127.0.0.1:3000/admin/users/970601
    - Ask Now history: http://127.0.0.1:3000/admin/users/995400
    - Uncalculated/null personal astrology: http://127.0.0.1:3000/admin/users/970503

    Spot-check filter Apply/Close/chips, member navigation, audience edit/preview/state controls, and Customer 360 readability. Full Astrology fixture 970501 legitimately has no current Dasha or Ask Now history; use the separate fixtures above. U6/U7 visual acceptance is supplied by the user; the final U8 spot-check remains a human gate.

23. **Freeze Recommendation** — Ready to freeze USERS MODULE v1.0 after the final human spot-check. Scope: real user/customer/static-astrology segmentation, Dasha, Sade Sati, major transit-house segmentation, Ask Now concern intelligence, Saved Dynamic Audiences, Customer 360, Admin BFF access, and DB safety boundary. No outstanding Users/Admin functional regression was found. This report makes no deployment or global-build-success claim.

| Explicit question | Answer |
| --- | --- |
| Existing U1-U7 changes preserved? | Yes; only the verified test correction and tooling cleanup were applied. |
| Any reset/clean/restore performed? | No. Only explicitly scoped temporary-file deletion. |
| Database confirmed jyotishasha_local? | Yes, before DB work and again during verification. |
| Alembic still schema source of truth? | Yes; head 9f2a5c7e1b83. |
| Can normal startup create missing tables? | No; create_all removed and startup probe passed. |
| Production touched? | No. |
| Astrology rules changed? | No. |
| Customer/payment/subscription semantics changed? | No. |
| Ask Now classification changed? | No. |
| Saved Audience criteria logic changed? | No. |
| Saved Audiences still dynamic? | Yes; criteria resolve through the current Users query. |
| member_count live and non-persisted? | Yes; database stores neither count nor membership IDs. |
| Newly matching user automatically included on next resolution? | Yes; the resolver re-queries current matching users, with no stored membership snapshot. |
| Notification integration added? | No. |
| WhatsApp integration added? | No. |
| Transit snapshot still shows Invalid Date? | No; valid IST display or Unavailable. |
| Obsolete U3/U4/U5 placeholder gone? | Yes from Customer 360. The separately deferred Upcoming Dasha Change filter shell remains; see item 21. |
| All relevant backend tests passed? | Yes: final 620/0 across the 11 required/directly relevant suites. |
| TypeScript passed? | Yes. |
| Focused frontend tests passed? | Yes, including all four browser suites. |
| Remaining build blocker unrelated to Users/Admin? | Yes; exactly 24 existing public-content prerender routes. |
| Temporary agent artifacts removed? | One-off editing helper, stale response dump, and audit baselines removed; useful tests and ignored evidence retained as itemized. |
| USERS MODULE v1.0 ready to freeze? | Technically yes; final U8 human spot-check remains before declaring the freeze accepted. |

Reproduction from the frontend directory (PowerShell):

```powershell
& '..\Jyotishasha_Backend\venv\Scripts\python.exe' scripts/u8-backend-regression.py
& '..\Jyotishasha_Backend\venv\Scripts\python.exe' scripts/u8-backend-regression.py --startup-check
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/typescript/bin/tsc --module commonjs --moduleResolution node --target es2021 --strict --skipLibCheck --esModuleInterop --outDir .u6b-test-out lib/admin/usersApi.ts lib/admin/audiencesApi.ts lib/admin/audiencesApi.test.ts lib/admin/formatTransitTimestamp.ts lib/admin/formatTransitTimestamp.test.ts
node .u6b-test-out/audiencesApi.test.js
node .u6b-test-out/formatTransitTimestamp.test.js
$env:U6B_PLAYWRIGHT='C:\Users\Laptop gallery\AppData\Local\npm-cache\_npx\e41f203b7505f1fb\node_modules\playwright'
node scripts/u8-users-regression.cjs
node scripts/u7-qa.cjs
node scripts/u6b-e2e.cjs # creates one clearly named local audience per run
node scripts/u6b-ui-regressions.cjs
$env:NODE_OPTIONS='--require ./.u6b-resume-preload.cjs'
$env:U6B_BUILD_OUTPUT='1'
npm run build # known external-content prerender blocker under local-only guard
```

Browser checks require the guarded local servers described in the retained U6B report. Run backend suites sequentially before browser checks to avoid transient fixture collisions. Run the build from a fresh terminal without U6B_DEV_OUTPUT set.

USERS U8 FINAL REGRESSION: READY TO FREEZE USERS MODULE v1.0
