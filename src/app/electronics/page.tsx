import Link from "next/link";
import { ElectronicsLogo } from "@/components/shared/Logo";
import { Footer } from "@/components/shared/Footer";
import { Reveal } from "@/components/ui/Reveal";

const categories = [
  { name: "Home Appliances", desc: "Fans, kettles, blenders, and more." },
  { name: "Electrical Accessories", desc: "Sockets, cables, switches, extensions." },
  { name: "Voltage Protection", desc: "Stabilizers, AVRs, surge protectors." },
  { name: "Repair Services", desc: "Professional diagnostics and repair with cost estimates." },
];

export default function ElectronicsPage() {
  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <ElectronicsLogo className="h-8 text-white" />
        <Link href="/" className="text-sm text-white/70 hover:text-white">Back to Group</Link>
      </header>

      <section className="mx-auto max-w-5xl px-6 pt-8 pb-16 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Electronics & Repairs</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            Genuine Appliances. Honest Repairs.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            From home appliances to voltage protection, we sell what lasts and
            repair what breaks &mdash; with clear estimates and real turnaround times.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10">
                <h3 className="font-display text-2xl font-semibold">{c.name}</h3>
                <p className="mt-2 text-white/60">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
