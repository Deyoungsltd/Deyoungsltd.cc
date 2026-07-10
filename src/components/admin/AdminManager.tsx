"use client";

import { useEffect, useMemo, useState } from "react";

type Mode = "products" | "categories" | "settings" | "orders" | "repairs" | "messages" | "testimonials";
type Row = Record<string, string | number | boolean | null | undefined>;

const fields: Record<Mode, string[]> = {
  products: ["name", "slug", "description", "price", "image", "business", "stock", "featured", "active"],
  categories: ["name", "slug", "description", "business", "image", "sortOrder", "active"],
  settings: ["key", "value"],
  orders: ["orderNumber", "customerName", "customerPhone", "business", "total", "status", "notes"],
  repairs: ["ticketNumber", "name", "phone", "deviceType", "estimatedCost", "status", "adminNotes"],
  messages: ["name", "email", "phone", "subject", "body", "status"],
  testimonials: ["customerName", "business", "rating", "content", "approved"],
};

const endpoints: Record<Mode, string> = {
  products: "/api/admin/products",
  categories: "/api/admin/categories",
  settings: "/api/admin/settings",
  orders: "/api/admin/orders",
  repairs: "/api/admin/repairs",
  messages: "/api/admin/messages",
  testimonials: "/api/admin/testimonials",
};

const orderStatuses = ["pending", "confirmed", "preparing", "out_for_delivery", "completed", "cancelled"];
const repairStatuses = ["received", "diagnosed", "in_progress", "awaiting_parts", "repaired", "ready_for_pickup", "completed", "cancelled"];
const messageStatuses = ["new", "read", "replied", "resolved"];

function pretty(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function blankFor(mode: Mode): Row {
  if (mode === "products") return { business: "electronics", stock: 0, featured: false, active: true };
  if (mode === "categories") return { business: "electronics", sortOrder: 0, active: true };
  if (mode === "testimonials") return { business: "electronics", rating: 5, approved: true };
  if (mode === "settings") return { key: "", value: "" };
  return {};
}

export function AdminManager({ mode, title, description }: { mode: Mode; title: string; description: string }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [draft, setDraft] = useState<Row>(blankFor(mode));
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState("Loading...");
  const [busy, setBusy] = useState(false);
  const editable = true;
  const canCreate = ["products", "categories", "settings", "testimonials"].includes(mode);

  const visibleFields = useMemo(() => fields[mode], [mode]);

  async function load() {
    setMessage("Loading...");
    const res = await fetch(endpoints[mode], { cache: "no-store" });
    if (!res.ok) {
      setMessage("Could not load data. Confirm DATABASE_URL, JWT_SECRET, and admin login.");
      return;
    }
    const data = await res.json();
    setRows(Array.isArray(data) ? data : []);
    setMessage("");
  }

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
    // load intentionally reads the latest mode endpoint and refreshes when mode changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  async function save() {
    setBusy(true);
    setMessage("");
    if (mode === "settings") {
      const payload = editing ? [{ key: draft.key, value: draft.value }] : [{ key: draft.key, value: draft.value }];
      const res = await fetch(endpoints.settings, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      setBusy(false);
      setMessage(res.ok ? "Settings saved." : "Save failed.");
      setDraft(blankFor(mode));
      setEditing(null);
      await load();
      return;
    }
    const url = editing ? `${endpoints[mode]}/${editing}` : endpoints[mode];
    const res = await fetch(url, { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
    setBusy(false);
    setMessage(res.ok ? "Saved." : "Save failed. Check required fields and unique slugs.");
    if (res.ok) {
      setDraft(blankFor(mode));
      setEditing(null);
      await load();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this record? This cannot be undone.")) return;
    const res = await fetch(`${endpoints[mode]}/${id}`, { method: "DELETE" });
    setMessage(res.ok ? "Deleted." : "Delete failed.");
    await load();
  }

  async function handleAssetCommit(file: File) {
    setBusy(true);
    setMessage("Uploading to Cloudinary...");
    try {
      // 1. Validation: Ensure required fields are present before attempting to commit to DB
      if (mode === "products") {
        if (!draft.name || !draft.price) {
          throw new Error("Please provide a product name and price before uploading.");
        }
      } else if (mode === "categories") {
        if (!draft.name) {
          throw new Error("Please provide a category name before uploading.");
        }
      }

      // 2. Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const res = await fetch("https://api.cloudinary.com/v1_1/qkevvqno/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Cloudinary upload failed");
      const uploadData = await res.json();
      const secure_url = uploadData.secure_url;

      // 3. Determine Endpoint and Method
      if (mode !== "products" && mode !== "categories") {
        setDraft((current) => ({ ...current, image: secure_url }));
        setMessage("Image uploaded successfully.");
        setBusy(false);
        return;
      }

      const url = editing ? `${endpoints[mode]}/${editing}` : endpoints[mode];
      const method = editing ? "PATCH" : "POST";

      setMessage(`Committing to ${mode}...`);
      const commitRes = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, imageUrl: secure_url }),
      });

      if (!commitRes.ok) throw new Error(`${mode} commit failed`);

      setMessage(`${mode === "products" ? "Product" : "Category"} saved successfully!`);
      
      if (!editing) {
        setDraft(blankFor(mode));
      } else {
        setDraft((current) => ({ ...current, image: secure_url }));
      }
      
      await load();
    } catch (e: any) {
      setMessage(e.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function uploadImage(file: File) {
    await handleAssetCommit(file);
  }

  function inputFor(field: string) {
    const value = draft[field];
    const base = "rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900";
    if (["description", "notes", "adminNotes", "content", "body"].includes(field)) {
      return <textarea value={pretty(value) === "—" ? "" : pretty(value)} onChange={(e) => setDraft({ ...draft, [field]: e.target.value })} className={`${base} min-h-24 md:col-span-2`} placeholder={field} />;
    }
    if (field === "business") {
      return <select value={String(value || "electronics")} onChange={(e) => setDraft({ ...draft, [field]: e.target.value })} className={base}><option value="electronics">electronics</option><option value="bole">bole</option></select>;
    }
    if (field === "status" && mode === "orders") {
      return <select value={String(value || "pending")} onChange={(e) => setDraft({ ...draft, status: e.target.value })} className={base}>{orderStatuses.map((s) => <option key={s}>{s}</option>)}</select>;
    }
    if (field === "status" && mode === "repairs") {
      return <select value={String(value || "received")} onChange={(e) => setDraft({ ...draft, status: e.target.value })} className={base}>{repairStatuses.map((s) => <option key={s}>{s}</option>)}</select>;
    }
    if (field === "status" && mode === "messages") {
      return <select value={String(value || "new")} onChange={(e) => setDraft({ ...draft, status: e.target.value })} className={base}>{messageStatuses.map((s) => <option key={s}>{s}</option>)}</select>;
    }
    if (["active", "featured", "approved"].includes(field)) {
      return <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm"><input type="checkbox" checked={Boolean(value)} onChange={(e) => setDraft({ ...draft, [field]: e.target.checked })} /> {field}</label>;
    }
    if (field === "image") {
      return (
        <div className="flex flex-col gap-1">
          <input 
            readOnly 
            value={pretty(value)} 
            className={`${base} bg-stone-100 text-stone-400 cursor-not-allowed`} 
            placeholder="Upload a file below..." 
          />
          <span className="text-[10px] text-stone-400 italic">Image must be uploaded via file picker</span>
        </div>
      );
    }
    return <input value={pretty(value) === "—" ? "" : pretty(value)} onChange={(e) => setDraft({ ...draft, [field]: e.target.value })} className={base} placeholder={field} />;
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-stone-400">Admin control</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-stone-500">{description}</p>
        </div>
        <button onClick={() => { setDraft(blankFor(mode)); setEditing(null); }} className="rounded-full bg-stone-950 px-5 py-3 text-sm font-black text-white">New / Reset</button>
      </div>

      {canCreate || editing ? (
        <section className="mt-8 rounded-[2rem] border border-stone-200 bg-white/80 p-5 shadow-sm backdrop-blur">
          <h2 className="font-black">{editing ? "Edit record" : "Create record"}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {visibleFields.filter((field) => !["orderNumber", "ticketNumber", "customerName", "customerPhone", "total"].includes(field) || editing).map((field) => <div key={field}>{inputFor(field)}</div>)}
            {mode === "products" || mode === "categories" ? <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && void uploadImage(e.target.files[0])} className="rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-3 text-sm" /> : null}
          </div>
          <button disabled={busy || (!canCreate && !editing)} onClick={() => void save()} className="mt-4 rounded-full bg-stone-950 px-6 py-3 text-sm font-black text-white disabled:opacity-40">{busy ? "Saving..." : "Save changes"}</button>
        </section>
      ) : null}

      {message && <p className="mt-5 rounded-2xl border border-stone-200 bg-white p-4 text-sm text-stone-600">{message}</p>}

      <section className="mt-8 overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-stone-950 text-white">
              <tr>{visibleFields.map((field) => <th key={field} className="px-4 py-3 font-bold">{field}</th>)}<th className="px-4 py-3">Actions</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={String(row.id || row.key)} className="border-t border-stone-100 align-top">
                  {visibleFields.map((field) => <td key={field} className="max-w-xs px-4 py-3 text-stone-600">{pretty(row[field])}</td>)}
                  <td className="whitespace-nowrap px-4 py-3">
                    {editable && <button onClick={() => { setDraft(row); setEditing(String(row.id || row.key)); }} className="mr-2 rounded-full border border-stone-200 px-3 py-1 font-bold">Edit</button>}
                    {row.id && <button onClick={() => void remove(String(row.id))} className="rounded-full border border-red-200 px-3 py-1 font-bold text-red-600">Delete</button>}
                  </td>
                </tr>
              ))}
              {!rows.length && <tr><td colSpan={visibleFields.length + 1} className="px-4 py-8 text-center text-stone-500">No records yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
