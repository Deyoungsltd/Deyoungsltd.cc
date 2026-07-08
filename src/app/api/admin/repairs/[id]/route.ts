import { NextResponse } from "next/server";
import { db } from "@/db";
import { repairRequests } from "@/db/schema";
import { requireAdmin } from "@/lib/requireAdmin";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const [updated] = await db.update(repairRequests).set({ status: body.status, estimatedCost: body.estimatedCost ? String(body.estimatedCost) : null, adminNotes: body.adminNotes, updatedAt: new Date() }).where(eq(repairRequests.id, id)).returning();
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.delete(repairRequests).where(eq(repairRequests.id, id));
  return NextResponse.json({ ok: true });
}
