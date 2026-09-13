import { NextRequest } from "next/server";
import { proxyAnalytics } from "@/lib/admin/analyticsProxy";
export const GET = (req: NextRequest) => proxyAnalytics(req, "/notifications");
