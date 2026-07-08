import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import HeroSceneLazy from "@/components/three/HeroSceneLazy";
import { ClickToCopy } from "@/components/shared/ClickToCopy";
import { AboutSection } from "@/components/shared/AboutSection";
import { Testimonials } from "@/components/shared/Testimonials";
import { Footer } from "@/components/shared/Footer";
import { GroupLogo } from "@/components/shared/Logo";
import { site } from "@/lib/site";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

const businesses = [
  {
    label: "Electronics & Repairs",
    name: "D'Young Electrical & Electronics",
    href: "/electronics",
    blurb: "Home appliances, electrical accessories, voltage protection, and professional repair services.",
    gradient: "from-slate-900 via-blue-950 to-slate-950",
  },
  {
    label: "Nigerian Bole",
    name: "D'Young's Pot",
    href: "/bole",
    blurb: "Roasted bole, yam, potato, grilled fish, and combo platters made fresh daily.",
    gradient: "from-orange-900 via-red-950 to-amber-950",
  },
];

export default async function HomePage() {
  const dbTestimonials = await db.query.testimonials.findMany({
    where: eq(testimonials.approved, true),
    limit: 3,
  });

  const formattedTestimonials = dbTestimonials.map((t) => ({
    name: t.customerName,
    quote: t.content,
    business: t.business === "electronics" ? "Electronics" : "Bole",
  }));

  return (
    <main className="relative min-h-screen overflow-hidden bg-onyx-950 text-ink">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 h-[60rem] w-[60rem] rounded-full bg-navy-900/20 blur-3xl animate-[aurora_18s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-1/4 h-[50rem] w-[50rem] rounded-full bg-rust-700/10 blur-3xl animate-[aurora_22s_ease-in-out_infinite_reverse]" />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-onyx-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <GroupLogo className="h-8 text-ink" />
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/electronics" className="text-white/70 transition hover:text-white">
              Electronics
            </Link>
            <Link href="/bole" className="text-white/70 transition hover:text-white">
              Bole
            </Link>
            <Link href="/login" className="text-white/70 transition hover:text-white">
              Login
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
                D&apos;Young&apos;s Group
              </p>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] md:text-7xl">
                Two Trusted Brands. One Standard of Excellence.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
                Quality electronics and repairs, paired with authentic Nigerian bole,
                made fresh in Port Harcourt.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/electronics"
                  className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-stone-950 transition hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Shop Electronics
                </Link>
                <Link
                  href="/bole"
                  className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Order Bole
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/70">
                <ClickToCopy label={site.phone} value={site.phone} />
                <ClickToCopy label={site.email} value={site.email} />
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.25}>
            <div className="relative mx-auto h-[22rem] w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0d12] shadow-2xl md:h-[28rem]">
              <HeroSceneLazy />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {businesses.map((b, i) => (
            <Reveal key={b.href} delay={i * 0.1}>
              <Link
                href={b.href}
                className="group relative block overflow-hidden rounded-[2.5rem] p-8 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${b.gradient}`} />
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                    {b.label}
                  </span>
                  <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
                    {b.name}
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/80">
                    {b.blurb}
                  </p>
                  <span className="mt-6 inline-block text-sm font-bold text-white transition group-hover:translate-x-1">
                    Explore &rarr;
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <AboutSection />
      <Testimonials testimonials={formattedTestimonials} />
      <Footer />
    </main>
  );
}
