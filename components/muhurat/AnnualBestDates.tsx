type Props = {
  results: any[];
  activityName: string;
  month: string;
  year: number;
};

export default function AnnualBestDates({
  results,
  activityName,
  month,
  year,
}: Props) {

  if (!results?.length) {
    return null;
  }

  return (
    <section className="mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Best {activityName} Dates In{" "}
        {month} {year}
      </h2>

      <div className="grid gap-4">

        {results
          .slice(0, 10)
          .map((item, index) => (

          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >

            <div className="font-semibold text-lg">
              {item.date}
            </div>

            <div className="text-sm text-gray-300 mt-2">
              Nakshatra: {item.nakshatra}
            </div>

            <div className="text-sm text-gray-300">
              Tithi: {item.tithi}
            </div>

            <div className="text-sm text-green-400">
              Score: {item.score}/10
            </div>

          </div>

        ))}

      </div>

    </section>
  );
}