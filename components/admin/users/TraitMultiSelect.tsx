"use client";

/**
 * Users Module U1 -- generic searchable multi-select for any "dynamic
 * category list" filter group. Deliberately NOT specific to Yog/Dosh or
 * Ask Now Concern -- it renders whatever `options` it is given and
 * knows nothing about astrology or Ask Now. This is what lets the Yog &
 * Dosh trait catalog (and the Ask Now Concern category list) grow or
 * change on the backend later without any Users page redesign: only the
 * options array passed in changes, never this component.
 *
 * `group` (optional) renders options under a subheading -- used by Yog
 * & Dosh (Dosh / Yog / Panch Mahapurush) but not required for a flat
 * list like Ask Now Concern.
 */

import { useMemo, useState } from "react";

export interface TraitMultiSelectOption {
  id: string;
  label: string;
  group?: string;
}

interface Props {
  options: TraitMultiSelectOption[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
}

export default function TraitMultiSelect({ options, selectedIds, onChange, placeholder }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  }, [options, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, TraitMultiSelectOption[]>();
    for (const opt of filtered) {
      const key = opt.group || "";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(opt);
    }
    return map;
  }, [filtered]);

  function toggle(id: string) {
    onChange(
      selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id]
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full border border-gray-200 rounded px-2 py-1 text-sm mb-2 text-black"
      />
      <div className="max-h-40 overflow-y-auto space-y-2">
        {[...grouped.entries()].map(([group, opts]) => (
          <div key={group || "_"}>
            {group && <p className="text-xs font-semibold text-gray-400 uppercase mb-1">{group}</p>}
            <div className="flex flex-wrap gap-1.5">
              {opts.map((opt) => {
                const active = selectedIds.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggle(opt.id)}
                    className={`text-xs px-2 py-1 rounded-full border transition ${
                      active
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-xs text-gray-400 py-1">No matches.</p>
        )}
      </div>
    </div>
  );
}
