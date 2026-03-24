"use client";

import { useState, useEffect } from "react";
import PlaceAutocompleteInput from "@/components/PlaceAutocompleteInput";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "https://jyotishasha-backend.onrender.com";

interface RelationshipFutureReportFormProps {
  locale: string;
}

export default function RelationshipFutureReportForm({ locale }: RelationshipFutureReportFormProps) {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isHi = locale === "hi";

  const [form, setForm] = useState({
    email: "",
    language: locale,
    boy: { name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0 },
    girl: { name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0 },
  });

  // Hydration Guard & Auto-fill
  useEffect(() => {
    setMounted(true);
    const prevData = sessionStorage.getItem("love_payload");
    if (prevData) {
      try {
        const p = JSON.parse(prevData);
        setForm(prev => ({
          ...prev,
          boy: { 
            name: p.user?.name || "", 
            dob: p.user?.dob || "", 
            tob: p.user?.tob || "", 
            pob: p.user?.pob || "", 
            lat: p.user?.latitude || p.user?.lat || 0, 
            lng: p.user?.longitude || p.user?.lng || 0 
          },
          girl: { 
            name: p.partner?.name || "", 
            dob: p.partner?.dob || "", 
            tob: p.partner?.tob || "", 
            pob: p.partner?.pob || "", 
            lat: p.partner?.latitude || p.partner?.lat || 0, 
            lng: p.partner?.longitude || p.partner?.lng || 0 
          }
        }));
      } catch (e) {
        console.error("Session storage parse error", e);
      }
    }
  }, []);

  if (!mounted) return null;

  const update = (side: "boy" | "girl", key: string, value: any) => {
    setForm((p) => ({
      ...p,
      [side]: { ...p[side], [key]: value },
    }));
  };

  const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";
  const labelClass = "block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider";

  const submit = async () => {
    if (!form.email || !form.email.includes("@")) {
      alert(isHi ? "कृपया सही ईमेल दर्ज करें।" : "Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      // 1. Order create call
      const res = await fetch(`${BACKEND}/api/razorpay-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "relationship_future_report" }),
      });

      const order = await res.json();
      if (!order.order_id) throw new Error("Payment initiation failed");

      // 2. Razorpay Window
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: order.order_id,
        amount: order.amount,
        currency: order.currency,
        name: "Jyotishasha",
        description: isHi ? "रिलेशनशिप भविष्य रिपोर्ट" : "Relationship Future Report",
        image: "/logo.png",
        handler: async function (response: any) {
          // 3. Success -> Webhook call
          await fetch(`${BACKEND}/webhook`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              product: "relationship_future_report",
              email: form.email,
              language: form.language,
              name: form.boy.name,
              dob: form.boy.dob,
              tob: form.boy.tob,
              pob: form.boy.pob,
              latitude: form.boy.lat,
              longitude: form.boy.lng,
              boy_is_user: true,
              partner: {
                name: form.girl.name,
                dob: form.girl.dob,
                tob: form.girl.tob,
                pob: form.girl.pob,
                latitude: form.girl.lat,
                longitude: form.girl.lng,
              },
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
            }),
          });
          window.location.href = `/${locale}/thank-you`;
        },
        theme: { color: "#7c3aed" },
      };

      const rz = new (window as any).Razorpay(options);
      rz.open();
    } catch (e) {
      alert(isHi ? "भुगतान विफल रहा। पुनः प्रयास करें।" : "Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10 bg-[#0f0a1e] min-h-screen text-white">
      
      {/* HERO */}
      <div className="rounded-[2.5rem] bg-gradient-to-br from-purple-600/20 to-indigo-900/30 p-8 md:p-12 text-center border border-purple-500/20 shadow-2xl relative overflow-hidden">
        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
          💞 {isHi ? "रिलेशनशिप भविष्य रिपोर्ट" : "Relationship Future Report"}
        </h1>
        <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto italic">
          {isHi 
            ? "विवाह की सफलता, ग्रहों के दोष और भविष्य की पूरी जानकारी सीधे ईमेल पर।" 
            : "Deep love analysis based on Vedic principles delivered instantly."}
        </p>
      </div>

      {/* EMAIL */}
      <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-6 md:p-8 backdrop-blur-sm">
        <label className="block text-xs font-black text-purple-400 uppercase tracking-[0.2em] mb-3">
           {isHi ? "ईमेल एड्रेस (रिपोर्ट इसी पर आएगी)" : "Email (Report Delivery Address)"}
        </label>
        <input
          type="email"
          className={`${inputClass} text-lg py-4 border-purple-500/30 font-bold`}
          placeholder="example@gmail.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BOY */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 space-y-5">
          <h2 className="text-xl font-bold text-blue-400">👨 {isHi ? "लड़के का विवरण" : "Boy's Details"}</h2>
          <div>
            <label className={labelClass}>{isHi ? "नाम" : "Name"}</label>
            <input className={inputClass} value={form.boy.name} onChange={(e) => update("boy", "name", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{isHi ? "जन्म तिथि" : "DOB"}</label>
              <input type="date" className={inputClass} value={form.boy.dob} onChange={(e) => update("boy", "dob", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{isHi ? "समय" : "TOB"}</label>
              <input type="time" className={inputClass} value={form.boy.tob} onChange={(e) => update("boy", "tob", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{isHi ? "जन्म स्थान" : "POB"}</label>
            <PlaceAutocompleteInput
              value={form.boy.pob}
              onChange={(v) => update("boy", "pob", v)}
              onPlaceSelected={(p) => {
                update("boy", "pob", p.name);
                update("boy", "lat", p.lat);
                update("boy", "lng", p.lng);
              }}
            />
          </div>
        </div>

        {/* GIRL */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 space-y-5">
          <h2 className="text-xl font-bold text-pink-400">👩 {isHi ? "लड़की का विवरण" : "Girl's Details"}</h2>
          <div>
            <label className={labelClass}>{isHi ? "नाम" : "Name"}</label>
            <input className={inputClass} value={form.girl.name} onChange={(e) => update("girl", "name", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{isHi ? "जन्म तिथि" : "DOB"}</label>
              <input type="date" className={inputClass} value={form.girl.dob} onChange={(e) => update("girl", "dob", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{isHi ? "समय" : "TOB"}</label>
              <input type="time" className={inputClass} value={form.girl.tob} onChange={(e) => update("girl", "tob", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{isHi ? "जन्म स्थान" : "POB"}</label>
            <PlaceAutocompleteInput
              value={form.girl.pob}
              onChange={(v) => update("girl", "pob", v)}
              onPlaceSelected={(p) => {
                update("girl", "pob", p.name);
                update("girl", "lat", p.lat);
                update("girl", "lng", p.lng);
              }}
            />
          </div>
        </div>
      </div>

      {/* PAYMENT BUTTON */}
      <div className="mt-12 text-center">
        <button
          onClick={submit}
          disabled={loading}
          className="w-full md:max-w-md mx-auto group overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-px shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
        >
          <div className="bg-[#0f0a1e]/80 group-hover:bg-transparent transition-colors rounded-2xl py-5 px-8">
             <span className="text-xl font-black text-white">
                {loading ? (isHi ? "भुगतान प्रक्रिया में..." : "Processing...") : (isHi ? "₹199 भुगतान करें और रिपोर्ट प्राप्त करें" : "Pay ₹199 & Generate Report")}
             </span>
          </div>
        </button>
      </div>
    </div>
  );
}