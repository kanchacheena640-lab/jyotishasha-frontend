import { reportsData, Report } from "./reportsData";

export async function updateReportsData(): Promise<Report[]> {
  const updated = await Promise.all(
    reportsData.map(async (report) => {
      try {
        const res = await fetch("https://jyotishasha-backend.onrender.com/api/razorpay-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product: report.slug }),
        });

        if (!res.ok) throw new Error(`API failed for ${report.slug}`);

        const data = await res.json();

        return {
          ...report,
          price: data.final_price ?? report.price,
          badge: data.offer || null,
        };
      } catch (error) {
        console.error("❌ Failed to fetch for", report.slug, error);
        return report; // fallback: keep old data
      }
    })
  );

  // ✅ overwrite array inplace (har jagah updated mile)
  reportsData.splice(0, reportsData.length, ...updated);

  return reportsData;
}
