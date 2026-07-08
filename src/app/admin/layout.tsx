import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const admin = token ? verifyAdminToken(token) : null;

  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-100 text-stone-900">
        {admin ? (
          <div className="flex min-h-screen">
            <aside className="w-56 border-r border-stone-200 bg-white p-6">
              <p className="font-bold">D&apos;Young Admin</p>
              <nav className="mt-6 space-y-2 text-sm">
                <Link href="/admin" className="block rounded-lg px-3 py-2 hover:bg-stone-100">Dashboard</Link>
                <Link href="/admin/products" className="block rounded-lg px-3 py-2 hover:bg-stone-100">Products</Link>
                <Link href="/admin/settings" className="block rounded-lg px-3 py-2 hover:bg-stone-100">Settings</Link>
                <form action="/api/admin/logout" method="POST">
                  <button className="mt-4 block w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50">Log out</button>
                </form>
              </nav>
            </aside>
            <main className="flex-1 p-8">{children}</main>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
