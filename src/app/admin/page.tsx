import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-stone-500">Manage your products, categories, and site settings.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Link href="/admin/products" className="rounded-2xl border border-stone-200 bg-white p-6 hover:shadow-md">
          <p className="font-semibold">Products</p>
          <p className="mt-1 text-sm text-stone-500">Add, edit, delete products and upload images.</p>
        </Link>
        <Link href="/admin/settings" className="rounded-2xl border border-stone-200 bg-white p-6 hover:shadow-md">
          <p className="font-semibold">Settings</p>
          <p className="mt-1 text-sm text-stone-500">Update contact info, email, phone, address.</p>
        </Link>
      </div>
    </div>
  );
}
