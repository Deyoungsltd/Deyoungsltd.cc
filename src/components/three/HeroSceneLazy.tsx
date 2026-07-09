"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-white/5" />,
});

type ApiProduct = { image?: string; badge?: string };

export default function HeroSceneLazy({ business }: { business?: "electronics" | "bole" }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function loadLiveProducts() {
      try {
        const [electronicsRes, boleRes] = await Promise.all([
          fetch(`/api/products?business=electronics&t=${Date.now()}`, { cache: "no-store" }),
          fetch(`/api/products?business=bole&t=${Date.now()}`, { cache: "no-store" }),
        ]);
        const electronics: ApiProduct[] = electronicsRes.ok ? await electronicsRes.json() : [];
        const bole: ApiProduct[] = boleRes.ok ? await boleRes.json() : [];
        const combined = [...electronics, ...bole];

        const featured = combined.filter((p) => p.badge === "Featured" && p.image);
        const pool = (featured.length > 0 ? featured : combined.filter((p) => p.image)).map((p) => p.image as string);

        if (!cancelled) setItems(pool.slice(0, 4));
      } catch {
        if (!cancelled) setItems([]);
      }
    }
    void loadLiveProducts();
    return () => { cancelled = true; };
  }, []);

  return <HeroScene business={business} items={items} />;
}
