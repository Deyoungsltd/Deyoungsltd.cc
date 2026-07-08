import { NextResponse } from "next/server";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";

export const dynamic = "force-dynamic";

type IncomingItem = { slug?: string; name?: string; price?: number; quantity?: number };

function orderNumber() {
  const now = new Date();
  const date = `${String(now.getUTCFullYear()).slice(2)}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(now.getUTCDate()).padStart(2, "0")}`;
  return `DYG-${date}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items = (body.items || []) as IncomingItem[];
    if (!body.customerName || !body.customerPhone || !body.business || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Name, phone, business, and at least one item are required." }, { status: 400 });
    }

    const cleanItems = items.map((item) => ({
      name: String(item.name || "Product"),
      price: Number(item.price || 0),
      quantity: Math.max(1, Number(item.quantity || 1)),
    })).filter((item) => item.price > 0);

    const subtotal = cleanItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (subtotal <= 0) return NextResponse.json({ error: "Order total must be greater than zero." }, { status: 400 });

    const [created] = await db.insert(orders).values({
      orderNumber: orderNumber(),
      customerName: String(body.customerName),
      customerPhone: String(body.customerPhone),
      customerEmail: body.customerEmail ? String(body.customerEmail) : null,
      address: body.address ? String(body.address) : null,
      business: body.business === "bole" ? "bole" : "electronics",
      subtotal: String(subtotal),
      deliveryFee: "0",
      total: String(subtotal),
      notes: body.notes ? String(body.notes) : null,
    }).returning();

    await db.insert(orderItems).values(cleanItems.map((item) => ({
      orderId: created.id,
      name: item.name,
      price: String(item.price),
      quantity: item.quantity,
    })));

    return NextResponse.json({ ok: true, orderNumber: created.orderNumber, status: created.status, total: created.total });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Order failed." }, { status: 500 });
  }
}
