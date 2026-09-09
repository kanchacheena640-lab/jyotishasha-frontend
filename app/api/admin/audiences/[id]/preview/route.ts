import { NextRequest } from "next/server";
import { proxyAudiences } from "@/lib/admin/audiencesProxy";
export const GET = (req: NextRequest, { params }: { params: { id: string } }) => proxyAudiences(req, `/${params.id}/preview`);
