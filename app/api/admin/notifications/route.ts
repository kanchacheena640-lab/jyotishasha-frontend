import { NextRequest } from "next/server";
import { proxyNotifications } from "@/lib/admin/notificationsProxy";
export const GET = (req: NextRequest) => proxyNotifications(req);
export const POST = GET;
