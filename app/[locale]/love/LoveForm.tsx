"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import PlaceAutocompleteInput from "@/components/PlaceAutocompleteInput";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "https://jyotishasha-backend.onrender.com";

interface LoveFormProps {
  locale: string;
}

export default function LoveFormPage({ locale }: LoveFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isHi = locale === "hi";
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const [form, setForm] = useState({
    language: locale,
    boy: { name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0 },
    girl: { name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0 },
  });

  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  const update = (section: "boy" | "girl", field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const submit = async () => {
    if (loading) return;

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    if (!form.boy.dob || !form.girl.dob || form.boy.lat === 0 || form.girl.lat === 0) {
      alert(isHi ? "कृपया जन्म तिथि और स्थान सही ढंग से भरें" : "Please fill birth details correctly");
      return;
    }

    setLoading(true);

    const payload = {
      language: form.language,
      boy_is_user: true,
      user: form.boy,
      partner: form.girl,
    };

    try {
      const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: abortControllerRef.current.signal,
      };

      const [reportRes, truthRes, marriageRes] = await Promise.all([
        fetch(`${BACKEND}/api/love/report`, fetchOptions),
        fetch(`${BACKEND}/api/love/truth-or-dare`, fetchOptions),
        fetch(`${BACKEND}/api/love/love-marriage-probability`, fetchOptions),
      ]);

      if (!reportRes.ok) throw new Error("Primary API failed");

      const [reportJson, truthJson, marriageJson] = await Promise.all([
        reportRes.json(),
        truthRes.json(),
        marriageRes.json(),
      ]);

      sessionStorage.setItem("love_payload", JSON.stringify(payload));
      sessionStorage.setItem("love_summary", JSON.stringify(reportJson));
      sessionStorage.setItem("love_tools", JSON.stringify({
        truth_or_dare: truthJson.data || truthJson,
        marriage_potential: marriageJson.data || marriageJson,
      }));

      router.push(`/${locale}/love/result`);
    } catch (e: any) {
      if (e.name === 'AbortError') return;
      console.error("Submission Error:", e);
      alert(isHi ? "सर्वर धीमा है, कृपया पुनः प्रयास करें" : "Server is slow, please try again");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm";
  const labelClass = "block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
          {isHi ? "💍 वैदिक मिलान" : "💍 Vedic Matchmaking"}
        </h2>
        <p className="text-gray-400 text-sm">
          {isHi ? "कुंडली और गुण मिलान" : "Accurate Kundli & Guna Milan"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BOY CARD */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4 backdrop-blur-sm relative group">
          <h2 className="text-lg font-bold text-blue-400">♂ {isHi ? "लड़का" : "Boy's Details"}</h2>
          <div>
            <label className={labelClass}>{isHi ? "पूरा नाम" : "Full Name"}</label>
            <input 
              className={inputClass} 
              value={form.boy.name} 
              onChange={(e) => update("boy", "name", e.target.value)} 
              placeholder={isHi ? "नाम लिखें..." : "Enter name..."}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>{isHi ? "जन्म तिथि" : "DOB"}</label>
              <input type="date" className={inputClass} value={form.boy.dob} onChange={(e) => update("boy", "dob", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{isHi ? "समय" : "Time"}</label>
              <input type="time" className={inputClass} value={form.boy.tob} onChange={(e) => update("boy", "tob", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{isHi ? "जन्म स्थान" : "Place of Birth"}</label>
            <PlaceAutocompleteInput
              value={form.boy.pob}
              onChange={(val) => update("boy", "pob", val)}
              onPlaceSelected={(p) => { 
                update("boy", "pob", p.name); 
                update("boy", "lat", p.lat); 
                update("boy", "lng", p.lng); 
              }}
            />
          </div>
        </div>

        {/* GIRL CARD */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4 backdrop-blur-sm relative group">
          <h2 className="text-lg font-bold text-pink-400">♀ {isHi ? "लड़की" : "Girl's Details"}</h2>
          <div>
            <label className={labelClass}>{isHi ? "पूरा नाम" : "Full Name"}</label>
            <input 
              className={inputClass} 
              value={form.girl.name} 
              onChange={(e) => update("girl", "name", e.target.value)} 
              placeholder={isHi ? "नाम लिखें..." : "Enter name..."}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>{isHi ? "जन्म तिथि" : "DOB"}</label>
              <input type="date" className={inputClass} value={form.girl.dob} onChange={(e) => update("girl", "dob", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{isHi ? "समय" : "Time"}</label>
              <input type="time" className={inputClass} value={form.girl.tob} onChange={(e) => update("girl", "tob", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{isHi ? "जन्म स्थान" : "Place of Birth"}</label>
            <PlaceAutocompleteInput
              value={form.girl.pob}
              onChange={(val) => update("girl", "pob", val)}
              onPlaceSelected={(p) => { 
                update("girl", "pob", p.name); 
                update("girl", "lat", p.lat); 
                update("girl", "lng", p.lng); 
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-sm mx-auto">
        <button
          onClick={submit}
          disabled={loading}
          className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 p-px shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
        >
          <div className="bg-[#0f0a1e] py-4 rounded-2xl">
            <span className="text-lg font-bold text-white uppercase tracking-widest">
              {loading ? (isHi ? "गणना जारी है..." : "Analyzing...") : (isHi ? "शुभ मिलान चेक करें" : "Check Match")}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}