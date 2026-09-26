import { NextRequest } from "next/server";
import { proxyRevenue } from "@/lib/admin/revenueProxy";
export const GET = (req: NextRequest) => proxyRevenue(req, "/summary");
