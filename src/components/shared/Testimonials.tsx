const items = [
  { name: "Chinedu O.", quote: "Fast repair service, my fridge works perfectly now.", business: "Electronics" },
  { name: "Amaka I.", quote: "Best bole in Port Harcourt, always fresh and hot.", business: "Bole" },
  { name: "Tamuno B.", quote: "Genuine products and honest pricing, will always come back.", business: "Electronics" },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">What people say</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-stone-900 md:text-4xl">
        Trusted across Port Harcourt
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((t, i) => (
          <div key={i} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-stone-700">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-4 text-sm font-semibold text-stone-900">{t.name}</p>
            <p className="text-xs text-stone-500">{t.business}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
