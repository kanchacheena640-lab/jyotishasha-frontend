type RahuKaalDosDontsProps = {
  isHi: boolean;
};

export default function RahuKaalDosDonts({ isHi }: RahuKaalDosDontsProps) {
  return (
    <section className="mt-12">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "राहु काल के दौरान दिशानिर्देश" : "Guidelines During Rahu Kaal"}
        </h2>
        <p className="mt-3 max-w-3xl text-gray-300 leading-7">
          {isHi
            ? "हालांकि राहु काल के दौरान सावधानी बरतने की परंपरा है, फिर भी दैनिक उत्पादकता बनाए रखना आवश्यक है। ये दिशानिर्देश इस अवधि के दौरान आपके दिन को प्रभावी ढंग से प्रबंधित करने का एक व्यावहारिक तरीका प्रदान करते हैं।"
            : "While Rahu Kaal is traditionally treated with caution, maintaining daily productivity remains essential. These guidelines offer a practical approach to managing your schedule effectively during this period."}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h3 className="text-xl font-semibold text-green-800">
            {isHi ? "व्यावहारिक गतिविधियाँ" : "Practical Activities"}
          </h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700 leading-7">
            {isHi ? (
              <>
                <li>स्थापित दैनिक जिम्मेदारियों के साथ जारी रखें।</li>
                <li>प्रार्थना या व्यक्तिगत चिंतन के लिए समर्पित समय।</li>
                <li>पहले से चल रहे कार्यों को पूरा करने पर ध्यान दें।</li>
              </>
            ) : (
              <>
                <li>Continue with established daily responsibilities.</li>
                <li>Dedicated time for prayer or personal reflection.</li>
                <li>Focus on completing tasks already in progress.</li>
              </>
            )}
          </ul>
        </article>

        <article className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h3 className="text-xl font-semibold text-red-800">
            {isHi ? "स्थगित करने योग्य कार्य" : "Activities to Postpone"}
          </h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700 leading-7">
            {isHi ? (
              <>
                <li>नए व्यावसायिक या वाणिज्यिक उपक्रमों को शुरू करने से बचें।</li>
                <li>प्रमुख कानूनी या वित्तीय समझौतों पर हस्ताक्षर करने को स्थगित करें।</li>
                <li>महत्वपूर्ण बैठकों या निवेश को निर्धारित करने से बचें।</li>
              </>
            ) : (
              <>
                <li>Avoid initiating new business or commercial ventures.</li>
                <li>Postpone signing major legal or financial agreements.</li>
                <li>Refrain from scheduling critical meetings or investments.</li>
              </>
            )}
          </ul>
        </article>
      </div>
    </section>
  );
}
