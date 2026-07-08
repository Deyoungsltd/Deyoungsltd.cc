"use client";
export function AboutSection() {
  return (
    <div className="bg-cream-100">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Who we are</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-stone-900 md:text-4xl">
              Two businesses, one family standard
            </h2>
            <p className="mt-4 text-stone-700">
              D&apos;Young&apos;s Group started in Port Harcourt with a simple promise: sell
              genuine products, do honest repairs, and serve real Nigerian food the way
              it should taste. Today that promise runs across two businesses &mdash;
              D&apos;Young Electrical &amp; Electronics and D&apos;Young&apos;s Pot &mdash;
              both built on trust, quality, and community.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-stone-900">500+</p>
              <p className="text-sm text-stone-500">Repairs completed</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-stone-900">1000+</p>
              <p className="text-sm text-stone-500">Meals served</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-stone-900">2</p>
              <p className="text-sm text-stone-500">Trusted brands</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-stone-900">100%</p>
              <p className="text-sm text-stone-500">Genuine products</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
