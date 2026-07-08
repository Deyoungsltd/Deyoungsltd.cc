interface Testimonial {
  name: string;
  quote: string;
  business: string;
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
        What people say
      </p>
      <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
        Trusted across Port Harcourt.
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="rounded-3xl border border-white/10 bg-white/[0.07] p-7 backdrop-blur"
          >
            <p className="text-white/80">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-6 text-sm font-bold text-white">{t.name}</p>
            <p className="text-xs text-white/50">{t.business}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
