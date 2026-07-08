import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";
import Link from "next/link";

const nav = [
  ["Dashboard", "/admin"],
  ["Products", "/admin/products"],
  ["Categories", "/admin/categories"],
  ["Orders", "/admin/orders"],
  ["Repairs", "/admin/repairs"],
  ["Messages", "/admin/messages"],
  ["Testimonials", "/admin/testimonials"],
  ["Settings", "/admin/settings"],
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const admin = token ? verifyAdminToken(token) : null;

  if (!admin) return <>{children}</>;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-stone-200 bg-white/90 p-6 backdrop-blur lg:block">
          <div className="rounded-3xl bg-stone-950 p-5 text-white shadow-2xl">
            <p className="text-lg font-black">D&apos;Young Admin</p>
            <p className="mt-2 text-xs leading-5 text-white/55">Production control room. Change admin123 after first login.</p>
          </div>
          <nav className="mt-6 space-y-1 text-sm font-bold">
            {nav.map(([label, href]) => <Link key={href} href={href} className="block rounded-2xl px-4 py-3 text-stone-600 hover:bg-stone-100 hover:text-stone-950">{label}</Link>)}
            <form action="/api/admin/logout" method="POST">
              <button className="mt-4 block w-full rounded-2xl px-4 py-3 text-left font-bold text-red-600 hover:bg-red-50">Log out</button>
            </form>
          </nav>
        </aside>
        <main className="min-w-0 flex-1 p-4 md:p-8">
          <div className="mb-5 flex flex-wrap gap-2 lg:hidden">
            {nav.map(([label, href]) => <Link key={href} href={href} className="rounded-full bg-white px-3 py-2 text-xs font-bold shadow-sm">{label}</Link>)}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
