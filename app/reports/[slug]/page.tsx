"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { reportsData, Report } from "../../data/reportsData";

export default function ReportCheckout() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    tob: "",
    pob: "",
    latitude: "",
    longitude: "",
  });

  const placeRef = useRef<HTMLInputElement | null>(null);

  // Google Places Autocomplete for POB
  useEffect(() => {
    if (window.google && placeRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        placeRef.current,
        { types: ["(cities)"] }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setForm((prev) => ({
          ...prev,
          pob: place.name || "",
          latitude: place.geometry?.location?.lat()?.toString() || "",
          longitude: place.geometry?.location?.lng()?.toString() || "",
        }));
      });
    }
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔎 Slug + Product Info
  const params = useParams();
  const rawSlug = params?.slug;
  const productId = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug?.toLowerCase();
  const currentReport = reportsData.find((r: Report) => r.slug === productId);
  const price = currentReport?.price || 0;
  const displaySlug = Array.isArray(rawSlug)
    ? rawSlug.join(" ")
    : rawSlug?.replace(/-/g, " ") ?? "your report";

  const handleSubmit = async () => {
    try {
      if (!productId) {
        alert("❗ Product not specified in URL. Please try again.");
        return;
      }

      // ✅ Use Render backend URL
      const res = await fetch(
        "https://jyotishasha-backend.onrender.com/api/razorpay-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product: productId, amount: price }),
        }
      );

      const orderData = await res.json();

      if (!res.ok || !orderData.order_id) {
        alert("❌ Failed to create Razorpay order");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // ✅ from .env
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Jyotishasha",
        description: `Payment for ${productId}`,
        order_id: orderData.order_id,
        handler: async function (response: any) {
          await fetch("https://jyotishasha-backend.onrender.com/webhook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...form,
              product: productId,
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
            }),
          });

          window.location.href = "/thank-you";
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#7c3aed",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong while processing payment.");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
        Fill Your Details for {displaySlug}
      </h2>

      {/* 👤 Personal Info */}
      <div className="bg-white p-5 rounded-xl shadow mb-4">
        <h3 className="text-lg font-semibold mb-3 text-purple-700">
          👤 Personal Details
        </h3>
        <div className="space-y-3">
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="inputStyle placeholderStyle"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="inputStyle placeholderStyle"
          />
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="inputStyle placeholderStyle"
          />
        </div>
      </div>

      {/* 🔮 Birth Info */}
      <div className="bg-white p-5 rounded-xl shadow mb-5">
        <h3 className="text-lg font-semibold mb-3 text-purple-700">
          🔮 Birth Details
        </h3>
        <div className="space-y-3">
          <input
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            className="inputStyle placeholderStyle [&::-webkit-datetime-edit]:text-[#7c4a27]"
          />
          <input
            name="tob"
            type="time"
            value={form.tob}
            onChange={handleChange}
            className="inputStyle placeholderStyle [&::-webkit-datetime-edit]:text-[#7c4a27]"
          />
          <input
            name="pob"
            type="text"
            ref={placeRef}
            value={form.pob}
            onChange={handleChange}
            placeholder="Place of Birth"
            className="inputStyle placeholderStyle"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          🔄 Change details if you're looking for other birth info
        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-purple-700 text-white py-3 rounded-lg font-medium hover:bg-purple-800 transition"
      >
        Proceed to Pay ₹{price}
      </button>

      <style jsx>{`
        .inputStyle {
          width: 100%;
          padding: 10px 12px;
          font-size: 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          background-color: #fff;
          color: #333;
        }
        .inputStyle:focus {
          border-color: #a855f7;
          box-shadow: 0 0 0 2px #ddd6fe;
        }
        .placeholderStyle::placeholder {
          color: #7c4a27 !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
