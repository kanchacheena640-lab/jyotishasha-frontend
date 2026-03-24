import ShubhDates from "@/components/ShubhDates";

interface Props {
  params: { locale: string; tool?: string };
  searchParams?: { lat?: string; lng?: string; place?: string };
}

// ✅ Locale-Aware Metadata
export async function generateMetadata({ params }: Props) {
  const isHi = params.locale === "hi";
  const tool = params?.tool ?? "muhurta";
  const nice = tool.replace(/-/g, " ");
  
  const title = isHi 
    ? `शुभ ${nice} मुहूर्त | ज्‍योतिष आशा` 
    : `Shubh ${nice} Muhurta | Jyotishasha`;
    
  const description = isHi
    ? `पंचांग और वैदिक ज्योतिष पर आधारित आपके स्थान के लिए सर्वश्रेष्ठ ${nice} तिथियां।`
    : `Best ${nice} dates based on Panchang and Vedic astrology for your location.`;

  return {
    title,
    description,
    alternates: { 
      canonical: `https://www.jyotishasha.com${isHi ? '/hi' : ''}/panchang/tools/${tool}` 
    },
  };
}

export default function ToolMuhurthaPage({ params, searchParams }: Props) {
  const isHi = params.locale === "hi";
  const tool = params?.tool ?? "muhurta";
  const rawPlace = searchParams?.place ?? (isHi ? "लखनऊ" : "Lucknow");
  const place = decodeURIComponent(rawPlace);

  // 🪄 Formatting tool name for display
  const displayTool = tool.replace(/-/g, " ");

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50/50 via-white to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* 🔮 Dynamic Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-900 mb-3 capitalize tracking-tight">
          {isHi ? `शुभ ${displayTool} मुहूर्त` : `${displayTool} Muhurta`}
        </h1>

        {/* 📍 Location Indicator */}
        <p className="text-center text-gray-500 mb-10 text-lg">
          {isHi ? (
            <>
              आप <span className="font-bold text-indigo-600">{place}</span> के लिए शुभ तिथियां देख रहे हैं
            </>
          ) : (
            <>
              You are viewing Shubh dates for{" "}
              <span className="font-bold text-indigo-600">{place}</span>
            </>
          )}
        </p>

        {/* ✅ Pass params exactly as expected (ShubhDates should handle its own translations) */}
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50/50 overflow-hidden">
          <ShubhDates params={{ tool, locale: params.locale }} />
        </div>

        {/* 📝 Small SEO Note Footer */}
        <p className="mt-8 text-center text-xs text-gray-400 italic">
          {isHi 
            ? "* मुहूर्त की गणना आपके स्थानीय सूर्योदय और स्थान के आधार पर की गई है।" 
            : "* Muhurta calculations are based on your local sunrise and coordinates."}
        </p>
      </div>
    </main>
  );
}