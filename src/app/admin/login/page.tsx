"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <main className="flex min-h-screen items-center justify-center bg-navy-900 px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-xl font-bold text-stone-900">Admin Login</h1>
        <p className="mt-1 text-sm text-stone-500">D&apos;Young&apos;s Group</p>
        <label className="mt-6 block text-sm font-medium text-stone-700">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-navy-900" required />
        <label className="mt-4 block text-sm font-medium text-stone-700">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-navy-900" required />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading}
          className="mt-6 w-full rounded-lg bg-navy-900 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}
