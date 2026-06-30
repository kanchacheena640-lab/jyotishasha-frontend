import Link from "next/link";

type VaraItem = {
  slug: string;
  name: string;
  name_hi: string;
  planet: string;
  planet_hi: string;
  deity: string;
  deity_hi: string;
  vrat: string;
  vrat_hi: string;
  desc: string;
  desc_hi: string;
};

const varaData: VaraItem[] = [
  { slug: "sunday", name: "Sunday", name_hi: "रविवार", planet: "Sun", planet_hi: "सूर्य", deity: "Surya", deity_hi: "सूर्य", vrat: "Ravivar Vrat", vrat_hi: "रविवार व्रत", desc: "Day of the Sun, focused on vitality and leadership.", desc_hi: "सूर्य का दिन, जो ऊर्जा और नेतृत्व पर केंद्रित है।" },
  { slug: "monday", name: "Monday", name_hi: "सोमवार", planet: "Moon", planet_hi: "चंद्र", deity: "Shiva", deity_hi: "शिव", vrat: "Somvar Vrat", vrat_hi: "सोमवार व्रत", desc: "Day of the Moon, focused on peace and devotion.", desc_hi: "चंद्रमा का दिन, जो शांति और भक्ति पर केंद्रित है।" },
  { slug: "tuesday", name: "Tuesday", name_hi: "मंगलवार", planet: "Mars", planet_hi: "मंगल", deity: "Hanuman", deity_hi: "हनुमान", vrat: "Mangalvar Vrat", vrat_hi: "मंगलवार व्रत", desc: "Day of Mars, focused on courage and strength.", desc_hi: "मंगल का दिन, जो साहस और शक्ति पर केंद्रित है।" },
  { slug: "wednesday", name: "Wednesday", name_hi: "बुधवार", planet: "Mercury", planet_hi: "बुध", deity: "Ganesha", deity_hi: "गणेश", vrat: "Budhvar Vrat", vrat_hi: "बुधवार व्रत", desc: "Day of Mercury, focused on intellect and wisdom.", desc_hi: "बुध का दिन, जो बुद्धि और ज्ञान पर केंद्रित है।" },
  { slug: "thursday", name: "Thursday", name_hi: "गुरुवार", planet: "Jupiter", planet_hi: "गुरु", deity: "Vishnu", deity_hi: "विष्णु", vrat: "Guruvar Vrat", vrat_hi: "गुरुवार व्रत", desc: "Day of Jupiter, focused on spirituality and learning.", desc_hi: "गुरु का दिन, जो आध्यात्मिकता और शिक्षा पर केंद्रित है।" },
  { slug: "friday", name: "Friday", name_hi: "शुक्रवार", planet: "Venus", planet_hi: "शुक्र", deity: "Lakshmi", deity_hi: "लक्ष्मी", vrat: "Shukravar Vrat", vrat_hi: "शुक्रवार व्रत", desc: "Day of Venus, focused on harmony and prosperity.", desc_hi: "शुक्र का दिन, जो सामंजस्य और समृद्धि पर केंद्रित है।" },
  { slug: "saturday", name: "Saturday", name_hi: "शनिवार", planet: "Saturn", planet_hi: "शनि", deity: "Shani", deity_hi: "शनि", vrat: "Shanivar Vrat", vrat_hi: "शनिवार व्रत", desc: "Day of Saturn, focused on discipline and justice.", desc_hi: "शनि का दिन, जो अनुशासन और न्याय पर केंद्रित है।" },
];

type WeekdayNavigationGridProps = {
  isHi: boolean;
};

export default function WeekdayNavigationGrid({ isHi }: WeekdayNavigationGridProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-8">
        {isHi ? "साप्ताहिक विवरण" : "Weekly Overview"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {varaData.map((item) => (
          <article key={item.slug} className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 flex flex-col">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">
              {isHi ? item.name_hi : item.name}
            </h3>
            <p className="text-sm text-gray-700 mb-1"><strong>{isHi ? "स्वामी:" : "Planet:"}</strong> {isHi ? item.planet_hi : item.planet}</p>
            <p className="text-sm text-gray-700 mb-1"><strong>{isHi ? "देवता:" : "Deity:"}</strong> {isHi ? item.deity_hi : item.deity}</p>
            <p className="text-sm text-gray-700 mb-4"><strong>{isHi ? "व्रत:" : "Vrat:"}</strong> {isHi ? item.vrat_hi : item.vrat}</p>
            <p className="text-xs text-gray-600 mb-6 flex-grow leading-relaxed">
              {isHi ? item.desc_hi : item.desc}
            </p>
            <Link
              href={`${isHi ? "/hi" : ""}/vara/${item.slug}`}
              className="inline-block text-center rounded-lg bg-indigo-900 text-white px-4 py-2 text-sm font-semibold hover:bg-indigo-800 transition"
            >
              {isHi ? "अधिक जानें" : "Learn More"}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
