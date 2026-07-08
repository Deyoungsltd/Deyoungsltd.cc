import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/requireAdmin";
import { AdminManager } from "@/components/admin/AdminManager";

export default async function MessagesAdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminManager mode="messages" title="Messages" description="Read customer inquiries and remove completed records when needed." />;
}
