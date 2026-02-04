"use client";

import { useEffect, useMemo, useState } from "react";

type TransitSection = { title: string; points: string[] };
type TransitData = {
  ascendant: string;
  planet: string;
  house: number;
  lang: string;
  title: string;
  summary: string;
  sections: TransitSection[];
  strengths: string[];
  challenges: string[];
  closing: string;
  cta_context: { type: string; ascendant: string; planet: string; house: number };
};

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const BACKEND = "https://jyotishasha-backend.onrender.com";

async function fetchTransitClient(args: {
  ascendant: string;
  planet: string;
  house: number;
  lang: "en" | "hi";
}): Promise<TransitData | null> {
  const url =
    `${BACKEND}/api/transit` +
    `?ascendant=${encodeURIComponent(args.ascendant)}` +
    `&planet=${encodeURIComponent(args.planet)}` +
    `&house=${args.house}` +
    `&lang=${args.lang}`;

  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

export default function AscendantSunTransitClient(props: {
  ascendant: string; // slug: pisces
  planet: "sun";
  lang: "en" | "hi";
  initialHouse: number;
  initialData: TransitData | null;
}) {
  const [house, setHouse] = useState<number>(props.initialHouse);
  const [data, setData] = useState<TransitData | null>(props.initialData);
  const [loading, setLoading] = useState(false);

  const houses = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);

  // If initialData is null (missing file), still allow switching houses
  useEffect(() => {
    setHouse(props.initialHouse);
    setData(props.initialData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialHouse, props.lang, props.ascendant]);

  async function onHouseChange(h: number) {
    if (h === house) return;

    setHouse(h);
    setLoading(true);

    const next = await fetchTransitClient({
      ascendant: props.ascendant,
      planet: props.planet,
      house: h,
      lang: props.lang,
    });

    setData(next);
    setLoading(false);
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-3">
        {titleCase(props.ascendant)} Ascendant – House-wise Effects (Sun Transit)
      </h2>

      {/* House Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {houses.map((h) => (
          <button
            key={h}
            onClick={() => onHouseChange(h)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition ${
              h === house
                ? "bg-blue-700 text-white border-blue-700"
                : "bg-white text-gray-800 border-gray-200 hover:border-blue-400"
            }`}
            aria-pressed={h === house}
          >
            House {h}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-gray-50 border rounded-xl p-4 mb-6 text-sm text-gray-600">
          Loading House {house} effects…
        </div>
      )}

      {/* No data */}
      {!loading && !data && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm text-yellow-900">
          Content for <strong>House {house}</strong> is not available yet.
        </div>
      )}

      {/* Content */}
      {data && (
        <div className="space-y-8">
          <header className="bg-gray-50 border rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
            <p className="text-gray-800 leading-relaxed">{data.summary}</p>
          </header>

          {/* Sections */}
          <div className="space-y-4">
            {data.sections?.map((sec, idx) => (
              <section key={`${sec.title}-${idx}`} className="border rounded-2xl p-6">
                <h4 className="text-lg font-semibold mb-3">{sec.title}</h4>
                <ul className="list-disc pl-6 space-y-1 text-gray-800">
                  {sec.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* Strengths / Challenges */}
          <div className="grid md:grid-cols-2 gap-4">
            <section className="border rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-3">Strengths</h4>
              <ul className="list-disc pl-6 space-y-1 text-gray-800">
                {data.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>

            <section className="border rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-3">Challenges</h4>
              <ul className="list-disc pl-6 space-y-1 text-gray-800">
                {data.challenges.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Closing */}
          <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-2">Key takeaway</h4>
            <p className="text-gray-900">{data.closing}</p>
          </section>
        </div>
      )}
    </section>
  );
}
