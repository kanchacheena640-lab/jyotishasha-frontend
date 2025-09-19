// components/GemstoneConsultation.tsx
"use client";

import { useState } from "react";
import rashiMapping from "@/app/data/rashi_mapping";
import rashiContent from "@/app/data/rashi_content";
import Link from "next/link";


const normalize = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const rashiMap = rashiMapping.rashi_mapping;
const rashis = rashiContent.rashis;

export default function GemstoneConsultation() {
  const [name, setName] = useState("");
  const [selectedRashi, setSelectedRashi] = useState("");
  const [result, setResult] = useState<{
    rashi: string;
    gemstone: string;
    gemstone_id: string;
    condition: string;
    solution: string;
  } | null>(null);

  const rashiMap = rashiMapping.rashi_mapping || {};
  const rashiContentList = rashiContent.rashis || [];

  const handleConsult = () => {
    let detectedRashiKey = "";
    const input = normalize(name.trim());

    if (!input) return;

    outer: for (const [key, val] of Object.entries(rashiMap)) {
      const hindiSyllables = val.syllables.hindi || [];
      const englishSyllables = val.syllables.english || [];

      for (let len = 3; len >= 1; len--) {
        const prefix = normalize(input.slice(0, len));
        for (let s of hindiSyllables) {
          if (normalize(s) === prefix) {
            detectedRashiKey = key;
            break outer;
          }
        }
      }

      for (let s of englishSyllables) {
        if (input.startsWith(normalize(s))) {
          detectedRashiKey = key;
          break outer;
        }
      }
    }

    if (!detectedRashiKey && selectedRashi) {
      detectedRashiKey = selectedRashi.toLowerCase();
    }

    const rashiDetails = rashiMap[detectedRashiKey as keyof typeof rashiMap];

    // ✅ Keep your original logic — it was working
    const rashiInfo = rashiContentList.find(
      (r) => {
        const rashi = r?.hindi?.rashi;
        if (!rashi || !rashiDetails?.name) return false;
        if (Array.isArray(rashi)) {
          return rashi.includes(rashiDetails.name);
        }
        return rashi.includes(rashiDetails.name);
      }
    );

    if (rashiDetails && rashiInfo) {
      setResult({
        rashi: rashiDetails.name,
        gemstone:
          rashiInfo.hindi.solution
            .match(/धारण करें।|धारण करें| पहनें।|पहनें/)?.input
            ?.split("धारण करें")[0]
            ?.split(" पहनें")[0]
            ?.trim() ?? "",
        gemstone_id: rashiInfo.gemstone_id ?? "", // ✅ moved outside `hindi`
        condition: rashiInfo.hindi.condition,
        solution: rashiInfo.hindi.solution,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white/10 rounded shadow text-white">
      <h2 className="text-2xl font-bold mb-6 text-white/90">रत्न परामर्श</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-white/20 rounded px-3 py-2 mb-4 bg-white/10 text-white placeholder:text-white/60"
        placeholder="आपका नाम"
      />

      <button
        onClick={handleConsult}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 w-full"
      >
        आपका राशि रत्‍न...
      </button>

      {result && (
        <div className="mt-6 bg-white/10 p-4 rounded border border-white/20">
          <p className="text-lg font-semibold text-green-300">
            आपके नाम के अनुसार आपकी राशि{" "}
            <span className="text-white font-bold">{result.rashi}</span> है।
          </p>
          <p className="mt-4 text-sm text-white/80">{result.condition}</p>
          <p className="mt-2 font-medium text-white">{result.solution}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 border border-white/20 p-4 rounded text-center">
              <img
                src={`/rings/${result.gemstone_id}-created.webp`}
                alt={`Created ${result.gemstone}`}
                className="mx-auto w-28 h-auto mb-3"
              />
              <h3 className="font-bold text-white text-lg mb-2">
                Created {result.gemstone_id.charAt(0).toUpperCase() + result.gemstone_id.slice(1)} 
              </h3>
              <a
                href="https://astroblog.in/product-category/rashi-upratan/"
                target="_blank"
                className="inline-block bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
              >
                ₹599 : Buy Now
              </a>
            </div>

            <div className="bg-white/10 border border-white/20 p-4 rounded text-center">
              <img
                src={`/rings/${result.gemstone_id}-original.webp`}
                alt={`Original Certified ${result.gemstone}`}
                className="mx-auto w-28 h-auto mb-3"
              />
              <h3 className="font-bold text-white text-lg mb-2">
                Original {result.gemstone_id.charAt(0).toUpperCase() + result.gemstone_id.slice(1)}
              </h3>
              <a
                href="https://astroblog.in/product-category/rashi-ratna/"
                target="_blank"
                className="inline-block bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
              >
                ₹1200 : Buy Now
              </a>
            </div>
          </div>

          <div className="mt-6 border border-[#007BFF] rounded-lg p-4 bg-[#f3f8ff] text-center">
            <p className="text-md text-[#003366] font-semibold mb-3">
              क्या आप अपने वर्तमान <strong>दशा और गोचर</strong> के आधार पर विशेष रत्न परामर्श चाहते हैं?
            </p>
            <Link
              href="/special-gemstone-consult" // 👈 yahan apna slug do
              className="inline-block bg-white text-black font-bold px-5 py-2 rounded hover:bg-gray-100 border border-[#007BFF] transition-all"
            >
              अभी प्राप्त करें – ₹49 में
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
