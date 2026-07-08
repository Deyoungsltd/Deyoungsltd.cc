"use client";

const stats = [
  { value: "500+", label: "Repairs completed" },
  { value: "1000+", label: "Meals served" },
  { value: "2", label: "Trusted brands" },
  { value: "100%", label: "Genuine products" },
];

export function AboutSection() {
  return (
    <div className="relative border-y border-white/10 bg-white/[0.03]">
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
              Who we are
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
              Two businesses, one family standard.
            </h2>
            <p className="mt-6 leading-8 text-white/65">
              D&apos;Young&apos;s Group started in Port Harcourt with a simple promise: sell
              genuine products, do honest repairs, and serve real Nigerian food the way
              it should taste. Today that promise runs across two businesses &mdash;
              D&apos;Young Electrical &amp; Electronics and D&apos;Young&apos;s Pot &mdash;
              both built on trust, quality, and community.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur"
              >
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="mt-2 text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
