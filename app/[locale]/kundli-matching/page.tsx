import Link from "next/link";
import LoveFormPage from "../love/LoveForm";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/articleSchema";
import { KUNDLI_MATCHING_PATH } from "@/lib/kundliMatchingRoute";

// Free Kundli Matching landing at /kundli-matching (moved from /love, which now 308-redirects here; the
// form and the /love/* result and product routes are unchanged). Server-rendered content around the
// existing client form: hero -> form -> what you get -> the 8 kootas -> reading the score -> Mangal Dosh
// -> how it is calculated -> FAQ -> related guides. Ivory/navy palette of the Marriage Hub.
// Claims stay within what the free calculator returns (36-guna score, koota-wise notes, Mangal Dosh
// check) -- no name-only matching, no scientific or marriage-success claims.

type L = { en: string; hi: string };
const t = (v: L, isHi: boolean) => (isHi ? v.hi : v.en);

const TITLE: L = {
  en: "Free Kundli Matching for Marriage – 36 Guna Milan Calculator",
  hi: "फ्री कुंडली मिलान – शादी के लिए 36 गुण मिलान कैलकुलेटर",
};
const DESCRIPTION: L = {
  en: "Free kundli matching by date of birth: enter both partners' birth details to get your 36 Guna Milan score, a koota-wise breakdown and a Mangal Dosh check.",
  hi: "जन्म विवरण से फ्री कुंडली मिलान: दोनों की जन्म तिथि, समय और स्थान डालें और पाएं 36 गुण मिलान स्कोर, कूट-वार विवरण और मंगल दोष जाँच।",
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}${KUNDLI_MATCHING_PATH}`;

  return {
    title: t(TITLE, isHi),
    description: t(DESCRIPTION, isHi),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}${KUNDLI_MATCHING_PATH}`,
        hi: `${SITE_URL}/hi${KUNDLI_MATCHING_PATH}`,
        "x-default": `${SITE_URL}${KUNDLI_MATCHING_PATH}`,
      },
    },
  };
}

// The eight kootas, read the traditional way (points out of 36).
const KOOTAS: { name: L; pts: number; reads: L }[] = [
  { name: { en: "Varna", hi: "वर्ण" }, pts: 1, reads: { en: "Temperament and approach to work and duty", hi: "स्वभाव और कर्तव्य व कार्य के प्रति दृष्टिकोण" } },
  { name: { en: "Vashya", hi: "वश्य" }, pts: 2, reads: { en: "Mutual attraction and influence", hi: "आपसी आकर्षण और प्रभाव" } },
  { name: { en: "Tara", hi: "तारा" }, pts: 3, reads: { en: "Harmony of the birth nakshatras, traditionally read for well-being", hi: "जन्म नक्षत्रों का तालमेल, परंपरागत रूप से कल्याण के लिए देखा जाता है" } },
  { name: { en: "Yoni", hi: "योनि" }, pts: 4, reads: { en: "Instinctive and physical compatibility", hi: "स्वाभाविक और शारीरिक अनुकूलता" } },
  { name: { en: "Graha Maitri", hi: "ग्रह मैत्री" }, pts: 5, reads: { en: "Friendship between the Moon-sign lords — mental compatibility", hi: "चंद्र राशि स्वामियों की मित्रता — मानसिक तालमेल" } },
  { name: { en: "Gana", hi: "गण" }, pts: 6, reads: { en: "Basic nature: Deva, Manushya or Rakshasa gana", hi: "मूल स्वभाव: देव, मनुष्य या राक्षस गण" } },
  { name: { en: "Bhakoot", hi: "भकूट" }, pts: 7, reads: { en: "Relative position of the two Moon signs — emotional and family harmony", hi: "दोनों चंद्र राशियों की परस्पर स्थिति — भावनात्मक और पारिवारिक तालमेल" } },
  { name: { en: "Nadi", hi: "नाड़ी" }, pts: 8, reads: { en: "Traditionally linked with health and children; carries the highest weight", hi: "परंपरागत रूप से स्वास्थ्य और संतान से जोड़ा जाता है; सबसे अधिक अंक" } },
];

// Same contiguous bands as the Compatibility guide (half points fall in the upper band).
const BANDS: { range: L; meaning: L }[] = [
  { range: { en: "Below 18", hi: "18 से कम" }, meaning: { en: "Calls for a careful review of both charts", hi: "दोनों कुंडलियों की सावधानी से जाँच की जाती है" } },
  { range: { en: "18 to 24", hi: "18 से 24 तक" }, meaning: { en: "Considered average", hi: "औसत माना जाता है" } },
  { range: { en: "Above 24, up to 32", hi: "24 से अधिक, 32 तक" }, meaning: { en: "Considered good", hi: "अच्छा माना जाता है" } },
  { range: { en: "Above 32", hi: "32 से अधिक" }, meaning: { en: "Considered excellent", hi: "उत्तम माना जाता है" } },
];

const FAQS: { q: L; a: L }[] = [
  {
    q: { en: "What is kundli matching (kundali milan)?", hi: "कुंडली मिलान (कुंडली मिलाप) क्या है?" },
    a: {
      en: "Kundli matching is the traditional Vedic way of comparing two birth charts before marriage. It starts with Ashtakoot Guna Milan — eight kootas scored out of 36 — together with a Mangal Dosha check for both partners.",
      hi: "कुंडली मिलान विवाह से पहले दो जन्मकुंडलियों की तुलना करने की पारंपरिक वैदिक पद्धति है। इसकी शुरुआत अष्टकूट गुण मिलान — 36 में से अंक वाले आठ कूट — और दोनों साथियों के मंगल दोष की जाँच से होती है।",
    },
  },
  {
    q: { en: "How many gunas should match for marriage?", hi: "विवाह के लिए कितने गुण मिलने चाहिए?" },
    a: {
      en: "Guna Milan scores are traditionally read in bands out of 36: below 18 calls for a careful review of both charts; 18 to 24 is considered average; above 24 and up to 32 is good; above 32 is excellent. Astrologers then weigh Nadi and Bhakoot, Mangal Dosha and both full birth charts.",
      hi: "गुण मिलान के अंक परंपरागत रूप से 36 में से इन श्रेणियों में पढ़े जाते हैं: 18 से कम होने पर दोनों कुंडलियों की सावधानी से जाँच की जाती है; 18 से 24 तक औसत; 24 से अधिक और 32 तक अच्छा; और 32 से अधिक उत्तम माना जाता है। इसके बाद ज्योतिषी नाड़ी और भकूट, मंगल दोष और दोनों पूरी जन्मकुंडलियाँ देखते हैं।",
    },
  },
  {
    q: { en: "Which birth details do I need for kundli matching?", hi: "कुंडली मिलान के लिए कौन-सी जन्म जानकारी चाहिए?" },
    a: {
      en: "For both partners: the date of birth, the exact time of birth and the place of birth. These set each person's Moon sign and birth nakshatra, which the eight kootas are calculated from.",
      hi: "दोनों साथियों की जन्म तिथि, सटीक जन्म समय और जन्म स्थान। इन्हीं से हर व्यक्ति की चंद्र राशि और जन्म नक्षत्र निकलते हैं, जिनसे आठों कूटों की गणना होती है।",
    },
  },
  {
    q: { en: "Can I match kundli by name only?", hi: "क्या केवल नाम से कुंडली मिलान हो सकता है?" },
    a: {
      en: "Not with this calculator. It matches charts from birth details, because the Moon sign and nakshatra come from the date, time and place of birth. Matching by name uses a different traditional method that this page does not offer.",
      hi: "इस कैलकुलेटर से नहीं। यह जन्म विवरण से कुंडलियों का मिलान करता है, क्योंकि चंद्र राशि और नक्षत्र जन्म तिथि, समय और स्थान से निकलते हैं। नाम से मिलान एक अलग पारंपरिक पद्धति है, जो इस पेज पर उपलब्ध नहीं है।",
    },
  },
  {
    q: { en: "What if our Guna score is low?", hi: "अगर हमारा गुण स्कोर कम है तो क्या करें?" },
    a: {
      en: "A low score is read as a reason to look deeper, not as the final word. Astrologers check the classical exceptions for Nadi and Bhakoot, compare Mangal Dosha in both charts and read both full birth charts — the 7th house and its lord, Venus, Jupiter and the Navamsa (D9).",
      hi: "कम स्कोर को गहराई से देखने का कारण माना जाता है, अंतिम निर्णय नहीं। ज्योतिषी नाड़ी और भकूट के शास्त्रीय अपवाद देखते हैं, दोनों कुंडलियों में मंगल दोष की तुलना करते हैं और दोनों पूरी जन्मकुंडलियाँ पढ़ते हैं — सप्तम भाव और सप्तमेश, शुक्र, गुरु और नवांश (D9)।",
    },
  },
  {
    q: { en: "Does Mangal Dosha in one chart stop a match?", hi: "क्या एक कुंडली में मंगल दोष मिलान को रोक देता है?" },
    a: {
      en: "Not on its own. Mangal Dosha is compared across both charts; when both partners have it, or when classical cancellations apply, it is traditionally considered balanced. The free result shows a Mangal Dosh check for this pair.",
      hi: "अकेले नहीं। मंगल दोष दोनों कुंडलियों में साथ देखा जाता है; जब दोनों में हो, या शास्त्रीय परिहार लागू हों, तो इसे परंपरागत रूप से संतुलित माना जाता है। फ्री परिणाम में इस जोड़ी के लिए मंगल दोष की जाँच दिखती है।",
    },
  },
  {
    q: { en: "Is the free result the full compatibility reading?", hi: "क्या फ्री परिणाम पूरा अनुकूलता विश्लेषण है?" },
    a: {
      en: "It covers the Ashtakoot score, the koota-wise notes and the Mangal Dosh check. A fuller two-chart reading — both charts' 5th and 7th houses, Venus and the current Dasha periods — is explained in the Compatibility guide and covered by the Relationship Future Report.",
      hi: "इसमें अष्टकूट स्कोर, कूट-वार विवरण और मंगल दोष की जाँच शामिल है। दोनों कुंडलियों का अधिक विस्तृत विश्लेषण — दोनों के पंचम और सप्तम भाव, शुक्र और वर्तमान दशाएँ — अनुकूलता मार्गदर्शिका में समझाया गया है और रिलेशनशिप फ्यूचर रिपोर्ट में शामिल है।",
    },
  },
];

const tokens = {
  card: "rounded-2xl border border-[#E8DDC9] bg-[#FFFFFF] p-5 shadow-[0_1px_2px_rgba(27,42,74,0.06)] sm:p-7",
  h2: "text-[22px] font-bold leading-tight tracking-tight text-[#1B2A4A] md:text-[26px] [text-wrap:balance]",
  body: "text-[16px] leading-7 text-[#45516A]",
  link: "font-semibold text-[#A8461F] underline underline-offset-4 hover:text-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2 rounded-sm",
};

export default function KundliMatchingPage({ params }: { params: { locale: string } }) {
  const isHi = params.locale === "hi";
  const lp = isHi ? "/hi" : "";
  const pageUrl = `${SITE_URL}${lp}${KUNDLI_MATCHING_PATH}`;

  const crumbs = [
    { name: isHi ? "होम" : "Home", href: lp || "/", item: isHi ? `${SITE_URL}/hi` : `${SITE_URL}/` },
    { name: isHi ? "विवाह ज्योतिष" : "Marriage Astrology", href: `${lp}/marriage-astrology`, item: `${SITE_URL}${lp}/marriage-astrology` },
    { name: isHi ? "कुंडली मिलान" : "Kundli Matching", href: `${lp}${KUNDLI_MATCHING_PATH}`, item: pageUrl },
  ];

  const related = [
    { href: `${lp}/marriage-astrology/compatibility`, title: isHi ? "विवाह अनुकूलता: हम दोनों की अनुकूलता कितनी है?" : "Marriage Compatibility: How Compatible Are We?", note: isHi ? "गुण स्कोर से आगे — दोनों कुंडलियाँ कैसे पढ़ी जाती हैं" : "Beyond the score — how two full charts are read" },
    { href: `${lp}/marriage-astrology`, title: isHi ? "विवाह ज्योतिष" : "Marriage Astrology", note: isHi ? "विवाह से जुड़े सभी प्रश्न, फ्री टूल और रिपोर्ट" : "Every marriage question, free tools and reports" },
    { href: `${lp}/marriage-astrology/married-life`, title: isHi ? "क्या मेरा वैवाहिक जीवन सुखी रहेगा?" : "Will My Married Life Be Happy?", note: isHi ? "कुंडली वैवाहिक जीवन के बारे में क्या बताती है" : "What a birth chart says about married life" },
    { href: `${lp}/marriage-astrology/spouse-nature`, title: isHi ? "मेरा जीवनसाथी कैसा होगा?" : "What Will My Future Spouse Be Like?", note: isHi ? "कुंडली में जीवनसाथी का स्वभाव" : "Spouse nature in a kundli" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: t(f.q, isHi), acceptedAnswer: { "@type": "Answer", text: t(f.a, isHi) } })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
  };
  // The free calculator itself. No ratings or reviews are declared (none exist).
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t(TITLE, isHi),
    url: pageUrl,
    description: t(DESCRIPTION, isHi),
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    inLanguage: isHi ? "hi" : "en",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };

  return (
    <main lang={isHi ? "hi" : undefined} className="min-h-screen bg-[#FBF8F2] text-[#45516A]">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-4 md:px-6 md:pt-8">
        {/* Breadcrumb */}
        <nav aria-label={isHi ? "ब्रेडक्रंब" : "Breadcrumb"} className="text-[14px]">
          <ol className="flex flex-wrap items-center gap-x-1 text-[#5B667D]">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-x-1">
                {i < crumbs.length - 1 ? (
                  <>
                    <Link href={c.href} className="inline-flex min-h-[44px] items-center px-1 text-[#A8461F] hover:underline">{c.name}</Link>
                    <span aria-hidden="true">›</span>
                  </>
                ) : (
                  <span aria-current="page" className="inline-flex min-h-[44px] items-center px-1 text-[#1B2A4A]">{c.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Hero */}
        <header className="mt-2 max-w-3xl">
          <h1 className="text-[30px] font-bold leading-tight tracking-tight text-[#1B2A4A] md:text-[42px] [text-wrap:balance]">
            {isHi ? "शादी के लिए फ्री कुंडली मिलान" : "Free Kundli Matching for Marriage"}
          </h1>
          <p className="mt-3 text-[17px] leading-8 text-[#45516A]">
            {isHi
              ? "दोनों की जन्म तिथि, समय और स्थान डालें और पाएं 36 में से गुण मिलान स्कोर, आठों कूटों का विवरण और मंगल दोष की जाँच।"
              : "Enter both partners' date, time and place of birth to get your Guna Milan score out of 36, a breakdown of all eight kootas and a Mangal Dosh check."}
          </p>
          <p className="mt-2 text-[14px] leading-6 text-[#5B667D]">
            {isHi ? "गणना स्विस एफेमेरिस और लाहिरी अयनांश से।" : "Calculated with the Swiss Ephemeris and Lahiri Ayanamsa."}
          </p>
        </header>

        {/* Form (existing calculator) */}
        <div className="mt-6">
          <LoveFormPage locale={params.locale} />
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-12">
          {/* What you get */}
          <section aria-labelledby="km-what-you-get">
            <h2 id="km-what-you-get" className={tokens.h2}>{isHi ? "फ्री परिणाम में क्या मिलता है" : "What the free result shows"}</h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { h: isHi ? "36 में से गुण स्कोर" : "Guna score out of 36", p: isHi ? "अष्टकूट गुण मिलान का कुल स्कोर" : "Your total Ashtakoot Guna Milan score" },
                { h: isHi ? "कूट-वार विवरण" : "Koota-wise breakdown", p: isHi ? "आठों कूटों के अंक और संक्षिप्त अर्थ" : "Points and a short note for each of the eight kootas" },
                { h: isHi ? "मंगल दोष जाँच" : "Mangal Dosh check", p: isHi ? "दोनों साथियों के लिए" : "For both partners" },
              ].map((x) => (
                <li key={x.h} className="rounded-xl border border-[#E8DDC9] bg-[#FFFFFF] p-4">
                  <p className="text-[16px] font-bold text-[#1B2A4A]">{x.h}</p>
                  <p className="mt-1 text-[15px] leading-6 text-[#45516A]">{x.p}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* The 8 kootas */}
          <section aria-labelledby="km-kootas">
            <h2 id="km-kootas" className={tokens.h2}>{isHi ? "अष्टकूट गुण मिलान के आठ कूट" : "The 8 Kootas of Ashtakoot Guna Milan"}</h2>
            <p className={`mt-3 ${tokens.body}`}>
              {isHi
                ? "गुण मिलान दोनों की चंद्र राशि और जन्म नक्षत्र पर आधारित है। आठ कूट मिलकर 36 अंक बनाते हैं:"
                : "Guna Milan is based on each partner's Moon sign and birth nakshatra. Eight kootas add up to 36 points:"}
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-[#E8DDC9] bg-[#FFFFFF]">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">{isHi ? "आठ कूट, उनके अंक और वे क्या देखते हैं" : "The eight kootas, their points and what they read"}</caption>
                <thead className="bg-[#F5EEDF] text-[14px] text-[#1B2A4A]">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">{isHi ? "कूट" : "Koota"}</th>
                    <th scope="col" className="px-3 py-3 text-right font-semibold">{isHi ? "अंक" : "Points"}</th>
                    <th scope="col" className="px-4 py-3 font-semibold">{isHi ? "परंपरागत रूप से क्या देखता है" : "What it traditionally reads"}</th>
                  </tr>
                </thead>
                <tbody>
                  {KOOTAS.map((k) => (
                    <tr key={k.name.en} className="border-t border-[#EFE7D8] align-top">
                      <th scope="row" className="px-4 py-3 text-[15px] font-semibold text-[#1B2A4A]">{t(k.name, isHi)}</th>
                      <td className="px-3 py-3 text-right text-[15px] font-semibold text-[#1B2A4A]">{k.pts}</td>
                      <td className="px-4 py-3 text-[15px] leading-6 text-[#45516A]">{t(k.reads, isHi)}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-[#E8DDC9] bg-[#FBF8F2]">
                    <th scope="row" className="px-4 py-3 text-[15px] font-bold text-[#1B2A4A]">{isHi ? "कुल" : "Total"}</th>
                    <td className="px-3 py-3 text-right text-[15px] font-bold text-[#1B2A4A]">36</td>
                    <td className="px-4 py-3" />
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Reading the score */}
          <section aria-labelledby="km-score">
            <h2 id="km-score" className={tokens.h2}>{isHi ? "अपना गुण स्कोर कैसे पढ़ें" : "How to Read Your Guna Score"}</h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {BANDS.map((b) => (
                <li key={b.range.en} className="rounded-xl border border-[#E8DDC9] bg-[#FFFFFF] px-4 py-3">
                  <p className="text-[16px] font-bold text-[#1B2A4A]">{t(b.range, isHi)}</p>
                  <p className="text-[15px] leading-6 text-[#45516A]">{t(b.meaning, isHi)}</p>
                </li>
              ))}
            </ul>
            <p className={`mt-4 ${tokens.body}`}>
              {isHi ? "गुण स्कोर शुरुआत है; दोनों पूरी कुंडलियों का विश्लेषण बताता है कि दोनों का तालमेल कितना अच्छा है। " : "The Guna score is the starting point; reading both full charts shows how well two people fit together. "}
              <Link href={`${lp}/marriage-astrology/compatibility`} className={tokens.link}>
                {isHi ? "विवाह अनुकूलता मार्गदर्शिका पढ़ें" : "Read the marriage compatibility guide"}
              </Link>
            </p>
          </section>

          {/* Mangal Dosh */}
          <section aria-labelledby="km-mangal">
            <h2 id="km-mangal" className={tokens.h2}>{isHi ? "कुंडली मिलान में मंगल दोष" : "Mangal Dosh in Kundli Matching"}</h2>
            <p className={`mt-3 ${tokens.body}`}>
              {isHi
                ? "मंगल दोष दोनों कुंडलियों में साथ देखा जाता है। जब दोनों में हो, या शास्त्रीय परिहार लागू हों, तो इसे परंपरागत रूप से संतुलित माना जाता है। फ्री परिणाम में इस जोड़ी के लिए मंगल दोष की जाँच शामिल है। "
                : "Mangal Dosh is compared across both charts. When both partners have it, or when classical cancellations apply, it is traditionally considered balanced. The free result includes a Mangal Dosh check for this pair. "}
              <Link href={`${lp}/tools/mangal-dosh`} className={tokens.link}>
                {isHi ? "किसी एक कुंडली का मंगल दोष अलग से जाँचें" : "Check Mangal Dosh for one chart"}
              </Link>
            </p>
          </section>

          {/* How it is calculated */}
          <section aria-labelledby="km-how">
            <h2 id="km-how" className={tokens.h2}>{isHi ? "गणना कैसे होती है" : "How the Match Is Calculated"}</h2>
            <p className={`mt-3 ${tokens.body}`}>
              {isHi
                ? "दोनों की चंद्र राशि और जन्म नक्षत्र स्विस एफेमेरिस और लाहिरी अयनांश से निकाले जाते हैं, फिर पारंपरिक अष्टकूट नियमों से 36 में से गुण गिने जाते हैं। इसीलिए दोनों का सटीक जन्म समय और चुना हुआ जन्म स्थान ज़रूरी है।"
                : "Each partner's Moon sign and birth nakshatra are calculated with the Swiss Ephemeris and Lahiri Ayanamsa, then scored out of 36 using the traditional Ashtakoot rules. That is why both exact birth times and a selected birth place are required."}
            </p>
          </section>

          {/* FAQ */}
          <section aria-labelledby="km-faq">
            <h2 id="km-faq" className={tokens.h2}>{isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}</h2>
            <div className="mt-4 space-y-3">
              {FAQS.map((f) => (
                <details key={f.q.en} className="group rounded-xl border border-[#E8DDC9] bg-[#FFFFFF]">
                  <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[16px] font-semibold text-[#1B2A4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] rounded-xl [&::-webkit-details-marker]:hidden">
                    <span>{t(f.q, isHi)}</span>
                    <span aria-hidden="true" className="flex-none text-[#A8461F] transition group-open:rotate-45">+</span>
                  </summary>
                  <div className="border-t border-[#EFE7D8] px-4 py-3 text-[16px] leading-7 text-[#45516A]">{t(f.a, isHi)}</div>
                </details>
              ))}
            </div>
          </section>

          {/* Related guides */}
          <section aria-labelledby="km-related" className="rounded-2xl border border-[#E8DDC9] bg-[#F5EEDF] p-5 md:p-7">
            <h2 id="km-related" className={tokens.h2}>{isHi ? "विवाह से जुड़ी मार्गदर्शिकाएँ" : "Related Marriage Guides"}</h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="flex min-h-[44px] flex-col rounded-xl border border-[#E8DDC9] bg-[#FFFFFF] px-4 py-3 hover:border-[#A8461F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]">
                    <span className="text-[16px] font-bold leading-snug text-[#1B2A4A]">{r.title}</span>
                    <span className="mt-1 text-[14px] leading-6 text-[#45516A]">{r.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
    </main>
  );
}
