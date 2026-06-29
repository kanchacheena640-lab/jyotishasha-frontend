type BhadraData = {
  is_bhadra: boolean;
  bhadra_start?: string;
  bhadra_end?: string;
  description: string;
  description_hi: string;
};

type TodayBhadraProps = {
  isHi: boolean;
  bhadra: BhadraData | null | undefined;
};

export default function TodayBhadra({
  isHi,
  bhadra,
}: TodayBhadraProps) {
  if (!bhadra) return null;

  return (
    <section className="mt-12">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "आज की भद्रा स्थिति" : "Today's Bhadra Status"}
        </h2>
      </header>

      <article className={`rounded-xl border p-6 ${bhadra.is_bhadra ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"}`}>
        <p className={`text-sm font-semibold uppercase tracking-wide ${bhadra.is_bhadra ? "text-amber-800" : "text-emerald-800"}`}>
          {bhadra.is_bhadra ? (isHi ? "भद्रा सक्रिय है" : "Bhadra is active") : (isHi ? "भद्रा सक्रिय नहीं है" : "Bhadra is not active")}
        </p>

        {bhadra.is_bhadra && bhadra.bhadra_start && bhadra.bhadra_end && (
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {bhadra.bhadra_start} - {bhadra.bhadra_end}
          </p>
        )}

        <p className="mt-4 text-gray-700 leading-7">
          {isHi ? bhadra.description_hi : bhadra.description}
        </p>
      </article>
    </section>
  );
}
