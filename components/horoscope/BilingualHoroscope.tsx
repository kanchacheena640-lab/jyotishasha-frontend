"use client";
import { useState } from "react";

const zodiacOrder = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
];

const staticHoroscope: Record<string, { en: any; hi: any }> = {
  aries: {
    en: { career: "New opportunities at work.", love: "Romantic vibes ahead.", health: "Stay hydrated today.", tips: "Start the day with meditation." },
    hi: { career: "काम में नए अवसर मिलेंगे।", love: "प्यार में अच्छे पल आएंगे।", health: "आज पर्याप्त पानी पिएं।", tips: "दिन की शुरुआत ध्यान से करें।" }
  },
  taurus: {
    en: { career: "Patience will bring success.", love: "Family support keeps you happy.", health: "Take care of digestion.", tips: "Wear light colors today." },
    hi: { career: "धैर्य से सफलता मिलेगी।", love: "परिवार का सहयोग मिलेगा।", health: "पाचन का ध्यान रखें।", tips: "आज हल्के रंग के कपड़े पहनें।" }
  },
  gemini: {
    en: { career: "Communication brings growth.", love: "Good news from partner.", health: "Avoid overthinking.", tips: "Spend time in fresh air." },
    hi: { career: "संवाद से तरक्की होगी।", love: "साथी से शुभ समाचार मिलेगा।", health: "ज्यादा सोचने से बचें।", tips: "ताज़ी हवा में समय बिताएं।" }
  },
  cancer: {
    en: { career: "Teamwork favors you today.", love: "Emotional bonding increases.", health: "Good sleep will heal.", tips: "Offer water to the Sun." },
    hi: { career: "टीमवर्क से फायदा होगा।", love: "भावनात्मक जुड़ाव बढ़ेगा।", health: "अच्छी नींद से लाभ मिलेगा।", tips: "सूर्य को जल अर्पित करें।" }
  },
  leo: {
    en: { career: "Leadership brings rewards.", love: "Someone admires you silently.", health: "Energy levels remain high.", tips: "Chant Om for clarity." },
    hi: { career: "नेतृत्व से इनाम मिलेगा।", love: "कोई गुपचुप आपकी प्रशंसा कर रहा है।", health: "ऊर्जा बनी रहेगी।", tips: "ॐ का जाप करें।" }
  },
  virgo: {
    en: { career: "Details matter in work today.", love: "Support from loved ones.", health: "Eat light food.", tips: "Keep surroundings clean." },
    hi: { career: "काम में बारीकी मायने रखेगी।", love: "प्रियजनों से सहयोग मिलेगा।", health: "हल्का भोजन करें।", tips: "आसपास सफाई रखें।" }
  },
  libra: {
    en: { career: "Balance work and rest.", love: "Harmony returns in love life.", health: "Back pain may trouble.", tips: "Light a diya in evening." },
    hi: { career: "काम और आराम में संतुलन रखें।", love: "प्यार में सामंजस्य लौटेगा।", health: "पीठ दर्द हो सकता है।", tips: "शाम को दीपक जलाएं।" }
  },
  scorpio: {
    en: { career: "Focus on unfinished tasks.", love: "Trust builds relationships.", health: "Avoid spicy food.", tips: "Pray to Lord Hanuman." },
    hi: { career: "अधूरे काम पर ध्यान दें।", love: "विश्वास से रिश्ते मजबूत होंगे।", health: "मसालेदार भोजन से बचें।", tips: "हनुमानजी की प्रार्थना करें।" }
  },
  sagittarius: {
    en: { career: "Luck favors bold steps.", love: "New friendships blossom.", health: "Knees may feel weak.", tips: "Go for a short walk." },
    hi: { career: "भाग्य साहसी कदमों का साथ देगा।", love: "नई दोस्ती बनेगी।", health: "घुटनों में कमजोरी रह सकती है।", tips: "छोटी सैर पर जाएं।" }
  },
  capricorn: {
    en: { career: "Hard work pays off.", love: "Family happiness increases.", health: "Take care of skin.", tips: "Do deep breathing." },
    hi: { career: "मेहनत रंग लाएगी।", love: "परिवार में खुशियाँ बढ़ेंगी।", health: "त्वचा का ध्यान रखें।", tips: "गहरी साँस लें।" }
  },
  aquarius: {
    en: { career: "Innovative ideas work today.", love: "Partner will support strongly.", health: "Avoid cold drinks.", tips: "Help someone in need." },
    hi: { career: "नए विचार सफल होंगे।", love: "साथी पूरा सहयोग देंगे।", health: "ठंडे पेय से बचें।", tips: "जरूरतमंद की मदद करें।" }
  },
  pisces: {
    en: { career: "Creative work will shine.", love: "Love life feels dreamy.", health: "Feet may feel tired.", tips: "Listen to soft music." },
    hi: { career: "रचनात्मक काम चमकेगा।", love: "प्यार जीवन सुहाना रहेगा।", health: "पैर थक सकते हैं।", tips: "धीमी संगीत सुनें।" }
  }
};

export default function BilingualHoroscope({
  lang,
}: {
  lang: "en" | "hi";
}) {
  const [activeLang] = useState(lang);

  return (
    <div className="bg-[#1e1b4b] text-white rounded-xl p-6 shadow-md space-y-6">
      {zodiacOrder.map((sign, idx) => {
        const h = activeLang === "hi" ? staticHoroscope[sign].hi : staticHoroscope[sign].en;
        return (
          <div key={idx}>
            <h2 className="text-2xl font-bold capitalize mb-2">
              {idx + 1}. {sign}
            </h2>
            <p><strong>Career:</strong> {h.career}</p>
            <p><strong>Love:</strong> {h.love}</p>
            <p><strong>Health:</strong> {h.health}</p>
            <p><strong>Tips:</strong> {h.tips}</p>
          </div>
        );
      })}
    </div>
  );
}
