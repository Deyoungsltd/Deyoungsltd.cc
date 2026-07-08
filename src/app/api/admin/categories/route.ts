import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { requireAdmin } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await db.select().from(categories));
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const [created] = await db.insert(categories).values({
    slug: String(body.slug || body.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || Date.now()),
    name: String(body.name || "Untitled category"),
    description: body.description ? String(body.description) : null,
    business: body.business === "bole" ? "bole" : "electronics",
    image: body.image ? String(body.image) : null,
    sortOrder: Number(body.sortOrder || 0),
    active: body.active !== false,
  }).returning();
  return NextResponse.json(created);
}
