import { NextRequest } from "next/server";
import { proxyNotifications } from "@/lib/admin/notificationsProxy";
export const GET = (req: NextRequest, { params }: { params: { id: string } }) =>
  proxyNotifications(req, `/deliveries/${params.id}/attempts`);
