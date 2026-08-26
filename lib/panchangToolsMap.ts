// Single source of truth for valid /panchang/tools/{tool} slugs.
//
// This lives in its own plain (non-"use client") module specifically so it
// can be imported by both components/ShubhDates.tsx (a client component)
// and app/[locale]/panchang/tools/[tool]/page.tsx (a server component):
// a "use client" file's exports become opaque client references when
// imported from server code, so a shared constant can't live inside
// ShubhDates.tsx itself and still be usable for server-side validation.
export const TOOL_MAP: Record<string, string> = {
  naamkaran: "naamkaran",
  marriage: "marriage",
  grahpravesh: "grah_pravesh",
  vehicle: "vehicle",
  childbirth: "childbirth",
  gold: "gold",
  travel: "travel",
};
