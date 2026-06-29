import { ChaughadiyaItem, ChoghadiyaCard } from "./ChoghadiyaCard";

export function ChoghadiyaGrid({
  items,
  isHi,
}: {
  items: ChaughadiyaItem[];
  isHi: boolean;
}) {
  if (!items || items.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center text-gray-500 text-sm">
        {isHi ? "इस समय कोई चौघड़िया डेटा उपलब्ध नहीं है।" : "No Choghadiya data available."}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <ChoghadiyaCard key={i} item={item} isHi={isHi} />
      ))}
    </div>
  );
}
