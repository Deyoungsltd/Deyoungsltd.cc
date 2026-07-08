import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { requireAdmin } from "@/lib/requireAdmin";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await db.select().from(orders).orderBy(desc(orders.createdAt)));
}
