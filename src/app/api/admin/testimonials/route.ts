import { NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { requireAdmin } from "@/lib/requireAdmin";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await db.select().from(testimonials).orderBy(desc(testimonials.createdAt)));
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const [created] = await db.insert(testimonials).values({
    customerName: String(body.customerName || "Customer"),
    business: body.business || null,
    rating: Number(body.rating || 5),
    content: String(body.content || ""),
    approved: body.approved !== false,
  }).returning();
  return NextResponse.json(created);
}
