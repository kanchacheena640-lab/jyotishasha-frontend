type BhadraCalculationProps = {
  isHi: boolean;
};

export default function BhadraCalculation({ isHi }: BhadraCalculationProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "भद्रा (विष्टि करण) की गणना कैसे की जाती है?" : "How is Bhadra (Vishti Karana) Determined?"}
      </h2>
      <div className="text-gray-300 leading-7 space-y-4">
        <p>
          {isHi
            ? "भद्रा, जिसे विष्टि करण भी कहा जाता है, पंचांग के 11 करणों में से एक है। पंचांग में एक तिथि के दो भाग होते हैं जिन्हें 'करण' कहा जाता है। विष्टि करण इन करणों के एक निश्चित अनुक्रम का हिस्सा है।"
            : "Bhadra, also known as Vishti Karana, is one of the 11 Karanas in the Panchang. In the Panchang, a Tithi is divided into two halves called 'Karanas'. Vishti Karana is a part of the fixed sequence of these Karanas."}
        </p>
        <p>
          {isHi
            ? "भद्रा का समय तिथि और नक्षत्र के विशेष योग से निर्धारित होता है। यह करण पंचांग के अनुक्रम के अनुसार शुरू और समाप्त होता है, जो हर महीने विशिष्ट तिथियों पर आता है।"
            : "The timing of Bhadra is determined by the specific combination of Tithi and Nakshatra. This Karana begins and ends according to the sequence of the Panchang, occurring on specific Tithis every month."}
        </p>
      </div>
    </section>
  );
}
