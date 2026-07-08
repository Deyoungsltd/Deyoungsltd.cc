import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/requireAdmin";
import { AdminManager } from "@/components/admin/AdminManager";

export default async function SettingsAdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminManager mode="settings" title="Site Settings" description="Update contact email, phone, WhatsApp, address, business hours, taglines, and website copy settings." />;
}
