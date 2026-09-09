"use client";

/**
 * Users Module U2 -- the expandable filter panel.
 *
 * Groups A (User), B (Customer), D (Birth Astrology -- Moon Sign/
 * Lagna/Nakshatra/Pada, U3A+U3B.3), Yog/Dosh (U3B.3), Mahadasha/
 * Antardasha (U4A.4), and Sade Sati Status/Phase (U4B.3) are all real,
 * wired to the actual /admin/api/users query (BasicFilters,
 * lib/admin/usersApi.ts).
 *
 * "Upcoming Dasha Change" remains U1's original shell -- disabled and
 * labeled "Coming in U5", rendering from lib/admin/usersMockData.ts's
 * option lists purely as a placeholder preview with NO state that
 * reaches the real API query (no backend support exists for it yet).
 * Disabled controls cannot produce a value change, so "must not
 * influence the real query" is enforced structurally, not just by
 * convention.
 *
 * U5B -- "Ask Now Concern" is NOW REAL: the old disabled comingSoon
 * shell (usersMockData.ts::MOCK_CONCERN_CATEGORIES, a static preview
 * list) is REMOVED and replaced by a live, enabled multi-select whose
 * OPTIONS are fetched from the backend's own DB-backed category master
 * at mount time (lib/admin/usersApi.ts::fetchAskNowConcernCategories()
 * -> U5A's GET /admin/api/users/asknow-concerns) -- never a hardcoded
 * list. MOCK_CONCERN_CATEGORIES itself is left defined in
 * usersMockData.ts (nothing else references it) rather than deleted,
 * matching the exact precedent U3B.3/U4B.3 already established for
 * MOCK_TRAITS/MOCK_SADE_SATI_PHASES above. This section handles its own
 * loading/error state locally (see categoriesState below) so a
 * category-fetch failure degrades to a small inline message, never
 * crashing or disabling the rest of this modal.
 *
 * U4B.3 -- the old mock "Sade Sati" comingSoon group (disabled Any/Yes/
 * No + Phase/Stage <select>s driven by usersMockData.ts::
 * MOCK_SADE_SATI_PHASES) is REMOVED, replaced by two real sections,
 * "Sade Sati Status" (tri-state Any/Active/Inactive <select>, matching
 * the existing Status/Customer Type pattern -- appropriate for a
 * boolean backend filter) and "Sade Sati Phase" (multi-select over the
 * exact 3 canonical SADE_SATI_PHASE_OPTIONS strings from
 * lib/admin/usersApi.ts). There is deliberately no "Not Calculated"
 * option -- the backend does not support filtering on that state in
 * U4B v1. MOCK_SADE_SATI_PHASES itself is left defined in
 * usersMockData.ts (nothing else references it) rather than deleted,
 * to keep this change's diff minimal, matching the U3B.3 precedent for
 * MOCK_TRAITS above.
 *
 * U3B.3 -- the old mock "Yog & Dosh" group (usersMockData.ts::
 * MOCK_TRAITS, which included 3 Dosh that were never actually
 * supported by any backend evaluator) is REMOVED, replaced by two real
 * sections, "Yog" and "Dosh", fed by the backend's own canonical
 * machine-key registries via lib/admin/usersApi.ts's YOG_LABELS/
 * DOSH_LABELS. MOCK_TRAITS itself is left defined in usersMockData.ts
 * (nothing else references it) rather than deleted, to keep this
 * change's diff minimal.
 *
 * U4C.4 -- a NEW real "Current Transit Houses" group (Jupiter/Saturn/
 * Rahu/Ketu, U4C.3's own v1 filter scope), each a multi-select over
 * House 1-12 (lib/admin/usersApi.ts's TRANSIT_HOUSE_OPTIONS). Derived
 * backend-side from persisted AppUser.lagna + the backend's own
 * resolved current transit rashi (U4C.3) -- never calculated here, and
 * never an astrology-interpretation label (no "Career House"/"Marriage
 * House" -- see this task's own explicit instruction). This has no
 * mock-shell precursor to remove -- it did not exist before U4C.4.
 *
 * U4A.4 -- the old combined "Dasha" comingSoon group is split in two:
 * its Mahadasha/Antardasha controls (previously disabled <select>
 * placeholders using the mock PLANETS list) are REMOVED and replaced
 * by two real "Mahadasha"/"Antardasha" sections, filtering the
 * backend's persisted CURRENT Dasha (U4A.1-U4A.3) -- never calculated
 * here. The group's other half ("Upcoming MD Planet"/"Window", which
 * has no backend support yet) remains a disabled "Upcoming Dasha
 * Change" placeholder, unchanged in behavior.
 *
 * Users Visual QA Fix #1: this component no longer owns its own outer
 * card/header chrome or a Close button -- it now renders only the
 * filter sections themselves. UsersPageClient wraps it in a modal/popup
 * (with the header, Close/X, and Clear/Apply footer) and passes it
 * `draftFilters`/`setDraftFilters` instead of the applied `filters`
 * state, so edits here no longer reach the real query until "Apply
 * Filters" is clicked there.
 */

import { useEffect, useState } from "react";
import {
  UPCOMING_WINDOWS,
} from "@/lib/admin/usersMockData";
import {
  BasicFilters,
  UserStatus,
  CustomerType,
  BIRTH_ASTROLOGY_SIGN_OPTIONS,
  BIRTH_ASTROLOGY_NAKSHATRA_OPTIONS,
  BIRTH_ASTROLOGY_PADA_OPTIONS,
  YOG_LABELS,
  YOG_OPTIONS,
  DOSH_LABELS,
  DOSH_OPTIONS,
  DASHA_LORD_OPTIONS,
  SADE_SATI_PHASE_OPTIONS,
  SadeSatiPhase,
  TRANSIT_HOUSE_OPTIONS,
  fetchAskNowConcernCategories,
} from "@/lib/admin/usersApi";
import TraitMultiSelect, { TraitMultiSelectOption } from "./TraitMultiSelect";
import type { AudienceBooleanFilters } from "@/lib/admin/audiencesApi";

// U3A -- Moon Sign and Lagna share the same 12-sign option list; each
// value's id/label are simply the sign/nakshatra name itself (these are
// real, canonical stored values, not synthetic ids).
const SIGN_MULTISELECT_OPTIONS: TraitMultiSelectOption[] = BIRTH_ASTROLOGY_SIGN_OPTIONS.map((s) => ({ id: s, label: s }));
const NAKSHATRA_MULTISELECT_OPTIONS: TraitMultiSelectOption[] = BIRTH_ASTROLOGY_NAKSHATRA_OPTIONS.map((n) => ({ id: n, label: n }));

// U3B.3 -- Pada options; TraitMultiSelect's ids are strings, so the
// canonical integers are stringified only at this UI boundary (the
// filter STATE itself stays number[], per lib/admin/usersApi.ts).
const PADA_MULTISELECT_OPTIONS: TraitMultiSelectOption[] = BIRTH_ASTROLOGY_PADA_OPTIONS.map((p) => ({
  id: String(p),
  label: `Pada ${p}`,
}));

// U3B.3 -- real Yog options, replacing the old MOCK_TRAITS placeholder
// list entirely. Panch Mahapurush's umbrella + 5 sub-yogs are grouped
// together (TraitMultiSelect's own `group` field, already designed for
// exactly this by U1) so 19 options stay scannable without a redesign.
const YOG_MULTISELECT_OPTIONS: TraitMultiSelectOption[] = YOG_OPTIONS.map((key) => ({
  id: key,
  label: YOG_LABELS[key],
  group: key.startsWith("panch_mahapurush") ? "Panch Mahapurush" : undefined,
}));

// U3B.3 -- real Dosh options (exactly 2 -- Manglik, Kaal Sarp).
const DOSH_MULTISELECT_OPTIONS: TraitMultiSelectOption[] = DOSH_OPTIONS.map((key) => ({
  id: key,
  label: DOSH_LABELS[key],
}));

// U4A.4 -- real Mahadasha/Antardasha options: exactly the 9 canonical
// Vimshottari lord names. Unlike Yog/Dosh these are already
// human-readable planet names, not machine keys, so id === label --
// no separate label map is introduced (would be exactly the "alternate
// name that changes meaning" this task explicitly forbids). Both
// filter dimensions share the same option list.
const DASHA_LORD_MULTISELECT_OPTIONS: TraitMultiSelectOption[] = DASHA_LORD_OPTIONS.map((lord) => ({
  id: lord,
  label: lord,
}));

// U4B.3 -- real Sade Sati Phase options: exactly the 3 canonical
// phase strings. Like Mahadasha/Antardasha, id === label -- the
// canonical value IS the display value, no alternate/renamed label.
const SADE_SATI_PHASE_MULTISELECT_OPTIONS: TraitMultiSelectOption[] = SADE_SATI_PHASE_OPTIONS.map((phase) => ({
  id: phase,
  label: phase,
}));

// U4C.4 -- real House 1-12 options, shared by all 4 Current Transit
// House filters below. Plain numbers only -- deliberately no astrology
// interpretation label (this is an audience-intelligence/filtering
// tool, not a prediction UI). TraitMultiSelect's ids are strings, so
// the canonical integers are stringified only at this UI boundary
// (the filter STATE itself stays number[], per lib/admin/usersApi.ts
// -- same pattern Nakshatra Pada above already established).
const TRANSIT_HOUSE_MULTISELECT_OPTIONS: TraitMultiSelectOption[] = TRANSIT_HOUSE_OPTIONS.map((h) => ({
  id: String(h),
  label: `House ${h}`,
}));

interface Props {
  filters: BasicFilters;
  onChange: (filters: BasicFilters) => void;
  booleanCriteria?: AudienceBooleanFilters;
  onBooleanCriteriaChange?: (value: AudienceBooleanFilters) => void;
}

function Section({ title, children, comingSoon }: { title: string; children: React.ReactNode; comingSoon?: boolean }) {
  return (
    <div className="border-t border-gray-100 pt-3 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-2 mb-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</p>
        {comingSoon && (
          <span className="text-[10px] font-medium bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">
            Coming in U3/U4/U5
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

const inputCls = "border border-gray-200 rounded px-2 py-1.5 text-sm text-black w-full";
const disabledInputCls = "border border-gray-200 rounded px-2 py-1.5 text-sm text-gray-400 w-full bg-gray-50 cursor-not-allowed";
const labelCls = "text-xs text-gray-500 block mb-1";

export default function UsersFilterPanel({ filters, onChange, booleanCriteria, onBooleanCriteriaChange }: Props) {
  function set<K extends keyof BasicFilters>(key: K, value: BasicFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  // U5B -- Ask Now Concern categories are dynamic, DB-backed data (U5A),
  // fetched fresh every time this panel mounts (i.e. every time the
  // Filters modal is opened -- UsersPageClient.tsx only mounts this
  // component while the modal is open) so a category added/disabled via
  // a future Admin Dashboard is reflected the next time an Admin opens
  // Filters, with no extra caching logic here. A failure degrades to a
  // small inline message ONLY for this one section -- every other
  // filter in this modal remains fully usable.
  const [concernCategoriesState, setConcernCategoriesState] = useState<"loading" | "ready" | "error">("loading");
  const [concernCategories, setConcernCategories] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    setConcernCategoriesState("loading");
    fetchAskNowConcernCategories()
      .then((categories) => {
        if (cancelled) return;
        setConcernCategories(categories);
        setConcernCategoriesState("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setConcernCategoriesState("error");
      });
    return () => { cancelled = true; };
  }, []);

  const retainedConcerns = filters.askNowConcern.filter(c => !concernCategories.includes(c));
  const CONCERN_MULTISELECT_OPTIONS: TraitMultiSelectOption[] = concernCategories.map((c) => ({
    id: c,
    label: c,
  })).concat(retainedConcerns.map(c => ({ id: c, label: `${c} (retained historical/inactive)` })));

  return (
    <div className="space-y-4">
      <Section title="Language">
        <TraitMultiSelect options={[{ id: "en", label: "English" }, { id: "hi", label: "Hindi" }]}
          selectedIds={filters.language} onChange={(ids) => set("language", ids)} placeholder="Search languages..." />
      </Section>
      {/* A. USER -- real */}
      <Section title="User">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className={labelCls}>Age min</label>
            <input type="number" className={inputCls} value={filters.ageMin} onChange={(e) => set("ageMin", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Age max</label>
            <input type="number" className={inputCls} value={filters.ageMax} onChange={(e) => set("ageMax", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select className={inputCls} value={filters.status} onChange={(e) => set("status", e.target.value as UserStatus | "any")}>
              <option value="any">Any</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div />
          <div>
            <label className={labelCls}>Signup from</label>
            <input type="date" className={inputCls} value={filters.signupFrom} onChange={(e) => set("signupFrom", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Signup to</label>
            <input type="date" className={inputCls} value={filters.signupTo} onChange={(e) => set("signupTo", e.target.value)} />
          </div>
        </div>
      </Section>

      {/* B. CUSTOMER -- real */}
      <Section title="Customer">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className={labelCls}>Free / Paying</label>
            <select className={inputCls} value={filters.customerType} onChange={(e) => set("customerType", e.target.value as CustomerType | "any")}>
              <option value="any">Any</option>
              <option value="free">Free</option>
              <option value="paying">Paying</option>
            </select>
          </div>
          {booleanCriteria && onBooleanCriteriaChange ? <>{([['askNowBuyer', 'Ask Now Buyer'], ['activeSubscription', 'Active Subscription']] as const).map(([key, label]) => <label key={key} className="text-xs text-gray-500">{label}<select aria-label={label} className={inputCls} value={booleanCriteria[key]} onChange={e => onBooleanCriteriaChange({ ...booleanCriteria, [key]: e.target.value as "any" | "true" | "false" })}><option value="any">Any</option><option value="true">Yes</option><option value="false">No</option></select></label>)}</> : <>
          <label className="flex items-center gap-2 text-sm text-gray-700 mt-4">
            <input type="checkbox" checked={filters.askNowBuyer} onChange={(e) => set("askNowBuyer", e.target.checked)} />
            Ask Now Buyer
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 mt-4">
            <input type="checkbox" checked={filters.activeSubscription} onChange={(e) => set("activeSubscription", e.target.checked)} />
            Active Subscription
          </label>
          </>}
        </div>
      </Section>

      {/* C. ASK NOW CONCERN -- U5B: real, enabled, multi-select (OR
          within this dimension, AND with every other filter here --
          enforced backend-side via U5A's EXISTS filter, same convention
          as Yog/Dosh/Mahadasha/Antardasha above). Options are fetched
          live from the backend's DB-backed category master -- never
          hardcoded (see concernCategories state above). */}
      <Section title="Ask Now Concern">
        {concernCategoriesState !== "ready" && filters.askNowConcern.length > 0 && <p className="text-xs text-gray-600">Retained concern criteria: {filters.askNowConcern.join(", ")}. Category availability is not yet confirmed.</p>}
        {concernCategoriesState === "loading" && (
          <p className="text-sm text-gray-400">Loading concern categories...</p>
        )}
        {concernCategoriesState === "error" && (
          <p className="text-sm text-amber-600">Ask Now concern categories are temporarily unavailable.</p>
        )}
        {concernCategoriesState === "ready" && (
          <TraitMultiSelect
            options={CONCERN_MULTISELECT_OPTIONS}
            selectedIds={filters.askNowConcern}
            onChange={(ids) => set("askNowConcern", ids)}
            placeholder="Search concern..."
          />
        )}
      </Section>

      {/* D. BIRTH ASTROLOGY -- U3A: Moon Sign/Lagna/Nakshatra. U3B.3
          adds Pada, all REAL, enabled, multi-select filters (OR within
          one dimension, AND across dimensions -- enforced backend-side).
          Values are the exact canonical strings/integers app_users.
          moon_sign/lagna/nakshatra/nakshatra_pada can hold. */}
      <Section title="Birth Astrology">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className={labelCls}>Moon Sign / Rashi</label>
            <TraitMultiSelect
              options={SIGN_MULTISELECT_OPTIONS}
              selectedIds={filters.moonSign}
              onChange={(ids) => set("moonSign", ids)}
              placeholder="Search sign..."
            />
          </div>
          <div>
            <label className={labelCls}>Lagna / Ascendant</label>
            <TraitMultiSelect
              options={SIGN_MULTISELECT_OPTIONS}
              selectedIds={filters.lagna}
              onChange={(ids) => set("lagna", ids)}
              placeholder="Search sign..."
            />
          </div>
          <div>
            <label className={labelCls}>Nakshatra</label>
            <TraitMultiSelect
              options={NAKSHATRA_MULTISELECT_OPTIONS}
              selectedIds={filters.nakshatra}
              onChange={(ids) => set("nakshatra", ids)}
              placeholder="Search nakshatra..."
            />
          </div>
          <div>
            <label className={labelCls}>Nakshatra Pada</label>
            <TraitMultiSelect
              options={PADA_MULTISELECT_OPTIONS}
              selectedIds={filters.nakshatraPada.map(String)}
              onChange={(ids) => set("nakshatraPada", ids.map(Number))}
              placeholder="Search pada..."
            />
          </div>
        </div>
      </Section>

      {/* G1. YOG -- U3B.3: real, enabled, multi-select (ANY/OR across
          selections, enforced backend-side -- this UI never needs to
          explain that). 19 canonical machine keys, shown as readable
          labels only (YOG_LABELS, lib/admin/usersApi.ts) -- replaces
          the old MOCK_TRAITS placeholder entirely. Panch Mahapurush's
          umbrella + 5 sub-yogs are grouped for readability. */}
      <Section title="Yog">
        <TraitMultiSelect
          options={YOG_MULTISELECT_OPTIONS}
          selectedIds={filters.yog}
          onChange={(ids) => set("yog", ids)}
          placeholder="Search Yog..."
        />
      </Section>

      {/* G2. DOSH -- U3B.3: real, enabled, multi-select. Exactly the 2
          currently-supported Dosh -- Pitra/Guru Chandal/Grahan Dosh
          (old MOCK_TRAITS entries) are gone, never real. */}
      <Section title="Dosh">
        <TraitMultiSelect
          options={DOSH_MULTISELECT_OPTIONS}
          selectedIds={filters.dosh}
          onChange={(ids) => set("dosh", ids)}
          placeholder="Search Dosh..."
        />
      </Section>

      {/* E1. MAHADASHA -- U4A.4: real, enabled, multi-select (OR within
          this dimension; AND with Antardasha below and every other
          filter -- enforced backend-side, same convention as Yog/Dosh
          above). Reads/filters ONLY the backend's persisted CURRENT
          Mahadasha (U4A.1-U4A.3) -- never calculated here. */}
      <Section title="Mahadasha">
        <TraitMultiSelect
          options={DASHA_LORD_MULTISELECT_OPTIONS}
          selectedIds={filters.mahadasha}
          onChange={(ids) => set("mahadasha", ids)}
          placeholder="Search Mahadasha..."
        />
      </Section>

      {/* E2. ANTARDASHA -- U4A.4: same real, enabled, multi-select
          pattern, filtering the CURRENT Antardasha. Combined with
          Mahadasha above via AND -- both are guaranteed by the backend
          to come from the same current timeline row (U4A.3). */}
      <Section title="Antardasha">
        <TraitMultiSelect
          options={DASHA_LORD_MULTISELECT_OPTIONS}
          selectedIds={filters.antardasha}
          onChange={(ids) => set("antardasha", ids)}
          placeholder="Search Antardasha..."
        />
      </Section>

      {/* E3. UPCOMING DASHA CHANGE -- U4+/U5 placeholder shell, disabled.
          Distinct from the now-real CURRENT Mahadasha/Antardasha
          filters above: predicting an upcoming Dasha transition has no
          backend support yet (U4A.3 only exposed the CURRENT row), so
          this stays a disabled preview, never wired to the real query. */}
      <Section title="Upcoming Dasha Change" comingSoon>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <select className={disabledInputCls} disabled>
            <option>Upcoming MD Planet: Any</option>
          </select>
          <select className={disabledInputCls} disabled>
            <option>Window: Any</option>
            {UPCOMING_WINDOWS.map((w) => <option key={w.id}>{w.label}</option>)}
          </select>
        </div>
      </Section>

      {/* F1. SADE SATI STATUS -- U4B.3: real, enabled, tri-state
          single-select (Any/Active/Inactive), matching the existing
          Status/Customer Type "any"-sentinel pattern above -- the
          right shape for a boolean backend filter. There is
          deliberately no "Not Calculated" option: the backend does not
          support filtering on that state in U4B v1. Derived read-only
          from persisted moon_sign + the backend's own resolved current
          Saturn sign (U4B.1/U4B.2) -- never calculated here. */}
      <Section title="Sade Sati Status">
        <select
          className={inputCls}
          value={filters.sadeSatiActive}
          onChange={(e) => set("sadeSatiActive", e.target.value as "any" | "true" | "false")}
        >
          <option value="any">Any</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </Section>

      {/* F2. SADE SATI PHASE -- U4B.3: real, enabled, multi-select (OR
          within this dimension, AND with Status above and every other
          filter -- enforced backend-side, same convention as Yog/Dosh/
          Mahadasha/Antardasha). Exactly the 3 canonical phase strings
          -- never a Rising/Peak/Setting alias. */}
      <Section title="Sade Sati Phase">
        <TraitMultiSelect
          options={SADE_SATI_PHASE_MULTISELECT_OPTIONS}
          selectedIds={filters.sadeSatiPhase}
          onChange={(ids) => set("sadeSatiPhase", ids as SadeSatiPhase[])}
          placeholder="Search phase..."
        />
      </Section>

      {/* H. CURRENT TRANSIT HOUSES -- U4C.4: real, enabled, multi-select
          per planet (OR within one planet's House selections, AND
          across Jupiter/Saturn/Rahu/Ketu and every other filter here --
          enforced backend-side, same convention as Yog/Dosh/Mahadasha/
          Antardasha above). U4C.3's own v1 filter scope: these 4
          slower-moving bodies only -- User Detail shows all 9 (see
          app/admin/users/[id]/page.tsx), but Sun/Moon/Mercury/Venus/Mars
          change house too quickly to be useful FILTER dimensions.
          Derived backend-side from persisted AppUser.lagna + the
          backend's own resolved current transit rashi -- never
          calculated here. */}
      <Section title="Current Transit Houses">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Jupiter House</label>
            <TraitMultiSelect
              options={TRANSIT_HOUSE_MULTISELECT_OPTIONS}
              selectedIds={filters.jupiterHouse.map(String)}
              onChange={(ids) => set("jupiterHouse", ids.map(Number))}
              placeholder="Search house..."
            />
          </div>
          <div>
            <label className={labelCls}>Saturn House</label>
            <TraitMultiSelect
              options={TRANSIT_HOUSE_MULTISELECT_OPTIONS}
              selectedIds={filters.saturnHouse.map(String)}
              onChange={(ids) => set("saturnHouse", ids.map(Number))}
              placeholder="Search house..."
            />
          </div>
          <div>
            <label className={labelCls}>Rahu House</label>
            <TraitMultiSelect
              options={TRANSIT_HOUSE_MULTISELECT_OPTIONS}
              selectedIds={filters.rahuHouse.map(String)}
              onChange={(ids) => set("rahuHouse", ids.map(Number))}
              placeholder="Search house..."
            />
          </div>
          <div>
            <label className={labelCls}>Ketu House</label>
            <TraitMultiSelect
              options={TRANSIT_HOUSE_MULTISELECT_OPTIONS}
              selectedIds={filters.ketuHouse.map(String)}
              onChange={(ids) => set("ketuHouse", ids.map(Number))}
              placeholder="Search house..."
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
