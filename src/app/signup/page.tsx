"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export default function SignupPage() {
  const [form, setForm] = useState({ email: "", password: "", name: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Reveal>
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
            <h1 className="text-2xl font-display font-bold text-stone-900 text-center mb-2">Create Account</h1>
            <p className="text-stone-500 text-center text-sm mb-8">Join the D&apos;Young&apos;s Group community</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-navy-900/20 transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-navy-900/20 transition-all"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Phone Number</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-navy-900/20 transition-all"
                  placeholder="090..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-navy-900/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-red-500 text-xs text-center">{error}</p>}
              <button
                disabled={loading}
                className="w-full py-3 rounded-xl bg-navy-900 text-white font-semibold hover:bg-navy-800 transition-colors disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
            
            <p className="mt-6 text-center text-sm text-stone-500">
              Already have an account?{" "}
              <Link href="/login" className="text-navy-900 font-medium hover:underline">Sign in</Link>
            </p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
