import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const number = url.searchParams.get("number")?.trim();
  if (!number) return NextResponse.json({ error: "Order number is required." }, { status: 400 });

  const [order] = await db.select().from(orders).where(eq(orders.orderNumber, number)).limit(1);
  if (!order) return NextResponse.json({ error: "No order found with that number." }, { status: 404 });
  return NextResponse.json(order);
}
