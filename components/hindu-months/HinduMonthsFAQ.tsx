type FAQItem = { q: string; a: string };

export default function HinduMonthsFAQ({
  faqs,
  isHi = false,
}: {
  faqs: FAQItem[];
  isHi?: boolean;
}) {
  return (
    <section className="py-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-300 mb-6">
        {isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
            <p className="text-gray-300 leading-7 text-sm">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
