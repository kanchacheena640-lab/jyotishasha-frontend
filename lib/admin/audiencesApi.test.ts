// Standalone test convention used by lib/*.test.ts; compile with tsc, then run with Node.
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { appliedFiltersToCriteria, criteriaToEditor, editedCriteria, criteriaSummary } from "./audiencesApi";
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
assert(source.includes("setSaveCriteria(appliedFiltersToCriteria(searchInput, filters))"));
assert(!source.includes("appliedFiltersToCriteria(searchTerm, filters)"));
assert(!source.includes("appliedFiltersToCriteria(searchTerm, draftFilters)"));
// The debounced searchTerm must still be flushed to searchInput's value at
// the same moment, so the visible Users table converges to the same
// criteria being saved (never a table showing stale results next to a
// correctly-saved audience).
assert(source.includes("setSearchTerm(searchInput)"));
console.log("PASS: all 25 filters match Users query; typed JSON, special characters, empty criteria, round trip, historical/false preservation, malformed state rejection, applied snapshot isolation.");
console.log("PASS: Save Audience uses immediate searchInput (not debounced searchTerm) and flushes searchTerm to match -- Saved Audience Search Parity Fix.");
