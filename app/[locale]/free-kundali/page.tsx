import FreeKundaliClient from "./FreeKundaliClient";

export default async function FreeKundaliPage({ params }: { params: any }) {
  const { locale } = await params;
  const isHi = locale === 'hi';

  return (
    <section className="min-h-screen py-12 px-4 text-white bg-[#0b1120]">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-indigo-300 mb-4">
          {isHi ? "🪐 फ्री ऑनलाइन जन्म कुंडली" : "🪐 Free Janma Kundali Online"}
        </h1>
        <p className="text-gray-200 leading-relaxed">
          {isHi 
            ? "अपने सटीक जन्म विवरण के साथ अपनी विस्तृत वैदिक कुंडली प्राप्त करें। इसमें ग्रहों की स्थिति, योग और जीवन के अंतर्दृष्टि शामिल हैं।"
            : "Generate your accurate Vedic Birth Chart (Janma Kundali). This free report reveals planetary positions, houses, and life insights based on authentic Vedic astrology."}
        </p>
      </div>

      {/* Client Side Tool */}
      <FreeKundaliClient />
    </section>
  );
}