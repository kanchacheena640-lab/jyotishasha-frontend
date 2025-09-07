interface YearlySignSectionProps {
  signData: {
    sign: string;
    title: string;
    overview: string;
    sections: {
      career_business: { title: string; content: string };
      money_finance: { title: string; content: string };
      love_relationships: { title: string; content: string };
      health_energy: { title: string; content: string };
    };
    tips: { general: string[] };
    summary: string;
  };
}

export default function YearlySignSection({ signData }: YearlySignSectionProps) {
  const { title, overview, sections, tips, summary } = signData;

  return (
    <section className="bg-white/10 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-purple-200 mb-2">{title}</h2>
      <p className="text-gray-200 mb-4">{overview}</p>

      {Object.values(sections).map((section, i) => (
        <div key={i} className="mb-3">
          <h3 className="text-lg font-semibold text-purple-100">{section.title}</h3>
          <p className="text-gray-300">{section.content}</p>
        </div>
      ))}

      {tips.general.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-purple-100">Tips</h3>
          <ul className="list-disc pl-6 text-gray-300">
            {tips.general.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {summary && (
        <div className="mt-4">
          <h3 className="font-semibold text-purple-100">Summary</h3>
          <p className="text-gray-200">{summary}</p>
        </div>
      )}
    </section>
  );
}
