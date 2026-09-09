// lib/admin/usersApi.ts
//
// Users Module U2 -- the real data-fetching layer for /admin/users,
// replacing lib/admin/usersMockData.ts's MOCK_USERS/filterMockUsers for
// every U2-supported field. Talks ONLY to this app's own BFF routes
// (app/api/admin/users/route.ts, app/api/admin/users/[id]/route.ts) --
// never directly to Flask, per the architecture constraint.
//
// The U1 BASIC filters (search/age/status/signup range/customer type/
// ask_now_buyer/active_subscription/page/page_size), U3A's real Birth
// Astrology filters (moon_sign/lagna/nakshatra), U3B.3's real static
// Pada/Yog/Dosh filters (nakshatra_pada/yog/dosh), U4A.4's real
// current-Dasha filters (mahadasha/antardasha, read-only against the
// backend's persisted UserDashaTimeline -- see U4A.1-U4A.3), and
// U4B.3's real Sade Sati filters (sade_sati_active/sade_sati_phase,
// derived from persisted moon_sign + the backend's own resolved
// current Saturn sign -- see U4B.1-U4B.2, never calculated here), and
// U4C.4's real current-Transit-House filters (jupiter_house/
// saturn_house/rahu_house/ketu_house, derived backend-side from
// persisted AppUser.lagna + the backend's own resolved current planet
// rashi -- see U4C.3, never calculated here), and U5B's real Ask Now
// Concern filter (ask_now_concern, an EXISTS against the backend's own
// ask_now_intent_history -- see U5A, never calculated/hardcoded here;
// the option list itself is fetched live via
// fetchAskNowConcernCategories() below, never a static import) are all
// represented here. Upcoming Dasha Change remains U1's mock-driven UI
// shell (lib/admin/usersMockData.ts) and is never sent to this API --
// see UsersFilterPanel.tsx.

export type UserStatus = "active" | "inactive" | "unknown";
export type CustomerType = "free" | "paying";

export interface RealUserRow {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  age: number | null;
  status: UserStatus;
  customer_type: CustomerType;
  active_subscription: boolean;
  ask_now_buyer: boolean;
  signup_date: string | null;
  last_active_at: string | null;
  // U3A -- real, stored-only Birth Astrology (reused from the linked
  // app_users profile; never recalculated). null means either no linked
  // profile or the field was simply never populated -- never fabricated.
  moon_sign: string | null;
  lagna: string | null;
  nakshatra: string | null;
  // U3B.3 -- same reused-only contract. IMPORTANT: null and [] are NOT
  // interchangeable here -- null means "static astrology was never
  // calculated for this profile" (nakshatra_pada/active_yog/active_dosh/
  // static_astrology_calculated_at all null together); [] means
  // "calculated, but zero active Yog/Dosh". Never collapse one into the
  // other when rendering.
  nakshatra_pada: number | null;
  active_yog: string[] | null;
  active_dosh: string[] | null;
  static_astrology_calculated_at: string | null;
  // U4A.4 -- read-only, from the backend's persisted UserDashaTimeline
  // ONLY (U4A.1/U4A.3). null means no bridge, no timeline, or no row
  // currently covers today -- NOT "uncalculated" the way static
  // astrology's null means "never computed". Never fabricate a label
  // for this null; never derive/recompute it on the frontend.
  current_mahadasha: string | null;
  current_antardasha: string | null;
  // U4B.3 -- read-only, derived from persisted app_users.moon_sign +
  // the backend's own ONE resolved current Saturn sign (U4B.1/U4B.2) --
  // never calculated here. null/null means natal Moon sign is
  // unavailable (backend's NOT_CALCULATED state) -- distinct from
  // active=false, which is a genuine computed "not currently active"
  // result. Never fabricate a label for this null; never derive it
  // client-side.
  sade_sati_active: boolean | null;
  sade_sati_phase: SadeSatiPhase | null;
}

// U3A -- the canonical Birth Astrology option lists. These are NOT a
// second, independently-maintained naming system: they are copied
// verbatim from full_kundali_api.py's own SIGNS/NAKSHATRAS arrays (the
// backend's single source of truth for every value app_users.moon_sign/
// lagna/nakshatra can ever hold), so a filter selection here can only
// ever be a value the backend actually recognizes. Also already reused,
// unmodified, from lib/admin/usersMockData.ts's RASHI_OPTIONS/
// NAKSHATRA_OPTIONS (verified identical) -- re-exported here rather
// than duplicated so this API module doesn't depend on the mock-data
// file for a now-real, non-mock concern.
export const BIRTH_ASTROLOGY_SIGN_OPTIONS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const;

export const BIRTH_ASTROLOGY_NAKSHATRA_OPTIONS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
  "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
] as const;

// U3B.3 -- Pada has exactly 4 possible values, matching the backend's
// own CANONICAL_NAKSHATRA_PADAS registry verbatim.
export const BIRTH_ASTROLOGY_PADA_OPTIONS = [1, 2, 3, 4] as const;

// U3B.3 -- the ONE authoritative Yog machine-key -> display-label map.
// Keys are copied verbatim from the backend's own CANONICAL_YOG_KEYS
// registry (modules/services/static_astrology_extractor.py), which is
// itself derived from the actual evaluator ids -- NOT derived from
// lib/admin/usersMockData.ts's old MOCK_TRAITS placeholder list (that
// mock list is no longer imported by the real Yog/Dosh filter UI as of
// this task -- see UsersFilterPanel.tsx). Order matches the backend's
// own listing; Panch Mahapurush's umbrella + 5 sub-yogs are grouped
// together for filter-panel readability (see UsersFilterPanel.tsx).
export const YOG_LABELS: Record<string, string> = {
  gajakesari_yog: "Gajakesari Yog",
  budh_aditya_yog: "Budh-Aditya Yog",
  chandra_mangal_yog: "Chandra-Mangal Yog",
  adhi_rajyog: "Adhi Rajyog",
  dhan_yog: "Dhan Yog",
  dharma_karmadhipati_rajyog: "Dharma-Karmadhipati Rajyog",
  kuber_rajyog: "Kuber Rajyog",
  lakshmi_yog: "Lakshmi Yog",
  neechbhang_rajyog: "Neechbhang Rajyog",
  parashari_rajyog: "Parashari Rajyog",
  rajya_sambandh_rajyog: "Rajya Sambandh Rajyog",
  shubh_kartari_yog: "Shubh Kartari Yog",
  vipreet_rajyog: "Vipreet Rajyog",
  panch_mahapurush_rajyog: "Panch Mahapurush Rajyog",
  panch_mahapurush_ruchaka: "Ruchaka Mahapurush Yog",
  panch_mahapurush_bhadra: "Bhadra Mahapurush Yog",
  panch_mahapurush_hamsa: "Hamsa Mahapurush Yog",
  panch_mahapurush_malavya: "Malavya Mahapurush Yog",
  panch_mahapurush_shasha: "Shasha Mahapurush Yog",
};
export const YOG_OPTIONS = Object.keys(YOG_LABELS);

// U3B.3 -- exactly the 2 currently-real, currently-supported Dosh.
// Deliberately excludes Pitra Dosh / Guru Chandal Dosh / Grahan Dosh --
// those were MOCK_TRAITS-only placeholder entries with no backend
// evaluator behind them at all (see the U3B architecture audit).
export const DOSH_LABELS: Record<string, string> = {
  manglik: "Manglik Dosh",
  kaal_sarp: "Kaal Sarp Dosh",
};
export const DOSH_OPTIONS = Object.keys(DOSH_LABELS);

// U4A.4 -- the exact 9 canonical Vimshottari Dasha lord names, copied
// verbatim from the backend's own CANONICAL_DASHA_LORDS
// (modules/services/admin_users_service.py, itself derived from
// full_kundali_api.py's DASHA_SEQUENCE -- the one authoritative
// sequence, never re-derived here). These are real planet names, not
// machine keys -- unlike Yog/Dosh there is no separate human-readable
// label to map to; the canonical value IS the display value, and no
// alternate/renamed label is ever introduced for it.
export const DASHA_LORD_OPTIONS = [
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
] as const;

// U4B.3 -- the exact 3 canonical Sade Sati phase strings, copied
// verbatim from the backend's own PHASE_FIRST/PHASE_SECOND/PHASE_THIRD
// constants (services/sadhesati_classifier.py) via
// CANONICAL_SADE_SATI_PHASES. These are the ONLY 3 values the backend
// can ever return or accept as a filter -- no Rising/Peak/Setting or
// any other alias is ever introduced for them.
export type SadeSatiPhase = "1st Phase" | "2nd Phase" | "3rd Phase";
export const SADE_SATI_PHASE_OPTIONS: SadeSatiPhase[] = [
  "1st Phase", "2nd Phase", "3rd Phase",
];

// U4C.4 -- the ONE canonical House option set (1-12), copied verbatim
// from the backend's own CANONICAL_TRANSIT_HOUSES
// (modules/services/admin_users_service.py). Deliberately plain
// numbers -- House 1, House 2, ... House 12 -- never an astrology
// interpretation (Career House / Marriage House / Wealth House); this
// is an audience-intelligence/filtering tool, not a prediction UI (see
// U4C.4 task Section 3).
export const TRANSIT_HOUSE_OPTIONS: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

// U4C.4 -- the 4 v1-scoped filterable transit bodies (backend's own
// FILTERABLE_TRANSIT_PLANETS, U4C.3) -- slower-moving planets/nodes
// only, deliberately excluding the 5 fast movers from FILTERS (User
// Detail still shows all 9, see CurrentTransitPlanets below).
export const FILTERABLE_TRANSIT_PLANETS = ["Jupiter", "Saturn", "Rahu", "Ketu"] as const;
export type FilterableTransitPlanet = (typeof FILTERABLE_TRANSIT_PLANETS)[number];

// U4C.4 -- one current-transit body, exactly the backend's own
// birth_astrology.current_transits.planets.<Planet> shape (U4C.3).
// house is null whenever this user's Lagna is unavailable (never
// guessed, never calculated here) -- rashi/degree/motion are typed
// nullable too, defensively, ONLY so an older/incomplete response can
// never crash a `.toFixed()`/string call; the backend's real U4C.3
// contract always populates them (they describe the planet's GLOBAL
// current position, never anything about this specific user).
export interface CurrentTransitPlanet {
  rashi: string | null;
  house: number | null;
  degree: number | null;
  motion: string | null;
}

// U4C.4 -- all 9 canonical transit bodies, exactly the backend's own
// birth_astrology.current_transits shape (U4C.3). Never computed here;
// resolved_at/rashi/house/degree/motion are all read verbatim from the
// backend response.
export interface CurrentTransits {
  resolved_at: string;
  planets: {
    Sun: CurrentTransitPlanet;
    Moon: CurrentTransitPlanet;
    Mercury: CurrentTransitPlanet;
    Venus: CurrentTransitPlanet;
    Mars: CurrentTransitPlanet;
    Jupiter: CurrentTransitPlanet;
    Saturn: CurrentTransitPlanet;
    Rahu: CurrentTransitPlanet;
    Ketu: CurrentTransitPlanet;
  };
}

// U4C.4 -- fixed iteration order for rendering the 9-planet grid
// (User Detail) -- matches the order this task's own spec lists them
// in, and the order transit_engine.py's own PLANET_IDS/get_current_
// positions() naturally produces.
export const CURRENT_TRANSIT_PLANET_ORDER = [
  "Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Rahu", "Ketu",
] as const;

// U5B -- one Ask Now concern-history entry, exactly the backend's own
// ask_now.concerns[] shape (U5A). source is the backend's own stored
// classification-time label -- read verbatim here; presentation-only
// relabeling ("Free"/"Paid Pack") happens at the UI boundary
// (app/admin/users/[id]/page.tsx), never here and never reinterpreted
// as a payment/purchase event.
export interface AskNowConcernHistoryEntry {
  category: string;
  source: "free" | "pack";
  created_at: string;
}

// U5B -- the whole Ask Now Intelligence section, exactly the backend's
// own top-level `ask_now` shape (U5A). `buyer` mirrors the SAME
// corrected definition as `customer.ask_now_buyer` (U5A's Ask Now Buyer
// Correctness Fix) -- one source of truth, never a second calculation.
// `concerns`/`category_counts` never include or invent raw question/
// answer text -- it was never stored to begin with (U5.0's frozen
// discovery).
export interface AskNowIntelligence {
  buyer: boolean;
  total_classified_questions: number;
  concerns: AskNowConcernHistoryEntry[];
  category_counts: Record<string, number>;
}

// U5B -- Category Discovery API client. Fetches the CURRENTLY ACTIVE
// concern-category names live from the backend's DB-backed master (via
// this app's own BFF route, app/api/admin/users/asknow-concerns/route.ts
// -> Flask's GET /admin/api/users/asknow-concerns, U5A) -- NEVER
// hardcoded here or anywhere else in this frontend. Throws a single,
// safe, user-readable Error on any failure (network, non-2xx, or a
// malformed body) -- callers (UsersFilterPanel.tsx) are responsible for
// turning that into a small inline failure state, never a crash, and
// other filters must remain usable even when this one call fails.
export async function fetchAskNowConcernCategories(): Promise<string[]> {
  const res = await fetch("/api/admin/users/asknow-concerns", { cache: "no-store" });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data || !Array.isArray(data.categories)) {
    throw new Error("Ask Now concern categories are temporarily unavailable.");
  }
  return data.categories as string[];
}

export interface RealSummary {
  total_users: number;
  active_users: number;
  paying_users: number;
  active_subscriptions: number;
}

export interface RealPagination {
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
}

export interface RealUsersListResponse {
  summary: RealSummary;
  users: RealUserRow[];
  pagination: RealPagination;
}

export interface RealUserDetailResponse {
  identity: {
    id: number;
    name: string | null;
    email: string;
    phone: string | null;
    age: number | null;
    signup_date: string | null;
    last_active_at: string | null;
    status: UserStatus;
  };
  customer: {
    customer_type: CustomerType;
    active_subscription: boolean;
    ask_now_buyer: boolean;
  };
  // U3A -- same reused, stored-only values as RealUserRow above.
  birth_astrology: {
    moon_sign: string | null;
    lagna: string | null;
    nakshatra: string | null;
    // U3B.3 -- full stored JSONB, verbatim. null (uncalculated) is
    // distinct from {} (calculated, none active/present) -- never
    // collapse one into the other when rendering (see UI code).
    nakshatra_pada: number | null;
    static_yog: Record<string, { strength?: string }> | null;
    static_dosh: Record<string, { severity?: string }> | null;
    static_astrology_calculated_at: string | null;
    static_astrology_version: number | null;
    // U4A.4 -- the WHOLE object is null when there is no valid current
    // Dasha row (no bridge, no timeline, or nothing currently covers
    // today) -- never a shell of null fields. start_date/end_date are
    // the backend's own stored boundary strings, already ISO-
    // formatted; end_date is mathematically EXCLUSIVE ([start, end)),
    // per U4A.0/U4A.1 -- the frontend never reinterprets or recomputes
    // this, only displays it as the backend's own stored boundary.
    current_dasha: {
      mahadasha: string;
      antardasha: string;
      start_date: string;
      end_date: string;
    } | null;
    // U4B.3 -- the WHOLE object is null when natal Moon sign is
    // unavailable (backend's NOT_CALCULATED state) -- never a shell of
    // null fields. U4B v1 is current deterministic state only: no
    // phase start/end dates, no Saturn ingress dates, no predictions/
    // interpretations are ever included here or rendered from here.
    sade_sati: {
      active: boolean;
      phase: SadeSatiPhase | null;
    } | null;
    // U4C.4 -- optional (never `any`), so an older/incomplete response
    // that genuinely omits this key entirely (e.g. during a staged
    // rollout) renders a safe section-level fallback instead of
    // crashing -- see app/admin/users/[id]/page.tsx. The backend's real
    // U4C.3 contract always includes this object; it is never null as
    // a whole (only individual planets' `house` can be null) -- the
    // `| null` here is purely defensive typing, matching the same
    // pattern current_dasha/sade_sati above already established for
    // "this fact might not exist for this response".
    current_transits?: CurrentTransits | null;
  };
  // U5B -- optional (never `any`), defensive typing matching the exact
  // pattern current_transits (U4C.4) above already established -- the
  // backend's real U5A contract always includes this top-level object;
  // `| null`/optional here exists purely so an older/incomplete
  // response can never crash rendering (see app/admin/users/[id]/page.tsx's
  // own section-level fallback).
  ask_now?: AskNowIntelligence | null;
}

export interface BasicFilters {
  language: string[];
  ageMin: string;
  ageMax: string;
  status: UserStatus | "any";
  signupFrom: string;
  signupTo: string;
  customerType: CustomerType | "any";
  askNowBuyer: boolean;
  activeSubscription: boolean;
  // U3A -- Birth Astrology, multi-select (OR within one dimension, AND
  // across dimensions -- see buildUsersQuery()/the backend's own
  // list_users() docstring). Empty array means "no filter on this
  // dimension", matching every other "any"/false default here.
  moonSign: string[];
  lagna: string[];
  nakshatra: string[];
  // U3B.3 -- same multi-select OR-within-dimension convention. Pada
  // values are the actual canonical integers (1-4), never strings.
  nakshatraPada: number[];
  yog: string[];
  dosh: string[];
  // U4A.4 -- current Mahadasha/Antardasha, same multi-select OR-
  // within-dimension / AND-across-dimensions convention. Values are
  // exactly the 9 canonical lord names (DASHA_LORD_OPTIONS) -- never a
  // relabeled/alternate name.
  mahadasha: string[];
  antardasha: string[];
  // U4B.3 -- Sade Sati. sadeSatiActive is a tri-state single-select
  // ("any"/"true"/"false"), matching the existing status/customerType
  // "any"-sentinel convention -- appropriate for a boolean backend
  // filter, not a multi-select. There is deliberately no "not
  // calculated" option: the backend does not support filtering on that
  // state in U4B v1. sadeSatiPhase is multi-select OR-within-dimension,
  // exactly the 3 canonical SADE_SATI_PHASE_OPTIONS values.
  sadeSatiActive: "any" | "true" | "false";
  sadeSatiPhase: SadeSatiPhase[];
  // U4C.4 -- current-transit-house filters (U4C.3's own v1 scope: the
  // 4 slower-moving bodies only). Multi-select OR-within-dimension /
  // AND-across-dimension, exactly like every other multi-value filter
  // here. Values are always integers 1-12 (TRANSIT_HOUSE_OPTIONS) --
  // never a string, never an astrology-interpretation label.
  jupiterHouse: number[];
  saturnHouse: number[];
  rahuHouse: number[];
  ketuHouse: number[];
  // U5B -- Ask Now Concern filter (U5A's own ask_now_intent_history-
  // backed EXISTS). Multi-select OR-within-dimension, AND across every
  // other filter -- same convention as every other multi-value filter
  // here. Values are category NAMES (never a machine id), always drawn
  // from the LIVE active-category set (fetchAskNowConcernCategories()
  // above) -- never a hardcoded list.
  askNowConcern: string[];
}

export const EMPTY_BASIC_FILTERS: BasicFilters = {
  language: [],
  ageMin: "",
  ageMax: "",
  status: "any",
  signupFrom: "",
  signupTo: "",
  customerType: "any",
  askNowBuyer: false,
  activeSubscription: false,
  moonSign: [],
  lagna: [],
  nakshatra: [],
  nakshatraPada: [],
  yog: [],
  dosh: [],
  mahadasha: [],
  antardasha: [],
  sadeSatiActive: "any",
  sadeSatiPhase: [],
  jupiterHouse: [],
  saturnHouse: [],
  rahuHouse: [],
  ketuHouse: [],
  askNowConcern: [],
};

export function buildUsersQuery(
  searchTerm: string,
  filters: BasicFilters,
  page: number,
  pageSize: number
): string {
  const params = new URLSearchParams();
  if (searchTerm.trim()) params.set("search", searchTerm.trim());
  if (!Array.isArray(filters.language) || filters.language.some(v => v !== "en" && v !== "hi")) throw new Error("Invalid language filter.");
  if (filters.language.length) params.set("language", [...new Set(filters.language)].sort().join(","));
  if (filters.ageMin) params.set("age_min", filters.ageMin);
  if (filters.ageMax) params.set("age_max", filters.ageMax);
  if (filters.status !== "any") params.set("status", filters.status);
  if (filters.signupFrom) params.set("signup_from", filters.signupFrom);
  if (filters.signupTo) params.set("signup_to", filters.signupTo);
  if (filters.customerType !== "any") params.set("customer_type", filters.customerType);
  if (filters.askNowBuyer) params.set("ask_now_buyer", "true");
  if (filters.activeSubscription) params.set("active_subscription", "true");
  if (filters.moonSign.length) params.set("moon_sign", filters.moonSign.join(","));
  if (filters.lagna.length) params.set("lagna", filters.lagna.join(","));
  if (filters.nakshatra.length) params.set("nakshatra", filters.nakshatra.join(","));
  if (filters.nakshatraPada.length) params.set("nakshatra_pada", filters.nakshatraPada.join(","));
  if (filters.yog.length) params.set("yog", filters.yog.join(","));
  if (filters.dosh.length) params.set("dosh", filters.dosh.join(","));
  if (filters.mahadasha.length) params.set("mahadasha", filters.mahadasha.join(","));
  if (filters.antardasha.length) params.set("antardasha", filters.antardasha.join(","));
  if (filters.sadeSatiActive !== "any") params.set("sade_sati_active", filters.sadeSatiActive);
  if (filters.sadeSatiPhase.length) params.set("sade_sati_phase", filters.sadeSatiPhase.join(","));
  if (filters.jupiterHouse.length) params.set("jupiter_house", filters.jupiterHouse.join(","));
  if (filters.saturnHouse.length) params.set("saturn_house", filters.saturnHouse.join(","));
  if (filters.rahuHouse.length) params.set("rahu_house", filters.rahuHouse.join(","));
  if (filters.ketuHouse.length) params.set("ketu_house", filters.ketuHouse.join(","));
  // U5B -- URLSearchParams.set() percent-encodes the whole value
  // (commas included, since these are joined into ONE param value, not
  // repeated params) -- special characters in category names ("Love &
  // Relationship", "Marriage / Marriage Delay", "Spiritual / Dosh /
  // Remedies") round-trip correctly with no extra handling needed here,
  // exactly like every other comma-joined multi-value filter above.
  if (filters.askNowConcern.length) params.set("ask_now_concern", filters.askNowConcern.join(","));
  params.set("page", String(page));
  params.set("page_size", String(pageSize));
  return params.toString();
}

async function parseJsonOrThrow(res: Response): Promise<any> {
  const data = await res.json().catch(() => null);
  if (!res.ok || !data) {
    // U4B.3 -- the backend returns 503 {"error": "sade_sati_unavailable"}
    // when it cannot resolve the current Saturn sign (see
    // routes_admin_users.py's SadeSatiUnavailableError handling). This
    // must never surface as an empty user list or leak the raw
    // internal error code/ephemeris details -- translate it into one
    // generic, safe message and let the existing Users-page error
    // state (UsersPageClient.tsx's .catch() -> setErrorMessage) render
    // it exactly like any other fetch failure.
    if (data?.error === "sade_sati_unavailable") {
      throw new Error("Astrology data is temporarily unavailable.");
    }
    // U4C.4 -- the backend returns 503 {"error": "transit_unavailable"}
    // when it cannot resolve the current transit snapshot (see
    // routes_admin_users.py's TransitUnavailableError handling, U4C.3).
    // Distinct message from Sade Sati's above -- this is specifically
    // "the global transit engine failed," never conflated with "this
    // user's Lagna is unavailable" (that case is a normal 200 response
    // with house: null per planet, not an error at all -- see
    // app/admin/users/[id]/page.tsx).
    if (data?.error === "transit_unavailable") {
      throw new Error("Current transit data is temporarily unavailable.");
    }
    // U5B -- the backend returns 503 {"error": "asknow_concern_unavailable"}
    // when it cannot read the currently-active category master (see
    // routes_admin_users.py, U5A) -- reachable here only if the LIST
    // request itself included ask_now_concern (the standalone category-
    // discovery call has its own error handling, see
    // fetchAskNowConcernCategories() above). Same safe-message posture
    // as Sade Sati's/Transit's own 503s above.
    if (data?.error === "asknow_concern_unavailable") {
      throw new Error("Ask Now concern categories are temporarily unavailable.");
    }
    const message = data?.message || data?.error || `Request failed (${res.status}).`;
    throw new Error(message);
  }
  return data;
}

export async function fetchAdminUsers(
  searchTerm: string,
  filters: BasicFilters,
  page: number,
  pageSize: number
): Promise<RealUsersListResponse> {
  const qs = buildUsersQuery(searchTerm, filters, page, pageSize);
  const res = await fetch(`/api/admin/users?${qs}`, { cache: "no-store" });
  return parseJsonOrThrow(res);
}

/** Returns null for a genuine 404 (no such user) -- distinct from a
 * thrown error (network/server failure), so callers can render an
 * honest "not found" state instead of a generic error. */
export async function fetchAdminUserDetail(id: string): Promise<RealUserDetailResponse | null> {
  const res = await fetch(`/api/admin/users/${encodeURIComponent(id)}`, { cache: "no-store" });
  if (res.status === 404) return null;
  return parseJsonOrThrow(res);
}
