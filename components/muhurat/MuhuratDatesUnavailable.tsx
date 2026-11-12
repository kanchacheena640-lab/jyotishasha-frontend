// Shown in place of the date sections when there is nothing to list, so a Muhurat page is
// never left with silently blank date sections.
//   reason "error": the date service did not answer (or answered with an error).
//   reason "none":  the service answered, but no date meets the page's criteria.
export default function MuhuratDatesUnavailable({
  isHi,
  reason,
  rolling,
  monthName,
  year,
}: {
  isHi: boolean;
  reason: "error" | "none";
  rolling: boolean;
  monthName: string;
  year: number;
}) {
  const period = `${monthName} ${year}`;
  let text: string;
  if (reason === "error") {
    text = isHi
      ? `${rolling ? "आने वाली" : `${period} की`} शुभ तिथियां अभी लोड नहीं हो सकीं। कृपया थोड़ी देर बाद फिर देखें, या नीचे माहवार सूची से कोई अन्य महीना चुनें।`
      : `${rolling ? "Upcoming" : period} auspicious dates could not be loaded right now. Please check again shortly, or choose another month from the month-wise list below.`;
  } else if (rolling) {
    text = isHi
      ? "अगले 60 दिनों में कोई तिथि इस पेज के शुभ मानदंडों पर खरी नहीं उतरती। नीचे माहवार सूची से आगे के महीने देखें।"
      : "No date in the next 60 days meets the auspicious criteria used on this page. See later months in the month-wise list below.";
  } else {
    text = isHi
      ? `${period} में कोई तिथि इस पेज के शुभ मानदंडों पर खरी नहीं उतरती। नीचे माहवार सूची से अन्य महीने देखें।`
      : `No date in ${period} meets the auspicious criteria used on this page. See other months in the month-wise list below.`;
  }

  return (
    <section
      id="all-dates"
      role="status"
      className="scroll-mt-20 mb-8 rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <h2 className="text-lg font-bold text-purple-200 mb-2">
        {isHi ? "📅 शुभ तिथियां" : "📅 Auspicious Dates"}
      </h2>
      <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
    </section>
  );
}
