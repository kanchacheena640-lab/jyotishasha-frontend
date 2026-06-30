import { VaraDetail } from "@/lib/data/varaData";

type PlanetSectionProps = {
  data: VaraDetail;
  isHi: boolean;
};

export default function PlanetSection({ data, isHi }: PlanetSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "शासक ग्रह - " : "Ruling Planet - "}
        {isHi ? data.planet.displayName.hi : data.planet.displayName.en}
      </h2>
      <article className="rounded-xl border border-purple-200 bg-purple-50 p-6">
        <p className="text-gray-700 leading-7">
          {isHi ? data.planet.shortDescription.hi : data.planet.shortDescription.en}
        </p>
        <p className="mt-4 text-gray-700 leading-7">
          {isHi
            ? `वैदिक ज्योतिष में, ${data.basic.hindiName} पर ${data.planet.displayName.hi} का शासन है। यह ग्रह इस दिन की ऊर्जा, मानसिक स्थिति और गतिविधियों की प्रकृति को विशेष रूप से प्रभावित करता है।`
            : `In Vedic astrology, ${data.basic.englishName} is ruled by ${data.planet.displayName.en}. This planet significantly influences the energy, mental state, and nature of activities performed on this day.`}
        </p>
      </article>
    </section>
  );
}
