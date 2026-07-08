import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/requireAdmin";

const cards = [
  { href: "/admin/products", title: "Products", text: "Add, edit, remove products, prices, images, stock, and visibility." },
  { href: "/admin/categories", title: "Categories", text: "Structure electronics and bole sections without touching code." },
  { href: "/admin/orders", title: "Orders", text: "Review customer orders and update live tracking statuses." },
  { href: "/admin/repairs", title: "Repairs", text: "Manage repair tickets, estimates, diagnosis notes, and progress." },
  { href: "/admin/messages", title: "Messages", text: "Read inquiries and mark them as replied or resolved." },
  { href: "/admin/testimonials", title: "Testimonials", text: "Approve and curate trust-building customer reviews." },
  { href: "/admin/settings", title: "Site Settings", text: "Update email, phone, address, hours, taglines, and site details." },
];

export default async function AdminDashboard() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div>
      <section className="overflow-hidden rounded-[2rem] bg-stone-950 p-8 text-white shadow-2xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-white/45">D&apos;Young&apos;s Group Control Room</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">Everything editable. Nothing ornamental.</h1>
        <p className="mt-5 max-w-2xl leading-7 text-white/60">Use this admin panel to manage products, categories, orders, repairs, messages, testimonials, and business settings. First action after launch: change the default password admin123.</p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="group rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-xl font-black">{card.title}</p>
            <p className="mt-2 text-sm leading-6 text-stone-500">{card.text}</p>
            <span className="mt-5 inline-block text-sm font-black text-stone-950 group-hover:translate-x-1">Open →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
