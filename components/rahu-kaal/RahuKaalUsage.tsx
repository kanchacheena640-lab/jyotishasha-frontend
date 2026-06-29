type RahuKaalUsageProps = {
  isHi: boolean;
};

export default function RahuKaalUsage({
  isHi,
}: RahuKaalUsageProps) {
  return (
    <section className="mt-14">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "राहु काल का उपयोग कब करें?" : "When to Consider Rahu Kaal?"}
        </h2>
      </header>

      <div className="space-y-5 text-base leading-8 text-gray-300">
        <p>
          {isHi
            ? "राहु काल मुख्य रूप से किसी भी नए या महत्वपूर्ण कार्यों को शुरू करने से बचने के लिए देखा जाता है।"
            : "Rahu Kaal is primarily consulted to avoid starting any new or significant activities."}
        </p>

        <ul className="list-disc space-y-2 pl-5">
          {isHi ? (
            <>
              <li>नए व्यवसाय की शुरुआत</li>
              <li>महत्वपूर्ण निवेश</li>
              <li>बड़ी खरीददारी (घर, वाहन)</li>
              <li>महत्वपूर्ण व्यावसायिक अनुबंधों पर हस्ताक्षर</li>
            </>
          ) : (
            <>
              <li>Starting a new business venture</li>
              <li>Making significant investments</li>
              <li>Major purchases (homes, vehicles)</li>
              <li>Signing important business contracts</li>
            </>
          )}
        </ul>
      </div>
    </section>
  );
}
