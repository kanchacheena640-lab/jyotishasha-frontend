import { redirect } from "next/navigation";

// Server component (no "use client")
export default function PanchangHome() {
  // Get today's date in IST (Asia/Kolkata)
  const nowIst = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const pad = (n: number) => n.toString().padStart(2, "0");
  const dateStr = `${nowIst.getFullYear()}-${pad(nowIst.getMonth() + 1)}-${pad(nowIst.getDate())}`;

  // Redirect /panchang → /panchang/YYYY-MM-DD
  redirect(`/panchang/${dateStr}`);
}
