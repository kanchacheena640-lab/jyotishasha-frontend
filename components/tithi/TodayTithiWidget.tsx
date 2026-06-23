interface Props {
  locale: string;
}

export default function TodayTithiWidget({
  locale,
}: Props) {
  const isHi = locale === "hi";

  return (
    <section className="mb-14">

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          {isHi
            ? "आज की तिथि"
            : "Today's Tithi"}
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">
              {isHi ? "तिथि" : "Tithi"}
            </div>

            <div className="font-semibold">
              Shukla Ekadashi
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">
              {isHi ? "पक्ष" : "Paksha"}
            </div>

            <div className="font-semibold">
              {isHi ? "शुक्ल पक्ष" : "Shukla Paksha"}
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">
              {isHi ? "आरंभ" : "Starts"}
            </div>

            <div className="font-semibold">
              06:15 AM
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">
              {isHi ? "समाप्त" : "Ends"}
            </div>

            <div className="font-semibold">
              08:42 PM
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}