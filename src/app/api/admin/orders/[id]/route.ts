import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { requireAdmin } from "@/lib/requireAdmin";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const [updated] = await db.update(orders).set({ status: body.status, notes: body.notes, updatedAt: new Date() }).where(eq(orders.id, id)).returning();
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.delete(orders).where(eq(orders.id, id));
  return NextResponse.json({ ok: true });
}
