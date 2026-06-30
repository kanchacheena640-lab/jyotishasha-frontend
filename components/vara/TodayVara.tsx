type VaraData = {
  name: string;
  name_hi: string;
  ruling_planet: string;
  ruling_planet_hi: string;
  presiding_deity: string;
  presiding_deity_hi: string;
  description: string;
  description_hi: string;
};

type TodayVaraProps = {
  isHi: boolean;
  vara: VaraData | null | undefined;
};

export default function TodayVara({
  isHi,
  vara,
}: TodayVaraProps) {
  if (!vara) return null;

  return (
    <section className="mt-12">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "आज का वार" : "Today's Vara"}
        </h2>
      </header>

      <article className="rounded-xl border border-purple-200 bg-purple-50 p-6">
        <h3 className="text-2xl font-bold text-purple-900">
          {isHi ? vara.name_hi : vara.name}
        </h3>

        <div className="mt-4 space-y-2 text-gray-800">
          <p>
            <strong>{isHi ? "ग्रह स्वामी:" : "Ruling Planet:"}</strong>{" "}
            {isHi ? vara.ruling_planet_hi : vara.ruling_planet}
          </p>
          <p>
            <strong>{isHi ? "अधिष्ठाता देवता:" : "Presiding Deity:"}</strong>{" "}
            {isHi ? vara.presiding_deity_hi : vara.presiding_deity}
          </p>
        </div>

        <p className="mt-4 text-gray-700 leading-7">
          {isHi ? vara.description_hi : vara.description}
        </p>

        <p className="mt-6 text-sm text-gray-600 border-t border-purple-200 pt-4">
          {isHi
            ? "वार पंचांग का एक आधारभूत तत्व है जो समय और ऊर्जा के प्रवाह को समझने में मदद करता है।"
            : "Vara is a foundational element of the Panchang that helps in understanding the flow of time and energy."}
        </p>
      </article>
    </section>
  );
}
