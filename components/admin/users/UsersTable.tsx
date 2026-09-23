"use client";

/**
 * Users Module U2 -- the permanent results table, now bound to the real
 * /admin/api/users response shape (lib/admin/usersApi.ts::RealUserRow)
 * instead of U1's mock AdminUserRow.
 *
 * "unknown" is rendered as its own distinct pill, never folded into
 * "Inactive" -- the locked U2 rule is explicit that unknown activity
 * must never be presented as if it were a known inactive state.
 *
 * U2.1 Data Enrichment -- the "Contact" (phone) column is removed:
 * phone has no role in the main Users list and remains fully available
 * on the individual /admin/users/[id] detail page, which already
 * renders detail.identity.phone (app/admin/users/[id]/page.tsx). The
 * API response still carries `phone` on RealUserRow -- this component
 * simply no longer renders it. Email (already shown under the user's
 * name) now effectively takes over that visual slot.
 *
 * USERS TABLE DECLUTTER (astrology filter-first architecture) --
 * U3A/U3B.3's "Birth Astrology" column, U4A.4's "Current Dasha" column,
 * and U4B.3's "Sade Sati" column are all REMOVED from this default
 * table's PRESENTATION only. This is a UI-only change:
 *   - lib/admin/usersApi.ts's RealUserRow still carries every one of
 *     those fields (moon_sign/lagna/nakshatra/nakshatra_pada/
 *     active_yog/active_dosh/static_astrology_calculated_at/
 *     current_mahadasha/current_antardasha/sade_sati_active/
 *     sade_sati_phase) -- untouched, still fetched on every request.
 *   - Every astrology FILTER (Moon Sign/Lagna/Nakshatra/Pada/Yog/Dosh/
 *     Mahadasha/Antardasha/Sade Sati Status/Sade Sati Phase) in
 *     UsersFilterPanel.tsx is unaffected -- an Admin can still narrow
 *     the list by any of them; the resulting rows just no longer carry
 *     a dedicated astrology column, since the active filter chips
 *     already say why the list is filtered (see UsersPageClient.tsx).
 *   - Full per-user astrology detail (Birth Astrology, Current Dasha,
 *     Sade Sati) remains entirely on User Detail / Customer 360
 *     (app/admin/users/[id]/page.tsx) -- unchanged.
 * The architecture principle this locks in: DEFAULT TABLE = operational/
 * customer overview; ASTROLOGY INTELLIGENCE = Filters; FULL ASTROLOGY
 * INTELLIGENCE = User Detail. Column count drops from 11 to 8
 * (checkbox, User, Age, Status, Customer, Subscription, Last Active,
 * View); min-width is reduced to match the narrower content.
 */

import { useEffect, useMemo, useRef } from "react";
import { RealUserRow } from "@/lib/admin/usersApi";

export type UsersTableState = "loading" | "error" | "ready";

interface Props {
  state: UsersTableState;
  rows: RealUserRow[];
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
  onToggleSelectAllOnPage: (ids: number[], checked: boolean) => void;
  onRetry: () => void;
  errorMessage?: string;
}

function relativeTime(iso: string | null): string {
  if (!iso) return "Never";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

const th = "text-left text-xs font-semibold text-gray-500 uppercase px-3 py-2";
const td = "px-3 py-2 text-sm text-gray-800 align-top";

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-500",
  unknown: "bg-amber-100 text-amber-700",
};
const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  inactive: "Inactive",
  unknown: "Unknown",
};

export default function UsersTable({
  state, rows, page, pageSize, totalCount, onPageChange,
  selectedIds, onToggleSelect, onToggleSelectAllOnPage, onRetry, errorMessage,
}: Props) {
  const pageIds = rows.map((r) => r.id);
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedSet.has(id));
  const someOnPageSelected = pageIds.some((id) => selectedSet.has(id));
  const headerCheckbox = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (headerCheckbox.current) headerCheckbox.current.indeterminate = state === "ready" && someOnPageSelected && !allOnPageSelected;
  }, [state, someOnPageSelected, allOnPageSelected]);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[760px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className={th}>
                <input
                  type="checkbox"
                  ref={headerCheckbox}
                  aria-label="Select users on current page"
                  checked={allOnPageSelected}
                  onChange={(e) => onToggleSelectAllOnPage(pageIds, e.target.checked)}
                  disabled={state !== "ready" || pageIds.length === 0}
                />
              </th>
              <th className={th}>User</th>
              <th className={th}>Age</th>
              <th className={th}>Status</th>
              <th className={th}>Customer</th>
              <th className={th}>Subscription</th>
              <th className={th}>Last Active</th>
              <th className={th}>View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {state === "loading" &&
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={8} className="px-3 py-3">
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
                  </td>
                </tr>
              ))}

            {state === "error" && (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center">
                  <p className="text-sm text-red-600 mb-2">
                    {errorMessage || "Couldn't load users."}
                  </p>
                  <button onClick={onRetry} className="text-xs px-3 py-1.5 bg-gray-100 rounded hover:bg-gray-200">
                    Retry
                  </button>
                </td>
              </tr>
            )}

            {state === "ready" && rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-sm text-gray-500">
                  No users match these filters.
                </td>
              </tr>
            )}

            {state === "ready" && rows.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className={td}>
                  <input type="checkbox" aria-label={`Select user ${u.id}`} checked={selectedSet.has(u.id)} onChange={() => onToggleSelect(u.id)} />
                </td>
                <td className={td}>
                  <p className="font-medium text-gray-900">{u.name || "—"}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </td>
                <td className={td}>{u.age ?? "—"}</td>
                <td className={td}>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[u.status]}`}>
                    {STATUS_LABEL[u.status]}
                  </span>
                </td>
                <td className={td}>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${u.customer_type === "paying" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"}`}>
                    {u.customer_type === "paying" ? "Paying" : "Free"}
                  </span>
                </td>
                <td className={td}>{u.active_subscription ? "Active" : "None"}</td>
                <td className={td}>{relativeTime(u.last_active_at)}</td>
                <td className={td}>
                  <a href={`/admin/users/${u.id}`} className="text-indigo-600 text-sm hover:underline">
                    View →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {state === "ready" && (
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 text-sm text-gray-500">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-1">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="px-2 py-1 rounded border border-gray-200 disabled:opacity-40"
            >
              ◂ Prev
            </button>
            <button
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              className="px-2 py-1 rounded border border-gray-200 disabled:opacity-40"
            >
              Next ▸
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
