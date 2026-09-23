// app/[locale]/reports/focused/example-preview/page.tsx
//
// ONE reusable "View Sample" destination for the 61 focused products that
// do NOT have a real sample PDF (app/data/focusedReportsConfig.ts::
// getFocusedReportSampleOrPreviewHref -- the single place that decides
// real-sample-PDF vs this generic preview; #62/#63 never reach this page).
//
// HONESTY RULE (this task's own explicit requirement): this page is never
// labeled with, or implies correspondence to, any specific product's
// question/answer. Its title is the generic "Example Report", never a real
// product title. It is clearly bannered as an example, with the exact
// required disclaimer shown unblurred, above the fold, before any section
// content.
//
// VISUAL BASIS: the section structure and body-paragraph filler below are
// a genuine excerpt of the already-approved #62 (major_kundali_obstacles)
// sample PDF -- read directly from qa_focused_final_reading/
// major_kundali_obstacles_aarav_sharma_{en,hi}.pdf during this task, not
// invented. Two of the five section headings ("Birth Chart Obstacles",
// "Remedies and What Helps" in the real PDF) were genericized here
// ("Your Birth-Chart Findings", "Guidance and Next Steps") because they
// name #62's own obstacles/remedies theme specifically -- not every one of
// the 63 products has "obstacles" or "remedies" (e.g. a strengths or
// timing report doesn't); the other three ("Direct Answer", the current-
// activation section, "Bottom Line") are the same structural shape every
// focused_v1 report actually uses (modules/focused_reports/pdf_adapter.py),
// so keeping them is accurate, not implied-specific. Body paragraphs are
// blurred (illegible) -- shown only to demonstrate genuine report DEPTH
// and paragraph formatting, never as content a visitor could mistake for
// their own answer. The identity line ("Prepared for" / DOB / TOB / POB)
// is replaced with a generic placeholder and blurred too, for the same
// reason.
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/articleSchema";
import { GENERIC_EXAMPLE_PREVIEW_PATH } from "@/app/data/focusedReportsConfig";
import type { Locale } from "@/lib/authority-engine/types";

type Params = { locale: string };

function toLocale(raw: string): Locale {
  return raw === "hi" ? "hi" : "en";
}

const SECTIONS = [
  {
    en: {
      heading: "Direct Answer",
      body: "Your chart's main obstacles are unsettled inner or home circumstances, complex decision-making, and the need to manage disagreements or changing priorities patiently. These are real tendencies, but the chart's own strength indicators show that disciplined effort can convert pressure into stability. Currently, one Mahadasha-Antardasha combination is strongly activating a specific house's themes -- research, uncertainty, and careful handling of confidential or complicated matters -- while other planets remain supportive for career and gains at several points.",
    },
    hi: {
      heading: "सीधा जवाब",
      body: "आपकी कुंडली में सबसे बड़ी बाधाएँ कुछ खास क्षेत्रों से जुड़ी दिखी हैं -- घर और भावनात्मक स्थिरता में दबाव, करियर की दिशा में कभी-कभी स्पष्टता की कमी, दस्तावेज़ों और संवाद से जुड़ी उलझन, और सहयोग में मतभेद। फिर भी कुंडली कमज़ोर नहीं है -- मज़बूत ग्रह-स्थितियाँ दिखाती हैं कि अनुशासन और धैर्य से दबाव को स्थिरता में बदला जा सकता है। अभी एक विशेष महादशा-अंतर्दशा किसी खास भाव के विषयों को सक्रिय कर रही है।",
    },
  },
  {
    en: {
      heading: "Your Birth-Chart Findings",
      body: "1. Home, emotional security and inner calm: a strong placement can create a serious sense of responsibility alongside restlessness about home, family patterns or personal peace -- suggesting calm is built through structure and patience rather than arriving effortlessly. 2. Complexity in decisions and long-term direction: certain placements can make education, beliefs, planning or major transitions require repeated examination. 3. Conflict and cooperation: specific house rulerships bring lessons around firm speech, shared responsibilities and handling disagreement in partnerships.",
    },
    hi: {
      heading: "आपकी कुंडली के निष्कर्ष",
      body: "1. घर और आंतरिक स्थिरता: एक मज़बूत ग्रह-स्थिति ज़िम्मेदारी की गहरी भावना के साथ-साथ घर, परिवार के पैटर्न या व्यक्तिगत शांति को लेकर बेचैनी भी ला सकती है -- यह दिखाता है कि शांति संरचना और धैर्य से बनती है। 2. निर्णयों और दिशा में जटिलता: कुछ ग्रह-स्थितियाँ शिक्षा, मान्यताओं या बड़े बदलावों को बार-बार जाँचने की ज़रूरत बना सकती हैं। 3. टकराव और सहयोग: विशेष भाव-स्वामित्व रिश्तों में स्पष्ट बातचीत और साझा ज़िम्मेदारी के सबक लाते हैं।",
    },
  },
  {
    en: {
      heading: "Currently Active Influences",
      body: "The current Mahadasha-Antardasha continues throughout this report period, making its natal themes especially active -- paperwork, hidden details, changing plans and the need to understand matters thoroughly. Another slower-moving planet remains in a key house through a defined window, emphasising workload, routines and persistence; its retrograde and direct phases favour reviewing obligations versus taking action respectively.",
    },
    hi: {
      heading: "अभी सक्रिय प्रभाव",
      body: "मौजूदा महादशा-अंतर्दशा पूरी रिपोर्ट अवधि में सक्रिय रहती है, जिससे उससे जुड़े जन्मजात विषय -- कागज़ी काम, छिपे विवरण, बदलती योजनाएँ -- विशेष रूप से सक्रिय हो जाते हैं। एक और धीमी गति वाला ग्रह एक तय समय-सीमा तक एक महत्वपूर्ण भाव में रहता है, जो कार्यभार, दिनचर्या और निरंतरता पर ज़ोर देता है।",
    },
  },
  {
    en: {
      heading: "Guidance and Next Steps",
      body: "Keep written schedules, records and backup copies; review important communications before acting. Build consistent routines and reduce unnecessary disorder around you. Address disagreements early with calm, specific language and clearly agreed responsibilities. During a retrograde period, revisit plans rather than forcing quick conclusions.",
    },
    hi: {
      heading: "मार्गदर्शन और अगले कदम",
      body: "लिखित कार्यक्रम, रिकॉर्ड और बैकअप रखें; कार्रवाई करने से पहले महत्वपूर्ण संवादों की समीक्षा करें। लगातार दिनचर्या बनाएँ और अनावश्यक अव्यवस्था कम करें। मतभेदों को शांत, स्पष्ट भाषा और साफ़ तौर पर सहमत ज़िम्मेदारियों के साथ जल्दी सुलझाएँ। रेट्रोग्रेड अवधि के दौरान, जल्दबाज़ी में निष्कर्ष निकालने के बजाय योजनाओं की समीक्षा करें।",
    },
  },
  {
    en: {
      heading: "Bottom Line",
      body: "Your chart's story is mainly about steadiness, complexity and cooperation -- not a lack of potential. Patient structure, careful review and grounded communication are the most useful approach while the current planetary period remains active.",
    },
    hi: {
      heading: "सीधी बात",
      body: "आपकी कुंडली की कहानी मुख्य रूप से स्थिरता, जटिलता और सहयोग के बारे में है -- क्षमता की कमी के बारे में नहीं। धैर्यपूर्ण संरचना, सावधान समीक्षा और सधा हुआ संवाद ही सबसे उपयोगी तरीका है जब तक मौजूदा ग्रह अवधि सक्रिय है।",
    },
  },
] as const;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const locale = toLocale(params.locale);
  const canonical = `${SITE_URL}${locale === "hi" ? "/hi" : ""}${GENERIC_EXAMPLE_PREVIEW_PATH}`;
  const title = locale === "hi" ? "उदाहरण रिपोर्ट" : "Example Report";
  const description =
    locale === "hi"
      ? "यह एक उदाहरण रिपोर्ट है जो फॉर्मेट और गुणवत्ता दिखाती है। आपकी वास्तविक रिपोर्ट आपके प्रश्न और जन्म विवरण के अनुसार व्यक्तिगत होगी।"
      : "An example report showing format and quality only. Your actual report will be personalised to your question and birth details.";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}${GENERIC_EXAMPLE_PREVIEW_PATH}`,
        hi: `${SITE_URL}/hi${GENERIC_EXAMPLE_PREVIEW_PATH}`,
        "x-default": `${SITE_URL}${GENERIC_EXAMPLE_PREVIEW_PATH}`,
      },
    },
    robots: { index: false, follow: true },
  };
}

export default function ExampleReportPreviewPage({ params }: { params: Params }) {
  const locale = toLocale(params.locale);
  const isHi = locale === "hi";

  return (
    <div className="min-h-screen bg-[#0b0620] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Amber, not purple -- deliberately visually distinct from the
            real "SAMPLE REPORT" pilots' own badge, so this never reads as
            the same kind of artifact. */}
        <div className="flex justify-center mb-4">
          <span className="rounded-full border border-amber-400/50 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-300">
            {isHi ? "उदाहरण रिपोर्ट" : "Example Report"}
          </span>
        </div>

        {/* The exact required disclaimer -- always legible, never blurred,
            shown before any section content. */}
        <p className="text-center text-slate-300 text-sm max-w-xl mx-auto mb-10">
          {isHi
            ? "आपकी वास्तविक रिपोर्ट आपके प्रश्न और जन्म विवरण के अनुसार व्यक्तिगत होगी।"
            : "Your actual report will be personalised to your question and birth details."}
        </p>

        {/* Mock report cover -- deliberately GENERIC title (never a real
            product name), matching the pilots' own PDF cover styling. */}
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 md:p-10">
          <p className="text-center text-xs font-semibold tracking-wide uppercase text-purple-600 mb-3">
            {isHi ? "ज्योतिषाशा प्रीमियम ज्योतिष रिपोर्ट" : "Jyotishasha Premium Astrology Report"}
          </p>
          <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {isHi ? "उदाहरण फोकस्ड रिपोर्ट" : "Example Focused Report"}
          </h1>
          {/* Placeholder for "your exact question, answered directly" --
              blurred, since there is no real question on a generic preview. */}
          <p className="blur-[3px] select-none text-center text-gray-500 text-sm max-w-md mx-auto mb-6" aria-hidden="true">
            {isHi ? "आपका सटीक सवाल यहाँ दिखेगा, सीधे जवाब के साथ।" : "Your exact question will appear here, answered directly."}
          </p>
          <div className="w-16 h-px bg-gray-200 mx-auto mb-6" />
          {/* Generic identity placeholder -- never a real name, blurred. */}
          <p className="blur-[3px] select-none text-center text-gray-500 text-xs mb-10" aria-hidden="true">
            {isHi ? "नाम: उदाहरण ग्राहक | जन्म तिथि: 00-00-0000" : "Prepared for: Example Customer | DOB: 00-00-0000"}
          </p>

          <div className="space-y-8">
            {SECTIONS.map((section, i) => {
              const content = section[locale];
              return (
                <div key={i}>
                  <h2 className="text-lg font-bold text-purple-700 border-b pb-2 mb-3">{content.heading}</h2>
                  <p className="blur-[3px] select-none text-gray-700 text-sm leading-relaxed" aria-hidden="true">
                    {content.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-slate-400 text-xs max-w-xl mx-auto mt-8">
          {isHi
            ? "यह पूर्वावलोकन रिपोर्ट के फॉर्मेट, विश्लेषण की संरचना और गहराई दिखाने के लिए है -- इसकी सामग्री किसी विशेष सवाल का जवाब नहीं है।"
            : "This preview shows the report's format, analysis structure and depth -- its content is not the answer to any specific question."}
        </p>
      </div>
    </div>
  );
}
