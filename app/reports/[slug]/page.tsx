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
    language: "en",
    latitude: "",
    longitude: "",
  });

  const placeRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (window.google && placeRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(placeRef.current, {
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
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const productId = Array.isArray(rawSlug)
        ? rawSlug[0]
        : rawSlug?.toLowerCase();

      if (!productId) {
        alert("❗ Product not specified in URL. Please try again.");
        return;
      }

      const res = await fetch("https://jyotishasha-backend.onrender.com/api/razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: productId }),
      });

      const orderData = await res.json();

      if (!orderData.order_id) {
        alert("❌ Failed to create Razorpay order");
        return;
      }

      // ✅ Store offer info temporarily for UI
      setPriceDetails({
        base: orderData.base_price,
        final: orderData.final_price,
        offer: orderData.offer,
      });

      // Optional: for future use like thank-you page
      setOrder(orderData);


      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
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

  const params = useParams();
  const rawSlug = params?.slug;
  const currentSlug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  const currentReport = reportsData.find((r: Report) => r.slug === currentSlug);
  const price = currentReport?.price || 0;
  const [priceDetails, setPriceDetails] = useState({
    base: price,
    final: price,
    offer: null,
  });

  const [order, setOrder] = useState(null);
  const displaySlug = Array.isArray(rawSlug)
    ? rawSlug.join(" ")
    : rawSlug?.replace(/-/g, " ") ?? "your report";

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
        Fill Your Details for {displaySlug}
      </h2>

      {/* 👤 Personal Info */}
      <div className="bg-white p-5 rounded-xl shadow mb-4">
        <h3 className="text-lg font-semibold mb-3 text-purple-700">👤 Personal Details</h3>
        <div className="space-y-3">
          <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Full Name" className="inputStyle placeholderStyle" />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="inputStyle placeholderStyle" />
          <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="inputStyle placeholderStyle" />
        </div>
      </div>

      {/* 🔮 Birth Info */}
      <div className="bg-white p-5 rounded-xl shadow mb-5">
        <h3 className="text-lg font-semibold mb-3 text-purple-700">🔮 Birth Details</h3>
        <div className="space-y-3">
          <input
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
            className="inputStyle placeholderStyle [&::-webkit-datetime-edit]:text-[#7c4a27]"
          />
          <input
            name="tob"
            type="time"
            value={form.tob}
            onChange={handleChange}
            placeholder="Time of Birth"
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
      {/* 🌐 Language Preference */}
        <div className="bg-white p-5 rounded-xl shadow mb-5">
          <h3 className="text-lg font-semibold mb-3 text-purple-700">🌐 Language</h3>
          <select
            name="language"
            value={form.language}
            onChange={handleChange}
            className="inputStyle"
            required
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-purple-700 text-white py-3 rounded-lg font-medium hover:bg-purple-800 transition"
      >
        <div className="text-center mt-5">
          <button
            onClick={handleSubmit}
            className="w-full bg-purple-700 text-white py-3 rounded-lg font-medium hover:bg-purple-800 transition"
          >
            Proceed to Pay ₹{priceDetails.final}
            {priceDetails.offer && (
              <span className="ml-2 text-sm text-gray-300 line-through">
                ₹{priceDetails.base}
              </span>
            )}
          </button>

          {priceDetails.offer && (
            <div className="text-xs text-pink-600 font-semibold mt-2">
              {priceDetails.offer} 🎉
            </div>
          )}
        </div>
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
