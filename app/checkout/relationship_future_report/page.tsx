// app/checkout/relationship_future_report/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RelationshipFutureReportCheckout() {
  const router = useRouter();
  const [payload, setPayload] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("relationship_report_payload");
    if (!raw) {
      router.replace("/reports");
      return;
    }
    setPayload(JSON.parse(raw));
  }, [router]);

  const handlePay = async () => {
    if (!payload) return;
    setLoading(true);

    try {
      // 1️⃣ Create Razorpay order (backend decides price)
      const res = await fetch(
        "https://jyotishasha-backend.onrender.com/api/razorpay-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product: "relationship_future_report",
          }),
        }
      );

      const order = await res.json();
      if (!res.ok || !order.order_id) {
        alert("Failed to create payment order");
        setLoading(false);
        return;
      }

      // 2️⃣ Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: order.order_id,
        amount: order.amount * 100,
        currency: order.currency,
        name: "Jyotishasha",
        description: "Relationship Future Report",
        handler: async function (response: any) {
          // 3️⃣ Send everything to webhook
          await fetch(
            "https://jyotishasha-backend.onrender.com/webhook",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...payload,
                product: "relationship_future_report",
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
              }),
            }
          );

          sessionStorage.removeItem("relationship_report_payload");
          window.location.href = "/thank-you";
        },
        theme: { color: "#7c3aed" },
      };

      const rz = new (window as any).Razorpay(options);
      rz.open();
    } catch (e) {
      console.error(e);
      alert("Payment error");
    } finally {
      setLoading(false);
    }
  };

  if (!payload) {
    return <div className="p-6 text-center">Loading checkout…</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold text-center mb-4">
        Relationship Future Report
      </h1>

      <div className="text-sm text-gray-600 space-y-1 mb-6">
        <p><b>Boy:</b> {payload.user?.name}</p>
        <p><b>Girl:</b> {payload.partner?.name}</p>
        <p><b>Language:</b> {payload.language}</p>
      </div>

      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold"
      >
        {loading ? "Processing…" : "Proceed to Payment"}
      </button>
    </div>
  );
}
