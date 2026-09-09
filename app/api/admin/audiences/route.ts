import { NextRequest } from "next/server";
import { proxyAudiences } from "@/lib/admin/audiencesProxy";
export const GET = (req: NextRequest) => proxyAudiences(req);
export const POST = GET;
