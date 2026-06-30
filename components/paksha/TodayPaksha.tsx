type TodayPakshaProps = {
  isHi: boolean;
  paksha: string | null | undefined;
};

export default function TodayPaksha({ isHi, paksha }: TodayPakshaProps) {
  if (!paksha) return null;

  const isShukla = paksha.toLowerCase().includes("shukla");
  const pakshaName = isHi ? (isShukla ? "शुक्ल पक्ष" : "कृष्ण पक्ष") : paksha;

  return (
    <section className="mt-12">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "आज का पक्ष" : "Today's Paksha"}
        </h2>
      </header>

      <article className="rounded-xl border border-purple-200 bg-purple-50 p-6">
        <h3 className="text-2xl font-bold text-purple-900">{pakshaName}</h3>

        <p className="mt-4 text-gray-700 leading-7">
          {isHi
            ? isShukla
              ? "शुक्ल पक्ष चंद्रमा के बढ़ने का चरण है, जो वृद्धि, समृद्धि और नए कार्यों के लिए शुभ माना जाता है।"
              : "कृष्ण पक्ष चंद्रमा के घटने का चरण है, जो चिंतन, आध्यात्मिक कार्यों और पूर्णता के लिए अनुकूल माना जाता है।"
            : isShukla
            ? "Shukla Paksha is the waxing phase of the Moon, considered auspicious for growth, prosperity, and new beginnings."
            : "Krishna Paksha is the waning phase of the Moon, considered favorable for introspection, spiritual activities, and completion."}
        </p>

        <p className="mt-6 text-sm text-gray-600 border-t border-purple-200 pt-4">
          {isHi
            ? "पक्ष पंचांग का एक महत्वपूर्ण हिस्सा है, जो चंद्र चक्र के आधार पर दिन की ऊर्जा को निर्धारित करता है।"
            : "Paksha is a crucial part of the Panchang, which determines the energy of the day based on the lunar cycle."}
        </p>
      </article>
    </section>
  );
}
