import { VaraDetail } from "@/lib/data/varaData";

type WeekdayIntroProps = {
  data: VaraDetail;
  isHi: boolean;
};

export default function WeekdayIntro({ data, isHi }: WeekdayIntroProps) {
  const weekdayName = isHi ? data.basic.hindiName : data.basic.englishName;

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? `क्या है ${weekdayName}?` : `What is ${weekdayName}?`}
      </h2>
      <div className="text-gray-300 space-y-4 leading-7">
        <p>
          {isHi
            ? `${weekdayName} वैदिक पंचांग का एक महत्वपूर्ण दिन है, जो विशेष रूप से ${data.planet.displayName.hi} और ${data.deity.displayName.hi} की ऊर्जा से जुड़ा हुआ है।`
            : `${weekdayName} is an important day in the Vedic Panchang, specifically associated with the energy of ${data.planet.displayName.en} and ${data.deity.displayName.en}.`}
        </p>
        <p>
          {isHi
            ? `${data.planet.shortDescription.hi} ${data.deity.shortDescription.hi}`
            : `${data.planet.shortDescription.en} ${data.deity.shortDescription.en}`}
        </p>
        <p>
          {isHi
            ? data.panchang.description.hi
            : data.panchang.description.en}
        </p>
      </div>
    </section>
  );
}
