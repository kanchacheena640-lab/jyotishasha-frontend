import { NextRequest } from "next/server";
import { proxyWebsiteAnalyticsMetric } from "@/lib/admin/websiteAnalyticsProxy";
export const GET = (req: NextRequest, { params }: { params: { metricId: string } }) =>
  proxyWebsiteAnalyticsMetric(req, params.metricId);
