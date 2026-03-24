"use client";

import Link from "next/link";

export default function ThankYouDetail({ locale }: { locale: string }) {
  const currentLang = locale === 'hi' ? 'hi' : 'en';

  const content = {
    title: currentLang === 'hi' ? "🎉 भुगतान सफल रहा!" : "🎉 Payment Successful!",
    subtext: currentLang === 'hi' 
      ? "धन्यवाद। आपकी रिपोर्ट तैयार की जा रही है और जल्द ही आपके ईमेल पर भेज दी जाएगी।" 
      : "Thank you. Your report is being prepared and will be sent to your email shortly.",
    whatsapp: currentLang === 'hi' ? "सहायता चाहिए? व्हाट्सएप पर चैट करें" : "Need help? Chat with us on WhatsApp",
    cta: currentLang === 'hi' ? "और रिपोर्ट्स देखें →" : "More Reports →"
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center bg-[#020617] text-white">
      {/* Success Icon Animation */}
      <div className="mb-6 flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full border border-green-500/20">
        <span className="text-4xl">✅</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
        {content.title}
      </h1>

      {/* Subtext */}
      <p className="max-w-md text-lg text-gray-400 leading-relaxed mb-8">
        {content.subtext}
      </p>

      {/* WhatsApp Help Section */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-10 flex flex-col items-center backdrop-blur-sm">
        <p className="text-sm text-gray-400 mb-2">
           {currentLang === 'hi' ? "कोई सवाल है?" : "Have any questions?"}
        </p>
        <a
          href="https://wa.me/917007012255"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-green-400 hover:text-green-300 font-bold transition-all text-lg"
        >
          <span className="text-2xl">💬</span>
          {content.whatsapp}
        </a>
      </div>

      {/* Navigation CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href={`/${currentLang}/reports`} // 👈 Dynamic Locale Path
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 text-white font-bold hover:bg-purple-500 shadow-lg shadow-purple-600/20 transition-all active:scale-95"
        >
          {content.cta}
        </Link>
        
        <Link
          href={`/${currentLang}`} // 👈 Dynamic Locale Path
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 px-8 py-4 text-gray-300 border border-white/10 hover:bg-white/10 transition-all"
        >
          {currentLang === 'hi' ? "होम पेज" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}