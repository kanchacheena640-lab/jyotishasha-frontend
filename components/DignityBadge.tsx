// components/DignityBadge.tsx
export default function DignityBadge({ status }: { status: "Exalted" | "Debilitated" | "Mooltrikon" | "Own" | "None" }) {
  const map: Record<string, string> = {
    Exalted: "bg-green-100 text-green-700",
    Debilitated: "bg-red-100 text-red-700",
    Mooltrikon: "bg-amber-100 text-amber-700",
    Own: "bg-blue-100 text-blue-700",
    None: "bg-gray-100 text-gray-600",
  };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status]}`}>{status}</span>;
}
