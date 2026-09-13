import { NextRequest } from "next/server";
import { proxyWebsiteAnalyticsBatch } from "@/lib/admin/websiteAnalyticsProxy";
export const POST = (req: NextRequest) => proxyWebsiteAnalyticsBatch(req);
