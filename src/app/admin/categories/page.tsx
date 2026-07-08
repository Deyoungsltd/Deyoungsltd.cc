import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/requireAdmin";
import { AdminManager } from "@/components/admin/AdminManager";

export default async function CategoriesAdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminManager mode="categories" title="Categories" description="Manage storefront category names, slugs, ordering, images, and active status." />;
}
