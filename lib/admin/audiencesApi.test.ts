// Standalone test convention used by lib/*.test.ts; compile with tsc, then run with Node.
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { appliedFiltersToCriteria, criteriaToEditor, editedCriteria, criteriaSummary, createFixedAudience, isAudienceAllUsers, AudienceFilters, SavedAudience } from "./audiencesApi";
import { EMPTY_BASIC_FILTERS, buildUsersQuery } from "./usersApi";

const empty = () => structuredClone(EMPTY_BASIC_FILTERS);
assert.deepEqual(appliedFiltersToCriteria("", empty()), { version: 1, filters: {} });
const applied = { ...empty(), ageMin: "18", ageMax: "70", status: "active" as const, customerType: "paying" as const,
  signupFrom: "2026-01-01", signupTo: "2026-09-07", askNowBuyer: true, activeSubscription: true,
  moonSign: ["Aries"], lagna: ["Taurus"], nakshatra: ["Rohini"], nakshatraPada: [1, 4], yog: ["gajakesari"], dosh: ["mangal"],
  mahadasha: ["Saturn"], antardasha: ["Venus"], sadeSatiActive: "false" as const, sadeSatiPhase: ["1st Phase" as const],
  jupiterHouse: [1, 7], saturnHouse: [10], rahuHouse: [3], ketuHouse: [9],
  askNowConcern: ["Love & Relationship", "Marriage / Marriage Delay", "Comma, preserved"] };
const criteria = appliedFiltersToCriteria("  example  ", applied);
assert.equal(criteria.filters.search, "example");
assert.equal(criteria.filters.sade_sati_active, false);
assert.equal(criteria.filters.ask_now_buyer, true);
assert.equal(criteria.filters.active_subscription, true);
assert.equal(criteria.filters.age_min, 18);
assert.deepEqual(criteria.filters.ask_now_concern, applied.askNowConcern);
assert.deepEqual(criteria.filters.saturn_house, [10]);
const query = new URLSearchParams(buildUsersQuery("example", applied, 1, 20));
for (const [key, value] of Object.entries(criteria.filters)) assert.equal(query.get(key), Array.isArray(value) ? value.join(",") : String(value), `Users query parity: ${key}`);
const editor = criteriaToEditor(criteria);
assert.deepEqual(appliedFiltersToCriteria(editor.search, editor.filters), criteria);
assert.deepEqual(editedCriteria("", empty(), { version: 1, filters: { ask_now_buyer: false, active_subscription: false } }).filters, { ask_now_buyer: false, active_subscription: false });
assert.deepEqual(editedCriteria("", empty(), { version: 1, filters: {} }, { askNowBuyer: "false", activeSubscription: "false" }).filters, { ask_now_buyer: false, active_subscription: false });
assert.deepEqual(editedCriteria("", empty(), { version: 1, filters: { ask_now_buyer: false } }, { askNowBuyer: "any", activeSubscription: "any" }).filters, {});
assert.deepEqual(criteriaToEditor({ version: 1, filters: { ask_now_concern: ["Historical category"] } }).filters.askNowConcern, ["Historical category"]);
assert.deepEqual(criteriaSummary({ version: 1, filters: {} }), []);
assert.throws(() => appliedFiltersToCriteria("", { ...empty(), ageMin: "invalid" }));
assert.throws(() => criteriaToEditor({ version: 2, filters: {} } as never));
assert.throws(() => criteriaToEditor({ version: 1, filters: { unknown_field: true } } as never));
assert.throws(() => appliedFiltersToCriteria("", { ...empty(), saturnHouse: ["10"] } as never));
const draft = structuredClone(applied);
draft.askNowConcern.push("Unapplied");
assert.equal(criteria.filters.ask_now_concern?.includes("Unapplied"), false);
applied.askNowConcern.push("After snapshot");
assert.equal(criteria.filters.ask_now_concern?.includes("After snapshot"), false);
const source = readFileSync("components/admin/users/UsersPageClient.tsx", "utf8");
// Saved Audience Search Parity Fix: Save Audience must build criteria from
// searchInput (the box's immediate, un-debounced content), never searchTerm
// (the 350ms-debounced value) -- a user who searches then clicks Save
// Audience before the debounce fires would otherwise silently save stale
// (often empty) search criteria. See UsersPageClient.tsx's own comment on
// this exact click handler for the full incident this guards against.
assert(source.includes("appliedFiltersToCriteria(searchInput, filters)"));
assert(!source.includes("appliedFiltersToCriteria(searchTerm, filters)"));
assert(!source.includes("appliedFiltersToCriteria(searchTerm, draftFilters)"));
// Saved Audience V2 -- fail-closed guard: visible search/filter state
// that somehow serializes to empty criteria must block the save, never
// silently open the Save Audience modal with filters={}.
assert(source.includes("hasVisibleTargeting && Object.keys(criteria.filters).length === 0"));
// The debounced searchTerm must still be flushed to searchInput's value at
// the same moment, so the visible Users table converges to the same
// criteria being saved (never a table showing stale results next to a
// correctly-saved audience).
assert(source.includes("setSearchTerm(searchInput)"));
console.log("PASS: all 25 filters match Users query; typed JSON, special characters, empty criteria, round trip, historical/false preservation, malformed state rejection, applied snapshot isolation.");
console.log("PASS: Save Audience uses immediate searchInput (not debounced searchTerm) and flushes searchTerm to match -- Saved Audience Search Parity Fix.");

// ============================================================
// Saved Audience V2 -- FIXED audience creation (frontend contract)
// ============================================================
assert.throws(() => createFixedAudience("Name", "", []), /Select at least one user/);

const usersSource = readFileSync("components/admin/users/UsersPageClient.tsx", "utf8");
assert(usersSource.includes("Create Audience from Selected"));
assert(usersSource.includes("disabled={!selectedIds.length}"), "Create Audience from Selected must be disabled with no selection");
assert(usersSource.includes("CreateFixedAudienceModal"));
assert(usersSource.includes("selectedUserIds={selectedIds}"));

const fixedModalSource = readFileSync("components/admin/audiences/CreateFixedAudienceModal.tsx", "utf8");
assert(fixedModalSource.includes("createFixedAudience(name.trim(), description, selectedUserIds)"));

const audienceEditorSource = readFileSync("components/admin/audiences/AudienceEditor.tsx", "utf8");
// A FIXED audience's criteria is always null and must never be offered
// an "Edit criteria" flow (which assumes a real filters object).
assert(audienceEditorSource.includes('audience.audience_type !== "fixed"'));

console.log("PASS: Saved Audience V2 -- createFixedAudience() fails closed on empty selection; Create Audience from Selected is wired and disabled with no selection; Edit criteria is never offered for a FIXED audience.");

// ============================================================
// Saved Audience V2 -- FIXED audience All-Users misclassification
// (production regression: a real FIXED audience with 1 canonical
// member showed/resolved as "(All Users)" in the Notifications
// Composer, because isAudienceAllUsers() checked only
// criteria?.filters, never audience_type -- criteria is always null
// for a FIXED audience, which the old check treated identically to an
// intentionally empty DYNAMIC {filters: {}}).
// ============================================================
function fixedAudience(overrides: Partial<SavedAudience> = {}): SavedAudience {
  return {
    id: 1, name: "Production Canary", description: null,
    audience_type: "fixed", criteria: null,
    created_by: null, created_at: null, updated_at: null, is_active: true,
    ...overrides,
  };
}
function dynamicAudience(filters: AudienceFilters = {}): SavedAudience {
  return {
    id: 2, name: "Dynamic", description: null,
    audience_type: "dynamic", criteria: { version: 1, filters },
    created_by: null, created_at: null, updated_at: null, is_active: true,
  };
}

assert.equal(isAudienceAllUsers(undefined), false, "undefined audience -> false");
assert.equal(isAudienceAllUsers(fixedAudience()), false, "FIXED audience with null criteria must NEVER be All Users");
assert.equal(isAudienceAllUsers(fixedAudience({ name: "Another fixed" })), false, "FIXED is never All Users regardless of other fields");
assert.equal(isAudienceAllUsers(dynamicAudience({})), true, "DYNAMIC with filters={} IS intentionally All Users");
assert.equal(isAudienceAllUsers(dynamicAudience({ moon_sign: ["Aries"] })), false, "DYNAMIC with real filters is not All Users");

console.log("PASS: Saved Audience V2 -- isAudienceAllUsers() is audience_type-aware: a FIXED audience (criteria always null) is never misread as All Users; DYNAMIC filters={} still means All Users, DYNAMIC with real filters does not.");

// ============================================================
// Audience Delete UX Correction (production regression: Delete
// correctly soft-deactivated the audience, but the row stayed visible
// as "Inactive" in the normal working list -- confusing, since the UI
// action is labeled "Delete"). Root cause: AudiencesList.tsx fetched
// the audiences list with no is_active filter at all (returning every
// audience, active and inactive), while CampaignComposer.tsx's own
// dropdown already correctly used "?is_active=true". No backend change
// -- the backend already supports/returns active-only data; the
// frontend simply wasn't asking for it on this one screen.
// ============================================================
const audiencesListSource = readFileSync("components/admin/audiences/AudiencesList.tsx", "utf8");
assert(audiencesListSource.includes('audienceRequest<AudiencesResponse>("?is_active=true")'), "AudiencesList.tsx must fetch active-only audiences, same contract as the Composer dropdown");
assert(!audiencesListSource.includes("audienceRequest<AudiencesResponse>()"), "AudiencesList.tsx must never fetch the unfiltered (active+inactive) audience list");
assert(audiencesListSource.includes("prev.filter(r => r.id !== row.id)"), "a just-deactivated row must be removed from the active-only list immediately, not updated in place to show Inactive");

const composerSourceForActiveFilter = readFileSync("components/admin/notifications/CampaignComposer.tsx", "utf8");
assert(composerSourceForActiveFilter.includes('audienceRequest<AudiencesResponse>("?is_active=true")'), "Composer's own audience dropdown must still fetch active-only audiences (regression guard, unchanged)");

console.log("PASS: Audience Delete UX Correction -- the normal Audiences list fetches active-only audiences (same contract as the Composer dropdown) and a just-deactivated row disappears immediately, no page reload.");
