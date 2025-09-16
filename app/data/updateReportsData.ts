// app/data/updateReportsData.ts

import type { Report } from "./reportsData";
import { reportsData } from "./reportsData";

export async function updateReportsData(): Promise<Report[]> {
  const updatedReports = await Promise.all(
    reportsData.map(async (report: Report) => {
      try {
        const res = await fetch(
          "https://jyotishasha-backend.onrender.com/api/razorpay-order",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product: report.slug }),
            cache: "no-store",
          }
        );

        const data = await res.json();
        console.log("🔎 API response for:", report.slug, data);

        if (!res.ok || data.error) {
          console.warn(`⚠️ API failed for ${report.slug}:`, data.error);
          return {
            ...report,
            price: null,
            basePrice: null,
            offer: null,
            badge: null,
          };
        }

        return {
          ...report,
          price: typeof data.final_price === "number" ? data.final_price : null,
          basePrice: typeof data.base_price === "number" ? data.base_price : null,
          offer:
            typeof data.offer === "string"
              ? data.offer
              : data.offer
              ? "true"
              : null,
          badge:
            typeof data.badge === "string"
              ? data.badge
              : data.offer
              ? "OFFER"
              : null,
        };
      } catch (e) {
        console.error(`❌ Exception for ${report.slug}:`, e);
        return {
          ...report,
          price: null,
          basePrice: null,
          offer: null,
          badge: null,
        };
      }
    })
  );

  return updatedReports;
}
