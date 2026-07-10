"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bolt, ChefHat, Copy, PackageCheck, ShieldCheck, ShoppingCart, Sparkles, Wrench } from "lucide-react";
import { ClickToCopy } from "@/components/shared/ClickToCopy";
import { site, waLink } from "@/lib/site";

type Business = "electronics" | "bole";

type Product = {
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
};

type CartItem = Product & { quantity: number };

const electronicsProducts: Product[] = [
  { slug: "standing-fan-18inch", name: "18-Inch Standing Fan", description: "Heavy-duty standing fan with quiet 3-speed airflow for Nigerian homes.", price: 25000, category: "Home Appliances", image: "https://picsum.photos/seed/deyoung-fan/900/700", badge: "Featured" },
  { slug: "electric-kettle-1-8l", name: "1.8L Electric Kettle", description: "Fast-boil stainless steel kettle with auto shut-off protection.", price: 12000, category: "Home Appliances", image: "https://picsum.photos/seed/deyoung-kettle/900/700" },
  { slug: "extension-socket-4way", name: "4-Way Extension Socket", description: "Surge-protected extension socket with durable cable and child-safe ports.", price: 6500, category: "Electrical Accessories", image: "https://picsum.photos/seed/deyoung-socket/900/700" },
  { slug: "avr-stabilizer-2kva", name: "2KVA Automatic Voltage Regulator", description: "Reliable voltage protection for TVs, freezers, fridges, and office appliances.", price: 45000, category: "Voltage Protection", image: "https://picsum.photos/seed/deyoung-avr/900/700", badge: "Power Safe" },
];

const boleProducts: Product[] = [
  { slug: "classic-bole-fish", name: "Classic Bole & Fish", description: "Roasted plantain served with grilled fish and signature pepper sauce.", price: 3500, category: "Bole Meals", image: "https://picsum.photos/seed/deyoung-bole/900/700", badge: "Customer Pick" },
  { slug: "roasted-yam-special", name: "Roasted Yam Special", description: "Roasted yam with rich palm oil sauce and perfectly grilled fish.", price: 3000, category: "Roasted Meals", image: "https://picsum.photos/seed/deyoung-yam/900/700" },
  { slug: "roasted-potato-plate", name: "Roasted Potato Plate", description: "Roasted sweet potato, pepper sauce, and optional fish pairing.", price: 2800, category: "Roasted Meals", image: "https://picsum.photos/seed/deyoung-potato/900/700" },
  { slug: "grand-combo-platter", name: "Grand Combo Platter", description: "Bole, roasted yam, roasted potato, grilled fish, and sauce — no drinks.", price: 6500, category: "Combo Platters", image: "https://picsum.photos/seed/deyoung-combo/900/700", badge: "Premium" },
];

const formatNaira = (value: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value);

function businessCopy(business: Business) {
  if (business === "electronics") {
    return {
      eyebrow: "D'Young Electrical & Electronics",
      title: "Premium electronics, protected power, and serious repair support.",
      summary: "Shop trusted appliances and power accessories, request repairs, place orders, and track every update from one polished Port Harcourt storefront.",
      accent: "from-slate-950 via-blue-950 to-slate-900",
      glow: "bg-cyan-400/20",
      cta: "Shop electronics",
      secondary: "Request a repair",
      icon: Bolt,
      products: electronicsProducts,
    };
  }
  return {
    eyebrow: "D'Young's Pot",
    title: "Port Harcourt bole, plated with heat, heritage, and discipline.",
    summary: "Order authentic roasted plantain, yam, potato, grilled fish, and combo platters. No drinks — just serious food done right.",
    accent: "from-stone-950 via-orange-950 to-amber-900",
    glow: "bg-orange-400/20",
    cta: "Order meals",
    secondary: "Track order",
    icon: ChefHat,
    products: boleProducts,
  };
}

function PageMark({ business }: { business: Business }) {
  const isElectronics = business === "electronics";
  return (
    <div className="flex items-center gap-3">
      <div className={`grid h-12 w-12 place-items-center rounded-2xl border ${isElectronics ? "border-cyan-300/30 bg-cyan-300/10" : "border-orange-300/30 bg-orange-300/10"}`}>
        {isElectronics ? <Bolt className="h-6 w-6" /> : <ChefHat className="h-6 w-6" />}
      </div>
      <div>
        <p className="font-display text-lg font-black leading-tight">{isElectronics ? "D'Young Electrical" : "D'Young's Pot"}</p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">{isElectronics ? "Power • Repair • Protect" : "Bole • Yam • Fish"}</p>
      </div>
    </div>
  );
}

export function CommerceExperience({ business }: { business: Business }) {
  const copy = businessCopy(business);
  const [productList, setProductList] = useState<Product[]>(copy.products);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [trackNumber, setTrackNumber] = useState("");
  const [trackResult, setTrackResult] = useState<string | null>(null);
  const [repairResult, setRepairResult] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      const res = await fetch(`/api/products?business=${business}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data) && data.length) setProductList(data);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [business]);

  const categories = useMemo(() => ["All", ...Array.from(new Set(productList.map((p) => p.category)))], [productList]);
  const visibleProducts = activeCategory === "All" ? productList : productList.filter((p) => p.category === activeCategory);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const found = current.find((item) => item.slug === product.slug);
      if (found) return current.map((item) => item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, quantity: 1 }];
    });
    setCheckoutOpen(true);
  };

  const updateQuantity = (slug: string, quantity: number) => {
    setCart((current) => current.flatMap((item) => item.slug === slug ? (quantity <= 0 ? [] : [{ ...item, quantity }]) : [item]));
  };

  const placeOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrderResult(null);
    if (!cart.length) {
      setOrderResult("Add at least one item before checkout.");
      return;
    }
    const form = new FormData(event.currentTarget);
    const payload = {
      business,
      customerName: String(form.get("name") || ""),
      customerPhone: String(form.get("phone") || ""),
      customerEmail: String(form.get("email") || ""),
      address: String(form.get("address") || ""),
      notes: String(form.get("notes") || ""),
      items: cart.map(({ slug, name, price, quantity }) => ({ slug, name, price, quantity })),
    };
    const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setOrderResult(data.error || "Order could not be placed. Please use WhatsApp now.");
      return;
    }
    setCart([]);
    setOrderResult(`Order placed. Your tracking number is ${data.orderNumber}. Copy it now.`);
  };

  const trackOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTrackResult("Checking...");
    const res = await fetch(`/api/orders/track?number=${encodeURIComponent(trackNumber)}`);
    const data = await res.json().catch(() => ({}));
    setTrackResult(res.ok ? `Status: ${data.status}. Total: ${formatNaira(Number(data.total || 0))}.` : (data.error || "No matching order found."));
  };

  const requestRepair = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRepairResult(null);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch("/api/repairs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json().catch(() => ({}));
    setRepairResult(res.ok ? `Repair request received. Ticket: ${data.ticketNumber}. Estimate guide: ${formatNaira(Number(data.estimatedCost || 0))}.` : (data.error || "Repair request failed. Please use WhatsApp."));
  };

  return (
    <main className={`min-h-screen bg-gradient-to-br ${copy.accent} text-white`}>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <PageMark business={business} />
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a href="#products" className="hover:text-white">Products</a>
            {business === "electronics" && <a href="#repairs" className="hover:text-white">Repairs</a>}
            <a href="#track" className="hover:text-white">Track</a>
            <Link href="/" className="hover:text-white">Group</Link>
          </nav>
          <button onClick={() => setCheckoutOpen(true)} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur transition hover:bg-white/20">
            Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 py-16 md:py-24">
        <div className={`absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full ${copy.glow} blur-3xl`} />
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1.05fr_.95fr]">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/55">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-[0.95] md:text-7xl">{copy.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{copy.summary}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#products" className="rounded-full bg-white px-6 py-3 text-sm font-black text-stone-950 transition hover:-translate-y-0.5 hover:shadow-2xl">{copy.cta}</a>
              <a href={business === "electronics" ? "#repairs" : "#track"} className="rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10">{copy.secondary}</a>
            </div>
            <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/70">
              <ClickToCopy label={site.phone} value={site.phone} />
              <ClickToCopy label={site.email} value={site.email} />
            </div>
          </div>

          <div className="relative mx-auto h-[28rem] w-full max-w-lg [perspective:1200px]">
            <div className="absolute inset-8 rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl [transform:rotateX(8deg)_rotateY(-14deg)]" />
            <div className="absolute left-8 top-8 w-64 rounded-[2rem] border border-white/15 bg-white/15 p-5 shadow-2xl backdrop-blur-xl animate-[float_7s_ease-in-out_infinite]">
              <copy.icon className="h-10 w-10" />
              <p className="mt-10 text-xs uppercase tracking-[0.24em] text-white/50">Premium layer</p>
              <p className="mt-2 text-2xl font-black">Fast ordering. Live tracking. Trusted fulfilment.</p>
            </div>
            <div className="absolute bottom-8 right-4 w-72 rounded-[2rem] border border-white/15 bg-black/25 p-5 shadow-2xl backdrop-blur-xl [transform:rotateY(12deg)]">
              <div className="flex items-center justify-between"><Sparkles /><span className="text-sm text-white/55">DYG-{business.toUpperCase()}</span></div>
              <div className="mt-6 h-24 rounded-2xl bg-gradient-to-br from-white/30 to-white/5" />
              <p className="mt-4 text-sm text-white/65">Cinematic depth without blocking business actions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {[{ icon: ShieldCheck, title: business === "electronics" ? "Power-safe buying" : "Fresh local prep", text: business === "electronics" ? "Products selected for real Nigerian power conditions." : "Roasted meals prepared for authentic Port Harcourt taste." }, { icon: PackageCheck, title: "Order tracking", text: "Every submitted order gets a tracking number for status updates." }, { icon: Copy, title: "Instant contact copy", text: "Phone and email details are quick-copy and WhatsApp-ready." }].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur">
              <item.icon className="h-6 w-6" />
              <h3 className="mt-4 text-lg font-black">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/45">Shop</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Products that actually move customers.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${activeCategory === category ? "bg-white text-stone-950" : "border border-white/15 text-white/70 hover:bg-white/10 hover:text-white"}`}>{category}</button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <article key={product.slug} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.08] shadow-2xl backdrop-blur">
              <div className="relative h-52 overflow-hidden bg-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-110" />
                {product.badge && <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-black text-stone-950">{product.badge}</span>}
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">{product.category}</p>
                <h3 className="mt-2 min-h-14 text-xl font-black">{product.name}</h3>
                <p className="mt-2 min-h-20 text-sm leading-6 text-white/60">{product.description}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="font-black">{formatNaira(product.price)}</span>
                  <button onClick={() => addToCart(product)} className="rounded-full bg-white px-4 py-2 text-sm font-black text-stone-950 transition hover:-translate-y-0.5">Add</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {business === "electronics" && (
        <section id="repairs" className="mx-auto max-w-7xl px-5 py-16">
          <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur md:grid-cols-[.9fr_1.1fr] md:p-10">
            <div>
              <Wrench className="h-9 w-9" />
              <h2 className="mt-4 text-3xl font-black">Repair request with estimate guidance.</h2>
              <p className="mt-4 leading-7 text-white/65">Submit the fault details. The system creates a ticket and admin can update diagnosis, estimate, status, and notes.</p>
            </div>
            <form onSubmit={requestRepair} className="grid gap-3 md:grid-cols-2">
              <input name="name" required placeholder="Full name" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-white/35" />
              <input name="phone" required placeholder="Phone / WhatsApp" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-white/35" />
              <input name="email" type="email" placeholder="Email optional" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-white/35" />
              <input name="deviceType" required placeholder="Device type e.g. fridge" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-white/35" />
              <input name="brand" placeholder="Brand optional" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-white/35" />
              <input name="preferredDate" type="date" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none" />
              <textarea name="issueDescription" required placeholder="Describe the fault clearly" className="md:col-span-2 min-h-28 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-white/35" />
              <button className="md:col-span-2 rounded-2xl bg-white px-5 py-3 font-black text-stone-950">Submit repair request</button>
              {repairResult && <p className="md:col-span-2 text-sm text-white/75">{repairResult}</p>}
            </form>
          </div>
        </section>
      )}

      <section id="track" className="mx-auto max-w-7xl px-5 py-16 pb-28">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-black/20 p-6 backdrop-blur md:grid-cols-2 md:p-10">
          <div>
            <h2 className="text-3xl font-black">Track your order.</h2>
            <p className="mt-4 leading-7 text-white/65">Enter your order number after checkout. Admin status updates reflect here once the database is connected.</p>
          </div>
          <form onSubmit={trackOrder} className="flex flex-col gap-3 sm:flex-row">
            <input value={trackNumber} onChange={(e) => setTrackNumber(e.target.value)} required placeholder="e.g. DYG-260708-1234" className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none placeholder:text-white/35" />
            <button className="rounded-2xl bg-white px-5 py-3 font-black text-stone-950">Track</button>
          </form>
          {trackResult && <p className="md:col-span-2 rounded-2xl border border-white/10 bg-white/10 p-4 text-white/75">{trackResult}</p>}
        </div>
      </section>

      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/60 p-4 backdrop-blur-sm md:p-8">
          <div className="max-h-[92vh] w-full max-w-xl overflow-auto rounded-[2rem] border border-white/10 bg-stone-950 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">Checkout</h2>
              <button onClick={() => setCheckoutOpen(false)} className="rounded-full border border-white/10 px-3 py-1 text-sm">Close</button>
            </div>
            <div className="mt-5 space-y-3">
              {cart.length ? cart.map((item) => (
                <div key={item.slug} className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 p-3">
                  <div><p className="font-bold">{item.name}</p><p className="text-sm text-white/50">{formatNaira(item.price)}</p></div>
                  <div className="flex items-center gap-2"><button onClick={() => updateQuantity(item.slug, item.quantity - 1)} className="h-8 w-8 rounded-full bg-white/10">-</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.slug, item.quantity + 1)} className="h-8 w-8 rounded-full bg-white/10">+</button></div>
                </div>
              )) : <p className="rounded-2xl bg-white/10 p-4 text-white/60">Cart is empty. Add a product first.</p>}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5"><span className="text-white/60">Total</span><strong className="text-xl">{formatNaira(total)}</strong></div>
            <form onSubmit={placeOrder} className="mt-5 grid gap-3">
              <input name="name" required placeholder="Full name" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none placeholder:text-white/35" />
              <input name="phone" required placeholder="Phone / WhatsApp" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none placeholder:text-white/35" />
              <input name="email" type="email" placeholder="Email optional" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none placeholder:text-white/35" />
              <textarea name="address" required placeholder="Delivery address / pickup note" className="min-h-20 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none placeholder:text-white/35" />
              <textarea name="notes" placeholder="Extra notes optional" className="min-h-16 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none placeholder:text-white/35" />
              <button className="rounded-2xl bg-white px-5 py-3 font-black text-stone-950"><ShoppingCart className="mr-2 inline h-4 w-4" />Place order</button>
              <a href={waLink()} target="_blank" rel="noreferrer" className="text-center text-sm font-bold text-white/65 underline">Prefer WhatsApp? Send order directly</a>
              {orderResult && <p className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-white/75">{orderResult}</p>}
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
