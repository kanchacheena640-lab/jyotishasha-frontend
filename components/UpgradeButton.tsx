"use client";

import React, { useState } from "react";

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);

    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch("/api/subscription/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: "monthly" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // 👈 Make sure to set this in your .env
        amount: data.amount,
        currency: data.currency,
        name: "Jyotishasha",
        description: "Premium Horoscope Subscription",
        order_id: data.order_id,
        handler: function (response: any) {
          alert("Payment Successful! 🎉");
          window.location.reload();
        },
        prefill: {
          email: "user@example.com",
        },
        theme: {
          color: "#7e22ce",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
    >
      {loading ? "Processing..." : "Upgrade to Premium ₹51"}
    </button>
  );
}
