import { NextRequest } from "next/server";
import { proxyNotifications } from "@/lib/admin/notificationsProxy";
export const POST = (req: NextRequest, { params }: { params: { id: string } }) => proxyNotifications(req, `/${params.id}/send-now`);
