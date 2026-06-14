type Props = {
  panchang: any;
  currentTithi: any;
  isHi: boolean;
};

export default function TodayTithiHero({
  panchang,
  currentTithi,
  isHi,
}: Props) {
  if (!currentTithi || !panchang) return null;

  const data =
    panchang.selected_date || panchang;

  const formattedEndDate =
  data?.tithi?.end_ist
    ? new Date(
        data.tithi.end_ist
      ).toLocaleString("en-GB")
    : "-";

  return (
    <section className="mb-10">

      <div
        className="rounded-3xl border border-white/10
        bg-gradient-to-br
        from-purple-950/40
        via-slate-900
        to-slate-950
        p-6 md:p-8"
      >

        <div className="flex flex-col md:flex-row gap-6 items-center">

          <div className="text-7xl md:text-8xl">
            {currentTithi.moonIcon}
          </div>

          <div className="flex-1">

            <div className="text-purple-300 text-sm font-semibold uppercase tracking-wider">
              {isHi
                ? "आज की तिथि"
                : "Today's Tithi"}
            </div>

            <h1 className="text-3xl md:text-5xl font-black mt-2">
              {data?.tithi?.paksha}{" "}
              {isHi
                ? currentTithi.name_hi
                : currentTithi.name}
            </h1>

            <p className="text-gray-300 mt-3 text-lg">
              {isHi
                ? currentTithi.nature_hi
                : currentTithi.nature}
            </p>

            <div className="flex flex-wrap gap-3 mt-4">

              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm">
                {currentTithi.category}
              </div>

              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-sm">
                {isHi
                  ? "समाप्ति"
                  : "Ends"}{" "}
                : {formattedEndDate}
              </div>

            </div>

          </div>

        </div>

        {/* Panchang Summary */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">

          <div className="rounded-2xl bg-white/5 p-4">
            <div className="text-xs text-gray-400">
              {isHi ? "नक्षत्र" : "Nakshatra"}
            </div>

            <div className="font-semibold mt-1">
              {data?.nakshatra?.name || "-"}
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <div className="text-xs text-gray-400">
              {isHi ? "योग" : "Yoga"}
            </div>

            <div className="font-semibold mt-1">
              {data?.yoga?.name || "-"}
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <div className="text-xs text-gray-400">
              {isHi ? "करण" : "Karana"}
            </div>

            <div className="font-semibold mt-1">
              {data?.karan?.name || "-"}
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <div className="text-xs text-gray-400">
              {isHi ? "देवता" : "Deity"}
            </div>

            <div className="font-semibold mt-1">
              {isHi
                ? currentTithi.deity_hi
                : currentTithi.deity}
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <div className="text-xs text-gray-400">
              {isHi ? "पंचक" : "Panchak"}
            </div>

            <div className="font-semibold mt-1">
              {data?.panchak?.active
                ? (isHi ? "सक्रिय" : "Active")
                : (isHi ? "नहीं" : "No")}
            </div>
          </div>

        </div>

        {/* Panchak Message */}

        <div className="mt-5 rounded-2xl bg-white/5 p-4 text-sm text-gray-300">
          {data?.panchak?.message}
        </div>

        {/* Best For */}

        <div className="mt-8">

          <h2 className="font-bold text-lg mb-3">
            {isHi
              ? "आज के लिए शुभ"
              : "Best For Today"}
          </h2>

          <div className="grid md:grid-cols-2 gap-2">

            {(isHi
              ? currentTithi.bestFor_hi
              : currentTithi.bestFor
            )
              .slice(0, 4)
              .map((item: string) => (
                <div
                  key={item}
                  className="rounded-xl bg-white/5 px-4 py-2"
                >
                  ✓ {item}
                </div>
              ))}

          </div>

        </div>

      </div>

    </section>
  );
}