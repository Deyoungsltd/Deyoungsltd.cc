import { NextResponse } from "next/server";
import { db } from "@/db";
import { repairRequests } from "@/db/schema";

export const dynamic = "force-dynamic";

function ticketNumber() {
  const now = new Date();
  return `REP-${String(now.getUTCFullYear()).slice(2)}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(now.getUTCDate()).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function estimateFor(deviceType: string, issue: string) {
  const text = `${deviceType} ${issue}`.toLowerCase();
  if (/(fridge|freezer|ac|air)/.test(text)) return 15000;
  if (/(tv|screen|panel)/.test(text)) return 12000;
  if (/(fan|kettle|iron|blender)/.test(text)) return 5000;
  return 8000;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.phone || !body.deviceType || !body.issueDescription) {
      return NextResponse.json({ error: "Name, phone, device type, and issue description are required." }, { status: 400 });
    }
    const estimatedCost = estimateFor(String(body.deviceType), String(body.issueDescription));
    const [created] = await db.insert(repairRequests).values({
      ticketNumber: ticketNumber(),
      name: String(body.name),
      phone: String(body.phone),
      email: body.email ? String(body.email) : null,
      deviceType: String(body.deviceType),
      brand: body.brand ? String(body.brand) : null,
      issueDescription: String(body.issueDescription),
      preferredDate: body.preferredDate ? new Date(String(body.preferredDate)) : null,
      estimatedCost: String(estimatedCost),
    }).returning();

    return NextResponse.json({ ok: true, ticketNumber: created.ticketNumber, estimatedCost: created.estimatedCost, status: created.status });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Repair request failed." }, { status: 500 });
  }
}
