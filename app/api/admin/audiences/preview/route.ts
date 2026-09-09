import { NextRequest } from "next/server";
import { proxyAudiences } from "@/lib/admin/audiencesProxy";
export const POST = (req: NextRequest) => proxyAudiences(req, "/preview");
