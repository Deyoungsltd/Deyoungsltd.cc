import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/requireAdmin";
import { AdminManager } from "@/components/admin/AdminManager";

export default async function TestimonialsAdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminManager mode="testimonials" title="Testimonials" description="Create, approve, edit, and remove testimonials that build buyer trust." />;
}
