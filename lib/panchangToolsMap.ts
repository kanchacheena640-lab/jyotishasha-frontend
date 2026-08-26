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

// Maps Muhurat topic slugs (app/[locale]/panchang/muhurat/muhurth_topics.ts)
// to their corresponding valid Panchang Tool slug (a TOOL_MAP key above),
// for components/cta/CtaMuhurth.tsx. Derived by cross-referencing each
// Muhurat topic's own `activity` field against TOOL_MAP's values -- verified
// individually per topic, not a blind string transform. property-purchase-
// muhurat is deliberately absent: it has no corresponding Panchang Tool.
export const MUHURAT_TOPIC_TO_TOOL: Record<string, string> = {
  "naamkaran-muhurat": "naamkaran",
  "marriage-muhurat": "marriage",
  "grah-pravesh-muhurat": "grahpravesh",
  "vehicle-muhurat": "vehicle",
  "child-birth-muhurat": "childbirth",
  "gold-buying-muhurat": "gold",
  "foreign-travel-muhurat": "travel",
};
