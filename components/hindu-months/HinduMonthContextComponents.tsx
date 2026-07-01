import { HinduMonthDetail } from '@/lib/data/hinduMonthsData';

export default function HinduMonthContextComponents({
  data,
  isHi,
}: {
  data: HinduMonthDetail;
  isHi: boolean;
}) {
  return (
    <div className="space-y-10 py-4 max-w-4xl mx-auto">

      {/* Naming Nakshatra */}
      <section>
        <h2 className="text-xl font-bold text-purple-300 mb-2">
          {isHi
            ? `नामकरण नक्षत्र: ${data.namingNakshatra.name.hi}`
            : `Naming Nakshatra: ${data.namingNakshatra.name.en}`}
        </h2>
        <p className="text-gray-300 leading-7">
          {isHi ? data.namingNakshatra.rationale.hi : data.namingNakshatra.rationale.en}
        </p>
      </section>

      {/* Ritu */}
      <section>
        <h2 className="text-xl font-bold text-purple-300 mb-2">
          {isHi ? `ऋतु: ${data.ritu.name.hi}` : `Ritu: ${data.ritu.name.en}`}
        </h2>
        <p className="text-gray-300 leading-7">
          {isHi ? data.ritu.description.hi : data.ritu.description.en}
        </p>
      </section>

      {/* Ayana */}
      <section>
        <h2 className="text-xl font-bold text-purple-300 mb-2">
          {isHi ? `अयन: ${data.ayana.name.hi}` : `Ayana: ${data.ayana.name.en}`}
        </h2>
        <p className="text-gray-300 leading-7">
          {isHi ? data.ayana.description.hi : data.ayana.description.en}
        </p>
      </section>

      {/* Festivals */}
      {data.festivals.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-purple-300 mb-4">
            {isHi ? "प्रमुख त्योहार" : "Key Festivals"}
          </h2>
          <div className="space-y-3">
            {data.festivals.map((festival) => (
              <div key={festival.slug} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white">
                  {isHi ? festival.name.hi : festival.name.en}
                </p>
                {festival.approxTithi && (
                  <p className="text-xs text-purple-300 mt-1">{festival.approxTithi}</p>
                )}
                <p className="text-sm text-gray-300 mt-2">
                  {isHi ? festival.significance.hi : festival.significance.en}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Vrats */}
      {data.vrats.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-purple-300 mb-4">
            {isHi ? "प्रमुख व्रत" : "Key Vrats"}
          </h2>
          <div className="space-y-3">
            {data.vrats.map((vrat) => (
              <div key={vrat.slug} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white">
                  {isHi ? vrat.name.hi : vrat.name.en}
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  {isHi ? vrat.significance.hi : vrat.significance.en}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Muhurat Relevance */}
      {data.muhuratRelevance.relevantMuhuratSlugs.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-purple-300 mb-2">
            {isHi ? "मुहूर्त महत्व" : "Muhurat Relevance"}
          </h2>
          <p className="text-gray-300 leading-7">
            {isHi ? data.muhuratRelevance.summary.hi : data.muhuratRelevance.summary.en}
          </p>
        </section>
      )}

      {/* Agricultural Importance */}
      <section>
        <h2 className="text-xl font-bold text-purple-300 mb-2">
          {isHi ? "कृषि महत्व" : "Agricultural Importance"}
        </h2>
        <p className="text-gray-300 leading-7 mb-4">
          {isHi ? data.agriculturalImportance.intro.hi : data.agriculturalImportance.intro.en}
        </p>
        {data.agriculturalImportance.items.length > 0 && (
          <div className="space-y-3">
            {data.agriculturalImportance.items.map((item, i) => (
              <div key={i} className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                {item.icon && <span className="text-xl flex-shrink-0">{item.icon}</span>}
                <div>
                  <p className="font-semibold text-white text-sm">
                    {isHi ? item.title.hi : item.title.en}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    {isHi ? item.description.hi : item.description.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lifestyle Guidance */}
      <section>
        <h2 className="text-xl font-bold text-purple-300 mb-2">
          {isHi ? "जीवनशैली मार्गदर्शन" : "Lifestyle Guidance"}
        </h2>
        <p className="text-gray-300 leading-7 mb-4">
          {isHi ? data.lifestyleGuidance.intro.hi : data.lifestyleGuidance.intro.en}
        </p>
        {data.lifestyleGuidance.items.length > 0 && (
          <div className="space-y-3">
            {data.lifestyleGuidance.items.map((item, i) => (
              <div key={i} className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                {item.icon && <span className="text-xl flex-shrink-0">{item.icon}</span>}
                <div>
                  <p className="font-semibold text-white text-sm">
                    {isHi ? item.title.hi : item.title.en}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    {isHi ? item.description.hi : item.description.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recommended Activities */}
      {data.recommendedActivities.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-purple-300 mb-4">
            {isHi ? "अनुशंसित गतिविधियाँ" : "Recommended Activities"}
          </h2>
          <div className="space-y-3">
            {data.recommendedActivities.map((item, i) => (
              <div key={i} className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                {item.icon && <span className="text-xl flex-shrink-0">{item.icon}</span>}
                <div>
                  <p className="font-semibold text-white text-sm">
                    {isHi ? item.title.hi : item.title.en}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    {isHi ? item.description.hi : item.description.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Avoided Activities */}
      {data.avoidedActivities.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-purple-300 mb-4">
            {isHi ? "वर्जित गतिविधियाँ" : "Activities to Avoid"}
          </h2>
          <div className="space-y-3">
            {data.avoidedActivities.map((item, i) => (
              <div key={i} className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                {item.icon && <span className="text-xl flex-shrink-0">{item.icon}</span>}
                <div>
                  <p className="font-semibold text-white text-sm">
                    {isHi ? item.title.hi : item.title.en}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    {isHi ? item.description.hi : item.description.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {data.faqs.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-purple-300 mb-4">
            {isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-2">
                  {isHi ? faq.question.hi : faq.question.en}
                </h3>
                <p className="text-sm text-gray-300 leading-7">
                  {isHi ? faq.answer.hi : faq.answer.en}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
