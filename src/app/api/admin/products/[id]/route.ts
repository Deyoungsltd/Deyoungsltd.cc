import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAdmin } from "@/lib/requireAdmin";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

type ProductUpdate = {
  slug?: string;
  name?: string;
  description?: string | null;
  price?: string;
  image?: string | null;
  categoryId?: string | null;
  business?: "electronics" | "bole";
  stock?: number;
  featured?: boolean;
  active?: boolean;
};

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  
  const update: ProductUpdate = {};
  if ("slug" in body) update.slug = String(body.slug);
  if ("name" in body) update.name = String(body.name);
  if ("description" in body) update.description = body.description ? String(body.description) : null;
  if ("price" in body) update.price = String(body.price);
  if ("image" in body || "imageUrl" in body) {
    const img = body.imageUrl || body.image;
    if (typeof img === "string" && img.length > 0) {
      update.image = img;
    } else if (!img) {
      update.image = null;
    }
  }
  if ("categoryId" in body) update.categoryId = body.categoryId || null;
  if ("business" in body) update.business = body.business === "bole" ? "bole" : "electronics";
  if ("stock" in body) update.stock = Number(body.stock);
  if ("featured" in body) update.featured = Boolean(body.featured);
  if ("active" in body) update.active = body.active !== false;

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No fields provided for update" }, { status: 400 });
  }

  const [updated] = await db.update(products).set(update).where(eq(products.id, id)).returning();
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.delete(products).where(eq(products.id, id));
  return NextResponse.json({ ok: true });
}
