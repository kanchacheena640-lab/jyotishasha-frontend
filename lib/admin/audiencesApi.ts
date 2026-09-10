import { BasicFilters, EMPTY_BASIC_FILTERS, RealPagination, RealUserRow, YOG_LABELS, DOSH_LABELS } from "./usersApi";

export interface AudienceFilters {
  language?: string[];
  search?: string; age_min?: number; age_max?: number;
  status?: Exclude<BasicFilters["status"], "any">; signup_from?: string; signup_to?: string;
  customer_type?: Exclude<BasicFilters["customerType"], "any">; ask_now_buyer?: boolean; active_subscription?: boolean;
  moon_sign?: string[]; lagna?: string[]; nakshatra?: string[]; nakshatra_pada?: number[];
  yog?: string[]; dosh?: string[]; mahadasha?: string[]; antardasha?: string[];
  sade_sati_active?: boolean; sade_sati_phase?: BasicFilters["sadeSatiPhase"];
  jupiter_house?: number[]; saturn_house?: number[]; rahu_house?: number[]; ketu_house?: number[];
  ask_now_concern?: string[];
}
export interface SavedAudienceCriteria { version: 1; filters: AudienceFilters }
export interface AudienceBooleanFilters { askNowBuyer: "any" | "true" | "false"; activeSubscription: "any" | "true" | "false" }
// Saved Audience V2 -- audience_type is the authoritative discriminator,
// never inferred from criteria being null/empty. A FIXED audience's
// criteria is always null (explicit users.id membership lives server-
// side in saved_audience_members, never sent to/rendered on the client
// as fake filter values).
export type AudienceType = "dynamic" | "fixed";
export interface SavedAudience {
  id: number; name: string; description: string | null;
  audience_type: AudienceType; criteria: SavedAudienceCriteria | null;
  created_by: number | null; created_at: string | null; updated_at: string | null; is_active: boolean;
}
export interface SavedAudiencePreview {
  audience?: SavedAudience; member_count: number; users: RealUserRow[]; pagination: RealPagination;
}
export interface AudiencesResponse { audiences: SavedAudience[] }
export type AudienceInput = Pick<SavedAudience, "name" | "description" | "criteria">;
export interface FixedAudienceInput {
  name: string; description?: string; audience_type: "fixed"; member_user_ids: number[];
}

// Same field mapping as buildUsersQuery, retaining JSON types and array boundaries.
const fields = {
  language: "language",
  ageMin: "age_min", ageMax: "age_max", status: "status", signupFrom: "signup_from", signupTo: "signup_to",
  customerType: "customer_type", askNowBuyer: "ask_now_buyer", activeSubscription: "active_subscription",
  moonSign: "moon_sign", lagna: "lagna", nakshatra: "nakshatra", nakshatraPada: "nakshatra_pada",
  yog: "yog", dosh: "dosh", mahadasha: "mahadasha", antardasha: "antardasha",
  sadeSatiActive: "sade_sati_active", sadeSatiPhase: "sade_sati_phase", jupiterHouse: "jupiter_house",
  saturnHouse: "saturn_house", rahuHouse: "rahu_house", ketuHouse: "ketu_house", askNowConcern: "ask_now_concern",
} as const satisfies Record<keyof BasicFilters, keyof AudienceFilters>;
const numericArrays = new Set(["nakshatraPada", "jupiterHouse", "saturnHouse", "rahuHouse", "ketuHouse"]);

export function appliedFiltersToCriteria(search: string, applied: BasicFilters): SavedAudienceCriteria {
  const result: Record<string, string | number | boolean | string[] | number[]> = {};
  if (typeof search !== "string" || !applied) throw new Error("Invalid applied filters.");
  if (search.trim()) result.search = search.trim();
  for (const key of Object.keys(fields) as (keyof BasicFilters)[]) {
    const value = applied[key];
    if (key === "language" && (!Array.isArray(value) || value.some(v => v !== "en" && v !== "hi"))) throw new Error("Invalid language filter.");
    const defaultValue = EMPTY_BASIC_FILTERS[key];
    if (Array.isArray(defaultValue)) {
      if (!Array.isArray(value) || value.some(v => numericArrays.has(key) ? typeof v !== "number" || !Number.isInteger(v) : typeof v !== "string" || !v.trim())) throw new Error(`Invalid ${key} filter.`);
      if (value.length) result[fields[key]] = (key === "language" ? [...new Set(value as string[])].sort() : [...value]) as string[] | number[];
    } else {
      if (typeof value !== typeof defaultValue) throw new Error(`Invalid ${key} filter.`);
      if (value === defaultValue) continue;
      if (key === "ageMin" || key === "ageMax") {
        if (!/^\d+$/.test(String(value))) throw new Error("Age must be a whole number.");
        result[fields[key]] = Number(value);
      } else if (key === "sadeSatiActive") {
        if (value !== "true" && value !== "false") throw new Error("Invalid Sade Sati status.");
        result[fields[key]] = value === "true";
      } else result[fields[key]] = value as string | boolean;
    }
  }
  return { version: 1, filters: result as AudienceFilters };
}

export function criteriaToEditor(criteria: SavedAudienceCriteria): { search: string; filters: BasicFilters; booleans: AudienceBooleanFilters } {
  if (!criteria || criteria.version !== 1 || !criteria.filters || typeof criteria.filters !== "object" || Array.isArray(criteria.filters)) throw new Error("Unsupported audience criteria. Editing is unavailable.");
  const filters = structuredClone(EMPTY_BASIC_FILTERS);
  const reverse = Object.fromEntries(Object.entries(fields).map(([a, b]) => [b, a])) as Record<string, keyof BasicFilters>;
  for (const [key, value] of Object.entries(criteria.filters)) {
    if (key === "search") { if (typeof value !== "string") throw new Error("Invalid search criterion."); continue; }
    if (key === "language" && (!Array.isArray(value) || !value.length || value.some(v => v !== "en" && v !== "hi"))) throw new Error("Invalid language criterion.");
    const target = reverse[key];
    if (!target) throw new Error(`Unsupported criterion: ${key}.`);
    const converted = target === "ageMin" || target === "ageMax" ? String(value) : target === "sadeSatiActive" ? (value === true ? "true" : value === false ? "false" : value) : structuredClone(value);
    Object.assign(filters, { [target]: converted });
  }
  // Validate shape before rendering controls; never turn corrupt criteria into All Users.
  appliedFiltersToCriteria(criteria.filters.search ?? "", filters);
  return { search: criteria.filters.search ?? "", filters, booleans: {
    askNowBuyer: criteria.filters.ask_now_buyer === undefined ? "any" : criteria.filters.ask_now_buyer ? "true" : "false",
    activeSubscription: criteria.filters.active_subscription === undefined ? "any" : criteria.filters.active_subscription ? "true" : "false",
  } };
}

export function editedCriteria(search: string, filters: BasicFilters, original: SavedAudienceCriteria, booleans?: AudienceBooleanFilters): SavedAudienceCriteria {
  const next = appliedFiltersToCriteria(search, filters);
  // Existing v1 permits explicit false for these fields, while Users checkboxes use false as Any.
  if (original.filters.ask_now_buyer === false && !filters.askNowBuyer) next.filters.ask_now_buyer = false;
  if (original.filters.active_subscription === false && !filters.activeSubscription) next.filters.active_subscription = false;
  if (booleans) {
    for (const [frontend, backend] of [["askNowBuyer", "ask_now_buyer"], ["activeSubscription", "active_subscription"]] as const) {
      if (booleans[frontend] === "any") delete next.filters[backend];
      else next.filters[backend] = booleans[frontend] === "true";
    }
  }
  return next;
}

export function criteriaSummary(criteria: SavedAudienceCriteria): string[] {
  if (!criteria || criteria.version !== 1 || !criteria.filters || Array.isArray(criteria.filters) || typeof criteria.filters !== "object") return ["Unsupported audience criteria"];
  const labels: Record<string, string> = { search: "Search", age_min: "Minimum age", age_max: "Maximum age", customer_type: "Customer", ask_now_concern: "Ask Now Concern", sade_sati_active: "Sade Sati active" };
  return Object.entries(criteria.filters).map(([key, value]) => {
    const label = labels[key] ?? key.replaceAll("_", " ").replace(/^./, c => c.toUpperCase());
    const display = (v: unknown) => key === "language" ? ({ en: "English", hi: "Hindi" }[String(v)] ?? String(v)) : typeof v === "boolean" ? (v ? "Yes" : "No") : (key === "yog" ? YOG_LABELS[String(v)] : key === "dosh" ? DOSH_LABELS[String(v)] : null) ?? String(v);
    return `${label}: ${Array.isArray(value) ? value.map(display).join(", ") : display(value)}`;
  });
}

export async function audienceRequest<T>(path = "", method = "GET", body?: unknown): Promise<T> {
  const response = await fetch(`/api/admin/audiences${path}`, {
    method, cache: "no-store", headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || data === null) throw new Error(data?.message || data?.error || `Request failed (${response.status}).`);
  return data as T;
}
export const previewCriteria = (criteria: SavedAudienceCriteria) => audienceRequest<SavedAudiencePreview>("/preview", "POST", { criteria, page: 1, page_size: 5 });

// Saved Audience V2 -- "Create Audience from Selected" (Admin Users
// checkboxes). Explicit canonical users.id membership, never criteria --
// see FixedAudienceInput's own contract. member_user_ids must be
// non-empty; the backend fails closed (never silently) on any
// nonexistent id.
export function createFixedAudience(name: string, description: string, memberUserIds: number[]): Promise<SavedAudience> {
  if (!memberUserIds.length) throw new Error("Select at least one user.");
  return audienceRequest<SavedAudience>("", "POST", {
    name, description, audience_type: "fixed", member_user_ids: memberUserIds,
  } satisfies FixedAudienceInput);
}
