import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const all = await db.select().from(products).orderBy(desc(products.createdAt));
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const [created] = await db.insert(products).values({
    slug: String(body.slug || body.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || Date.now()),
    name: String(body.name || "Untitled product"),
    description: body.description ? String(body.description) : null,
    price: String(body.price || 0),
    image: body.imageUrl || body.image ? String(body.imageUrl || body.image) : null,
    categoryId: body.categoryId || null,
    business: body.business === "bole" ? "bole" : "electronics",
    stock: Number(body.stock || 0),
    featured: Boolean(body.featured),
    active: body.active !== false,
  }).returning();
  return NextResponse.json(created);
}
