import type { Report } from "./reportsData";  // 👈 only type import
import { reportsData } from "./reportsData";  // 👈 data import

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
          }
        );

        const data = await res.json();
        console.log("🔎 API response for", report.slug, data);

        if (!res.ok || data.error) {
          throw new Error(data.error || "API error");
        }

        return {
          ...report,
          price: data.final_price,
          basePrice: data.base_price,
          offer: data.offer || null,
        };
      } catch (e) {
        console.error(`❌ Failed to fetch for ${report.slug}`, e);
        return report;
      }
    })
  );

  return updatedReports;
}