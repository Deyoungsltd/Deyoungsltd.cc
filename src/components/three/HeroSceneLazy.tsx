"use client";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-white/5" />,
});

export default function HeroSceneLazy({ business }: { business?: "electronics" | "bole" | "combined" }) {
  return <HeroScene business={business} />;
}
