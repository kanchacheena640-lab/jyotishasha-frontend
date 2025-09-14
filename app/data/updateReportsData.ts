// app/data/updateReportsData.ts
import { reportsData, Report } from "./reportsData"; // 👈 fixed path

export async function updateReportsData(): Promise<Report[]> {
  const updatedReports = await Promise.all(
    reportsData.map(async (report: Report) => {  // 👈 added type
      try {
        const res = await fetch(
          "https://jyotishasha-backend.onrender.com/api/razorpay-order",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product: report.slug }), // ✅ correct payload
          }
        );

        const data = await res.json();

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
