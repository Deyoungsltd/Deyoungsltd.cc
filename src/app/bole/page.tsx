import Link from "next/link";
import { BoleLogo } from "@/components/shared/Logo";
import { Footer } from "@/components/shared/Footer";
import { Reveal } from "@/components/ui/Reveal";

const menu = [
  { name: "Classic Bole & Fish", price: "3,500", desc: "Roasted plantain with grilled fish and pepper sauce." },
  { name: "Roasted Yam Special", price: "3,000", desc: "Roasted yam with rich palm oil sauce and grilled fish." },
  { name: "Roasted Potato Plate", price: "2,800", desc: "Roasted sweet potato with pepper sauce." },
  { name: "Grand Combo Platter", price: "6,500", desc: "Bole, roasted yam, roasted potato, and grilled fish combo." },
];

export default function BolePage() {
  return (
    <main className="min-h-screen bg-cream-50 text-stone-900">
<header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <BoleLogo className="h-8 text-rust-700" />
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-900">Back to Group</Link>
      </header>

      <section className="mx-auto max-w-5xl px-6 pt-8 pb-16 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-rust-700">D&apos;Young&apos;s Pot</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            Roasted Fresh. Served With Pride.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-stone-600">
            Authentic Nigerian bole and roasted meals, made the traditional way
            &mdash; no shortcuts, no drinks, just real food done right.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {menu.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-transform hover:scale-[1.01]">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-semibold">{item.name}</h3>
                  <span className="font-semibold text-rust-700">&#8358;{item.price}</span>
                </div>
                <p className="mt-2 text-stone-600">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
