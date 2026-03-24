import { redirect } from "next/navigation";

interface Props {
  params: { locale: string };
}

export default function PanchangHome({ params }: Props) {
  const { locale } = params;
  const isHi = locale === "hi";

  // 1. Get today's date in IST (Asia/Kolkata) - Ekdum Accurate Logic
  const nowIst = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const pad = (n: number) => n.toString().padStart(2, "0");
  const dateStr = `${nowIst.getFullYear()}-${pad(nowIst.getMonth() + 1)}-${pad(nowIst.getDate())}`;

  // 2. Locale-Aware Redirection Logic
  // Agar locale 'hi' hai toh prefix '/hi' lagega, warna empty string
  const pathPrefix = isHi ? "/hi" : "";

  // 🚀 Final Redirect: /hi/panchang -> /hi/panchang/YYYY-MM-DD
  redirect(`${pathPrefix}/panchang/${dateStr}`);
}