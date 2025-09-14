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
          price: data.final_price ?? report.price,   // 👈 hamesha final price show hoga
          basePrice: data.base_price ?? null,        // 👈 old price for cut
          offer: data.offer || null,                 // 👈 same naam rakh diya offer
        };
      } catch (error) {
        console.error("❌ Failed to fetch for", report.slug, error);
        return report; // fallback
      }
    })
  );

  reportsData.splice(0, reportsData.length, ...updated); // overwrite
  return reportsData;
}
