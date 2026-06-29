type TodayPanchakProps = {
  isHi: boolean;
  panchak: {
    is_panchak: boolean;
    description: string;
    description_hi: string;
  } | null | undefined;
};

export default function TodayPanchak({
  isHi,
  panchak,
}: TodayPanchakProps) {
  if (!panchak) return null;

  return (
    <section className="mt-12">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "आज की पंचक स्थिति" : "Today's Panchak Status"}
        </h2>
      </header>

      <article className={`rounded-xl border p-6 ${panchak.is_panchak ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"}`}>
        <p className={`text-sm font-semibold uppercase tracking-wide ${panchak.is_panchak ? "text-amber-800" : "text-emerald-800"}`}>
          {panchak.is_panchak ? (isHi ? "पंचक चल रहा है" : "Panchak is active") : (isHi ? "पंचक नहीं है" : "Panchak is not active")}
        </p>

        <p className="mt-4 text-gray-700 leading-7">
          {isHi ? panchak.description_hi : panchak.description}
        </p>
      </article>
    </section>
  );
}
