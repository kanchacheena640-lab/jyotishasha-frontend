USERS U6B SAVED AUDIENCE FRONTEND REPORT

Resume verification — 2026-09-08

- Inspected both working trees, existing U6B implementation, QA scripts, fixture ledger, and previous build/server logs before continuing. The implementation and full create/edit/deactivate/reactivate E2E were already recorded as complete; no implementation was restarted or changed.
- Fresh checks passed: TypeScript (`tsc --noEmit --incremental false`), all 25 filter-mapping tests, `git diff --check`, and the existing browser regression suite (preview 503/save blocking/retry, shared controls/navigation, retained historical criteria, boolean cancellation, and page-2 pagination).
- The first browser attempt found the previous frontend server stopped (`ECONNREFUSED`). Restarted the existing guarded local backend and frontend, then reran successfully. The backend launcher freshly confirmed `current_database() = jyotishasha_local` before importing the app.
- Preserved the prior completed mutating E2E result rather than creating another QA audience. The fixture ledger remains unchanged with audience ID `4`; the fresh browser regressions persisted no fixtures.
- The earlier full build log still shows successful compilation followed by the same 24 unrelated public-page prerender failures. That completed build was not repeated because the local-only restriction and external-content dependency remain unchanged. No full-build success is claimed.
- No existing application/source/configuration files were edited during this continuation. Only this report and ignored local QA artifacts were written. `.u6b-resume-preload.cjs` uses a separate `.u6b-tsconfig.json` so Next's automatic QA configuration updates do not alter the existing `tsconfig.json`; its Git diff remains empty.
- Guarded review servers are running at `http://127.0.0.1:3000` and `http://127.0.0.1:5000` at handoff. Manual visual approval remains outstanding; the checklist below is retained.
- No commit, push, deployment, production access, reset, clean, restore, or reimplementation occurred. Existing uncommitted changes were preserved.

Implementation and local functional checks are complete. Full production build verification is blocked by existing public pages that fetch external content during prerendering. External connections remained blocked throughout QA. Manual visual QA has not been performed or approved.

1. **Handover Verification** — Confirmed both repositories, existing uncommitted work, backend model/service/criteria/routes, disabled Save Audience entry point, applied/draft filter split, and existing BFF session conventions. No material handover contradiction found.

2. **Repository / Working Tree Safety** — Both repositories remain on `main`. Inspected status, branch, and five recent commits before implementation. Backend starting commit: `1b366a7`; frontend: `71b362c`. Preserved existing changes. No reset, clean, checkout, git restore, stash, commit, push, or deployment. Backend source files were not edited. Next's automatic TypeScript configuration edits were removed; `tsconfig.json` has no final diff.

3. **Backend Contract Verified** — Read actual route, service, criteria validator, and model contracts. Verified the migration graph head and the local database revision are `9f2a5c7e1b83`. Executed `SELECT current_database()` and confirmed `jyotishasha_local` before further database work. Local launcher repeats this check before importing the app. Existing database guard and startup behavior remain intact. Create/detail/PATCH/DELETE return an audience directly; list returns `{audiences}`; previews return live `member_count`, `users`, and `pagination`. Saved preview also returns `audience`.

4. **BFF Routes** — Added `/api/admin/audiences` (GET/POST), `/api/admin/audiences/[id]` (GET/PATCH/DELETE), `/api/admin/audiences/[id]/preview` (GET), and `/api/admin/audiences/preview` (POST). They use the existing admin session and a shared server-only proxy. Bridge credentials stay server-side. Query strings, backend status, and response body are relayed. Redirects are rejected rather than forwarding credentials to another destination.

5. **Frontend API Types** — Added typed audience metadata, criteria, filters, preview, list, and mutation payloads. Preview reuses existing Users row/pagination types. No new `any` types.

6. **BasicFilters → Criteria Mapping** — One deterministic applied-filter conversion covers all 25 backend filters including search. Arrays remain arrays; houses/padas and ages are integers; booleans remain booleans; special characters remain literal strings. Empty/default filters are omitted. Invalid shapes/ages raise errors instead of becoming All Users. Tests compare every mapping against `buildUsersQuery()`. Audience editing also supports explicit false buyer/subscription criteria with Yes/No/Any controls, preserving the existing Users checkbox behavior.

7. **Save Audience Modal** — Native modal dialog with required name, optional description, readable criteria summary, Escape/Cancel, loading/error feedback, and duplicate-submit prevention. Takes a snapshot of committed `filters` and debounced `searchTerm`; never reads `draftFilters` or selected user IDs.

8. **Direct Preview** — Opens with a POST criteria preview. Shows the live count and requires successful preview before Save becomes available. Retry/cancel is available on failure. Changed criteria invalidate previous preview results. Metadata-only edits use saved-audience preview, allowing historical criteria to remain unchanged.

9. **Empty / All Users Audience** — Displays `Audience: All Users` and uses `{version:1,filters:{}}`. Verified both the empty direct preview and saving an audience with empty criteria.

10. **Create Flow** — Create closes the modal, shows success, preserves Users filters/results, and stays on Users. Saved Audiences is directly accessible beside Save Audience.

11. **Admin Navigation** — Order is Users → Audiences → Orders → App Version. Existing destinations remain unchanged.

12. **Audiences List** — Includes active and inactive audiences, description, status, timestamps, and View. Does not request member previews or calculate per-row member counts. Browser request monitoring confirmed zero preview calls on list navigation.

13. **Audience Detail** — Shows metadata, active/inactive state, readable criteria, live count, and member preview. Supports metadata/criteria editing, refresh, deactivation, and reactivation.

14. **Member Preview / Pagination** — Reuses the existing Users table without changing its columns. Requests 20 users per page. Member links use canonical `users.id`. Real navigation to `/admin/users/970501` succeeded. A controlled preview response verified page 2 requests and the disabled final-page Next button; this avoids inserting extra users just to exercise pagination.

15. **Edit Criteria** — Reuses UsersFilterPanel with separate audience draft state and a search field. Apply criteria triggers preview; Cancel criteria changes discards the draft. PATCH omits unchanged criteria. Explicit false buyer/subscription filters can be retained, changed, or cleared. No frontend astrology calculations.

16. **Inactive Ask Now Category Handling** — Stored concern names remain in the summary and editor even when absent from current options. They appear as retained historical/inactive choices. Failed option loading displays retained selections without erasing them. Backend authoring validation remains authoritative. Browser regression used a synthetic historical audience response; no category master rows were changed.

17. **Deactivate / Reactivate** — Deactivate uses DELETE after confirmation; reactivation PATCHes `{is_active:true}`. Real local tests verified inactive audiences remain previewable and can be reactivated.

18. **Error / Loading / Empty States** — Handles list/detail/preview failures, loading, empty list, zero members, and inactive state. Backend `message` is preferred over `error`. Real checks covered 401, 404, and 400. A simulated 503 proved Save stays disabled until retry succeeds. Other backend statuses, including 403, are preserved by the proxy.

19. **Existing Users Regression** — Real browser checks covered Apply/Cancel, applied filter count, saved-filter isolation, unchanged eight-column table, and member navigation. Mapping tests cover Ask Now, Dasha, Sade Sati, transit houses, and combined filters. Shared controls and Orders/App Version navigation passed. The existing local App Version API returns `404 no_policy_configured` for Android; no policy was inserted or modified. Notification/FCM files and behavior are untouched.

20. **Typecheck / Tests / Build** — Final `tsc --noEmit --incremental false` passed. Standalone mapping tests passed. Real local E2E and additional browser regressions passed. `git diff --check` passed. Full `npm run build` passed compilation and lint/type validation, then exited 1 during prerendering of 24 existing public routes: both blogs pages, both Navratri index pages, 18 Navratri detail pages, and both Panchang/tithi pages. These fetch external content, which the QA guard blocked. No U6B route was reported as failing. An existing locked `.next/trace` required isolated output; `next.config.js` was only adjusted in memory for QA. Logs are in `.u6b-build.log`.

21. **Local End-to-End Verification** — Real browser → Next BFF → Flask → verified local PostgreSQL workflow passed: Users filters → applied criteria → preview → create → list → detail/live count → Customer 360 link → edit/preview/save → deactivate → inactive preview → reactivate → All Users save. Browser and Node/Python network guards blocked non-loopback traffic. Programmatic functional checks do not constitute manual visual approval.

22. **QA Fixtures** — One persistent SavedAudience created through the UI: ID `4`, name `U6B QA 2026-09-07T17:35:40.657Z`. Final state: active, All Users criteria. No user IDs/category records were created, changed, or deleted. Historical audience ID `999999998` exists only in intercepted browser responses; it was not persisted. Existing user `970501` was opened read-only. `.u6b-qa-fixtures.json` records the persistent audience.

23. **Files Changed** — All implementation changes are in the frontend repository:

    - `.gitignore` — ignore local QA outputs.
    - `lib/admin/audiencesApi.ts`, `audiencesApi.test.ts`, `audiencesProxy.ts`.
    - `app/api/admin/audiences/route.ts`, `[id]/route.ts`, `preview/route.ts`, `[id]/preview/route.ts`.
    - `app/admin/audiences/page.tsx`, `[id]/page.tsx`.
    - `components/admin/audiences/AudienceEditor.tsx`, `AudienceDetail.tsx`, `AudiencesList.tsx`.
    - `components/admin/AdminNav.tsx`.
    - `components/admin/users/UsersPageClient.tsx`, `UsersFilterPanel.tsx`.
    - `scripts/u6b-local-backend.py`, `u6b-local-network.cjs`, `u6b-e2e.cjs`, `u6b-ui-regressions.cjs`.
    - This report. Existing `UsersTable.tsx`, `usersApi.ts`, Customer 360, backend rules, and Notification logic were not edited.

24. **Deferred Items** — Manual visual approval; full-project build verification under a configuration that supplies public-page content without production traffic; existing local Android version-policy seed. Customer 360 visual cleanup, Invalid Date cleanup, obsolete coming-soon copy, Notification integration, and other handover exclusions remain deferred.

25. **Manual Visual QA URLs + Exact Checklist** — Local servers were left running for review. Use `http://127.0.0.1:3000` (or localhost on the same machine):

    - `/admin/users`: open Filters, change several values, Cancel, then Save Audience. Confirm cancelled values are absent. Apply a concern, Dasha, Sade Sati, and transit-house selection; inspect chips and save summary. Remove chips and confirm current criteria update. Confirm default table still has Checkbox, User, Age, Status, Customer, Subscription, Last Active, View.
    - `/admin/users`: clear all filters and search. Open Save Audience; confirm All Users label, loading/count, required name, success feedback, preserved table, keyboard focus, Escape, and Cancel. Check long names/descriptions, narrow viewport, scrolling, and button states.
    - `/admin/audiences`: confirm compact list, active/inactive visibility, timestamps, empty/error states, and no per-row counts.
    - `/admin/audiences/4`: inspect metadata, All Users summary, live count, preview, and Refresh. Edit metadata; edit criteria including Yes/No/Any buyer/subscription states; Cancel and Apply separately. Save only after preview. Verify zero results remain distinct from failure.
    - `/admin/audiences/4`: deactivate with confirmation, refresh inactive preview, then reactivate. Verify the state wording and button labels.
    - `/admin/users/970501`: follow a real member link and inspect the unchanged Customer 360 page.
    - `/admin` and `/admin/app-version`: verify navigation highlighting and destinations. Expect the existing local no-policy error on App Version until that separate fixture is provided.
    - Historical criteria and preview-error cases can be reproduced with `scripts/u6b-ui-regressions.cjs`; its historical/pagination/error data are explicitly mocked. Manual inspection remains required; automated checks do not approve appearance.

Explicit answers:

| Question | Answer |
| --- | --- |
| Existing uncommitted changes preserved? | Yes. |
| Any reset/clean/restore performed? | No Git reset/clean/restore or destructive workspace operation. |
| Production touched? | No. External connections were blocked. |
| Backend business rules changed? | No. |
| Save uses applied filters only? | Yes, plus the applied/debounced search term. |
| Empty-filter All Users can be saved? | Yes, verified locally. |
| Member count calculated live? | Yes, by backend preview. |
| Member count stored anywhere? | Only transient React display state; no database, membership list, localStorage, or cached count field. |
| List causes N preview requests? | No; zero preview requests from list. |
| Inactive audiences previewable? | Yes, verified locally. |
| Reactivation supported? | Yes, verified locally. |
| Historical inactive concern preserved? | Yes; controlled browser regression passed. |
| Default Users table changed? | No. |
| Notification files/logic changed? | No. |
| TypeScript typecheck passed? | Yes. |
| Full production build passed? | No; external-content prerendering on 24 unrelated existing routes is blocked by local-only QA. Compilation/lint/types passed. |
| Manual visual QA required? | Yes; no visual approval is claimed. |

Reproduction commands (PowerShell, frontend directory):

```powershell
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/typescript/bin/tsc --module commonjs --moduleResolution node --target es2021 --strict --skipLibCheck --esModuleInterop --outDir .u6b-test-out lib/admin/usersApi.ts lib/admin/audiencesApi.ts lib/admin/audiencesApi.test.ts
node .u6b-test-out/audiencesApi.test.js

# Backend in a separate terminal; launcher validates the local database.
$env:PYTHONIOENCODING='utf-8'
& '..\Jyotishasha_Backend\venv\Scripts\python.exe' scripts/u6b-local-backend.py

# Frontend local server, isolated from the existing locked output.
$env:NODE_OPTIONS='--require ./scripts/u6b-local-network.cjs'
$env:U6B_DEV_OUTPUT='1'
node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3000

# Browser tests require the existing Playwright package; set U6B_PLAYWRIGHT
# to its absolute package directory if it is not locally installed.
node scripts/u6b-e2e.cjs # creates one new, clearly named QA audience per run
node scripts/u6b-ui-regressions.cjs # no persisted fixtures

# Full build, in a separate terminal without U6B_DEV_OUTPUT set:
$env:NODE_OPTIONS='--require ./scripts/u6b-local-network.cjs'
$env:U6B_BUILD_OUTPUT='1'
npm run build
```

USERS U6B SAVED AUDIENCE FRONTEND: BLOCKED — full production build requires external content on existing public pages, prohibited by local-only verification
