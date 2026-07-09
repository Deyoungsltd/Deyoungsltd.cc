"use client";

import React, { useState, useEffect } from "react";

export default function AdminManager() {
  const [form, setForm] = useState({ id: "", name: "", price: "", description: "", imageUrl: "", categoryId: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleAssetCommit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage("");

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage("Asset records committed successfully. Frontend cache revalidated.");
      } else {
        setStatusMessage("Mutation Error: " + data.error);
      }
    } catch (err) {
      setStatusMessage("Network synchronization failed.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-900 font-sans">
      <header className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Asset Configuration</h1>
        <p className="text-xs text-slate-500 mt-1">Enterprise Resource Control & Inventory Console</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-700 mb-4">Media Resource & Specifications Profile</h2>
          <form onSubmit={handleAssetCommit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Product Title</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Unit Valuation (Price)</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                value={form.price} 
                onChange={(e) => setForm({ ...form, price: e.target.value })} 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Cloud Media URL CDN Path</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                value={form.imageUrl} 
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} 
                placeholder="https://res.cloudinary.com/..."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Functional Description</label>
              <textarea 
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 h-24 resize-none"
                value={form.description} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
              />
            </div>
            <button 
              type="submit" 
              disabled={isSaving}
className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider py-3 px-4 rounded transition-colors disabled:opacity-50"
            >
              {isSaving ? "Synchronizing Storage Entities..." : "Commit Asset Entry to Core Database"}
            </button>
            {statusMessage && <p className="mt-2 text-xs font-semibold text-slate-700">{statusMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
