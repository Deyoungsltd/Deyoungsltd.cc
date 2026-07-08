import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/requireAdmin";
import { AdminManager } from "@/components/admin/AdminManager";

export default async function ProductsAdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminManager mode="products" title="Products" description="Create, edit, delete, price, stock, feature, and upload images for electronics and bole products." />;
}
