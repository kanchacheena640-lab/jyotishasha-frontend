"use client";

export default function EEATTrustSnippet() {
  return (
    <section className="mt-12 rounded-2xl border border-indigo-400/30 bg-white/5 p-5 text-sm text-gray-200">
      <h3 className="text-indigo-200 font-semibold mb-2">
        About Jyotishasha Astrology Engine
      </h3>
      <p className="leading-relaxed">
        Jyotishasha uses a <strong>rule-based Vedic astrology engine</strong> with
        <strong> ephemeris-based astronomical calculations</strong>, precise
        <strong> latitude–longitude validation</strong>, and classical standards
        like <strong>Lahiri Ayanamsa</strong>. Results are deterministic, not
        generic or random.
      </p>
      <p className="mt-2">
        <a
          href="/astrology-methodology"
          className="text-indigo-300 underline hover:text-white"
        >
          Read our Astrology Methodology →
        </a>
      </p>
      <p className="mt-2 text-xs text-indigo-200/80">
        Astrology insights are for guidance and self-understanding only.
      </p>
    </section>
  );
}
