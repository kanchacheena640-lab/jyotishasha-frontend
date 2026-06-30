type FAQ = {
  q: string;
  q_hi: string;
  a: string;
  a_hi: string;
};

type VaraFAQProps = {
  isHi: boolean;
};

export default function VaraFAQ({ isHi }: VaraFAQProps) {
  const faqs: FAQ[] = [
    {
      q: "What is Vara in the Panchang?",
      q_hi: "पंचांग में वार क्या है?",
      a: "Vara is one of the five main limbs of the Panchang, representing the seven days of the week in the Vedic system.",
      a_hi: "वार पंचांग के पांच मुख्य अंगों में से एक है, जो वैदिक प्रणाली में सप्ताह के सात दिनों को दर्शाता है।",
    },
    {
      q: "Why is Vara important?",
      q_hi: "वार महत्वपूर्ण क्यों है?",
      a: "Vara is important because it dictates the ruling planet, associated deity, and traditional observances for each day, impacting energy and Muhurat.",
      a_hi: "वार महत्वपूर्ण है क्योंकि यह हर दिन के लिए ग्रह स्वामी, संबंधित देवता और पारंपरिक व्रतों को निर्धारित करता है, जो ऊर्जा और मुहूर्त को प्रभावित करते हैं।",
    },
    {
      q: "Which planet rules each weekday?",
      q_hi: "प्रत्येक वार का शासक ग्रह कौन सा है?",
      a: "Each weekday is ruled by a planet (e.g., Sunday-Sun, Monday-Moon, Tuesday-Mars, Wednesday-Mercury, Thursday-Jupiter, Friday-Venus, Saturday-Saturn).",
      a_hi: "प्रत्येक वार एक ग्रह द्वारा शासित होता है (जैसे रविवार-सूर्य, सोमवार-चंद्र, मंगलवार-मंगल, बुधवार-बुध, गुरुवार-गुरु, शुक्रवार-शुक्र, शनिवार-शनि)।",
    },
    {
      q: "How is Vara used in Muhurat?",
      q_hi: "मुहूर्त में वार का उपयोग कैसे किया जाता है?",
      a: "In Muhurat selection, the Vara is chosen based on the nature of the task and its compatibility with the ruling planet of that day.",
      a_hi: "मुहूर्त चयन में, वार का चयन कार्य की प्रकृति और उस दिन के ग्रह स्वामी के साथ उसकी अनुकूलता के आधार पर किया जाता है।",
    },
    {
      q: "Does Vara affect religious observances?",
      q_hi: "क्या वार धार्मिक अनुष्ठानों को प्रभावित करता है?",
      a: "Yes, many traditional religious observances, fasts, and Puja are specifically timed according to the Vara to align with the presiding deity.",
      a_hi: "हाँ, कई पारंपरिक धार्मिक अनुष्ठान, व्रत और पूजा विशेष रूप से वार के अनुसार निर्धारित किए जाते हैं ताकि वे अधिष्ठाता देवता के साथ जुड़ सकें।",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-8">
        {isHi ? "सामान्य प्रश्न" : "Frequently Asked Questions"}
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <article key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-3">{isHi ? faq.q_hi : faq.q}</h3>
            <p className="text-gray-300 leading-7">{isHi ? faq.a_hi : faq.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
