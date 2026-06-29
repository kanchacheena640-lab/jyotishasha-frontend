export type ChaughadiyaItem = {
  name: string;
  name_en: string;
  nature: string;
  nature_en: "shubh" | "ashubh";
  start: string;
  end: string;
};

export function ChoghadiyaCard({
  item,
  isHi,
}: {
  item: ChaughadiyaItem;
  isHi: boolean;
}) {
  const isShubh = item.nature_en === "shubh";
  const name = isHi ? item.name : item.name_en;
  const nature = isHi ? item.nature : item.nature_en;

  return (
    <div
      className={`rounded-xl p-4 border shadow-sm ${
        isShubh
          ? "bg-green-50 border-green-200 text-green-900"
          : "bg-red-50 border-red-200 text-red-900"
      }`}
    >
      <p className="text-sm font-semibold">
        {item.start} - {item.end}
      </p>
      <p className="text-base font-bold mt-1">
        {name} <span className="text-xs font-medium opacity-70">({nature})</span>
      </p>
    </div>
  );
}
