import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import HeroSceneLazy from "@/components/three/HeroSceneLazy";
import { ClickToCopy } from "@/components/shared/ClickToCopy";
import { AboutSection } from "@/components/shared/AboutSection";
import { Testimonials } from "@/components/shared/Testimonials";
import { Footer } from "@/components/shared/Footer";
import { GroupLogo } from "@/components/shared/Logo";
import { AIChatButton } from "@/components/shared/AIChatButton";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { site } from "@/lib/site";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";

const businesses = [
  {
    label: "Electronics & Repairs",
    name: "D'Young Electrical & Electronics",
    href: "/electronics",
    blurb: "Home appliances, electrical accessories, voltage protection, and professional repair services.",
    accent: "bg-navy-900",
  },
  {
    label: "Nigerian Bole",
    name: "D'Young's Pot",
    href: "/bole",
    blurb: "Roasted bole, yam, potato, grilled fish, and combo platters made fresh daily.",
    accent: "bg-rust-700",
  },
];

export default async function HomePage() {
  const dbTestimonials = await db.query.testimonials.findMany({
    where: eq(testimonials.approved, true),
    limit: 3,
  });

  const formattedTestimonials = dbTestimonials.map(t => ({
    name: t.customerName,
    quote: t.content,
    business: t.business === "electronics" ? "Electronics" : "Bole",
  }));

  return (
    <main className="min-h-screen bg-cream-50 text-stone-900">
      <header className="sticky top-0 z-20 border-b border-stone-900/10 bg-cream-50/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <GroupLogo className="h-8 text-stone-900" />
          <nav className="hidden gap-6 text-sm font-medium md:flex items-center">
            <Link href="/electronics" className="hover:text-navy-900">Electronics</Link>
            <Link href="/bole" className="hover:text-rust-700">Bole</Link>
            <div className="ml-4 h-4 w-px bg-stone-300" />
            <Link href="/login" className="hover:text-navy-900">Login</Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 pt-12 pb-16 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
            D&apos;Young&apos;s Group
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-6xl">
            Two Trusted Brands. One Standard of Excellence.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-stone-600">
            Quality electronics and repairs, paired with authentic Nigerian bole,
            made fresh in Port Harcourt.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/electronics" className="rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105">
              Shop Electronics
            </Link>
            <Link href="/bole" className="rounded-full bg-rust-700 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105">
              Order Bole
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-stone-600">
            <ClickToCopy label={site.phone} value={site.phone} />
            <ClickToCopy label={site.email} value={site.email} />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-10">
        <Reveal delay={0.1} className="relative h-[22rem] w-full overflow-hidden rounded-2xl border border-stone-200 md:h-[28rem]">
          <HeroSceneLazy />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {businesses.map((b, i) => (
            <Reveal key={b.href} delay={i * 0.1}>
              <Link href={b.href} className="group relative block overflow-hidden rounded-2xl p-8 text-white transition-transform hover:scale-[1.02]">
                <div className={`absolute inset-0 ${b.accent}`} />
                <div className="relative">
                  <span className="text-xs uppercase tracking-[0.2em] opacity-70">{b.label}</span>
                  <h2 className="mt-4 font-display text-3xl font-bold">{b.name}</h2>
                  <p className="mt-3 max-w-sm text-sm opacity-80">{b.blurb}</p>
                  <span className="mt-6 inline-block text-sm opacity-90 transition-colors">
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
      <WhatsAppButton />
      <AIChatButton />
    </main>
  );
}
