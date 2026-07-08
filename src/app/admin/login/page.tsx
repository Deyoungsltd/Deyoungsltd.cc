"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GroupLogo } from "@/components/shared/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-onyx-950 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/4 -left-1/4 h-[50rem] w-[50rem] rounded-full bg-navy-900/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[40rem] w-[40rem] rounded-full bg-rust-700/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <GroupLogo className="mx-auto h-8 text-white" />
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2.5rem] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
        >
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-white/60">D&apos;Young&apos;s Group Control Room</p>

          <label className="mt-6 block text-sm font-medium text-white/80">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/30"
            placeholder="admin@deyoungsltd.cc"
          />

          <label className="mt-4 block text-sm font-medium text-white/80">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/30"
            placeholder="••••••••"
          />

          {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-bold text-stone-950 transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
