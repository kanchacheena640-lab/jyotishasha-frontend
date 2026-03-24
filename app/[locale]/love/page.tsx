import LoveFormPage from "./LoveForm";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    title: isHi 
      ? "फ्री कुंडली मिलान: शादी के लिए 36 गुण और लव कंपैटिबिलिटी" 
      : "Free Kundli Matching for Marriage | Love Compatibility & Guna Milan",
    description: isHi
      ? "वैदिक ज्योतिष के अनुसार वर-वधू की कुंडली का मिलान करें। अष्टकूट गुण मिलान, मांगलिक दोष और प्रेम संबंधों की गहराई जानें।"
      : "Check free kundli matching for marriage using Vedic astrology. Analyze Ashtakoot Guna Milan, Mangal Dosh, and love compatibility for a successful life.",
    alternates: {
      canonical: `https://jyotishasha.com/${params.locale}/love`,
      languages: {
        'en': 'https://jyotishasha.com/en/love',
        'hi': 'https://jyotishasha.com/hi/love',
      },
    },
  };
}

export default function LovePage({ params }: { params: { locale: string } }) {
  const isHi = params.locale === "hi";

  const ashtakootFactors = [
    { name: "Varna", pts: 1, desc: isHi ? "कार्य प्रवृत्ति" : "Work Ego" },
    { name: "Vashya", pts: 2, desc: isHi ? "आपसी नियंत्रण" : "Dominance" },
    { name: "Tara", pts: 3, desc: isHi ? "भाग्य और स्वास्थ" : "Destiny" },
    { name: "Yoni", pts: 4, desc: isHi ? "शारीरिक आकर्षण" : "Intimacy" },
    { name: "Maitri", pts: 5, desc: isHi ? "मानसिक तालमेल" : "Mental Bond" },
    { name: "Gana", pts: 6, desc: isHi ? "स्वभाव" : "Temperament" },
    { name: "Bhakoot", pts: 7, desc: isHi ? "प्रेम और वंश" : "Love/Family" },
    { name: "Nadi", pts: 8, desc: isHi ? "आनुवंशिक मिलान" : "Genetics" },
  ];

  const faqs = [
    { 
      q: isHi ? "वैदिक ज्योतिष में कुंडली मिलान क्या है?" : "What is kundli matching in Vedic astrology?", 
      a: isHi ? "यह दो कुंडलियों की तुलना करने की एक पारंपरिक विधि है जिसमें अष्टकूट गुण मिलान, मांगलिक दोष और ग्रहों की स्थिति का विश्लेषण करके विवाह की सफलता जांची जाती है।" : "Vedic match-making is the process of comparing two birth charts to assess marriage compatibility using Guna Milan, planetary strength, and dosha evaluation." 
    },
    { 
      q: isHi ? "एक अच्छा गुण मिलान स्कोर क्या माना जाता है?" : "What is a good Guna Milan score?", 
      a: isHi ? "36 गुणों में से 18 से ऊपर का स्कोर औसत, 25 से ऊपर बहुत अच्छा और 30 से ऊपर अत्यंत श्रेष्ठ माना जाता है।" : "Out of 36 Gunas, a score above 18 is considered acceptable, while 25 to 32 is regarded as very good for a harmonious marriage." 
    },
    { 
      q: isHi ? "क्या मांगलिक दोष शादी को प्रभावित करता है?" : "Does Manglik Dosh affect marriage?", 
      a: isHi ? "मंगल की विशेष स्थिति से मांगलिक दोष बनता है। सही विश्लेषण से यह पता चलता है कि दोष कितना प्रभावी है और क्या इसके निवारण (Remedies) की आवश्यकता है।" : "Manglik Dosh occurs when Mars is placed in specific houses. Proper analysis assesses its severity and identifies cancellation factors." 
    }
  ];

  return (
    <main className="min-h-screen bg-[#0f0a1e] text-white">
      
      {/* 🚀 FORM SECTION */}
      <div className="bg-gradient-to-b from-indigo-900/40 via-purple-900/20 to-transparent pt-6 md:pt-12">
        <LoveFormPage locale={params.locale} />
      </div>

      <section className="max-w-4xl mx-auto px-4 mt-16 space-y-16 pb-24">
        
        {/* 📖 INTRO BLOCK */}
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-yellow-100 to-white leading-tight">
            {isHi ? "फ्री कुंडली मिलान और लव कंपैटिबिलिटी" : "Free Kundli Matching & Love Compatibility"}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {isHi 
              ? "कुंडली मिलान वैदिक ज्योतिष की एक प्राचीन विधि है जो दो आत्माओं के मिलन की गहराई को मापती है।" 
              : "Kundli matching is an ancient Vedic science used to measure the depth and harmony of two souls joining for life."}
          </p>
        </div>

        {/* 🎡 ASHTAKOOT EXPLAINER */}
        <div className="rounded-[2.5rem] bg-white/5 border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 italic">
            <span className="text-purple-400">01.</span> {isHi ? "अष्टकूट गुण मिलान कैसे काम करता है?" : "Ashtakoot Guna Milan Explained"}
          </h2>
          
          
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ashtakootFactors.map((f) => (
              <div key={f.name} className="bg-white/5 border border-white/10 rounded-2xl p-4 transition-all hover:bg-white/10 hover:border-purple-500/40">
                <p className="text-purple-400 font-black text-lg">{f.pts} pts</p>
                <h3 className="text-sm font-bold text-white uppercase tracking-tighter">{f.name}</h3>
                <p className="text-[10px] text-gray-500 uppercase">{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-gray-500 italic border-l-2 border-purple-500/50 pl-4">
            {isHi 
              ? "कुल 36 गुणों में से मिलान किया जाता है। 18 से अधिक अंक सफल विवाह का संकेत देते हैं।" 
              : "Calculated out of 36 Gunas. A score above 18 suggests a high probability of a stable marriage."}
          </p>
        </div>

        {/* 🛡️ WHY US / TRUST SECTION */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-[2.5rem] bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-8 border border-white/10 flex flex-col justify-center">
             <h2 className="text-3xl font-black mb-4 uppercase italic">
                {isHi ? "सटीक डेटा, सटीक निर्णय" : "NASA-Grade Precision"}
             </h2>
             <p className="text-sm text-purple-100/70 leading-relaxed">
                {isHi 
                  ? "हम NASA के JPL प्लैनेटरी डेटा और सूक्ष्म लाहिरी अयनांश का उपयोग करते हैं, जो आपको बाज़ार में उपलब्ध अन्य ऐप्स से कहीं अधिक सटीक परिणाम देता है।" 
                  : "Using NASA’s JPL planetary data and precise Lahiri Ayanamsa, we offer calculation accuracy unmatched by generic astrology apps."}
             </p>
          </div>
          <div className="rounded-[2.5rem] bg-white/5 border border-white/10 p-8 flex items-center justify-center text-center">
            <div className="space-y-2">
              <span className="text-4xl">🔬</span>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verified by Vedic Experts</p>
            </div>
          </div>
        </div>

        {/* ❓ FAQ SECTION */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">
            {isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
          </h2>
          <div className="grid gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 hover:bg-white/[0.08] transition-all">
                <strong className="block text-purple-300 text-lg md:text-xl mb-3">
                  {faq.q}
                </strong>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 🛠️ FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
          }),
        }}
      />
    </main>
  );
}