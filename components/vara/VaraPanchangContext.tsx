type VaraPanchangContextProps = {
  isHi: boolean;
};

export default function VaraPanchangContext({ isHi }: VaraPanchangContextProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "पंचांग प्रणाली में वार का महत्व" : "Importance of Vara in the Panchang System"}
      </h2>
      <div className="text-gray-300 space-y-4 leading-7">
        <p>
          {isHi
            ? "वैदिक ज्योतिष में, 'वार' पंचांग के पांच महत्वपूर्ण अंगों (तिथि, नक्षत्र, योग, करण और वार) में से एक है। ये पांच अंग मिलकर किसी भी समय की ऊर्जा का व्यापक स्वरूप प्रस्तुत करते हैं।"
            : "In Vedic astrology, 'Vara' is one of the five important limbs of the Panchang (Tithi, Nakshatra, Yoga, Karana, and Vara). Together, these five limbs provide a comprehensive picture of the energy of any given time."}
        </p>
        <p>
          {isHi
            ? "वार का अन्य अंगों के साथ गहरा संबंध है:"
            : "Vara has a deep connection with the other limbs:"}
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>{isHi ? "तिथि:" : "Tithi:"}</strong> {isHi ? "वार और तिथि मिलकर दिन की गुणवत्ता निर्धारित करते हैं।" : "Vara and Tithi together determine the quality of the day."}</li>
          <li><strong>{isHi ? "नक्षत्र:" : "Nakshatra:"}**</strong> {isHi ? "नक्षत्र के साथ मिलकर, वार यह तय करता है कि किस प्रकार का कार्य करना अधिक शुभ होगा।" : "Along with Nakshatra, Vara determines what kind of activities will be more auspicious."}</li>
          <li><strong>{isHi ? "योग और करण:" : "Yoga and Karana:"}</strong> {isHi ? "ये पंचांग के सूक्ष्म तत्व हैं जो वार के साथ मिलकर मुहूर्त की प्रभावशीलता को बढ़ाते हैं।" : "These are subtle elements of the Panchang that, along with Vara, enhance the effectiveness of a Muhurat."}</li>
        </ul>
        <p>
          {isHi
            ? "मुहूर्त चयन और दैनिक धार्मिक अनुष्ठानों में, वार का विशेष ध्यान रखा जाता है। प्रत्येक कार्य की प्रकृति के अनुसार, वार की ऊर्जा उस कार्य की सफलता को प्रभावित कर सकती है।"
            : "In Muhurat selection and daily religious observances, special attention is paid to Vara. Depending on the nature of each task, the energy of the Vara can influence the success of that activity."}
        </p>
      </div>
    </section>
  );
}
