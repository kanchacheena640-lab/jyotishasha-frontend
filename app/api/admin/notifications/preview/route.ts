import { NextRequest } from "next/server";
import { proxyNotifications } from "@/lib/admin/notificationsProxy";
export const POST = (req: NextRequest) => proxyNotifications(req, "/preview");
