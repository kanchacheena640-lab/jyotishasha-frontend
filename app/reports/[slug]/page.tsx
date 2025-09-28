"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { reportsData, Report } from "../../data/reportsData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    language: "en", // ✅ Default English
  });

  const placeRef = useRef<HTMLInputElement | null>(null);

  // 🌍 Google Places Autocomplete for POB
      useEffect(() => {
      if (!placeRef.current) return;

      const interval = setInterval(() => {
        if ((window as any).google?.maps) {
          clearInterval(interval);

          const input = placeRef.current!;
          const autocomplete = new (window as any).google.maps.places.Autocomplete(input, {
            types: ["(cities)"],
          });

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
      }, 300);

      return () => clearInterval(interval);
    }, [placeRef]);

  // ⏳ Warmup ping to wake backend
  useEffect(() => {
    fetch("https://jyotishasha-backend.onrender.com/ping").catch(() => {});
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

  // 💳 Razorpay Checkout (LIVE version logic)
  const handleSubmit = async () => {
    if (!form.email || !form.dob || !form.tob || !form.pob) {
      alert("❗ Please fill all required fields (Email, DOB, TOB, POB)");
      return;
    }
    if (!form.latitude || !form.longitude) {
      alert("❗ Please select Place of Birth from suggestions");
      return;
    }

    try {
      if (!productId) {
        alert("❗ Product not specified in URL. Please try again.");
        return;
      }

      // ✅ Backend decides amount
      const res = await fetch(
        "https://jyotishasha-backend.onrender.com/api/razorpay-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product: productId }),
        }
      );

      const orderData = await res.json();

      if (!res.ok || !orderData.order_id) {
        alert("❌ Failed to create Razorpay order");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount * 100, // ✅ paise me convert
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

          // ✅ Direct thank-you page
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
            required
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
          {/* Date of Birth */}
          <div className="relative mb-3">
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Date of Birth *
            </label>
            <DatePicker
              selected={form.dob ? new Date(`${form.dob}T00:00:00`) : null}
              onChange={(date: Date | null) => {
                if (date) {
                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const day = String(date.getDate()).padStart(2, "0");
                  const formatted = `${year}-${month}-${day}`;
                  setForm((prev) => ({ ...prev, dob: formatted }));
                } else {
                  setForm((prev) => ({ ...prev, dob: "" }));
                }
              }}
              customInput={
                <div className="relative">
                  <input
                    readOnly
                    value={form.dob}
                    className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300"
                  />
                  {!form.dob && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      DD-MM-YYYY
                    </span>
                  )}
                </div>
              }
              dateFormat="dd-MM-yyyy"
              isClearable
              withPortal
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>

          {/* Time of Birth */}
          <div className="relative mb-3">
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Time of Birth *
            </label>
            <input
              type="time"
              name="tob"
              value={form.tob}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300"
              required
            />
            {!form.tob && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                HH:MM
              </span>
            )}
          </div>

          {/* Place of Birth */}
          <div className="relative mb-3">
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Place of Birth *
            </label>
            <input
              name="pob"
              type="text"
              ref={placeRef}
              value={form.pob}
              onChange={handleChange}
              placeholder="Select City"
              className="inputStyle placeholderStyle"
              required
            />
          </div>

          {/* Language */}
          <div className="relative mb-3">
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Language
            </label>
            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              className="inputStyle"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
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
          color: #9ca3af !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
