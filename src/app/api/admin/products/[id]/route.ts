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
  const update: ProductUpdate = {
    slug: body.slug,
    name: body.name,
    description: body.description || null,
    price: String(body.price || 0),
    image: body.image || null,
    categoryId: body.categoryId || null,
    business: body.business === "bole" ? "bole" : "electronics",
    stock: Number(body.stock || 0),
    featured: Boolean(body.featured),
    active: body.active !== false,
  };
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
