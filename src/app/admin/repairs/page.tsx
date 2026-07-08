import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/requireAdmin";
import { AdminManager } from "@/components/admin/AdminManager";

export default async function RepairsAdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminManager mode="repairs" title="Repair Requests" description="Set estimates, diagnosis notes, and repair status updates for customer tickets." />;
}
