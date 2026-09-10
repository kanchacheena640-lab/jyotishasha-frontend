"use client";

/**
 * Users Module U2 -- orchestrates /admin/users against the REAL
 * /api/admin/users BFF route (lib/admin/usersApi.ts) for every U2-
 * supported field: summary cards, user rows, search, age, status,
 * signup date, free/paying, Ask Now buyer, active subscription, and
 * pagination.
 *
 * Advanced filters: Birth Astrology (U3A), Yog & Dosh (U3B.3), current
 * Mahadasha/Antardasha (U4A.4), Sade Sati Status/Phase (U4B.3),
 * current-Transit-House Jupiter/Saturn/Rahu/Ketu (U4C.4), and Ask Now
 * Concern (U5B, backed by U5A's ask_now_intent_history EXISTS filter --
 * option list fetched live from the backend, never hardcoded) are real
 * and wired into BasicFilters/the query built here. Upcoming Dasha
 * Change remains U1's disabled mock shell inside UsersFilterPanel -- it
 * never influences the query (BasicFilters has no field for it at all,
 * so there is nothing to accidentally wire up).
 *
 * U4B.3 -- the backend can return 503 {"error": "sade_sati_unavailable"}
 * when it cannot resolve the current Saturn sign. No special-casing is
 * needed here: lib/admin/usersApi.ts's parseJsonOrThrow() already
 * translates that into a generic Error("Astrology data is temporarily
 * unavailable."), and the existing .catch() below already turns any
 * thrown Error into a real error state (setErrorMessage + tableState
 * "error") -- never an empty user list.
 *
 * U4C.4 -- the backend can likewise return 503
 * {"error": "transit_unavailable"} when it cannot resolve the current
 * transit snapshot (needed whenever any of the 4 new House filters are
 * applied). Same story: parseJsonOrThrow() already translates that into
 * its own distinct Error("Current transit data is temporarily
 * unavailable."), handled by the exact same .catch() below -- no new
 * branching needed here.
 *
 * U1's dev-only loading/error/reset demo buttons are removed -- real
 * network loading/error states now exist and are driven by the actual
 * fetch below.
 *
 * Users Visual QA Fix #1: the filter panel is now a popup/modal instead
 * of a permanent inline panel that pushed the table down the page, and
 * it uses a draft/applied split -- `draftFilters` is a scratch copy
 * edited only while the modal is open (seeded from `filters` on open,
 * discarded on Close/X/Escape-equivalent), and never appears in the
 * effect below that drives fetchAdminUsers, so editing draft filters
 * cannot trigger a fetch or change the visible table. Only "Apply
 * Filters" commits draftFilters into the real `filters` state (via the
 * existing updateFilters, which also resets pagination to page 1) and
 * closes the modal. Chip removal and "Clear All" intentionally keep
 * calling updateFilters/setFilters directly (bypassing the draft
 * entirely) so they remain instant, per the approved spec.
 *
 * U2.1 Data Enrichment -- the long internal business-rule paragraph
 * ("Active = identified activity within the last 30 days. Paying = ...")
 * is removed outright (not replaced with another long explanation, per
 * that task's explicit instruction) -- the definitions it described now
 * live in modules/services/admin_users_service.py's own docstring
 * (backend), not on the operator-facing dashboard.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AudienceEditor from "../audiences/AudienceEditor";
import CreateFixedAudienceModal from "../audiences/CreateFixedAudienceModal";
import { SavedAudienceCriteria, appliedFiltersToCriteria } from "@/lib/admin/audiencesApi";
import {
  BasicFilters,
  EMPTY_BASIC_FILTERS,
  RealUsersListResponse,
  fetchAdminUsers,
  YOG_LABELS,
  DOSH_LABELS,
} from "@/lib/admin/usersApi";
import UsersFilterPanel from "./UsersFilterPanel";
import UsersTable, { UsersTableState } from "./UsersTable";

const PAGE_SIZE = 8;

interface Chip { key: string; label: string; clear: () => void; }

export default function UsersPageClient() {
  const [saveCriteria, setSaveCriteria] = useState<SavedAudienceCriteria | null>(null);
  const [showCreateFixed, setShowCreateFixed] = useState(false);
  const [audienceNotice, setAudienceNotice] = useState("");
  const [audienceError, setAudienceError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // debounced
  const [filters, setFilters] = useState<BasicFilters>(EMPTY_BASIC_FILTERS);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  // Scratch copy edited only inside the Filters popup -- see the
  // Users Visual QA Fix #1 note above. Never read by the fetch effect.
  const [draftFilters, setDraftFilters] = useState<BasicFilters>(EMPTY_BASIC_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [data, setData] = useState<RealUsersListResponse | null>(null);
  const [tableState, setTableState] = useState<UsersTableState>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  // Debounce free-text search so every keystroke doesn't fire a request.
  useEffect(() => {
    const t = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    let cancelled = false;
    setTableState("loading");
    fetchAdminUsers(searchTerm, filters, page, PAGE_SIZE)
      .then((res) => {
        if (cancelled) return;
        setData(res);
        setTableState("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        setErrorMessage(err instanceof Error ? err.message : "Couldn't load users.");
        setTableState("error");
      });
    return () => { cancelled = true; };
  }, [searchTerm, filters, page]);

  function refetch() {
    // Re-triggers the effect above by touching a dependency-neutral
    // path: simplest is to re-run with the same args via a manual call.
    setTableState("loading");
    fetchAdminUsers(searchTerm, filters, page, PAGE_SIZE)
      .then((res) => { setData(res); setTableState("ready"); })
      .catch((err) => {
        setErrorMessage(err instanceof Error ? err.message : "Couldn't load users.");
        setTableState("error");
      });
  }

  function updateFilters(next: BasicFilters) {
    setFilters(next);
    setPage(1);
  }

  // Filters popup lifecycle (Users Visual QA Fix #1) --------------------
  function openFilterPanel() {
    setDraftFilters(filters); // seed the draft from the currently-applied filters
    setFilterPanelOpen(true);
  }
  function closeFilterPanelWithoutApplying() {
    // Discard the draft -- do NOT touch `filters`/the fetch effect.
    setFilterPanelOpen(false);
  }
  function resetDraftFilters() {
    setDraftFilters(EMPTY_BASIC_FILTERS);
  }
  function applyFilters() {
    updateFilters(draftFilters); // commits + resets pagination to page 1
    setFilterPanelOpen(false);
  }

  function clearAllFilters() {
    setFilters(EMPTY_BASIC_FILTERS);
    setSearchInput("");
    setSearchTerm("");
    setPage(1);
  }

  function toggleSelect(id: number) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }
  function toggleSelectAllOnPage(ids: number[], checked: boolean) {
    setSelectedIds((prev) =>
      checked ? Array.from(new Set([...prev, ...ids])) : prev.filter((id) => !ids.includes(id))
    );
  }

  const chips: Chip[] = useMemo(() => {
    const list: Chip[] = [];
    for (const lang of filters.language) list.push({ key: `language-${lang}`, label: lang === "hi" ? "Hindi" : "English",
      clear: () => updateFilters({ ...filters, language: filters.language.filter(v => v !== lang) }) });
    if (filters.ageMin || filters.ageMax) {
      list.push({
        key: "age",
        label: `Age ${filters.ageMin || "0"}–${filters.ageMax || "∞"}`,
        clear: () => updateFilters({ ...filters, ageMin: "", ageMax: "" }),
      });
    }
    if (filters.status !== "any") {
      list.push({ key: "status", label: filters.status[0].toUpperCase() + filters.status.slice(1), clear: () => updateFilters({ ...filters, status: "any" }) });
    }
    if (filters.signupFrom || filters.signupTo) {
      list.push({ key: "signup", label: `Signup ${filters.signupFrom || "…"} → ${filters.signupTo || "…"}`, clear: () => updateFilters({ ...filters, signupFrom: "", signupTo: "" }) });
    }
    if (filters.customerType !== "any") {
      list.push({ key: "customerType", label: filters.customerType === "paying" ? "Paying" : "Free", clear: () => updateFilters({ ...filters, customerType: "any" }) });
    }
    if (filters.askNowBuyer) {
      list.push({ key: "askNowBuyer", label: "Ask Now Buyer", clear: () => updateFilters({ ...filters, askNowBuyer: false }) });
    }
    if (filters.activeSubscription) {
      list.push({ key: "activeSub", label: "Active Subscription", clear: () => updateFilters({ ...filters, activeSubscription: false }) });
    }
    // U3A -- Birth Astrology chips. Each chip represents one whole
    // dimension (possibly multiple OR'd values), matching every other
    // chip's granularity here (e.g. the age chip clears min+max
    // together) -- removing a chip clears that entire dimension.
    if (filters.moonSign.length > 0) {
      list.push({ key: "moonSign", label: `Moon Sign: ${filters.moonSign.join(", ")}`, clear: () => updateFilters({ ...filters, moonSign: [] }) });
    }
    if (filters.lagna.length > 0) {
      list.push({ key: "lagna", label: `Lagna: ${filters.lagna.join(", ")}`, clear: () => updateFilters({ ...filters, lagna: [] }) });
    }
    if (filters.nakshatra.length > 0) {
      list.push({ key: "nakshatra", label: `Nakshatra: ${filters.nakshatra.join(", ")}`, clear: () => updateFilters({ ...filters, nakshatra: [] }) });
    }
    // U3B.3 -- Pada/Yog/Dosh chips. Yog/Dosh chips show human-readable
    // labels (YOG_LABELS/DOSH_LABELS), never raw machine keys.
    if (filters.nakshatraPada.length > 0) {
      list.push({ key: "nakshatraPada", label: `Pada: ${filters.nakshatraPada.join(", ")}`, clear: () => updateFilters({ ...filters, nakshatraPada: [] }) });
    }
    if (filters.yog.length > 0) {
      list.push({
        key: "yog",
        label: `Yog: ${filters.yog.map((k) => YOG_LABELS[k] || k).join(", ")}`,
        clear: () => updateFilters({ ...filters, yog: [] }),
      });
    }
    if (filters.dosh.length > 0) {
      list.push({
        key: "dosh",
        label: `Dosh: ${filters.dosh.map((k) => DOSH_LABELS[k] || k).join(", ")}`,
        clear: () => updateFilters({ ...filters, dosh: [] }),
      });
    }
    // U4A.4 -- Mahadasha/Antardasha chips. Values are already
    // human-readable canonical lord names (no label map needed, unlike
    // Yog/Dosh's machine keys), so they're shown verbatim.
    if (filters.mahadasha.length > 0) {
      list.push({ key: "mahadasha", label: `Mahadasha: ${filters.mahadasha.join(", ")}`, clear: () => updateFilters({ ...filters, mahadasha: [] }) });
    }
    if (filters.antardasha.length > 0) {
      list.push({ key: "antardasha", label: `Antardasha: ${filters.antardasha.join(", ")}`, clear: () => updateFilters({ ...filters, antardasha: [] }) });
    }
    // U4B.3 -- Sade Sati chips. sadeSatiActive is tri-state (its own
    // chip, cleared back to "any"); sadeSatiPhase is a separate
    // multi-select-OR dimension, matching the Mahadasha/Antardasha
    // chip pattern above exactly.
    if (filters.sadeSatiActive !== "any") {
      list.push({
        key: "sadeSatiActive",
        label: `Sade Sati: ${filters.sadeSatiActive === "true" ? "Active" : "Inactive"}`,
        clear: () => updateFilters({ ...filters, sadeSatiActive: "any" }),
      });
    }
    if (filters.sadeSatiPhase.length > 0) {
      list.push({
        key: "sadeSatiPhase",
        label: `Sade Sati Phase: ${filters.sadeSatiPhase.join(", ")}`,
        clear: () => updateFilters({ ...filters, sadeSatiPhase: [] }),
      });
    }
    // U4C.4 -- Current Transit House chips (Jupiter/Saturn/Rahu/Ketu).
    // Each is its own dimension, same granularity as Mahadasha/Antardasha
    // above -- removing a chip clears that whole planet's House
    // selection. Labels show plain "House N" values (never the raw
    // query param name jupiter_house=7), joined for multi-select.
    if (filters.jupiterHouse.length > 0) {
      list.push({
        key: "jupiterHouse",
        label: `Jupiter: House ${filters.jupiterHouse.join(", ")}`,
        clear: () => updateFilters({ ...filters, jupiterHouse: [] }),
      });
    }
    if (filters.saturnHouse.length > 0) {
      list.push({
        key: "saturnHouse",
        label: `Saturn: House ${filters.saturnHouse.join(", ")}`,
        clear: () => updateFilters({ ...filters, saturnHouse: [] }),
      });
    }
    if (filters.rahuHouse.length > 0) {
      list.push({
        key: "rahuHouse",
        label: `Rahu: House ${filters.rahuHouse.join(", ")}`,
        clear: () => updateFilters({ ...filters, rahuHouse: [] }),
      });
    }
    if (filters.ketuHouse.length > 0) {
      list.push({
        key: "ketuHouse",
        label: `Ketu: House ${filters.ketuHouse.join(", ")}`,
        clear: () => updateFilters({ ...filters, ketuHouse: [] }),
      });
    }
    // U5B -- Ask Now Concern chip. One chip for the whole dimension
    // (multiple selected categories shown comma-joined), matching every
    // other multi-select chip's granularity above -- removing it clears
    // the entire dimension. Category names are shown verbatim (they are
    // already human-readable) -- never the raw query param
    // (ask_now_concern=...).
    if (filters.askNowConcern.length > 0) {
      list.push({
        key: "askNowConcern",
        label: `Ask Now: ${filters.askNowConcern.join(", ")}`,
        clear: () => updateFilters({ ...filters, askNowConcern: [] }),
      });
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const summary = data?.summary;
  const pagination = data?.pagination;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
      </div>

      {/* Summary cards -- REAL data from the backend aggregation service */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          { label: "Total Users", value: summary?.total_users },
          { label: "Active Users", value: summary?.active_users },
          { label: "Paying Users", value: summary?.paying_users },
          { label: "Active Subscriptions", value: summary?.active_subscriptions },
        ].map((card) => (
          <div key={card.label} className="border border-gray-200 rounded-xl bg-white p-3">
            <p className="text-xs text-gray-500">{card.label}</p>
            <p className="text-xl font-bold text-gray-900">
              {card.value !== undefined ? card.value.toLocaleString() : "—"}
            </p>
          </div>
        ))}
      </div>

      {/* Search + filter toggle */}
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name, email or contact..."
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-black"
        />
        <button
          onClick={openFilterPanel}
          className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap"
        >
          Filters {chips.length > 0 ? `(${chips.length})` : ""}
        </button>
      </div>

      {/* Filters popup -- Users Visual QA Fix #1: an overlay, not part of
          normal page flow, so it never pushes the table down. Edits here
          go to `draftFilters` only; nothing commits until Apply Filters. */}
      {filterPanelOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/40 flex items-center justify-center p-4"
          onClick={closeFilterPanelWithoutApplying}
        >
          <div
            className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
              <h3 className="text-sm font-bold text-gray-800">Filters</h3>
              <button
                onClick={closeFilterPanelWithoutApplying}
                className="text-xs text-gray-400 hover:text-gray-700"
              >
                Close ✕
              </button>
            </div>

            <div className="px-4 py-4 overflow-y-auto">
              <UsersFilterPanel filters={draftFilters} onChange={setDraftFilters} />
            </div>

            <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-100 shrink-0">
              <button
                onClick={resetDraftFilters}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Clear / Reset
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active filter chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {chips.map((chip) => (
            <span key={chip.key} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {chip.label}
              <button onClick={chip.clear} className="text-gray-400 hover:text-gray-700">×</button>
            </span>
          ))}
          <button onClick={clearAllFilters} className="text-xs text-indigo-600 hover:underline ml-1">
            Clear All
          </button>
        </div>
      )}

      {/* Result count + selection + future Save Audience */}
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="text-gray-600">
          {tableState === "ready" && pagination ? `${pagination.total_count} users found` : " "}
          {selectedIds.length > 0 && <span className="ml-2 text-indigo-600 font-medium">· {selectedIds.length} selected</span>}
        </span>
        <div className="flex items-center gap-3">
          <Link href="/admin/audiences" className="text-xs text-indigo-600 hover:underline">Saved Audiences</Link>
          <button
            disabled={!selectedIds.length}
            onClick={() => { setShowCreateFixed(true); setAudienceError(""); setAudienceNotice(""); }}
            className="text-xs px-3 py-1.5 rounded-lg border border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-50 disabled:hover:bg-transparent"
            title={selectedIds.length ? undefined : "Select one or more users first"}
          >Create Audience from Selected{selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}</button>
          <button
          onClick={() => {
            try {
              // Saved Audience Search Parity Fix: build criteria from
              // searchInput (the box's literal current content), never
              // searchTerm (the 350ms-debounced value used to drive the
              // table fetch). A user who types a search and clicks Save
              // Audience before the debounce fires would otherwise have
              // their still-stale (often empty) searchTerm silently
              // saved as the criteria -- exactly the production bug
              // ("Production Canary - Internal" resolving as All Users
              // despite a visible, isolating search). Flushing searchTerm
              // (+ resetting to page 1) here too keeps the visible Users
              // table in sync with what gets saved, satisfying the
              // invariant that a SavedAudience represents the SAME
              // logical user set the active Users query currently shows.
              setSearchTerm(searchInput);
              setPage(1);
              const criteria = appliedFiltersToCriteria(searchInput, filters);
              // Saved Audience V2 -- fail-closed guard: if the operator
              // visibly has a search term or a non-default filter
              // applied, the resulting criteria must never silently
              // serialize to nothing. This is defense-in-depth beyond
              // the debounce-race fix above -- ANY future bug that would
              // otherwise drop visible targeting state is blocked here,
              // rather than silently saving an (incorrect) All Users
              // audience.
              const hasVisibleTargeting = searchInput.trim().length > 0
                || JSON.stringify(filters) !== JSON.stringify(EMPTY_BASIC_FILTERS);
              if (hasVisibleTargeting && Object.keys(criteria.filters).length === 0) {
                setAudienceError("Could not save your current search/filters as audience criteria. Please try again.");
                return;
              }
              setSaveCriteria(criteria);
              setAudienceError(""); setAudienceNotice("");
            } catch (e) { setAudienceError(e instanceof Error ? e.message : "Invalid applied filters."); }
          }}
          className="text-xs px-3 py-1.5 rounded-lg border border-indigo-200 text-indigo-700 hover:bg-indigo-50"
        >Save Audience</button></div>
      </div>

      {audienceNotice && <p role="status" className="mb-2 text-sm text-green-700">{audienceNotice}</p>}
      {audienceError && <p role="alert" className="mb-2 text-sm text-red-700">{audienceError}</p>}
      {saveCriteria && <AudienceEditor initialCriteria={saveCriteria} onClose={() => setSaveCriteria(null)} onSaved={saved => { setSaveCriteria(null); setAudienceNotice(`Audience “${saved.name}” saved.`); }} />}
      {showCreateFixed && <CreateFixedAudienceModal
        selectedUserIds={selectedIds}
        onClose={() => setShowCreateFixed(false)}
        onSaved={saved => { setShowCreateFixed(false); setSelectedIds([]); setAudienceNotice(`Fixed audience “${saved.name}” saved with ${selectedIds.length} member(s).`); }}
      />}

      <UsersTable
        state={tableState}
        rows={data?.users ?? []}
        page={page}
        pageSize={PAGE_SIZE}
        totalCount={pagination?.total_count ?? 0}
        onPageChange={setPage}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAllOnPage={toggleSelectAllOnPage}
        onRetry={refetch}
        errorMessage={errorMessage}
      />
    </div>
  );
}
