// /panchang/pradosh and /hi/panchang/pradosh: there is no Pradosh page. Without this route the URL fell through to
// /panchang/[date], whose resolveDate() fallback rendered today's Panchang with a 200 (GSC "Soft 404"). This static
// segment takes precedence over [date] for this one path only and answers a genuine 404. Pradosh Vrat is covered on
// /panchang/tithi/trayodashi (linked from components/panchang/ImportantEvents.tsx). [date] parsing is unchanged.
import { notFound } from "next/navigation";

export default function PradoshNotFound() {
  notFound();
}
