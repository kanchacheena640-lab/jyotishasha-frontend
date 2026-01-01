"use client";

import { useState } from "react";
import PlaceAutocompleteInput from "@/components/PlaceAutocompleteInput";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://jyotishasha-backend.onrender.com";

export default function RelationshipFutureReportForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    language: "en",
    boy: { name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0 },
    girl: { name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0 },
  });

  const update = (side: "boy" | "girl", key: string, value: any) => {
    setForm((p) => ({
      ...p,
      [side]: { ...p[side], [key]: value },
    }));
  };

  const input =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500";

  const submit = async () => {
    if (!form.email) {
      alert("Email is required to receive the report.");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create Razorpay Order
      const res = await fetch(`${BACKEND}/api/razorpay-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "relationship_future_report",
        }),
      });

      const order = await res.json();
      if (!order.order_id) {
        alert("Unable to initiate payment");
        setLoading(false);
        return;
      }

      // 2️⃣ Open Razorpay directly
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: order.order_id,
        amount: order.amount,
        currency: order.currency,
        name: "Jyotishasha",
        description: "Relationship Future Report",

        handler: async function (response: any) {
          // 🔥 FINAL FIX: FLATTEN PAYLOAD (matches backend expectation)
          await fetch(`${BACKEND}/webhook`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              product: "relationship_future_report",
              email: form.email,
              language: form.language,

              // 👇 REQUIRED TOP-LEVEL USER FIELDS
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

          window.location.href = "/thank-you";
        },

        theme: { color: "#7c3aed" },
      };

      const rz = new (window as any).Razorpay(options);
      rz.open();
    } catch (e) {
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10 bg-white">
      {/* HERO */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-8 text-center text-white shadow-xl">
        <h1 className="text-3xl font-extrabold">
          💞 Relationship Future Report
        </h1>
        <p className="mt-3 text-purple-100">
          Deep love → marriage analysis. Delivered on email.
        </p>
      </div>

      {/* EMAIL */}
      <div className="rounded-2xl border border-purple-200 bg-purple-50 p-6 space-y-2">
        <h2 className="text-lg font-semibold text-purple-900">
          📧 Email (Required)
        </h2>
        <input
          type="email"
          className={input}
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      {/* BOY */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-blue-900">👨 Boy Details</h2>
        <input
          className={input}
          placeholder="Name"
          onChange={(e) => update("boy", "name", e.target.value)}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="date"
            className={input}
            onChange={(e) => update("boy", "dob", e.target.value)}
          />
          <input
            type="time"
            className={input}
            onChange={(e) => update("boy", "tob", e.target.value)}
          />
        </div>
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

      {/* GIRL */}
      <div className="rounded-2xl border border-pink-200 bg-pink-50 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-pink-900">👩 Girl Details</h2>
        <input
          className={input}
          placeholder="Name"
          onChange={(e) => update("girl", "name", e.target.value)}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="date"
            className={input}
            onChange={(e) => update("girl", "dob", e.target.value)}
          />
          <input
            type="time"
            className={input}
            onChange={(e) => update("girl", "tob", e.target.value)}
          />
        </div>
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

      {/* PAY */}
      <button
        onClick={submit}
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-lg font-semibold text-white shadow-lg"
      >
        {loading ? "Opening Payment…" : "Pay ₹199 & Generate Report"}
      </button>
    </div>
  );
}
