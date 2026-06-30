type KaranaData = {
  name: string;
  name_hi: string;
  start_time?: string;
  end_time?: string;
  description: string;
  description_hi: string;
};

type TodayKaranaProps = {
  isHi: boolean;
  karana: KaranaData | null | undefined;
};

export default function TodayKarana({
  isHi,
  karana,
}: TodayKaranaProps) {
  if (!karana) return null;

  return (
    <section className="mt-12">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "आज का करण" : "Today's Karana"}
        </h2>
      </header>

      <article className="rounded-xl border border-purple-200 bg-purple-50 p-6">
        <h3 className="text-2xl font-bold text-purple-900">
          {isHi ? karana.name_hi : karana.name}
        </h3>

        {karana.start_time && karana.end_time && (
          <p className="mt-2 text-lg font-semibold text-gray-800">
            {isHi ? "समय:" : "Time:"} {karana.start_time} - {karana.end_time}
          </p>
        )}

        <p className="mt-4 text-gray-700 leading-7">
          {isHi ? karana.description_hi : karana.description}
        </p>

        <p className="mt-6 text-sm text-gray-600 border-t border-purple-200 pt-4">
          {isHi
            ? "करण पंचांग का एक महत्वपूर्ण हिस्सा है जो मुहूर्त निर्धारण और दैनिक गतिविधियों की योजना बनाने में मदद करता है।"
            : "Karana is a significant part of the Panchang which helps in Muhurat determination and planning daily activities."}
        </p>
      </article>
    </section>
  );
}
